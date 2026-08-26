"use client";

import { useState } from "react";
import Image from "next/image";
import { HeartIcon } from "@/components/ui/Icons";

export default function CarDealCard({ car }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border-100 bg-white shadow-[0_10px_30px_rgba(17,19,35,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(17,19,35,0.14)]">
      <button type="button" aria-label={saved ? `Remove ${car.name} from saved cars` : `Save ${car.name}`} aria-pressed={saved} onClick={() => setSaved(!saved)} className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-base text-secondary shadow-sm backdrop-blur">
        <HeartIcon filled={saved} />
      </button>
      <div className="relative h-44 overflow-hidden bg-surface-150"><Image src={car.image} alt={car.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-secondary backdrop-blur">{car.type}</span></div>
      <div className="p-4"><div className="flex items-start justify-between gap-2"><div><h3 className="text-sm font-bold text-secondary">{car.name}</h3><p className="mt-1 text-[11px] text-text-body">★ {car.rating} · Automatic</p></div><p className="whitespace-nowrap text-sm font-extrabold text-secondary">${car.price}<span className="text-[10px] font-medium text-text-body">/day</span></p></div><a href="#booking-search" className="mt-4 block rounded-lg bg-primary px-3 py-2.5 text-center text-xs font-bold text-white transition hover:bg-primary-alt">Rent Now</a></div>
    </article>
  );
}
