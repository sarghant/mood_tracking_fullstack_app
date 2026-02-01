import { TZDate } from "@date-fns/tz";
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
      const timezone = "America/New_York";
      const result = forceMidnight(timezone);
      const tzNow = new TZDate(new Date(), timezone);
      const tzResult = new TZDate(result, timezone);

      expect(result.getUTCHours()).toBe(0);
      expect(result.getUTCMinutes()).toBe(0);
      expect(result.getUTCSeconds()).toBe(0);
      expect(result.getUTCMilliseconds()).toBe(0);

      // Ensure stored date maps to the user's calendar date
      expect(tzResult.getFullYear()).toBe(tzNow.getFullYear());
      expect(tzResult.getMonth()).toBe(tzNow.getMonth());
      expect(tzResult.getDate()).toBe(tzNow.getDate());
    });
    it("should work with different timezones", () => {
      const utcResult = forceMidnight("UTC");
      const tokyoResult = forceMidnight("Asia/Tokyo");

      expect(utcResult.getUTCHours()).toBe(0);
      expect(tokyoResult.getUTCHours()).toBe(0);
    });
  });
  describe("checkTodaysMoodLog", () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    it("should return false when mood date is undefined", () => {
      expect(checkTodaysMoodLog(undefined, timezone)).toBe(false);
    });
    it("should return false when mood date doesn't match current date (Date object)", () => {
      // Simulate a @db.Date field returned by Prisma (midnight UTC for a past date)
      const pastDate = new Date("2025-08-05T00:00:00.000Z");
      expect(checkTodaysMoodLog(pastDate, timezone)).toBe(false);
    });
    it("should return false when mood date doesn't match current date (string)", () => {
      // Simulate a serialized date from Server Component to Client Component
      expect(checkTodaysMoodLog("2025-08-05T00:00:00.000Z", timezone)).toBe(
        false
      );
    });
    it("should return true when mood date matches today (Date object)", () => {
      // Simulate a @db.Date field: create a Date at midnight UTC for today's calendar date
      const now = new Date();
      const todayMidnightUTC = new Date(
        Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
      );

      expect(checkTodaysMoodLog(todayMidnightUTC, timezone)).toBe(true);
    });
    it("should return true when mood date matches today (string)", () => {
      // Simulate a serialized date: ISO string at midnight UTC for today
      const now = new Date();
      const todayMidnightUTC = new Date(
        Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
      );

      expect(checkTodaysMoodLog(todayMidnightUTC.toISOString(), timezone)).toBe(
        true
      );
    });
  });
});
