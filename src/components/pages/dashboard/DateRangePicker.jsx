"use client";

import { useState, useRef, useEffect } from "react";
import {
  HiOutlineCalendar,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineXMark,
} from "react-icons/hi2";

export default function DateRangePicker({
  initialStartDate,
  initialEndDate,
  onRangeSelect,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(
    initialStartDate ? new Date(initialStartDate) : null,
  );
  const [endDate, setEndDate] = useState(
    initialEndDate ? new Date(initialEndDate) : null,
  );
  const [hoverDate, setHoverDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(startDate || new Date());
  const [error, setError] = useState("");

  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Calendar Helpers
  const daysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const startDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const formatDateLabel = (d) => {
    if (!d) return "";
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDisplayText = () => {
    if (startDate && endDate) {
      return `${formatDateLabel(startDate)} - ${formatDateLabel(endDate)}`;
    }
    if (startDate) {
      return `${formatDateLabel(startDate)} - Select End Date`;
    }
    return "Select Date Range";
  };

  const handleDateClick = (day) => {
    setError("");
    const selected = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );

    if (!startDate || (startDate && endDate)) {
      // Pick start date
      setStartDate(selected);
      setEndDate(null);
    } else if (startDate && !endDate) {
      // Pick end date with Validation
      if (selected < startDate) {
        setError("End date cannot be earlier than start date");
        return;
      }
      setEndDate(selected);
    }
  };

  const selectedToIso = (d) => d?.toISOString().split("T")[0];

  const isSelected = (day) => {
    const current = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    return (
      (startDate && current.getTime() === startDate.getTime()) ||
      (endDate && current.getTime() === endDate.getTime())
    );
  };

  const isInRange = (day) => {
    if (!startDate) return false;
    const current = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    const activeEnd = endDate || hoverDate;
    if (!activeEnd) return false;

    return current > startDate && current < activeEnd;
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const handleApply = () => {
    if (startDate && !endDate) {
      setError("Please select an end date");
      return;
    }
    onRangeSelect?.(
      startDate && endDate
        ? { startDate: selectedToIso(startDate), endDate: selectedToIso(endDate) }
        : { startDate: null, endDate: null },
    );
    setIsOpen(false);
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setError("");
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3.5 text-xs font-medium text-slate-700 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95"
      >
        <HiOutlineCalendar className="h-4 w-4 text-slate-500" />
        <span className="font-semibold text-slate-800">{getDisplayText()}</span>
      </button>

      {/* Date Picker Popover Panel */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2.5 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl ring-1 ring-black/5">
          {/* Header Month Navigation */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={prevMonth}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100"
            >
              <HiOutlineChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-bold text-slate-800">
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100"
            >
              <HiOutlineChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Validation Error Banner */}
          {error && (
            <div className="mb-2 rounded-md bg-red-50 px-2.5 py-1.5 text-[11px] font-medium text-red-600">
              {error}
            </div>
          )}

          {/* Days of Week Header */}
          <div className="mb-1 grid grid-cols-7 text-center text-[11px] font-semibold text-slate-400">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-y-1 text-center">
            {/* Blank leading slots */}
            {Array.from({ length: startDayOfMonth(currentMonth) }).map(
              (_, i) => (
                <div key={`empty-${i}`} />
              ),
            )}

            {/* Date Cells */}
            {Array.from({ length: daysInMonth(currentMonth) }).map((_, i) => {
              const day = i + 1;
              const selected = isSelected(day);
              const inRange = isInRange(day);
              const current = new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                day,
              );

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDateClick(day)}
                  onMouseEnter={() =>
                    startDate && !endDate && setHoverDate(current)
                  }
                  className={`flex h-8 w-full items-center justify-center text-xs font-medium transition-colors ${
                    selected
                      ? "rounded-md bg-primary font-bold text-white shadow-xs"
                      : inRange
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-700 hover:rounded-md hover:bg-slate-100"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800"
            >
              <HiOutlineXMark className="h-3.5 w-3.5" /> Clear
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="rounded-md bg-primary px-4 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-primary-alt active:scale-95"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
