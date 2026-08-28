"use client";

import { usePathname, useRouter } from "next/navigation";
import { ICONS } from "@/constants";
import StatCard from "./StatCard";
import BestSellerList from "./BestSellerList";
import RecentTransactions from "./RecentTransactions";
import SalesAnalyticsChart from "./SalesAnalyticsChart";
import SalesByCountryMap from "./SalesByCountryMap";
import DashboardWelcomeHeader from "./DashboardWelcomeHeader";

export default function DashboardClientView({ content, data, filters }) {
  const router = useRouter();
  const pathname = usePathname();

  const updateFilters = (updates) => {
    const params = new URLSearchParams(
      Object.entries(filters).filter(([, value]) => typeof value === "string" && value),
    );
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") params.delete(key);
      else params.set(key, value);
    });
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const handleDateRangeChange = ({ startDate, endDate }) =>
    updateFilters({ startDate, endDate, dateMode: null });

  return (
    <>
      <DashboardWelcomeHeader
        userName={content.userName}
        welcomeText={content.welcomeText}
        initialStartDate={filters.dateMode === "all" ? undefined : filters.startDate}
        initialEndDate={filters.dateMode === "all" ? undefined : filters.endDate}
        onRangeChange={handleDateRangeChange}
        onRefresh={() => updateFilters({ startDate: null, endDate: null, dateMode: "all" })}
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard type="earning" stat={data.stats.weeklyEarning} title={content.weeklyEarning} icon={ICONS.stats.earning} arrowGreenIcon={ICONS.arrowUpGreenIcon} />
        <StatCard type="sales" stat={data.stats.totalSales} title={content.totalSales} icon={ICONS.stats.sales} resetIcon={ICONS.resetIconIcon} onReset={() => updateFilters({ startDate: null, endDate: null, dateMode: "all" })} />
        <StatCard type="purchased" stat={data.stats.purchasedGoods} title={content.purchasedGoods} icon={ICONS.stats.purchased} resetIcon={ICONS.resetIconIcon} onReset={() => updateFilters({ startDate: null, endDate: null, dateMode: "all" })} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(260px,.8fr)_minmax(500px,1.7fr)]">
        <BestSellerList products={data.bestSellers} title={content.bestSeller} viewAll={content.viewAll} />
        <RecentTransactions transactions={data.transactions} title={content.recentTransactions} viewAll={content.viewAll} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(500px,2fr)_minmax(270px,.9fr)]">
        <SalesAnalyticsChart data={data.analytics} title={content.salesAnalytics} year={filters.year} yearsList={data.years} scale={data.scale} onYearChange={(year) => updateFilters({ year })} />
        <SalesByCountryMap countries={data.countries} countryOptions={data.countryOptions} title={content.salesByCountries} thisWeek={content.thisWeek} increaseLabel={content.mapIncrease} filter={filters.countryFilter} selectedCountry={filters.country} onFilterChange={(countryFilter) => updateFilters({ countryFilter, country: null })} onCountryChange={(country) => updateFilters({ country })} />
      </section>
    </>
  );
}
