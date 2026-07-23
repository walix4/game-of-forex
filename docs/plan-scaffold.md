# Scaffold Plan — Game of Forex

Status: **awaiting approval**. Nothing below is built yet.
Source of truth: `CLAUDE.md`. This plan implements its Stack (§2), Design system (§3),
and Homepage structure (§5) without touching anything marked OUT of Phase 1 (§1).

---

## 1. Folder structure

```
app/
  (marketing)/                 # route group — public marketing site, shared chrome
    layout.tsx                 # nav + footer (indigo frame), Lenis provider, skip-link
    page.tsx                   # HOME
    about/page.tsx
    courses/page.tsx           # index
    courses/[slug]/page.tsx    # detail
    blog/page.tsx
    blog/[slug]/page.tsx
    news/page.tsx
    news/[slug]/page.tsx
    markets/page.tsx           # TradingView widgets
    contact/page.tsx           # enquiry form (conversion point, not the hero)
    funded-challenge/page.tsx  # explains programme + captures interest ONLY (engine is OUT)
  (studio)/
    studio/[[...tool]]/page.tsx # embedded Sanity Studio at /studio
  api/
    enquiry/route.ts           # react-hook-form target -> Resend
    checkout/route.ts          # provider-agnostic stub behind an interface (§5) — FLAGGED
  layout.tsx                   # root: <html lang> dark-only, next/font vars, metadata
  globals.css                  # gof-tokens.css @theme block lives here (copied first)
  not-found.tsx

components/
  ui/                          # shadcn primitives, restyled to tokens (never default look)
  layout/                      # SiteNav, SiteFooter, Container, Section
  home/                        # HeroSection, ProofRow, WhatWeDo, TraderBio,
                               #   MarketsStrip, CommunityRow, LatestWriting, ClosingCta
  motion/                      # MotionProvider, Reveal (fade+16px rise), LenisProvider
  shared/                      # RiskDisclosure, CtaButton, TabularNumber, EmptyState

lib/
  fonts.ts                     # THE single next/font config (§3 typography)
  sanity/                      # client, image url builder, queries (GROQ)
  payments/                    # provider-agnostic interface + no-op stub — FLAGGED
  utils.ts                     # cn() etc.

sanity/
  schemaTypes/                 # schema definitions (see §5 mapping)
  structure.ts                 # desk structure

docs/
  plan-scaffold.md             # this file
```

**Why route groups.** `(marketing)` shares the indigo nav/footer + Lenis smooth-scroll
provider across every public page. `(studio)` is isolated so the Sanity Studio route does
**not** inherit the marketing chrome, Lenis, or fonts, and is excluded from the marketing
layout's LCP budget.

---

## 2. next/font wiring — swap in one file (§3)

`lib/fonts.ts` is the only place font faces are named. Everything else consumes CSS
variables, so replacing a face after Milestone 02 approval is a one-file change.

```ts
// lib/fonts.ts
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";

export const fontDisplay = Archivo({
  subsets: ["latin"], weight: ["600"], variable: "--font-display", display: "swap",
});
export const fontBody = Inter({
  subsets: ["latin"], weight: ["400", "500"], variable: "--font-body", display: "swap",
});
export const fontMono = JetBrains_Mono({
  subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap",
});
export const fontVars = `${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`;
```

- `app/layout.tsx` puts `fontVars` on `<html>`.
- `globals.css` maps them into the Tailwind `@theme`:
  `--font-sans: var(--font-body); --font-display: var(--font-display); --font-mono: var(--font-mono);`
- Components use `font-display` / `font-mono` utilities — **never** a hardcoded family.
- Numerals: a `<TabularNumber>` helper + a `.tabular` utility applying
  `font-variant-numeric: tabular-nums` on `--font-mono`. All prices/%/countdowns use it (§3).
- Fonts are provisional — a comment in `fonts.ts` says so and points at Milestone 02.

---

## 3. globals.css / Tailwind v4

- **Step one of the actual build:** copy `gof-tokens.css` verbatim into `app/globals.css`
  (it already opens with `@import "tailwindcss"` and the full `@theme` block).
- No `tailwind.config.js` — CSS-first per §2.
- Add only: font-var mappings into `@theme`, base `body { background: var(--bg-base) }`,
  and the fixed hero-glow layer helper. No new colors — the eleven-step scale is closed (§3).

---

## 4. shadcn/ui components needed (restyled to tokens, never default look)

| Component | Used by | Restyle notes |
|---|---|---|
| `button` | CtaButton wrapper | mint-300 fill + `--text-on-accent`; ghost/outline variants for secondary |
| `navigation-menu` | SiteNav | indigo frame, `--text-on-frame`, mint focus ring |
| `sheet` | mobile nav | indigo overlay, works at 360px |
| `card` | WhatWeDo, LatestWriting | `--bg-raised`, `--border-subtle` |
| `input` `textarea` `label` | contact/enquiry | `--bg-inset` field bg, mint focus ring |
| `form` | react-hook-form + zod glue | — |
| `dialog` | enquiry modal (if used) | indigo frame |
| `sonner` (toast) | form success | success uses `signal-700` behind white text (§3 rule 5) |
| `badge` | course tags, "NEEDS CLIENT INPUT" markers | `--accent-subtle` chips |
| `accordion` | funded-challenge FAQ | — |
| `skeleton` | reserve TradingView / CMS space (no CLS) | — |
| `separator` | footer/sections | `--border-subtle` |

Hero itself is **not** a shadcn component — it's bespoke in `components/home/HeroSection.tsx`,
using our own `CtaButton`.

---

## 5. Sanity schema → page inventory mapping

| Schema (`document`) | Feeds | Key fields |
|---|---|---|
| `post` (blog) | `/blog`, `/blog/[slug]`, home "Latest writing" | title, slug, excerpt, cover(image), body(portable text), publishedAt, author→ |
| `newsItem` | `/news`, `/news/[slug]` | title, slug, summary, source, url, publishedAt |
| `course` | `/courses`, `/courses/[slug]` | title, slug, summary, curriculum[], level, price(no bank #s), enquiryCtaLabel |
| `author` | referenced by `post`; `/about` trader bio | name, role, bio(portable text), photo |
| `testimonial` | testimonial component | **empty until client supplies verified data** (§4). quote, name, role, verifiedSource — component ships with an empty state, no invented reviews |
| `credential` | home "Proof" row | label, logo, url (real links only, §5.2) |
| `communityLink` | home "Community" row | platform, url, memberCount, countAsOf(date) — counts attributed, not invented |
| `siteSettings` (singleton) | global | riskDisclosure(portable text), socials, contactEmail |
| `fundedChallenge` (singleton) | `/funded-challenge` | intro, howItWorks[], rules[], interestCtaLabel — copy only, no engine |

- `siteSettings.riskDisclosure` powers the first-class `<RiskDisclosure>` on every
  purchase/enrolment path (§4), not footer small print.
- No `payment`/`order` schema in Phase 1 — checkout provider is unresolved (open Q2).

---

## 6. Build order (after approval)

1. `globals.css` ← `gof-tokens.css`, `lib/fonts.ts`, root layout (dark-only, font vars).
2. Tailwind smoke test — confirm token utilities resolve.
3. **Homepage hero only** — teal glow, one orchestrated load sequence, type scale,
   one primary + one secondary CTA. No other section.
4. Screenshot at 1440px and 360px, self-critique against §3/§5/§6, then report.
5. Stop. Everything past the hero is a separate, later step.

Motion note: hero uses **one** library for its entrance (Motion / `motion/react`).
GSAP+ScrollTrigger is not loaded until a scroll-driven section needs it, to protect the
mobile Lighthouse budget (§6). Nothing animates on the path to LCP (§3).

---

## 7. What this plan deliberately does NOT scaffold

- No MT5/cTrader, risk engine, payouts, trader dashboard, member area, auth beyond a stub (§1).
- No real payment integration — only a flagged provider-agnostic interface (§5, open Q2).
- No testimonials/statistics content — components exist, data stays empty until verified (§4).
- No light mode (§6).
