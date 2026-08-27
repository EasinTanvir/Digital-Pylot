import { db } from "../../../db/db.js";
import { vehicles } from "../../../db/schema.js";
import { eq } from "drizzle-orm";

export async function notifyLeadCreated(lead) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "[notifyLeadCreated] SLACK_WEBHOOK_URL not set, skipping notification.",
    );
    return;
  }

  let vehicleName = "Not specified";
  if (lead.vehicleId) {
    try {
      const [vehicle] = await db
        .select({ name: vehicles.name, dailyPrice: vehicles.dailyPrice })
        .from(vehicles)
        .where(eq(vehicles.id, lead.vehicleId));
      if (vehicle) vehicleName = `${vehicle.name} ($${vehicle.dailyPrice}/day)`;
    } catch (err) {
      console.error("[notifyLeadCreated] failed to look up vehicle:", err);
    }
  }

  const dateRange =
    lead.desiredStartDate && lead.desiredEndDate
      ? `${new Date(lead.desiredStartDate).toLocaleDateString()} → ${new Date(
          lead.desiredEndDate,
        ).toLocaleDateString()}`
      : "Not specified";

  const payload = {
    text: `🚗 New lead from the AI chatbot`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "🚗 New Lead — AI Chatbot" },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Name:*\n${lead.name}` },
          {
            type: "mrkdwn",
            text: `*Contact:*\n${lead.phone || lead.email || "N/A"}`,
          },
          { type: "mrkdwn", text: `*Vehicle:*\n${vehicleName}` },
          { type: "mrkdwn", text: `*Dates:*\n${dateRange}` },
          {
            type: "mrkdwn",
            text: `*Budget:*\n${lead.budget ? `$${lead.budget}/day` : "N/A"}`,
          },
          { type: "mrkdwn", text: `*Status:*\n${lead.status}` },
        ],
      },
      ...(lead.notes
        ? [
            {
              type: "section",
              text: { type: "mrkdwn", text: `*Notes:*\n${lead.notes}` },
            },
          ]
        : []),
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `Lead ID: ${lead.id} · ${new Date().toLocaleString()}`,
          },
        ],
      },
    ],
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error(
        "[notifyLeadCreated] Slack webhook returned",
        res.status,
        await res.text(),
      );
    }
  } catch (err) {
    console.error(
      "[notifyLeadCreated] failed to send Slack notification:",
      err,
    );
  }
}
