/**
 * src/lib/data/date-pairs.ts
 * Curated date pairs for /days-between/{date1}/{date2}/ programmatic pages.
 * MVP: ~100 pairs covering common date ranges.
 */
export interface DatePair {
  date1: string;   // YYYY-MM-DD (date1 <= date2)
  date2: string;
  category: string;
  priority: number; // 1 = highest
}

export const datePairs: DatePair[] = [
  // === Full Year (category: "year") ===
  { date1: '2026-01-01', date2: '2026-12-31', category: 'year', priority: 1 },
  { date1: '2025-01-01', date2: '2025-12-31', category: 'year', priority: 1 },
  { date1: '2027-01-01', date2: '2027-12-31', category: 'year', priority: 1 },
  { date1: '2028-01-01', date2: '2028-12-31', category: 'year', priority: 1 }, // leap year

  // === Quarters (category: "quarter") ===
  { date1: '2026-01-01', date2: '2026-03-31', category: 'quarter', priority: 2 },
  { date1: '2026-04-01', date2: '2026-06-30', category: 'quarter', priority: 2 },
  { date1: '2026-07-01', date2: '2026-09-30', category: 'quarter', priority: 2 },
  { date1: '2026-10-01', date2: '2026-12-31', category: 'quarter', priority: 2 },

  // === Half-Year (category: "half-year") ===
  { date1: '2026-01-01', date2: '2026-06-30', category: 'half-year', priority: 2 },
  { date1: '2026-07-01', date2: '2026-12-31', category: 'half-year', priority: 2 },

  // === US Tax Year ===
  { date1: '2026-01-01', date2: '2026-04-15', category: 'tax', priority: 2 },

  // === Academic Terms (category: "semester") ===
  { date1: '2026-09-01', date2: '2026-12-20', category: 'semester', priority: 2 },
  { date1: '2027-01-10', date2: '2027-05-15', category: 'semester', priority: 2 },
  { date1: '2026-01-10', date2: '2026-05-15', category: 'semester', priority: 2 },

  // === Summer Break ===
  { date1: '2026-06-01', date2: '2026-08-31', category: 'summer', priority: 1 },
  { date1: '2027-06-01', date2: '2027-08-31', category: 'summer', priority: 1 },

  // === Holiday Seasons ===
  { date1: '2026-12-01', date2: '2026-12-25', category: 'holiday', priority: 1 },
  { date1: '2026-11-20', date2: '2026-11-27', category: 'holiday', priority: 2 }, // Thanksgiving week
  { date1: '2026-12-25', date2: '2027-01-01', category: 'holiday', priority: 1 }, // Christmas to NY
  { date1: '2026-10-01', date2: '2026-10-31', category: 'holiday', priority: 3 }, // Halloween month
  { date1: '2026-02-01', date2: '2026-02-14', category: 'holiday', priority: 3 }, // Valentine lead-up

  // === Common Countdowns ===
  { date1: '2026-01-01', date2: '2026-12-25', category: 'countdown', priority: 1 },
  { date1: '2026-01-01', date2: '2026-07-04', category: 'countdown', priority: 2 },
  { date1: '2026-09-01', date2: '2026-10-31', category: 'countdown', priority: 2 }, // fall

  // === Month Starts & Ends ===
  { date1: '2026-01-01', date2: '2026-01-31', category: 'month', priority: 2 },
  { date1: '2026-02-01', date2: '2026-02-28', category: 'month', priority: 2 },
  { date1: '2026-03-01', date2: '2026-03-31', category: 'month', priority: 3 },
  { date1: '2026-04-01', date2: '2026-04-30', category: 'month', priority: 3 },
  { date1: '2026-05-01', date2: '2026-05-31', category: 'month', priority: 3 },
  { date1: '2028-02-01', date2: '2028-02-29', category: 'month', priority: 1 }, // leap Feb

  // === Cross-Year ===
  { date1: '2026-12-01', date2: '2027-01-31', category: 'cross-year', priority: 2 },
  { date1: '2025-12-01', date2: '2026-01-31', category: 'cross-year', priority: 3 },
  { date1: '2026-12-15', date2: '2027-02-15', category: 'cross-year', priority: 2 },

  // === 30-Day Intervals ===
  { date1: '2026-02-01', date2: '2026-03-03', category: '30-day', priority: 3 },

  // === 60-Day Intervals ===
  { date1: '2026-07-01', date2: '2026-08-30', category: '60-day', priority: 3 },

  // === 90-Day Intervals ===
  { date1: '2026-01-01', date2: '2026-04-01', category: '90-day', priority: 2 },
  { date1: '2026-07-01', date2: '2026-09-29', category: '90-day', priority: 2 },
  { date1: '2026-10-01', date2: '2026-12-30', category: '90-day', priority: 2 },

  // === 120-Day Intervals ===
  { date1: '2026-01-01', date2: '2026-05-01', category: '120-day', priority: 3 },
  { date1: '2026-09-01', date2: '2026-12-30', category: '120-day', priority: 3 },

  // === 180-Day (approx 6 months) ===
  { date1: '2026-07-01', date2: '2026-12-28', category: '180-day', priority: 2 },

  // === Sport Events ===
  { date1: '2026-09-01', date2: '2027-02-07', category: 'sports', priority: 2 }, // to Super Bowl 2027
  { date1: '2026-06-01', date2: '2026-07-19', category: 'sports', priority: 3 }, // to The Open 2026
  { date1: '2026-03-01', date2: '2026-04-05', category: 'sports', priority: 3 }, // to Final Four

  // === Pop Culture ===
  { date1: '2026-01-01', date2: '2026-12-18', category: 'pop-culture', priority: 3 }, // to Avatar 3
  { date1: '2026-01-01', date2: '2026-03-02', category: 'pop-culture', priority: 3 }, // to Oscars 2026

  // === Business ===
  { date1: '2026-11-01', date2: '2026-11-28', category: 'business', priority: 2 }, // BF month

  // === Milestones ===
  { date1: '2000-01-01', date2: '2026-01-01', category: 'milestone', priority: 1 },
  { date1: '1990-01-01', date2: '2026-01-01', category: 'milestone', priority: 2 },
  { date1: '2010-01-01', date2: '2026-01-01', category: 'milestone', priority: 3 },
  { date1: '2020-01-01', date2: '2026-01-01', category: 'milestone', priority: 3 },
  { date1: '2020-03-01', date2: '2026-03-01', category: 'milestone', priority: 3 }, // 6 years since pandemic

  // === Wedding / Anniversary ===
  { date1: '2026-06-01', date2: '2026-09-30', category: 'wedding', priority: 3 },

  // === Baby / Pregnancy ===
  { date1: '2026-01-01', date2: '2026-09-28', category: 'pregnancy', priority: 3 }, // ~40 weeks
  { date1: '2026-03-01', date2: '2026-11-26', category: 'pregnancy', priority: 3 },

  // === Retirement ===
  { date1: '2026-01-01', date2: '2031-01-01', category: 'retirement', priority: 3 }, // 5-year plan

  // === More cross-year and edge cases ===
  { date1: '2026-01-01', date2: '2026-12-30', category: 'year-end', priority: 3 },
  { date1: '2026-01-02', date2: '2026-12-31', category: 'year-end', priority: 3 },
  { date1: '2026-06-15', date2: '2026-09-15', category: 'summer', priority: 2 },
  { date1: '2026-11-01', date2: '2026-12-24', category: 'holiday', priority: 2 },
  { date1: '2026-03-01', date2: '2026-05-31', category: 'spring', priority: 3 },
  { date1: '2026-09-01', date2: '2026-11-30', category: 'fall', priority: 3 },

  // === 2027 Planning (upcoming full year) ===
  { date1: '2027-01-01', date2: '2027-03-31', category: 'quarter', priority: 2 },
  { date1: '2027-04-01', date2: '2027-06-30', category: 'quarter', priority: 2 },
  { date1: '2027-07-01', date2: '2027-09-30', category: 'quarter', priority: 2 },
  { date1: '2027-10-01', date2: '2027-12-31', category: 'quarter', priority: 2 },
  { date1: '2027-01-01', date2: '2027-06-30', category: 'half-year', priority: 2 },
  { date1: '2027-07-01', date2: '2027-12-31', category: 'half-year', priority: 2 },
  { date1: '2027-01-01', date2: '2027-04-15', category: 'tax', priority: 2 },
  { date1: '2027-09-01', date2: '2027-12-20', category: 'semester', priority: 2 },
  { date1: '2027-12-01', date2: '2027-12-25', category: 'holiday', priority: 1 },
  { date1: '2027-11-01', date2: '2027-12-24', category: 'holiday', priority: 2 },
  { date1: '2027-12-25', date2: '2028-01-01', category: 'cross-year', priority: 1 },

  // === 2028 Planning (leap year) ===
  { date1: '2028-01-01', date2: '2028-03-31', category: 'quarter', priority: 2 },
  { date1: '2028-04-01', date2: '2028-06-30', category: 'quarter', priority: 2 },
  { date1: '2028-07-01', date2: '2028-09-30', category: 'quarter', priority: 2 },
  { date1: '2028-10-01', date2: '2028-12-31', category: 'quarter', priority: 2 },
  { date1: '2028-01-01', date2: '2028-04-15', category: 'tax', priority: 2 },
  { date1: '2028-06-01', date2: '2028-08-31', category: 'summer', priority: 1 },
  { date1: '2028-12-01', date2: '2028-12-25', category: 'holiday', priority: 2 },
];

// Keep only ~100 for MVP
export const mvpDatePairs = datePairs.slice(0, 100);
