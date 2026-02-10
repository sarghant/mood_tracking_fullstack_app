import prisma from "@/db/prisma";
import { getCurrentUser } from "./getCurrentUser";
import { Sleep, DailyLog } from "@prisma/generated";
import { logError } from "./utils";

// Type for Sleep with its parent DailyLog relation (includes date)
export type SleepWithDailyLog = Sleep & {
  dailyLog: DailyLog;
};

export async function getAllSleepLogs(): Promise<SleepWithDailyLog[] | null> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      logError("Cannot find sleep data without user.");
      return null;
    }
    const sleepLogs = await prisma.sleep.findMany({
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
    return sleepLogs;
  } catch (error) {
    logError("Sleep data error: ", {
      error: error instanceof Error ? error.message : error,
    });
    return null;
  }
}

export async function getLatestSleep(): Promise<SleepWithDailyLog | null> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      logError("Cannot find latest sleep without user.");
      return null;
    }
    const latestSleep = await prisma.sleep.findFirst({
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
    return latestSleep;
  } catch (error) {
    logError("Sleep data error: ", {
      error: error instanceof Error ? error.message : error,
    });
    return null;
  }
}
