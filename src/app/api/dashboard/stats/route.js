import { NextResponse } from "next/server";
import { getPurchasedGoodsCount, getSalesByCountries, getTotalSalesCount } from "../../../../../db/queries.js";

function parseDateRange(searchParams) {
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!startDate && !endDate) return { startDate: null, endDate: null };
  if (!startDate || !endDate || !/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
    return null;
  }

  const start = new Date(`${startDate}T00:00:00.000Z`);
  const end = new Date(`${endDate}T00:00:00.000Z`);
  if (Number.isNaN(start.valueOf()) || Number.isNaN(end.valueOf()) || end < start) return null;

  // Query end dates exclusively so the selected final day is included.
  end.setUTCDate(end.getUTCDate() + 1);
  return { startDate: start, endDate: end };
}

export async function GET(request) {
  const dateRange = parseDateRange(new URL(request.url).searchParams);
  if (!dateRange) {
    return NextResponse.json(
      { error: "startDate and endDate must be valid YYYY-MM-DD values with endDate on or after startDate" },
      { status: 400 },
    );
  }

  const [countries, totalSales, purchasedGoods] = await Promise.all([
    getSalesByCountries("this_week"),
    getTotalSalesCount(dateRange.startDate, dateRange.endDate),
    getPurchasedGoodsCount(dateRange.startDate, dateRange.endDate),
  ]);
  const weeklyEarning = countries.reduce((total, country) => total + Number(country.totalRevenue || 0), 0);
  return NextResponse.json({ weeklyEarning, totalSales: totalSales || 0, purchasedGoods: purchasedGoods || 0 });
}
