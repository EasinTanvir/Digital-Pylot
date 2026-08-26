import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-dvh overflow-hidden bg-page-bg [--font-sans:var(--font-nunito-sans)]">
      <Sidebar />
      <div className="min-w-0 flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="min-h-0 flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
