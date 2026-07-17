import { CheckCircle2, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { CityData } from "@/config/cities";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { FaqSection } from "@/components/shared/FaqSection";
import { PageCtaBanner } from "@/components/shared/PageCtaBanner";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function CityLandingContent({ city }: { city: CityData }) {
  const canonical = `${siteConfig.url}/creation-site-web-${city.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `Youness Web — Création de site web à ${city.name}`,
    description: city.intro,
    url: canonical,
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressCountry: "MA",
    },
    priceRange: "2500 MAD - 10000+ MAD",
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Accueil", url: siteConfig.url },
    { name: `Création site web ${city.name}`, url: canonical },
  ]);

  const faqItems = [
    {
      question: `Combien coûte la création d'un site web à ${city.name} ?`,
      answer:
        "Nos forfaits démarrent à 2 500 MAD pour un site vitrine professionnel (nom de domaine et hébergement inclus pendant 1 an) et à 5 000 MAD pour un site sur-mesure premium avec fonctionnalités avancées. Le prix final dépend du nombre de pages et des fonctionnalités souhaitées (e-commerce, réservation, paiement en ligne...).",
    },
    {
      question: `Combien de temps pour créer un site web à ${city.name} ?`,
      answer:
        "Comptez généralement entre 7 et 14 jours ouvrés pour un site vitrine, et 2 à 4 semaines pour un site e-commerce ou sur-mesure, selon la complexité et la rapidité à nous fournir vos contenus (textes, images, logo).",
    },
    {
      question: `Travaillez-vous à distance avec des clients de ${city.name} ?`,
      answer:
        "Oui. L'ensemble du projet — échanges, validation des maquettes, livraison — se fait à distance par téléphone, WhatsApp et visioconférence, ce qui nous permet de travailler avec des clients partout au Maroc, y compris à " +
        city.name +
        ".",
    },
    {
      question: "Le nom de domaine et l'hébergement sont-ils inclus ?",
      answer:
        "Oui, chaque forfait inclut un nom de domaine et un hébergement pendant 1 an, ainsi qu'une adresse email professionnelle.",
    },
  ];

  return (
    <div className="pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="mx-auto max-w-4xl px-6">
        <Breadcrumbs
          items={[
            { name: "Accueil", href: "/" },
            {
              name: `Création site web ${city.name}`,
              href: `/creation-site-web-${city.slug}`,
            },
          ]}
        />

        <div className="mt-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <MapPin className="size-3.5" />
            {city.region}
          </span>
          <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Création de site web à {city.name}
          </h1>
          <p className="mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
            {city.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="glow-cyan h-12 rounded-full px-8">
              <Link href="/contact">Demander un devis gratuit</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-8">
              <Link href="/pricing">Voir les tarifs</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {city.stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-lg font-semibold text-foreground">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Pourquoi les entreprises de {city.name} ont besoin d&apos;un site web
            professionnel
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              `Être visible sur Google quand un client à ${city.name} cherche vos produits ou services.`,
              "Paraître plus crédible qu'une simple page Facebook ou Instagram.",
              "Recevoir des demandes de devis et des commandes 24h/24, même en dehors des heures d'ouverture.",
              "Présenter vos produits, vos réalisations et vos tarifs sans dépendre uniquement des réseaux sociaux.",
            ].map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Nous intervenons dans tout {city.name}
          </h2>
          <p className="mt-4 text-muted-foreground">
            Quartiers principaux : {city.neighborhoods.join(", ")} — et partout
            ailleurs à {city.name}, puisque l&apos;ensemble du projet se
            déroule à distance.
          </p>
        </div>
      </div>

      <FaqSection items={faqItems} />

      <PageCtaBanner namespace="ServicesPage.cta" />
    </div>
  );
}

export function buildCityMetadata(city: CityData) {
  const title = `Création de site web à ${city.name} | Agence web Maroc — Youness Web`;
  const description = `Agence de création de site internet à ${city.name} : sites vitrines, e-commerce et sur-mesure, livrés en 7 à 14 jours avec nom de domaine et hébergement inclus.`;
  const canonical = `${siteConfig.url}/creation-site-web-${city.slug}`;

  return {
    title,
    description,
    keywords: [
      `création site web ${city.name.toLowerCase()}`,
      `création site internet ${city.name.toLowerCase()}`,
      `agence web ${city.name.toLowerCase()}`,
      `développeur web ${city.name.toLowerCase()}`,
      `création site e-commerce ${city.name.toLowerCase()}`,
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "fr",
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}
