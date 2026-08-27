import { NextResponse } from "next/server";
import { getPopularCars } from "../../../../../db/queries.js";

export async function GET() {
  return NextResponse.json((await getPopularCars()) || []);
}
