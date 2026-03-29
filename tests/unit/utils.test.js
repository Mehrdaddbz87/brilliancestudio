import {
  formatIsoDate,
  isPastCalendarDate,
  isValidIsoDateString,
  normalizeIsoDateInput,
  parseIsoDateString,
} from "@/lib/utils";

describe("date utilities", () => {
  it("formats dates in YYYY-MM-DD format", () => {
    expect(formatIsoDate(new Date(2026, 2, 28))).toBe("2026-03-28");
  });

  it("parses valid ISO dates and rejects invalid ones", () => {
    expect(parseIsoDateString("2026-03-28")).toBeInstanceOf(Date);
    expect(parseIsoDateString("2026-02-31")).toBeNull();
    expect(parseIsoDateString("2026-13-01")).toBeNull();
    expect(parseIsoDateString("not-a-date")).toBeNull();
    expect(isValidIsoDateString("2026-03-28")).toBe(true);
    expect(isValidIsoDateString("2026-02-31")).toBe(false);
  });

  it("normalizes loose numeric input into ISO-style text", () => {
    expect(normalizeIsoDateInput("20260328")).toBe("2026-03-28");
  });

  it("detects past calendar dates", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    expect(isPastCalendarDate(yesterday)).toBe(true);
  });

  it("treats today as not past", () => {
    const today = new Date();
    expect(isPastCalendarDate(today)).toBe(false);
  });
});
