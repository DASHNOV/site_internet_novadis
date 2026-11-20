export const technologyPartnersTitle = "Nos partenaires technologiques";

export const technologyPartners = [
  { name: "DDS", logo: "/novadis/logos/partners/dds.webp" },
  { name: "HID", logo: "/novadis/logos/partners/hid.svg" },
  { name: "STid", logo: "/novadis/logos/partners/stid.svg" },
  { name: "FDI", logo: "/novadis/logos/partners/fdi.webp" },
  { name: "DOM", logo: "/novadis/logos/partners/dom.svg" },
  { name: "U&Z", logo: "/novadis/logos/partners/uz.svg" },
  { name: "Evolis", logo: "/novadis/logos/partners/evolis.svg" },
  { name: "Octave", logo: "/novadis/logos/partners/octave.svg" },
  { name: "Milestone", logo: "/novadis/logos/partners/milestone.svg" },
  { name: "Nx Witness", logo: "/novadis/logos/partners/nx-witness.svg" },
  { name: "Axis", logo: "/novadis/logos/partners/axis.svg" },
  { name: "C-Q-IT", logo: "/novadis/logos/partners/cqit.svg" },
  { name: "Milesight", logo: "/novadis/logos/partners/milesight.webp" },
  { name: "Dell", logo: "/novadis/logos/partners/dell.svg" },
  { name: "Sharry", logo: "/novadis/logos/partners/sharry.webp" },
  { name: "CIAS", logo: "/novadis/logos/partners/cias.webp" },
  { name: "Barox", logo: "/novadis/logos/partners/barox.svg" },
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
