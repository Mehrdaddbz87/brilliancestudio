export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getIsoDateParts(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());

  if (!match) {
    return null;
  }

  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
}

/**
 * Normalizes partial user input into an ISO-style `YYYY-MM-DD` date string.
 */
export function normalizeIsoDateInput(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  if (/^\d{0,4}(-\d{0,2}){0,2}$/.test(trimmedValue)) {
    return trimmedValue.slice(0, 10);
  }

  const digitsOnly = trimmedValue.replace(/\D/g, "").slice(0, 8);

  if (digitsOnly.length <= 4) {
    return digitsOnly;
  }

  if (digitsOnly.length <= 6) {
    return `${digitsOnly.slice(0, 4)}-${digitsOnly.slice(4)}`;
  }

  return `${digitsOnly.slice(0, 4)}-${digitsOnly.slice(4, 6)}-${digitsOnly.slice(6)}`;
}

/**
 * Parses a strict `YYYY-MM-DD` value into a UTC date and rejects invalid calendar dates.
 */
export function parseIsoDateString(value: string) {
  const parts = getIsoDateParts(value);

  if (!parts) {
    return null;
  }

  const parsedDate = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day),
  );

  if (
    parsedDate.getUTCFullYear() !== parts.year ||
    parsedDate.getUTCMonth() !== parts.month - 1 ||
    parsedDate.getUTCDate() !== parts.day
  ) {
    return null;
  }

  return parsedDate;
}

/**
 * Parses a strict `YYYY-MM-DD` value into a local calendar date for UI components.
 */
export function parseIsoDateToLocalDate(value: string) {
  const parts = getIsoDateParts(value);

  if (!parts || !parseIsoDateString(value)) {
    return null;
  }

  return new Date(parts.year, parts.month - 1, parts.day);
}

/**
 * Formats a calendar date using the project's ISO display and submission format.
 */
export function formatIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Returns whether a date falls before the current local calendar day.
 */
export function isPastCalendarDate(date: Date) {
  const today = new Date();
  const currentDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const comparedDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  return comparedDay < currentDay;
}

/**
 * Returns whether a string is a valid ISO calendar date in `YYYY-MM-DD` format.
 */
export function isValidIsoDateString(value: string) {
  return parseIsoDateString(value) !== null;
}
