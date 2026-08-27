import { db } from "../db.js";
import { users, brands, categories, subCategories, vehicles, transactions } from "../schema.js";
import { seedUsers } from "./01-users.seed.js";
import { seedBrands } from "./02-brands.seed.js";
import { seedCategories } from "./03-categories.seed.js";
import { seedSubCategories } from "./04-subcategories.seed.js";
import { seedVehicles } from "./05-vehicles.seed.js";
import { seedTransactions } from "./06-transactions.seed.js";

async function main() {
  await db.delete(transactions);
  await db.delete(vehicles);
  await db.delete(subCategories);
  await db.delete(categories);
  await db.delete(brands);
  await db.delete(users);

  const userRows = await seedUsers();
  const brandRows = await seedBrands();
  const categoryRows = await seedCategories();
  const subCategoryRows = await seedSubCategories(categoryRows);
  const vehicleRows = await seedVehicles(brandRows, categoryRows, subCategoryRows);
  await seedTransactions(userRows, vehicleRows);
  console.log("Seed completed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
