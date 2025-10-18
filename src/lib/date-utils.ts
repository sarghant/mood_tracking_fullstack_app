import { TZDate } from "@date-fns/tz";

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

export const checkTodaysMoodLog = (latestMoodDate: string | undefined) => {
  if (!latestMoodDate) return false;
  // const today = new Date();
  // today.setHours(0, 0, 0, 0);
  // return today.toISOString() === latestMoodDate;
  const today = new Date();
  const latestDate = new Date(latestMoodDate);
  return (
    today.getFullYear() === latestDate.getFullYear() &&
    today.getMonth() === latestDate.getMonth() &&
    today.getDate() === latestDate.getDate()
  );
};
