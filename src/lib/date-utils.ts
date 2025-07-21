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
