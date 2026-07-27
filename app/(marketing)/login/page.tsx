import type { Metadata } from "next";
import { Logo } from "@/components/shared/Logo";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your EZE Funded dashboard.",
};

export default function LoginPage() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center justify-center overflow-hidden px-6 py-20">
      <div className="glow-hero pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="w-full max-w-md">
        <div className="ring-accent glass rounded-[var(--radius-xl)] p-8">
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center">
              <Logo />
            </div>
            <h1 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Log in to track your challenges and funded accounts.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
