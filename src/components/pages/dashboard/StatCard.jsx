"use client";

import { useState } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/formatCurrency";

export default function StatCard({
  type,
  stat,
  title,
  icon,
  arrowGreenIcon,
  resetIcon,
  onReset,
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const isEarning = type === "earning";
  const isSales = type === "sales";

  const handleReset = (e) => {
    e.stopPropagation();
    setIsRefreshing(true);
    if (onReset) onReset(type);
    setTimeout(() => setIsRefreshing(false), 750);
  };

  // 1. WEEKLY EARNING CARD
  if (isEarning) {
    const amount = stat?.amount ?? 0;
    const currency = stat?.currency || "USD";
    const changePercent = stat?.changePercent ?? 0;
    const label = stat?.label || "increase compare to last week";

    return (
      <div className="relative flex min-h-[145px] flex-col justify-between overflow-hidden rounded-xl border border-border-100 bg-white p-5 shadow-2xs transition-all duration-200 hover:shadow-md lg:col-span-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-primary">
              {title || "Weekly Earning"}
            </p>
            <h3 className="text-2xl font-bold tracking-tight text-text-heading sm:text-3xl">
              {formatCurrency(amount, currency)}
            </h3>
          </div>

          {/* Right Graphic Icon */}
          {icon && (
            <div className="relative h-20 w-24 shrink-0">
              <Image
                src={icon}
                alt=""
                fill
                priority
                className="object-contain object-right"
              />
            </div>
          )}
        </div>

        {/* Green Arrow & Trend Percentage */}
        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-success">
          {arrowGreenIcon ? (
            <Image
              src={arrowGreenIcon}
              alt=""
              width={14}
              height={14}
              className="h-3.5 w-3.5 object-contain"
            />
          ) : (
            <span>▲</span>
          )}
          <span>{changePercent}%</span>
          <span className="font-normal text-text-body">{label}</span>
        </div>
      </div>
    );
  }

  // 2. TOTAL SALES & PURCHASED GOODS CARDS
  const displayValue =
    typeof stat === "object" && stat !== null ? (stat.value ?? 0) : (stat ?? 0);

  return (
    <div
      className={`relative flex min-h-[145px] flex-col justify-between overflow-hidden rounded-xl ${
        isSales ? "bg-primary" : "bg-secondary"
      } p-5 text-white shadow-2xs transition-all duration-200 hover:shadow-md`}
    >
      {/* Top Header Row: Main Icon + Reset Button */}
      <div className="flex items-start justify-between">
        {icon ? (
          <div className="relative h-11 w-11">
            <Image src={icon} alt="" fill className="object-contain" />
          </div>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={handleReset}
          aria-label="Reset stat"
          className="rounded-full p-1 text-white/80 transition-transform duration-200 hover:bg-white/10 hover:text-white active:scale-90"
        >
          {resetIcon ? (
            <Image
              src={resetIcon}
              alt="Reset"
              width={16}
              height={16}
              className={`h-4 w-4 transition-transform duration-500 ${
                isRefreshing ? "rotate-180" : ""
              }`}
            />
          ) : (
            <span
              className={`inline-block transition-transform duration-500 ${
                isRefreshing ? "rotate-180" : ""
              }`}
            >
              ↻
            </span>
          )}
        </button>
      </div>

      {/* Bottom Content Row */}
      <div className="mt-3">
        <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {Number(displayValue).toLocaleString("en-US")}+
        </h3>
        <p className="mt-1 text-xs font-medium text-white/90">
          {title || (isSales ? "No of Total Sales" : "No of Purchased Goods")}
        </p>
      </div>
    </div>
  );
}
