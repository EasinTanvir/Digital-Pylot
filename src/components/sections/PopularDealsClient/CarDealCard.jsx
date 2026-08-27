"use client";

import { useState } from "react";
import Image from "next/image";
import { ICONS } from "@/constants";

export default function CarDealCard({ car, onRentClick }) {
  const [saved, setSaved] = useState(false);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setSaved((prev) => !prev);
  };

  const handleRentClick = (e) => {
    e.stopPropagation();
    if (onRentClick) {
      onRentClick(car);
    }
  };

  return (
    <article className="group relative flex h-[380px] w-full flex-col justify-between overflow-hidden rounded-2xl bg-surface-150 p-5 transition-all duration-300 hover:shadow-xl sm:h-[400px]">
      {/* 1. Full-Bleed Card Background Image */}
      <div className="absolute inset-0 z-0 h-full w-full">
        {car?.image ? (
          <Image
            src={car.image}
            alt={car?.name || "Car rental"}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-200 text-gray-400">
            <svg
              className="h-16 w-16 stroke-current opacity-30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Soft dark gradient overlay for readable text over bright images */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 opacity-80 transition-opacity duration-300 group-hover:opacity-70" />
      </div>

      {/* 2. Overlaid Header: Title & Separate Heart Action */}
      <div className="relative z-10 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white drop-shadow-sm truncate max-w-[80%]">
          {car?.name || "All New Rush"}
        </h3>

        <button
          type="button"
          aria-label={saved ? "Remove from saved" : "Save car"}
          aria-pressed={saved}
          onClick={handleHeartClick}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white p-1.5 text-secondary backdrop-blur-md transition-transform duration-200 active:scale-90 hover:bg-white"
        >
          <Image
            src={ICONS.heartIcon}
            alt="Heart"
            width={20}
            height={20}
            className={`transition-opacity ${saved ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
          />
        </button>
      </div>

      {/* 3. Overlaid Bottom Footer: Price & Primary Rent Now Button */}
      <div className="relative z-10 flex items-center justify-between gap-2 pt-2">
        <div>
          <span className="text-xl font-extrabold text-white drop-shadow-sm">
            ${car?.price || "72.00"}
          </span>
          <span className="text-xs font-medium text-white/80"> / day</span>
        </div>

        <button
          type="button"
          onClick={handleRentClick}
          className="rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-primary-alt hover:shadow-lg active:scale-95"
        >
          Rent Now
        </button>
      </div>
    </article>
  );
}
