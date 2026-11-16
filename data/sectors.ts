export type Sector = {
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  challenges: string[];
  solutions: string[];
  examples: { title: string; body: string }[];
};

export const sectors: Sector[] = [
  {
    slug: "tertiaire",
    title: "Tertiaire",
    tagline: "Sièges sociaux, campus, flex-office.",
    desc:
      "Les environnements tertiaires doivent concilier fluidité d'accès, confort des collaborateurs et niveau de sûreté élevé — sans jamais faire sentir la contrainte.",
    challenges: [
      "Flux quotidiens importants et variables",
      "Accueil visiteurs et prestataires",
      "Zones à niveaux d'habilitation différents",
      "Intégration aux systèmes RH et ITSM",
    ],
    solutions: ["access-control", "video-surveillance", "smart-integrations"],
    examples: [
      {
        title: "Siège en immeuble de grande hauteur · 2 700 occupants",
        body:
          "Reprise de plus de 200 lecteurs existants sous Amadeus sur 45 000 m², vidéo avec mur d'images, lecture de plaques au parking, gestion visiteurs et interface RH.",
      },
      {
        title: "Siège tertiaire · 10 000 badges",
        body:
          "Contrôle d'accès Amadeus pour 10 000 porteurs, couplé à la gestion des ascenseurs et à l'accès Bluetooth, 103 caméras supervisées.",
      },
    ],
  },
  {
    slug: "industrie",
    title: "Industrie",
    tagline: "Usines, sites industriels, data-centers.",
    desc:
      "Les sites industriels exigent une sûreté résiliente, capable de fonctionner 24/7 sans défaillance, et parfaitement intégrée aux systèmes de production.",
    challenges: [
      "Environnement 24/7 sans interruption",
      "Convergence OT/IT",
      "Zones classées ATEX ou sensibles",
      "Surface à protéger étendue",
    ],
    solutions: ["intrusion-detection", "video-surveillance", "it-infrastructure"],
    examples: [
      {
        title: "Atelier de production classé ICPE",
        body:
          "Intrusion NFA2P sur la périphérie, les façades et les clôtures, caméras thermiques, lecture de plaques aux portails et essais de marche dégradée.",
      },
      {
        title: "Usine en construction",
        body:
          "Lot sûreté d'un site neuf, pris en charge de l'étude à la mise en service, en coordination avec les autres corps d'état du chantier.",
      },
    ],
  },
  {
    slug: "logistique",
    title: "Logistique",
    tagline: "Entrepôts, plateformes, hubs de distribution.",
    desc:
      "Les sites logistiques imposent une traçabilité fine des flux humains et marchandises sur de grandes surfaces, avec une exigence opérationnelle continue.",
    challenges: [
      "Grandes emprises ouvertes",
      "Rotation élevée des prestataires",
      "Traçabilité quais et marchandises",
      "Coordination 24/7",
    ],
    solutions: ["video-surveillance", "ai-video-analytics", "access-control"],
    examples: [
      {
        title: "Site de préparation et d'expédition alimentaire",
        body:
          "Contrôle d'accès Amadeus, 70 caméras, PC sécurité à 4 postes d'exploitation et badges visiteurs par QR code.",
      },
    ],
  },
  {
    slug: "sites-sensibles",
    title: "Sites sensibles",
    tagline: "Infrastructures critiques, défense, énergie.",
    desc:
      "Les environnements OIV et réglementés exigent haute disponibilité, respect des exigences ANSSI et traçabilité forensique de bout en bout.",
    challenges: [
      "Exigences d'uptime absolues",
      "Exigences ANSSI et OIV",
      "Traçabilité des incidents",
      "Événements à fort impact",
    ],
    solutions: ["supervision", "intrusion-detection", "access-control"],
    examples: [
      {
        title: "Réseau d'eau potable · 17 sites",
        body:
          "Réservoirs classés infrastructures critiques et sites secondaires reliés en réseau privé : contrôle d'accès multisite avec mode crise, vidéo et armoires à clés, migration en cours vers Amadeus 8 et une intrusion NFA2P.",
      },
      {
        title: "Joaillerie de prestige",
        body:
          "Hypervision, biométrie, intrusion et vidéosurveillance réunies pour un site à très forte valeur.",
      },
    ],
  },
  {
    slug: "multi-sites",
    title: "Réseaux multi-sites",
    tagline: "Groupes, enseignes, franchises.",
    desc:
      "Les réseaux multi-sites imposent un référentiel d'exploitation unique pour orchestrer des dizaines voire centaines de sites avec cohérence et continuité de service.",
    challenges: [
      "Hétérogénéité du parc existant",
      "Standardisation des procédures",
      "Supervision centralisée",
      "Roll-out coordonné",
    ],
    solutions: ["supervision", "access-control", "it-infrastructure"],
    examples: [
      {
        title: "Maison de luxe · 31 boutiques",
        body:
          "Poste central de sûreté conçu pour mutualiser toutes les boutiques sous Amadeus, migration boutique par boutique, hypervision au siège.",
      },
      {
        title: "Groupement hospitalier · 2 hôpitaux",
        body:
          "Vidéosurveillance de deux établissements réunie sur une plateforme unique d'environ 140 caméras.",
      },
    ],
  },
  {
    slug: "erp",
    title: "ERP & environnements publics",
    tagline: "Hôpitaux, lieux culturels, grands magasins.",
    desc:
      "Les ERP concilient ouverture au public, protection des zones sensibles et continuité d'exploitation sous forte affluence — avec des contraintes PMR et PPMS spécifiques.",
    challenges: [
      "Cohabitation public / personnel",
      "Zones sensibles à accès très régulés",
      "Affluence et flux imprévisibles",
      "Plans PMR, PPMS, vigipirate",
    ],
    solutions: ["video-surveillance", "ai-video-analytics", "smart-integrations"],
    examples: [
      {
        title: "Centre hospitalier universitaire · 2 sites",
        body:
          "Plus de 1 000 lecteurs et 30 000 porteurs de badges sous Amadeus, 370 caméras, lecture de plaques et intrusion, installés depuis 2010.",
      },
      {
        title: "Établissement de jeux",
        body:
          "Plus de 1 000 caméras et plus de 400 micros, avec le son et l'image synchronisés pour l'exploitation.",
      },
    ],
  },
];

export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);
