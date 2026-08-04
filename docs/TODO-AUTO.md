# TODO (Auto)

> Auto-generated task queue for scheduled Claude Code sessions.
> Last updated: 2026-08-05 05:05 UTC

> ⏰ Cron schedule: 00:30, 02:30, 04:30, 06:30, 08:30, 13:30, 19:30, 21:30, 23:30 (avoids 9–12 and 14–18)

## 🔴 High (0 remaining!)
<!-- All High items completed -->

## 🟡 Medium (0 remaining!)
<!-- All Medium items completed -->

## 🟢 Low
- [ ] DECIDE: `today()` uses UTC date — users in UTC+ timezones see "yesterday" for the morning hours until the next build. Choosing a fixed tz would shift all day counts by 1 for some users. Current 2-hourly rebuilds keep it <2h stale
- [ ] FUTURE: Monitor GSC for thin-content pages after UI redesign
- [ ] USER-ACTION: Submit sitemap in GSC — user confirmed real domain = datecalc-calculator.vercel.app (tool-site-liart was a mistaken URL). Steps: add URL-prefix property https://datecalc-calculator.vercel.app/ → verify (HTML file public/googlefa5e87d49d1fb5ce.html) → submit sitemap-index.xml → confirm "discovered URLs" ≈ 677

## ✅ Done
- [x] 2026-08-05: Surface Election Day 2026 on homepage Popular Now + full audit. Added "Days until Election Day 2026" to homepage popularLinks (high midterm-season volume, ~91 days out, page added last session). Full audit: 681 pages, 0 broken (13852 links), 0 h1 issues, 0 schema errors, 0 bad canonical, 0 title issues, 0 heading-hierarchy violations, 0 images missing alt, 0 our-JS on programmatic pages, freshness OK. Decided against World Cup 2026 / Olympics 2028 (date ranges, don't fit annual event model; lunar 2029 expansion still blocked)
- [x] 2026-08-05: Add Election Day (US) event — high-volume annual query missing (2026 midterms Nov 3, 2028 presidential Nov 7). Implemented as computedRule 'election-day' (Tuesday after first Monday of November, = first Monday + 1 day) in dates.ts + events.ts. +3 pages (678→681). Dates independently verified: 2026-11-03 / 2027-11-02 / 2028-11-07 all Tuesdays. In sitemap, on hub, related-event links + FAQPage schema present. Audit: 0 broken (13852 links), 0 h1 issues, 0 schema errors, 0 title issues
- [x] 2026-08-05: Routine audit — all green, no new issues. 678 pages built. 0 broken links (13783 checked), 0 missing/multi h1, 0 schema errors, 0 bad canonical, 0 titles >70, 0 duplicate titles, 0 thin (<150), 671/677 descs in 120-155 (6 hub brand pages short, intentional). Sitemap coverage perfect (677 built = 677 sitemap, 404 correctly excluded). Freshness verified: build at 01:00 CST = 17:00 UTC 08-04, so today()=2026-08-04 UTC (documented UTC design), 7d→08-11 / 30d→09-03 / 365d→2027-08-04 all correct
- [x] 2026-08-04: Fix short meta descriptions (11 pages <100 → 0; 671/677 now in 120-155 target). The year-agnostic /days-in/{month}/ anchor descriptions I'd written last session were 89-93 chars — enriched with glance data (starts/ends weekday, weekend count) → 137-144. Also enriched /days-in/{month}/{year}/ (110-115 → 125+) and days-until descriptions (+"from today" → 120+). Remaining 6 under 120 are hub/index brand pages (homepage 111, hubs 113-115) — intentional short blurbs, fine. Audit: 0 broken (13783 links), 0 h1 issues, 0 schema errors, 0 titles >70, 0 duplicate titles
- [x] 2026-08-04: Fix 256 over-long + 12 duplicate page titles — days-from pages were "90 Days From June 1, 2026 — What Date Is 90 Days After June 1, 2026?" (79-89 chars, date repeated twice). Now "What Date Is 90 Days From June 1, 2026?" (matches h1, ~44 chars). Same fix on days-from-today (62→40). Anchor /days-in/{month}/ pages duplicated the {month}/{year} titles ("How Many Days in November 2026?" ×2) — anchor is year-agnostic, now "How Many Days in November?" with yearless desc. Result: 0 titles >70 (was 256), 0 duplicate titles (was 12), remaining 14 at 63-64 chars are legit long event names (DST/MLK/CNY eve). Build 678 clean, audit 0 broken
- [x] 2026-08-04: Add "Month at a Glance" block + 3 FAQs to 2026-anchored /days-in/{month}/ pages — the [month]/[year] variant pages had the weekday-distribution glance block + 5 FAQs, but the anchor month pages had only 2 FAQs and no glance block (real content inconsistency). Added build-time weekday counts, starts/ends weekday, weekend/workday breakdown + weekends/start-day/top-weekday FAQs + firstWeekday meta desc (e.g. "November 2026 ... starts on a Sunday"). Verified: Nov 2026 starts Sun ends Mon, 5/5/4/4/4/4/4 = 30d, 9 weekend/21 weekday; Feb 2026 28d non-leap, 8 weekend/20 weekday. All 5 FAQs present in FAQPage schema. Build 678 clean, audit 0 broken links
- [x] 2026-08-03: Add 100 & 365 to nValuesForDate — /days-from/N/date supported only [30,45,60,90,120,180], missing two of the most common "N days from [date]" queries ("100 days from Christmas", "1 year from [date]"). +64 pages (32 dates × 2 values; 614→678). Hub popularFrom + intro updated. Verified: 100d from 2026-12-25 = 2027-04-04; 365d from 2026-01-01 = 2027-01-01; leap edge 365d from 2028-02-29 = 2029-02-28. Audit: 10556 links 0 broken, 0 h1 issues, 0 thin
- [x] 2026-08-03: Add 10 & 28 days-from-today pages — nValuesForToday had 7/14/21/30 but skipped 10 and 28 (nValues for /days-from/N/date had them). +2 pages (612→614). Hub popularNValues + Quick Jump updated to match. Verified: 10d from 2026-08-03 = 2026-08-13 (1w3d), 28d = 2026-08-31 (4w0d). Audit: 0 broken links (9720 checked), 0 missing/multi h1
- [x] 2026-08-03: Add 500 & 1000 days-from-today pages — "500/1000 days from today" are common milestone-planning queries, max N was 365. Added both to nValuesForToday (16→18 pages) + hub popularNValues + Quick Jump (1000). Verified: 500d from 2026-08-03 = 2027-12-16 (71w3d), 1000d = 2029-04-29 (142w6d). Build 610→612, sitemap 611, audit green (0 broken, 0 thin, 0 our-JS on programmatic)
- [x] 2026-08-03: Calculator — click Start/End field opens date picker directly — in some browsers (Firefox) only the calendar icon opens the picker, so focus turned blue but the field wasn't editable. Added showPicker() on click of both date inputs (try/catch for browsers that open natively on click, e.g. Chrome). Inputs now cursor:pointer, hover = accent border, focus = accent border + glow + light blue fill so the blue state clearly means "editable". Calculator script 2.0KB inline, programmatic pages still 0KB JS. Build 610, green
- [x] 2026-08-03: Silo days-between pair pages + surface 2027/2028 on hub — pair pages only cross-linked tools; now each links to its 4 nearest same-start-year pairs (verified: 2027-Q1 → spring-semester/Q2/summer/Q3). Hub popularPairs updated to showcase 2027 full-year/Q1/tax/Christmas + 2028 tax, replacing low-value 2026 entries. Build 610, audit green, 0 broken links
- [x] 2026-08-03: Silo days-until event pages with related-event links — event pages only cross-linked tools (days-between/in/left-in); now each links to its 4 nearest same-category events, labels auto-until/since per date, leap-day excluded, isBuilt-filtered. 189 event pages benefit; single-event categories (environment/special) add none. Audit green, 0 broken links
- [x] 2026-08-03: Expand days-between date-pairs with 2027/2028 planning coverage — was 2026-anchored. +18 pairs: 2027 quarters/H1-H2/tax/fall-semester/holiday-season/christmas→NY, 2028 quarters/tax/summer/holiday-season. Build 592→610. All new pages verify correct day counts (2027-Q1=89, Xmas→NY=7, 2028-tax=105, 2028-summer=91). Audit green, 0 thin
- [x] 2026-08-03: Add FAQPage schema to all 8 hub/index pages — homepage + days-in/until/from-today/left-in/from/age-in-days/between rendered FAQ blocks but lacked FAQPage JSON-LD (programmatic pages already had it). New shared faqPageSchema() helper in schema.ts; each hub now emits [...schemas, faqPageSchema(faqItems)]. Coverage: 8/8 FAQ blocks → schema, 0 unparseable JSON-LD. Build 592, audit green
- [x] 2026-08-03: Add 6 high-search-volume events to /days-until/ — dst-start (2nd Sun Mar) + dst-end (1st Sun Nov, floating rule), christmas-eve (Dec 24), groundhog-day (Feb 2), april-fools (Apr 1), flag-day (Jun 14). +18 pages (6 events × 3 years). Build 574→592. Dates verified (DST 2026: 3/8 & 11/1), hub auto-groups them, FAQ count updated to "over 60". Audit green
- [x] 2026-08-03: Add KeyFacts card to days-left-in/[year] — remaining-days stats (weeks/hours/min/sec). Last 3 borderline pages (120 words) now >150. Thin content 0, lowest page 129 words
- [x] 2026-08-02: Enrich /days-in/{month}/{year}/ grid pages — thin-content scan flagged all 77 month×year pages at 114 words. Added build-time computed "Month at a Glance" block (7-day weekday distribution grid, starts-on/ends-on weekday, weekend/weekday counts) + 3 new FAQs (weekends, starting weekday, most-common weekday) + stronger meta description with starting weekday. Thin pages 77→0. Build 574, audit green. Template: days-in/[month]/[year].astro, meta: daysInMonthMeta optional firstWeekday param
- [x] 2026-08-02: Fix wrong lunar/religious holiday dates + add Ramadan — diwali/hanukkah/eid-al-fitr were hardcoded to 2026 dates for all years (2/3 of pages wrong). Moved to per-year lookup table in dates.ts; added ramadan. Build 571→574, audit green
- [x] 2026-08-02: Add Chinese New Year events — chinese-new-year + chinese-new-years-eve (per-year Gregorian lookup table in dates.ts, same computedRule path as Easter). Covers huge "how many days until Chinese New Year" queries. +6 pages (2 events × 3 years). Build 565→571, audit green
- [x] 2026-08-02: Add Easter family events — easter, good-friday, easter-monday, ash-wednesday, pentecost (computed via Meeus/Jones/Butcher computus in dates.ts). Covers high-volume "days until Easter 2027" queries. +15 pages (5 events × 3 years). Build 550→565, audit green
- [x] 2026-08-02: Expand data coverage: +5 days-from-today N values (75,100,200,250,300 → covers "100 days from today" queries) and +7 birth years (1940-2025 every 5 years → 18 total). Hub popular lists + Quick Jump updated. Build 538→550, sitemap 537→549
- [x] 2026-08-02: New /days-in/{month}/{year}/ route — 84 pages covering "how many days in [month] [year]" (12 months × 7 years, 2024-2030). Closes the gap where month pages were 2026-anchored (Feb 2028 = 29 days now a real page). isBuilt handles month/year combos; month pages link to all year variants, year pages link to all 12 months. Build 454→538, sitemap 453→537
- [x] 2026-08-02: Create /days-from/ + /days-left-in/ hub pages (were 404 URLs that isBuilt() wrongly claimed as built). Now all 7 templates have parent hubs. days-from hub: 12 popular combos; days-left-in hub: 2026/27/28 progress cards. Cross-linked from templates + homepage. Build 452→454, sitemap 451→453
- [x] 2026-08-02: Dedupe date-pairs.ts — removed 7 duplicate date pairs (same URL, different category label). Build count corrected 459→452 (was inflated by duplicate routes). Real count: 451 sitemap routes + 404. Audit all green. category/priority fields confirmed unused
- [x] 2026-08-02: Homepage hero graphic — new TodayPlate component (zero-JS, build-time): mini calendar of current month w/ today highlighted in blue, year-progress bar + needle, day-of-year readout. Fills the type-only hero. Adds ~1.2KB shared CSS, homepage ~21.9KB HTML. Added --radius-xs token
- [x] 2026-08-01: Fix days-until title/meta/h1 saying "until" for past events → now "since" (e.g. "How Many Days Since Spring 2026?"). Full-site audit: 0 broken links, 0 missing/multi h1, 0 desc >160, 0 thin
- [x] 2026-08-01: Enrich meta descriptions below 100 chars (69 pages → 0): days-until adds weeks/day breakdown + since-verb; days-from adds weekday + exact weeks. Target 120-155 chars
- [x] 2026-08-01: Remove stale .claude/skills/frontend-design.md (project copy of plugin the user uninstalled)
- [x] 2026-08-01: Calculator reads ?start=&end= URL params — prefill + shareable URL sync (homepage + hub pages)
- [x] 2026-08-01: Fix missing <h1> on all 443 programmatic pages. AnswerHero now takes a `heading` prop (renders serif h1 above the readout); all 7 templates pass their question. Audit: 0 pages missing h1, 0 duplicates
- [x] 2026-08-01: Trim meta descriptions over 160 chars to 0 (days-between, days-until, days-in month). Polished days-until desc with formatted dates
- [x] 2026-08-01: Fix 623 broken internal links → 0. Added shared `isBuilt()` (src/lib/data/routes.ts) that knows which curated routes are generated; all 6 programmatic templates filter related links through it
- [x] 2026-08-01: Fix leap-day 2027 broken link in days-until hub (exclude leap-day, built only for 2028)
- [x] 2026-08-01: Bold UI redesign "Engineering Logbook" — graph-paper grid bg, white plates, serif display + mono kicker system
- [x] 2026-08-01: AnswerHero measuring-ruler signature — tick row + blue needle under every answer number
- [x] 2026-08-01: Header — serif wordmark + ruler-tick mark + active-section nav highlight
- [x] 2026-08-01: Card components — white plates, mono kickers, hairline borders (CategoryCard/DateContext/KeyFacts/Timeline/FAQ/RelatedQueries/ShareLink)
- [x] 2026-08-01: Homepage serif hero + mono section kickers; all 4 hub pages mono headings
- [x] 2026-08-01: Fix grid texture full-bleed (html), remove dead utility classes
- [x] 2026-08-01: Verify build 459 pages + CSS budget (4.5KB inline / 6KB shared asset)
- [x] 2026-08-01: Fix 404 page CSS — replaced non-existent vars, used design system tokens
- [x] 2026-08-01: Add cross-links to all 4 index pages — consistent "More Date Tools" sections
- [x] 2026-08-01: Enrich days-from/[n]/[date] — KeyFacts + Timeline + ShareLink + 6 links + 4 FAQs
- [x] 2026-08-01: Enrich age-in-days/[year] — KeyFacts + ShareLink + 5 links + 3 FAQs
- [x] 2026-08-01: Enrich days-in/[slug] — KeyFacts + ShareLink for both months and years
- [x] 2026-08-01: Enrich days-left-in template — ShareLink + 7 related links (was 3)
- [x] 2026-08-01: Verify schema.org — all 451 non-error pages pass JSON-LD + semantic checks
- [x] 2026-08-01: Add "Share this result" copy link component (ShareLink.astro) — zero JS, readonly input
- [x] 2026-08-01: Review day-of-week labels readability — increased mobile font size + contrast
- [x] 2026-07-31: Add KeyFacts stats card to 3 main templates
- [x] 2026-07-31: Fix DateContext period spacing bug
- [x] 2026-07-31: Full CSS redesign — global.css + 12 components + 4 templates
- [x] 2026-08-01: Add 2-3 more internal links to RelatedQueries in all 3 templates
- [x] 2026-08-01: Add Quick Jump nav to days-from-today index page
- [x] 2026-08-01: Add 2 FAQ items per template (each 2→4 questions)
- [x] 2026-08-01: Update all 4 index pages styles to new CSS variables
- [x] 2026-08-01: Expand all meta descriptions to 120-155 chars
- [x] 2026-08-01: Refine DateContext leap year text to natural language
- [x] 2026-08-01: Create Timeline visual component + inject into 3 templates
- [x] 2026-08-01: Update about page content and styles
