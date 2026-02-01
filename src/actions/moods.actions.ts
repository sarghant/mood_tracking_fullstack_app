"use server";

import prisma from "@/db/prisma";
import { MoodType } from "@prisma/generated";
import { forceMidnight } from "@/lib/date-utils";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { revalidatePath } from "next/cache";

type ActionResponse = {
  success: boolean;
  message: string;
};

const MIN_SLEEP_HOURS = 0;
const MAX_SLEEP_HOURS = 12;
const MIN_SLEEP_QUALITY = 1;
const MAX_SLEEP_QUALITY = 5;

const VALID_MOOD_TYPES: readonly string[] = [
  "ANGRY",
  "SAD",
  "NEUTRAL",
  "OPTIMISTIC",
  "ECSTATIC",
] as const;

function isValidMoodType(value: unknown): value is MoodType {
  return typeof value === "string" && VALID_MOOD_TYPES.includes(value);
}

function parseSleepFromFormData(formData: FormData): {
  hours: number;
  quality: number | undefined;
} | null {
  const rawHours = formData.get("sleep_hours");
  if (rawHours == null || rawHours === "") return null;

  const hours = parseFloat(String(rawHours));
  if (
    Number.isNaN(hours) ||
    hours < MIN_SLEEP_HOURS ||
    hours > MAX_SLEEP_HOURS
  ) {
    return null;
  }

  const rawQuality = formData.get("sleep_quality");
  if (rawQuality == null || rawQuality === "") {
    return { hours, quality: undefined };
  }

  const quality = parseInt(String(rawQuality), 10);
  if (
    Number.isNaN(quality) ||
    quality < MIN_SLEEP_QUALITY ||
    quality > MAX_SLEEP_QUALITY
  ) {
    return { hours, quality: undefined };
  }

  return { hours, quality };
}

// Create mood and optional sleep for the day
export async function logMood(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    if (user?.id == null) {
      return {
        success: false,
        message: "You're not authorized to perform this action.",
      };
    }

    const rawMoodType = formData.get("mood_type");
    if (!isValidMoodType(rawMoodType)) {
      return {
        success: false,
        message: "Invalid mood type selected.",
      };
    }

    const moodType = rawMoodType;
    const moodQuote = (formData.get("mood_quote") as string) || null;
    const timezone = formData.get("timezone") as string;
    if (!timezone) {
      return {
        success: false,
        message: "Timezone is required.",
      };
    }

    const moodDate = forceMidnight(timezone);
    const sleepData = parseSleepFromFormData(formData);

    const moodData = { moodType, moodQuote };
    const sleepCreateData = sleepData
      ? { hours: sleepData.hours, quality: sleepData.quality }
      : undefined;

    await prisma.dailyLog.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date: moodDate,
        },
      },
      create: {
        userId: user.id,
        date: moodDate,
        mood: {
          create: moodData,
        },
        ...(sleepCreateData && {
          sleep: { create: sleepCreateData },
        }),
      },
      update: {
        mood: {
          upsert: {
            create: moodData,
            update: moodData,
          },
        },
        ...(sleepCreateData && {
          sleep: {
            upsert: {
              create: sleepCreateData,
              update: sleepCreateData,
            },
          },
        }),
      },
    });

    revalidatePath("/moods");
    return { success: true, message: "You have added your daily log!" };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please, try again.",
    };
  }
}
