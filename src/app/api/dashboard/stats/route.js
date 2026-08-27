import { NextResponse } from "next/server";
import { getPurchasedGoodsCount, getSalesByCountries, getTotalSalesCount } from "../../../../../db/queries.js";

export async function GET() {
  const [countries, totalSales, purchasedGoods] = await Promise.all([
    getSalesByCountries("this_week"),
    getTotalSalesCount(),
    getPurchasedGoodsCount(),
  ]);
  const weeklyEarning = countries.reduce((total, country) => total + Number(country.totalRevenue || 0), 0);
  return NextResponse.json({ weeklyEarning, totalSales: totalSales || 0, purchasedGoods: purchasedGoods || 0 });
}
