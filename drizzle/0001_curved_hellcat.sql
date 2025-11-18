ALTER TABLE "message" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "message" CASCADE;--> statement-breakpoint
DROP INDEX "chat_user_id_idx";--> statement-breakpoint
DROP INDEX "deal_chat_id_idx";--> statement-breakpoint
DROP INDEX "deal_company_name_idx";--> statement-breakpoint
DROP INDEX "deal_user_id_idx";--> statement-breakpoint
ALTER TABLE "deal" ALTER COLUMN "product_usecases" SET DATA TYPE text[] USING "product_usecases"::text[];--> statement-breakpoint
ALTER TABLE "deal" ALTER COLUMN "pain_points" SET DATA TYPE text[] USING "pain_points"::text[];--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "job_title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "chat" ADD COLUMN "messages" jsonb[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "deal" ADD COLUMN "private_id" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
CREATE INDEX "chat_user_id_idx" ON "chat" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "deal_chat_id_idx" ON "deal" USING btree ("chat_id");--> statement-breakpoint
CREATE INDEX "deal_company_name_idx" ON "deal" USING btree ("company_name");--> statement-breakpoint
CREATE INDEX "deal_user_id_idx" ON "deal" USING btree ("user_id");