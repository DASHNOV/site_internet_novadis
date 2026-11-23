export const technologyPartnersTitle = "Nos partenaires technologiques";

// Nuage de logos : DDS au centre, en plus grand, deux rangées au-dessus et deux en dessous (ordre ci-dessous,
// chaque rangée mêlant logos larges et compacts). `ratio` = largeur / hauteur du fichier, il sert à donner
// à chaque logo le même poids visuel, qu'il soit carré ou très allongé.
export const technologyPartners: { name: string; logo: string; ratio: number; featured?: boolean }[] = [
  { name: "DDS", logo: "/novadis/logos/partners/dds.webp", ratio: 2.28, featured: true },
  { name: "HID", logo: "/novadis/logos/partners/hid.svg", ratio: 2.54 },
  { name: "Axis", logo: "/novadis/logos/partners/axis.svg", ratio: 2.78 },
  { name: "Assa Abloy", logo: "/novadis/logos/partners/assa-abloy.svg", ratio: 7.23 },
  { name: "Milestone", logo: "/novadis/logos/partners/milestone.svg", ratio: 5.61 },
  { name: "STid", logo: "/novadis/logos/partners/stid.svg", ratio: 3.24 },
  { name: "Hikvision", logo: "/novadis/logos/partners/hikvision.svg", ratio: 7.41 },
  { name: "Octave", logo: "/novadis/logos/partners/octave.svg", ratio: 1.52 },
  { name: "Honeywell", logo: "/novadis/logos/partners/honeywell.svg", ratio: 5.61 },
  { name: "DOM", logo: "/novadis/logos/partners/dom.svg", ratio: 1.85 },
  { name: "Survision", logo: "/novadis/logos/partners/survision.svg", ratio: 5.41 },
  { name: "CIAS", logo: "/novadis/logos/partners/cias.webp", ratio: 1 },
  { name: "Vanderbilt", logo: "/novadis/logos/partners/vanderbilt.svg", ratio: 5.22 },
  { name: "Evolis", logo: "/novadis/logos/partners/evolis.svg", ratio: 2.97 },
  { name: "Nx Witness", logo: "/novadis/logos/partners/nx-witness.svg", ratio: 1 },
  { name: "U&Z", logo: "/novadis/logos/partners/uz.svg", ratio: 2 },
  { name: "Milesight", logo: "/novadis/logos/partners/milesight.webp", ratio: 3.66 },
  { name: "FDI", logo: "/novadis/logos/partners/fdi.webp", ratio: 1.78 },
  { name: "C-Q-IT", logo: "/novadis/logos/partners/cqit.svg", ratio: 1.82 },
  { name: "Dell", logo: "/novadis/logos/partners/dell.svg", ratio: 1 },
  { name: "Sharry", logo: "/novadis/logos/partners/sharry.webp", ratio: 4.69 },
  { name: "Barox", logo: "/novadis/logos/partners/barox.svg", ratio: 4.26 },
];

export const partnerTeaser: {
  label: string;
  pendingText: string;
  countdownPrefix: string;
  units: { days: string; hours: string; minutes: string };
  revealAt: string | null;
} = {
  label: "Nouveau partenaire",
  pendingText: "Dévoilement en janvier 2027",
  countdownPrefix: "Dévoilement dans",
  units: { days: "j", hours: "h", minutes: "min" },
  revealAt: null,
};

export const associationLogos: Record<string, string> = {
  "SPAC Alliance": "/novadis/logos/associations/spac.svg",
};
