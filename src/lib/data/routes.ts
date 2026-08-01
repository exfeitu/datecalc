/**
 * src/lib/data/routes.ts
 * Runtime facts about which programmatic pages are generated at build time.
 * Used by template related-link builders so they never point at a URL that
 * would 404 (the /days-between/, /days-from-today/ and /days-from/ routes only
 * build curated subsets of their possible parameter space).
 */
import { datePairs } from './date-pairs';
import { nValuesForToday, nValuesForDate } from './n-values';
import { yearRange, months } from './months';
import { daysFromDates } from './days-from-dates';
import { birthYears } from './birth-years';

const datePairSet: Set<string> = new Set(datePairs.map(p => `${p.date1}/${p.date2}`));
const todayNSet: Set<number> = new Set(nValuesForToday);
const fromNSet: Set<number> = new Set(nValuesForDate);
const fromDateSet: Set<string> = new Set(daysFromDates);
const yearSet: Set<number> = new Set(yearRange);
const leftInYearSet: Set<number> = new Set([2026, 2027, 2028]);
const birthYearSet: Set<number> = new Set(birthYears);
const monthSlugSet: Set<string> = new Set(months.map(m => m.slug));

/**
 * True when an internal href points to a page that actually gets generated.
 * Returns false for curated-route URLs (days-between pairs, today-N values,
 * days-from combos) that are not in the build set.
 */
export function isBuilt(href: string): boolean {
  const clean = href.replace(/\/$/, '').replace(/^\//, '');

  // Hub pages (single-segment paths) are always built.
  if (!clean.includes('/')) return true;

  const [seg, ...rest] = clean.split('/');

  switch (seg) {
    case 'days-between':
      if (rest.length < 2) return true; // hub
      return datePairSet.has(`${rest[0]}/${rest[1]}`);
    case 'days-from-today':
      if (rest.length === 0) return true; // hub
      return todayNSet.has(parseInt(rest[0]));
    case 'days-from':
      if (rest.length < 2) return true; // hub
      return fromNSet.has(parseInt(rest[0])) && fromDateSet.has(rest[1]);
    case 'days-in':
      if (rest.length === 0) return true; // hub
      if (rest.length === 2) return monthSlugSet.has(rest[0]) && yearSet.has(parseInt(rest[1])); // month/year grid
      const n = parseInt(rest[0]);
      return !isNaN(n) ? yearSet.has(n) : monthSlugSet.has(rest[0]);
    case 'days-left-in':
      if (rest.length === 0) return true; // hub
      return leftInYearSet.has(parseInt(rest[0]));
    case 'age-in-days':
      if (rest.length === 0) return true; // hub
      return birthYearSet.has(parseInt(rest[0]));
    case 'days-until':
      return true; // all event/year combos in the dataset are built
    default:
      return true;
  }
}
