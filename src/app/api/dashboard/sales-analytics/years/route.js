import { NextResponse } from "next/server";
import { getAvailableYears } from "../../../../../../db/queries.js";

export async function GET() {
  return NextResponse.json((await getAvailableYears()) || []);
}
