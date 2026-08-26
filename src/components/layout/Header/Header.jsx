import HeaderSearch from "./HeaderSearch";
import HeaderActions from "./HeaderActions";
import { getDashboardShell } from "@/data/dashboardShell";

export default function Header() {
  const content = getDashboardShell();
  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border-100 bg-white px-4 lg:px-6">
      <HeaderSearch placeholder={content.searchPlaceholder} />
      <HeaderActions content={content} />
    </header>
  );
}
