"use client";

import { checkTodaysMoodLog, dateFormatter } from "@/lib/date-utils";
import DailyLog from "./DailyLog";
import type { User } from "@prisma/generated";
import type { MoodWithDailyLog } from "@/lib/getMood";
import { MoodDisplayData, moods } from "../constants/moods";

const MoodsPageContent = ({
  user,
  allMoods,
  latestMood,
}: {
  user: Partial<User>;
  allMoods: MoodWithDailyLog[] | null;
  latestMood: MoodWithDailyLog | null;
}) => {
  const currentMood = moods.find((mood) => {
    if (latestMood) return latestMood.moodType === mood.moodType;
    return mood.moodType === "NEUTRAL";
  });
  const { heading, upliftingMessage, colors } = currentMood as MoodDisplayData;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const hasLoggedMoodToday = checkTodaysMoodLog(
    latestMood?.dailyLog?.date?.toISOString(),
    timezone
  );
  return (
    <>
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
        allMoods={allMoods!}
        currentMoodAccent={colors}
        hasLoggedMoodToday={hasLoggedMoodToday}
      />
    </>
  );
};

export default MoodsPageContent;
