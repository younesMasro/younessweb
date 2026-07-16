import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import {
  localeFromReferer,
  sendLeadToWordPress,
  utmFromReferer,
} from "@/lib/wp-leads";

const DEFAULT_TO_EMAIL = "younes.masroure@gmail.com";

function buildEmailBody(data: Record<string, string | undefined>) {
  return [
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || "Not provided"}`,
    `Website type: ${data.websiteType}`,
    `Package interested in: ${data.packageInterest || "Not specified"}`,
    `Domain name status: ${data.domainStatus || "Not specified"}`,
    "",
    "Message:",
    data.message || "(no message)",
  ].join("\n");
}

async function sendViaSmtp(toEmail: string, subject: string, text: string, replyTo?: string) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return false;

  const nodemailer = await import("nodemailer");
  const port = Number(SMTP_PORT) || 587;
  const transport = nodemailer.default.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transport.sendMail({
    from: SMTP_FROM || SMTP_USER,
    to: toEmail,
    ...(replyTo ? { replyTo } : {}),
    subject,
    text,
  });

  return true;
}

async function sendViaResend(toEmail: string, subject: string, text: string, replyTo?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: "Youness Web <onboarding@resend.dev>",
    to: toEmail,
    ...(replyTo ? { replyTo } : {}),
    subject,
    text,
  });

  return true;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot: real visitors never fill this hidden field. Silently accept
  // to avoid tipping off bots, but never send the email.
  if (data.company_website) {
    return NextResponse.json({ success: true });
  }

  // Save the lead to the WordPress CRM ("Demandes clients"). Best-effort and
  // fire-and-forget relative to the email: a CRM outage must not cost a lead.
  const referer = request.headers.get("referer");
  const wpResult = await sendLeadToWordPress(data, {
    locale: localeFromReferer(referer),
    referer: referer || "",
    ip:
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "",
    ...utmFromReferer(referer),
  });

  const toEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
  const subject = `New website request from ${data.fullName}`;
  const text = buildEmailBody(data);
  const replyTo = data.email || undefined;

  try {
    const sent =
      (await sendViaSmtp(toEmail, subject, text, replyTo)) ||
      (await sendViaResend(toEmail, subject, text, replyTo));

    if (!sent) {
      // No SMTP_* or RESEND_API_KEY configured. Don't fail the visitor's
      // submission — log the lead so it isn't lost, and make the missing
      // configuration obvious in the server logs.
      console.error(
        "[contact] No email provider configured (missing SMTP_HOST/SMTP_USER/SMTP_PASS or RESEND_API_KEY) — lead was NOT emailed to",
        toEmail,
        JSON.stringify({ ...data, company_website: undefined }),
      );
      return NextResponse.json({
        success: true,
        emailSent: false,
        savedToCrm: wpResult.ok,
      });
    }

    return NextResponse.json({
      success: true,
      emailSent: true,
      savedToCrm: wpResult.ok,
    });
  } catch (error) {
    console.error("[contact] Failed to send email:", error);

    // The email failed, but if the lead reached the CRM it is not lost —
    // don't show the visitor an error and make them submit twice.
    if (wpResult.ok) {
      return NextResponse.json({
        success: true,
        emailSent: false,
        savedToCrm: true,
      });
    }

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 502 },
    );
  }
}
