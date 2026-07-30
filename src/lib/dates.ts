/**
 * src/lib/dates.ts
 * Core date calculation functions. All dates use YYYY-MM-DD format (ISO 8601).
 */

const MS_PER_DAY = 86_400_000;

/** Parse YYYY-MM-DD string to Date (UTC noon to avoid timezone edge cases) */
function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

/** Format a Date back to YYYY-MM-DD */
function formatDate(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Absolute number of days between two YYYY-MM-DD dates */
export function daysBetween(date1: string, date2: string): number {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  return Math.abs(Math.round((d2.getTime() - d1.getTime()) / MS_PER_DAY));
}

/** Date that is N days after the given YYYY-MM-DD date */
export function dateFromDays(date: string, n: number): string {
  const d = parseDate(date);
  d.setUTCDate(d.getUTCDate() + n);
  return formatDate(d);
}

/** Get the English weekday name for a YYYY-MM-DD date */
export function getWeekday(date: string): string {
  return parseDate(date).toLocaleDateString('en-US', { weekday: 'long' });
}

/** Is the given year a leap year? */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** Number of days in a given month (1-indexed) of a given year */
export function daysInMonth(year: number, month: number): number {
  // month is 0-indexed in Date.UTC, but we pass month directly to Date.UTC
  // Using day 0 of the next month gives the last day of the target month
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** Approximate age in days for someone born in a given year (using Jan 1 as birthdate) */
export function ageInDays(birthYear: number): number {
  const today = new Date();
  today.setUTCHours(12, 0, 0, 0);
  const birth = new Date(Date.UTC(birthYear, 0, 1, 12, 0, 0));
  return Math.floor((today.getTime() - birth.getTime()) / MS_PER_DAY);
}

/** Signed days from date1 to date2 (positive = date2 is after date1, negative = before) */
export function signedDaysBetween(date1: string, date2: string): number {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  return Math.round((d2.getTime() - d1.getTime()) / MS_PER_DAY);
}

/** Calculate the actual YYYY-MM-DD for a floating holiday */
export function getEventDate(
  event: { month: number; day: number; type: string; floatingRule?: { weekday: string; occurrence: number } },
  year: number,
): string {
  if (event.type === 'fixed') {
    return `${year}-${String(event.month).padStart(2, '0')}-${String(event.day).padStart(2, '0')}`;
  }

  const rule = event.floatingRule!;
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const targetDay = weekdays.indexOf(rule.weekday);

  if (rule.occurrence === -1) {
    // Last occurrence: search backwards from end of month
    const lastDay = daysInMonth(year, event.month);
    const d = new Date(Date.UTC(year, event.month - 1, lastDay, 12));
    while (d.getUTCDay() !== targetDay) {
      d.setUTCDate(d.getUTCDate() - 1);
    }
    return formatDate(d);
  }

  // Nth occurrence: find first match, then add (N-1) weeks
  const d = new Date(Date.UTC(year, event.month - 1, 1, 12));
  while (d.getUTCDay() !== targetDay) {
    d.setUTCDate(d.getUTCDate() + 1);
  }
  d.setUTCDate(d.getUTCDate() + (rule.occurrence - 1) * 7);
  return formatDate(d);
}

/** Get today's date in YYYY-MM-DD (UTC) */
export function today(): string {
  const d = new Date();
  return formatDate(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 12)));
}

/** Days remaining in the current year from today */
export function daysLeftInYear(year: number): number {
  const lastDay = `${year}-12-31`;
  return signedDaysBetween(today(), lastDay);
}
