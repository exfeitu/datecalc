/**
 * src/lib/data/months.ts
 * Month data for /days-in/{month}/ pages.
 */
export interface MonthData {
  slug: string;
  name: string;
  index: number; // 1-indexed
  defaultDays: number;
}

export const months: MonthData[] = [
  { slug: 'january',   name: 'January',   index: 1,  defaultDays: 31 },
  { slug: 'february',  name: 'February',  index: 2,  defaultDays: 28 },
  { slug: 'march',     name: 'March',     index: 3,  defaultDays: 31 },
  { slug: 'april',     name: 'April',     index: 4,  defaultDays: 30 },
  { slug: 'may',       name: 'May',       index: 5,  defaultDays: 31 },
  { slug: 'june',      name: 'June',      index: 6,  defaultDays: 30 },
  { slug: 'july',      name: 'July',      index: 7,  defaultDays: 31 },
  { slug: 'august',    name: 'August',    index: 8,  defaultDays: 31 },
  { slug: 'september', name: 'September', index: 9,  defaultDays: 30 },
  { slug: 'october',   name: 'October',   index: 10, defaultDays: 31 },
  { slug: 'november',  name: 'November',  index: 11, defaultDays: 30 },
  { slug: 'december',  name: 'December',  index: 12, defaultDays: 31 },
];

export const yearRange = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
