"use client";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { ContactForm } from "@/components/forms/ContactForm";

const trustKeys = [
  "modernDesign",
  "mobileFirst",
  "clearPricing",
  "supportAfterLaunch",
  "tutorialVideos",
] as const;

export function ContactLandingHero() {
  const t = useTranslations("ContactPage.hero");

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-glow-cyan/25 blur-[120px]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-1/4 h-72 w-72 rounded-full bg-glow-purple/25 blur-[120px]"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative mx-auto grid max-w-6xl items-start gap-12 px-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="text-center lg:text-left">
          <FadeIn>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-foreground/80">
              {t("badge")}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-6 text-balance text-3xl font-semibold leading-tight sm:text-4xl">
              {t("title")}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-balance text-muted-foreground lg:mx-0">
              {t("subheadline")}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <ul className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-x-5 gap-y-3 lg:mx-0 lg:justify-start">
              {trustKeys.map((key) => (
                <li
                  key={key}
                  className="flex items-center gap-2 text-sm text-foreground/85"
                >
                  <Check className="size-4 shrink-0 text-primary" />
                  {t(`trustPoints.${key}`)}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <FadeIn delay={0.25} direction="left">
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </FadeIn>
      </div>
    </section>
  );
}
