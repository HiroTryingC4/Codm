/*
  Warnings:

  - Made the columns `tryoutType`, `mode`, `motivation` on table `Applicant` optional.
    Needed to import pre-existing member rosters (e.g. past game rosters) that were
    never collected through the tryout form and have no tryout-specific data.

*/
-- AlterTable
ALTER TABLE "Applicant" ALTER COLUMN "tryoutType" DROP NOT NULL,
ALTER COLUMN "mode" DROP NOT NULL,
ALTER COLUMN "motivation" DROP NOT NULL;
