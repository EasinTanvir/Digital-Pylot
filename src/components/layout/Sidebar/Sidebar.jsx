"use client";

import Image from "next/image";
import { ICONS } from "@/constants";
import { getSidebarNavigation } from "@/data/sidebarNavigation";
import SidebarSection from "./SidebarSection";
import { useGlobalContext } from "@/providers/GlobalContext";

export default function Sidebar() {
  const { isOpen, closeSidebar } = useGlobalContext();

  const navigation = getSidebarNavigation();

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-gray-overlay lg:hidden"
        />
      )}

      <aside
        aria-label="Dashboard navigation"
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-border-100 bg-white transition-transform duration-200 lg:static  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative flex h-16 shrink-0 items-center border-b border-border-100 px-5">
          <Image
            src={ICONS.logo}
            alt="Best Car"
            width={115}
            height={36}
            priority
          />
          <button
            type="button"
            aria-label="Close navigation"
            onClick={closeSidebar}
            className={`absolute -right-2 top-6  h-4 w-4 items-center justify-center rounded-full bg-primary outline-none focus-visible:ring-2 focus-visible:ring-secondary  ${isOpen ? "flex " : "md:flex hidden"}`}
          >
            <Image src={ICONS.sidebarToggle} alt="" width={10} height={10} />
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navigation.map((group, index) => (
            <SidebarSection
              key={group.section}
              {...group}
              isLast={index === navigation.length - 1}
              onNavigate={closeSidebar}
            />
          ))}
          <div className="text-secondary w-full font-bold border-t pb-2 border-border-150  mt-4 pt-4">
            Promo
          </div>
        </nav>
      </aside>
    </>
  );
}
