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

  if (isEarning) {
    const amount = stat?.amount ?? 0;
    const currency = stat?.currency || "USD";
    const changePercent = stat?.changePercent ?? 0;
    const label = stat?.label || "increase compare to last week";

    return (
      <div className="relative flex  flex-col justify-between overflow-hidden rounded-lg border border-stroke bg-white p-7 transition-all duration-200 hover:shadow-md lg:col-span-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <p className="text-base font-semibold text-primary">
              {title || "Weekly Earning"}
            </p>

            <div className="pt-4">
              <h3 className="text-2xl font-bold  text-secondary sm:text-3xl">
                {formatCurrency(amount, currency)}
              </h3>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-success">
                <Image
                  src={arrowGreenIcon}
                  alt=""
                  width={14}
                  height={14}
                  className="h-3.5 w-3.5 object-contain"
                />
                <span className=" font-bold">{changePercent}%</span>
                <span className="font-normal text-text-body">{label}</span>
              </div>
            </div>
          </div>

          <div className="relative h-20 w-24 shrink-0">
            <Image
              src={icon}
              alt=""
              fill
              priority
              className="object-contain object-right"
            />
          </div>
        </div>
      </div>
    );
  }

  const displayValue =
    typeof stat === "object" && stat !== null ? (stat.value ?? 0) : (stat ?? 0);

  return (
    <div
      className={`relative flex  p-5 flex-col justify-between overflow-hidden rounded-lg ${
        isSales ? "bg-primary" : "bg-secondary"
      }  text-white shadow-2xs transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex items-start justify-between ">
        <div className="relative h-11 w-11 ">
          <Image src={icon} alt="" fill className="object-contain" />
        </div>

        <button
          type="button"
          onClick={handleReset}
          aria-label="Reset stat"
          className="rounded-full p-1 -mt-2 -mr-2 text-white/80 transition-transform duration-200 hover:bg-white/10 hover:text-white active:scale-90"
        >
          <Image
            src={resetIcon}
            alt="Reset"
            width={16}
            height={16}
            className={`h-4 w-4 transition-transform duration-500 ${
              isRefreshing ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div className="mt-3">
        <h3 className="text-2xl font-bold  text-white sm:text-3xl">
          {Number(displayValue).toLocaleString("en-US")}+
        </h3>
        <p className="mt-1 text-xs  text-white/90">
          {title || (isSales ? "No of Total Sales" : "No of Purchased Goods")}
        </p>
      </div>
    </div>
  );
}
