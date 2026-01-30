import { moodChartData, moods } from "@/app/moods/constants/moods";
import type { MoodWithDailyLog } from "@/lib/getMood";
import { format } from "date-fns";

export const mockAllMoods: MoodWithDailyLog[] = [
  {
    id: "mood-1",
    dailyLogId: "daily-log-1",
    moodType: "ANGRY",
    moodQuote: "Really frustrated today!",
    createdAt: new Date("2025-09-20T10:00:00Z"),
    dailyLog: {
      id: "daily-log-1",
      userId: "user-1",
      date: new Date("2025-09-20T00:00:00Z"),
      createdAt: new Date("2025-09-20T10:00:00Z"),
      updatedAt: new Date("2025-09-20T10:00:00Z"),
    },
  },
  {
    id: "mood-2",
    dailyLogId: "daily-log-2",
    moodType: "SAD",
    moodQuote: "Not my best day.",
    createdAt: new Date("2025-09-19T14:30:00Z"),
    dailyLog: {
      id: "daily-log-2",
      userId: "user-1",
      date: new Date("2025-09-19T00:00:00Z"),
      createdAt: new Date("2025-09-19T14:30:00Z"),
      updatedAt: new Date("2025-09-19T14:30:00Z"),
    },
  },
  {
    id: "mood-3",
    dailyLogId: "daily-log-3",
    moodType: "NEUTRAL",
    moodQuote: null, // Optional field
    createdAt: new Date("2025-09-18T09:15:00Z"),
    dailyLog: {
      id: "daily-log-3",
      userId: "user-1",
      date: new Date("2025-09-18T00:00:00Z"),
      createdAt: new Date("2025-09-18T09:15:00Z"),
      updatedAt: new Date("2025-09-18T09:15:00Z"),
    },
  },
  {
    id: "mood-4",
    dailyLogId: "daily-log-4",
    moodType: "OPTIMISTIC",
    moodQuote: "Things are looking up!",
    createdAt: new Date("2025-09-17T16:45:00Z"),
    dailyLog: {
      id: "daily-log-4",
      userId: "user-1",
      date: new Date("2025-09-17T00:00:00Z"),
      createdAt: new Date("2025-09-17T16:45:00Z"),
      updatedAt: new Date("2025-09-17T16:45:00Z"),
    },
  },
  {
    id: "mood-5",
    dailyLogId: "daily-log-5",
    moodType: "ECSTATIC",
    moodQuote: "Feeling amazing today!",
    createdAt: new Date("2025-09-16T11:20:00Z"),
    dailyLog: {
      id: "daily-log-5",
      userId: "user-1",
      date: new Date("2025-09-16T00:00:00Z"),
      createdAt: new Date("2025-09-16T11:20:00Z"),
      updatedAt: new Date("2025-09-16T11:20:00Z"),
    },
  },
];

export const latestMood = mockAllMoods
  .slice(0)
  .sort(
    (a: MoodWithDailyLog, b: MoodWithDailyLog) =>
      new Date(b.dailyLog.date).getTime() - new Date(a.dailyLog.date).getTime()
  )[0];

export const mockCurrentMoodAccent = moods.find(
  (mood) => mood.moodType === latestMood.moodType
)?.colors;

export const mockChartData = mockAllMoods
  .slice(0)
  .sort(
    (a: MoodWithDailyLog, b: MoodWithDailyLog) =>
      new Date(a.dailyLog.date).getTime() - new Date(b.dailyLog.date).getTime()
  )
  .map((mood) => ({
    moodValue: moodChartData[mood.moodType].value,
    date: mood.dailyLog.date,
    formattedDate: format(new Date(mood.dailyLog.date), "MMM d"),
    moodType: mood.moodType,
    emoji: moodChartData[mood.moodType].emoji,
    color: moodChartData[mood.moodType].color,
  }));
