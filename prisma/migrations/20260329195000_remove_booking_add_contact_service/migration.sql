ALTER TABLE "public"."ContactRequest"
ADD COLUMN "service" TEXT NOT NULL DEFAULT 'General Inquiry';

DROP INDEX IF EXISTS "public"."BookingRequest_status_createdAt_idx";
DROP TABLE IF EXISTS "public"."BookingRequest";
