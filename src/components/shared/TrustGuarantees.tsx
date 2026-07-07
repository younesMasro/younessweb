"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/animations/FadeIn";

const items = ["freeQuote", "noObligation", "guidance", "clearSteps", "tutorials"] as const;

export function TrustGuarantees() {
  const t = useTranslations("PricingPage.guarantees");

  return (
    <FadeIn delay={0.25}>
      <div className="glass mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl px-6 py-5 text-sm">
        {items.map((key) => (
          <span key={key} className="flex items-center gap-2 text-foreground/85">
            <span className="text-primary">✅</span>
            {t(key)}
          </span>
        ))}
      </div>
    </FadeIn>
  );
}
