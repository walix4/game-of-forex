"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Brand intro/preloader — on load, "EZE Funded" fills white left→right
 * (with a short tagline smaller), then lifts away to reveal the hero.
 * Plays once per full page load. Respects reduced motion.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

export function Intro() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduce ? 200 : 2300);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[var(--bg-base)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="px-6 text-center">
            {/* main text — blue-gradient fill left→right */}
            {/* clamp min 2.5rem so "EZE Funded" fits 320–360px viewports */}
            <span className="relative inline-block font-display font-semibold tracking-tight text-[clamp(2.5rem,10vw,8rem)] leading-none">
              <span className="text-white/12">EZE Funded</span>
              <motion.span
                aria-hidden
                className="text-gradient absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap"
                initial={{ width: reduce ? "100%" : "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: reduce ? 0 : 1.5, ease: EASE }}
              >
                EZE Funded
              </motion.span>
            </span>
            {/* subheading */}
            <motion.p
              className="mt-4 font-display text-lg tracking-wide text-white/55 sm:text-2xl"
              initial={{ opacity: reduce ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: reduce ? 0 : 1.05 }}
            >
              Trade our capital.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
