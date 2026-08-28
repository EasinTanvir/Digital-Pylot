"use client";

import { useCallback, useEffect, useState } from "react";
import { ICONS } from "@/constants";
import { getDashboardShell } from "@/data/dashboardShell";
import { formatDashboardData, getDashboardData } from "@/utils/dashboardApi";
import StatCard from "@/components/pages/dashboard/StatCard";
import BestSellerList from "@/components/pages/dashboard/BestSellerList";
import RecentTransactions from "@/components/pages/dashboard/RecentTransactions";
import SalesAnalyticsChart from "@/components/pages/dashboard/SalesAnalyticsChart";
import SalesByCountryMap from "@/components/pages/dashboard/SalesByCountryMap";
import DashboardWelcomeHeader from "@/components/pages/dashboard/DashboardWelcomeHeader";

const content = getDashboardShell();
const INITIAL_DATE_RANGE = { startDate: "2024-01-01", endDate: "2024-01-07" };
const EMPTY_DASHBOARD = formatDashboardData({});

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState(INITIAL_DATE_RANGE);
  const [selectedYear, setSelectedYear] = useState(
    String(new Date().getFullYear()),
  );
  const [countryFilter, setCountryFilter] = useState("this_week");
  const [dashboard, setDashboard] = useState(EMPTY_DASHBOARD);
  const [years, setYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const applyDashboardResponse = useCallback(
    ({ data, errors }) => {
      setDashboard(formatDashboardData(data));
      setError(errors.join(" • "));

      if (Array.isArray(data.years)) {
        const availableYears = data.years.map(String);
        setYears(availableYears);
        if (availableYears.length && !availableYears.includes(selectedYear)) {
          setSelectedYear(availableYears[0]);
        }
      }
      setIsLoading(false);
    },
    [selectedYear],
  );

  const loadDashboard = useCallback(
    async (signal) => {
      setIsLoading(true);
      const { data, errors } = await getDashboardData({
        ...dateRange,
        year: selectedYear,
        countryFilter,
        signal,
      });

      if (signal.aborted) return;
      applyDashboardResponse({ data, errors });
    },
    [applyDashboardResponse, countryFilter, dateRange, selectedYear],
  );

  useEffect(() => {
    const controller = new AbortController();
    getDashboardData({
      ...dateRange,
      year: selectedYear,
      countryFilter,
      signal: controller.signal,
    })
      .then((result) => {
        if (!controller.signal.aborted) applyDashboardResponse(result);
      })
      .catch((requestError) => {
        if (!controller.signal.aborted) {
          setError(requestError.message || "Unable to load dashboard data.");
          setIsLoading(false);
        }
      });
    return () => controller.abort();
  }, [applyDashboardResponse, countryFilter, dateRange, selectedYear]);

  const refreshDashboard = () => {
    loadDashboard(new AbortController().signal).catch((requestError) => {
      setError(requestError.message || "Unable to refresh dashboard data.");
      setIsLoading(false);
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5">
      <DashboardWelcomeHeader
        userName={content.userName}
        welcomeText={content.welcomeText}
        initialStartDate={INITIAL_DATE_RANGE.startDate}
        initialEndDate={INITIAL_DATE_RANGE.endDate}
        onRangeChange={setDateRange}
        onRefresh={refreshDashboard}
      />

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          Some dashboard data could not be loaded: {error}
        </p>
      )}
      {isLoading && (
        <p className="text-sm text-text-body">Loading dashboard data…</p>
      )}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          type="earning"
          stat={dashboard.stats.weeklyEarning}
          title={content.weeklyEarning}
          icon={ICONS.stats.earning}
          arrowGreenIcon={ICONS.arrowUpGreenIcon}
        />
        <StatCard
          type="sales"
          stat={dashboard.stats.totalSales}
          title={content.totalSales}
          icon={ICONS.stats.sales}
          resetIcon={ICONS.resetIconIcon}
          onReset={refreshDashboard}
        />
        <StatCard
          type="purchased"
          stat={dashboard.stats.purchasedGoods}
          title={content.purchasedGoods}
          icon={ICONS.stats.purchased}
          resetIcon={ICONS.resetIconIcon}
          onReset={refreshDashboard}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(260px,.8fr)_minmax(500px,1.7fr)]">
        <BestSellerList
          products={dashboard.bestSellers}
          title={content.bestSeller}
          viewAll={content.viewAll}
        />
        <RecentTransactions
          transactions={dashboard.transactions}
          title={content.recentTransactions}
          viewAll={content.viewAll}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(500px,2fr)_minmax(270px,.9fr)]">
        <SalesAnalyticsChart
          data={dashboard.analytics}
          title={content.salesAnalytics}
          year={selectedYear}
          yearsList={years}
          scale={dashboard.scale}
          onYearChange={setSelectedYear}
        />
        <SalesByCountryMap
          countries={dashboard.countries}
          title={content.salesByCountries}
          thisWeek={content.thisWeek}
          increaseLabel={content.mapIncrease}
          filter={countryFilter}
          onFilterChange={setCountryFilter}
        />
      </section>
    </div>
  );
}
