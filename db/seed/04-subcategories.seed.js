import { db } from "../db.js";
import { subCategories } from "../schema.js";

const subCategoryCategory = {
  "Compact SUV": "Small Car",
  "Premium SUV": "Large Car",
  "Electric sedan": "Small Car",
  "Executive sedan": "Exclusive Car",
  "Family SUV": "Large Car",
  "City hatchback": "Small Car",
  "Luxury SUV": "Large Car",
  "Electric performance": "Exclusive Car",
};

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export async function seedSubCategories(categoryRows) {
  const categoryIds = new Map(
    categoryRows.map((category) => [category.name, category.id]),
  );
  return db
    .insert(subCategories)
    .values(
      Object.entries(subCategoryCategory).map(([name, categoryName]) => ({
        name,
        slug: slugify(name),
        categoryId: categoryIds.get(categoryName),
      })),
    )
    .returning();
}
