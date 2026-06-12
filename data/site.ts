import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Building2,
  Cpu,
  Factory,
  Fingerprint,
  MonitorPlay,
  Network,
  Radar,
  ScanSearch,
  ShieldAlert,
  Truck,
  Users,
  Video,
} from "lucide-react";

export type Metric = {
  value: string;
  label: string;
  caption?: string;
};

export type Solution = {
  slug: string;
  title: string;
  shortTitle: string;
  product?: string;
  icon: LucideIcon;
  summary: string;
  intro: string;
  problem: string;
  solution: string;
  benefits: string[];
  capabilities: string[];
  outcomes: string[];
  media: {
    kind: "image" | "video";
    src: string;
    poster?: string;
    alt: string;
  };
  docs?: { label: string; href: string }[];
};

export type Industry = {
  slug: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  challenges: string[];
  outcomes: string[];
  media: string;
};

export const siteMetrics: Metric[] = [
  { value: "12 000+", label: "Caméras déployées", caption: "Parc actif supervisé" },
  { value: "40 000+", label: "Points d'accès", caption: "Portes et zones contrôlées" },
  { value: "2,3 M m²", label: "Surface protégée", caption: "Sites en exploitation" },
  { value: "20+", label: "Années d'expertise", caption: "Sûreté & convergence" },
];

export const mediaLibrary = {
  logo: "/novadis/logos/logo-light.svg",
  logoDark: "/novadis/logos/logo-dark.svg",
  heroPrimary: "/novadis/images/poster-1.png",
  heroSecondary: "/novadis/images/poster-2.png",
  heroTertiary: "/novadis/images/poster-3.png",
  homepageVisual: "/novadis/images/homepage-3.png",
  convergenceVisual: "/novadis/images/convergence.png",
  perspectiveVisual: "/novadis/images/perspective.png",
  peopleVisual: "/novadis/images/people.png",
  aboutBanner: "/novadis/images/about-banner.jpg",
  articleBanner: "/novadis/images/article-banner.jpg",
  articleVisual: "/novadis/images/article-1.png",
  presentVideo: "https://novadis.eu/wp-content/uploads/2022/02/Export-Novadis-Compresse.mp4?_=1",
  imgSecurityOps: `https://images.unsplash.com/photo-DEbdMjKq95w?w=1400&q=82&auto=format&fit=crop`,
  // Images produits spécifiques Novadis
  productAmadeus: "/novadis/images/amadeus8.jpg",
  productGalaxy: "/novadis/images/honeywell-galaxy.jpg",
  productOcularis: "/novadis/images/cognyfy.jpg",
  productServer: "/novadis/images/server_dell.avif",
  architecturePrincipe: "/novadis/images/architecture-principe.webp",
  schemaSolutions: "/novadis/images/schema-solutions.webp",
  spacInterview: "/novadis/videos/spac-interview.mp4",
  spacPoster: "/novadis/images/spac-poster.webp",
};

export const solutions: Solution[] = [
  {
    slug: "supervision",
    title: "Supervision globale",
    shortTitle: "Supervision globale",
    product: "Hyperviseur de sûreté · Convergence multi-systèmes",
    icon: MonitorPlay,
    summary:
      "Couche de supervision unifiée croisant contrôle d'accès, vidéosurveillance et intrusion en un seul poste opérateur.",
    intro:
      "La supervision globale est la colonne vertébrale d'un dispositif de sûreté moderne : elle relie chaque sous-système dans un même modèle d'exploitation, lisible et actionnable.",
    problem:
      "Lorsque vidéo, contrôle d'accès, intrusion et IoT vivent dans des consoles séparées, les opérateurs perdent du temps, corrèlent mal les événements et la chaîne de décision se fragilise sous pression.",
    solution:
      "Novadis met en œuvre une couche d'hyperviseur qui agrège les flux des sous-systèmes (Amadeus, Ocularis, Galaxy, IoT, LPR, intercom) dans un poste unique : cartographie temps réel, corrélation d'alarmes, scénarios de levée de doute et procédures pilotées.",
    benefits: [
      "Poste opérateur unique",
      "Corrélation multi-systèmes",
      "Procédures pilotées",
      "Continuité de l'exploitation",
    ],
    capabilities: [
      "Cartographie dynamique des sites",
      "Workflows de levée de doute",
      "Corrélation événements & alarmes",
      "Tableaux de bord exploitation",
    ],
    outcomes: [
      "Temps de qualification réduit",
      "Vision multi-sites consolidée",
      "Procédures de crise tenues",
      "Pilotage par la donnée",
    ],
    media: {
      kind: "image",
      src: mediaLibrary.imgSecurityOps,
      alt: "Poste de supervision globale Novadis",
    },
    docs: [
      { label: "Serveur OCB", href: "/novadis/documents/fiches/srv-ocb.pdf" },
      { label: "Poste opérateur WKS2", href: "/novadis/documents/fiches/wks2.pdf" },
      { label: "Poste opérateur WKS3", href: "/novadis/documents/fiches/wks3.pdf" },
      { label: "Clavier JET4", href: "/novadis/documents/fiches/jet4.pdf" },
    ],
  },
  {
    slug: "it-infrastructure",
    title: "Informatique & Infrastructure",
    shortTitle: "IT & Infrastructure",
    product: "Microsoft Embedded · Dell OEM",
    icon: Cpu,
    summary:
      "Serveurs, stockage, réseau et virtualisation calibrés pour soutenir la sûreté à l'échelle du site et du groupe.",
    intro:
      "La sûreté ne tient dans la durée que lorsque l'infrastructure sous-jacente est résiliente, segmentée et observable.",
    problem:
      "Un programme de sûreté perd en fiabilité quand la vidéo, le contrôle d'accès, l'analyse et l'exploitation reposent sur une infrastructure fragmentée ou sous-dimensionnée.",
    solution:
      "Grâce à nos partenariats Microsoft Embedded et Dell OEM, Novadis adapte chaque couche : calcul, stockage NAS/RAID, réseau dédié, virtualisation VMware ou Hyper-V, haute disponibilité.",
    benefits: [
      "Architectures redondées",
      "Stockage NAS/RAID calibré",
      "Réseaux dédiés et chiffrés",
      "Virtualisation haute disponibilité",
    ],
    capabilities: [
      "Conception serveurs et stockage",
      "Segmentation réseau et fibre optique",
      "Virtualisation VMware / Hyper-V",
      "Exploitation hybride et multi-sites",
    ],
    outcomes: [
      "Disponibilité accrue",
      "Maintenance plus lisible",
      "Croissance sans refonte",
      "Continuité d'exploitation",
    ],
    media: {
      kind: "image",
      src: mediaLibrary.productServer,
      alt: "Infrastructure informatique Novadis",
    },
    docs: [
      { label: "Serveur AMAD", href: "/novadis/documents/fiches/srv-amad.pdf" },
      { label: "Serveur OCNVR", href: "/novadis/documents/fiches/srv-ocnvr.pdf" },
      { label: "Poste WKS1", href: "/novadis/documents/fiches/wks1.pdf" },
      { label: "Poste WKS2", href: "/novadis/documents/fiches/wks2.pdf" },
      { label: "Poste WKS3", href: "/novadis/documents/fiches/wks3.pdf" },
    ],
  },
  {
    slug: "access-control",
    title: "Contrôle d'accès — Amadeus",
    shortTitle: "Contrôle d'accès",
    product: "Amadeus",
    icon: Fingerprint,
    summary:
      "Plateforme exclusive Amadeus : gestion temps réel des événements, architecture ouverte, conforme ANSSI.",
    intro:
      "Les décisions d'accès structurent chaque jour la sûreté, la continuité d'activité et la conformité des environnements physiques.",
    problem:
      "À mesure que l'organisation grandit, les droits d'accès, badges et zones sécurisées deviennent difficiles à piloter de façon homogène et auditable.",
    solution:
      "Amadeus unifie porteurs, badges, biométrie, horaires, visiteurs et zones restreintes dans un même modèle d'exploitation, avec intelligence distribuée et conformité ANSSI.",
    benefits: [
      "Architecture ouverte et libre",
      "Intelligence distribuée",
      "Gestion temps réel",
      "Conformité ANSSI",
    ],
    capabilities: [
      "Modèles d'accès par rôle",
      "Pilotage portes et zones",
      "Flux visiteurs et prestataires",
      "Scénarios de confinement",
    ],
    outcomes: [
      "Privilèges maîtrisés",
      "Mise en service plus rapide",
      "Meilleure conformité",
      "Administration réduite",
    ],
    media: {
      kind: "image",
      src: mediaLibrary.productAmadeus,
      alt: "Contrôle d'accès Amadeus",
    },
    docs: [
      { label: "Serveur AMAD", href: "/novadis/documents/fiches/srv-amad.pdf" },
    ],
  },
  {
    slug: "intrusion-detection",
    title: "Intrusion — Galaxy",
    shortTitle: "Intrusion",
    product: "Galaxy · NFA2P",
    icon: Radar,
    summary:
      "Détection périmétrique et intérieure conforme NFA2P, pilotée de façon transparente depuis Amadeus.",
    intro:
      "La détection est réellement efficace lorsqu'elle est contextualisée, corrélée et reliée à un processus de réponse.",
    problem:
      "Des détecteurs disjoints génèrent du bruit, ralentissent la qualification d'incident et obligent les équipes à naviguer entre plusieurs outils sous pression.",
    solution:
      "Galaxy fournit une couche d'alarme autonome, normée NFA2P, supervisée de façon transparente dans Amadeus pour un poste opérateur unique.",
    benefits: [
      "Conforme NFA2P",
      "Supervision unifiée",
      "Cartographie d'alarme",
      "Escalade plus rapide",
    ],
    capabilities: [
      "Capteurs intérieurs et extérieurs",
      "Workflows d'alarme",
      "Corrélation poste central",
      "Automatisation de crise",
    ],
    outcomes: [
      "Temps de réaction amélioré",
      "Moins de levées inutiles",
      "Protection plus fiable",
      "Priorités clarifiées",
    ],
    media: {
      kind: "image",
      src: mediaLibrary.productGalaxy,
      alt: "Détection intrusion Galaxy Honeywell",
    },
  },
  {
    slug: "video-surveillance",
    title: "Vidéosurveillance — Ocularis",
    shortTitle: "Vidéosurveillance",
    product: "Ocularis VMS",
    icon: Video,
    summary:
      "Plateforme VMS Ocularis universelle : ouverte, intuitive, évolutive, multi-fabricants caméras.",
    intro:
      "La vidéo ne doit pas seulement enregistrer. Elle doit aider les équipes à détecter, investiguer et coordonner sereinement.",
    problem:
      "De nombreux parcs vidéo deviennent de simples archives coûteuses, faute d'interfaces, de stockage et de workflows réellement pensés pour l'exploitation.",
    solution:
      "Ocularis relie caméras, postes opérateurs, stockage et relecture dans un système unifié, avec analyse de timeline, détection de mouvement et compatibilité multi-marques.",
    benefits: [
      "Compatible multi-fabricants",
      "Timeline avancée",
      "Détection de mouvement",
      "Visibilité multi-sites",
    ],
    capabilities: [
      "Architecture VMS",
      "Politiques de rétention",
      "Postes opérateurs",
      "Parcours de preuve",
    ],
    outcomes: [
      "Relecture plus rapide",
      "Conscience de site renforcée",
      "Stockage optimisé",
      "Productivité opérateur",
    ],
    media: {
      kind: "image",
      src: mediaLibrary.productOcularis,
      alt: "VMS Ocularis Qognify",
    },
    docs: [
      { label: "Serveur OCNVR", href: "/novadis/documents/fiches/srv-ocnvr.pdf" },
    ],
  },
  {
    slug: "ai-video-analytics",
    title: "Analyse d'image",
    shortTitle: "Analyse d'image",
    product: "Algorithmes temps réel & post-événement",
    icon: ScanSearch,
    summary:
      "Une intelligence d'image qui transforme les flux en événements, signaux et indices réellement exploitables.",
    intro:
      "L'analyse ne devient utile que lorsqu'elle réduit la charge opérateur sans créer de faux signaux ou de confiance artificielle.",
    problem:
      "Les opérateurs ne peuvent pas étendre une relecture manuelle à des milliers de flux, surtout sur de grands campus ou des périmètres industriels.",
    solution:
      "Novadis met en œuvre l'analyse d'image temps réel et post-événement : détection de comportements, LPR, reconnaissance d'objets, recherche intelligente et tri d'événements selon vos règles métier.",
    benefits: [
      "Qualification accélérée",
      "Détection de comportements",
      "LPR & suivi d'objets",
      "Charge opérateur réduite",
    ],
    capabilities: [
      "Conception des scénarios",
      "Exploitation des métadonnées",
      "Priorisation d'alertes",
      "Support à l'investigation",
    ],
    outcomes: [
      "Alertes plus pertinentes",
      "Investigations courtes",
      "Efficacité accrue",
      "Décision mieux assistée",
    ],
    media: {
      kind: "image",
      src: mediaLibrary.imgSecurityOps,
      alt: "Salle de supervision et analyse vidéo Novadis",
    },
  },
  {
    slug: "smart-integrations",
    title: "Intégrations tierces",
    shortTitle: "Intégrations",
    product: "Biométrie · LPR · IoT · Aperio",
    icon: Blocks,
    summary:
      "Biométrie, LPR, IoT, interphonie, armoires à clés et protection périmétrique connectés sans verrouillage.",
    intro:
      "La qualité d'intégration détermine si une plateforme de sûreté devient un vrai système d'exploitation du site ou une juxtaposition d'outils.",
    problem:
      "Les intégrations point à point créent fragilité, dépendances opaques et difficultés futures de maintenance.",
    solution:
      "Novadis relie biométrie (réseau veineux, empreinte CNIL), LPR (ANPR), lecteurs Aperio sans fil, armoires à clés, gestion visiteurs, interphonie et protection périmétrique sismique dans des architectures documentées.",
    benefits: [
      "Stratégie système ouvert",
      "Interopérabilité fournisseur",
      "Parcours unifiés",
      "Souplesse à long terme",
    ],
    capabilities: [
      "Biométrie & LPR",
      "IoT et capteurs",
      "Interphonie & armoires à clés",
      "Intégrations spécifiques",
    ],
    outcomes: [
      "Moins de verrouillage",
      "Plus de contexte opérationnel",
      "Modernisation facilitée",
      "ROI préservé",
    ],
    media: {
      kind: "video",
      src: mediaLibrary.presentVideo,
      poster: mediaLibrary.homepageVisual,
      alt: "Intégrations Novadis",
    },
  },
];

export const industries: Industry[] = [
  {
    slug: "tertiaire",
    title: "Tertiaire",
    icon: Building2,
    summary:
      "Sièges, campus et environnements flex-office : concilier fluidité d'accès, expérience occupant et niveau de sûreté élevé sans jamais faire sentir la contrainte.",
    challenges: [
      "Flux quotidiens variables",
      "Accueil visiteurs et prestataires",
      "Zones d'habilitation différenciées",
      "Intégration RH et ITSM",
    ],
    outcomes: [
      "Exploitation unifiée",
      "Expérience occupant fluide",
      "Gouvernance renforcée",
    ],
    media: "/novadis/images/secteurs/tertiaire.webp",
  },
  {
    slug: "industrie",
    title: "Industrie",
    icon: Factory,
    summary:
      "Sites industriels, usines et data centers : résilience 24/7, convergence OT/IT et protection adaptée aux environnements exigeants.",
    challenges: [
      "Exploitation 24/7 sans interruption",
      "Convergence OT/IT",
      "Zones classées ou sensibles",
      "Surfaces étendues à couvrir",
    ],
    outcomes: [
      "Protection multicouche",
      "Continuité de process",
      "Infrastructure résiliente",
    ],
    media: "/novadis/images/secteurs/industrie.webp",
  },
  {
    slug: "logistique",
    title: "Logistique",
    icon: Truck,
    summary:
      "Entrepôts et plateformes : traçabilité fine des flux, contrôle des quais et supervision étendue sur de grandes surfaces.",
    challenges: [
      "Grandes emprises ouvertes",
      "Rotation des prestataires",
      "Traçabilité quais et marchandises",
      "Coordination 24/7",
    ],
    outcomes: [
      "Traçabilité bout en bout",
      "Qualification d'alarme fiable",
      "Coordination chantier maîtrisée",
    ],
    media: "/novadis/images/secteurs/logistique.webp",
  },
  {
    slug: "sites-sensibles",
    title: "Sites sensibles",
    icon: ShieldAlert,
    summary:
      "Infrastructures critiques, défense et énergie : haute disponibilité, conformité ANSSI et traçabilité forensique pour les environnements réglementés.",
    challenges: [
      "Exigences d'uptime absolues",
      "Pression réglementaire OIV",
      "Traçabilité des incidents",
      "Événements à fort impact",
    ],
    outcomes: [
      "Conformité ANSSI",
      "Assurance opérationnelle",
      "Modèles de contrôle évolutifs",
    ],
    media: "/novadis/images/secteurs/sites-sensibles.webp",
  },
  {
    slug: "multi-sites",
    title: "Réseaux multi-sites",
    icon: Network,
    summary:
      "Groupes, enseignes et franchises : un référentiel unique pour orchestrer des dizaines voire centaines de sites avec cohérence et continuité de service.",
    challenges: [
      "Hétérogénéité du parc existant",
      "Standardisation des procédures",
      "Supervision centralisée",
      "Continuité de service absolue",
    ],
    outcomes: [
      "Référentiel d'exploitation unifié",
      "Supervision centralisée",
      "Roll-out maîtrisé",
    ],
    media: "/novadis/images/secteurs/multi-sites.webp",
  },
  {
    slug: "erp",
    title: "ERP & environnements publics",
    icon: Users,
    summary:
      "Hôpitaux, gares, centres commerciaux : concilier ouverture au public, protection des zones sensibles et continuité d'exploitation sous forte affluence.",
    challenges: [
      "Cohabitation public et personnel",
      "Zones sensibles à accès régulés",
      "Affluence imprévisible",
      "Conformité PMR et PPMS",
    ],
    outcomes: [
      "Sécurité du public renforcée",
      "Traçabilité des accès sensibles",
      "Coordination temps réel",
    ],
    media: "/novadis/images/secteurs/erp.webp",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Étude & ingénierie",
    description:
      "Analyse des usages, cartographie des risques, contraintes techniques et architecture de sûreté adaptée.",
    deliverables: ["Audit terrain", "Cartographie des risques", "Architecture cible"],
  },
  {
    step: "02",
    title: "Design",
    description:
      "Conception détaillée des équipements, logiciels, réseaux, stockage et parcours opérateurs.",
    deliverables: ["Dossier technique", "Plans d'implantation", "Spécifications opérateurs"],
  },
  {
    step: "03",
    title: "Déploiement",
    description:
      "Installation, mise en service, migration, validation et coordination avec les environnements en activité.",
    deliverables: ["Mise en service", "Coordination chantier", "Validation par site"],
  },
  {
    step: "04",
    title: "Maintenance",
    description:
      "Support cycle de vie, maintenance préventive, mises à jour et interventions pour la continuité métier.",
    deliverables: ["Analyse fonctionnelle personnalisée", "Mémoire technique & carnet caméras", "Maintenance préventive et corrective"],
  },
];

export const differentiators = [
  "Première en France à unifier contrôle d'accès, vidéosurveillance et intrusion sur une seule interface",
  "Exclusivité nationale sur Amadeus (DDS) et Ocularis — une maîtrise produit qu'aucun concurrent ne peut revendiquer",
  "Zéro sous-traitance : chaque équipement, hardware et software, est paramétré par les ingénieurs Novadis",
  "Présent en amont des appels d'offres pour cadrer le cahier des charges et peser sur la roadmap",
];

export const navItems = [
  { href: "/solutions", label: "Solutions" },
  { href: "/secteurs", label: "Secteurs" },
  { href: "/references", label: "Références" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export type PartnerKind = "tech" | "norm" | "association";

export const partners: { name: string; role: string; kind: PartnerKind; logo?: string }[] = [
  { name: "DDS", role: "Éditeur Amadeus", kind: "tech", logo: "/novadis/logos/partners/dds.webp" },
  { name: "Qognify", role: "Éditeur Ocularis", kind: "tech", logo: "/novadis/logos/partners/qognify.webp" },
  { name: "Honeywell", role: "Galaxy · Intrusion", kind: "tech", logo: "/novadis/logos/partners/honeywell.webp" },
  { name: "HID", role: "Lecteurs & badges", kind: "tech", logo: "/novadis/logos/partners/hid.webp" },
  { name: "STid", role: "Lecteurs RFID", kind: "tech", logo: "/novadis/logos/partners/stid.webp" },
  { name: "Dell", role: "OEM Infrastructure", kind: "tech", logo: "/novadis/logos/partners/dell.webp" },
  { name: "Microsoft", role: "Embedded OEM", kind: "tech" },
  { name: "VMware", role: "Virtualisation", kind: "tech" },
  { name: "Aperio", role: "Lecteurs sans fil", kind: "tech" },
  { name: "ANSSI", role: "Conformité", kind: "norm" },
  { name: "NFA2P", role: "Norme intrusion", kind: "norm" },
  { name: "CNIL", role: "Biométrie", kind: "norm" },
  { name: "Arseg", role: "Association professionnelle", kind: "association" },
  { name: "Synergie", role: "Association professionnelle", kind: "association" },
];

export const trustSignals = [
  "Membre Arseg",
  "Membre Synergie",
  "Conforme ANSSI",
  "Norme NFA2P",
  "CNIL · biométrie",
];

export const pillars = [
  {
    title: "Élaborer votre sûreté",
    description:
      "Concevoir un dispositif global, calibré à vos sites, qui pose les bases d'une exploitation sereine.",
    points: ["Audit", "Architecture", "Plans d'implantation"],
  },
  {
    title: "Assurer la convergence",
    description:
      "Faire dialoguer infrastructure IT, contrôle d'accès, vidéo, intrusion et systèmes tiers dans un même modèle.",
    points: ["IT & sûreté", "Interopérabilité", "Données unifiées"],
  },
  {
    title: "Tracer les perspectives",
    description:
      "Préserver la valeur de vos investissements en gardant un système ouvert, lisible et évolutif.",
    points: ["Évolutivité", "Standards ouverts", "Cycle de vie maîtrisé"],
  },
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
