import type { ContactFormValues } from "@/lib/contact-schema";

/**
 * Forwards a contact-form submission to the YounessWeb Manager WordPress
 * plugin, which stores it in the "Demandes clients" table.
 *
 * This is deliberately best-effort: the visitor's submission must never fail
 * because WordPress is slow, down, or misconfigured. The email path stays the
 * source of truth for notification; this is the CRM record.
 */

type LeadContext = {
  locale?: string;
  referer?: string;
  ip?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export type WpLeadResult =
  | { ok: true; id?: number; duplicate?: boolean }
  | { ok: false; reason: "not-configured" | "http-error" | "network-error" };

const TIMEOUT_MS = 5000;

export async function sendLeadToWordPress(
  data: ContactFormValues,
  context: LeadContext = {},
): Promise<WpLeadResult> {
  const endpoint = process.env.WP_LEADS_ENDPOINT;
  const secret = process.env.WP_LEADS_SECRET;

  if (!endpoint || !secret) return { ok: false, reason: "not-configured" };

  // Don't let a hanging WordPress hold the visitor's request open.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VB-Secret": secret,
      },
      body: JSON.stringify({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || "",
        websiteType: data.websiteType,
        packageInterest: data.packageInterest || "",
        domainStatus: data.domainStatus || "",
        message: data.message || "",
        source: "website_form",
        ...context,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error(
        `[contact] WordPress rejected the lead (HTTP ${res.status}) — it was emailed but not saved to the CRM.`,
      );
      return { ok: false, reason: "http-error" };
    }

    const json = (await res.json().catch(() => ({}))) as {
      id?: number;
      duplicate?: boolean;
    };
    return { ok: true, id: json.id, duplicate: json.duplicate };
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    console.error(
      aborted
        ? `[contact] WordPress did not respond within ${TIMEOUT_MS}ms — lead emailed but not saved to the CRM.`
        : "[contact] Could not reach WordPress:",
      aborted ? "" : error,
    );
    return { ok: false, reason: "network-error" };
  } finally {
    clearTimeout(timeout);
  }
}

/** Extracts the locale prefix ("fr", "en", "ar") from the page URL. */
export function localeFromReferer(referer: string | null): string {
  if (!referer) return "";
  try {
    const segment = new URL(referer).pathname.split("/")[1];
    return ["en", "fr", "ar"].includes(segment) ? segment : "";
  } catch {
    return "";
  }
}

/** Reads utm_* params off the page URL the visitor submitted from. */
export function utmFromReferer(referer: string | null) {
  if (!referer) return {};
  try {
    const params = new URL(referer).searchParams;
    return {
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
    };
  } catch {
    return {};
  }
}
