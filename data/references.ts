export type FeaturedReference = {
  name: string;
  sector: string;
  scope: string;
  image: string;
  solutions: string[];
};

export const featuredReferences: FeaturedReference[] = [
  {
    name: "Centre hospitalier universitaire",
    sector: "Santé",
    scope:
      "Sûreté multi-bâtiments d'un centre hospitalier universitaire : contrôle d'accès des zones sensibles, vidéosurveillance et supervision unifiée.",
    image: "/novadis/images/references/centre-hospitalier.webp",
    solutions: ["access-control", "video-surveillance", "supervision"],
  },
  {
    name: "Établissement de prestige",
    sector: "Luxe & Hospitality",
    scope:
      "Architecture de sûreté discrète pour un environnement à très forte exigence : flux visiteurs maîtrisés, vidéosurveillance haute densité, intégration aux process opérationnels.",
    image: "/novadis/images/references/etablissement-prestige.webp",
    solutions: ["video-surveillance", "access-control", "smart-integrations"],
  },
  {
    name: "Site patrimonial recevant du public",
    sector: "Tertiaire / Culture",
    scope:
      "Sûreté d'un site patrimonial accueillant du public : conciliation entre exigences muséales, expérience visiteur et protection des œuvres.",
    image: "/novadis/images/references/site-patrimonial.webp",
    solutions: ["video-surveillance", "intrusion-detection", "smart-integrations"],
  },
];
