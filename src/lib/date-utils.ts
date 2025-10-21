import { TZDate } from "@date-fns/tz";
import { isSameDay } from "date-fns";

export const dateFormatter = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const forceMidnight = (timezone: string) => {
  const date = new Date();
  const tzDate = new TZDate(date, timezone);
  tzDate.setHours(0, 0, 0, 0);
  return tzDate;
};

export const checkTodaysMoodLog = (
  latestMoodDate: string | undefined,
  timezone: string
) => {
  if (!latestMoodDate) return false;
  // const today = new Date();
  // today.setHours(0, 0, 0, 0);
  // return today.toISOString() === latestMoodDate;
  const today = new TZDate(new Date(), timezone);
  const latestDate = new TZDate(new Date(latestMoodDate), timezone);
  return isSameDay(today, latestDate);
};
