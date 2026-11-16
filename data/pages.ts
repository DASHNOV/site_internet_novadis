// Textes des pages et des blocs communs. Un titre en deux tons sépare la partie en encre (`lead`)
// de la suite en gris (`accent`) ; un titre en simple chaîne est coupé automatiquement par <SplitTitle>.
export type AccentText = { lead: string; accent?: string };

export const uiLabels = {
  learnMore: "En savoir plus",
};

export const headerCopy = {
  tagline: "Solutions globales de sûreté",
  contactCta: "Prendre contact",
  menuLabel: "Menu",
};

export const footerCopy = {
  description:
    "Créateur de solutions globales de sûreté. De l'infrastructure informatique à l'analyse d'image, Novadis livre des systèmes pensés pour la durée et l'exploitation.",
  hashtag: "#DetailsMakeTheDifference",
  navigationTitle: "Navigation",
  contactTitle: "Contact",
  complianceTitle: "Conformité",
  rights: "Novadis · Tous droits réservés",
  legalLabel: "Mentions légales",
  privacyLabel: "Confidentialité",
};

export const ctaBannerCopy = {
  title: { lead: "Construisez un environnement de sûreté", accent: "pensé pour le réel" } satisfies AccentText,
  description:
    "Infrastructures, contrôle d'accès, vidéosurveillance, convergence, modernisation ou maintenance — échangez avec Novadis sur vos contraintes concrètes.",
  cta: "Demander une consultation",
  consoleTitle: "Contact direct",
  emailLabel: "Email",
  phoneLabel: "Téléphone",
  scopeLabel: "Périmètre",
  scope: "Grandes entreprises · sites industriels · infrastructures critiques · multi-sites",
};

export const normsCopy = {
  title: "Normes & engagements",
  description:
    "Un cadre normatif clair et des engagements professionnels pour bâtir des architectures ouvertes, normées et tenues dans la durée.",
  normsTitle: "Conformité & normes",
  associationsTitle: "Associations professionnelles",
  memberPrefix: "Membre",
};

export const supervisionRoomCopy = {
  posterAlt: "Salle de supervision modélisée : mur de six écrans, pupitre à trois moniteurs, deux postes opérateurs",
  dragHint: "Faites glisser pour pivoter",
  consoleTitle: "Poste opérateur unique",
  systemsSuffix: "systèmes",
  shownLabel: "Affiché",
  showLabel: "Afficher",
};

export const homePage = {
  hero: {
    title: { lead: "Protégez vos sites,", accent: "vos équipes et vos données" } satisfies AccentText,
    description:
      "Novadis conçoit, intègre et maintient des systèmes de sûreté pour les entreprises, les sites industriels et les infrastructures critiques. De l'informatique à la supervision intelligente, chaque couche est pensée pour durer.",
    primaryCta: "Prendre contact",
    secondaryCta: "Découvrir les solutions",
    technologiesLabel: "Plateforme exclusive",
  },
  proof: {
    title: "Des environnements à très forte exigence",
    description:
      "Hôpitaux, sites patrimoniaux, environnements de luxe : Novadis opère là où l'erreur n'est pas permise.",
    cta: "Voir toutes nos références",
  },
  architecture: {
    title: { lead: "L'architecture compte", accent: "autant que les équipements" } satisfies AccentText,
    description:
      "Chez Novadis, la valeur ne vient pas d'une juxtaposition de briques techniques. Elle vient d'un système cohérent, documenté, évolutif et lisible pour les équipes qui l'exploitent.",
    diagramCaption: "Architecture de principe · Réseau IP Sûreté Novadis",
    diagramLabel: "Architecture de principe Novadis — réseau IP sûreté, serveurs, postes opérateurs, terrain",
  },
  challenges: {
    title: { lead: "Chaque projet commence", accent: "par un problème concret" } satisfies AccentText,
    description:
      "Conformité, migration, multi-sites, charge opérateur : partez de votre enjeu, nous le relions à la bonne architecture.",
  },
  solutions: {
    title: { lead: "Des briques métiers", accent: "conçues pour fonctionner ensemble" } satisfies AccentText,
    description:
      "Chaque domaine apporte sa propre valeur. L'avantage Novadis est de les faire converger en un environnement homogène, durable et lisible.",
    cta: "Voir toutes les solutions",
  },
  sectors: {
    title: "Des systèmes adaptés à la logique réelle de chaque environnement",
  },
  method: {
    title: { lead: "Trois temps qui structurent", accent: "chaque projet de sûreté" } satisfies AccentText,
    description:
      "Nos clients ne cherchent pas une brique technique, mais un partenaire capable de cadrer, faire converger et inscrire la sûreté dans la durée.",
    cta: "Voir la méthodologie",
  },
  compliance: {
    title: "La réglementation redessine la sûreté",
    description:
      "NIS2, ANSSI, CNIL : les échéances réglementaires deviennent le premier déclencheur des projets de sûreté. Nous les transformons en feuille de route.",
  },
  about: {
    mediaCaption: "Novadis · 14-16 Rue Clément Bayard · Levallois-Perret",
    title: { lead: "Une ingénierie centrée", accent: "sur l'humain et la continuité de service" } satisfies AccentText,
    description:
      "Novadis combine expertise infrastructure, expérience terrain et discipline d'intégration pour livrer des systèmes que les équipes peuvent exploiter durablement, pas seulement valider sur le papier.",
    quote: "L'Homme et sa sécurité doivent constituer la première préoccupation de toute aventure technologique.",
    quoteAuthor: "Albert Einstein",
    cta: "Découvrir Novadis",
  },
};

export const solutionsPage = {
  hero: {
    title: "Un portefeuille modulaire conçu comme un système cohérent",
    description:
      "Un environnement de sûreté complet couvre l'infrastructure, l'accès, la détection, la vidéo, l'analyse et les intégrations. Cette page montre comment Novadis structure chaque couche.",
  },
  detailCta: "Voir le détail",
};

export const solutionDetailPage = {
  backLink: "Retour aux solutions",
  contextTitle: "Le contexte que nous rencontrons",
  capabilitiesTitle: "Capacités clés",
  answerTitle: "Comment nous y répondons",
  benefitsTitle: "Bénéfices",
  outcomesTitle: "Ce que cela change sur le terrain",
};

export const sectorsPage = {
  hero: {
    title: "Des systèmes adaptés à la logique d'exploitation de chaque environnement",
    description:
      "La conception de la sûreté change selon qu'il s'agit d'un campus, d'une usine, d'une plateforme logistique ou d'un environnement critique. Novadis adapte l'architecture à la réalité du terrain.",
    mediaCaption: "Tertiaire · convergence multi-sites",
  },
  navLabel: "Secteurs",
  challengesTitle: "Enjeux du terrain",
  outcomesTitle: "Bénéfices observés",
};

export const servicesPage = {
  hero: {
    title: "Un modèle de delivery rigoureux pour les environnements de sûreté complexes",
    description:
      "Nos services couvrent l'ensemble du cycle de vie : audit, conception, déploiement, maintenance et formation. L'objectif : protéger la qualité de déploiement, limiter les surprises lors des mises en service et préserver la maintenabilité à long terme.",
    mediaAlt: "Présentation Novadis",
    mediaCaption: "Démonstration · Services Novadis",
  },
  deliverablesSuffix: "livrables",
  method: {
    title: { lead: "Une méthode conçue", accent: "pour rester opérationnelle après le déploiement" } satisfies AccentText,
    commitmentsTitle: "Engagement Novadis",
  },
};

export const referencesPage = {
  hero: {
    title: "Des architectures de sûreté éprouvées sur le terrain",
    description:
      "Chaque projet est unique. Ces cas illustrent comment Novadis adapte son expertise aux contraintes réelles de chaque environnement — du siège en immeuble de grande hauteur au CHU, de la maison de luxe au réseau d'eau potable.",
  },
  disclaimer: "Les cas présentés sont anonymisés ; les données techniques et les périmètres restent réels.",
  featuredTitle: "Des environnements à très forte exigence",
  sectorsTitle: "Déploiements par secteur",
  deployedSolutionsTitle: "Solutions déployées",
  footnote: "D'autres références sont disponibles sur demande, sous accord de confidentialité.",
  solutionLabels: {
    supervision: "Supervision globale",
    "it-infrastructure": "Infrastructure IT",
    "access-control": "Contrôle d'accès",
    "intrusion-detection": "Détection intrusion",
    "video-surveillance": "Vidéosurveillance",
    "ai-video-analytics": "Analyse d'image",
    "smart-integrations": "Intégrations",
  } as Record<string, string>,
};

export const aboutPage = {
  hero: {
    title: "Une ingénierie centrée sur l'humain pour les environnements où la fiabilité compte",
    description:
      "Novadis s'adresse aux organisations qui ont besoin de systèmes capables de fonctionner durablement, en conditions réelles d'exploitation, entre plusieurs équipes et sur plusieurs années.",
    mediaAlt: "Deux ingénieurs annotent un plan d'implantation",
    mediaCaption: "Équipes à taille humaine · Levallois-Perret",
  },
  human: {
    title: "L'humain au cœur de chaque projet technologique",
    description:
      "Novadis combine expertise infrastructure, expérience terrain et discipline d'intégration pour réduire la fragmentation entre cyber et sûreté physique. Nos équipes accompagnent chaque projet de l'analyse de besoin à la maintenance et la formation des opérateurs.",
    approachTitle: "Approche",
  },
  vision: {
    title: "La vision Novadis en 40 secondes",
    description:
      "Alexis Roumelian (Directeur Général) et Nicolas Jdanoff (Directeur Commercial) présentent l'approche Novadis lors de l'interview SPAC Members — convergence, expertise et engagement terrain.",
    people: [
      { name: "Alexis Roumelian", role: "Directeur Général" },
      { name: "Nicolas Jdanoff", role: "Directeur Commercial" },
      { name: "SPAC Members", role: "Interview" },
    ],
  },
  spectrum: {
    title: "Un spectre complet, pensé pour la convergence",
    description:
      "De la supervision à la protection périmétrique, de l'informatique embarquée à la biométrie — Novadis couvre l'ensemble des disciplines qui constituent un système de sûreté global et cohérent.",
    schemaAlt: "Schéma des solutions globales de sûreté Novadis",
  },
  members: {
    title: "Membres et standards qui structurent nos engagements",
    description:
      "Novadis exerce dans le respect des normes du secteur et des cadres réglementaires applicables aux systèmes de sûreté. Nos partenariats stratégiques sécurisent la chaîne de valeur de bout en bout.",
  },
};

export const contactPage = {
  hero: {
    title: "Démarrez une conversation de sûreté ancrée dans votre réalité opérationnelle",
    description:
      "Partagez le profil de votre site, vos objectifs de modernisation, vos contraintes ou vos exigences d'intégration. Novadis peut cadrer un projet de site unique comme un environnement multi-sites.",
    mediaAlt: "Réunion de cadrage autour d'une table dans un bureau",
    mediaCaption: "Échanges directs · cadrage sur site",
  },
  topicsTitle: "Les éléments que nous abordons en première discussion",
  meetingNote:
    "Vous préférez une rencontre directe ? Nous nous déplaçons sur vos sites partout en France pour cadrer le projet en conditions réelles.",
  formTitle: { lead: "Un message direct,", accent: "traité par l'équipe ingénierie" } satisfies AccentText,
};
