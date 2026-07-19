"use client";

import { useTranslations } from "next-intl";
import { BadgeCheck, HandHeart, MessagesSquare, Sparkles, Video } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

const items = [
  { key: "freeQuote", icon: Sparkles },
  { key: "noObligation", icon: BadgeCheck },
  { key: "guidance", icon: HandHeart },
  { key: "clearSteps", icon: MessagesSquare },
  { key: "tutorials", icon: Video },
] as const;

export function TrustGuarantees() {
  const t = useTranslations("PricingPage.guarantees");

  return (
    <FadeIn delay={0.25}>
      <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-2.5">
        {items.map(({ key, icon: Icon }) => (
          <span
            key={key}
            className="glass flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-foreground/85"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary shadow-[0_0_16px_-4px_oklch(0.78_0.16_220_/_50%)]">
              <Icon className="size-3.5" />
            </span>
            {t(key)}
          </span>
        ))}
      </div>
    </FadeIn>
  );
}
