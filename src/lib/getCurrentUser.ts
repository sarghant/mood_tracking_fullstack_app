import prisma from "@/db/prisma";
import { auth } from "../../auth";
import { User } from "@/generated/prisma";

export async function getCurrentUser(): Promise<Partial<User> | null> {
  try {
    const session = await auth();
    if (!session) return null;
    const { user } = session;
    if (!user) return null;
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
      },
    });
    return userData;
  } catch (error) {
    console.log(`User Data Retrieval Error: ${error}`);
    return null;
  }
}
