"use client";

import { Button } from "@/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

enum ErrorType {
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  Verification = "Verification",
  Default = "Default",
}

const AuthErrorPage = () => {
  const search = useSearchParams();
  const error = search.get("error") as ErrorType;
  const errorMessages: Record<ErrorType, string> = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to sign in.",
    Verification: "The verification link may have expired.",
    Default: "We're having trouble connecting right now.",
  };
  const message = errorMessages[error] || errorMessages.Default;
  return (
    <div className="container mx-auto px-4 mt-32 sm:mt-48">
      <div className="max-w-md mx-auto text-center p-8 bg-slate-50 dark:bg-gray-700 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          {error === ErrorType.AccessDenied
            ? "Access Denied"
            : "Connection Issue"}
        </h1>
        <p className="text-neutral-700 dark:text-neutral-300 mb-6">{message}</p>
        {error !== ErrorType.AccessDenied && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
            Please, try signing in again. If the problem persists, you can retry
            a bit later.
          </p>
        )}
        <div className="flex flex-col gap-3">
          <Button
            asChild
            variant="cta"
            size="adaptive"
            className="bg-teal-600 hover:bg-teal-700 focus:bg-teal-700"
          >
            <Link href="/sign-in">Try Again</Link>
          </Button>
          <Button
            asChild
            variant="default"
            size="adaptive"
            className="border border-neutral-300 dark:border-neutral-500"
          >
            <Link href="/">Back to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthErrorPage;
