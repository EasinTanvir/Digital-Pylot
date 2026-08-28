import { db } from "../../../../db/db";
import { vehicles, bookings } from "../../../../db/schema";
import { and, eq, gte, lte, sql, ilike } from "drizzle-orm";
import { z } from "zod";

export const checkAvailabilityConfig = {
  name: "check_availability",
  description:
    "Check whether a specific vehicle is free for a given date range, and estimate the total price. Identify by vehicleId if known, otherwise vehicleName. Requires both startDate and endDate — if you don't have both yet, ask the user for them instead of calling this tool.",
  schema: z.object({
    vehicleId: z.string().uuid().optional(),
    vehicleName: z
      .string()
      .optional()
      .describe("the vehicle's name as the user refers to it"),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD"),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD"),
  }),
  handler: async ({ vehicleId, vehicleName, startDate, endDate }) => {
    let vehicle;

    if (vehicleId) {
      [vehicle] = await db
        .select()
        .from(vehicles)
        .where(eq(vehicles.id, vehicleId));
    } else if (vehicleName) {
      // exact match first — avoids false "ambiguous" results
      const [exactMatch] = await db
        .select()
        .from(vehicles)
        .where(sql`lower(${vehicles.name}) = lower(${vehicleName})`)
        .limit(1);

      if (exactMatch) {
        vehicle = exactMatch;
      } else {
        const matches = await db
          .select()
          .from(vehicles)
          .where(ilike(vehicles.name, `%${vehicleName}%`))
          .limit(5);

        if (matches.length === 0) {
          return JSON.stringify({
            available: false,
            reason: "no vehicle found with that name",
          });
        }
        if (matches.length > 1) {
          return JSON.stringify({
            available: false,
            reason:
              "multiple vehicles match that name — present these options and wait for the user to pick one",
            options: matches.map((m) => ({
              id: m.id,
              name: m.name,
              dailyPrice: m.dailyPrice,
            })),
          });
        }
        vehicle = matches[0];
      }
    } else {
      return JSON.stringify({
        available: false,
        reason: "no vehicleId or vehicleName provided",
      });
    }

    if (!vehicle)
      return JSON.stringify({ available: false, reason: "vehicle not found" });
    if (vehicle.status !== "available")
      return JSON.stringify({
        available: false,
        reason: `vehicle is ${vehicle.status}`,
      });

    const start = new Date(startDate);
    const end = new Date(endDate);

    const conflicts = await db
      .select({ id: bookings.id })
      .from(bookings)
      .where(
        and(
          eq(bookings.vehicleId, vehicle.id),
          sql`${bookings.status} IN ('reserved','confirmed')`,
          lte(bookings.startDate, end),
          gte(bookings.endDate, start),
        ),
      );

    const days = Math.max(1, Math.ceil((end - start) / 86400000));

    return JSON.stringify({
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      available: conflicts.length === 0,
      estimatedTotal:
        conflicts.length === 0
          ? (Number(vehicle.dailyPrice) * days).toFixed(2)
          : null,
      days,
    });
  },
};
