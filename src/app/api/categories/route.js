import { NextResponse } from "next/server";
import { getCategories } from "../../../../db/queries.js";

export async function GET() {
  return NextResponse.json((await getCategories()) || []);
}
