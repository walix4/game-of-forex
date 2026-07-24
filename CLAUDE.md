# Game of Forex — Project Brief

Read this file at the start of every session. It is the source of truth.
If something here conflicts with a request in chat, say so before you build.

---

## 0. DIRECTION UPDATE — 2026-07-24 (supersedes conflicts below)

The project pivoted. Where sections 1–8 conflict with this, **this wins**.

- **Business model: prop trading firm** (FTMO-style), not an education business.
  The **core product is selling trading challenges** ($10K/$25K/$50K/$100K/$200K)
  that lead to a funded account after a two-phase evaluation. Community stays.
  Courses/blog/news are dropped from the pivot.
- **Founder is Waqas Ahmed** (confirmed 2026-07-24; an earlier note said "Hamad" — that was wrong).
- **USP:** marketed as focused on **real funded (A-Book) accounts**, vs competitors
  who fund on demo/simulated infrastructure. ⚠️ "World's first" / "real funded"
  is an unverifiable superlative under §4 — ships marked `NEEDS LEGAL SIGN-OFF`
  until the client can substantiate it. Never claim regulated/broker status.
- **Build depth: DESIGN MOCKUPS ONLY.** No real payment, no real auth, no engine.
  Checkout "Buy challenge", Login, and the Dashboard are non-functional front-end
  with clearly-fake data. The unresolved blockers (payment provider for Pakistan,
  broker/MT5, prop-firm legal advice — old §8 Q2/Q4/Q5) are NOT resolved; we are
  only designing the UI, not taking money or provisioning accounts.
- **Visual direction: Alpha Capital (alphacapitalgroup.uk).** Near-black surfaces,
  vivid ROYAL-BLUE accent (`--color-blue-500` #3B63FF), bold gradients, real
  visuals, more motion. ⚠️ This REPLACES the client's brand mint/lime green
  (`#82DC7C`) as the interactive accent — a deliberate client call, reversible via
  the accent tokens in globals.css. Green/red stay for market up/down only.
  One primary CTA per viewport still holds; teal glow is now a blue glow.
- **Page set:** Home, Challenges, Challenge details, Pricing, Rules, Community,
  FAQ, Contact, Login (mock), Dashboard (mock), About (founder).
- Risk disclosure stays first-class on every purchase path (§4 still applies).

---

## 1. What this is

A rebuild of gameofforex.com for Waqas Ahmed — a Pakistan-based forex trader
who sells trading education and runs a Discord/WhatsApp community.

The visual benchmark is ftmo.com: calm, credible, one clear action per screen.
We are matching FTMO's **discipline**, not copying its layout.

### Phase 1 scope — this repo, right now

- Marketing site: home, about, courses index + detail, blog, news, markets, contact
- Lead capture and course enquiry
- CMS-backed blog/news/courses so the client edits content without a developer
- A "Funded Challenge" page that explains the programme and captures interest

### Explicitly OUT of Phase 1 — do not build, do not scaffold

- The funded-challenge engine itself: MT5/cTrader integration, real-time risk
  and drawdown monitoring, account provisioning, payouts, trader dashboards.
  That is a separate backend service and its broker arrangements are unresolved.
- Member area, course video delivery, authentication beyond a stub.

If a task drifts into that territory, stop and flag it rather than building a
convincing-looking shell with nothing behind it.

---

## 2. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15, App Router, TypeScript strict |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`) |
| Components | shadcn/ui, restyled to our tokens — never ship default shadcn look |
| Animation | Motion (`motion/react`) for components; GSAP + ScrollTrigger for scroll |
| Smooth scroll | Lenis |
| CMS | Sanity |
| Charts | TradingView embedded widgets. Do not build charts from scratch. |
| Forms | react-hook-form + zod |
| Email | Resend |
| Hosting | Vercel |

3D (react-three-fiber) is **opt-in only**. Do not add it unless asked, and
never on mobile.

---

## 3. Design system

Tokens live in `app/globals.css` (copied from `gof-tokens.css`). Every colour
comes from there. Never write a raw hex in a component.

### The model

> **Indigo frames. Ink holds. Teal glows. Mint acts.**

| Token | Hex | Only ever used for |
|---|---|---|
| `--bg-frame` indigo | `#0E1148` | Nav, footer, dialogs, overlays |
| `--bg-base` ink | `#181A20` | Page background, cards, panels |
| teal | `#2C484C` | Radial glow behind content. Never a fill. |
| `--accent` mint | `#82DC7C` | Interactive things only |

### Hard rules — treat these as build errors

1. **One mint primary button per viewport.** Everything else is ghost or outline.
2. **Teal never fills a shape.** Radial gradients and glows only.
3. **Indigo frames, it does not floor.** No section body is indigo.
4. **Market up/down never uses mint or signal green.** Use `--market-up`
   (`#16C784`) and `--market-down` (`#FF5A6E`). A trader must distinguish
   "profit" from "button" without reading.
5. **Never white text on `#00A53F`** — 3.25:1, fails WCAG AA. Use
   `--color-signal-700` behind white, or dark text on 500.
6. **Text on mint is always `--text-on-accent`**, never white or black.
7. **No colour outside the eleven-step scale.**

### Typography — PROVISIONAL

Type is Milestone 02 and not yet approved by the client. Build with:

- Display: Archivo (600) — headings, hero
- Body: Inter (400/500)
- Numerals: JetBrains Mono, `font-variant-numeric: tabular-nums`

**All prices, percentages, countdowns and account figures must be tabular.**
Proportional digits make price columns jitter and read as amateur.

Route every face through one `next/font` config so swapping later is a
one-file change. Do not hardcode font names in components.

### Motion

Motion should feel like weight, not decoration. The reference is a trading
terminal, not a startup landing page.

- Page transitions: 300–400ms, `cubic-bezier(0.22, 1, 0.36, 1)`
- Scroll reveals: fade + 16px rise, staggered 60ms. Once only, never on re-entry.
- Hero: one orchestrated entrance sequence. Not five competing animations.
- The teal glow may drift slowly (20s+) — ambient, never attention-seeking.
- Hover: 140ms. Anything slower feels broken.
- `prefers-reduced-motion: reduce` disables all of it. Non-negotiable.
- Nothing animates on the critical path to LCP.

If a section has three animations, remove one.

---

## 4. Content rules — read before writing any copy

The current site has credibility problems. We are fixing them, not porting them.

- **No invented testimonials.** The existing ones describe a US-regulated
  broker with MT5 spreads — Game of Forex is an education business, not a
  broker, and one review is duplicated. Build the testimonial component to
  take real data. Leave it empty with a proper empty state until the client
  supplies verified reviews. Never write placeholder reviews that read as real.
- **No unverifiable statistics.** "224,506 users worldwide earning money" has
  no source. Any number that ships needs an attribution the client can defend.
- **No income promises.** No "start earning today", no "secrets of the money
  game". Forex education carries real regulatory and reputational exposure.
  Write about the education, the method, and the community — not the outcome.
- **Risk disclosure is a first-class element**, not footer small print.
  Every page with a purchase or enrolment path carries a visible risk warning.
- **Never claim regulated status**, licensing, or broker status.

Copy voice: plain, specific, active. "Start challenge", not "Submit". Sentence
case everywhere. No exclamation marks in UI.

When you need copy the client hasn't supplied, write honest placeholder copy
and mark it `{/* NEEDS CLIENT INPUT */}`. Do not invent facts to fill space.

---

## 5. Homepage structure

Current homepage fails because everything competes. Enforce this hierarchy —
one idea per section, one action per screen.

1. **Hero** — one headline, one sentence, one primary CTA plus one secondary.
   The enquiry form does NOT live here; it lives at the conversion point.
   Teal glow behind. This is the only place with a page-load sequence.
2. **Proof** — three or four verifiable credentials. Real logos, real links.
3. **What we do** — education, community, funded challenge. Three cards, honest
   descriptions, each linking to its own page.
4. **The trader** — Waqas Ahmed. Real bio. No net-worth claims.
5. **Markets** — TradingView widget, compact. Utility, not spectacle.
6. **Community** — Discord, WhatsApp, YouTube, Instagram with real counts.
7. **Latest writing** — three most recent posts from CMS.
8. **Single closing CTA** — one action, with risk disclosure adjacent.

Payment must not be a bank account number in the page body. Route enrolment
through a checkout flow. Payment provider is unresolved (Stripe is unavailable
in Pakistan) — build the flow provider-agnostic behind an interface and flag it.

---

## 6. Quality floor

Do not announce these; just meet them.

- Lighthouse mobile: performance ≥ 90, accessibility 100
- LCP < 2.5s on 4G, CLS < 0.1
- Every interactive element keyboard reachable with a visible mint focus ring
- Semantic HTML. Headings in order. Real `<button>` and `<a>`.
- All images `next/image`, WebP/AVIF, explicit dimensions
- Works at 360px width. Test it, don't assume it.
- No layout shift when TradingView widgets load — reserve the space.
- Dark is the only theme. Do not build a light mode.

---

## 7. How to work

- Read this file first, every session.
- Before a large feature, write the plan to `docs/plan-<feature>.md` and
  confirm before building.
- Small, focused commits with conventional commit messages.
- Never commit secrets. `.env.example` only.
- After any UI work, screenshot it and critique your own output before saying
  it is done. Check mobile.
- If a requirement is ambiguous, ask. Do not guess and build.
- If you are about to violate a rule in section 3 or 4, stop and raise it.

## 8. Open questions — blocking, ask about these

1. Logo source file (SVG/AI) for redraw
2. Payment provider decision for Pakistan (Safepay / PayFast / Paddle)
3. Verified testimonials and any statistics the client can substantiate
4. Broker/MT5 arrangement for the funded challenge (Phase 2 blocker)
5. Whether the client has legal advice on operating a prop-firm model
