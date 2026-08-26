"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card from "@/components/ui/Card";

export default function SalesAnalyticsChart({ data, title, year }) {
  return <Card className="min-h-[300px] p-5"><div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-bold text-text-heading">{title}</h2><button className="rounded border border-border-100 px-2 py-1 text-[10px] text-text-body">▣ {year}</button></div><div className="h-56"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}><defs><linearGradient id="sales-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.45} /><stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="var(--color-border-100)" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--color-text-body)", fontSize: 10 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--color-text-body)", fontSize: 10 }} tickFormatter={(value) => `${value / 1000}k`} /><Tooltip /><Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} fill="url(#sales-fill)" /></AreaChart></ResponsiveContainer></div></Card>;
}
