CREATE TYPE "public"."content_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."event_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'paid', 'failed', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."registration_status" AS ENUM('pending', 'confirmed', 'cancelled', 'checked_in');--> statement-breakpoint
CREATE TYPE "public"."submission_type" AS ENUM('contact', 'speaking', 'newsletter');--> statement-breakpoint
CREATE TABLE "admin_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(140) NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"location" varchar(240) NOT NULL,
	"start_at" timestamp with time zone NOT NULL,
	"end_at" timestamp with time zone,
	"capacity" integer,
	"status" "event_status" DEFAULT 'draft' NOT NULL,
	"image_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_payment" (
	"id" serial PRIMARY KEY NOT NULL,
	"registration_id" integer NOT NULL,
	"amount_cents" integer DEFAULT 0 NOT NULL,
	"currency" varchar(8) DEFAULT 'usd' NOT NULL,
	"status" "payment_status" DEFAULT 'pending' NOT NULL,
	"provider" varchar(60) DEFAULT 'stripe' NOT NULL,
	"provider_payment_id" text,
	"provider_checkout_session_id" text,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_registration" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"ticket_id" integer NOT NULL,
	"name" varchar(160) NOT NULL,
	"email" varchar(320) NOT NULL,
	"phone" varchar(40),
	"quantity" integer DEFAULT 1 NOT NULL,
	"status" "registration_status" DEFAULT 'pending' NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_ticket" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"name" varchar(120) NOT NULL,
	"description" text,
	"price_cents" integer DEFAULT 0 NOT NULL,
	"currency" varchar(8) DEFAULT 'usd' NOT NULL,
	"quantity_available" integer,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "form_submission" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "submission_type" NOT NULL,
	"name" varchar(160),
	"email" varchar(320) NOT NULL,
	"phone" varchar(40),
	"message" text,
	"payload" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "page_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(120) NOT NULL,
	"title" varchar(200) NOT NULL,
	"status" "content_status" DEFAULT 'published' NOT NULL,
	"sections" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"published_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "site_link" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_name" varchar(100) NOT NULL,
	"label" varchar(120) NOT NULL,
	"url" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_external" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "task" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"priority" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonial" (
	"id" serial PRIMARY KEY NOT NULL,
	"page_slug" varchar(120) NOT NULL,
	"author_name" varchar(160) NOT NULL,
	"quote" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"status" "content_status" DEFAULT 'published' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "event_payment" ADD CONSTRAINT "event_payment_registration_id_event_registration_id_fk" FOREIGN KEY ("registration_id") REFERENCES "public"."event_registration"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_registration" ADD CONSTRAINT "event_registration_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_registration" ADD CONSTRAINT "event_registration_ticket_id_event_ticket_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."event_ticket"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_ticket" ADD CONSTRAINT "event_ticket_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "admin_user_email_idx" ON "admin_user" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "event_slug_idx" ON "event" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "event_payment_provider_session_idx" ON "event_payment" USING btree ("provider_checkout_session_id");--> statement-breakpoint
CREATE UNIQUE INDEX "page_content_slug_idx" ON "page_content" USING btree ("slug");