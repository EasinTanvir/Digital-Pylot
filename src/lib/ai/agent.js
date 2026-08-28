import { createAgent, tool } from "langchain";
import { checkAvailabilityConfig } from "./tools/checkAvailability.js";
import { qualifyLeadConfig } from "./tools/qualifyLead.js";
import { searchVehiclesConfig } from "./tools/searchVehicles.js";
import { model } from "./llm.js";

const MAX_HISTORY_MESSAGES = 8;
const MAX_STEPS = 6;

export const SYSTEM_PROMPT = `You are Best Car's rental assistant. Help users find vehicles, check availability, and capture qualified leads.

RULES:
- Only state facts your tools return. Never invent vehicles, prices, or policies.
- No results? Say so, suggest adjusting budget/seats/dates. Never suggest an unconfirmed vehicle.
- User names a vehicle, no dates yet: ask for dates in plain text. Call NO tool.
- Call check_availability only once you have a vehicle name/id AND both dates.
- NEVER call search_vehicles to look up a named vehicle — it only filters by category/seats/price, not name. Use check_availability for named vehicles, always.
- Reuse vehicle IDs and dates already established. Don't re-search or re-ask for known info.
- Never repeat an identical or near-identical tool call. If a result surprises you, ask the user instead of retrying.
- One tool call per user message, unless clearly chaining two (e.g. check availability then save lead).
- Unavailable? Call search_vehicles ONCE for alternatives, then stop and present them.
- Name + phone/email + enough context → call qualify_lead once, then confirm warmly.

STYLE: 2-3 sentences, conversational, end with a clear next step. Off-topic requests: brief redirect back to car rental.`;

function guarded(config, tracker) {
  return tool(
    async (args) => {
      const key = `${config.name}:${JSON.stringify(args)}`;
      tracker[key] = (tracker[key] || 0) + 1;
      if (tracker[key] > 1) {
        return JSON.stringify({
          error: true,
          message: `You already called ${config.name} with these exact arguments. Use the result you already have, or ask the user a direct clarifying question instead.`,
        });
      }
      return config.handler(args);
    },
    {
      name: config.name,
      description: config.description,
      schema: config.schema,
    },
  );
}

export async function runAgent(messages) {
  const trimmed = messages.slice(-MAX_HISTORY_MESSAGES);
  const tracker = {};

  const agent = createAgent({
    model,
    tools: [
      guarded(searchVehiclesConfig, tracker),
      guarded(checkAvailabilityConfig, tracker),
      guarded(qualifyLeadConfig, tracker),
    ],
    systemPrompt: SYSTEM_PROMPT,
  });

  try {
    const result = await agent.invoke(
      { messages: trimmed },
      { recursionLimit: MAX_STEPS },
    );
    const last =
      [...result.messages]
        .reverse()
        .find((m) => m.getType?.() === "ai" && m.content) ??
      result.messages[result.messages.length - 1];
    return {
      reply:
        last?.content ||
        "Sorry, I couldn't quite process that — could you rephrase?",
      messages: result.messages,
    };
  } catch (err) {
    if (err?.name === "GraphRecursionError") {
      console.warn("[runAgent] hit recursion limit:", err.message);
      return {
        reply:
          "I'm having trouble narrowing that down — could you tell me the exact vehicle name and your dates one more time?",
        messages: trimmed,
      };
    }
    if (err?.status === 429) {
      return {
        reply:
          "I'm getting a lot of requests right now — please wait about 15 seconds and try again.",
        messages: trimmed,
      };
    }
    throw err;
  }
}
