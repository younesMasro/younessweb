"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection({ namespace = "Faq" }: { namespace?: string }) {
  const t = useTranslations(namespace);
  const items = t.raw("items") as { question: string; answer: string }[];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {t("badge")}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-4 text-balance text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
              {t("title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-5 text-balance text-muted-foreground">
              {t("subtitle")}
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.25}>
          <Accordion type="single" collapsible className="mt-12 space-y-3">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass rounded-2xl border-white/10 px-5"
              >
                <AccordionTrigger className="text-left text-sm font-medium hover:no-underline sm:text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
