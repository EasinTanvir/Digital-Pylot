import { db } from "../../../../db/db";
import { leads } from "../../../../db/schema";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { notifyLeadCreated } from "../../automation/notify.js";

export const qualifyLead = tool(
  async ({
    name,
    phone,
    email,
    vehicleId,
    desiredStartDate,
    desiredEndDate,
    budget,
    notes,
  }) => {
    if (!name || (!phone && !email)) {
      return JSON.stringify({
        saved: false,
        reason: "need at least a name and one contact method (phone or email)",
      });
    }

    const [lead] = await db
      .insert(leads)
      .values({
        name,
        phone,
        email,
        vehicleId,
        desiredStartDate: desiredStartDate
          ? new Date(desiredStartDate)
          : undefined,
        desiredEndDate: desiredEndDate ? new Date(desiredEndDate) : undefined,
        budget: budget != null ? String(budget) : undefined,
        source: "chatbot",
        status: "new",
        notes,
      })
      .returning();

    await notifyLeadCreated(lead);

    return JSON.stringify({ saved: true, leadId: lead.id });
  },
  {
    name: "qualify_lead",
    description:
      "Save a qualified lead once you have collected the user's name and at least one contact method (phone or email), plus whatever vehicle/date/budget context is known. Call this as soon as you have enough info — don't wait for a separate form.",
    schema: z.object({
      name: z.string(),
      phone: z.string().optional(),
      email: z.string().optional(),
      vehicleId: z.string().uuid().optional(),
      desiredStartDate: z.string().optional(),
      desiredEndDate: z.string().optional(),
      budget: z.number().optional(),
      notes: z
        .string()
        .optional()
        .describe("brief summary of what the user wants"),
    }),
  },
);
