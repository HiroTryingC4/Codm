/*
  Warnings:

  - Made the column `gcashNumber` on table `Applicant` required.
    Backfills existing NULL values to '' before applying the constraint.

*/
-- Backfill existing NULLs
UPDATE "Applicant" SET "gcashNumber" = '' WHERE "gcashNumber" IS NULL;

-- AlterTable
ALTER TABLE "Applicant" ALTER COLUMN "gcashNumber" SET NOT NULL,
ALTER COLUMN "gcashNumber" SET DEFAULT '';
