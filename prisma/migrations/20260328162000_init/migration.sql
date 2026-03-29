-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."SubmissionStatus" AS ENUM ('NEW', 'REVIEWED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "public"."ServicePage" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL DEFAULT 'services',
    "eyebrow" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "primaryCtaLabel" TEXT,
    "primaryCtaHref" TEXT,
    "secondaryCtaLabel" TEXT,
    "secondaryCtaHref" TEXT,
    "sections" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicePage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServiceItem" (
    "id" SERIAL NOT NULL,
    "pageId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "eyebrow" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "imageAlt" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReferencePage" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL DEFAULT 'references',
    "eyebrow" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "primaryCtaLabel" TEXT,
    "primaryCtaHref" TEXT,
    "secondaryCtaLabel" TEXT,
    "secondaryCtaHref" TEXT,
    "sections" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferencePage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReferenceItem" (
    "id" SERIAL NOT NULL,
    "pageId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "imageUrl" TEXT,
    "imageAlt" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferenceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LegalPage" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "eyebrow" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "sections" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContactRequest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "message" TEXT NOT NULL,
    "status" "public"."SubmissionStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BookingRequest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "preferredDate" TIMESTAMP(3),
    "preferredTime" TEXT,
    "budgetRange" TEXT,
    "projectType" TEXT,
    "notes" TEXT,
    "status" "public"."SubmissionStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServicePage_slug_key" ON "public"."ServicePage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceItem_slug_key" ON "public"."ServiceItem"("slug");

-- CreateIndex
CREATE INDEX "ServiceItem_pageId_sortOrder_idx" ON "public"."ServiceItem"("pageId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ReferencePage_slug_key" ON "public"."ReferencePage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ReferenceItem_slug_key" ON "public"."ReferenceItem"("slug");

-- CreateIndex
CREATE INDEX "ReferenceItem_pageId_sortOrder_idx" ON "public"."ReferenceItem"("pageId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "LegalPage_slug_key" ON "public"."LegalPage"("slug");

-- CreateIndex
CREATE INDEX "ContactRequest_status_createdAt_idx" ON "public"."ContactRequest"("status", "createdAt");

-- CreateIndex
CREATE INDEX "BookingRequest_status_createdAt_idx" ON "public"."BookingRequest"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "public"."ServiceItem" ADD CONSTRAINT "ServiceItem_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "public"."ServicePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReferenceItem" ADD CONSTRAINT "ReferenceItem_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "public"."ReferencePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
