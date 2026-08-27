"use client";

import { useMemo, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CategoryTabs from "@/components/sections/PopularDealsClient/CategoryTabs";
import CarDealCard from "@/components/sections/PopularDealsClient/CarDealCard";

export default function PopularDealsClient({
  categories = [],
  popularCars = [],
  carsByCategory = {},
}) {
  const tabs = useMemo(
    () => ["Popular", ...categories.map((category) => category.name)],
    [categories],
  );

  const [activeTab, setActiveTab] = useState("Popular");

  const visibleCars = useMemo(
    () =>
      activeTab === "Popular" ? popularCars : carsByCategory[activeTab] || [],
    [activeTab, carsByCategory, popularCars],
  );

  const handleRentCar = (car) => {
    // Isolated button click handler logic
    console.log("Rent button clicked for car:", car);
  };

  return (
    <section
      id="rental-details"
      aria-labelledby="popular-deals-title"
      className="bg-page-bg px-6 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          id="popular-deals-title"
          title="Most popular car rental deals"
          description="A high-performing web-based car rental system for any rent-a-car company and website"
        />

        {/* Category Tabs with Primary 4px Border */}
        <CategoryTabs
          tabs={tabs}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />

        {/* Card Grid */}
        <ul
          role="tabpanel"
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {visibleCars.map((car) => (
            <li key={car.id}>
              <CarDealCard car={car} onRentClick={handleRentCar} />
            </li>
          ))}
        </ul>

        {/* Footer Info Row - Perfectly Centered Primary Action Button */}
        <div className="relative mt-12 flex flex-col items-center justify-center gap-4">
          <button
            type="button"
            className="rounded-lg bg-primary px-8 py-3.5 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-primary-alt hover:shadow-lg active:scale-95"
          >
            Show more car
          </button>

          <p className="text-xs font-medium text-text-body sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2">
            {visibleCars.length} of {visibleCars.length} cars
          </p>
        </div>
      </div>
    </section>
  );
}
