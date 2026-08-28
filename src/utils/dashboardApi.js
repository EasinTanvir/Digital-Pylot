const DASHBOARD_ENDPOINTS = {
  stats: "/api/dashboard/stats",
  bestSellers: "/api/dashboard/best-sellers?limit=5",
  transactions: "/api/dashboard/transactions?limit=5",
  years: "/api/dashboard/sales-analytics/years",
};

async function fetchJson(url, { signal } = {}) {
  const response = await fetch(url, { signal, cache: "no-store" });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      body?.error || `Dashboard request failed (${response.status})`,
    );
  }

  return body;
}

function withParams(path, params) {
  const searchParams = new URLSearchParams(
    Object.entries(params).filter(
      ([, value]) => value !== null && value !== undefined && value !== "",
    ),
  );
  return searchParams.size ? `${path}?${searchParams}` : path;
}

export async function getDashboardData({
  startDate,
  endDate,
  year,
  countryFilter,
  signal,
}) {
  const requests = {
    stats: fetchJson(
      withParams(DASHBOARD_ENDPOINTS.stats, { startDate, endDate }),
      { signal },
    ),
    bestSellers: fetchJson(DASHBOARD_ENDPOINTS.bestSellers, { signal }),
    transactions: fetchJson(DASHBOARD_ENDPOINTS.transactions, { signal }),
    years: fetchJson(DASHBOARD_ENDPOINTS.years, { signal }),
    analytics: fetchJson(
      withParams("/api/dashboard/sales-analytics", { year }),
      { signal },
    ),
    countries: fetchJson(
      withParams("/api/dashboard/sales-by-country", { filter: countryFilter }),
      { signal },
    ),
  };

  const entries = Object.entries(requests);
  const results = await Promise.allSettled(
    entries.map(([, request]) => request),
  );
  const data = {};
  const errors = [];

  results.forEach((result, index) => {
    const [name] = entries[index];
    if (result.status === "fulfilled") data[name] = result.value;
    else if (result.reason?.name !== "AbortError")
      errors.push(`${name}: ${result.reason?.message || "Request failed"}`);
  });

  return { data, errors };
}

export function formatDashboardData(data) {
  const countryCoordinates = {
    Africa: { cx: 50, cy: 55 },
    Asia: { cx: 72, cy: 32 },
    Europe: { cx: 52, cy: 26 },
    Americas: { cx: 25, cy: 40 },
  };
  const analytics = (data.analytics || []).map((item) => ({
    month: item.month,
    value: Number(item.totalAmount),
  }));
  const scaleMax = Math.max(1000, ...analytics.map((item) => item.value));
  const roundedScaleMax = Math.ceil(scaleMax / 1000) * 1000;

  return {
    stats: {
      weeklyEarning: {
        amount: data.stats?.weeklyEarning || 0,
        currency: "USD",
        changePercent: 0,
        label: "this week",
      },
      totalSales: {
        value: data.stats?.totalSales || 0,
        label: "all sale transactions",
      },
      purchasedGoods: {
        value: data.stats?.purchasedGoods || 0,
        label: "inventory purchases",
      },
    },
    bestSellers: (data.bestSellers || []).map((vehicle) => ({
      id: vehicle.id,
      name: vehicle.name,
      image: vehicle.imageUrl,
      price: `$${Number(vehicle.dailyPrice).toFixed(2)}/day`,
      sales: vehicle.totalSalesCount,
    })),
    transactions: (data.transactions || []).map((transaction) => ({
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
    countries: (data.countries || []).map((country, index) => ({
      country: country.country,
      sales: country.salesCount,
      isHighlighted: index === 0,
      ...countryCoordinates[country.country],
    })),
  };
}

export { fetchJson, DASHBOARD_ENDPOINTS };
