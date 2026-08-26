"use client";

import { useState } from "react";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { HeartIcon } from "@/components/ui/Icons";

export default function CarDealCard() {
  const [saved, setSaved] = useState(false);

  return (
    <article className="relative overflow-hidden rounded-lg bg-surface-400 p-4">
      <button type="button" aria-label={saved ? "Remove All New Rush from saved cars" : "Save All New Rush"} aria-pressed={saved} onClick={() => setSaved(!saved)} className="absolute right-3 top-3 z-10 text-base text-secondary">
        <HeartIcon filled={saved} />
      </button>
      <h3 className="text-xs font-bold text-secondary">All New Rush</h3>
      <PlaceholderImage className="mx-auto mt-6 h-36 w-full object-contain" />
      <div className="mt-4 flex items-center justify-between gap-2">
        <p className="whitespace-nowrap text-xs font-bold text-secondary">$72.00/ <span className="font-medium">day</span></p>
        <a href="#booking-search" className="bg-white px-3 py-2 text-[10px] font-bold text-secondary">Rent Now</a>
      </div>
    </article>
  );
}
