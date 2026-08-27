import { db } from "../db.js";
import { categories } from "../schema.js";

export async function seedCategories() {
  return db
    .insert(categories)
    .values([
      { name: "Large Car", slug: "large-car" },
      { name: "Small Car", slug: "small-car" },
      { name: "Exclusive Car", slug: "exclusive-car" },
    ])
    .returning();
}
