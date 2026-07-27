"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/shared/CtaButton";
import { asset } from "@/lib/asset";

/**
 * FundedNext-style pinned scroll sequence (client request, 2026-07-27):
 * 1) full-width desk image under the header,
 * 2) on scroll it splits into three cards,
 * 3) each card flips into a STEP card (silver / accent blue / gold) and tilts.
 *
 * Below lg and under prefers-reduced-motion this renders a static version —
 * pinned scroll animation is desktop-only by design (§3 motion discipline).
 * Desk image is a stock placeholder; step copy avoids payout-time promises
 * (schedule NEEDS CLIENT INPUT, §8).
 */

// Reference-style card palette (client request) — deliberate exception to the
// token scale, scoped to these cards only, mirroring the supplied reference.
const STEPS = [
  {
    step: "Step 1",
    title: "Trade",
    body: "Start the challenge. Follow the rules. Hit the target.",
    bg: "linear-gradient(165deg, #A78BFA 0%, #7C5CE8 45%, #4C2FB8 100%)",
    glow: "#C4B0FF",
    deep: "#2E1A78",
    icon: "candles",
  },
  {
    step: "Step 2",
    title: "Pass",
    body: "Clear both phases. Get your funded account.",
    bg: "linear-gradient(165deg, #FFB35C 0%, #F97F1B 50%, #D95A05 100%)",
    glow: "#FFD9A8",
    deep: "#8F3B02",
    icon: "arrow",
  },
  {
    step: "Step 3",
    title: "Reward",
    body: "Request your split of the profit you generate.",
    bg: "linear-gradient(165deg, #4ADE80 0%, #1FA84F 50%, #0B6B2E 100%)",
    glow: "#A8F5C4",
    deep: "#064D20",
    icon: "medal",
  },
] as const;

/** Metallic 3D-style glyphs: per-icon gradient fills, a light-catch edge and a
    deep drop shadow — approximates the reference's rendered-3D look in SVG. */
function StepIcon({
  name,
  glow,
  deep,
}: {
  name: string;
  glow: string;
  deep: string;
}) {
  const gid = `grad-${name}`;
  return (
    <svg
      viewBox="0 0 48 48"
      className="size-36 drop-shadow-[0_18px_28px_rgb(0_0_0/0.45)] sm:size-44"
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.35" stopColor={glow} />
          <stop offset="1" stopColor={deep} />
        </linearGradient>
        <linearGradient id={`${gid}-b`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={glow} />
          <stop offset="1" stopColor={deep} />
        </linearGradient>
      </defs>
      {name === "candles" && (
        <g>
          <path
            d="M12 6v36M24 2v44M36 10v32"
            stroke={`url(#${gid}-b)`}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <rect x="6.5" y="16" width="11" height="16" rx="3" fill={`url(#${gid})`} />
          <rect x="18.5" y="24" width="11" height="12" rx="3" fill={`url(#${gid})`} />
          <rect x="30.5" y="12" width="11" height="22" rx="3" fill={`url(#${gid})`} />
          {/* light-catch edges */}
          <path
            d="M8 17.5h8M20 25.5h8M32 13.5h8"
            stroke="#FFFFFF"
            strokeOpacity="0.65"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
      )}
      {name === "arrow" && (
        <g>
          <path
            d="M6 40l10-11 7 6 12-15"
            stroke={`url(#${gid})`}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path d="M28 17h14v14z" fill={`url(#${gid})`} />
          <path
            d="M8 38.5l8-9"
            stroke="#FFFFFF"
            strokeOpacity="0.55"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      )}
      {name === "medal" && (
        <g>
          <path d="M17 28l-4 16 11-6 11 6-4-16" fill={`url(#${gid}-b)`} />
          <circle cx="24" cy="18" r="14" fill={`url(#${gid})`} />
          <circle
            cx="24"
            cy="18"
            r="10.5"
            fill="none"
            stroke={deep}
            strokeOpacity="0.5"
            strokeWidth="1.6"
          />
          <path
            d="M24 10.5l2.3 4.7 5.2.8-3.8 3.7.9 5.2-4.6-2.4-4.6 2.4.9-5.2-3.8-3.7 5.2-.8 2.3-4.7z"
            fill={deep}
            fillOpacity="0.85"
          />
          <path
            d="M14.5 12.5a12 12 0 016-5.8"
            stroke="#FFFFFF"
            strokeOpacity="0.7"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      )}
    </svg>
  );
}

/** The back face of a panel — the gradient STEP card. Also used standalone in
    the static fallback. */
function StepCard({
  s,
  className,
  style,
}: {
  s: (typeof STEPS)[number];
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-[24px] p-7 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)] sm:p-8 ${className ?? ""}`}
      style={{ background: s.bg, ...style }}
    >
      {/* soft top-left sheen, reference-style */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 12% 0%, rgb(255 255 255 / 0.28), transparent 55%)",
        }}
      />
      <p className="relative text-xs font-bold uppercase tracking-[0.14em] text-white/85">
        {s.step}
      </p>
      <p className="relative mt-3 font-display text-5xl font-bold tracking-[-0.02em] text-white sm:text-6xl">
        {s.title}
      </p>
      <p className="relative mt-4 max-w-[24ch] text-sm leading-relaxed text-white/85 sm:text-base">
        {s.body}
      </p>
      {/* large glyph bleeding off the corner, like the reference renders */}
      <div className="absolute -bottom-5 -right-3 rotate-[8deg]">
        <StepIcon name={s.icon} glow={s.glow} deep={s.deep} />
      </div>
    </div>
  );
}

/** Overlay copy shown on the image (stage 1) and on the left slice (stage 2). */
function ImageCopy() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-center p-8 sm:p-12">
      <p className="max-w-[14ch] font-display text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-4xl xl:text-5xl">
        Three steps
        <br />
        Visible rules
        <br />
        Clear from day one
      </p>
      <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-white/70 sm:text-base">
        Pass the evaluation, get funded, and keep up to 80% of the profit you
        generate.
      </p>
    </div>
  );
}

/** One animated panel: the image slice crossfades and lifts away while the
    STEP card rises in — staggered per card, then the trio tilts. (2D only:
    3D flips get flattened by ancestor opacity/overflow and ghost both faces.) */
function Panel({
  i,
  progress,
}: {
  i: number;
  progress: MotionValue<number>;
}) {
  // TRANSFORM-ONLY: the solid card slides up INSIDE the clipped panel and
  // covers the slice. Zero opacity animation → nothing can ever ghost or
  // show through, whatever the scroll state.
  const t0 = 0.42 + i * 0.13;
  const cardY = useTransform(progress, [t0, t0 + 0.18], ["112%", "0%"]);
  // seamless single image at rest: radius 0 + gap 0, rounds as it splits
  const radius = useTransform(progress, [0.05, 0.3], [0, 24]);
  const rotateZ = useTransform(progress, [0.86, 0.98], [0, [-9, 0, 8][i]]);
  const tiltY = useTransform(progress, [0.86, 0.98], [0, [10, -6, 14][i]]);

  return (
    <motion.div
      className="relative h-full flex-1 overflow-hidden"
      style={{ rotateZ, y: tiltY, borderRadius: radius }}
    >
      {/* image slice — static, gets covered by the rising card */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${asset("/how-hero.jpg")})`,
          backgroundSize: "300% 100%",
          backgroundPosition: `${i * 50}% center`,
        }}
      >
        {i === 0 && (
          <>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-[var(--bg-base)]/85 via-[var(--bg-base)]/40 to-transparent"
            />
            <ImageCopy />
          </>
        )}
      </div>
      {/* step card — solid, slides up over the slice */}
      <motion.div className="absolute inset-0" style={{ y: cardY }}>
        <StepCard s={STEPS[i]} />
      </motion.div>
    </motion.div>
  );
}

function Header() {
  return (
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
      <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-5xl">
        How it works
      </h2>
      <div className="max-w-md">
        <p className="text-[var(--text-secondary)] sm:text-lg">
          Choose your account size. Read every rule before you start. One-time
          fee, no subscription.
        </p>
        <CtaButton href="#challenges" variant="secondary" className="mt-5">
          Discover
          <span aria-hidden>→</span>
        </CtaButton>
      </div>
    </div>
  );
}

export function HowItWorksScroll() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // stage 1 → 2: the seamless slices (gap 0, radius 0) split apart on scroll
  const gap = useTransform(scrollYProgress, [0.08, 0.38], [0, 28]);

  // Static version — mobile always; all breakpoints under reduced motion.
  const staticBlock = (
    <Container className="py-20 sm:py-24">
      <Header />
      <div className="relative mt-10 overflow-hidden rounded-[24px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/how-hero.jpg")}
          alt=""
          width={1800}
          height={780}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover sm:aspect-[21/9]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[var(--bg-base)]/85 via-[var(--bg-base)]/35 to-transparent"
        />
        <ImageCopy />
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.step} className="aspect-[4/5] sm:aspect-[3/4]">
            <StepCard s={s} />
          </div>
        ))}
      </div>
    </Container>
  );

  if (reduce) {
    return <section id="how-it-works">{staticBlock}</section>;
  }

  return (
    <section id="how-it-works" ref={ref}>
      {/* mobile / tablet — static */}
      <div className="lg:hidden">{staticBlock}</div>

      {/* desktop — pinned scroll sequence (~3 viewports of scroll) */}
      <div className="hidden lg:block">
        <div className="h-[320vh]">
          <div className="sticky top-20 flex h-[calc(100vh-5rem)] flex-col justify-center">
            <Container className="flex w-full flex-col">
              <Header />
              <div className="relative mt-8 h-[54vh] min-h-[380px]">
                {/* seamless at rest; splits, then cards slide up per panel */}
                <motion.div className="absolute inset-0 flex" style={{ gap }}>
                  {STEPS.map((_, i) => (
                    <Panel key={i} i={i} progress={scrollYProgress} />
                  ))}
                </motion.div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
}
