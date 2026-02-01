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
  // Align to the user's calendar date, then store as UTC midnight.
  const tzDate = new TZDate(new Date(), timezone);
  const year = tzDate.getFullYear();
  const month = tzDate.getMonth();
  const day = tzDate.getDate();
  return new Date(Date.UTC(year, month, day));
};

export const checkTodaysMoodLog = (
  latestMoodDate: Date | string | undefined,
  timezone: string
) => {
  if (!latestMoodDate) return false;

  // Handle both Date objects and ISO strings (strings occur after JSON serialization
  // when passing props from Server Components to Client Components in Next.js)
  const dateObj =
    typeof latestMoodDate === "string"
      ? new Date(latestMoodDate)
      : latestMoodDate;

  // PostgreSQL DATE fields (@db.Date) return midnight UTC for the stored calendar date.
  // Extract UTC date components since they represent the actual stored calendar date.
  const storedYear = dateObj.getUTCFullYear();
  const storedMonth = dateObj.getUTCMonth();
  const storedDay = dateObj.getUTCDate();

  // Get today's date in the user's timezone
  const today = new TZDate(new Date(), timezone);

  return (
    today.getFullYear() === storedYear &&
    today.getMonth() === storedMonth &&
    today.getDate() === storedDay
  );
};
