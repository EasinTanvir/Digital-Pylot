import {
  pgTable,
  uuid,
  text,
  decimal,
  integer,
  boolean,
  timestamp,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const orderStatusEnum = pgEnum("order_status", [
  "success",
  "pending",
  "cancelled",
]);
export const transactionTypeEnum = pgEnum("transaction_type", [
  "sale",
  "purchase",
]);
export const transmissionEnum = pgEnum("transmission_type", [
  "Automatic",
  "Manual",
]);

export const fuelTypeEnum = pgEnum("fuel_type", [
  "Petrol",
  "Diesel",
  "Electric",
  "Hybrid",
]);
export const vehicleStatusEnum = pgEnum("vehicle_status", [
  "available",
  "maintenance",
  "retired",
]);
export const bookingStatusEnum = pgEnum("booking_status", [
  "reserved",
  "confirmed",
  "completed",
  "cancelled",
]);
export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "contacted",
  "converted",
  "lost",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const brands = pgTable("brands", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const subCategories = pgTable("sub_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id").references(() => categories.id),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const locations = pgTable("locations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  address: text("address"),
  city: text("city").notNull(),
  country: text("country").notNull(),
});

export const vehicles = pgTable("vehicles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  brandId: uuid("brand_id").references(() => brands.id),
  categoryId: uuid("category_id").references(() => categories.id),
  subCategoryId: uuid("sub_category_id").references(() => subCategories.id),
  locationId: uuid("location_id").references(() => locations.id),
  dailyPrice: decimal("daily_price", { precision: 10, scale: 2 }).notNull(),
  weeklyPrice: decimal("weekly_price", { precision: 10, scale: 2 }),
  monthlyPrice: decimal("monthly_price", { precision: 10, scale: 2 }),
  rating: decimal("rating", { precision: 2, scale: 1 })
    .default("5.0")
    .notNull(),
  transmission: transmissionEnum("transmission").default("Automatic").notNull(),
  fuelType: fuelTypeEnum("fuel_type").default("Petrol").notNull(),
  seats: integer("seats").default(4).notNull(),
  doors: integer("doors").default(4),
  minRentalDays: integer("min_rental_days").default(1).notNull(),
  features: jsonb("features").$type().default([]),
  description: text("description"),
  status: vehicleStatusEnum("status").default("available").notNull(),
  imageUrl: text("image_url"),
  imageAlt: text("image_alt"),
  isPopular: boolean("is_popular").default(false),
  totalSalesCount: integer("total_sales_count").default(0).notNull(),
  totalRevenue: decimal("total_revenue", { precision: 10, scale: 2 })
    .default("0.00")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  vehicleId: uuid("vehicle_id")
    .references(() => vehicles.id)
    .notNull(),
  userId: uuid("user_id").references(() => users.id),
  leadId: uuid("lead_id"),
  pickupLocationId: uuid("pickup_location_id").references(() => locations.id),
  dropoffLocationId: uuid("dropoff_location_id").references(() => locations.id),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  status: bookingStatusEnum("status").default("reserved").notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  vehicleId: uuid("vehicle_id").references(() => vehicles.id),
  desiredStartDate: timestamp("desired_start_date"),
  desiredEndDate: timestamp("desired_end_date"),
  budget: decimal("budget", { precision: 10, scale: 2 }),
  source: text("source").default("chatbot").notNull(),
  status: leadStatusEnum("status").default("new").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  transactionNumber: text("transaction_number").notNull().unique(),
  type: transactionTypeEnum("type").default("sale").notNull(),
  userId: uuid("user_id").references(() => users.id),
  vehicleId: uuid("vehicle_id").references(() => vehicles.id),
  bookingId: uuid("booking_id").references(() => bookings.id),
  paymentMethod: text("payment_method").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum("status").default("pending").notNull(),
  country: text("country").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  subCategories: many(subCategories),
  vehicles: many(vehicles),
}));

export const subCategoriesRelations = relations(
  subCategories,
  ({ one, many }) => ({
    category: one(categories, {
      fields: [subCategories.categoryId],
      references: [categories.id],
    }),
    vehicles: many(vehicles),
  }),
);

export const locationsRelations = relations(locations, ({ many }) => ({
  vehiclesBasedHere: many(vehicles),
}));

export const vehiclesRelations = relations(vehicles, ({ one, many }) => ({
  category: one(categories, {
    fields: [vehicles.categoryId],
    references: [categories.id],
  }),
  subCategory: one(subCategories, {
    fields: [vehicles.subCategoryId],
    references: [subCategories.id],
  }),
  brand: one(brands, { fields: [vehicles.brandId], references: [brands.id] }),
  location: one(locations, {
    fields: [vehicles.locationId],
    references: [locations.id],
  }),
  transactions: many(transactions),
  bookings: many(bookings),
  leads: many(leads),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  vehicle: one(vehicles, {
    fields: [bookings.vehicleId],
    references: [vehicles.id],
  }),
  user: one(users, { fields: [bookings.userId], references: [users.id] }),
  pickupLocation: one(locations, {
    fields: [bookings.pickupLocationId],
    references: [locations.id],
  }),
  dropoffLocation: one(locations, {
    fields: [bookings.dropoffLocationId],
    references: [locations.id],
  }),
  lead: one(leads, { fields: [bookings.leadId], references: [leads.id] }),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  vehicle: one(vehicles, {
    fields: [leads.vehicleId],
    references: [vehicles.id],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, { fields: [transactions.userId], references: [users.id] }),
  vehicle: one(vehicles, {
    fields: [transactions.vehicleId],
    references: [vehicles.id],
  }),
  booking: one(bookings, {
    fields: [transactions.bookingId],
    references: [bookings.id],
  }),
}));
