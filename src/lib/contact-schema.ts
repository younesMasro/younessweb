import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(2).max(100),
  phone: z.string().min(6).max(30),
  email: z.string().email().optional().or(z.literal("")),
  websiteType: z.string().min(1),
  packageInterest: z.string().optional().or(z.literal("")),
  domainStatus: z.string().optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
  // Honeypot field: must stay empty. Bots that auto-fill every field trip it.
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
