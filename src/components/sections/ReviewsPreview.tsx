"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { reviews } from "@/config/reviews";

export function ReviewsPreview({
  namespace = "Home.reviewsPreview",
}: {
  namespace?: string;
}) {
  const t = useTranslations(namespace);
  const featured = reviews.filter((r) => r.featured).slice(0, 6);

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-primary" />
              {t("realFeedback")}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-5 text-balance text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
              {t("title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-5 text-balance text-muted-foreground">
              {t("subtitle")}
            </p>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((review, i) => (
            <FadeIn key={review.id} delay={0.08 * i}>
              <ReviewCard review={review} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-10 text-center">
            <Button
              asChild
              variant="outline"
              className="glass group rounded-full border-white/15 hover:bg-white/10"
            >
              <Link href="/reviews">
                {t("cta")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
