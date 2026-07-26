"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email address."),
  topic: z.enum(["challenge", "funded-account", "general"]),
  message: z.string().min(10, "A sentence or two helps us point you right."),
  consent: z.literal(true, {
    // zod v4 custom message
    message: "Please confirm you understand the risk note.",
  }),
});

type Values = z.infer<typeof schema>;

const field =
  "w-full rounded-[var(--radius)] border border-[var(--border-default)] bg-white/[0.04] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] transition-colors duration-[var(--dur-fast)] hover:border-[var(--border-strong)] focus:border-[var(--border-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";
const labelCls = "mb-2 block text-sm font-medium text-[var(--text-secondary)]";
const errCls = "mt-1.5 text-xs text-[var(--market-down)]";

export function EnquiryForm({
  defaultTopic = "general",
}: {
  defaultTopic?: Values["topic"];
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { topic: defaultTopic },
  });

  async function onSubmit(values: Values) {
    // NEEDS BACKEND — POST /api/enquiry -> Resend (open item, not built in the
    // design pass). Simulated here so the success state can be designed.
    await new Promise((r) => setTimeout(r, 600));
    // eslint-disable-next-line no-console
    console.log("[enquiry:stub]", values);
  }

  if (isSubmitSuccessful) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-lg)] glass-card p-8 text-center"
      >
        <div className="mx-auto grid size-11 place-items-center rounded-full bg-[var(--success-bg)] text-[var(--market-up)]">
          ✓
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-[var(--text-primary)]">
          Thanks — enquiry received.
        </h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          We&apos;ll reply by email. (Delivery is not yet wired — this is a
          design preview of the confirmation.)
        </p>
        <button
          type="button"
          onClick={() => reset({ topic: defaultTopic })}
          className="mt-6 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className={labelCls}>
          Name
        </label>
        <input id="name" className={field} autoComplete="name" {...register("name")} />
        {errors.name && <p className={errCls}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>
          Email
        </label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className={field}
          {...register("email")}
        />
        {errors.email && <p className={errCls}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="topic" className={labelCls}>
          What&apos;s this about?
        </label>
        <div className="relative">
          <select
            id="topic"
            className={cn(field, "appearance-none pr-10")}
            {...register("topic")}
          >
            <option value="challenge">Buying a challenge</option>
            <option value="funded-account">Funded accounts</option>
            <option value="general">Something else</option>
          </select>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]"
          >
            <path
              d="m4 6 4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Message
        </label>
        <textarea id="message" rows={5} className={field} {...register("message")} />
        {errors.message && <p className={errCls}>{errors.message.message}</p>}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
          <input
            type="checkbox"
            className="mt-0.5 size-4 accent-[var(--accent)]"
            {...register("consent")}
          />
          <span>
            I understand Game of Forex offers education only — it is not a broker,
            is not regulated, and trading carries real risk.
          </span>
        </label>
        {errors.consent && <p className={errCls}>{errors.consent.message}</p>}
      </div>

      {/* One accent primary in this viewport (§3 rule 1). */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-[var(--accent)] px-6 font-medium text-[var(--text-on-accent)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--accent-hover)] active:bg-[var(--accent-active)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
