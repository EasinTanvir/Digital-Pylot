"use client";

import Link from "next/link";
import { navigationItems } from "@/lib/navigationItems";

export default function MobileMenu({ isOpen, onClose, activeSection }) {
  return (
    <div
      className={`absolute inset-x-0 top-full overflow-hidden border-t border-border-100 bg-white shadow-lg transition-all duration-300 ease-in-out lg:hidden ${
        isOpen
          ? "max-h-[500px] translate-y-0 opacity-100"
          : "max-h-0 -translate-y-2 opacity-0"
      }`}
    >
      <div className="px-6 py-5 text-sm">
        {navigationItems.map((item) => {
          const isActive = activeSection === item.href.replace("#", "");
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={`block py-3 transition-colors duration-200  hover:text-primary ${
                isActive
                  ? "font-bold text-primary"
                  : "font-medium text-text-heading"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

        <div className="mt-3 flex items-center gap-4 border-t border-border-100 pt-4">
          <Link
            href="/register"
            onClick={onClose}
            className="font-medium text-text-heading transition-colors duration-200  hover:text-primary"
          >
            Register
          </Link>

          <Link
            href="/login"
            onClick={onClose}
            className="rounded-[4px] bg-primary px-5 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-primary-alt"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
