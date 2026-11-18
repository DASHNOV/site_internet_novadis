// Étape 1 de la migration : lit data/ et écrit cms/seed-content.json, déjà rangé selon le modèle Payload.
// Lancé par tsx (qui lit les ancres JSON de data/site.ts) : voir `npm run cms:seed`.
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

// Hors `development`, data/site.ts n'ajoute pas les fiches locales : seules les solutions publiques sont migrées.
(process.env as Record<string, string>).NODE_ENV = "test";

const site = await import("../../data/site");
const pages = await import("../../data/pages");
const { sectors } = await import("../../data/sectors");
const { featuredReferences } = await import("../../data/references");

type Icon = { displayName?: string };
const iconName = (icon: unknown) => {
  const name = (icon as Icon).displayName;
  if (!name) throw new Error("Icône sans nom");
  return name;
};
const lines = (values: readonly string[]) => values.map((value) => ({ value }));
// Les images sont désignées par leur chemin public ; le script Payload les envoie dans la médiathèque.
const img = (src: string, alt: string) => ({ $image: src, alt });

const solutions = site.solutions.map((solution, index) => ({
  slug: solution.slug,
  order: index + 1,
  title: solution.title,
  shortTitle: solution.shortTitle,
  tagLabel: pages.referencesPage.solutionLabels[solution.slug] ?? solution.shortTitle,
  product: solution.product,
  icon: iconName(solution.icon),
  summary: solution.summary,
  intro: solution.intro,
  problem: solution.problem,
  capabilities: lines(solution.capabilities),
  solution: solution.solution,
  benefits: lines(solution.benefits),
  outcomes: lines(solution.outcomes),
  media:
    solution.media.kind === "image"
      ? { kind: "image", image: img(solution.media.src, solution.media.alt), alt: solution.media.alt }
      : { kind: "video", video: solution.media.src, poster: solution.media.poster, alt: solution.media.alt },
}));

const sectorDocs = site.industries.map((industry, index) => {
  const sector = sectors.find((item) => item.slug === industry.slug);
  if (!sector) throw new Error(`Secteur ${industry.slug} absent de data/sectors.ts`);
  return {
    slug: industry.slug,
    order: index + 1,
    title: industry.title,
    icon: iconName(industry.icon),
    summary: industry.summary,
    challenges: lines(industry.challenges),
    outcomes: lines(industry.outcomes),
    image: img(industry.media, industry.title),
    tagline: sector.tagline,
    description: sector.desc,
    solutions: { $solutions: sector.solutions },
    examples: sector.examples,
  };
});

const references = featuredReferences.map((reference, index) => ({
  order: index + 1,
  name: reference.name,
  sector: reference.sector,
  scope: reference.scope,
  image: img(reference.image, reference.name),
  solutions: { $solutions: reference.solutions },
}));

const challenges = site.challenges.map((challenge, index) => ({
  slug: challenge.slug,
  order: index + 1,
  title: challenge.title,
  icon: iconName(challenge.icon),
  description: challenge.description,
  points: lines(challenge.points),
  href: challenge.href,
}));

const { homePage: home } = pages;
const address = site.contactChannels.find((channel) => channel.label === "Adresse");
if (!address) throw new Error("Adresse absente de contactChannels");

const globals = {
  home: {
    hero: {
      ...home.hero,
      technologies: lines(site.heroTechnologies),
    },
    proof: home.proof,
    architecture: {
      ...home.architecture,
      points: site.architecturePoints.map((point) => ({ label: point.label, icon: iconName(point.icon) })),
    },
    challenges: home.challenges,
    solutions: home.solutions,
    sectors: home.sectors,
    method: {
      ...home.method,
      pillars: site.pillars.map((pillar) => ({ ...pillar, points: lines(pillar.points) })),
    },
    compliance: {
      ...home.compliance,
      topics: site.regulatoryTopics.map((topic) => ({
        title: topic.title,
        description: topic.description,
        href: topic.href,
        linkLabel: topic.linkLabel,
        image: img(topic.media, topic.title),
      })),
    },
    about: { ...home.about, differentiators: lines(site.differentiators) },
  },
  "solutions-page": {
    hero: pages.solutionsPage.hero,
    detailCta: pages.solutionsPage.detailCta,
    detail: pages.solutionDetailPage,
  },
  "sectors-page": {
    hero: pages.sectorsPage.hero,
    navLabel: pages.sectorsPage.navLabel,
    challengesTitle: pages.sectorsPage.challengesTitle,
    outcomesTitle: pages.sectorsPage.outcomesTitle,
  },
  "services-page": {
    hero: pages.servicesPage.hero,
    deliverablesSuffix: pages.servicesPage.deliverablesSuffix,
    method: { ...pages.servicesPage.method, commitments: lines(site.serviceCommitments) },
  },
  "references-page": {
    hero: pages.referencesPage.hero,
    disclaimer: pages.referencesPage.disclaimer,
    featuredTitle: pages.referencesPage.featuredTitle,
    sectorsTitle: pages.referencesPage.sectorsTitle,
    deployedSolutionsTitle: pages.referencesPage.deployedSolutionsTitle,
    footnote: pages.referencesPage.footnote,
  },
  "about-page": {
    hero: pages.aboutPage.hero,
    parentGroup: pages.aboutPage.parentGroup,
    human: {
      ...pages.aboutPage.human,
      highlights: site.aboutHighlights.map((item) => ({ label: item.label, icon: iconName(item.icon) })),
      approach: lines(site.aboutApproach),
    },
    vision: pages.aboutPage.vision,
    spectrum: pages.aboutPage.spectrum,
    members: pages.aboutPage.members,
  },
  "contact-page": {
    hero: pages.contactPage.hero,
    channels: Object.fromEntries(
      (["emailLabel", "phoneLabel", "addressLabel"] as const).map((key, index) => [key, site.contactChannels[index].label]),
    ),
    topicsTitle: pages.contactPage.topicsTitle,
    topics: lines(site.contactTopics),
    meetingNote: pages.contactPage.meetingNote,
    formTitle: pages.contactPage.formTitle,
  },
  common: {
    header: pages.headerCopy,
    navigation: {
      items: site.navItems.map((item) => ({ label: item.label, href: item.href })),
      allSolutionsLabel: site.navItems[0].children?.at(-1)?.label,
      allSectorsLabel: site.navItems[1].children?.at(-1)?.label,
    },
    contact: {
      email: site.contactDetails.email,
      phone: site.contactDetails.phone,
      addressLines: lines(site.contactDetails.addressLines),
      addressInline: address.value,
      mapsUrl: address.href,
      regions: site.contactDetails.regions,
    },
    footer: pages.footerCopy,
    ctaBanner: pages.ctaBannerCopy,
    norms: { ...pages.normsCopy, partners: site.partners, trustSignals: lines(site.trustSignals) },
    metrics: { items: site.siteMetrics },
    process: { steps: site.processSteps.map((step) => ({ ...step, deliverables: lines(step.deliverables) })) },
    labels: pages.uiLabels,
  },
  demos: {
    heroFilm: { status: site.heroFilm.status },
    supervisionRoom: { caption: site.supervisionRoom.caption, ...pages.supervisionRoomCopy },
    badgeDoor: {
      eyebrow: site.badgeDoor.eyebrow,
      title: site.badgeDoor.title,
      steps: site.badgeDoor.steps,
      hud: site.badgeDoor.hud,
      event: site.badgeDoor.event,
      scrollHint: site.badgeDoor.scrollHint,
    },
    intrusion: {
      eyebrow: site.intrusionScene.eyebrow,
      title: site.intrusionScene.title,
      steps: site.intrusionScene.steps,
      hud: site.intrusionScene.hud,
      event: site.intrusionScene.event,
      scrollHint: site.intrusionScene.scrollHint,
    },
    axisExplode: {
      eyebrow: site.axisExplode.eyebrow,
      title: site.axisExplode.title,
      description: site.axisExplode.description,
      scrollHint: site.axisExplode.scrollHint,
      labels: site.axisExplode.labels.map((item) => ({ label: item.label })),
      steps: site.axisExplode.steps,
    },
    solutionsHero: {
      title: site.arPreview.title,
      arLabel: site.arPreview.label,
      hint: site.solutionsHeroModel.hint,
      callouts: site.solutionsHeroModel.callouts.map((item) => ({ label: item.label })),
    },
    architecture: { layers: site.architectureLayers.map((layer) => ({ label: layer.label })) },
    alarmJourney: {
      eyebrow: site.alarmJourney.eyebrow,
      title: site.alarmJourney.title,
      detection: site.alarmJourney.detection,
    },
  },
};

const out = path.resolve(process.cwd(), "cms/seed-content.json");
mkdirSync(path.dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify({ solutions, sectors: sectorDocs, references, challenges, globals }, null, 2));
console.log(`Contenu exporté : ${solutions.length} solutions, ${sectorDocs.length} secteurs, ${references.length} références, ${challenges.length} enjeux, ${Object.keys(globals).length} globals.`);
