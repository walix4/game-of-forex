// Single source of truth for typefaces.
// Type is PROVISIONAL (CLAUDE.md §3, Milestone 02 — not client-approved).
// Every face is routed through next/font and exposed as a CSS variable, so
// swapping a face later is a one-file change. Components must consume the
// `font-display` / `font-body` / `font-mono` utilities, never a hardcoded family.
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";

// Raw faces are exposed as `--ff-*` to avoid clashing with Tailwind's
// `--font-*` theme tokens (mapped in globals.css @theme).
export const fontDisplay = Archivo({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--ff-display",
  display: "swap",
});

export const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ff-body",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ff-mono",
  display: "swap",
});

export const fontVars = `${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`;
