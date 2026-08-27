import { db } from "../db.js";
import { locations } from "../schema.js";

const locationRows = [
  {
    name: "Downtown Branch",
    address: "12 Market St",
    city: "Dhaka",
    country: "Bangladesh",
  },
  {
    name: "Airport Branch",
    address: "Terminal 2 Rd",
    city: "Dhaka",
    country: "Bangladesh",
  },
  {
    name: "City Center Branch",
    address: "45 Central Ave",
    city: "Rajshahi",
    country: "Bangladesh",
  },
];

export async function seedLocations() {
  return db.insert(locations).values(locationRows).returning();
}
