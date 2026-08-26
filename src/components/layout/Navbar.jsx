"use client";

import { useState } from "react";

const navigationItems = ["Home", "How it Work", "Rental Details", "Why Choose Us", "Testimonial"];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-border-100 bg-white">
      <nav aria-label="Main navigation" className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#home" className="text-base font-bold text-secondary">Logo</a>

        <div className="hidden items-center gap-7 lg:flex">
          {navigationItems.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="text-[11px] font-medium text-text-body transition hover:text-secondary">{item}</a>)}
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <a href="#register" className="border-r border-border-100 pr-3 text-[11px] font-medium text-text-body">Register</a>
          <a href="#login" className="rounded bg-secondary px-4 py-2 text-[11px] font-bold text-white">Log In</a>
        </div>

        <button type="button" aria-label="Toggle navigation menu" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)} className="rounded border border-border-100 px-3 py-2 text-sm font-bold text-secondary sm:hidden">Menu</button>
      </nav>

      {isMenuOpen && <div className="border-t border-border-100 px-6 py-3 sm:hidden">{navigationItems.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm font-medium text-text-body">{item}</a>)}<div className="mt-2 flex gap-3"><a href="#register" className="text-sm font-medium text-text-body">Register</a><a href="#login" className="text-sm font-bold text-secondary">Log In</a></div></div>}
    </header>
  );
}
