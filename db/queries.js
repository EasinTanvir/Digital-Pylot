import { db } from "./db.js";
import { vehicles, transactions, categories } from "./schema.js";
import { count, sum, eq, gte, lt, and, sql, desc } from "drizzle-orm";

export async function getPopularCars() {
  return await db.query.vehicles.findMany({
    where: (vehicles, { eq }) => eq(vehicles.isPopular, true),
    with: { subCategory: true },
  });
}

export async function getCarsByCategory(categoryId) {
  return await db.query.vehicles.findMany({
    where: (vehicles, { eq }) => eq(vehicles.categoryId, categoryId),
    with: { subCategory: true },
  });
}

export async function getCategories() {
  return await db.select().from(categories);
}

export async function getBestSellers(limitCount = 5) {
  return await db.query.vehicles.findMany({
    orderBy: (vehicles, { desc }) => [desc(vehicles.totalSalesCount)],
    limit: limitCount,
  });
}

export async function getRecentTransactions(limitCount = 5) {
  return await db.query.transactions.findMany({
    orderBy: (transactions, { desc }) => [desc(transactions.createdAt)],
    limit: limitCount,
    with: { vehicle: true },
  });
}

export async function getTotalEarnings() {
  const result = await db
    .select({ total: sum(transactions.amount).mapWith(Number) })
    .from(transactions)
    .where(eq(transactions.type, "sale"));
  return result[0]?.total || 0;
}

function getTransactionDateConditions(startDate, endDate) {
  const conditions = [];
  if (startDate) conditions.push(gte(transactions.createdAt, startDate));
  if (endDate) conditions.push(lt(transactions.createdAt, endDate));
  return conditions;
}

export async function getTotalSalesCount(startDate, endDate) {
  const result = await db
    .select({ totalSales: count() })
    .from(transactions)
    .where(
      and(
        eq(transactions.type, "sale"),
        ...getTransactionDateConditions(startDate, endDate),
      ),
    );
  return result[0]?.totalSales || 0;
}

export async function getPurchasedGoodsCount(startDate, endDate) {
  const result = await db
    .select({ totalPurchased: count() })
    .from(transactions)
    .where(
      and(
        eq(transactions.type, "purchase"),
        ...getTransactionDateConditions(startDate, endDate),
      ),
    );
  return result[0]?.totalPurchased || 0;
}

export async function getSalesAnalytics(year = 2026) {
  return await db
    .select({
      month: sql`to_char(${transactions.createdAt}, 'Mon')`,
      monthNum: sql`extract(month from ${transactions.createdAt})`,
      totalAmount: sum(transactions.amount).mapWith(Number),
    })
    .from(transactions)
    .where(
      sql`extract(year from ${transactions.createdAt}) = ${year} AND ${transactions.type} = 'sale'`,
    )
    .groupBy(
      sql`to_char(${transactions.createdAt}, 'Mon')`,
      sql`extract(month from ${transactions.createdAt})`,
    )
    .orderBy(sql`extract(month from ${transactions.createdAt})`);
}

export async function getAvailableYears() {
  const result = await db
    .select({
      year: sql`distinct extract(year from ${transactions.createdAt})`,
    })
    .from(transactions)
    .orderBy(desc(sql`extract(year from ${transactions.createdAt})`));
  return result.map((r) => Number(r.year));
}

export async function getSalesByCountries(filter = "all") {
  const now = new Date();
  let startDate = null;
  if (filter === "this_week") {
    startDate = new Date(now);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
    startDate.setDate(diff);
    startDate.setHours(0, 0, 0, 0);
  } else if (filter === "this_month") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  } else if (filter === "this_year") {
    startDate = new Date(now.getFullYear(), 0, 1);
  }
  const conditions = [eq(transactions.type, "sale")];
  if (startDate) conditions.push(gte(transactions.createdAt, startDate));
  return await db
    .select({
      country: transactions.country,
      salesCount: count(),
      totalRevenue: sum(transactions.amount).mapWith(Number),
    })
    .from(transactions)
    .where(and(...conditions))
    .groupBy(transactions.country)
    .orderBy(desc(count()));
}
