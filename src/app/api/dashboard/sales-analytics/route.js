import { NextResponse } from "next/server";
import { getSalesAnalytics } from "../../../../../db/queries.js";

export async function GET(request) {
  const year = new URL(request.url).searchParams.get("year");
  if (!year || !/^\d{4}$/.test(year)) return NextResponse.json({ error: "year must be a 4-digit number" }, { status: 400 });
  return NextResponse.json((await getSalesAnalytics(Number(year))) || []);
}
