/**
 * src/lib/data/events.ts
 * Global holidays and events for /days-until/{event}/{year}/ pages.
 * MVP: ~50 events × 3 years (2026, 2027, 2028) = ~150 pages.
 */

export type EventType = 'fixed' | 'floating' | 'astronomical' | 'computed';

export interface CalendarEvent {
  slug: string;
  name: string;
  /** 1-indexed month (for fixed events) */
  month: number;
  /** Day of month (for fixed events). 0 = calculated (see floatingRule) */
  day: number;
  type: EventType;
  category: string;
  /** For floating events: which occurrence of which weekday */
  floatingRule?: {
    weekday: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    occurrence: 1 | 2 | 3 | 4 | -1; // 1=first, 4=fourth, -1=last
  };
  /** For computed events: which algorithm / lookup table (Easter family, Chinese New Year, lunar holidays) */
  computedRule?: 'easter' | 'good-friday' | 'easter-monday' | 'ash-wednesday' | 'pentecost' | 'chinese-new-year' | 'chinese-new-years-eve' | 'ramadan' | 'eid-al-fitr' | 'diwali' | 'hanukkah';
}

export const events: CalendarEvent[] = [
  // === Major Holidays ===
  { slug: 'christmas',      name: 'Christmas',            month: 12, day: 25, type: 'fixed', category: 'holiday' },
  { slug: 'new-year',       name: "New Year's Day",       month: 1,  day: 1,  type: 'fixed', category: 'holiday' },
  { slug: 'new-years-eve',  name: "New Year's Eve",       month: 12, day: 31, type: 'fixed', category: 'holiday' },
  { slug: 'halloween',      name: 'Halloween',             month: 10, day: 31, type: 'fixed', category: 'holiday' },
  { slug: 'valentines-day', name: "Valentine's Day",       month: 2,  day: 14, type: 'fixed', category: 'holiday' },
  { slug: 'st-patricks',    name: "St. Patrick's Day",     month: 3,  day: 17, type: 'fixed', category: 'holiday' },
  { slug: 'independence',   name: 'Independence Day (US)', month: 7,  day: 4,  type: 'fixed', category: 'holiday' },
  { slug: 'canada-day',     name: 'Canada Day',            month: 7,  day: 1,  type: 'fixed', category: 'holiday' },
  { slug: 'boxing-day',     name: 'Boxing Day',            month: 12, day: 26, type: 'fixed', category: 'holiday' },

  // === Floating Holidays (US) ===
  { slug: 'thanksgiving',    name: 'Thanksgiving',        month: 11, day: 0, type: 'floating', category: 'holiday',
    floatingRule: { weekday: 'Thursday', occurrence: 4 } },
  { slug: 'mothers-day',     name: "Mother's Day",        month: 5,  day: 0, type: 'floating', category: 'holiday',
    floatingRule: { weekday: 'Sunday', occurrence: 2 } },
  { slug: 'fathers-day',     name: "Father's Day",        month: 6,  day: 0, type: 'floating', category: 'holiday',
    floatingRule: { weekday: 'Sunday', occurrence: 3 } },
  { slug: 'labor-day',       name: 'Labor Day',            month: 9,  day: 0, type: 'floating', category: 'holiday',
    floatingRule: { weekday: 'Monday', occurrence: 1 } },
  { slug: 'memorial-day',    name: 'Memorial Day',         month: 5,  day: 0, type: 'floating', category: 'holiday',
    floatingRule: { weekday: 'Monday', occurrence: -1 } },
  { slug: 'mlk-day',         name: 'Martin Luther King Jr. Day', month: 1, day: 0, type: 'floating', category: 'holiday',
    floatingRule: { weekday: 'Monday', occurrence: 3 } },
  { slug: 'presidents-day',  name: "Presidents' Day",      month: 2,  day: 0, type: 'floating', category: 'holiday',
    floatingRule: { weekday: 'Monday', occurrence: 3 } },
  { slug: 'columbus-day',    name: 'Columbus Day',         month: 10, day: 0, type: 'floating', category: 'holiday',
    floatingRule: { weekday: 'Monday', occurrence: 2 } },
  { slug: 'veterans-day',    name: 'Veterans Day',         month: 11, day: 11, type: 'fixed', category: 'holiday' },
  { slug: 'juneteenth',      name: 'Juneteenth',           month: 6,  day: 19, type: 'fixed', category: 'holiday' },

  // === Other Country Holidays ===
  { slug: 'australia-day',  name: 'Australia Day',         month: 1,  day: 26, type: 'fixed', category: 'international' },
  { slug: 'bastille-day',   name: 'Bastille Day',          month: 7,  day: 14, type: 'fixed', category: 'international' },
  { slug: 'cinco-de-mayo',  name: 'Cinco de Mayo',         month: 5,  day: 5,  type: 'fixed', category: 'international' },
  { slug: 'diwali',         name: 'Diwali',                month: 11, day: 8,  type: 'computed', category: 'international', computedRule: 'diwali' },
  { slug: 'hanukkah',       name: 'Hanukkah',              month: 12, day: 5,  type: 'computed', category: 'international', computedRule: 'hanukkah' },
  { slug: 'eid-al-fitr',    name: 'Eid al-Fitr',           month: 3,  day: 20, type: 'computed', category: 'international', computedRule: 'eid-al-fitr' },
  { slug: 'ramadan',        name: 'Ramadan',               month: 2,  day: 19, type: 'computed', category: 'international', computedRule: 'ramadan' },

  // === Shopping / Commercial ===
  { slug: 'black-friday',   name: 'Black Friday',          month: 11, day: 0, type: 'floating', category: 'shopping',
    floatingRule: { weekday: 'Friday', occurrence: 4 } }, // Friday after Thanksgiving
  { slug: 'cyber-monday',   name: 'Cyber Monday',          month: 11, day: 0, type: 'floating', category: 'shopping',
    floatingRule: { weekday: 'Monday', occurrence: 4 } }, // Monday after Thanksgiving
  { slug: 'amazon-prime',   name: 'Amazon Prime Day',      month: 7,  day: 15, type: 'fixed', category: 'shopping' }, // approx

  // === Seasons (Astronomical) ===
  { slug: 'spring-equinox',  name: 'Spring Equinox',       month: 3,  day: 20, type: 'fixed', category: 'season' },
  { slug: 'summer-solstice', name: 'Summer Solstice',      month: 6,  day: 21, type: 'fixed', category: 'season' },
  { slug: 'fall-equinox',    name: 'Fall Equinox',         month: 9,  day: 22, type: 'fixed', category: 'season' },
  { slug: 'winter-solstice', name: 'Winter Solstice',      month: 12, day: 21, type: 'fixed', category: 'season' },
  { slug: 'summer',          name: 'Summer',               month: 6,  day: 1,  type: 'fixed', category: 'season' },
  { slug: 'winter',          name: 'Winter',               month: 12, day: 1,  type: 'fixed', category: 'season' },
  { slug: 'spring',          name: 'Spring',               month: 3,  day: 1,  type: 'fixed', category: 'season' },
  { slug: 'fall',            name: 'Fall',                 month: 9,  day: 1,  type: 'fixed', category: 'season' },

  // === Sports ===
  { slug: 'super-bowl',     name: 'Super Bowl',            month: 2,  day: 7,  type: 'fixed', category: 'sports' }, // 2027
  { slug: 'march-madness',  name: 'March Madness',         month: 3,  day: 11, type: 'fixed', category: 'sports' },
  { slug: 'world-series',   name: 'World Series',          month: 10, day: 20, type: 'fixed', category: 'sports' }, // approx
  { slug: 'nba-finals',     name: 'NBA Finals',            month: 6,  day: 1,  type: 'fixed', category: 'sports' }, // approx
  { slug: 'kentucky-derby', name: 'Kentucky Derby',        month: 5,  day: 2,  type: 'fixed', category: 'sports' },

  // === School ===
  { slug: 'last-day-school', name: 'Last Day of School',   month: 6,  day: 15, type: 'fixed', category: 'school' }, // approx
  { slug: 'first-day-school', name: 'First Day of School', month: 8,  day: 20, type: 'fixed', category: 'school' }, // approx

  // === Pop Culture ===
  { slug: 'oscars',         name: 'Academy Awards',        month: 3,  day: 2,  type: 'fixed', category: 'entertainment' }, // 2026
  { slug: 'grammys',        name: 'Grammy Awards',         month: 2,  day: 2,  type: 'fixed', category: 'entertainment' }, // 2026

  // === Environment ===
  { slug: 'earth-day',      name: 'Earth Day',             month: 4,  day: 22, type: 'fixed', category: 'environment' },

  // === Financial ===
  { slug: 'tax-day-us',     name: 'Tax Day (US)',          month: 4,  day: 15, type: 'fixed', category: 'financial' },
  { slug: 'end-of-fiscal',  name: 'End of Fiscal Year',    month: 9,  day: 30, type: 'fixed', category: 'financial' },

  // === Leap-Related ===
  { slug: 'leap-day',       name: 'Leap Day',              month: 2,  day: 29, type: 'fixed', category: 'special' },

  // === Easter Family (computed via computus) ===
  { slug: 'easter',         name: 'Easter',                month: 3,  day: 0,  type: 'computed', category: 'holiday', computedRule: 'easter' },
  { slug: 'good-friday',    name: 'Good Friday',           month: 3,  day: 0,  type: 'computed', category: 'holiday', computedRule: 'good-friday' },
  { slug: 'easter-monday',  name: 'Easter Monday',         month: 3,  day: 0,  type: 'computed', category: 'holiday', computedRule: 'easter-monday' },
  { slug: 'ash-wednesday',  name: 'Ash Wednesday',         month: 2,  day: 0,  type: 'computed', category: 'holiday', computedRule: 'ash-wednesday' },
  { slug: 'pentecost',      name: 'Pentecost',             month: 5,  day: 0,  type: 'computed', category: 'holiday', computedRule: 'pentecost' },

  // === Lunar New Year (computed via lookup table) ===
  { slug: 'chinese-new-year',        name: 'Chinese New Year',       month: 2,  day: 0,  type: 'computed', category: 'international', computedRule: 'chinese-new-year' },
  { slug: 'chinese-new-years-eve',   name: "Chinese New Year's Eve", month: 2,  day: 0,  type: 'computed', category: 'international', computedRule: 'chinese-new-years-eve' },
];

/** Years to generate pages for */
export const eventYears = [2026, 2027, 2028];
