import HeaderSearch from "./HeaderSearch";
import HeaderActions from "./HeaderActions";
import { getDashboardShell } from "@/data/dashboardShell";

export default function Header() {
  const content = getDashboardShell();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between border-b border-border-150 bg-white px-4 lg:px-6">
      <HeaderSearch placeholder={content?.searchPlaceholder || "Search"} />
      <HeaderActions content={content} />
    </header>
  );
}
