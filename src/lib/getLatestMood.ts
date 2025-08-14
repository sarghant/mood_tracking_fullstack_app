import prisma from "@/db/prisma";
import { getCurrentUser } from "./getCurrentUser";

export async function getAllMoods() {
  try {
    const user = await getCurrentUser();
    if (!user) return null;
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
    console.log(`Mood Data Retrieval Error: ${error}`);
  }
}

export async function getLatestMood() {
  try {
    const moods = await getAllMoods();
    if (!moods) return null;
    return moods[0];
  } catch (error) {
    console.log(`Mood Data Retrieval Error: ${error}`);
  }
}
