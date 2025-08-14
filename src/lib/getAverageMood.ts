import { ChartDataType } from "@/app/moods/components/MoodsChart";

export function getAverageMood(data: ChartDataType[], durationValue: number) {
  let datePeriod =
    durationValue === 0 ? 0 : Date.now() - durationValue * 24 * 60 * 60 * 1000;
  const filteredData = data.filter(
    (item) => new Date(item.date).getTime() >= datePeriod
  );
  if (filteredData.length === 0) {
    return null; // No data available for the selected duration
  }
  const averageValue = Math.floor(
    filteredData.reduce((acc, cur) => acc + cur.moodValue, 0) / data.length
  );
  const closestValue = filteredData.reduce((acc, cur) => {
    const prevDiff = Math.abs(acc.moodValue - averageValue);
    const curDiff = Math.abs(cur.moodValue - averageValue);
    return curDiff < prevDiff ? cur : acc;
  });
  return closestValue;
}
