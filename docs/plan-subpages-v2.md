# Plan — sub-pages v2 (EZE static site)

User direction (2026-08-07): index.html untouched; rebuild the other 7 pages.
Complaint: sub-pages feel like recycled landing-page sections.

## Approach

Adopt the already-designed-but-unused "page system" in style.html
(`.page-hero`, `.crumb`, `.peye`, `.ph-quick`, per-page `pg-*` accents) on every
sub-page, and give each page purpose-built components that do not appear on
the landing page. Shared CSS appended to partials/style.html under a
`SUBPAGES v2` marker; guarded JS appended to partials/script.html.

## Per page

| Page | Identity | New components |
|---|---|---|
| challenge | product/configurator | journey stepper (phases), reward calculator (JS), route compare, rulebook rows; keeps the interactive ptable (it IS the product) |
| a-book | engineering/proof | animated order-routing diagram (CSS flow lines), execution-numbers band, keeps A-vs-B panel + FAQ |
| rewards | money/speed | payout timeline stepper w/ timestamps, rails table (replaces landing wd cards), split-scaling ladder, certificate showcase, count-up hero stat |
| academy | course catalog | syllabus accordions (4 tracks × lessons), learning path chips, position-size calculator (JS), keeps community duo |
| about | story | vertical timeline 2023→2026, numbered values (01/02/03), contact cards, support panel |
| faq | help center | live search (JS) + category tabs, expanded to ~18 Q&A, popular-topics row |
| reviews | social proof | Trustpilot-style rating panel with animated distribution bars (replaces the landing-duplicate $94M globe block); keeps video wall, review wall, leaderboard |

All pages end in one shared `.cta-band` end-cap (distinct from landing CTA).

## Constraints

- Demo data stays consistent with existing figures ($94M+, 3m40s, 640K+,
  4.8/5, 132 countries, 80→95%, $2M, D pricing table). No new invented claims.
- Calculators carry an "illustration, not a projection" disclaimer (§4).
- `prefers-reduced-motion` already kills all animation globally — new
  animations are CSS-class based and inherit that.
- New class names verified unused by index.page.html (no visual drift there).
- Validate: rebuild dist, link-check all hrefs/ids, then commit + push.
