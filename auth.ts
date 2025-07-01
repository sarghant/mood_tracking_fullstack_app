import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [GitHub];

export const providersMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/sign-in",
  },
});
