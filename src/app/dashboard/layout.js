import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/pages/dashboard/Footer";
import SidebarWrapper from "@/components/layout/Sidebar/SidebarWrapper";
import { GlobalProvider } from "@/providers/GlobalContext";

export default function DashboardLayout({ children }) {
  return (
    <GlobalProvider>
      <div className="flex h-dvh overflow-hidden bg-page-bg  font-nunito">
        <SidebarWrapper />
        <div className="min-w-0 flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="min-h-0 flex-1 overflow-y-auto p-4 lg:p-6">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </GlobalProvider>
  );
}
