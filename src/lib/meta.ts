/**
 * src/lib/meta.ts
 * Generate <title> and <meta name="description"> for each page template.
 */

import { getWeekday, isLeapYear } from './dates';
import { formatNumber } from './formatters';

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
  const w1 = getWeekday(date1);
  const w2 = getWeekday(date2);

  return {
    title: `${days} Days Between ${date1} and ${date2} | ${SITE_NAME}`,
    description: `There are exactly ${days} days between ${date1} and ${date2}. That's ${weeks} weeks and ${rem} days. ${date1} is a ${w1}, ${date2} is a ${w2}.`,
  };
}

/** Days From Today Hub */
export function daysFromTodayHubMeta(): Meta {
  return {
    title: `Days From Today Calculator | ${SITE_NAME}`,
    description:
      'Find out what date falls N days from today. Common values: 30, 45, 60, 90, 180, 365 days. Fast and free.',
  };
}

/** Days From Today Programmatic Page */
export function daysFromTodayMeta(n: number, resultDate: string): Meta {
  const weekday = getWeekday(resultDate);
  return {
    title: `${formatNumber(n)} Days From Today — What Date Is ${n} Days From Now? | ${SITE_NAME}`,
    description: `${n} days from today is ${resultDate}. ${resultDate} is a ${weekday}. That's ${Math.floor(n / 7)} weeks from now.`,
  };
}

/** Days Until Event Programmatic Page */
export function daysUntilMeta(eventName: string, year: number, days: number, eventDate: string): Meta {
  const weekday = getWeekday(eventDate);
  return {
    title: `How Many Days Until ${eventName} ${year}? | ${SITE_NAME}`,
    description: `There are ${days} days until ${eventName} ${year}. ${eventName} falls on ${weekday}, ${eventDate} this year.`,
  };
}

/** Days In Month Programmatic Page */
export function daysInMonthMeta(month: string, days: number, year: number): Meta {
  return {
    title: `How Many Days in ${month} ${year}? | ${SITE_NAME}`,
    description: `${month} ${year} has ${days} days. ${month} always has ${days} days except February in leap years.`,
  };
}

/** Days In Year Programmatic Page */
export function daysInYearMeta(year: number, days: number, isLeap: boolean): Meta {
  const leapText = isLeap ? 'a leap year' : 'not a leap year';
  return {
    title: `How Many Days in ${year}? | ${SITE_NAME}`,
    description: `${year} has ${days} days. ${year} is ${leapText}.`,
  };
}

/** Age In Days Programmatic Page */
export function ageInDaysMeta(birthYear: number, ageInDays: number): Meta {
  return {
    title: `Age in Days — Born in ${birthYear} | ${SITE_NAME}`,
    description: `A person born in ${birthYear} is approximately ${formatNumber(ageInDays)} days old. That's about ${Math.floor(ageInDays / 365)} years.`,
  };
}

/** Days Left In Year Programmatic Page */
export function daysLeftInYearMeta(year: number, daysLeft: number): Meta {
  return {
    title: `How Many Days Left in ${year}? | ${SITE_NAME}`,
    description: `There are ${daysLeft} days left in ${year}. The year is ${isLeapYear(year) ? '' : 'not '}a leap year with ${isLeapYear(year) ? 366 : 365} total days.`,
  };
}
