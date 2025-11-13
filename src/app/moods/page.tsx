import { redirect } from "next/navigation";
import { getAllMoods, getLatestMood } from "@/lib/getMood";
import MoodsPageContent from "./components/MoodsPageContent";
import { getCurrentUser } from "@/lib/getCurrentUser";

const MoodsPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/");
  const allMoods = await getAllMoods();
  const latestMood = await getLatestMood();

  return (
    <div className="container relative w-md sm:w-auto px-2 pb-32 sm:pb-4 mt-8 md:mt-12 mx-auto">
      <MoodsPageContent
        user={user}
        allMoods={allMoods}
        latestMood={latestMood}
      />
    </div>
  );
};

export default MoodsPage;
