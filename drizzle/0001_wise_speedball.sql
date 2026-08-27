CREATE TYPE "public"."booking_status" AS ENUM('reserved', 'confirmed', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."fuel_type" AS ENUM('Petrol', 'Diesel', 'Electric', 'Hybrid');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('new', 'contacted', 'converted', 'lost');--> statement-breakpoint
CREATE TYPE "public"."vehicle_status" AS ENUM('available', 'maintenance', 'retired');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"user_id" uuid,
	"lead_id" uuid,
	"pickup_location_id" uuid,
	"dropoff_location_id" uuid,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"status" "booking_status" DEFAULT 'reserved' NOT NULL,
	"total_price" numeric(10, 2),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"phone" text,
	"email" text,
	"vehicle_id" uuid,
	"desired_start_date" timestamp,
	"desired_end_date" timestamp,
	"budget" numeric(10, 2),
	"source" text DEFAULT 'chatbot' NOT NULL,
	"status" "lead_status" DEFAULT 'new' NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"address" text,
	"city" text NOT NULL,
	"country" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "booking_id" uuid;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "location_id" uuid;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "weekly_price" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "monthly_price" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "fuel_type" "fuel_type" DEFAULT 'Petrol' NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "seats" integer DEFAULT 4 NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "doors" integer DEFAULT 4;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "min_rental_days" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "features" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "status" "vehicle_status" DEFAULT 'available' NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_pickup_location_id_locations_id_fk" FOREIGN KEY ("pickup_location_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_dropoff_location_id_locations_id_fk" FOREIGN KEY ("dropoff_location_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;