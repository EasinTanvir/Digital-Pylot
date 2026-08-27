import Image from "next/image";
import { headers } from "next/headers";
import { ICONS } from "@/constants";
import { getDashboardShell } from "@/data/dashboardShell";
import StatCard from "@/components/pages/dashboard/StatCard";
import BestSellerList from "@/components/pages/dashboard/BestSellerList";
import RecentTransactions from "@/components/pages/dashboard/RecentTransactions";
import SalesAnalyticsChart from "@/components/pages/dashboard/SalesAnalyticsChart";
import SalesByCountryMap from "@/components/pages/dashboard/SalesByCountryMap";
import MissingIcon from "@/components/ui/MissingIcon";

async function getData(baseUrl, path, fallback) {
  const response = await fetch(`${baseUrl}${path}`, { cache: "no-store" });
  return response.ok ? response.json() : fallback;
}

export default async function DashboardPage() {
  const content = getDashboardShell();
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") || (host?.startsWith("localhost") ? "http" : "https");
  const apiBaseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;
  const years = await getData(apiBaseUrl, "/api/dashboard/sales-analytics/years", []);
  const selectedYear = years[0] || new Date().getFullYear();
  const [statsData, bestSellersData, transactionData, analyticsData, countryData] = await Promise.all([
    getData(apiBaseUrl, "/api/dashboard/stats", { weeklyEarning: 0, totalSales: 0, purchasedGoods: 0 }),
    getData(apiBaseUrl, "/api/dashboard/best-sellers?limit=5", []),
    getData(apiBaseUrl, "/api/dashboard/transactions?limit=5", []),
    getData(apiBaseUrl, `/api/dashboard/sales-analytics?year=${selectedYear}`, []),
    getData(apiBaseUrl, "/api/dashboard/sales-by-country?filter=this_week", []),
  ]);
  const stats = {
    weeklyEarning: { amount: statsData.weeklyEarning, currency: "USD", changePercent: 0, label: "this week" },
    totalSales: { value: statsData.totalSales, label: "all sale transactions" },
    purchasedGoods: { value: statsData.purchasedGoods, label: "inventory purchases" },
  };
  const bestSellers = bestSellersData.map((vehicle) => ({ id: vehicle.id, name: vehicle.name, image: vehicle.imageUrl, price: `$${Number(vehicle.dailyPrice).toFixed(2)}/day`, sales: vehicle.totalSalesCount }));
  const transactions = transactionData.map((transaction) => ({ id: transaction.transactionNumber, orderDetails: transaction.vehicle?.name || "Vehicle", image: transaction.vehicle?.imageUrl, time: new Date(transaction.createdAt).toLocaleDateString(), payment: transaction.transactionNumber, paymentMethod: transaction.paymentMethod, status: transaction.status === "success" ? "completed" : transaction.status, amount: `$${Number(transaction.amount).toFixed(2)}` }));
  const analytics = analyticsData.map((item) => ({ month: item.month, value: Number(item.totalAmount) }));
  const scaleMax = Math.max(1000, ...analytics.map((item) => item.value));
  const scale = { domain: [0, Math.ceil(scaleMax / 1000) * 1000], ticks: Array.from({ length: 6 }, (_, index) => Math.round((Math.ceil(scaleMax / 1000) * 1000 * index) / 5)) };
  const countries = countryData.map((country, index) => ({ country: country.country, sales: country.salesCount, isHighlighted: index === 0 }));

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5">
      <section className="flex flex-col gap-4 rounded-lg border border-border-100 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <MissingIcon label="Hi" />
          <p className="text-sm text-text-body">
            <strong className="text-base text-text-heading">
              Hi {content.userName},
            </strong>{" "}
            {content.welcomeText}
          </p>
        </div>
        <div className="flex items-center gap-2 self-end lg:self-auto">
          <button className="flex h-9 items-center gap-2 rounded-md border border-border-100 px-3 text-xs text-secondary">
            <Image src={ICONS.header.calendar} alt="" width={16} height={16} />
            {content.dateRange}
          </button>
          <button
            aria-label="Refresh"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border-100"
          >
            <Image src={ICONS.header.refresh} alt="" width={16} height={16} />
          </button>
          <button
            aria-label="Collapse"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border-100"
          >
            <Image src={ICONS.header.expand} alt="" width={16} height={16} />
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          type="earning"
          stat={stats.weeklyEarning}
          title={content.weeklyEarning}
          icon={ICONS.stats.earning}
        />
        <StatCard
          type="sales"
          stat={stats.totalSales}
          title={content.totalSales}
          icon={ICONS.stats.sales}
        />
        <StatCard
          type="purchased"
          stat={stats.purchasedGoods}
          title={content.purchasedGoods}
          icon={ICONS.stats.purchased}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(260px,.8fr)_minmax(500px,1.7fr)]">
        <BestSellerList
          products={bestSellers}
          title={content.bestSeller}
          viewAll={content.viewAll}
        />
        <RecentTransactions
          transactions={transactions}
          title={content.recentTransactions}
          viewAll={content.viewAll}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(500px,2fr)_minmax(270px,.9fr)]">
        <SalesAnalyticsChart
          data={analytics}
          title={content.salesAnalytics}
          year={selectedYear}
          scale={scale}
        />
        <SalesByCountryMap
          countries={countries}
          title={content.salesByCountries}
          thisWeek={content.thisWeek}
          increaseLabel={content.mapIncrease}
        />
      </section>

      <footer className="flex flex-col gap-1 border-t border-border-100 pt-3 text-[10px] text-text-body sm:flex-row sm:justify-between">
        <span>{content.footer}</span>
        <span>{content.credit}</span>
      </footer>
    </div>
  );
}
