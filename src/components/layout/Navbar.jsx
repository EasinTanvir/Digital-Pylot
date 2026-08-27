"use client";

import { useState } from "react";
import { ICONS } from "@/constants";
import { navigationItems } from "@/lib/navigationItems";
import Link from "next/link";
// ICONS.logo

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border-100 bg-white/90 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8"
      >
        <a
          href="#home"
          className="text-lg font-extrabold tracking-tight text-secondary"
        >
          Logo<span className="text-primary">.</span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              className="text-[11px] font-medium text-text-body transition hover:text-secondary"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="#register"
            className="border-r border-border-100 pr-3 text-[11px] font-medium text-text-body"
          >
            Register
          </Link>
          <Link
            href="#login"
            className="rounded-lg bg-primary px-4 py-2 text-[11px] font-bold text-white transition hover:bg-primary-alt"
          >
            Log In
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="rounded border border-border-100 px-3 py-2 text-sm font-bold text-secondary lg:hidden"
        >
          Menu
        </button>
      </nav>

      {isMenuOpen && (
        <div className="absolute inset-x-0 top-full border-t border-border-100 bg-white px-6 py-5 shadow-xl lg:hidden">
          {navigationItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              onClick={() => setIsMenuOpen(false)}
              className="block py-3 text-sm font-medium text-text-body"
            >
              {item}
            </a>
          ))}
          <div className="mt-2 flex gap-3">
            <a href="#register" className="text-sm font-medium text-text-body">
              Register
            </a>
            <a href="#login" className="text-sm font-bold text-primary">
              Log In
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
