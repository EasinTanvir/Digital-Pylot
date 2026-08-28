import { db } from "../db.js";
import { vehicles } from "../schema.js";
import { rentalCars } from "../../src/data/carRental.js";

const featurePool = [
  "AC",
  "GPS",
  "Bluetooth",
  "Child Seat",
  "Sunroof",
  "Backup Camera",
  "Heated Seats",
];
const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomFeatures() {
  const count = 2 + Math.floor(Math.random() * 3); // 2–4 features
  const shuffled = [...featurePool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const categoryForCar = {
  "All New Rush": "Small Car",
  "Range Rover Velar": "Large Car",
  "Tesla Model 3": "Small Car",
  "Audi A5 Sportback": "Exclusive Car",
  "Volvo XC60": "Large Car",
  "Mini Cooper S": "Small Car",
  "BMW X5": "Large Car",
  "Porsche Taycan": "Exclusive Car",
};

// Base catalog, tagged with brand
const baseCatalog = rentalCars.map((car) => ({
  ...car,
  brand:
    car.name === "All New Rush"
      ? "Toyota"
      : car.name.startsWith("Range Rover")
        ? "Range Rover"
        : car.name.split(" ")[0],
}));

// One row per model — no trim variants. Each name is unique in the DB, which is
// what lets the AI chatbot resolve "the car the user just named" unambiguously
// via an exact-match lookup instead of guessing between near-identical rows.
export async function seedVehicles(
  brandRows,
  categoryRows,
  subCategoryRows,
  locationRows,
) {
  const brandIds = new Map(brandRows.map((b) => [b.name, b.id]));
  const categoryIds = new Map(categoryRows.map((c) => [c.name, c.id]));
  const subCategoryIds = new Map(subCategoryRows.map((s) => [s.name, s.id]));

  return db
    .insert(vehicles)
    .values(
      baseCatalog.map((car) => {
        const dailyPrice = Number(car.price);
        const seats = car.type?.includes("SUV")
          ? 5 + (Math.random() > 0.6 ? 2 : 0)
          : 4;
        return {
          name: car.name,
          brandId: brandIds.get(car.brand),
          categoryId: categoryIds.get(categoryForCar[car.name]),
          subCategoryId: subCategoryIds.get(car.type),
          locationId: pick(locationRows).id,
          dailyPrice: String(dailyPrice.toFixed(2)),
          weeklyPrice: String((dailyPrice * 6.3).toFixed(2)), // ~10% weekly discount
          monthlyPrice: String((dailyPrice * 24).toFixed(2)), // ~20% monthly discount
          rating: car.rating,
          transmission: Math.random() > 0.15 ? "Automatic" : "Manual",
          fuelType:
            car.name === "Tesla Model 3" || car.name === "Porsche Taycan"
              ? "Electric"
              : pick(fuelTypes),
          seats,
          doors: seats > 5 ? 5 : 4,
          minRentalDays: Math.random() > 0.8 ? 2 : 1,
          features: randomFeatures(),
          description: `${car.name} — a ${car.type?.toLowerCase() || "reliable"} choice with ${seats} seats, ideal for ${
            seats >= 6 ? "family trips" : "city driving and getaways"
          }.`,
          status: Math.random() > 0.05 ? "available" : "maintenance",
          imageUrl: car.image,
          imageAlt: car.alt,
          isPopular: car.category === "Popular",
          totalSalesCount: 0,
          totalRevenue: "0.00",
        };
      }),
    )
    .returning();
}
