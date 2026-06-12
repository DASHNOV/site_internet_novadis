export type FeaturedReference = {
  name: string;
  sector: string;
  scope: string;
  image: string;
  solutions: string[];
};

export const featuredReferences: FeaturedReference[] = [
  {
    name: "CHU de Montpellier",
    sector: "Santé",
    scope:
      "Sûreté multi-bâtiments d'un centre hospitalier universitaire : contrôle d'accès des zones sensibles, vidéosurveillance et supervision unifiée.",
    image: "/novadis/images/clients/chu-montpellier.webp",
    solutions: ["access-control", "video-surveillance", "supervision"],
  },
  {
    name: "Casino de Monaco",
    sector: "Luxe & Hospitality",
    scope:
      "Architecture de sûreté discrète pour un environnement à très forte exigence : flux visiteurs maîtrisés, vidéosurveillance haute densité, intégration aux process opérationnels.",
    image: "/novadis/images/clients/casino-monaco.webp",
    solutions: ["video-surveillance", "access-control", "smart-integrations"],
  },
  {
    name: "Bourse de Commerce — Pinault Collection",
    sector: "Tertiaire / Culture",
    scope:
      "Sûreté d'un site patrimonial accueillant du public : conciliation entre exigences muséales, expérience visiteur et protection des œuvres.",
    image: "/novadis/images/clients/bourse-de-commerce.webp",
    solutions: ["video-surveillance", "intrusion-detection", "smart-integrations"],
  },
];
