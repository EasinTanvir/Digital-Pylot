"use client";

import { useRef } from "react";
import Image from "next/image";
import { ICONS } from "@/constants";

export default function HeaderSearch({ placeholder }) {
  const inputRef = useRef(null);

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex h-10 w-[240px] cursor-text items-center justify-between rounded-md border border-border-150 bg-white px-3 transition-all focus-within:border-primary"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Image
          src={ICONS?.navSearchIcon || ICONS?.header?.search}
          alt="Search"
          width={17}
          height={17}
          className="shrink-0 opacity-50"
        />
        <input
          ref={inputRef}
          type="text"
          aria-label={placeholder}
          placeholder={placeholder}
          className="w-full bg-transparent text-xs text-gray-300 outline-none placeholder:text-gray-300"
        />
      </div>

      {/* Right Icon replacing kbd element */}
      <div className="flex shrink-0 items-center justify-center">
        <Image
          src={ICONS?.BadgeGhostWithLeftIcons || ICONS?.header?.shortcutBadge}
          alt="Shortcut Badge"
          width={32}
          height={20}
          className="object-contain"
        />
      </div>
    </div>
  );
}
