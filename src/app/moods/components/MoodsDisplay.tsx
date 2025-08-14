"use client";

import { moodChartData, type MoodDisplayData } from "../constants/moods";
import type { Mood } from "@/generated/prisma";
import MoodsChart from "./MoodsChart";
import { format } from "date-fns";
import { getAverageMood } from "@/lib/getAverageMood";
import { useState } from "react";

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
}: {
  showForm: boolean;
  hasLoggedMoodToday: boolean;
  allMoods: Mood[];
  currentMoodAccent: MoodDisplayData["colors"] | undefined;
}) => {
  const [durationValue, setDurationValue] = useState<DurationValue>(
    DurationValue.SEVEN_DAYS
  );

  const currentMood = allMoods[0];
  const chartData = allMoods
    .slice(0)
    .sort((a: any, b: any) => a.date - b.date)
    .map((mood) => {
      return {
        moodValue: moodChartData[mood.moodType].value,
        date: mood.createdAt,
        formattedDate: format(new Date(mood.createdAt), "MMM d"),
        moodType: mood.moodType,
        emoji: moodChartData[mood.moodType].emoji,
        color: moodChartData[mood.moodType].color,
      };
    });

  const averageMood = getAverageMood(chartData, +durationValue);
  return (
    <div
      className={`${
        showForm
          ? "pointer-events-none opacity-50 brightness-75 select-none"
          : "pointer-events-auto opacity-100 brightness-100"
      } transition-all max-w-full sm:max-w-[86rem] mx-auto mt-12 mb-8 py-12 px-4 sm:py-16 sm:px-12 flex flex-col md:flex-row gap-2 sm:gap-4 items-center md:justify-between bg-slate-300/40 dark:bg-gray-700 shadow-lg rounded-lg`}
    >
      <div className="space-y-2 sm:space-y-4 text-center md:text-start">
        <h2 className="mb-4 font-bold font-serif tracking-wide sm:text-lg md:text-2xl">
          {hasLoggedMoodToday ? "Current" : "Latest"} Mood:{" "}
          <br className="md:hidden" />
          <span
            className={`text-2xl sm:text-3xl md:text-4xl text-shadow-2xs text-shadow-neutral-800/40 ${currentMoodAccent?.foreground}`}
          >
            {currentMood.moodType}
          </span>
        </h2>
        <div className="text-lg sm:text-xl flex gap-2 md:gap-2.5 flex-col lg:flex-row lg:border-b-2 border-gray-400 lg:leading-relaxed">
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
              className="bg-slate-100 border-[1.5px] border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={DurationValue.SEVEN_DAYS}>Last 7 days</option>
              <option value={DurationValue.THIRTY_DAYS}>Last 30 days</option>
              <option value={DurationValue.NINETY_DAYS}>Last 90 days</option>
              <option value={DurationValue.ONE_YEAR}>Last year</option>
              <option value={DurationValue.ALL_TIME}>All time</option>
            </select>
          </div>
          <p className="text-xl md:text-3xl font-medium">
            {averageMood ? (
              <span
                style={{ color: averageMood.color }}
                className="tracking-wide"
              >
                {averageMood.moodType}
              </span>
            ) : (
              "No data available yet. Please log some moods!"
            )}
          </p>
        </div>
      </div>
      <MoodsChart chartData={chartData} currentMoodAccent={currentMoodAccent} />
    </div>
  );
};

export default MoodsDisplay;
