"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function ThankYouContent() {
  const t = useTranslations("ThankYouPage");

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden py-28">
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

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <FadeIn>
          <div className="glow-border glass mx-auto flex size-16 items-center justify-center rounded-full">
            <CheckCircle2 className="size-8 text-primary" />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="mt-8 text-balance text-3xl font-semibold leading-tight sm:text-4xl">
            {t("title")}
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mx-auto mt-5 max-w-xl text-balance text-muted-foreground">
            {t("text")}
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="glow-cyan h-11 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/portfolio">{t("viewProjectsCta")}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-white/15 hover:bg-white/10"
            >
              <Link href="/">{t("backHomeCta")}</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
