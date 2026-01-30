-- CreateTable: DailyLog (if not exists)
CREATE TABLE IF NOT EXISTS "DailyLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Sleep (if not exists)
CREATE TABLE IF NOT EXISTS "Sleep" (
    "id" TEXT NOT NULL,
    "dailyLogId" TEXT NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "quality" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sleep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: DailyLog unique constraint on userId and date (if not exists)
CREATE UNIQUE INDEX IF NOT EXISTS "DailyLog_userId_date_key" ON "DailyLog"("userId", "date");

-- CreateIndex: Sleep unique constraint on dailyLogId (if not exists)
CREATE UNIQUE INDEX IF NOT EXISTS "Sleep_dailyLogId_key" ON "Sleep"("dailyLogId");

-- AddForeignKey: DailyLog -> User (if not exists)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'DailyLog_userId_fkey') THEN
        ALTER TABLE "DailyLog" ADD CONSTRAINT "DailyLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey: Sleep -> DailyLog (if not exists)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Sleep_dailyLogId_fkey') THEN
        ALTER TABLE "Sleep" ADD CONSTRAINT "Sleep_dailyLogId_fkey" FOREIGN KEY ("dailyLogId") REFERENCES "DailyLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- Step 1: Add dailyLogId column to Mood as nullable first (if not exists)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Mood' AND column_name = 'dailyLogId') THEN
        ALTER TABLE "Mood" ADD COLUMN "dailyLogId" TEXT;
    END IF;
END $$;

-- Step 2: Create DailyLog entries from existing Mood records (only if Mood still has userId/date columns)
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Mood' AND column_name = 'userId') THEN
        INSERT INTO "DailyLog" ("id", "userId", "date", "createdAt", "updatedAt")
        SELECT 
            gen_random_uuid()::text,
            "userId",
            "date"::date,
            "createdAt",
            CURRENT_TIMESTAMP
        FROM "Mood"
        ON CONFLICT ("userId", "date") DO NOTHING;
    END IF;
END $$;

-- Step 3: Update Mood records to reference their DailyLog (only if needed)
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Mood' AND column_name = 'userId') THEN
        UPDATE "Mood" m
        SET "dailyLogId" = dl."id"
        FROM "DailyLog" dl
        WHERE m."userId" = dl."userId" AND m."date"::date = dl."date"
        AND m."dailyLogId" IS NULL;
    END IF;
END $$;

-- Step 4: Make dailyLogId required (if not already)
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Mood' AND column_name = 'dailyLogId' AND is_nullable = 'YES') THEN
        ALTER TABLE "Mood" ALTER COLUMN "dailyLogId" SET NOT NULL;
    END IF;
END $$;

-- Step 5: Add unique constraint on dailyLogId (if not exists)
CREATE UNIQUE INDEX IF NOT EXISTS "Mood_dailyLogId_key" ON "Mood"("dailyLogId");

-- Step 6: Add foreign key constraint (if not exists)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Mood_dailyLogId_fkey') THEN
        ALTER TABLE "Mood" ADD CONSTRAINT "Mood_dailyLogId_fkey" FOREIGN KEY ("dailyLogId") REFERENCES "DailyLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- Step 7: Drop old constraints and columns from Mood (if they exist)
ALTER TABLE "Mood" DROP CONSTRAINT IF EXISTS "Mood_userId_fkey";
DROP INDEX IF EXISTS "Mood_userId_date_key";
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Mood' AND column_name = 'userId') THEN
        ALTER TABLE "Mood" DROP COLUMN "userId";
    END IF;
END $$;
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Mood' AND column_name = 'date') THEN
        ALTER TABLE "Mood" DROP COLUMN "date";
    END IF;
END $$;
