"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { EnquiryForm } from "./EnquiryForm";

type Topic = "challenge" | "funded-account" | "general";

/**
 * Client-side topic resolution so /contact stays statically exportable
 * (server `searchParams` is unavailable with `output: "export"`).
 * useSearchParams requires a Suspense boundary at build time.
 */
function Resolved() {
  const sp = useSearchParams();
  const topic: Topic =
    sp.get("topic") === "funded-account"
      ? "funded-account"
      : sp.get("buy") !== null || sp.get("topic") === "challenge"
        ? "challenge"
        : "general";
  return <EnquiryForm defaultTopic={topic} />;
}

export function EnquiryFormWithTopic() {
  return (
    <Suspense fallback={<EnquiryForm defaultTopic="general" />}>
      <Resolved />
    </Suspense>
  );
}
