"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "../shared/Container";
import { ICONS } from "@/constants";

const fields = [
  ["Locations", "Select your city"],
  ["Date", "Select your date"],
  ["Time", "Select your time"],
];

function SearchFields({ legend, prefix }) {
  const [openField, setOpenField] = useState(null);

  return (
    <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0">
      <legend className="mb-4 flex items-center gap-2 text-sm font-semibold text-secondary sm:col-span-3">
        <Image
          src={ICONS.circleIcon}
          alt=""
          width={16}
          height={16}
          className="inline-block"
        />
        <span>{legend}</span>
      </legend>

      {fields.map(([label, placeholder], idx) => {
        const isOpen = openField === idx;

        return (
          <label
            key={`${prefix}-${label}`}
            className={`block sm:px-3 ${
              idx !== fields.length - 1
                ? "sm:border-r sm:border-border-200"
                : ""
            }`}
          >
            <span className="block text-sm font-bold text-secondary">
              {label}
            </span>
            <div className="relative mt-1 flex items-center">
              <select
                required
                aria-label={`${legend} ${label}`}
                defaultValue=""
                onFocus={() => setOpenField(idx)}
                onBlur={() => setOpenField(null)}
                onChange={() => setOpenField(null)}
                className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-xs font-medium text-text-body outline-none"
              >
                <option value="" disabled>
                  {placeholder}
                </option>
                <option>London</option>
                <option>12 June 2026</option>
                <option>10:00 AM</option>
              </select>
              <Image
                src={ICONS.arrowDownIcon}
                alt=""
                width={12}
                height={12}
                className={`pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </label>
        );
      })}
    </fieldset>
  );
}

export default function BookingSearchBar() {
  return (
    <section
      id="booking-search"
      aria-label="Car booking search"
      className="relative z-20 bg-surface-300"
    >
      <Container className="relative lg:-translate-y-1/2 rounded-[10px] bg-white p-6 shadow-booking-searchbar">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <SearchFields legend="Pick – Up" prefix="pickup" />
            <SearchFields legend="Drop – Off" prefix="dropoff" />
          </div>

          <div className="flex flex-col items-center justify-center pt-2 lg:pt-0">
            <button className="w-full rounded-lg bg-primary px-8 py-3 text-xs font-semibold text-white shadow-xs transition-all duration-200 ease-in-out hover:scale-[1.02] hover:bg-primary-alt hover:shadow-md active:scale-95 lg:w-auto">
              Search
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
