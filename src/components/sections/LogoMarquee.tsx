"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/animations/FadeIn";
import { projectLogos } from "@/config/project-logos";

export function LogoMarquee({
  namespace = "Home.logos",
}: {
  namespace?: string;
}) {
  const t = useTranslations(namespace);
  const track = [...projectLogos, ...projectLogos];

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
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
          <FadeIn delay={0.2}>
            <p className="mt-4 text-balance text-muted-foreground">
              {t("subtitle")}
            </p>
          </FadeIn>
        </div>
      </div>

      <FadeIn delay={0.25}>
        <div className="glass group relative mt-10 overflow-hidden rounded-3xl border border-white/10 py-10">
          <div className="mask-fade-x flex w-full overflow-hidden">
            <div className="animate-marquee flex shrink-0 items-center gap-14 pr-14 group-hover:[animation-play-state:paused]">
              {track.map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  className="relative h-10 w-28 shrink-0 opacity-60 transition-all duration-300 hover:opacity-100 hover:drop-shadow-[0_0_18px_oklch(0.78_0.16_220/0.5)] sm:h-12 sm:w-32"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    sizes="140px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
