import type { SleepChartDataType } from "@/app/moods/components/SleepChart";

export type AverageSleepResult = {
  averageHours: number;
  averageQuality: number | null;
};

export function getAverageSleep(
  data: SleepChartDataType[],
  durationValue: number
): AverageSleepResult | null {
  const startDate =
    durationValue === 0 ? 0 : Date.now() - durationValue * 24 * 60 * 60 * 1000;
  const filteredData = data.filter(
    (item) => new Date(item.date).getTime() >= startDate
  );

  if (filteredData.length === 0) {
    return null;
  }

  const totalHours = filteredData.reduce((acc, cur) => acc + cur.hours, 0);
  const averageHours =
    Math.round((totalHours / filteredData.length) * 10) / 10;

  // Calculate average quality only from entries that have quality data
  const qualityEntries = filteredData.filter((item) => item.quality != null);
  const averageQuality =
    qualityEntries.length > 0
      ? Math.round(
          qualityEntries.reduce((acc, cur) => acc + cur.quality!, 0) /
            qualityEntries.length
        )
      : null;

  return { averageHours, averageQuality };
}
