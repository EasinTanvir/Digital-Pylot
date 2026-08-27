import { db } from "../db.js";
import { users } from "../schema.js";

export async function seedUsers() {
  const rows = Array.from({ length: 40 }, (_, index) => ({
    fullName: `Customer ${String(index + 1).padStart(2, "0")}`,
    email: `customer${String(index + 1).padStart(2, "0")}@example.test`,
    avatarUrl: null,
  }));
  return db.insert(users).values(rows).returning();
}
