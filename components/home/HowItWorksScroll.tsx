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

const STEPS = [
  {
    step: "Step 1",
    title: "Trade",
    body: "Start the challenge. Follow the rules. Hit the target.",
    // brushed silver
    bg: "linear-gradient(160deg, #EDEFF4 0%, #C2C7D2 45%, #8F96A6 100%)",
    fg: "#14161C",
    sub: "rgb(20 22 28 / 0.72)",
    icon: "candles",
  },
  {
    step: "Step 2",
    title: "Pass",
    body: "Clear both phases. Get your funded account.",
    // accent blue
    bg: "linear-gradient(160deg, var(--color-blue-300) 0%, var(--color-blue-500) 55%, var(--color-blue-800) 100%)",
    fg: "#FFFFFF",
    sub: "rgb(255 255 255 / 0.8)",
    icon: "arrow",
  },
  {
    step: "Step 3",
    title: "Get paid",
    body: "Request your split of the profit you generate.",
    // gold (matches the selected-card treatment)
    bg: "linear-gradient(160deg, var(--gold-300) 0%, var(--gold-500) 55%, var(--gold-600) 100%)",
    fg: "#221703",
    sub: "rgb(34 23 3 / 0.72)",
    icon: "medal",
  },
] as const;

function StepIcon({ name, color }: { name: string; color: string }) {
  const stroke = {
    stroke: color,
    strokeWidth: 2.2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
  } as const;
  return (
    <svg
      viewBox="0 0 48 48"
      className="size-24 opacity-90 drop-shadow-[0_10px_18px_rgb(0_0_0/0.35)] sm:size-28"
      aria-hidden
    >
      {name === "candles" && (
        <>
          <path d="M12 8v32M24 4v40M36 12v28" {...stroke} strokeWidth={2} opacity={0.55} />
          <rect x="7" y="18" width="10" height="14" rx="2.5" fill={color} />
          <rect x="19" y="12" width="10" height="20" rx="2.5" fill={color} opacity={0.85} />
          <rect x="31" y="20" width="10" height="16" rx="2.5" fill={color} opacity={0.7} />
        </>
      )}
      {name === "arrow" && (
        <path
          d="M8 38l9-10 7 6 9-12M33 20h8v8"
          {...stroke}
          strokeWidth={4.5}
        />
      )}
      {name === "medal" && (
        <>
          <circle cx="24" cy="20" r="12" {...stroke} strokeWidth={3.5} />
          <path
            d="M24 14.5l1.8 3.7 4.1.6-3 2.9.7 4-3.6-1.9-3.6 1.9.7-4-3-2.9 4.1-.6 1.8-3.7z"
            fill={color}
          />
          <path d="M18 30l-3 12 9-5 9 5-3-12" {...stroke} strokeWidth={3.5} />
        </>
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
      className={`flex h-full w-full flex-col rounded-[24px] p-7 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)] sm:p-8 ${className ?? ""}`}
      style={{ background: s.bg, ...style }}
    >
      <p
        className="text-xs font-bold uppercase tracking-[0.14em]"
        style={{ color: s.sub }}
      >
        {s.step}
      </p>
      <p
        className="mt-3 font-display text-4xl font-bold tracking-[-0.02em] sm:text-5xl"
        style={{ color: s.fg }}
      >
        {s.title}
      </p>
      <p
        className="mt-4 max-w-[26ch] text-sm leading-relaxed sm:text-base"
        style={{ color: s.sub }}
      >
        {s.body}
      </p>
      <div className="mt-auto self-end">
        <StepIcon name={s.icon} color={s.fg} />
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
  const t0 = 0.44 + i * 0.09;
  const sliceOpacity = useTransform(progress, [t0, t0 + 0.16], [1, 0]);
  const sliceY = useTransform(progress, [t0, t0 + 0.16], [0, -28]);
  const cardOpacity = useTransform(progress, [t0 + 0.03, t0 + 0.19], [0, 1]);
  const cardY = useTransform(progress, [t0 + 0.03, t0 + 0.19], [42, 0]);
  const cardScale = useTransform(progress, [t0 + 0.03, t0 + 0.19], [0.93, 1]);
  const rotateZ = useTransform(progress, [0.8, 0.97], [0, [-9, 0, 8][i]]);
  const tiltY = useTransform(progress, [0.8, 0.97], [0, [10, -6, 14][i]]);

  return (
    <motion.div
      className="relative h-full flex-1"
      style={{ rotateZ, y: tiltY }}
    >
      {/* image slice */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[24px]"
        style={{
          opacity: sliceOpacity,
          y: sliceY,
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
      </motion.div>
      {/* step card */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
      >
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

  // stage 1 → 2: the single image crossfades into the three slices
  const heroOpacity = useTransform(scrollYProgress, [0.24, 0.34], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.985]);
  const panelsOpacity = useTransform(scrollYProgress, [0.24, 0.34], [0, 1]);
  const gap = useTransform(scrollYProgress, [0.26, 0.5], [8, 28]);

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
                {/* stage 1 — one full-width image */}
                <motion.div
                  className="absolute inset-0 overflow-hidden rounded-[24px]"
                  style={{
                    opacity: heroOpacity,
                    scale: heroScale,
                    backgroundImage: `url(${asset("/how-hero.jpg")})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-r from-[var(--bg-base)]/85 via-[var(--bg-base)]/35 to-transparent"
                  />
                  <ImageCopy />
                </motion.div>

                {/* stage 2+3 — three slices that flip into step cards */}
                <motion.div
                  className="absolute inset-0 flex"
                  style={{ opacity: panelsOpacity, gap }}
                >
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
