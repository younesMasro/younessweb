"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { reviews } from "@/config/reviews";

export function ReviewsSection() {
  const t = useTranslations("ReviewsPage");

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-primary" />
              {t("realFeedback")}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-5 text-balance text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
              {t("hero.title")}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-5 text-balance text-muted-foreground">
              {t("hero.subtitle")}
            </p>
          </FadeIn>
        </div>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {reviews.map((review, i) => (
            <FadeIn
              key={review.id}
              delay={0.04 * i}
              className="mb-5 break-inside-avoid"
            >
              <ReviewCard review={review} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
