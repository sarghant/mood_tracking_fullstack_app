import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { checkTodaysMoodLog, dateFormatter } from "@/lib/date-utils";
import { getLatestMood } from "@/lib/getLatestMood";
import { Mood, moods } from "./constants/moods";
import DailyLog from "./components/DailyLog";

const MoodsPage = async () => {
  const session = await auth();
  if (!session) redirect("/");
  const user = session.user;
  if (!user) return null;
  const latestMood = await getLatestMood();
  const currentMood = moods.find((mood) => {
    if (latestMood) return latestMood.moodType === mood.moodType;
    return mood.moodType === "NEUTRAL";
  });
  const { heading, upliftingMessage, colors } = currentMood as Mood;
  const hasLoggedMoodToday = checkTodaysMoodLog(
    latestMood?.date?.toISOString()
  );
  return (
    <div className="container w-md sm:w-auto h-screen px-2 mt-8 md:mt-12 mx-auto">
      {/* Heading section */}
      <div className="text-center">
        <p className="text-xl md:text-2xl font-semibold text-neutral-700/80 dark:text-neutral-200/70 mb-6">
          {dateFormatter(new Date())}
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold font-serif mb-4">
          {heading && hasLoggedMoodToday ? (
            <span
              className={`${colors.foreground} text-shadow-2xs text-shadow-black/50`}
            >
              {heading}
            </span>
          ) : (
            <>
              Hello,{" "}
              <span
                className={`${colors.foreground} text-shadow-2xs text-shadow-black/50`}
              >
                {user.name}
              </span>
              !
            </>
          )}
        </h1>
        <p className="text-2xl md:text-3xl text-neutral-800/90 dark:text-neutral-200/80">
          {upliftingMessage && hasLoggedMoodToday
            ? upliftingMessage
            : "How are we feeling today?"}
        </p>
      </div>
      {/* Mood logging */}
      <DailyLog
        currentMoodAccent={colors}
        hasLoggedMoodToday={hasLoggedMoodToday}
      />
    </div>
  );
};

export default MoodsPage;
