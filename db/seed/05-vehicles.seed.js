import { db } from "../db.js";
import { vehicles } from "../schema.js";
import { rentalCars } from "../../src/data/carRental.js";

const catalog = rentalCars.map((car) => ({
  ...car,
  brand:
    car.name === "All New Rush"
      ? "Toyota"
      : car.name.startsWith("Range Rover")
        ? "Range Rover"
        : car.name.split(" ")[0],
}));
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

export async function seedVehicles(brandRows, categoryRows, subCategoryRows) {
  const brandIds = new Map(brandRows.map((brand) => [brand.name, brand.id]));
  const categoryIds = new Map(
    categoryRows.map((category) => [category.name, category.id]),
  );
  const subCategoryIds = new Map(
    subCategoryRows.map((subCategory) => [subCategory.name, subCategory.id]),
  );
  return db
    .insert(vehicles)
    .values(
      catalog.map((car) => ({
        name: car.name,
        brandId: brandIds.get(car.brand),
        categoryId: categoryIds.get(categoryForCar[car.name]),
        subCategoryId: subCategoryIds.get(car.type),
        dailyPrice: String(car.price),
        rating: car.rating,
        transmission: "Automatic",
        imageUrl: car.image,
        imageAlt: car.alt,
        isPopular: car.category === "Popular",
        totalSalesCount: 0,
        totalRevenue: "0.00",
      })),
    )
    .returning();
}
