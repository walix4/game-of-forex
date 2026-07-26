"use client";

import Link from "next/link";
import { useState } from "react";
import { asset } from "@/lib/asset";

/**
 * Floating sticky "Contact Us" cutout on the RIGHT. Uses the client image at
 * `public/contact-waqas.png` (transparent cutout) with a red "Contact Us" bubble
 * + arrow drawn on top. Hidden on small screens; hides if the image is missing.
 */
export function ContactFloat() {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <Link
      href="/contact"
      aria-label="Contact us"
      className="group fixed bottom-0 right-2 z-40 hidden w-40 md:block lg:w-48"
    >
      {/* Contact Us bubble + clean curved arrow */}
      <div className="anim-float-slow pointer-events-none absolute -top-8 left-1 z-10">
        <span className="inline-block whitespace-nowrap rounded-full bg-[#E01E2B] px-5 py-2.5 text-base font-extrabold text-white shadow-[0_10px_26px_-6px_rgba(224,30,43,0.85)]">
          Contact Us
        </span>
        <svg
          viewBox="0 0 90 104"
          className="ml-7 mt-1 h-16 w-14 text-[#E01E2B]"
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M72 94 C 47 88, 25 71, 30 24" />
          <path d="M14 46 L30 18 L50 34" />
        </svg>
      </div>

      {/* person cutout */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/contact-waqas.png")}
        alt="Contact us"
        onError={() => setOk(false)}
        className="h-auto w-full drop-shadow-[0_12px_34px_rgba(0,0,0,0.55)] transition-transform duration-[var(--dur-base)] group-hover:scale-[1.03]"
      />
    </Link>
  );
}
