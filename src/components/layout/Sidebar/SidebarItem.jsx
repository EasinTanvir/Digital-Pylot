"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICONS } from "@/constants";

function getIcon(path) {
  return path.split(".").reduce((icon, key) => icon?.[key], ICONS);
}

export default function SidebarItem({ item, onNavigate }) {
  const pathname = usePathname();
  const Icon = getIcon(item.icon);
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={`group flex py-2.5 items-center rounded-lg px-4 text-sm font-medium leading-[21px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary ${
        isActive
          ? "bg-primary-50 text-primary"
          : "text-text-body hover:bg-neutral-blue-50"
      }`}
    >
      {Icon ? (
        <Image
          src={Icon}
          alt=""
          width={16}
          height={16}
          className="mr-2 h-4 w-4 shrink-0"
        />
      ) : (
        <div className="mr-2 flex h-3.5 w-3.5 shrink-0 items-center justify-center border border-dashed border-danger text-[8px] text-danger">
          ?
        </div>
      )}
      <div className="flex justify-between items-center w-full">
        <span className="truncate">{item.label}</span>
        {item.indicator && (
          <div
            className={` flex justify-center items-center w-5 h-5 rounded-full   ${item.indicator === "down" ? "bg-primary-100" : " bg-surface-300"}`}
          >
            <Image
              src={
                item.indicator === "down"
                  ? ICONS.chevronDown
                  : ICONS.chevronRight
              }
              alt=""
              width={item.indicator === "down" ? 12 : 4}
              height={item.indicator === "down" ? 12 : 7}
              className="o shrink-0"
            />
          </div>
        )}
      </div>
    </Link>
  );
}
