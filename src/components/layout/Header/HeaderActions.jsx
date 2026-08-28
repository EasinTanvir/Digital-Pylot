"use client";

import { useState } from "react";
import Image from "next/image";
import { ICONS } from "@/constants";

export default function HeaderActions({ content }) {
  const [unreadCount] = useState("01");

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-2.5">
      <button
        type="button"
        className="hidden h-10 items-center gap-2 rounded-[8px] border border-border-150 bg-white px-3 text-xs font-medium text-text-heading hover:bg-[#F7F7F7] md:flex"
      >
        <Image
          src={ICONS?.catImageIcon || ICONS?.header?.car}
          alt=""
          width={22}
          height={16}
          className="object-contain"
        />
        <span>{content?.comingSoon || "Coming Soon"}</span>
        <Image
          src={ICONS?.arrowDropdownIcon || ICONS?.chevronDown}
          alt=""
          width={10}
          height={10}
          className="opacity-70"
        />
      </button>

      <button
        type="button"
        className="flex h-10 items-center gap-1.5 rounded-sm bg-[#FF9F43] px-3.5 text-xs font-semibold text-white shadow-xs transition-opacity hover:opacity-90"
      >
        <Image
          src={ICONS?.CirclePlus || ICONS?.header?.addNew}
          alt=""
          width={15}
          height={15}
          className="brightness-0 invert"
        />
        <span>{content?.addNew || "Add New"}</span>
      </button>

      <button
        type="button"
        className="flex h-10 items-center gap-1.5 rounded-sm bg-secondary px-3.5 text-xs font-semibold text-white shadow-xs transition-opacity hover:opacity-90"
      >
        <Image
          src={ICONS?.DeviceLaptop || ICONS?.sales?.pos}
          alt=""
          width={15}
          height={15}
          className="brightness-0 invert"
        />
        <span>{content?.pos || "POS"}</span>
      </button>

      <div className="mx-1  min-h-full  p-1 bg-border-150" />

      <button
        type="button"
        aria-label="Select Language"
        className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-200 transition-colors hover:bg-surface-250"
      >
        <Image
          src={ICONS?.flagImage || ICONS?.header?.flag}
          alt="USA Flag"
          width={20}
          height={20}
          className="rounded-full object-cover"
        />
      </button>

      <button
        type="button"
        onClick={toggleFullscreen}
        aria-label="Toggle Fullscreen"
        className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-200 transition-colors hover:bg-surface-250"
      >
        <Image
          src={ICONS?.navMaximizeIcon || ICONS?.header?.maximize}
          alt="Maximize"
          width={18}
          height={18}
        />
      </button>

      <button
        type="button"
        aria-label="Messages"
        className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-200 transition-colors hover:bg-surface-250"
      >
        <Image
          src={ICONS?.navMailIcon || ICONS?.header?.mail}
          alt="Mail"
          width={18}
          height={18}
        />
        {unreadCount && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#FF0000] px-1 text-[9px] font-bold leading-none text-white border-2 border-white shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      <button
        type="button"
        aria-label="Notifications"
        className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-200 transition-colors hover:bg-surface-250"
      >
        <Image
          src={ICONS?.BellIcon || ICONS?.header?.notification}
          alt="Notifications"
          width={18}
          height={18}
        />
      </button>

      <button
        type="button"
        aria-label="Settings"
        className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-200 transition-colors hover:bg-surface-250"
      >
        <Image
          src={ICONS?.navSettingIcon || ICONS?.header?.settings}
          alt="Settings"
          width={18}
          height={18}
        />
      </button>

      <button
        type="button"
        aria-label="User profile"
        className="relative ml-0.5 h-10 w-10 overflow-hidden  "
      >
        <Image
          src={ICONS?.avatarImage || ICONS?.header?.avatar}
          alt="User Profile"
          fill
          className="object-cover rounded-md"
        />
      </button>
    </div>
  );
}
