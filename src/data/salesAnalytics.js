export function getSalesAnalytics() {
  return [
    { month: "Jan", value: 25000 },
    { month: "Feb", value: 30000 },
    { month: "Mar", value: 17000 },
    { month: "Apr", value: 17000 },
    { month: "May", value: 21000 },
    { month: "Jun", value: 21000 },
    { month: "Jul", value: 30000 },
    { month: "Aug", value: 20000 },
    { month: "Sep", value: 21000 },
  ];
}

export function getAvailableYears() {
  return [2023, 2024, 2025];
}

export function getSalesAnalyticsScale() {
  return {
    domain: [10000, 60000],
    ticks: [10000, 20000, 30000, 40000, 50000, 60000],
  };
}
