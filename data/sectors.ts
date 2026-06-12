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
        title: "Siège corporate · 3 000 collaborateurs",
        body:
          "Contrôle d'accès multi-sites unifié, préinscription visiteurs en ligne, 200 caméras supervisées depuis un PC sûreté unique.",
      },
      {
        title: "Campus technologique",
        body:
          "Zones de R&D cloisonnées, biométrie CNIL sur les labs, supervision 24/7 depuis un centre de sûreté dédié.",
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
        title: "Site industriel classé Seveso",
        body:
          "Protection périmétrique radar + vidéo, détection intrusion NFA2P type 3, architecture ANSSI-compliant.",
      },
      {
        title: "Data-center Tier III",
        body:
          "Contrôle d'accès biométrique en cages, LPR parking, supervision temps réel et traçabilité forensique.",
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
        title: "Plateforme logistique 80 000 m²",
        body:
          "LPR sur quais, contrôle d'accès chauffeurs intégré au TMS, analyse vidéo des aires de stockage.",
      },
      {
        title: "Hub e-commerce multi-niveaux",
        body:
          "Lecteurs Aperio sans fil sur 300 portes, supervision unifiée des flux et incidents en temps réel.",
      },
    ],
  },
  {
    slug: "sites-sensibles",
    title: "Sites sensibles",
    tagline: "Infrastructures critiques, défense, énergie.",
    desc:
      "Les environnements OIV et réglementés exigent haute disponibilité, conformité ANSSI et traçabilité forensique de bout en bout.",
    challenges: [
      "Exigences d'uptime absolues",
      "Conformité ANSSI et OIV",
      "Traçabilité des incidents",
      "Événements à fort impact",
    ],
    solutions: ["supervision", "intrusion-detection", "access-control"],
    examples: [
      {
        title: "Site OIV énergie",
        body:
          "Architecture ANSSI-compliant, périmètre radar + vidéo, supervision globale corrélée et procédures de crise pilotées.",
      },
      {
        title: "Centre de traitement valeurs",
        body:
          "Zones fortes avec double authentification, temporisation, pistes d'audit chiffrées, télésurveillance redondée.",
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
        title: "Réseau de 200 agences bancaires",
        body:
          "Supervision centralisée des alarmes, vidéo contextuelle, télésurveillance redondée IP + GPRS.",
      },
      {
        title: "Enseigne retail 450 points de vente",
        body:
          "Standardisation Amadeus + Ocularis, déploiement piloté par phases, hyperviseur unique au siège.",
      },
    ],
  },
  {
    slug: "erp",
    title: "ERP & environnements publics",
    tagline: "Hôpitaux, gares, centres commerciaux.",
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
        title: "CHU multi-sites",
        body:
          "Contrôle d'accès unifié sur 8 sites, bracelet RFID nouveau-nés, traçabilité pharmacie connectée.",
      },
      {
        title: "Pôle multimodal gare TGV",
        body:
          "5 000 caméras analysées en temps réel, bornes d'appel d'urgence intégrées, orchestration avec le PC exploitation.",
      },
    ],
  },
];

export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);
