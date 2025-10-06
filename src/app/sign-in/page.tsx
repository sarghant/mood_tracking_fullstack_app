import { Button } from "@/ui/button";
import { signIn, providersMap, auth } from "../../../auth";
import { FaGithub } from "react-icons/fa";
import { redirect } from "next/navigation";
import { GoogleIcon } from "../components/custom-icons";
import Link from "next/link";

const SignInPage = async () => {
  const session = await auth();
  if (session) {
    redirect("/moods");
  }
  return (
    <div className="container mt-48 sm:mt-80 mx-auto">
      <div className="mx-auto w-md min-h-[248px] max-h-max p-8 rounded-lg bg-slate-50 dark:bg-gray-600 shadow-md ring-1 dark:ring-2 ring-neutral-300 dark:ring-neutral-300/50">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-8 text-center">
          Login
        </h2>
        {providersMap.map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              await signIn(provider.id, { redirectTo: "/" });
            }}
            className="py-2.5 px-4"
          >
            <Button
              type="submit"
              variant="provider-login"
              size="full-rounded-circle"
            >
              <div className="max-w-max h-auto">
                {provider.name === "GitHub" && (
                  <FaGithub
                    size={40}
                    className="text-slate-900 dark:text-neutral-50"
                  />
                )}
                {provider.name === "Google" && <GoogleIcon size={40} />}
              </div>
              <span className="font-medium md:text-lg">
                Sign in with {provider.name}
              </span>
            </Button>
          </form>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-4">
        By signing in, you agree to our{" "}
        <Link href="/privacy" className="underline hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default SignInPage;
