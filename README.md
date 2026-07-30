# EZE Funded — Marketing Site

Single-file static website. No build step, no server code, no dependencies.

## Files
- `index.html`  — the entire site (all images embedded as base64; JS/CSS inline)
- `favicon.svg` — site icon (referenced by index.html)
- `generate-images.mjs` — OPTIONAL helper to generate AI hero images via Magnific API
  (needs `MAGNIFIC_API_KEY` env var; not required for the site to work)

## Hosting
Upload `index.html` + `favicon.svg` to ANY static host:
- Netlify / Vercel / Cloudflare Pages: drag-and-drop the folder
- cPanel / shared hosting: put both files in `public_html/`
- Nothing else needed. Only external request is Google Fonts (site still works if blocked).

## Before going live — replace placeholders
1. All stats are DEMO numbers: $94M+, 640K+, 3m 40s, 4.8 rating, 73k reviews, leaderboard,
   PAID cards, review texts, YouTube view counts, team info, Trustpilot data.
2. Buttons/links are anchor placeholders (`#pricing`, `#faq`) — point "Log In", "Get Started",
   "Start now" etc. to your real app/checkout URLs. Social links in footer are `#`.
3. `support@ezefunded.com` and phone number — set real ones.
4. Platform tiles: cTrader logo is official; MetaTrader 5 / DXtrade / Match-Trader are
   brand-style marks — swap in official partner logos from MetaQuotes / Devexperts /
   Match-Trade when you have them.
5. Legal: footer disclaimer text should be reviewed by counsel; add real company details,
   Terms, Privacy, and risk disclosure pages.

## Notes
- Pricing table logic (2-Step / 1-Step / Instant, Show Numbers, Show Phases) is in the
  inline <script> — edit the `var D = {...}` object to change prices/targets.
- Instruments table data: `var II = {...}` in the same script.
- The rotating dotted globe is self-contained canvas JS (no network).
