import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Building2,
  Cpu,
  Factory,
  Fingerprint,
  Gauge,
  MonitorPlay,
  Network,
  Radar,
  RefreshCw,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  Truck,
  Users,
  Video,
  Workflow,
  Award,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import accessDoorAnchors from "./access-door-anchors.json";
import explodeAnchors from "./axis-explode-anchors.json";
import intrusionAnchors from "./intrusion-anchors.json";

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
  { value: "100+", label: "Clients", caption: "Grands comptes, installateurs et mainteneurs" },
  { value: "Or", label: "EcoVadis 2026", caption: "Performance RSE" },
  { value: "5,3 M m²", label: "Surface protégée", caption: "Sites en exploitation" },
  { value: "20+", label: "Années d'expertise", caption: "Sûreté & convergence" },
];

export const mediaLibrary = {
  logo: "/novadis/logos/logo-light-wide.svg",
  logoDark: "/novadis/logos/logo-dark.svg",
  heroPrimary: "/novadis/images/poster-1.png",
  heroSecondary: "/novadis/images/poster-2.png",
  heroTertiary: "/novadis/images/poster-3.png",
  homepageVisual: "/novadis/images/homepage-3.webp",
  convergenceVisual: "/novadis/images/convergence.png",
  perspectiveVisual: "/novadis/images/perspective.png",
  peopleVisual: "/novadis/images/people.webp",
  articleBanner: "/novadis/images/article-banner.jpg",
  presentVideo: "/novadis/videos/salle-supervision.mp4",
  presentVideoPoster: "/novadis/images/stock/salle-supervision-poster.webp",
  // Banque d'images libres de droit — sources et licences dans docs/CONTENT.md
  stockControlRoom: "/novadis/images/stock/salle-supervision.webp",
  stockBiometrics: "/novadis/images/stock/biometrie-empreinte.webp",
  stockCamera: "/novadis/images/stock/camera-videosurveillance.webp",
  stockCameraMast: "/novadis/images/stock/mat-cameras.webp",
  stockAccessKeypad: "/novadis/images/stock/clavier-acces.webp",
  stockDatacenter: "/novadis/images/stock/datacenter.webp",
  stockEngineering: "/novadis/images/stock/etude-plan.webp",
  stockMeeting: "/novadis/images/stock/reunion-projet.webp",
  // Images produits spécifiques Novadis
  productAmadeus: "/novadis/images/amadeus8.jpg",
  productServer: "/novadis/images/server-rack.webp",
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
    product: "Supervision globale Amadeus · Convergence multi-systèmes",
    icon: MonitorPlay,
    summary:
      "Couche de supervision unifiée croisant contrôle d'accès, vidéosurveillance et intrusion en un seul poste opérateur.",
    intro:
      "La supervision globale est la colonne vertébrale d'un dispositif de sûreté moderne : elle relie chaque sous-système dans un même modèle d'exploitation, lisible et actionnable.",
    problem:
      "Lorsque vidéo, contrôle d'accès, intrusion et IoT vivent dans des consoles séparées, les opérateurs perdent du temps, corrèlent mal les événements et la chaîne de décision se fragilise sous pression.",
    solution:
      "Novadis met en œuvre la supervision globale Amadeus, qui agrège les flux des sous-systèmes (contrôle d'accès, vidéo, intrusion, IoT, LPR) dans un poste unique : cartographie temps réel, corrélation d'alarmes, scénarios de levée de doute et procédures pilotées.",
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
      src: mediaLibrary.stockControlRoom,
      alt: "Opérateur face à un mur d'écrans de supervision",
    },
  },
  {
    slug: "it-infrastructure",
    title: "Informatique & Infrastructure",
    shortTitle: "IT & Infrastructure",
    product: "Serveurs · Stockage · Virtualisation",
    icon: Cpu,
    summary:
      "Serveurs, stockage, réseau et virtualisation calibrés pour soutenir la sûreté à l'échelle du site et du groupe.",
    intro:
      "La sûreté ne tient dans la durée que lorsque l'infrastructure sous-jacente est résiliente, segmentée et observable.",
    problem:
      "Un programme de sûreté perd en fiabilité quand la vidéo, le contrôle d'accès, l'analyse et l'exploitation reposent sur une infrastructure fragmentée ou sous-dimensionnée.",
    solution:
      "Grâce à ses partenariats constructeurs, Novadis adapte chaque couche : calcul, stockage NAS/RAID, réseau dédié, virtualisation, haute disponibilité.",
    benefits: [
      "Architectures redondées",
      "Stockage NAS/RAID calibré",
      "Réseaux dédiés et segmentés",
      "Virtualisation haute disponibilité",
    ],
    capabilities: [
      "Conception serveurs et stockage",
      "Segmentation réseau par métier",
      "Virtualisation des serveurs",
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
  },
  {
    slug: "access-control",
    title: "Contrôle d'accès — Amadeus",
    shortTitle: "Contrôle d'accès",
    product: "Amadeus",
    icon: Fingerprint,
    summary:
      "Plateforme exclusive Amadeus : gestion temps réel des événements, architecture ouverte, lecture de badge selon les recommandations ANSSI.",
    intro:
      "Les décisions d'accès structurent chaque jour la sûreté, la continuité d'activité et la conformité des environnements physiques.",
    problem:
      "À mesure que l'organisation grandit, les droits d'accès, badges et zones sécurisées deviennent difficiles à piloter de façon homogène et auditable.",
    solution:
      "Amadeus unifie porteurs, badges, biométrie, horaires, visiteurs et zones restreintes dans un même modèle d'exploitation, avec intelligence distribuée et une lecture de badge alignée sur les recommandations ANSSI.",
    benefits: [
      "Architecture ouverte et API",
      "Intelligence distribuée",
      "Gestion temps réel",
      "Recommandations ANSSI",
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
  },
  {
    slug: "intrusion-detection",
    title: "Détection d'intrusion",
    shortTitle: "Intrusion",
    product: "Centrale d'alarme · NFA2P",
    icon: Radar,
    summary:
      "Détection intérieure et périmétrique autour d'une centrale conforme NFA2P, pilotée de façon transparente depuis Amadeus.",
    intro:
      "La détection est réellement efficace lorsqu'elle est contextualisée, corrélée et reliée à un processus de réponse.",
    problem:
      "Des détecteurs disjoints génèrent du bruit, ralentissent la qualification d'incident et obligent les équipes à naviguer entre plusieurs outils sous pression.",
    solution:
      "Une centrale d'alarme autonome fournit la couche de détection, normée NFA2P, supervisée de façon transparente dans Amadeus pour un poste opérateur unique.",
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
      src: mediaLibrary.stockAccessKeypad,
      alt: "Clavier de commande rétroéclairé fixé au mur",
    },
  },
  {
    slug: "video-surveillance",
    title: "Vidéosurveillance",
    shortTitle: "Vidéosurveillance",
    product: "VMS multi-fabricants",
    icon: Video,
    summary:
      "Plateforme VMS universelle : ouverte, intuitive, évolutive, multi-fabricants caméras.",
    intro:
      "La vidéo ne doit pas seulement enregistrer. Elle doit aider les équipes à détecter, investiguer et coordonner sereinement.",
    problem:
      "De nombreux parcs vidéo deviennent de simples archives coûteuses, faute d'interfaces, de stockage et de workflows réellement pensés pour l'exploitation.",
    solution:
      "Le VMS relie caméras, postes opérateurs, stockage et relecture dans un système unifié, avec analyse de timeline, détection de mouvement et compatibilité multi-marques.",
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
      src: mediaLibrary.stockCameraMast,
      alt: "Mât équipé de plusieurs caméras de vidéosurveillance",
    },
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
      src: mediaLibrary.stockCamera,
      alt: "Caméra de vidéosurveillance fixée sur un mur",
    },
  },
  {
    slug: "smart-integrations",
    title: "Intégrations tierces",
    shortTitle: "Intégrations",
    product: "Biométrie · LPR · IoT · Sans fil",
    icon: Blocks,
    summary:
      "Biométrie, LPR, IoT, armoires à clés et protection périmétrique connectés sans verrouillage.",
    intro:
      "La qualité d'intégration détermine si une plateforme de sûreté devient un vrai système d'exploitation du site ou une juxtaposition d'outils.",
    problem:
      "Les intégrations point à point créent fragilité, dépendances opaques et difficultés futures de maintenance.",
    solution:
      "Novadis relie biométrie (réseau veineux, empreinte CNIL), LPR (ANPR), lecteurs de porte sans fil, armoires à clés, gestion visiteurs et protection périmétrique sismique dans des architectures documentées.",
    benefits: [
      "Stratégie système ouvert",
      "Interopérabilité fournisseur",
      "Parcours unifiés",
      "Souplesse à long terme",
    ],
    capabilities: [
      "Biométrie & LPR",
      "IoT et capteurs",
      "Armoires à clés & périmétrie",
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
      poster: mediaLibrary.presentVideoPoster,
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
      "Infrastructures critiques, défense et énergie : haute disponibilité, exigences ANSSI et traçabilité forensique pour les environnements réglementés.",
    challenges: [
      "Exigences d'uptime absolues",
      "Pression réglementaire OIV",
      "Traçabilité des incidents",
      "Événements à fort impact",
    ],
    outcomes: [
      "Recommandations ANSSI appliquées",
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
      "Hôpitaux, lieux culturels, grands magasins : concilier ouverture au public, protection des zones sensibles et continuité d'exploitation sous forte affluence.",
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
      "Cadrage du périmètre, analyse des usages et des contraintes techniques, architecture de sûreté adaptée, aux côtés du bureau d'études et de l'installateur.",
    deliverables: ["Mémoire technique", "Analyse fonctionnelle", "Architecture cible"],
  },
  {
    step: "02",
    title: "Design",
    description:
      "Conception détaillée des équipements, logiciels, réseaux, stockage et parcours opérateurs.",
    deliverables: ["Tableau des asservissements", "Note de calcul vidéo", "Plans graphiques de supervision"],
  },
  {
    step: "03",
    title: "Déploiement",
    description:
      "Préparation en atelier, mise en service, migration et validation, en coordination avec l'installateur et les environnements en activité.",
    deliverables: ["Préparation en atelier", "Mise en service", "Essais et PV de recette"],
  },
  {
    step: "04",
    title: "Maintenance",
    description:
      "Support cycle de vie, maintenance préventive, mises à jour et interventions pour la continuité métier.",
    deliverables: ["Formation des exploitants", "Maintenance préventive et corrective", "Mises à jour applicatives"],
  },
];

export const differentiators = [
  "Pionnier du full-IP et de l'hyper-convergence : contrôle d'accès, vidéosurveillance et intrusion réunis sur une seule interface",
  "Distributeur exclusif d'Amadeus en France",
  "Paramétrage 100 % réalisé par les ingénieurs Novadis, matériel comme logiciel",
  "Présent en amont des appels d'offres, aux côtés des bureaux d'études, pour cadrer le cahier des charges",
];

export type Challenge = {
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
  points: string[];
  href: string;
};

export const challenges: Challenge[] = [
  {
    slug: "systemes-en-silo",
    title: "Sortir des consoles en silo",
    icon: MonitorPlay,
    description:
      "Vidéo, contrôle d'accès et intrusion vivent dans des outils séparés : les opérateurs corrèlent mal et la décision ralentit.",
    points: ["Poste opérateur unique", "Corrélation d'alarmes", "Procédures pilotées"],
    href: "/solutions/supervision",
  },
  {
    slug: "conformite-nis2",
    title: "Répondre à NIS2 et aux exigences ANSSI",
    icon: ShieldCheck,
    description:
      "La sûreté physique entre dans le périmètre cyber : vos systèmes d'accès doivent être auditables et souverains.",
    points: ["Recommandations ANSSI appliquées", "Traçabilité auditable", "Architecture maîtrisée"],
    href: "/solutions/access-control",
  },
  {
    slug: "migration-sans-interruption",
    title: "Migrer sans interrompre l'exploitation",
    icon: RefreshCw,
    description:
      "Moderniser un système vieillissant sur un site en activité exige une migration par phases, coordonnée et réversible.",
    points: ["Migration par phases", "Coordination chantier", "Continuité 24/7"],
    href: "/services",
  },
  {
    slug: "reseau-multi-sites",
    title: "Piloter des dizaines de sites",
    icon: Network,
    description:
      "Groupes et enseignes ont besoin d'un référentiel unique pour superviser un parc hétérogène avec cohérence.",
    points: ["Référentiel unifié", "Supervision centralisée", "Roll-out maîtrisé"],
    href: "/secteurs",
  },
  {
    slug: "biometrie-cnil",
    title: "Déployer la biométrie dans le cadre CNIL",
    icon: Fingerprint,
    description:
      "Réseau veineux, empreinte : la biométrie renforce les zones sensibles à condition de respecter le cadre réglementaire.",
    points: ["Déploiements conformes CNIL", "Zones à haut risque", "Parcours fluides"],
    href: "/solutions/smart-integrations",
  },
  {
    slug: "charge-operateur",
    title: "Réduire la charge opérateur",
    icon: Gauge,
    description:
      "Des milliers de flux et d'événements saturent les équipes : l'analyse d'image trie, priorise et accélère la levée de doute.",
    points: ["Alertes priorisées", "LPR & comportements", "Investigations courtes"],
    href: "/solutions/ai-video-analytics",
  },
];

export type RegulatoryTopic = {
  slug: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  media: string;
};

export const regulatoryTopics: RegulatoryTopic[] = [
  {
    slug: "nis2",
    title: "NIS2",
    description:
      "La directive NIS2 étend les obligations de cybersécurité aux systèmes de sûreté physique. Novadis conçoit des architectures alignées sur les recommandations ANSSI, segmentées et auditables, pour aborder l'échéance sans refonte brutale.",
    href: "/solutions/access-control",
    linkLabel: "Voir notre approche",
    media: mediaLibrary.stockDatacenter,
  },
  {
    slug: "biometrie-cnil",
    title: "Biométrie & CNIL",
    description:
      "Le cadre CNIL encadre strictement la biométrie sur le lieu de travail. Novadis déploie réseau veineux et empreinte digitale dans les règles : finalité justifiée, gabarits maîtrisés, traçabilité complète.",
    href: "/solutions/smart-integrations",
    linkLabel: "Lire la suite",
    media: mediaLibrary.stockBiometrics,
  },
];

export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const navItems: NavItem[] = [
  {
    href: "/solutions",
    label: "Solutions",
    children: [
      ...solutions.map((solution) => ({
        href: `/solutions/${solution.slug}`,
        label: solution.shortTitle,
      })),
      { href: "/solutions", label: "Toutes les solutions" },
    ],
  },
  {
    href: "/secteurs",
    label: "Secteurs",
    children: [
      ...industries.map((industry) => ({
        href: `/secteurs#${industry.slug}`,
        label: industry.title,
      })),
      { href: "/secteurs", label: "Tous les secteurs" },
    ],
  },
  { href: "/references", label: "Références" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export type PartnerKind = "norm" | "association";

export const partners: { name: string; role: string; kind: PartnerKind }[] = [
  { name: "ANSSI", role: "Recommandations", kind: "norm" },
  { name: "NFA2P", role: "Norme intrusion", kind: "norm" },
  { name: "CNIL", role: "Biométrie", kind: "norm" },
  { name: "SPAC Alliance", role: "Association professionnelle", kind: "association" },
];

export const trustSignals = [
  "Membre SPAC Alliance",
  "Recommandations ANSSI",
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

export type ArchitectureLayer = {
  id: "operators" | "core" | "field";
  label: string;
  nodes: { slug: string; x: number; y: number }[];
};

// Ordered bottom → top; x/y are isometric grid coordinates on an 8 × 5 plate.
export const architectureLayers: ArchitectureLayer[] = [
  {
    id: "field",
    label: "Terrain",
    nodes: [
      { slug: "access-control", x: 1.6, y: 1.3 },
      { slug: "intrusion-detection", x: 3, y: 3.8 },
      { slug: "video-surveillance", x: 5.4, y: 1.3 },
      { slug: "smart-integrations", x: 6.6, y: 3.8 },
    ],
  },
  {
    id: "core",
    label: "Réseau IP Sûreté",
    nodes: [{ slug: "it-infrastructure", x: 4, y: 2.5 }],
  },
  {
    id: "operators",
    label: "Postes opérateurs",
    nodes: [
      { slug: "supervision", x: 2.4, y: 2.5 },
      { slug: "ai-video-analytics", x: 5.8, y: 2.5 },
    ],
  },
];

// Mobile AR preview of the hero camera (model: design/3d/axis-p1465-le.blend, ~ 37 cm with its wall mount).
// The brand lettering on the hood is detached from the exported scenes: no maker is named on the site.
export const arPreview = {
  label: "Voir dans votre espace",
  title: "Caméra bullet extérieure",
  glb: "/novadis/models/axis-p1465-le-ar.glb",
  usdz: "/novadis/models/axis-p1465-le.usdz",
};

// Scroll-scrubbed badge door film on the access-control page (Higgsfield, _sources/higgsfield/access_door.mp4).
// Une image sur deux du film (24 i/s) : badge présenté (0-20), LED verte à 21, portes qui s'ouvrent dès 47.
// anchors[frame] = [x, y, échelle] du lecteur, en fraction de l'image (suivi de la LED).
export const badgeDoor = {
  solutionSlug: "access-control",
  eyebrow: "Amadeus",
  title: "Un accès, en trois temps",
  frameCount: 97,
  framePath: (index: number) => `/novadis/sequences/access-door/${String(index).padStart(2, "0")}.webp`,
  anchors: accessDoorAnchors as [number, number, number][],
  staticFrame: 36,
  beats: { granted: 21, open: 47 },
  steps: [
    { label: "Badge présenté", text: "Le lecteur identifie le badge et interroge le contrôleur de la porte." },
    { label: "Droit vérifié", text: "Intelligence distribuée : le contrôleur décide localement, en une fraction de seconde." },
    { label: "Porte ouverte, événement tracé", text: "Gestion temps réel : l'accès est journalisé et remonte aussitôt à la supervision." },
  ],
  hud: {
    reader: "Lecteur · Porte 01",
    reading: "Lecture du badge",
    badgeId: "ID 04·7A·19·C2",
    granted: "Droit valide",
    decision: "Décision locale",
  },
  event: { title: "Accès autorisé", detail: "Porte 01 · Hall d'accueil", logged: "Journalisé · supervision" },
  scrollHint: "Faites défiler",
};

// Scroll-scrubbed intrusion film on the intrusion page (Higgsfield, _sources/higgsfield/intrusion/).
// Une image sur deux du film : silhouette dès 10, LED rouge à 33, sirène dès 37, avancée vers le détecteur dès 48.
// anchors.detector[frame] / anchors.intruder[frame] = [x0, y0, x1, y1] en fraction de l'image (suivis sur le film).
export const intrusionScene = {
  solutionSlug: "intrusion-detection",
  eyebrow: "Détection d'intrusion",
  title: "Une intrusion, en trois temps",
  frameCount: 97,
  framePath: (index: number) => `/novadis/sequences/intrusion/${String(index).padStart(2, "0")}.webp`,
  anchors: intrusionAnchors as {
    detector: [number, number, number, number][];
    intruder: ([number, number, number, number] | null)[];
  },
  staticFrame: 45,
  beats: { detected: 33, escalated: 54 },
  steps: [
    { label: "Zone sous surveillance", text: "Capteurs intérieurs et extérieurs : la centrale d'alarme veille en continu sur chaque zone armée." },
    { label: "Intrusion détectée", text: "Conforme NFA2P : le détecteur déclenche, la centrale qualifie l'alarme et la localise." },
    { label: "Escalade immédiate", text: "Supervision unifiée : l'alarme remonte aussitôt dans Amadeus, l'opérateur engage la réponse." },
  ],
  hud: {
    detector: "Détecteur · Zone 04",
    armed: "Zone armée",
    watching: "Surveillance active",
    detected: "Mouvement détecté",
    panel: "Centrale d'alarme · NFA2P",
    intruder: "Intrus",
  },
  event: { title: "Intrusion · Zone 04", detail: "Entrepôt · Allée B", logged: "Remontée à Amadeus" },
  scrollHint: "Faites défiler",
};

// Scroll-scrubbed exploded view rendered in Blender (design/3d/novadis-3d-scene.blend).
// Séquence Blender (design/3d/novadis-explode-v2.blend) : la caméra s'ouvre (frames 14-60),
// les capteurs s'allument (64-80) puis le PTZ balaie (82-99).
// anchors[frame][label] = position projetée de la pièce, en fraction de l'image (exportée de Blender).
export const axisExplode = {
  solutionSlug: "video-surveillance",
  eyebrow: "Caméra multicapteur",
  title: "Une caméra, pièce par pièce",
  description:
    "Faites défiler pour ouvrir la caméra : quatre capteurs couvrent les alentours, le dôme PTZ vient zoomer sur l'événement.",
  scrollHint: "Faites défiler",
  frameCount: 100,
  framePath: (index: number) => `/novadis/sequences/axis-explode/${String(index).padStart(2, "0")}.webp`,
  anchors: explodeAnchors as [number, number][][],
  labelsFrom: 58,
  labels: [
    { label: "Support mural", side: "left" },
    { label: "Capot de protection", side: "right" },
    { label: "Capteurs multidirectionnels (×4)", side: "left" },
    { label: "Bulle de protection", side: "right" },
    { label: "Dôme PTZ", side: "right" },
  ] satisfies { label: string; side: "left" | "right" }[],
  steps: [
    { title: "Ouvrir", text: "Support, capot, bulle : une architecture modulaire, pensée pour la pose et la maintenance." },
    { title: "Couvrir", text: "Quatre capteurs couvrent les alentours, le dôme PTZ zoome sur l'événement." },
  ],
};

// Vignette 3D du hero /solutions : une pièce équipée qui résume l'offre (poste d'hypervision,
// porte à badge, caméra, baie serveur). anchor = point visé par l'étiquette, en mètres dans la scène
// (components/three/solutions-hero-room.tsx), side = direction où part l'étiquette. Le CMS remplace les
// libellés par position.
export const solutionsHeroModel = {
  name: "Un site, une seule supervision",
  hint: "Badge, porte, caméra et serveurs remontent au même poste.",
  callouts: [
    { id: "hypervision", label: "Poste d'hypervision", anchor: [0.45, 1.42, -0.99], side: "up" },
    { id: "access", label: "Contrôle d'accès", anchor: [-2.74, 1.05, 1.27], side: "down" },
    { id: "video", label: "Vidéosurveillance", anchor: [-1.45, 2.15, -1.9], side: "left" },
    { id: "server", label: "Serveurs · accès sécurisé", anchor: [2.38, 2.5, -1.86], side: "up" },
  ] satisfies { id: string; label: string; anchor: [number, number, number]; side: "left" | "right" | "up" | "down" }[],
  // Textes de l'ancien hero caméra, encore enregistrés dans le global CMS « Démos » : ignorés au
  // profit des valeurs ci-dessus tant que le CMS ne les a pas remplacés.
  retired: ["Caméra bullet extérieure", "Faites pivoter la caméra", "Éclairage IR intégré", "Support mural"],
};

// Scroll-driven 3D story on /solutions: an alarm travels from the field to the operators.
// Sets: design/3d/alarm-journey-sets.blend. Video wall feeds are crops of the site film's last frame;
// the alarm screen plays the gate camera film (Higgsfield, sources in _sources/higgsfield/journey/).
export const alarmJourney = {
  eyebrow: "Architecture",
  title: "L'architecture compte autant que les équipements",
  feed: "/novadis/images/hero/site-end.webp",
  gateFeed: "/novadis/videos/journey-gate.mp4",
  detection: "Intrusion · Portail 01",
  steps: [
    { layer: "field", slug: "video-surveillance" },
    { layer: "core", slug: "it-infrastructure" },
    { layer: "operators", slug: "supervision" },
  ] satisfies { layer: ArchitectureLayer["id"]; slug: string }[],
};

// Film du hero d'accueil : plan drone qui se fige, puis les repères se verrouillent sur le site.
// Coordonnées en % de l'image finale 16:9 (posterEnd), à remesurer si le film change.
export const heroFilm = {
  status: "Actif",
  video: "/novadis/videos/hero-site.mp4",
  posterStart: "/novadis/images/hero/site-start.webp",
  posterEnd: "/novadis/images/hero/site-end.webp",
  focusX: 72,
  hub: "supervision",
  markers: [
    { slug: "supervision", x: 75.9, y: 28, side: "right" },
    { slug: "video-surveillance", x: 68.4, y: 53, side: "right" },
    { slug: "access-control", x: 75, y: 63.1, side: "right" },
    { slug: "intrusion-detection", x: 51.9, y: 65.8, side: "right" },
  ] satisfies { slug: string; x: number; y: number; side: "left" | "right" }[],
  perimeter: [
    [
      [29.4, 42.2],
      [24.4, 68.7],
      [61.9, 65.6],
    ],
    [
      [80.6, 64.4],
      [100, 63.3],
    ],
  ] satisfies [number, number][][],
};

export const serviceCommitments = [
  "Documentation technique remise à la recette",
  "Coordination avec l'installateur, l'IT et les autres lots",
  "Maintenance préventive planifiée par site",
  "Hotline de 8 h à 18 h et intervention sous 48 h ouvrées",
];

export const aboutHighlights: { label: string; icon: LucideIcon }[] = [
  { label: "Pionnier du full-IP et de l'hyper-convergence", icon: Award },
  { label: "Distributeur exclusif d'Amadeus en France", icon: KeyRound },
  { label: "Paramétrage 100 % interne", icon: Users },
];

export const aboutApproach = [
  "Une coordination transverse entre IT, services généraux et équipes sûreté",
  "Des choix technologiques guidés par l'interopérabilité plutôt que par le verrouillage fournisseur",
  "Des modèles de maintenance pensés pour l'uptime et l'évolution à long terme",
  "Une responsabilité sur l'ensemble du cycle de vie : études, mise en service, recette, formation et maintenance",
];

export const contactDetails = {
  email: "com@novadis.eu",
  phone: "+33 1 41 34 09 90",
  phoneHref: "tel:+33141340990",
  addressLines: ["14-16 Rue Clément Bayard", "92300 Levallois-Perret · France"],
  regions: "France",
};

export const contactChannels: { label: string; value: string; href: string; icon: LucideIcon }[] = [
  { icon: Mail, label: "Email", value: contactDetails.email, href: `mailto:${contactDetails.email}` },
  { icon: Phone, label: "Téléphone", value: contactDetails.phone, href: contactDetails.phoneHref },
  {
    icon: MapPin,
    label: "Adresse",
    value: "14-16 Rue Clément Bayard, 92300 Levallois-Perret",
    href: "https://maps.google.com/?q=14-16+Rue+Cl%C3%A9ment+Bayard+Levallois-Perret",
  },
];

export const contactTopics = [
  "Infrastructure existante et contraintes de site",
  "Exigences de contrôle d'accès et d'identité",
  "Vidéo, analyse, preuves et workflows d'investigation",
  "Maintenance, uptime et attentes de gouvernance",
];

// Fiche Supervision globale : PC sécurité modélisé (design/3d/supervision-room.blend).
// Chaque repère pointe un écran du mur (Screen_0..5, 3 x 2, de gauche à droite puis de haut en bas).
export const supervisionRoom = {
  solutionSlug: "supervision",
  challengeSlug: "systemes-en-silo",
  model: "/novadis/models/supervision-room.glb",
  poster: "/novadis/images/supervision/supervision-room.webp",
  feed: "/novadis/images/hero/site-end.webp",
  caption: "Modélisation 3D · interfaces illustratives",
  points: [
    { slug: "video-surveillance", screen: 0 },
    { slug: "access-control", screen: 2 },
    { slug: "ai-video-analytics", screen: 3 },
    { slug: "intrusion-detection", screen: 4 },
  ],
};

export const heroTechnologies = ["Amadeus"];

export const architecturePoints: { label: string; icon: LucideIcon }[] = [
  { label: "Couche opérationnelle unifiée", icon: Workflow },
  { label: "Corrélation inter-systèmes", icon: Network },
  { label: "Conception durcie & maintenable", icon: ShieldCheck },
  { label: "Intégrations prêtes pour l'évolution", icon: Sparkles },
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
