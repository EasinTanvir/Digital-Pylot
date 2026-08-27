"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ICONS } from "@/constants";
import { navigationItems } from "@/lib/navigationItems";
import Container from "../../shared/Container";
import MobileMenu from "./MobileMenu";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sectionIds = navigationItems.map((item) => item.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full border-b border-border-150 bg-white backdrop-blur">
      <Container>
        <nav
          aria-label="Main navigation"
          className="flex h-20 items-center justify-between text-sm"
        >
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

          <div className="hidden items-center gap-9 lg:flex">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`transition-colors duration-200  hover:text-primary ${
                    isActive
                      ? "font-bold text-primary"
                      : "font-medium text-text-heading"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <span className="h-5 w-px bg-border-150" aria-hidden="true" />

            <Link
              href="/register"
              className="font-medium text-text-heading transition-colors duration-200  hover:text-primary"
            >
              Register
            </Link>

            <Link
              href="/login"
              className="rounded-sm bg-primary px-5 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-primary-alt "
            >
              Log In
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex items-center justify-center rounded-sm border border-border-100 p-2 text-secondary transition-colors duration-200 hover:border-primary hover:text-primary lg:hidden"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeSection={activeSection}
      />
    </header>
  );
}
