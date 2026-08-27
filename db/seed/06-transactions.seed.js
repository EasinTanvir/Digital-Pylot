import { db } from "../db.js";
import { transactions, vehicles } from "../schema.js";
import { eq } from "drizzle-orm";

const paymentMethods = ["PayPal", "Apple Pay", "Stripe", "PayU"];
const countries = ["Africa", "Asia", "Europe", "Americas"];
const statuses = ["success", "success", "success", "pending", "cancelled"];

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomDate(year) {
  const start = new Date(year, 0, 1).getTime();
  const end = new Date(year, 11, 31, 23, 59, 59).getTime();
  return new Date(start + Math.random() * (end - start));
}

function currentWeekDate() {
  const now = new Date();
  const date = new Date(now);
  date.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0);
  return date;
}

export async function seedTransactions(userRows, vehicleRows) {
  const generated = [];
  let number = 1;
  const addTransaction = (type, createdAt) => {
    const vehicle = pick(vehicleRows);
    const multiplier = type === "sale" ? 1 + Math.floor(Math.random() * 8) : 20 + Math.floor(Math.random() * 20);
    generated.push({
      transactionNumber: `TXN-${String(number++).padStart(6, "0")}`,
      type,
      userId: type === "sale" ? pick(userRows).id : null,
      vehicleId: vehicle.id,
      paymentMethod: pick(paymentMethods),
      amount: (Number(vehicle.dailyPrice) * multiplier).toFixed(2),
      status: pick(statuses),
      country: pick(countries),
      createdAt,
    });
  };

  for (const year of [2023, 2024, 2025]) {
    for (let index = 0; index < 280; index += 1) addTransaction("sale", randomDate(year));
    for (let index = 0; index < 40; index += 1) addTransaction("purchase", randomDate(year));
  }
  for (let index = 0; index < 60; index += 1) addTransaction("sale", currentWeekDate());

  await db.insert(transactions).values(generated);

  const totals = new Map(vehicleRows.map((vehicle) => [vehicle.id, { count: 0, revenue: 0 }]));
  for (const transaction of generated) {
    if (transaction.type === "sale") {
      const total = totals.get(transaction.vehicleId);
      total.count += 1;
      total.revenue += Number(transaction.amount);
    }
  }
  await Promise.all(vehicleRows.map((vehicle) => {
    const total = totals.get(vehicle.id);
    return db.update(vehicles).set({ totalSalesCount: total.count, totalRevenue: total.revenue.toFixed(2) }).where(eq(vehicles.id, vehicle.id));
  }));
  return generated;
}
