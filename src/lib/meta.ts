/**
 * src/lib/meta.ts
 * Generate <title> and <meta name="description"> for each page template.
 * Target: descriptions 120-155 chars.
 */

import { getWeekday, isLeapYear } from './dates';
import { formatNumber, formatDateLong } from './formatters';

/** Base site name appended to all titles */
const SITE_NAME = 'DateCalc';

export interface Meta {
  title: string;
  description: string;
}

/** Homepage */
export function homeMeta(): Meta {
  return {
    title: `Date Calculator — Fast & Free | ${SITE_NAME}`,
    description:
      'Free online date calculator. Calculate days between dates, countdown to events, and more. Fast, simple, no ads.',
  };
}

/** Days Between Hub */
export function daysBetweenHubMeta(): Meta {
  return {
    title: `Days Between Dates Calculator | ${SITE_NAME}`,
    description:
      'Calculate the exact number of days between any two dates. Free, fast, and accurate. Includes weeks, months, and context.',
  };
}

/** Days Between Programmatic Page */
export function daysBetweenMeta(date1: string, date2: string, days: number): Meta {
  const weeks = Math.floor(days / 7);
  const rem = days % 7;

  return {
    title: `${days} Days Between ${date1} and ${date2} | ${SITE_NAME}`,
    description: `There are exactly ${days} days between ${date1} and ${date2}. That's ${weeks} weeks and ${rem} days. Free date calculator with weeks breakdown.`,
  };
}

/** Days From Today Hub */
export function daysFromTodayHubMeta(): Meta {
  return {
    title: `Days From Today Calculator | ${SITE_NAME}`,
    description:
      'Find out what date falls N days from today. Common values: 30, 45, 60, 90, 180, 365 days. Fast, free, and accurate.',
  };
}

/** Days From Today Programmatic Page */
export function daysFromTodayMeta(n: number, resultDate: string): Meta {
  const weekday = getWeekday(resultDate);
  const weeks = Math.floor(n / 7);
  const rem = n % 7;
  return {
    title: `What Date Is ${formatNumber(n)} Days From Today? | ${SITE_NAME}`,
    description: `${n} days from today is ${resultDate} (a ${weekday}). That's ${weeks} weeks and ${rem} days from now. Use DateCalc to find any future date — fast, free, and accurate.`,
  };
}

/** Days From a Date Hub */
export function daysFromHubMeta(): Meta {
  return {
    title: `Days From a Date Calculator | ${SITE_NAME}`,
    description:
      'Find what date falls N days from any start date. Calculate 30, 45, 60, 90, 120, or 180 days after a specific date. Free and fast with DateCalc.',
  };
}

/** Days Left in Year Hub */
export function daysLeftInHubMeta(): Meta {
  return {
    title: `Days Left in the Year Calculator | ${SITE_NAME}`,
    description:
      'See how many days are left in the year, with day-by-day year progress. Check 2026, 2027, or 2028 instantly. Free year countdown with DateCalc.',
  };
}

/** Days Until Event Programmatic Page */
export function daysUntilMeta(
  eventName: string,
  year: number,
  days: number,
  eventDate: string,
  verb: 'until' | 'since',
): Meta {
  const weekday = getWeekday(eventDate);
  const weeks = Math.floor(days / 7);
  const rem = days % 7;
  const weekLabel = weeks === 1 ? 'week' : 'weeks';
  const remStr = rem ? ` and ${rem} day${rem === 1 ? '' : 's'}` : '';
  return {
    title: `How Many Days ${verb === 'until' ? 'Until' : 'Since'} ${eventName} ${year}? | ${SITE_NAME}`,
    description:
      verb === 'until'
        ? `There are ${days} days until ${eventName} ${year} (${weekday}, ${formatDateLong(eventDate)}). That's ${weeks} ${weekLabel}${remStr}. Free countdown with DateCalc.`
        : `${eventName} ${year} was ${days} days ago (${weekday}, ${formatDateLong(eventDate)}). That's ${weeks} ${weekLabel}${remStr}. Free date countdown with DateCalc.`,
  };
}

/** Days In Month Programmatic Page */
export function daysInMonthMeta(month: string, days: number, year: number, firstWeekday?: string): Meta {
  return {
    title: `How Many Days in ${month} ${year}? | ${SITE_NAME}`,
    description: firstWeekday
      ? `${month} ${year} has ${days} days and starts on a ${firstWeekday}. See the weekday breakdown and weekend count. Free from DateCalc.`
      : `${month} ${year} has ${days} days. Check how many days every month has, plus leap-year February. Free from DateCalc.`,
  };
}

/** Days In Year Programmatic Page */
export function daysInYearMeta(year: number, days: number, isLeap: boolean): Meta {
  const leapText = isLeap ? 'a leap year with 366 days' : 'not a leap year, it has 365 days';
  return {
    title: `How Many Days in ${year}? | ${SITE_NAME}`,
    description: `${year} has ${days} days — it is ${leapText}. Learn how leap years work and check any year with DateCalc's free reference tool.`,
  };
}

/** Age In Days Programmatic Page */
export function ageInDaysMeta(birthYear: number, ageInDays: number): Meta {
  const years = Math.floor(ageInDays / 365);
  return {
    title: `Age in Days — Born in ${birthYear} | ${SITE_NAME}`,
    description: `A person born in ${birthYear} is approximately ${formatNumber(ageInDays)} days old. That's about ${years} years, or ${formatNumber(Math.floor(ageInDays / 7))} weeks. Free age calculator from DateCalc.`,
  };
}

/** Days Left In Year Programmatic Page */
export function daysLeftInYearMeta(year: number, daysLeft: number): Meta {
  const total = isLeapYear(year) ? 366 : 365;
  const pct = Math.round(((total - daysLeft) / total) * 100);
  return {
    title: `How Many Days Left in ${year}? | ${SITE_NAME}`,
    description: `There are ${daysLeft} days left in ${year} (about ${pct}% complete). ${year} has ${total} total days${isLeapYear(year) ? ' (a leap year)' : ''}. Track year progress with DateCalc.`,
  };
}
