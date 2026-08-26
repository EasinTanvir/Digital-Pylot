import Image from "next/image";
import { ICONS } from "@/constants";

export default function HeaderSearch({ placeholder }) {
  return <label className="hidden h-9 w-60 items-center rounded-md border border-border-100 bg-white px-3 md:flex">
    <Image src={ICONS.header.search} alt="" width={14} height={14} />
    <input aria-label={placeholder} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent px-2 text-xs text-text-heading outline-none placeholder:text-text-subtitle" />
    <kbd className="rounded bg-neutral-blue-50 px-1 text-[9px] text-text-body">⌘ K</kbd>
  </label>;
}
