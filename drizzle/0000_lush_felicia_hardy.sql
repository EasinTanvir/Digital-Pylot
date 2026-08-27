CREATE TYPE "public"."order_status" AS ENUM('success', 'pending', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('sale', 'purchase');--> statement-breakpoint
CREATE TYPE "public"."transmission_type" AS ENUM('Automatic', 'Manual');--> statement-breakpoint
CREATE TABLE "brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"logo_url" text
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "sub_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "sub_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"transaction_number" text NOT NULL,
	"type" "transaction_type" DEFAULT 'sale' NOT NULL,
	"user_id" uuid,
	"vehicle_id" uuid,
	"payment_method" text NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"status" "order_status" DEFAULT 'pending' NOT NULL,
	"country" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "transactions_transaction_number_unique" UNIQUE("transaction_number")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"brand_id" uuid,
	"category_id" uuid,
	"sub_category_id" uuid,
	"daily_price" numeric(10, 2) NOT NULL,
	"rating" numeric(2, 1) DEFAULT '5.0' NOT NULL,
	"transmission" "transmission_type" DEFAULT 'Automatic' NOT NULL,
	"image_url" text,
	"image_alt" text,
	"is_popular" boolean DEFAULT false,
	"total_sales_count" integer DEFAULT 0 NOT NULL,
	"total_revenue" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("sub_category_id") REFERENCES "public"."sub_categories"("id") ON DELETE no action ON UPDATE no action;