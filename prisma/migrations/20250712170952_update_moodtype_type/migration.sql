/*
  Warnings:

  - Changed the type of `moodType` on the `Mood` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MoodType" AS ENUM ('VERY_SAD', 'SAD', 'NEUTRAL', 'OPTIMISTIC', 'EXSTATIC');

-- AlterTable
ALTER TABLE "Mood" DROP COLUMN "moodType",
ADD COLUMN     "moodType" "MoodType" NOT NULL;
