import PopularDealsClient from "./PopularDealsClient";
import { headers } from "next/headers";

const toCard = (vehicle) => ({
  id: vehicle.id,
  name: vehicle.name,
  type: vehicle.subCategory?.name || "Vehicle",
  price: Number(vehicle.dailyPrice),
  rating: vehicle.rating,
  image: vehicle.imageUrl,
  alt: vehicle.imageAlt || vehicle.name,
});

async function getApiBaseUrl() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ||
    (host?.startsWith("localhost") ? "http" : "https");
  return process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;
}

async function getData(baseUrl, path) {
  const response = await fetch(`${baseUrl}${path}`, {
    next: { revalidate: 300 },
  });
  return response.ok ? response.json() : [];
}

export default async function PopularDeals() {
  const apiBaseUrl = await getApiBaseUrl();
  const categories = await getData(apiBaseUrl, "/api/categories");
  const [popularCars, ...categoryCars] = await Promise.all([
    getData(apiBaseUrl, "/api/vehicles/popular"),
    ...categories.map((category) =>
      getData(apiBaseUrl, `/api/vehicles?category=${category.id}`),
    ),
  ]);
  const carsByCategory = Object.fromEntries(
    categories.map((category, index) => [
      category.name,
      categoryCars[index].map(toCard),
    ]),
  );
  return (
    <PopularDealsClient
      categories={categories}
      popularCars={popularCars.map(toCard)}
      carsByCategory={carsByCategory}
    />
  );
}
