"use client";

import { useState, useRef, useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "@/components/ui/Card";
import { HiOutlineCalendar, HiChevronDown } from "react-icons/hi2";

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="rounded-lg border border-border-100 bg-white px-3 py-1.5 shadow-md">
        <p className="text-[11px] font-semibold text-text-body">{label}</p>
        <p className="text-xs font-bold text-primary">
          ${Number(value).toLocaleString("en-US")}
        </p>
      </div>
    );
  }
  return null;
}

function CustomDot(props) {
  const { cx, cy, payload } = props;

  const isHighlight = payload.isHighlight || payload.month === "Jun";

  return (
    <circle
      cx={cx}
      cy={cy}
      r={isHighlight ? 8 : 4}
      fill="rgba(255, 159, 67, 1)"
      strokeWidth={isHighlight ? 2.5 : 0}
      className="transition-all duration-200"
    />
  );
}

export default function SalesAnalyticsChart({
  data = [],
  title = "Sales Analytics",
  year,
  onYearChange,
  yearsList = ["2026", "2025", "2024", "2023"],
  scale = {
    domain: [0, 60000],
    ticks: [10000, 20000, 30000, 40000, 50000, 60000],
  },
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectYear = (y) => {
    setIsOpen(false);
    if (onYearChange) onYearChange(y);
  };

  return (
    <Card className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border-150 bg-white p-6 shadow-[0px_4px_60px_0px_rgba(231,231,231,0.47)]">
      {/* Header with Year Selector Dropdown */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-base font-bold text-table-header">{title}</h2>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 rounded-[5px] border border-stroke-alt px-3 py-3 text-xs font-semibold text-table-header transition-colors hover:bg-surface-100"
          >
            <HiOutlineCalendar className="h-4 w-4 text-text-body" />
            <span>{year || "2025"}</span>
          </button>

          {/* Year Options Dropdown */}
          {isOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 w-28 rounded-xl border border-border-150 bg-white py-1 shadow-lg">
              {yearsList.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => handleSelectYear(y)}
                  className={`w-full px-3 py-1.5 text-left text-xs transition-colors hover:bg-neutral-blue-50 ${
                    y === year ? "font-bold text-primary" : "text-text-body"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Area Chart Container */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 15, right: 10, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="sales-fill-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#FF9F43" stopOpacity={0.8} />
                <stop
                  offset="100%"
                  stopColor="rgba(255, 159, 67, 0)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="var(--color-border-100, #E9ECEF)"
              strokeDasharray="0"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-text-body)", fontSize: 11 }}
              dy={8}
            />

            <YAxis
              domain={scale.domain}
              ticks={scale.ticks}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-text-body)", fontSize: 11 }}
              tickFormatter={(val) => `${val / 1000}k`}
              dx={-5}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="value"
              stroke="rgba(255, 159, 67, 1)"
              strokeWidth={2.5}
              fill="url(#sales-fill-gradient)"
              dot={<CustomDot />}
              activeDot={{
                r: 8,
                fill: "rgba(255, 159, 67, 1)",
                stroke: "#ffffff",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
