"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import { ICONS } from "@/constants";
import { HiChevronDown, HiOutlineArrowUp, HiOutlineMagnifyingGlass } from "react-icons/hi2";

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
  filter = "this_week",
  onFilterChange,
}) {
  const [selectedCountryName, setSelectedCountryName] = useState(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const dropdownRef = useRef(null);
  const filterOptions = [
    { label: "This Week", value: "this_week" },
    { label: "This Month", value: "this_month" },
    { label: "This Year", value: "this_year" },
  ];
  const timeframe = filterOptions.find((option) => option.value === filter)?.label || thisWeek;
  const matchingCountries = countries.filter((country) =>
    (country.country || country.name).toLowerCase().includes(countrySearch.toLowerCase()),
  );

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

  const selectedCountry =
    countries.find((country) => country.country === selectedCountryName) ||
    countries.find((country) => country.isHighlighted || country.defaultHighlighted) ||
    countries[0];

  return (
    <Card className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border-150 bg-white p-6 shadow-[0px_4px_60px_0px_rgba(231,231,231,0.47)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-bold text-text-heading">{title}</h2>

        <div className="flex items-center gap-2" ref={dropdownRef}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsCountryDropdownOpen((open) => !open)}
            className="flex max-w-28 items-center gap-1.5 truncate rounded-lg border border-border-150 bg-white px-3 py-1 text-xs font-medium text-text-body transition-colors hover:bg-neutral-blue-50"
          >
            <span className="truncate">{selectedCountryName || "Countries"}</span>
            <HiChevronDown className="h-3.5 w-3.5 shrink-0 text-text-body" />
          </button>
          {isCountryDropdownOpen && (
            <div className="absolute right-0 top-full z-30 mt-1 w-48 rounded-xl border border-border-150 bg-white p-2 shadow-lg">
              <label className="flex items-center gap-1.5 rounded-lg border border-border-150 px-2 py-1.5">
                <HiOutlineMagnifyingGlass className="h-3.5 w-3.5 text-text-body" />
                <input value={countrySearch} onChange={(event) => setCountrySearch(event.target.value)} placeholder="Search country" className="w-full bg-transparent text-xs outline-none" />
              </label>
              <button type="button" onClick={() => { setSelectedCountryName(null); setIsCountryDropdownOpen(false); }} className="mt-1 w-full rounded-lg px-2 py-1.5 text-left text-xs text-text-body hover:bg-neutral-blue-50">All countries</button>
              <div className="max-h-36 overflow-y-auto">
                {matchingCountries.map((country) => {
                  const name = country.country || country.name;
                  return <button key={name} type="button" onClick={() => { setSelectedCountryName(name); setIsCountryDropdownOpen(false); }} className={`w-full rounded-lg px-2 py-1.5 text-left text-xs hover:bg-neutral-blue-50 ${name === selectedCountryName ? "font-bold text-primary" : "text-text-body"}`}>{name}</button>;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Timeframe Selector Dropdown */}
        <div className="relative">
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
              {filterOptions.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    onFilterChange?.(item.value);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-left text-xs transition-colors hover:bg-neutral-blue-50 ${
                    item.value === filter
                      ? "font-bold text-text-heading"
                      : "text-text-body"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
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
              onClick={() => setSelectedCountryName(c.country || c.name)}
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
