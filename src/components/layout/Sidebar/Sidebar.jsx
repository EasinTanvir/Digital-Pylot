"use client";

import { useState } from "react";
import Image from "next/image";
import { ICONS } from "@/constants";
import { getSidebarNavigation } from "@/data/sidebarNavigation";
import SidebarSection from "./SidebarSection";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => setIsOpen(false);
  const navigation = getSidebarNavigation();

  return (
    <>
      <button
        type="button"
        aria-label="Open navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="fixed left-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-md bg-primary shadow-card outline-none focus-visible:ring-2 focus-visible:ring-secondary md:hidden"
      >
        <Image src={ICONS.sidebarToggle} alt="" width={16} height={16} className="rotate-180" />
      </button>

      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-gray-overlay md:hidden"
        />
      )}

      <aside
        aria-label="Dashboard navigation"
        className={`fixed inset-y-0 left-0 z-40 flex w-[169px] flex-col border-r border-border-100 bg-white transition-transform duration-200 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative flex h-11 shrink-0 items-center border-b border-border-100 px-4">
          <Image src={ICONS.logo} alt="Best Car" width={64} height={20} priority />
          <button
            type="button"
            aria-label="Close navigation"
            onClick={closeSidebar}
            className="absolute -right-2 top-3 hidden h-4 w-4 items-center justify-center rounded-full bg-primary outline-none focus-visible:ring-2 focus-visible:ring-secondary md:flex"
          >
            <Image src={ICONS.sidebarToggle} alt="" width={10} height={10} />
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navigation.map((group, index) => (
            <SidebarSection
              key={group.section}
              {...group}
              isLast={index === navigation.length - 1}
              onNavigate={closeSidebar}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}
