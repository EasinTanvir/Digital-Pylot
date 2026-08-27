import { db } from "../db.js";
import { leads } from "../schema.js";

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const sampleNames = [
  "Rafiul Islam",
  "Ayesha Karim",
  "Tanvir Ahmed",
  "Nusrat Jahan",
  "Shahriar Kabir",
];
const statuses = ["new", "contacted", "converted", "lost"];

export async function seedLeads(vehicleRows) {
  const rows = sampleNames.map((name, i) => ({
    name,
    phone: `01700-00000${i}`,
    email: `${name.split(" ")[0].toLowerCase()}@example.test`,
    vehicleId: pick(vehicleRows).id,
    desiredStartDate: new Date(Date.now() + (3 + i) * 86400000),
    desiredEndDate: new Date(Date.now() + (6 + i) * 86400000),
    budget: String(50 + i * 15),
    source: "chatbot",
    status: pick(statuses),
    notes: "Sample seed lead — real leads are created live via the AI chatbot.",
  }));
  return db.insert(leads).values(rows).returning();
}
