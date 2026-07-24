"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { CtaButton } from "@/components/shared/CtaButton";
import { StarField } from "@/components/home/StarField";
import { SocialProof } from "@/components/shared/SocialProof";
import { RULES } from "@/lib/challenges";

/**
 * Prop-firm hero (CLAUDE.md §0 + §5.1) — centered "space" layout. The trading
 * terminal is hidden for now (client request). Rotating badge + rotating
 * headline pitch the offer.
 *
 * ⚠️ COMPLIANCE (§4): the badge's "world's first" line and the "10K+ members"
 * count are UNVERIFIED — marked NEEDS LEGAL SIGN-OFF / NEEDS CLIENT INPUT below.
 * Only page-load sequence lives here; <h1> is transform-only (LCP-safe, §3).
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.52, ease: EASE } },
};
const headline: Variants = {
  hidden: { y: 18 },
  show: { y: 0, transition: { duration: 0.6, ease: EASE } },
};
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

// NEEDS LEGAL SIGN-OFF — "world's first" is an unverifiable superlative (§4).
const BADGE_PHRASES = [
  "Real funded accounts · A-Book",
  "The world's first real-funded prop firm",
  "Founded by Waqas Ahmed",
];

const HEAD_PHRASES = [
  "real capital.",
  "our capital.",
  "up to $200K.",
  "80% payouts.",
  "no time limit.",
];

export function HeroSection() {
  const reduce = useReducedMotion();
  const initial = reduce ? "show" : "hidden";

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[88vh] items-center overflow-hidden px-6 py-20"
    >
      {/* space background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-[8%] h-[680px] w-[1100px] -translate-x-1/2 rounded-full opacity-80 blur-[110px]"
          style={{
            background:
              "radial-gradient(closest-side, rgb(59 99 255 / 0.34), rgb(124 92 255 / 0.16) 55%, transparent 80%)",
          }}
        />
        <StarField />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.85fr]">
        {/* content */}
        <motion.div
          variants={container}
          initial={initial}
          animate="show"
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          {/* rotating GREEN glass badge */}
          <motion.p
            variants={rise}
            className="relative mb-8 inline-flex items-center gap-2.5 rounded-full border border-[rgb(130_220_124/0.4)] bg-[rgb(130_220_124/0.16)] px-4 py-2 text-xs font-medium tracking-wide text-[#DDF9D9] shadow-[0_0_44px_-8px_rgb(130_220_124/0.6)] backdrop-blur-xl"
          >
            <span
              aria-hidden
              className="size-1.5 shrink-0 rounded-full bg-[#82DC7C] shadow-[0_0_10px_2px_rgb(130_220_124/0.7)]"
            />
            <Rotator
              phrases={BADGE_PHRASES}
              reduce={reduce}
              cursor="#82DC7C"
              srLabel="Real funded accounts, A-Book"
            />
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={headline}
            className="font-display text-4xl font-semibold leading-[1.03] tracking-[-0.02em] text-[var(--text-primary)] sm:text-5xl lg:text-[3.6rem]"
          >
            Get funded to trade
            <br />
            <Rotator
              phrases={HEAD_PHRASES}
              reduce={reduce}
              className="text-gradient"
              srLabel="real capital."
            />
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          >
            Pass a two-phase evaluation, trade real funded capital, and keep up to{" "}
            {RULES.profitSplit}% of the profit.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <CtaButton href="/challenges" variant="primary">
              Buy challenge
            </CtaButton>
            <CtaButton href="/#how-it-works" variant="secondary">
              How it works
            </CtaButton>
          </motion.div>

          {/* community proof — avatar stack + rating card */}
          <motion.div variants={rise} className="mt-10">
            <SocialProof className="lg:justify-start" />
          </motion.div>

          <motion.p variants={rise} className="mt-8 text-xs text-[var(--text-muted)]">
            Trading carries risk. Challenges evaluate skill — not an investment.
          </motion.p>
        </motion.div>

        {/* founder figure — own column, right side */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          className="relative hidden justify-self-center lg:block"
        >
          <div
            aria-hidden
            className="absolute inset-x-[-18%] bottom-[-6%] top-[6%] -z-10 rounded-full opacity-70 blur-3xl"
            style={{ background: "var(--glow-accent)" }}
          />
          <div className="anim-float-slow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/waqas-hero.png"
              alt="Waqas Ahmed, founder of Game of Forex"
              className="h-auto w-[330px] max-w-full [mask-image:linear-gradient(to_bottom,#000_86%,transparent)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Typewriter rotation: erases the phrase, then retypes the next. A grid of
   invisible sizers reserves the widest box so nothing reflows while typing. */
function useTypewriter(phrases: string[], reduce: boolean | null) {
  const [text, setText] = useState(phrases[0]);
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (reduce || phrases.length <= 1) return;
    const cur = phrases[i];
    let t: ReturnType<typeof setTimeout>;
    if (!del && text === cur) {
      t = setTimeout(() => setDel(true), 1600); // hold, then erase
    } else if (del && text === "") {
      setDel(false);
      setI((v) => (v + 1) % phrases.length);
    } else {
      t = setTimeout(
        () => setText(cur.substring(0, del ? text.length - 1 : text.length + 1)),
        del ? 30 : 58,
      );
    }
    return () => clearTimeout(t);
  }, [text, del, i, phrases, reduce]);

  return reduce ? phrases[0] : text;
}

function Rotator({
  phrases,
  reduce,
  className = "",
  srLabel,
  cursor = "var(--accent)",
}: {
  phrases: string[];
  reduce: boolean | null;
  className?: string;
  srLabel?: string;
  cursor?: string;
}) {
  const text = useTypewriter(phrases, reduce);
  return (
    <span className="relative inline-grid justify-items-center align-bottom">
      <span aria-hidden className="contents">
        {phrases.map((p, k) => (
          <span
            key={k}
            className="invisible whitespace-nowrap"
            style={{ gridArea: "1 / 1" }}
          >
            <span className={className}>{p}</span>
            <span className="inline-block w-[0.4em]" />
          </span>
        ))}
        <span
          className="flex items-center justify-center whitespace-nowrap"
          style={{ gridArea: "1 / 1" }}
        >
          <span className={className}>{text}</span>
          <span
            className={reduce ? "" : "anim-blink"}
            style={{
              display: "inline-block",
              width: "0.07em",
              height: "0.86em",
              marginLeft: "0.08em",
              background: cursor,
              borderRadius: "1px",
            }}
          />
        </span>
      </span>
      {srLabel && <span className="sr-only">{srLabel}</span>}
    </span>
  );
}

/* ----- social round buttons ----- */
const SOCIALS: { name: string; href: string; icon: ReactNode }[] = [
  {
    name: "WhatsApp",
    href: "#",
    icon: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.36.101 11.945c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.96 11.96 0 005.71 1.454h.006c6.585 0 11.946-5.36 11.949-11.945a11.9 11.9 0 00-3.48-8.418" />
    ),
  },
  {
    name: "Discord",
    href: "#",
    icon: (
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    ),
  },
];
