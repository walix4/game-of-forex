# EZE Funded — Multi-Page Website

A static, multi-page marketing site. No server, no framework, no build tools needed
to HOST it — but it uses a tiny Python builder so shared header/footer/styles live in
ONE place instead of being copy-pasted into every page.

## Folder layout
```
site/
├── dist/              ← READY-TO-HOST output. Upload THIS folder's contents.
│   ├── index.html
│   ├── challenge.html
│   └── favicon.svg
├── pages/             ← EDIT THESE. One file per page = just that page's content.
│   ├── index.page.html
│   └── challenge.page.html
├── partials/          ← Shared chrome, edited once, applied everywhere.
│   ├── head.html   (title/meta template)
│   ├── style.html  (all CSS)
│   ├── sprite.html (icon set)
│   ├── nav.html    (header)
│   ├── footer.html
│   └── script.html (all JS)
├── assets/            ← favicon etc.
└── build.py           ← run to regenerate dist/
```

## To edit & rebuild
1. Edit a page in `pages/` (or shared parts in `partials/`).
2. Run:  `python3 build.py`
3. `dist/` now has fresh full HTML files.

## To HOST (no Python needed)
Just upload everything inside `dist/` to any static host — Netlify, Vercel,
Cloudflare Pages, or a cPanel `public_html/`. Done.

## Page-file format
Each `pages/NAME.page.html` starts with three comment tags, then the body HTML
(everything that sits between the header and footer):
```
<!--TITLE: Page title for <title> and social -->
<!--DESC: Meta description -->
<!--NAV: challenge -->   (nav key to highlight; blank for none)
...your sections...
```
Nav keys: challenge, a-book, reviews, faq, academy, about.

## Pages
- index      (landing / home)
- challenge  (EZE Challenge — routes, pricing, compare)
- a-book     (A-Book technology — why we never trade against you)
- rewards    (instant payouts, methods, split & scaling)
- academy    (learning tracks + Discord/YouTube communities)
- about      (story, values, team stats, support)
- faq        (categorised FAQ with filter)
- reviews    (Trustpilot wall + leaderboard)

Nav keys for the <!--NAV:--> tag: challenge, a-book, rewards, reviews, faq, academy, about.

## Before launch — replace placeholders
All stats, reviews, leaderboard, PAID cards, YouTube counts, team info, phone/email,
and social links are DEMO. Point Log In / Get Started / Start now to your real app URLs.
Platform logos: cTrader is official; MT5 / DXtrade / Match-Trader are brand-style marks —
swap in official partner logos when available. Have legal review the footer disclaimer
and add Terms / Privacy / risk pages.
