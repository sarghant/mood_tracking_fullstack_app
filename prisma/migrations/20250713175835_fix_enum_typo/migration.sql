/*
  Warnings:

  - The values [EXSTATIC] on the enum `MoodType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MoodType_new" AS ENUM ('VERY_SAD', 'SAD', 'NEUTRAL', 'OPTIMISTIC', 'ECSTATIC');
ALTER TABLE "Mood" ALTER COLUMN "moodType" TYPE "MoodType_new" USING ("moodType"::text::"MoodType_new");
ALTER TYPE "MoodType" RENAME TO "MoodType_old";
ALTER TYPE "MoodType_new" RENAME TO "MoodType";
DROP TYPE "MoodType_old";
COMMIT;
