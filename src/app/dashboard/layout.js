import Sidebar from "@/components/layout/Sidebar/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-page-bg">
      <Sidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
