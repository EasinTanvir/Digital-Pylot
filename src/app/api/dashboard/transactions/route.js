import { NextResponse } from "next/server";
import { getRecentTransactions } from "../../../../../db/queries.js";

function getLimit(value) {
  if (value === null) return 5;
  if (!/^\d+$/.test(value)) return null;
  const limit = Number(value);
  return limit >= 1 && limit <= 100 ? limit : null;
}

export async function GET(request) {
  const limit = getLimit(new URL(request.url).searchParams.get("limit"));
  if (limit === null) return NextResponse.json({ error: "limit must be an integer from 1 to 100" }, { status: 400 });
  return NextResponse.json((await getRecentTransactions(limit)) || []);
}
