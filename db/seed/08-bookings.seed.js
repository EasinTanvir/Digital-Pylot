import { db } from "../db.js";
import { bookings } from "../schema.js";
import { eq } from "drizzle-orm";

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export async function seedBookings(userRows, vehicleRows, locationRows) {
  const generated = [];
  const now = new Date();

  // Give ~35% of vehicles an upcoming/current booking so availability checks have
  // real conflicts to find; leave the rest free so recommendations have options.
  const bookedVehicles = vehicleRows.filter(() => Math.random() < 0.35);

  for (const vehicle of bookedVehicles) {
    const startOffset = Math.floor(Math.random() * 20) - 5; // some past, some future
    const duration = 2 + Math.floor(Math.random() * 6); // 2–7 day bookings
    const startDate = addDays(now, startOffset);
    const endDate = addDays(startDate, duration);
    const isPast = endDate < now;

    generated.push({
      vehicleId: vehicle.id,
      userId: pick(userRows).id,
      pickupLocationId: pick(locationRows).id,
      dropoffLocationId: pick(locationRows).id,
      startDate,
      endDate,
      status: isPast
        ? "completed"
        : Math.random() > 0.2
          ? "confirmed"
          : "reserved",
      totalPrice: (Number(vehicle.dailyPrice) * duration).toFixed(2),
    });
  }

  return db.insert(bookings).values(generated).returning();
}
