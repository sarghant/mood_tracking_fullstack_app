import { Button } from "@/ui/button";
import { signIn, providersMap } from "../../../auth";

const SignInPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[95vw] max-w-md h-[248px] p-8 rounded-lg mx-auto bg-slate-50 shadow-md ring-1 ring-neutral-300">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-8 text-center">
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
                <img
                  src="/icons/github.svg"
                  alt={`${provider.name} Icon`}
                  width={40}
                  height={40}
                  className="w-8 h-8 md:w-10 md:h-10 aspect-square"
                />
              </div>
              <span className="font-medium md:text-lg">
                Sign in with {provider.name}
              </span>
            </Button>
          </form>
        ))}
      </div>
    </div>
  );
};

export default SignInPage;
