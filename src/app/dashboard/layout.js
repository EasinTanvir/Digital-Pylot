import Header from "@/components/layout/Header/Header";
import Footer from "@/components/pages/dashboard/Footer";
import { GlobalProvider } from "@/providers/GlobalContext";
import DashboardLayoutWrapper from "@/components/pages/dashboard/DashboardLayoutWrapper";

export default function DashboardLayout({ children }) {
  return (
    <GlobalProvider>
      <div className="flex h-dvh overflow-hidden bg-page-bg font-nunito">
        <DashboardLayoutWrapper>
          <Header />

          <main className="min-h-0 flex-1 w-full overflow-y-auto p-4 lg:p-6">
            {children}
          </main>

          <Footer />
        </DashboardLayoutWrapper>
      </div>
    </GlobalProvider>
  );
}
