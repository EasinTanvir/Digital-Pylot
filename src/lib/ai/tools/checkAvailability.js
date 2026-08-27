import { db } from "../../../../db/db";
import { vehicles, bookings } from "../../../../db/schema";
import { and, eq, gte, lte, sql, ilike } from "drizzle-orm";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const checkAvailability = tool(
  async ({ vehicleId, vehicleName, startDate, endDate }) => {
    let vehicle;

    if (vehicleId) {
      [vehicle] = await db
        .select()
        .from(vehicles)
        .where(eq(vehicles.id, vehicleId));
    } else if (vehicleName) {
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
          reason: "multiple vehicles match that name, ask the user to pick one",
          options: matches.map((m) => ({
            id: m.id,
            name: m.name,
            dailyPrice: m.dailyPrice,
          })),
        });
      }
      vehicle = matches[0];
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

    const conflicts = await db
      .select({ id: bookings.id })
      .from(bookings)
      .where(
        and(
          eq(bookings.vehicleId, vehicle.id),
          sql`${bookings.status} IN ('reserved','confirmed')`,
          lte(bookings.startDate, endDate),
          gte(bookings.endDate, startDate),
        ),
      );

    const days = Math.max(
      1,
      Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000),
    );

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
  {
    name: "check_availability",
    description:
      "Check whether a specific vehicle is free for a given date range, and estimate the total price. Identify the vehicle by vehicleId if you already have it from a previous search_vehicles result, otherwise use vehicleName (the name the user is talking about). Call this after the user has picked a specific vehicle and given dates.",
    schema: z.object({
      vehicleId: z.string().uuid().optional(),
      vehicleName: z
        .string()
        .optional()
        .describe(
          "the vehicle's name as the user refers to it, e.g. 'Tesla Model 3'",
        ),
      startDate: z.string().describe("ISO date"),
      endDate: z.string().describe("ISO date"),
    }),
  },
);
