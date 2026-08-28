import { db } from "../../../../db/db";
import {
  vehicles,
  brands,
  categories,
  subCategories,
  bookings,
} from "../../../../db/schema";
import { and, eq, gte, lte, notInArray, sql } from "drizzle-orm";
import { z } from "zod";

const overlappingBookingVehicleIds = async (startDate, endDate) => {
  if (!startDate || !endDate) return [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const rows = await db
    .select({ vehicleId: bookings.vehicleId })
    .from(bookings)
    .where(
      and(
        sql`${bookings.status} IN ('reserved','confirmed')`,
        lte(bookings.startDate, end),
        gte(bookings.endDate, start),
      ),
    );
  return rows.map((r) => r.vehicleId);
};

export const searchVehiclesConfig = {
  name: "search_vehicles",
  description:
    "Search real inventory by category, transmission, fuel type, min seats, max daily price, optional dates. Call ONCE per new set of criteria — do not repeat with the same or similar args.",
  schema: z.object({
    category: z
      .enum(["Small Car", "Large Car", "Exclusive Car"])
      .optional()
      .describe("must be one of these exact values"),
    transmission: z.enum(["Automatic", "Manual"]).optional(),
    fuelType: z.enum(["Petrol", "Diesel", "Electric", "Hybrid"]).optional(),
    seats: z.number().optional().describe("minimum seats required"),
    maxPrice: z.number().optional().describe("max daily price in USD"),
    startDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD")
      .optional(),
    endDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD")
      .optional(),
  }),
  handler: async ({
    category,
    transmission,
    fuelType,
    seats,
    maxPrice,
    startDate,
    endDate,
  }) => {
    const conflicting = await overlappingBookingVehicleIds(startDate, endDate);

    const conditions = [eq(vehicles.status, "available")];
    if (category) conditions.push(eq(categories.name, category)); // fixed: was categories.slug, never matched
    if (transmission) conditions.push(eq(vehicles.transmission, transmission));
    if (fuelType) conditions.push(eq(vehicles.fuelType, fuelType));
    if (seats) conditions.push(gte(vehicles.seats, seats));
    if (maxPrice) conditions.push(lte(vehicles.dailyPrice, String(maxPrice)));
    if (conflicting.length)
      conditions.push(notInArray(vehicles.id, conflicting));

    const rows = await db
      .select({
        id: vehicles.id,
        name: vehicles.name,
        brand: brands.name,
        category: categories.name,
        subCategory: subCategories.name,
        dailyPrice: vehicles.dailyPrice,
        weeklyPrice: vehicles.weeklyPrice,
        seats: vehicles.seats,
        transmission: vehicles.transmission,
        fuelType: vehicles.fuelType,
        features: vehicles.features,
        rating: vehicles.rating,
        imageUrl: vehicles.imageUrl,
      })
      .from(vehicles)
      .leftJoin(brands, eq(vehicles.brandId, brands.id))
      .leftJoin(categories, eq(vehicles.categoryId, categories.id))
      .leftJoin(subCategories, eq(vehicles.subCategoryId, subCategories.id))
      .where(and(...conditions))
      .limit(6);

    return JSON.stringify(rows);
  },
};
