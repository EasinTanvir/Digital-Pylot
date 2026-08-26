"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CarDealCard from "@/components/ui/CarDealCard";
import { rentalCars } from "@/data/carRental";

const tabs = ["Popular", "Large Car", "Small Car", "Exclusive Car"];

export default function PopularDeals() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const visibleCars = activeTab === "Popular" ? rentalCars : rentalCars.filter((car) => car.category === activeTab);
  return <section id="popular-deals" aria-labelledby="popular-deals-title" className="bg-surface-250 px-6 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeader id="popular-deals-title" title="Most popular car rental deals" description="A high-performing web-based car rental system for any rent-a-car company and website" /><div role="tablist" aria-label="Car categories" className="mt-12 grid grid-cols-2 border-b border-border-150 sm:grid-cols-4">{tabs.map((tab) => <button key={tab} type="button" role="tab" aria-selected={tab === activeTab} onClick={() => setActiveTab(tab)} className={`border-b-2 px-2 py-4 text-xs font-medium transition ${tab === activeTab ? "border-primary text-secondary" : "border-transparent text-text-body hover:text-secondary"}`}>{tab}</button>)}</div><ul role="tabpanel" className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{visibleCars.map((car) => <li key={car.id}><CarDealCard car={car} /></li>)}</ul><div className="mt-8 flex items-center justify-between"><button type="button" className="rounded-lg bg-white px-5 py-3 text-xs font-bold text-secondary shadow-sm transition hover:shadow">Show more car</button><p className="text-xs text-text-body">{visibleCars.length} of 120 cars</p></div></div></section>;
}
