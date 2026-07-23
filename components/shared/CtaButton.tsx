import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

// primary  = mint fill, dark text (--text-on-accent). ONE per viewport (§3 rule 1).
// secondary = outline/ghost on the frame. Everything that isn't the single primary.
const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] " +
  "px-6 h-12 text-[0.95rem] font-medium tracking-tight " +
  "transition-[background-color,border-color,color,transform] " +
  "duration-[var(--dur-fast)] ease-[var(--ease-out)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-[var(--focus-ring)] active:translate-y-px " +
  "motion-reduce:transition-none motion-reduce:active:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--text-on-accent)] " +
    "hover:bg-[var(--accent-hover)] active:bg-[var(--accent-active)]",
  secondary:
    "border border-[var(--border-default)] text-[var(--text-primary)] " +
    "bg-transparent hover:border-[var(--border-accent)] " +
    "hover:text-[var(--accent-hover)]",
};

type Props = ComponentProps<typeof Link> & { variant?: Variant };

export function CtaButton({ variant = "primary", className = "", ...props }: Props) {
  return (
    <Link
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
