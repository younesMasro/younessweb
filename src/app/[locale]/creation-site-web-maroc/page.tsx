import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cities, cityKeys } from "@/config/cities";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { FaqSection } from "@/components/shared/FaqSection";
import { PageCtaBanner } from "@/components/shared/PageCtaBanner";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return [{ locale: "fr" }];
}

export const dynamicParams = false;

const title = "Création de site web au Maroc — Agence web | Youness Web";
const description =
  "Agence de création de site internet au Maroc : sites vitrines, e-commerce et sur-mesure pour PME, indépendants et commerçants. Nom de domaine et hébergement inclus. Devis gratuit.";
const canonical = `${siteConfig.url}/creation-site-web-maroc`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "création site web maroc",
    "création site internet maroc",
    "agence web maroc",
    "prix création site web maroc",
    "développeur web maroc",
    "création site e-commerce maroc",
    "création boutique en ligne maroc",
    "site vitrine maroc",
    "agence digitale maroc",
    "création site wordpress maroc",
  ],
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    siteName: siteConfig.name,
    locale: "fr",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export default async function NationalLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Youness Web — Création de site web au Maroc",
    description,
    url: canonical,
    areaServed: { "@type": "Country", name: "Morocco" },
    priceRange: "2500 MAD - 10000+ MAD",
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Accueil", url: siteConfig.url },
    { name: "Création site web Maroc", url: canonical },
  ]);

  const faqItems = [
    {
      question: "Combien coûte la création d'un site web au Maroc ?",
      answer:
        "Chez Youness Web, un site vitrine professionnel démarre à 2 500 MAD (nom de domaine et hébergement inclus 1 an). Un site sur-mesure premium avec fonctionnalités avancées (e-commerce, réservation, paiement en ligne) démarre à 5 000 MAD. Le prix final dépend du nombre de pages et des fonctionnalités demandées.",
    },
    {
      question: "Combien de temps faut-il pour créer un site web ?",
      answer:
        "En moyenne 7 à 14 jours ouvrés pour un site vitrine, et 2 à 4 semaines pour un site e-commerce ou un projet sur-mesure, selon la rapidité à recevoir vos contenus (textes, logo, photos).",
    },
    {
      question: "Proposez-vous la création de boutiques en ligne (e-commerce) ?",
      answer:
        "Oui. Nous créons des boutiques en ligne complètes : catalogue de produits, panier, paiement à la livraison ou en ligne, gestion des commandes et notifications automatiques.",
    },
    {
      question: "Le site sera-t-il visible sur Google ?",
      answer:
        "Chaque site est livré avec une optimisation SEO de base (structure, balises, vitesse, mobile) pour être indexable par Google dès le lancement. Pour aller plus loin, nous proposons également du contenu et des pages locales optimisées par ville.",
    },
    {
      question: "Travaillez-vous avec des clients dans toutes les villes du Maroc ?",
      answer:
        "Oui, l'ensemble du processus se fait à distance (WhatsApp, téléphone, visioconférence), ce qui nous permet d'accompagner des clients à Casablanca, Rabat, Tanger, Marrakech et partout ailleurs au Maroc.",
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
            { name: "Création site web Maroc", href: "/creation-site-web-maroc" },
          ]}
        />

        <h1 className="mt-6 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
          Création de site web au Maroc
        </h1>
        <p className="mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
          Youness Web accompagne les PME, commerçants et indépendants marocains
          dans la création de sites vitrines, boutiques en ligne et projets
          sur-mesure — nom de domaine et hébergement inclus, livraison rapide,
          accompagnement personnalisé.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="glow-cyan h-12 rounded-full px-8">
            <Link href="/contact">Demander un devis gratuit</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-8">
            <Link href="/pricing">Voir les tarifs</Link>
          </Button>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Pourquoi une entreprise marocaine a besoin d&apos;un site web
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Être trouvé sur Google par des clients qui cherchent activement vos produits ou services.",
              "Avoir une image professionnelle et crédible, plus forte qu'une simple page Facebook.",
              "Recevoir des demandes et des commandes en continu, même en dehors des horaires d'ouverture.",
              "Garder le contrôle total de votre présence en ligne, sans dépendre des algorithmes des réseaux sociaux.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Nos services par ville
          </h2>
          <p className="mt-4 text-muted-foreground">
            Nous accompagnons des clients dans tout le Maroc, avec des pages
            dédiées pour les principales villes économiques :
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {cityKeys.map((key) => (
              <Link
                key={key}
                href={`/creation-site-web-${key}`}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80 hover:border-primary/40 hover:text-foreground"
              >
                Création site web {cities[key].name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FaqSection items={faqItems} />

      <PageCtaBanner namespace="ServicesPage.cta" />
    </div>
  );
}
