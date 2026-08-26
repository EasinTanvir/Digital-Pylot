import Image from "next/image";
import { ICONS } from "@/constants";
import { getStats } from "@/data/stats";
import { getBestSellers } from "@/data/bestSellers";
import { getTransactions } from "@/data/transactions";
import { getSalesAnalytics, getAvailableYears } from "@/data/salesAnalytics";
import { getSalesByCountry } from "@/data/salesByCountry";
import { getDashboardShell } from "@/data/dashboardShell";
import StatCard from "@/components/pages/dashboard/StatCard";
import BestSellerList from "@/components/pages/dashboard/BestSellerList";
import RecentTransactions from "@/components/pages/dashboard/RecentTransactions";
import SalesAnalyticsChart from "@/components/pages/dashboard/SalesAnalyticsChart";
import SalesByCountryMap from "@/components/pages/dashboard/SalesByCountryMap";
import MissingIcon from "@/components/ui/MissingIcon";

export default function DashboardPage() {
  const content = getDashboardShell();
  const stats = getStats();
  const years = getAvailableYears();

  return <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5">
    <section className="flex flex-col gap-4 rounded-lg border border-border-100 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-2"><MissingIcon label="Hi" /><p className="text-sm text-text-body"><strong className="text-base text-text-heading">Hi {content.userName},</strong> {content.welcomeText}</p></div>
      <div className="flex items-center gap-2 self-end lg:self-auto"><button className="flex h-9 items-center gap-2 rounded-md border border-border-100 px-3 text-xs text-secondary"><Image src={ICONS.header.calendar} alt="" width={16} height={16} />{content.dateRange}</button><button aria-label="Refresh" className="flex h-9 w-9 items-center justify-center rounded-md border border-border-100"><Image src={ICONS.header.refresh} alt="" width={16} height={16} /></button><button aria-label="Collapse" className="flex h-9 w-9 items-center justify-center rounded-md border border-border-100"><Image src={ICONS.header.expand} alt="" width={16} height={16} /></button></div>
    </section>

    <section className="grid gap-4 md:grid-cols-3"><StatCard type="earning" stat={stats.weeklyEarning} title={content.weeklyEarning} icon={ICONS.stats.earning} /><StatCard type="sales" stat={stats.totalSales} title={content.totalSales} icon={ICONS.stats.sales} /><StatCard type="purchased" stat={stats.purchasedGoods} title={content.purchasedGoods} icon={ICONS.stats.purchased} /></section>

    <section className="grid gap-4 xl:grid-cols-[minmax(260px,.8fr)_minmax(500px,1.7fr)]"><BestSellerList products={getBestSellers()} title={content.bestSeller} viewAll={content.viewAll} /><RecentTransactions transactions={getTransactions()} title={content.recentTransactions} viewAll={content.viewAll} /></section>

    <section className="grid gap-4 xl:grid-cols-[minmax(500px,2fr)_minmax(270px,.9fr)]"><SalesAnalyticsChart data={getSalesAnalytics()} title={content.salesAnalytics} year={years[0]} /><SalesByCountryMap countries={getSalesByCountry()} title={content.salesByCountries} thisWeek={content.thisWeek} increaseLabel={content.mapIncrease} /></section>

    <footer className="flex flex-col gap-1 border-t border-border-100 pt-3 text-[10px] text-text-body sm:flex-row sm:justify-between"><span>{content.footer}</span><span>{content.credit}</span></footer>
  </div>;
}
