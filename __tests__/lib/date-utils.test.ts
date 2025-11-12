import {
  dateFormatter,
  forceMidnight,
  checkTodaysMoodLog,
} from "@/lib/date-utils";

describe("date-utils", () => {
  describe("dateFormatter", () => {
    it("should format date in US format with full names", () => {
      const testDate = new Date("2025-03-15T10:30:00Z");

      const formattedDate = dateFormatter(testDate);

      expect(formattedDate).toContain("March");
      expect(formattedDate).toContain("15");
      expect(formattedDate).toContain("2025");
      expect(formattedDate).toContain("Saturday");
    });
    it("should handle different dates correctly", () => {
      const testDate = new Date("2023-12-25T00:00:00Z");

      const formattedDate = dateFormatter(testDate);

      expect(formattedDate).toContain("December");
      expect(formattedDate).toContain("25");
      expect(formattedDate).toContain("2023");
      expect(formattedDate).toContain("Monday");
    });
  });
  describe("forceMidnight", () => {
    it("should return a date at midnight", () => {
      const result = forceMidnight("America/New_York");

      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
    it("should work with different timezones", () => {
      const utcResult = forceMidnight("UTC");
      const tokyoResult = forceMidnight("Asia/Tokyo");

      expect(utcResult.getHours()).toBe(0);
      expect(tokyoResult.getHours()).toBe(0);
    });
  });
  describe("checkTodaysMoodLog", () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    it("should return false when mood date is undefined", () => {
      expect(checkTodaysMoodLog(undefined, timezone)).toBe(false);
    });
    it("should return false when mood date doesn't match current date", () => {
      expect(checkTodaysMoodLog("2025-08-05T00:00:00.000Z", timezone)).toBe(
        false
      );
    });
    it("should return true when mood date matches today", () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      expect(checkTodaysMoodLog(today.toISOString(), timezone)).toBe(true);
    });
  });
});
