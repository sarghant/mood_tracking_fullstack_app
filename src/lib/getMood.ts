import prisma from "@/db/prisma";
import { getCurrentUser } from "./getCurrentUser";
import { Mood, DailyLog } from "@prisma/generated";
import { logError } from "./utils";

// Type for Mood with its parent DailyLog relation (includes date)
export type MoodWithDailyLog = Mood & {
  dailyLog: DailyLog;
};

export async function getAllMoods(): Promise<MoodWithDailyLog[] | null> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      logError("Cannot find mood data without user.");
      return null;
    }
    const moods = await prisma.mood.findMany({
      where: {
        dailyLog: {
          userId: user.id,
        },
      },
      include: {
        dailyLog: true,
      },
      orderBy: {
        dailyLog: {
          date: "desc",
        },
      },
    });
    return moods;
  } catch (error) {
    logError("Mood data error: ", {
      error: error instanceof Error ? error.message : error,
    });
    return null;
  }
}

export async function getLatestMood(): Promise<MoodWithDailyLog | null> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      logError("Cannot find latest mood without user.");
      return null;
    }
    const latestMood = await prisma.mood.findFirst({
      where: {
        dailyLog: {
          userId: user.id,
        },
      },
      include: {
        dailyLog: true,
      },
      orderBy: {
        dailyLog: {
          date: "desc",
        },
      },
    });
    return latestMood;
  } catch (error) {
    logError("Mood data error: ", {
      error: error instanceof Error ? error.message : error,
    });
    return null;
  }
}
