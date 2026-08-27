import { db } from "../db.js";
import { brands } from "../schema.js";

const brandNames = ["Toyota", "Range Rover", "Tesla", "Audi", "Volvo", "Mini", "BMW", "Porsche"];

export async function seedBrands() {
  return db.insert(brands).values(brandNames.map((name) => ({ name, logoUrl: null }))).returning();
}
