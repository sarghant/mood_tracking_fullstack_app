export type SleepQualityOption = {
  label: string;
  color: string;
  fill: string;
  chartColor: string;
};

export const sleepQualityOptions: SleepQualityOption[] = [
  {
    label: "Rough",
    color: "text-slate-400 dark:text-slate-500",
    fill: "fill-slate-400 dark:fill-slate-500",
    chartColor: "#94a3b8",
  },
  {
    label: "Restless",
    color: "text-rose-300 dark:text-rose-400/70",
    fill: "fill-rose-300 dark:fill-rose-400/70",
    chartColor: "#fda4af",
  },
  {
    label: "Okay",
    color: "text-amber-400 dark:text-amber-300",
    fill: "fill-amber-400 dark:fill-amber-300",
    chartColor: "#fbbf24",
  },
  {
    label: "Restful",
    color: "text-green-500 dark:text-green-400",
    fill: "fill-green-500 dark:fill-green-400",
    chartColor: "#22c55e",
  },
  {
    label: "Refreshing",
    color: "text-sky-500 dark:text-sky-400",
    fill: "fill-sky-500 dark:fill-sky-400",
    chartColor: "#0ea5e9",
  },
];

/**
 * Get the display data for a sleep quality value (1-5)
 * Returns null if quality is undefined or out of range
 */
export function getSleepQualityDisplay(
  quality: number | null | undefined
): SleepQualityOption | null {
  if (quality == null || quality < 1 || quality > 5) {
    return null;
  }
  return sleepQualityOptions[quality - 1];
}

/**
 * Get the color for the sleep hours (based on recommended 7-9 hours)
 */
export function getSleepHoursColor(hours: number): string {
  if (hours < 5) return "text-red-500 dark:text-red-400";
  if (hours < 6) return "text-orange-500 dark:text-orange-400";
  if (hours < 7) return "text-amber-500 dark:text-amber-400";
  if (hours <= 9) return "text-green-500 dark:text-green-400";
  if (hours <= 10) return "text-amber-500 dark:text-amber-400";
  return "text-orange-500 dark:text-orange-400"; // Too much sleep
}
