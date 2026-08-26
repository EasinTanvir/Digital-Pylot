import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-page-bg">
      <Sidebar />
      <div className="min-w-0 flex flex-1 flex-col"><Header /><main className="flex-1 p-4 lg:p-6">{children}</main></div>
    </div>
  );
}
