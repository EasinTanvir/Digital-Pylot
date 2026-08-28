"use client";

import { useState } from "react";
import {
  HiOutlineArrowPath,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import DateRangePicker from "./DateRangePicker";

export default function DashboardWelcomeHeader({
  userName = "Mike Witzel",
  welcomeText = "here's what's happening with your store today.",
  initialStartDate,
  initialEndDate,
  onRangeChange,
  onRefresh,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pickerKey, setPickerKey] = useState(0);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPickerKey((key) => key + 1);
    if (onRefresh) onRefresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs transition-all duration-300">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Greeting */}
        <div className="flex items-center gap-2.5">
          <span
            className="text-xl leading-none"
            role="img"
            aria-label="waving hand"
          >
            👋
          </span>
          <p className="text-sm font-normal text-slate-500">
            <strong className="font-bold text-slate-900">Hi {userName},</strong>{" "}
            {welcomeText}
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 self-end lg:self-auto">
          <DateRangePicker
            key={pickerKey}
            initialStartDate={pickerKey ? undefined : initialStartDate}
            initialEndDate={pickerKey ? undefined : initialEndDate}
            onRangeSelect={onRangeChange}
          />

          <button
            type="button"
            onClick={handleRefresh}
            aria-label="Refresh Data"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 active:scale-95"
          >
            <HiOutlineArrowPath
              className={`h-4 w-4 transition-transform ${isRefreshing ? "animate-spin" : ""}`}
            />
          </button>

          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            aria-label="Toggle Header Section"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 active:scale-95"
          >
            {isCollapsed ? (
              <HiOutlineChevronDown className="h-4 w-4" />
            ) : (
              <HiOutlineChevronUp className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
