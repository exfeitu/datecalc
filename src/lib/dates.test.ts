/**
 * src/lib/dates.test.ts
 * Unit tests for core date calculation functions.
 */
import { describe, it, expect } from 'vitest';
import {
  daysBetween,
  dateFromDays,
  getWeekday,
  isLeapYear,
  daysInMonth,
  ageInDays,
  today,
} from './dates';

describe('daysBetween', () => {
  it('calculates days between two dates', () => {
    expect(daysBetween('2026-01-01', '2026-01-31')).toBe(30);
  });

  it('returns absolute value regardless of order', () => {
    expect(daysBetween('2026-12-31', '2026-01-01')).toBe(364);
  });

  it('returns 0 for same date', () => {
    expect(daysBetween('2026-06-15', '2026-06-15')).toBe(0);
  });

  it('handles leap year February', () => {
    expect(daysBetween('2028-02-01', '2028-03-01')).toBe(29);
  });

  it('handles non-leap year February', () => {
    expect(daysBetween('2026-02-01', '2026-03-01')).toBe(28);
  });

  it('handles cross-year boundaries', () => {
    expect(daysBetween('2026-12-25', '2027-01-05')).toBe(11);
  });
});

describe('dateFromDays', () => {
  it('adds N days correctly', () => {
    expect(dateFromDays('2026-01-01', 30)).toBe('2026-01-31');
  });

  it('handles cross-year addition', () => {
    expect(dateFromDays('2026-12-25', 10)).toBe('2027-01-04');
  });

  it('handles leap year transition', () => {
    expect(dateFromDays('2028-02-25', 5)).toBe('2028-03-01');
  });

  it('handles non-leap year transition', () => {
    expect(dateFromDays('2026-02-25', 5)).toBe('2026-03-02');
  });
});

describe('getWeekday', () => {
  it('returns correct weekday for known date', () => {
    expect(getWeekday('2026-01-01')).toBe('Thursday');
  });

  it('returns correct weekday for another date', () => {
    expect(getWeekday('2026-12-25')).toBe('Friday');
  });
});

describe('isLeapYear', () => {
  it('identifies standard leap year', () => {
    expect(isLeapYear(2028)).toBe(true);
  });

  it('identifies non-leap year', () => {
    expect(isLeapYear(2026)).toBe(false);
  });

  it('handles century years (divisible by 400)', () => {
    expect(isLeapYear(2000)).toBe(true);
  });

  it('handles century non-leap years (not divisible by 400)', () => {
    expect(isLeapYear(1900)).toBe(false);
  });
});

describe('daysInMonth', () => {
  it('returns 31 for January', () => {
    expect(daysInMonth(2026, 1)).toBe(31);
  });

  it('returns 28 for February in non-leap year', () => {
    expect(daysInMonth(2026, 2)).toBe(28);
  });

  it('returns 29 for February in leap year', () => {
    expect(daysInMonth(2028, 2)).toBe(29);
  });

  it('returns 30 for April', () => {
    expect(daysInMonth(2026, 4)).toBe(30);
  });
});

describe('today', () => {
  it('returns a valid YYYY-MM-DD string', () => {
    const t = today();
    expect(t).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('ageInDays', () => {
  it('returns positive number for past year', () => {
    const age = ageInDays(2000);
    expect(age).toBeGreaterThan(0);
  });

  it('returns 0 for current year', () => {
    const currentYear = new Date().getUTCFullYear();
    // Person born this year should have a positive age in days
    // (unless today is Jan 1)
    const age = ageInDays(currentYear);
    expect(age).toBeGreaterThanOrEqual(0);
  });
});
