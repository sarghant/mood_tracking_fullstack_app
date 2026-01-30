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

// Create mood
export async function logMood(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  try {
    // Check for current user data
    const user = await getCurrentUser();
    if (user == null)
      return {
        success: false,
        message: "You're not authorized to perform this action.",
      };
    const moodType = formData.get("mood_type") as MoodType;
    const moodQuote = formData.get("mood_quote") as string;
    const timezone = formData.get("timezone") as string;
    if (!timezone) throw Error("");
    const moodDate = forceMidnight(timezone);

    // Find or create DailyLog for this date, then create the mood
    await prisma.dailyLog.upsert({
      where: {
        userId_date: {
          userId: user.id!,
          date: moodDate,
        },
      },
      create: {
        userId: user.id!,
        date: moodDate,
        mood: {
          create: {
            moodType,
            moodQuote,
          },
        },
      },
      update: {
        mood: {
          create: {
            moodType,
            moodQuote,
          },
        },
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
