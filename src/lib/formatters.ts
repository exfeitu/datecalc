/**
 * src/lib/formatters.ts
 * Number and date formatting utilities.
 */

/** Format a number with comma separators (e.g., 1234567 → "1,234,567") */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

/** Choose singular or plural form (e.g., plural(1, 'day') → "1 day", plural(5, 'day') → "5 days") */
export function plural(n: number, unit: string): string {
  return `${formatNumber(n)} ${unit}${n === 1 ? '' : 's'}`;
}

/** Format a YYYY-MM-DD date to human-readable English (e.g., "2026-01-01" → "January 1, 2026") */
export function formatDateLong(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(Date.UTC(year, month - 1, day, 12));
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** Get the ordinal suffix for a number (1st, 2nd, 3rd, 4th...) */
export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
