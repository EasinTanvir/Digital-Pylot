"use client";

import { useState } from "react";
import {
  HiOutlineArrowPath,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import DateRangePicker from "./DateRangePicker";
import { ICONS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const pathName = usePathname();
  const router = useRouter();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPickerKey((key) => key + 1);
    if (onRefresh) onRefresh();
    setTimeout(() => setIsRefreshing(false), 800);
    router.push(pathName);
  };

  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs transition-all duration-300">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Greeting */}
        <div className="flex items-center gap-2.5">
          <Image
            className="object-cover"
            src={ICONS.handIcon}
            alt="hand_con"
            height={30}
            width={30}
          />
          <p className="font-bold  text-lg text-text-body">
            <strong className=" text-welcomeText text-xl">
              Hi {userName},
            </strong>{" "}
            {welcomeText}
          </p>
        </div>

        <Link
          href="/dashboard/leads"
          className="rounded-[5px] sm:hidden  block  bg-primary px-5 py-2.5 text-xs font-semibold text-white "
        >
          View Leads
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2 self-end lg:self-auto">
          <Link
            href="/dashboard/leads"
            className="sm:block hidden rounded-[5px]  bg-primary px-5 py-2.5 text-xs font-semibold text-white "
          >
            View Leads
          </Link>

          <DateRangePicker
            key={`${pickerKey}-${initialStartDate || "empty"}-${initialEndDate || "empty"}`}
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
