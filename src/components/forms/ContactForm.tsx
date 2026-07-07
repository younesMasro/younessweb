"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useRouter } from "@/i18n/navigation";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";

const websiteTypeKeys = [
  "business",
  "ecommerce",
  "landing",
  "portfolio",
  "booking",
  "redesign",
  "other",
] as const;

const packageKeys = ["essentiel", "premium", "notSure"] as const;
const domainStatusKeys = ["yes", "no", "notSure"] as const;

export function ContactForm() {
  const t = useTranslations("ContactPage.form");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState(false);

  const preselectedPackage = searchParams.get("package");
  const defaultPackage =
    preselectedPackage === "essentiel" || preselectedPackage === "premium"
      ? preselectedPackage
      : "";

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      websiteType: "",
      packageInterest: defaultPackage,
      domainStatus: "",
      message: "",
      company_website: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push("/thank-you");
    } catch {
      setError(true);
    }
  };

  return (
    <div id="contact-form">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="glow-border glass space-y-5 rounded-3xl p-6 sm:p-8"
      >
        {/* Honeypot — hidden from real users, bots tend to fill every field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company_website">Company Website</label>
          <input
            id="company_website"
            tabIndex={-1}
            autoComplete="off"
            {...register("company_website")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">{t("name")}</Label>
          <Input
            id="fullName"
            placeholder={t("namePlaceholder")}
            {...register("fullName")}
            aria-invalid={!!errors.fullName}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">{t("phone")}</Label>
            <Input
              id="phone"
              placeholder={t("phonePlaceholder")}
              {...register("phone")}
              aria-invalid={!!errors.phone}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              {...register("email")}
              aria-invalid={!!errors.email}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>{t("websiteType")}</Label>
          <Controller
            control={control}
            name="websiteType"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("websiteTypePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {websiteTypeKeys.map((key) => (
                    <SelectItem key={key} value={key}>
                      {t(`websiteTypes.${key}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label>{t("packageInterest")}</Label>
            <Link
              href="/pricing"
              className="text-xs text-primary underline-offset-4 hover:underline"
            >
              {t("comparePackagesLink")}
            </Link>
          </div>
          <Controller
            control={control}
            name="packageInterest"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("packageInterestPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {packageKeys.map((key) => (
                    <SelectItem key={key} value={key}>
                      {t(`packages.${key}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>{t("domainStatus")}</Label>
          <Controller
            control={control}
            name="domainStatus"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("domainStatusPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {domainStatusKeys.map((key) => (
                    <SelectItem key={key} value={key}>
                      {t(`domainStatusOptions.${key}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">{t("message")}</Label>
          <Textarea
            id="message"
            rows={4}
            placeholder={t("messagePlaceholder")}
            {...register("message")}
            aria-invalid={!!errors.message}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="glow-cyan h-12 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t("submitting")}
            </>
          ) : (
            t("submit")
          )}
        </Button>

        {error && (
          <p className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="size-4" />
            {t("error")}
          </p>
        )}
      </form>
    </div>
  );
}
