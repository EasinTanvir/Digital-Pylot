import { NextResponse } from "next/server";
import { getCarsByCategory, getPopularCars } from "../../../../db/queries.js";

export async function GET(request) {
  const category = new URL(request.url).searchParams.get("category");
  const data = category ? await getCarsByCategory(category) : await getPopularCars();
  return NextResponse.json(data || []);
}
