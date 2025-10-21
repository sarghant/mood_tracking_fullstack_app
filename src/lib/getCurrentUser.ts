import prisma from "@/db/prisma";
import { auth } from "../../auth";
import { User } from "@prisma/client";
import { logError } from "./utils";

export async function getCurrentUser(): Promise<Partial<User> | null> {
  try {
    const session = await auth();
    if (!session) return null;
    const { user } = session;
    if (!user?.id) {
      logError("Session exists but missing either user or user.id.", {
        session,
      });
      return null;
    }
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
      },
    });
    if (!userData) {
      logError("User not found.", { userId: user.id, session });
      return null;
    }
    return userData;
  } catch (error) {
    logError("User data error: ", {
      error: error instanceof Error ? error.message : error,
    });
    return null;
  }
}
