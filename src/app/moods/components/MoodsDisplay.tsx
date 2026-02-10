"use client";

import { moodChartData, type MoodDisplayData } from "../constants/moods";
import { getSleepQualityDisplay, getSleepHoursColor } from "../constants/sleep";
import type { MoodWithDailyLog } from "@/lib/getMood";
import type { SleepWithDailyLog } from "@/lib/getSleep";
import MoodsChart from "./MoodsChart";
import SleepChart from "./SleepChart";
import { format } from "date-fns";
import { getAverageMood } from "@/lib/getAverageMood";
import { getAverageSleep } from "@/lib/getAverageSleep";
import { useState } from "react";
import Image from "next/image";
import { Switch } from "@headlessui/react";
import { MoonIcon } from "lucide-react";

enum DurationValue {
  SEVEN_DAYS = "7",
  THIRTY_DAYS = "30",
  NINETY_DAYS = "90",
  ONE_YEAR = "365",
  ALL_TIME = "0",
}

const MoodsDisplay = ({
  showForm,
  hasLoggedMoodToday,
  allMoods,
  currentMoodAccent,
  allSleepLogs,
  latestSleep,
}: {
  showForm: boolean;
  hasLoggedMoodToday: boolean;
  allMoods: MoodWithDailyLog[];
  currentMoodAccent: MoodDisplayData["colors"] | undefined;
  allSleepLogs: SleepWithDailyLog[] | null;
  latestSleep: SleepWithDailyLog | null;
}) => {
  const [durationValue, setDurationValue] = useState<DurationValue>(
    DurationValue.SEVEN_DAYS,
  );
  const [showBarChart, setShowBarChart] = useState(false);
  if (allMoods.length === 0) return null;
  const currentMood = allMoods[0];

  // Prepare mood chart data
  const chartData = allMoods
    .slice(0)
    .sort(
      (a: MoodWithDailyLog, b: MoodWithDailyLog) =>
        new Date(a.dailyLog.date).getTime() -
        new Date(b.dailyLog.date).getTime(),
    )
    .map((mood) => {
      return {
        moodValue: moodChartData[mood.moodType].value,
        date: mood.dailyLog.date,
        formattedDate: format(new Date(mood.dailyLog.date), "MMM d"),
        moodType: mood.moodType,
        emoji: moodChartData[mood.moodType].emoji,
        color: moodChartData[mood.moodType].color,
      };
    });

  // Prepare sleep chart data
  const sleepChartData = (allSleepLogs ?? [])
    .slice(0)
    .sort(
      (a, b) =>
        new Date(a.dailyLog.date).getTime() -
        new Date(b.dailyLog.date).getTime(),
    )
    .map((sleep) => ({
      hours: sleep.hours,
      quality: sleep.quality,
      date: sleep.dailyLog.date,
      formattedDate: format(new Date(sleep.dailyLog.date), "MMM d"),
    }));

  const averageMood = getAverageMood(chartData, +durationValue);
  const averageSleep = getAverageSleep(sleepChartData, +durationValue);
  const latestSleepQuality = getSleepQualityDisplay(latestSleep?.quality);
  const averageSleepQuality =
    averageSleep?.averageQuality != null
      ? getSleepQualityDisplay(averageSleep.averageQuality)
      : null;
  const hasSleepData = sleepChartData.length > 0;
  return (
    <div
      className={`${
        showForm
          ? "pointer-events-none opacity-50 brightness-75 select-none"
          : "pointer-events-auto opacity-100 brightness-100"
      } transition-all max-w-full sm:max-w-[86rem] mx-auto mt-12 mb-8 py-12 px-4 sm:py-16 sm:px-12 bg-[#d9e2ef] dark:bg-gray-700 shadow-lg rounded-lg`}
    >
      <div className="flex flex-col gap-6 sm:gap-8 lg:grid lg:grid-cols-[28%_1fr] lg:gap-x-10 lg:gap-y-0 lg:items-start">
        {/* Row 1: Mood stats | Mood chart */}
        <div className="flex flex-col gap-4 sm:gap-6 text-center lg:text-start lg:pt-6">
          {/* Mood stats */}
          <div className="space-y-2 sm:space-y-4">
            <h2 className="md:mb-8 font-bold font-serif tracking-wide sm:text-lg md:text-2xl">
              {hasLoggedMoodToday ? "Current" : "Latest"} Mood:{" "}
              <br className="md:hidden" />
              <span
                className={`text-2xl md:text-3xl text-shadow-2xs text-shadow-neutral-800/40 ${currentMoodAccent?.foreground}`}
              >
                {currentMood.moodType}
              </span>
            </h2>
            <div className="text-lg sm:text-xl flex gap-2 md:gap-2.5 flex-col lg:flex-row pb-2 lg:pb-0 border-b-2 border-gray-400 lg:leading-relaxed">
              <span className="font-serif font-semibold">Mood quote:</span>
              <blockquote className="font-light pl-1 md:pl-2 md:border-l-3 border-gray-400">
                &ldquo;{currentMood.moodQuote}&rdquo;
              </blockquote>
            </div>
            <div className="space-y-2 sm:space-y-3 border-b-2 border-b-gray-400 pb-1.5">
              <div className="flex gap-2 sm:gap-2.5 items-center justify-between">
                <span className="font-medium">Latest Average Mood</span>
                <select
                  value={durationValue}
                  onChange={(e) =>
                    setDurationValue(e.target.value as DurationValue)
                  }
                  className="bg-slate-100 border-[1.5px] border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 p-1.5 lg:p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={DurationValue.SEVEN_DAYS}>Last 7 days</option>
                  <option value={DurationValue.THIRTY_DAYS}>
                    Last 30 days
                  </option>
                  <option value={DurationValue.NINETY_DAYS}>
                    Last 90 days
                  </option>
                  <option value={DurationValue.ONE_YEAR}>Last year</option>
                  <option value={DurationValue.ALL_TIME}>All time</option>
                </select>
              </div>
              {averageMood ? (
                <div className="flex gap-2 items-center justify-center lg:justify-start">
                  <span
                    style={{ color: averageMood.color }}
                    className="tracking-wide text-xl md:text-2xl lg:text-3xl font-medium"
                  >
                    {averageMood.moodType}
                  </span>
                  <Image
                    src={averageMood.emoji}
                    alt="Average Mood Emoji"
                    width="40"
                    height="40"
                    className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                  />
                </div>
              ) : (
                <p className="md:text-lg lg:text-xl font-medium">
                  No data available for the selected duration. Please log some
                  moods!
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 mt-2">
              <label
                htmlFor="chartTypeToggle"
                className="font-medium text-base"
              >
                Chart Type:
              </label>
              <Switch
                checked={showBarChart}
                onChange={setShowBarChart}
                className={`${
                  showBarChart ? "bg-cyan-600" : "bg-gray-300"
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                id="chartTypeToggle"
              >
                <span
                  className={`${
                    showBarChart ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
                />
              </Switch>
              <span className="ml-2 text-sm">
                {showBarChart ? "Bar" : "Line"}
              </span>
            </div>
          </div>
        </div>

        {/* Mood chart */}
        <div className="lg:min-w-0 mt-6 lg:mt-0">
          <MoodsChart
            chartData={chartData}
            currentMoodAccent={currentMoodAccent}
            showBarChart={showBarChart}
          />
        </div>

        {/* Row 2: Sleep stats | Sleep chart (only when hasSleepData) */}
        {hasSleepData && (
          <>
            <div className="flex flex-col gap-4 sm:gap-6 text-center lg:text-start pt-8 sm:pt-10 lg:pt-14">
              <div className="w-full flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-400" />
                <MoonIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                <div className="flex-1 h-px bg-gray-400" />
              </div>
              <div className="space-y-2 sm:space-y-4">
                <h3 className="font-bold font-serif tracking-wide sm:text-lg md:text-xl">
                  {hasLoggedMoodToday ? "Today's" : "Latest"} Sleep
                </h3>
                {latestSleep ? (
                  <div className="flex items-center gap-1.5 flex-wrap justify-center lg:justify-start">
                    <span
                      className={`text-2xl md:text-3xl font-bold ${getSleepHoursColor(
                        latestSleep.hours,
                      )}`}
                    >
                      {latestSleep.hours}h
                    </span>
                    {latestSleepQuality && (
                      <>
                        <span className="text-lg md:text-xl text-gray-400 dark:text-gray-500 font-medium">
                          ·
                        </span>
                        <span
                          className={`text-lg md:text-xl font-bold ${latestSleepQuality.color}`}
                        >
                          {latestSleepQuality.label}
                        </span>
                      </>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    No sleep data logged yet.
                  </p>
                )}
                <div className="space-y-2 border-b-2 border-b-gray-400 pb-2">
                  <div className="flex gap-2 sm:gap-2.5 items-center justify-center md:justify-between">
                    <span className="font-medium">Average Sleep</span>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      (same period)
                    </span>
                  </div>
                  {averageSleep ? (
                    <div className="flex gap-1.5 flex-wrap items-center justify-center lg:justify-start">
                      <span
                        className={`text-xl md:text-2xl font-bold ${getSleepHoursColor(
                          averageSleep.averageHours,
                        )}`}
                      >
                        {averageSleep.averageHours}h
                      </span>
                      {averageSleepQuality && (
                        <>
                          <span className="text-base md:text-lg text-gray-400 dark:text-gray-500 font-medium">
                            ·
                          </span>
                          <span
                            className={`text-base md:text-lg font-bold ${averageSleepQuality.color}`}
                          >
                            {averageSleepQuality.label}
                          </span>
                        </>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      No data for selected period.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-8 sm:pt-10 lg:pt-14 min-w-0 max-w-[85%]">
              <SleepChart chartData={sleepChartData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoodsDisplay;
