import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mail, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { InstagramIcon } from "@/components/shared/InstagramIcon";

export function Footer() {
  const t = useTranslations("Nav");
  const tf = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-background/60">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src={siteConfig.logo.white}
                alt={siteConfig.name}
                width={150}
                height={34}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {tf("tagline")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
              {tf("navTitle")}
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
              {tf("contactTitle")}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="size-4" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="size-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <InstagramIcon className="size-4" />
                  {siteConfig.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. {tf("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
