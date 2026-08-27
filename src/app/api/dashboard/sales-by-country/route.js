import { NextResponse } from "next/server";
import { getSalesByCountries } from "../../../../../db/queries.js";

const filters = new Set(["this_week", "this_month", "this_year", "all"]);

export async function GET(request) {
  const filter = new URL(request.url).searchParams.get("filter") || "all";
  if (!filters.has(filter)) return NextResponse.json({ error: "filter must be this_week, this_month, this_year, or all" }, { status: 400 });
  return NextResponse.json((await getSalesByCountries(filter)) || []);
}
