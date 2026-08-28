import { NextResponse } from "next/server";
import { getLeads } from "../../../../db/queries.js";

export async function GET() {
  try {
    return NextResponse.json(await getLeads());
  } catch {
    return NextResponse.json({ error: "Unable to load leads" }, { status: 500 });
  }
}
