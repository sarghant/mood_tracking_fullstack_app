import prisma from "@/db/prisma";
import { getCurrentUser } from "./getCurrentUser";
import { Mood } from "@prisma/client";
import { logError } from "./utils";

export async function getAllMoods(): Promise<Mood[] | null> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      logError("Cannot find mood data without user.");
      return null;
    }
    const moods = await prisma.mood.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        date: "desc",
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

export async function getLatestMood(): Promise<Mood | null> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      logError("Cannot find latest mood without user.");
      return null;
    }
    const latestMood = await prisma.mood.findFirst({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });
    return latestMood;
  } catch (error) {
    logError("Mood data error: ", {
      error: error instanceof Error ? error.message : error,
    });
    return null;
  }
}
