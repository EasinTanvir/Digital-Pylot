"use client";
import HeaderSearch from "./HeaderSearch";
import HeaderActions from "./HeaderActions";
import { getDashboardShell } from "@/data/dashboardShell";
import Image from "next/image";
import { ICONS } from "@/constants";
import { useGlobalContext } from "@/providers/GlobalContext";

export default function Header() {
  const content = getDashboardShell();
  const { isOpen, setIsOpen } = useGlobalContext();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between border-b border-border-150 bg-white px-4 lg:px-6">
      <div className="  flex items-center gap-3">
        <button
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          type="button"
          aria-label="Open navigation"
          className={`${isOpen ? "md:hidden flex" : "flex"} h-9 w-9 items-center justify-center rounded-md bg-primary shadow-card outline-none focus-visible:ring-2 focus-visible:ring-secondary md:hidden`}
        >
          <Image
            src={ICONS.sidebarToggle}
            alt=""
            width={16}
            height={16}
            className="rotate-180"
          />
        </button>
        <HeaderSearch placeholder={content?.searchPlaceholder || "Search"} />
      </div>

      <HeaderActions content={content} />
    </header>
  );
}
