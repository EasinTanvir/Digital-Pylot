"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CarDealCard from "@/components/ui/CarDealCard";

const tabs = ["Popular", "Large Car", "Small Car", "Exclusive Car"];

export default function PopularDeals() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return <section id="popular-deals" aria-labelledby="popular-deals-title" className="bg-surface-250 px-6 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeader id="popular-deals-title" title="Most popular car rental deals" description="A high-performing web-based car rental system for any rent-a-car company and website" /><div role="tablist" aria-label="Car categories" className="mt-12 grid grid-cols-2 border-b border-border-150 sm:grid-cols-4">{tabs.map((tab) => <button key={tab} type="button" role="tab" aria-selected={tab === activeTab} onClick={() => setActiveTab(tab)} className={`border-b-2 px-2 py-4 text-xs font-medium ${tab === activeTab ? "border-secondary text-secondary" : "border-transparent text-text-body"}`}>{tab}</button>)}</div><ul role="tabpanel" className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 8 }, (_, index) => <li key={index}><CarDealCard /></li>)}</ul><div className="mt-8 flex items-center justify-between"><button type="button" className="bg-white px-5 py-3 text-[10px] font-bold text-secondary">Show more car</button><p className="text-[10px] text-text-body">120 Car</p></div></div></section>;
}
