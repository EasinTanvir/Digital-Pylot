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
    <article className="group relative flex  w-full lg:aspect-3/4.5 sm:aspect-3/3.5 aspect-square flex-col justify-between overflow-hidden rounded-[10px] bg-surface-150 p-5 transition-all duration-300 hover:shadow-xl ">
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src={car.image}
          alt={car?.name || "Car rental"}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

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
          <span className="text-xl font-bold text-white drop-shadow-sm">
            ${car?.price || "72.00"}
          </span>
          <span className="text-xs font-bold text-white/80"> / day</span>
        </div>

        <button
          type="button"
          onClick={handleRentClick}
          className="rounded-sm bg-primary md:px-5 px-4 md:py-2.5 py-2 sm:text-sm text-xs font-semibold text-white  transition-all duration-200 hover:bg-primary-alt hover:shadow-lg active:scale-95"
        >
          Rent Now
        </button>
      </div>
    </article>
  );
}
