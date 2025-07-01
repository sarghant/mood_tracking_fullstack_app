import Image from "next/image";
import { auth } from "../../auth";

export default async function Home() {
  const session = await auth();
  if (session == null) return;
  const { user } = session;
  return (
    <main className="container h-screen w-full p-8">
      {/* Hero text section */}
    </main>
  );
}
