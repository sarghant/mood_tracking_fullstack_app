import { ChartDataType } from "@/app/moods/components/MoodsChart";
import { MoodType } from "@prisma/client";
import { getAverageMood } from "@/lib/getAverageMood";
import { format } from "date-fns";

const chartDataMock = (
  moodValue: number = 2,
  daysAgo: number = 0,
  moodType: MoodType = "NEUTRAL"
): ChartDataType => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);

  return {
    moodValue,
    date,
    formattedDate: format(date, "MMM d"),
    moodType,
    emoji: "😐",
    color: "#999",
  };
};

describe("getAverageMood", () => {
  describe("data is either empty or filtered out", () => {
    it("should return null when provided data is empty", () => {
      expect(getAverageMood([], 7)).toBe(null);
    });
    it("should return null when data filtered based on duration value is empty", () => {
      const data = [chartDataMock(2, 9), chartDataMock(2, 11)];
      expect(getAverageMood(data, 7)).toBe(null);
    });
  });
  describe("when data isn't empty", () => {
    it("should calculate average and return mood data based on closest value", () => {
      const data = [
        chartDataMock(1, 2, "SAD"),
        chartDataMock(3, 4, "OPTIMISTIC"),
        chartDataMock(4, 5, "ECSTATIC"),
        chartDataMock(3, 8, "OPTIMISTIC"),
      ];
      const result = getAverageMood(data, 7);

      expect(result).not.toBe(null);
      expect(result?.moodValue).toBe(1);
      expect(result?.moodType).toBe("SAD");
    });
    it("should handle all data when duration is 0", () => {
      const data = [chartDataMock(3, 3, "OPTIMISTIC"), chartDataMock(2, 60)];
      const result = getAverageMood(data, 0);

      expect(result).not.toBe(null);
      expect(result?.moodValue).toBe(2);
      expect(result?.moodType).toBe("NEUTRAL");
    });
    it("should calculate average and return mood data based on closest value when multiple items have the same average", () => {
      const data = [
        chartDataMock(1, 2, "SAD"),
        chartDataMock(3, 4, "OPTIMISTIC"),
        chartDataMock(4, 5, "ECSTATIC"),
      ];
      const result = getAverageMood(data, 7);

      expect(result).not.toBe(null);
      expect(result?.moodValue).toBe(1);
      expect(result?.moodType).toBe("SAD");
    });
  });
});
