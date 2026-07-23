"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Brand intro/preloader — on load, "Game of Forex" fills white left→right
 * (with "by Waqas Hamad" smaller), then lifts away to reveal the hero.
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
            <span className="relative inline-block font-display font-semibold tracking-tight text-[clamp(3rem,11vw,10rem)] leading-none">
              {/* base (dim) */}
              <span className="text-white/12">Game of Forex</span>
              {/* white fill overlay */}
              <motion.span
                aria-hidden
                className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-white"
                initial={{ width: reduce ? "100%" : "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: reduce ? 0 : 1.5, ease: EASE }}
              >
                Game of Forex
              </motion.span>
            </span>
            <motion.p
              className="mt-4 text-base tracking-wide text-white/45 sm:text-xl"
              initial={{ opacity: reduce ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: reduce ? 0 : 1.1 }}
            >
              by Waqas Hamad
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
