"use server";

import prisma from "@/db/prisma";
import { MoodType } from "@/generated/prisma";
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
    if (!moodType)
      return { success: false, message: "You haven't picked your mood yet." };
    if (!timezone) throw Error("");
    const moodDate = forceMidnight(timezone);
    // Create mood
    await prisma.mood.create({
      data: {
        userId: user.id!,
        moodType,
        moodQuote,
        date: moodDate,
      },
    });
    revalidatePath("/moods");
    return { success: true, message: "You have added your daily log!" };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please, try again.",
    };
  }
}
