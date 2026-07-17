export type CityKey = "casablanca" | "rabat" | "tanger" | "marrakech";

export const cityKeys: CityKey[] = ["casablanca", "rabat", "tanger", "marrakech"];

export type CityData = {
  slug: CityKey;
  name: string;
  region: string;
  intro: string;
  stats: { label: string; value: string }[];
  neighborhoods: string[];
};

export const cities: Record<CityKey, CityData> = {
  casablanca: {
    slug: "casablanca",
    name: "Casablanca",
    region: "Grand Casablanca-Settat",
    intro:
      "Casablanca est le premier pôle économique du Maroc : des milliers de commerces, PME et starts-up y luttent chaque jour pour la visibilité en ligne.",
    stats: [
      { label: "Capitale économique", value: "1ère ville du Maroc" },
      { label: "Entreprises actives", value: "+50 000" },
      { label: "Concurrence en ligne", value: "Très forte" },
    ],
    neighborhoods: [
      "Maarif",
      "Gauthier",
      "Racine",
      "Bourgogne",
      "Ain Diab",
      "Sidi Maarouf",
      "Californie",
      "Anfa",
    ],
  },
  rabat: {
    slug: "rabat",
    name: "Rabat",
    region: "Rabat-Salé-Kénitra",
    intro:
      "Rabat, capitale administrative du Maroc, concentre institutions, sièges sociaux et professions libérales qui ont besoin d'une image professionnelle en ligne.",
    stats: [
      { label: "Statut", value: "Capitale du Maroc" },
      { label: "Secteurs clés", value: "Administration, services, conseil" },
      { label: "Opportunité SEO", value: "Concurrence modérée" },
    ],
    neighborhoods: ["Agdal", "Hay Riad", "Souissi", "Hassan", "Océan", "Aviation"],
  },
  tanger: {
    slug: "tanger",
    name: "Tanger",
    region: "Tanger-Tétouan-Al Hoceïma",
    intro:
      "Tanger connaît une croissance économique rapide grâce à son port et ses zones industrielles : de plus en plus d'entreprises tangéroises cherchent à se digitaliser.",
    stats: [
      { label: "Croissance", value: "Ville en forte expansion" },
      { label: "Position", value: "Porte de l'Afrique vers l'Europe" },
      { label: "Opportunité SEO", value: "Concurrence faible à modérée" },
    ],
    neighborhoods: ["Malabata", "Centre-ville", "Iberia", "Marshan", "Boukhalef"],
  },
  marrakech: {
    slug: "marrakech",
    name: "Marrakech",
    region: "Marrakech-Safi",
    intro:
      "Marrakech vit du tourisme, de l'artisanat et de l'hôtellerie : un site web professionnel et bien référencé y fait souvent la différence entre remplir ou non son activité.",
    stats: [
      { label: "Secteur dominant", value: "Tourisme, riads, artisanat" },
      { label: "Visibilité internationale", value: "Très recherchée" },
      { label: "Opportunité SEO", value: "Concurrence forte sur le tourisme" },
    ],
    neighborhoods: ["Gueliz", "Hivernage", "Médina", "Palmeraie", "Semlalia"],
  },
};
