"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ICONS } from "@/constants";
import { navigationItems } from "@/lib/navigationItems";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full border-b border-border-100 bg-white backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 text-sm lg:px-10"
      >
        {/* Logo */}
        <Link href="/#home" className="flex shrink-0 items-center">
          <Image
            src={ICONS.logo}
            alt="Logo"
            width={120}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-7 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={`/${item.href}`}
              className="font-medium text-text-body transition hover:text-secondary"
            >
              {item.label}
            </Link>
          ))}

          <span className="h-5 w-px bg-border-100" aria-hidden="true" />

          <button className="font-medium text-text-body transition hover:text-secondary">
            Register
          </button>

          <button className="rounded-[4px] bg-primary px-5 py-2.5 font-medium text-white transition hover:bg-primary-alt">
            Log In
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex items-center justify-center rounded-[4px] border border-border-100 p-2 text-secondary lg:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-full border-t border-border-100 bg-white px-6 py-5 shadow-lg lg:hidden">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={`/${item.href}`}
              onClick={() => setIsMenuOpen(false)}
              style={{ fontSize: "16px" }}
              className="block py-3 font-medium text-text-body"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-3 flex items-center gap-4 border-t border-border-100 pt-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              style={{ fontSize: "16px" }}
              className="font-medium text-text-body"
            >
              Register
            </button>

            <button
              onClick={() => setIsMenuOpen(false)}
              style={{ fontSize: "16px" }}
              className="rounded-[4px] bg-primary px-5 py-2.5 font-medium text-white"
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
