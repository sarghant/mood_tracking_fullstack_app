import Image from "next/image";
import { auth } from "../../auth";
import { Button } from "@/ui/button";
import Link from "next/link";

export default async function Home() {
  // const session = await auth();
  // if (session != null) return;
  return (
    <main className="container h-screen w-full p-8 mt-20 mx-auto">
      {/* Hero text section */}
      <div className="text-center">
        <div className="mx-auto w-24 md:min-w-max mb-8">
          <Image
            width={112}
            height={112}
            src="/icons/slightly_smiling_face_3d.png"
            alt="Smiley Face Heading Icon"
          />
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Discover a brighter you:
          <br />
          Track your mood and grow every day.
        </h1>
        <p className="text-xl sm:text-2xl text-neutral-800 dark:text-neutral-200 mb-12">
          Start your journey to self-awareness by logging your mood every day.
        </p>
        {/* CTA */}
        <div className="flex gap-3 sm:gap-5 items-center justify-center mx-20 sm:mx-24 md:mx-auto">
          <span className="text-md sm:text-lg md:text-xl font-bold text-nowrap">
            Get Started
          </span>
          <span className="text-xl">⟶</span>
          <Button variant="cta" size="adaptive" asChild>
            <Link href="/sign-in">Log In</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
