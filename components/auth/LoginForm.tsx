"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * MOCK login (design-only, CLAUDE.md §0). No real authentication — submitting
 * just routes to the dashboard preview. Do NOT wire real credentials here.
 */
export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const field =
    "w-full rounded-[var(--radius)] border border-[var(--border-default)] bg-[var(--bg-inset)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] transition-colors focus:border-[var(--border-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        router.push("/dashboard");
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
          Email
        </label>
        <input id="email" type="email" autoComplete="email" placeholder="you@email.com" className={field} required />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-[var(--text-secondary)]">
            Password
          </label>
          <span className="text-xs text-[var(--text-muted)]">Forgot?</span>
        </div>
        <input id="password" type="password" autoComplete="current-password" placeholder="••••••••" className={field} required />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-12 w-full items-center justify-center rounded-[var(--radius)] bg-[var(--accent)] font-medium text-[var(--text-on-accent)] transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Log in"}
      </button>

      <p className="text-center text-xs text-[var(--text-muted)]">
        Design preview — no real account or authentication.
      </p>

      <p className="pt-2 text-center text-sm text-[var(--text-secondary)]">
        No account yet?{" "}
        <Link href="/challenges" className="font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]">
          Buy a challenge
        </Link>
      </p>
    </form>
  );
}
