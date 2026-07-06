"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { cn } from "@/lib/utils";

export function FloatingSupportWidget() {
  const t = useTranslations("FloatingSupport");
  const [open, setOpen] = useState(false);
  const hasWhatsapp = !!siteConfig.whatsapp;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="glow-border glass w-72 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 text-primary">
                <WhatsAppIcon className="size-4.5" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                {t("expandedTitle")}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label={t("close")}
              className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("expandedText")}
          </p>
          <a
            href={hasWhatsapp ? siteConfig.whatsapp : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!hasWhatsapp}
            className={cn(
              "glow-cyan mt-4 flex h-10 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:bg-primary/90",
              !hasWhatsapp && "pointer-events-none opacity-50",
            )}
          >
            <WhatsAppIcon className="size-4" />
            {t("openWhatsapp")}
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("ariaLabel")}
        className="glow-border glass flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-foreground shadow-lg transition-transform hover:scale-105"
      >
        <span className="relative flex size-5 shrink-0 items-center justify-center">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/50" />
          <WhatsAppIcon className="relative size-5 text-primary" />
        </span>
        <span className="hidden sm:inline">{t("label")}</span>
      </button>
    </div>
  );
}
