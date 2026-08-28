import { Suspense } from "react";
import { getDashboardShell } from "@/data/dashboardShell";
import {
  getAvailableYears,
  getBestSellers,
  getPurchasedGoodsCount,
  getRecentTransactions,
  getSalesAnalytics,
  getSalesByCountries,
  getTotalSalesCount,
} from "../../../db/queries.js";
import DashboardClientView from "@/components/pages/dashboard/DashboardClientView";

const COUNTRY_FILTERS = new Set([
  "this_week",
  "this_month",
  "this_year",
  "all",
]);

function getValue(searchParams, key) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

function getDateRange(searchParams) {
  const startDate = getValue(searchParams, "startDate");
  const endDate = getValue(searchParams, "endDate");
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(startDate || "") ||
    !/^\d{4}-\d{2}-\d{2}$/.test(endDate || "")
  ) {
    return { startDate: null, endDate: null };
  }

  const start = new Date(`${startDate}T00:00:00.000Z`);
  const end = new Date(`${endDate}T00:00:00.000Z`);
  if (
    Number.isNaN(start.valueOf()) ||
    Number.isNaN(end.valueOf()) ||
    end < start
  ) {
    return { startDate: null, endDate: null };
  }
  end.setUTCDate(end.getUTCDate() + 1);
  return { startDate: start, endDate: end };
}

function getFilters(searchParams) {
  const countryFilter = getValue(searchParams, "countryFilter");
  return {
    startDate: getValue(searchParams, "startDate"),
    endDate: getValue(searchParams, "endDate"),
    dateMode: getValue(searchParams, "dateMode"),
    year: /^\d{4}$/.test(getValue(searchParams, "year") || "")
      ? getValue(searchParams, "year")
      : "2025",
    countryFilter: COUNTRY_FILTERS.has(countryFilter)
      ? countryFilter
      : "this_week",
    country: getValue(searchParams, "country") || null,
  };
}

export default async function DashboardPage({ searchParams }) {
  const queryParams = await searchParams;
  const filters = getFilters(queryParams);

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardData searchParams={queryParams} filters={filters} />
      </Suspense>
    </div>
  );
}

async function DashboardData({ searchParams, filters }) {
  try {
    const dateRange = getDateRange(searchParams);
    const [
      statsSales,
      purchasedGoods,
      weeklyCountries,
      bestSellersData,
      transactionData,
      analyticsData,
      countryData,
      countryOptionsData,
      availableYears,
    ] = await Promise.all([
      getTotalSalesCount(dateRange.startDate, dateRange.endDate),
      getPurchasedGoodsCount(dateRange.startDate, dateRange.endDate),
      getSalesByCountries("this_week"),
      getBestSellers(5),
      getRecentTransactions(5),
      getSalesAnalytics(Number(filters.year)),
      getSalesByCountries(filters.countryFilter, filters.country),
      getSalesByCountries(filters.countryFilter),
      getAvailableYears(),
    ]);

    const analytics = analyticsData.map((item) => ({
      month: item.month,
      value: Number(item.totalAmount),
    }));
    const scaleMax = Math.max(1000, ...analytics.map((item) => item.value));
    const roundedScaleMax = Math.ceil(scaleMax / 1000) * 1000;
    const weeklyEarning = weeklyCountries.reduce(
      (total, country) => total + Number(country.totalRevenue || 0),
      0,
    );
    const countryCoordinates = {
      Africa: { cx: 50, cy: 55 },
      Asia: { cx: 72, cy: 32 },
      Europe: { cx: 52, cy: 26 },
      Americas: { cx: 25, cy: 40 },
    };

    const data = {
      stats: {
        weeklyEarning: {
          amount: weeklyEarning,
          currency: "USD",
          changePercent: 0,
          label: "this week",
        },
        totalSales: { value: statsSales },
        purchasedGoods: { value: purchasedGoods },
      },
      bestSellers: bestSellersData.map((vehicle) => ({
        id: vehicle.id,
        name: vehicle.name,
        image: vehicle.imageUrl,
        price: `$${Number(vehicle.dailyPrice).toFixed(2)}/day`,
        sales: vehicle.totalSalesCount,
      })),
      transactions: transactionData.map((transaction) => ({
        id: transaction.transactionNumber,
        orderDetails: transaction.vehicle?.name || "Vehicle",
        image: transaction.vehicle?.imageUrl,
        time: new Date(transaction.createdAt).toLocaleDateString(),
        payment: transaction.transactionNumber,
        paymentMethod: transaction.paymentMethod,
        status:
          transaction.status === "success" ? "completed" : transaction.status,
        amount: `$${Number(transaction.amount).toFixed(2)}`,
      })),
      analytics,
      scale: {
        domain: [0, roundedScaleMax],
        ticks: Array.from({ length: 6 }, (_, index) =>
          Math.round((roundedScaleMax * index) / 5),
        ),
      },
      countries: countryData.map((country, index) => ({
        country: country.country,
        sales: country.salesCount,
        isHighlighted: index === 0,
        ...countryCoordinates[country.country],
      })),
      countryOptions: countryOptionsData.map((country, index) => ({
        country: country.country,
        sales: country.salesCount,
        isHighlighted: index === 0,
        ...countryCoordinates[country.country],
      })),
      years: availableYears.map(String),
    };

    return (
      <DashboardClientView
        content={getDashboardShell()}
        data={data}
        filters={filters}
      />
    );
  } catch {
    return <DashboardError />;
  }
}

function DashboardSkeleton() {
  return (
    <div
      className="animate-pulse space-y-5"
      aria-label="Loading dashboard data"
    >
      <div className="h-20 rounded-xl bg-slate-200" />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="h-36 rounded-xl bg-slate-200 lg:col-span-2" />
        <div className="h-36 rounded-xl bg-slate-200" />
        <div className="h-36 rounded-xl bg-slate-200" />
      </section>
      <section className="grid gap-4 xl:grid-cols-2">
        <div className="h-72 rounded-2xl bg-slate-200" />
        <div className="h-72 rounded-2xl bg-slate-200" />
      </section>
      <section className="grid gap-4 xl:grid-cols-2">
        <div className="h-96 rounded-2xl bg-slate-200" />
        <div className="h-96 rounded-2xl bg-slate-200" />
      </section>
    </div>
  );
}

function DashboardError() {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800"
    >
      <h2 className="font-bold">Dashboard data is unavailable</h2>
      <p className="mt-1 text-sm">Please refresh the page and try again.</p>
    </div>
  );
}
