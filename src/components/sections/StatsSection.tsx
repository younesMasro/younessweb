"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { Boxes, Briefcase, Layers, LayoutGrid } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

const stats = [
  { key: "years", icon: Layers, value: 9 },
  { key: "projects", icon: Boxes, value: 60 },
  { key: "brands", icon: Briefcase, value: 30 },
  { key: "types", icon: LayoutGrid, value: 6 },
] as const;

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1.4, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}+`;
    });
  }, [spring]);

  return <span ref={ref}>0+</span>;
}

export function StatsSection() {
  const t = useTranslations("Home.stats");

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="glow-border glass rounded-3xl px-6 py-12 sm:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {t("badge")}
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-4 text-balance text-2xl font-semibold leading-tight sm:text-3xl">
                {t("title")}
              </h2>
            </FadeIn>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-4">
            {stats.map(({ key, icon: Icon, value }, i) => (
              <FadeIn key={key} delay={0.08 * i}>
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    <Counter value={value} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(`items.${key}`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
