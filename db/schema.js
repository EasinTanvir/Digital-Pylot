import {
  pgTable,
  uuid,
  text,
  decimal,
  integer,
  boolean,
  timestamp,
  pgEnum,
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

export const vehicles = pgTable("vehicles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  brandId: uuid("brand_id").references(() => brands.id),
  categoryId: uuid("category_id").references(() => categories.id),
  subCategoryId: uuid("sub_category_id").references(() => subCategories.id),
  dailyPrice: decimal("daily_price", { precision: 10, scale: 2 }).notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 })
    .default("5.0")
    .notNull(),
  transmission: transmissionEnum("transmission").default("Automatic").notNull(),
  imageUrl: text("image_url"),
  imageAlt: text("image_alt"),
  isPopular: boolean("is_popular").default(false),
  totalSalesCount: integer("total_sales_count").default(0).notNull(),
  totalRevenue: decimal("total_revenue", { precision: 10, scale: 2 })
    .default("0.00")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  transactionNumber: text("transaction_number").notNull().unique(),
  type: transactionTypeEnum("type").default("sale").notNull(),
  userId: uuid("user_id").references(() => users.id),
  vehicleId: uuid("vehicle_id").references(() => vehicles.id),
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
  transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, { fields: [transactions.userId], references: [users.id] }),
  vehicle: one(vehicles, {
    fields: [transactions.vehicleId],
    references: [vehicles.id],
  }),
}));
