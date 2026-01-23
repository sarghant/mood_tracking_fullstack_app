import { moodChartData, moods } from "@/app/moods/constants/moods";
import { Mood } from "@prisma/generated";
import { format } from "date-fns";

export const mockAllMoods: Mood[] = [
  {
    id: "mood-1",
    userId: "user-1",
    moodType: "ANGRY",
    moodQuote: "Really frustrated today!",
    createdAt: new Date("2025-09-20T10:00:00Z"),
    date: new Date("2025-09-20T00:00:00Z"),
  },
  {
    id: "mood-2",
    userId: "user-1",
    moodType: "SAD",
    moodQuote: "Not my best day.",
    createdAt: new Date("2025-09-19T14:30:00Z"),
    date: new Date("2025-09-19T00:00:00Z"),
  },
  {
    id: "mood-3",
    userId: "user-1",
    moodType: "NEUTRAL",
    moodQuote: null, // Optional field
    createdAt: new Date("2025-09-18T09:15:00Z"),
    date: new Date("2025-09-18T00:00:00Z"),
  },
  {
    id: "mood-4",
    userId: "user-1",
    moodType: "OPTIMISTIC",
    moodQuote: "Things are looking up!",
    createdAt: new Date("2025-09-17T16:45:00Z"),
    date: new Date("2025-09-17T00:00:00Z"),
  },
  {
    id: "mood-5",
    userId: "user-1",
    moodType: "ECSTATIC",
    moodQuote: "Feeling amazing today!",
    createdAt: new Date("2025-09-16T11:20:00Z"),
    date: new Date("2025-09-16T00:00:00Z"),
  },
];

export const latestMood = mockAllMoods
  .slice(0)
  .sort(
    (a: Mood, b: Mood) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

export const mockCurrentMoodAccent = moods.find(
  (mood) => mood.moodType === latestMood.moodType
)?.colors;

export const mockChartData = mockAllMoods
  .slice(0)
  .sort(
    (a: Mood, b: Mood) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  .map((mood) => ({
    moodValue: moodChartData[mood.moodType].value,
    date: mood.createdAt,
    formattedDate: format(new Date(mood.createdAt), "MMM d"),
    moodType: mood.moodType,
    emoji: moodChartData[mood.moodType].emoji,
    color: moodChartData[mood.moodType].color,
  }));
