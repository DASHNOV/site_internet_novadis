import { ScanLine } from "lucide-react";
import type { Solution } from "./site";

// Fiche LiDAR, hors CMS : sous-page du chapitre Protection périmétrique (voir lidarChapter), servie par
// lib/content/build.ts à côté des solutions du CMS. Publiée depuis le 24/11/2026.
export const lidarSolutions: Solution[] = [
  {
    slug: "lidar-3d",
    title: "Détection LiDAR 3D — Octave Coda Spatial",
    shortTitle: "LiDAR 3D",
    product: "Octave Coda Spatial · Ouster OS1",
    icon: ScanLine,
    summary:
      "Détection volumétrique par LiDAR, précise à 3 cm, sur toute la zone protégée et pas seulement en limite de périmètre.",
    intro:
      "Un périmètre ne se résume pas à une ligne : Coda Spatial suit chaque intrus dans tout le volume du site, sur un jumeau numérique en 3D.",
    problem:
      "Barrières et détection vidéo s'arrêtent souvent à la clôture : une fois franchie, l'intrus sort des écrans, tandis que pluie, brouillard ou petits animaux multiplient les fausses alarmes.",
    solution:
      "Octave Coda Spatial (anciennement HxGN dC3 LidarVision) exploite des LiDAR multicouches, comme l'Ouster OS1, pour relever un nuage de points 3D de toute la zone. Chaque objet y est détecté, mesuré et suivi, puis affiché sur une carte 3D qui oriente automatiquement les caméras PTZ.",
    benefits: [
      "Précision de détection de 3 cm",
      "Suivi dans tout le volume",
      "Pluie, neige et brouillard",
      "Moins de fausses alarmes",
    ],
    capabilities: [
      "Zones 3D et pré-alarmes",
      "Filtrage des objets par taille",
      "Pilotage PTZ multi-caméras",
      "Personnes autorisées reconnues",
    ],
    outcomes: [
      "Intrus suivi de bout en bout",
      "Levées de doute plus rapides",
      "Implantation simulée avant travaux",
      "Incidents rejoués en 3D",
    ],
    media: {
      kind: "image",
      src: "/novadis/images/lidar/lidar-office.webp",
      alt: "Nuage de points LiDAR des bureaux Novadis vus de dessus, plafond retiré : couloirs, salles et postes de travail",
    },
  },
];

// La fiche LiDAR est une sous-page du chapitre Protection périmétrique : absente du menu et de la liste des
// solutions, on l'ouvre depuis la fiche parente, et son lien retour y ramène.
export const lidarChapter = {
  slug: "lidar-3d",
  parentSlug: "protection-perimetrique",
  backLabel: "Retour à la protection périmétrique",
  title: "Octave Coda Spatial, en visite libre",
  description:
    "Coda Spatial suit l'intrus dans tout le volume de la zone, bien après la clôture. Parcourez nos bureaux de Levallois-Perret, scannés au LiDAR, et voyez la détection à l'œuvre.",
  cta: "Découvrir Octave Coda Spatial",
  image: "/novadis/images/lidar/lidar-office.webp",
  imageAlt: "Nuage de points LiDAR des bureaux Novadis vus de dessus, plafond retiré : couloirs, salles et postes de travail",
};

// Fiche LiDAR 3D : visite libre des bureaux de Levallois, scannés au XGrids K2 le 25/09/2026.
// Seuls les fichiers utilisés sont versionnés dans public/novadis/lidar/ (les sources brutes de data_LidarVision/
// contiennent des identifiants et un devis : jamais versionnées). Rendu photoréaliste : Gaussian splats de l'export LCC2 du scanner (data_LidarVision/lcc2),
// niveaux 5 (aperçu) et 3 (détail) convertis en SPZ par @playcanvas/splat-transform, rognés au bâtiment.
// La grille de collision et scene.json (trajet, zone) viennent de l'export XYZ, dans le même repère.
export const lidarWalkthrough = {
  eyebrow: "Octave Coda Spatial",
  title: "Entrez dans nos bureaux, scannés au LiDAR",
  description:
    "Ce nuage de points est le relevé réel de nos locaux de Levallois-Perret. Déplacez-vous librement : Coda Spatial vous suit, comme il suit l'intrus qui traverse la zone protégée.",
  grid: "/novadis/lidar/lidar-office-grid.bin",
  layout: "/novadis/lidar/scene.json",
  // Aperçu léger affiché d'abord (≈ 360 000 splats), puis détail chargé en arrière-plan (≈ 1,4 M).
  // lift : hauteur en mètres qui pose le sol des splats sur celui du scan.
  splats: {
    preview: "/novadis/lidar/bureaux-apercu.spz",
    detail: "/novadis/lidar/bureaux-detail.spz",
    lift: 0.98,
  },
  poster: "/novadis/images/lidar/lidar-office.webp",
  posterAlt: "Nuage de points LiDAR des bureaux Novadis vus de dessus, plafond retiré : couloirs, salles et postes de travail",
  caption: "Scan LiDAR · Bureaux Novadis, Levallois-Perret",
  start: "Entrer dans la visite",
  loading: "Chargement du nuage de points",
  error: "Le nuage de points n'a pas pu être chargé.",
  unsupported: "La visite 3D demande un appareil compatible WebGL 2.",
  lockHint: "Cliquez dans la scène pour piloter",
  controls: {
    keyboard: "ZQSD ou flèches : se déplacer · Souris : regarder · Maj : courir · Échap : libérer la souris",
    touch: "Joystick : se déplacer · Glisser : regarder",
  },
  fullscreen: "Plein écran",
  exitFullscreen: "Quitter le plein écran",
  scan: [
    { value: "11,5 M", label: "Points relevés" },
    { value: "25 min", label: "De scan, à pied" },
    { value: "3 cm", label: "Précision de détection" },
  ],
  hud: {
    live: "Coda Spatial · Temps réel",
    zone: "Zone protégée A",
    states: { clear: "Zone armée", prealarm: "Pré-alarme", alarm: "Intrusion" },
    intruder: "Objet 01 · Inconnu",
    visitor: "Vous · Visiteur autorisé",
    height: "Taille",
    speed: "Vitesse",
    inZone: "Dans la zone",
    friendly: "Autorisé, pas d'alarme",
    outside: "Hors zone",
    minimap: "Plan · vue de dessus",
  },
  intruder: { speed: 1.3, height: 1.78 },
  // Marge de la zone de pré-alarme autour de la zone protégée, en mètres.
  prealarmMargin: 2.5,
  eyeHeight: 1.6,
};
