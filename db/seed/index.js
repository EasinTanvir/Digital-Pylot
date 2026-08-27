import { db } from "../db.js";
import {
  users,
  brands,
  categories,
  subCategories,
  locations,
  vehicles,
  bookings,
  leads,
  transactions,
} from "../schema.js";
import { seedUsers } from "./01-users.seed.js";
import { seedBrands } from "./02-brands.seed.js";
import { seedCategories } from "./03-categories.seed.js";
import { seedSubCategories } from "./04-subcategories.seed.js";
import { seedLocations } from "./05-locations.seed.js";
import { seedVehicles } from "./06-vehicles.seed.js";
import { seedTransactions } from "./07-transactions.seed.js";
import { seedBookings } from "./08-bookings.seed.js";
import { seedLeads } from "./09-leads.seed.js";

async function main() {
  // Delete in reverse dependency order — children before parents.
  // transactions → bookings/vehicles/users
  // bookings     → vehicles/users/locations/leads
  // leads        → vehicles
  // vehicles     → brands/categories/subCategories/locations
  await db.delete(transactions);
  await db.delete(bookings);
  await db.delete(leads);
  await db.delete(vehicles);
  await db.delete(subCategories);
  await db.delete(categories);
  await db.delete(brands);
  await db.delete(locations);
  await db.delete(users);

  const userRows = await seedUsers();
  const brandRows = await seedBrands();
  const categoryRows = await seedCategories();
  const subCategoryRows = await seedSubCategories(categoryRows);
  const locationRows = await seedLocations();
  const vehicleRows = await seedVehicles(
    brandRows,
    categoryRows,
    subCategoryRows,
    locationRows,
  );
  await seedTransactions(userRows, vehicleRows);
  await seedBookings(userRows, vehicleRows, locationRows);
  await seedLeads(vehicleRows);

  console.log("Seed completed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
