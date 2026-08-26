import Image from "next/image";
import { ICONS } from "@/constants";
import MissingIcon from "@/components/ui/MissingIcon";

const actionIcons = ["maximize", "mail", "notification", "settings"];

export default function HeaderActions({ content }) {
  return (
    <div className="ml-auto flex items-center gap-2">
      <button
        type="button"
        className="hidden h-9 items-center gap-2 rounded-md border border-border-100 bg-white px-3 text-xs font-medium text-text-heading lg:flex"
      >
        {content.comingSoon}
        <Image src={ICONS.chevronDown} alt="" width={12} height={12} />
      </button>
      <button
        type="button"
        className="hidden h-9 items-center gap-1 rounded-md bg-primary px-3 text-xs font-bold text-white sm:flex"
      >
        <Image src={ICONS.header.addNew} alt="" width={13} height={13} />
        {content.addNew}
      </button>
      <button
        type="button"
        className="hidden h-9 items-center gap-1 rounded-md bg-secondary px-3 text-xs font-bold text-white sm:flex"
      >
        <Image src={ICONS.sales.pos} alt="" width={13} height={13} />
        {content.pos}
      </button>
      <div className="hidden h-9 w-9 items-center justify-center rounded-md border border-border-100 md:flex">
        <MissingIcon label="US" />
      </div>
      {actionIcons.map((name) => (
        <button
          key={name}
          type="button"
          aria-label={name}
          className="hidden h-9 w-9 items-center justify-center rounded-md border border-border-100 bg-white outline-none focus-visible:ring-2 focus-visible:ring-primary md:flex"
        >
          <Image src={ICONS.header[name]} alt="" width={16} height={16} />
        </button>
      ))}
      <Image
        src={ICONS.header.avatar}
        alt="Profile"
        width={32}
        height={32}
        className="rounded-md"
      />
    </div>
  );
}
