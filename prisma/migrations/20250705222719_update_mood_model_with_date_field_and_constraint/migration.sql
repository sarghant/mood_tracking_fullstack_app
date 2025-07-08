/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `Mood` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Mood` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mood" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Mood_userId_date_key" ON "Mood"("userId", "date");
