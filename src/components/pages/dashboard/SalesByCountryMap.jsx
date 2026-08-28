"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import { ICONS } from "@/constants";
import { HiChevronDown, HiOutlineArrowUp } from "react-icons/hi2";

// Default coordinate hit-boxes for SVG overlay matching world map bounds
const COUNTRY_REGIONS = [
  { id: "usa", name: "United States", sales: "4210", cx: 20, cy: 30 },
  { id: "brazil", name: "South America", sales: "2150", cx: 28, cy: 65 },
  {
    id: "africa",
    name: "Africa",
    sales: "3455",
    cx: 50,
    cy: 55,
    defaultHighlighted: true,
  },
  { id: "china", name: "China", sales: "5120", cx: 72, cy: 32 },
  { id: "indonesia", name: "Indonesia", sales: "1890", cx: 78, cy: 62 },
];

export default function SalesByCountryMap({
  countries = COUNTRY_REGIONS,
  title = "Sales by Countries",
  thisWeek = "This Week",
  increaseLabel = "increase compare to last week",
  percentage = "48%",
}) {
  const [selectedCountry, setSelectedCountry] = useState(() => {
    return (
      countries.find((c) => c.isHighlighted || c.defaultHighlighted) ||
      countries[0]
    );
  });

  const [timeframe, setTimeframe] = useState(thisWeek);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close timeframe menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Card className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border-150 bg-white p-6 shadow-[0px_4px_60px_0px_rgba(231,231,231,0.47)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-text-heading">{title}</h2>

        {/* Timeframe Selector Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 rounded-lg border border-border-150 bg-white px-3 py-1 text-xs font-medium text-text-body transition-colors hover:bg-neutral-blue-50"
          >
            <span>{timeframe}</span>
            <HiChevronDown className="h-3.5 w-3.5 text-text-body" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 w-28 rounded-xl border border-border-150 bg-white py-1 shadow-lg">
              {["This Week", "This Month", "This Year"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setTimeframe(item);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-left text-xs transition-colors hover:bg-neutral-blue-50 ${
                    item === timeframe
                      ? "font-bold text-text-heading"
                      : "text-text-body"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Map Visual */}
      <div className="relative my-4 flex h-52 w-full items-center justify-center overflow-hidden">
        {/* Background Map Image */}
        <div className="relative h-full w-full">
          <Image
            src={ICONS?.mapView || "/images/world-map.png"}
            alt="World Sales Map"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Dynamic Selection Overlay Card */}
        {selectedCountry && (
          <div className="absolute left-1/2 top-1/2 z-10 w-44 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/40 shadow-xl transition-all duration-300">
            {/* Top Orange Section */}
            <div className="bg-[#FF9F43] py-2.5 text-center text-sm font-semibold text-white">
              {selectedCountry.country || selectedCountry.name}
            </div>
            {/* Bottom White Section */}
            <div className="bg-white py-3 text-center text-xs font-bold text-text-heading">
              {selectedCountry.sales} Sales
            </div>
          </div>
        )}

        {/* SVG Hotspots for Selecting Regions Dynamic */}
        <svg
          aria-label="Interactive world map hitboxes"
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full cursor-pointer"
        >
          {countries.map((c) => (
            <circle
              key={c.id || c.name}
              cx={`${c.cx}%`}
              cy={`${c.cy}%`}
              r="7"
              fill="transparent"
              onClick={() => setSelectedCountry(c)}
              className="hover:opacity-20 hover:fill-amber-400 transition-opacity"
            />
          ))}
        </svg>
      </div>

      {/* Footer Comparison Label */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-text-body">
        <span className="flex items-center gap-0.5 font-bold text-teal">
          <HiOutlineArrowUp className="h-3.5 w-3.5 stroke-[2.5]" />
          {percentage}
        </span>
        <span>{increaseLabel}</span>
      </div>
    </Card>
  );
}
