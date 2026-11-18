// Reconstruit, à partir des contenus Payload, les mêmes objets que data/ exportait : les composants les lisent
// sans changer de forme. Les réglages techniques (coordonnées, films, modèles 3D) restent ceux de data/site.ts.
// Isomorphe : utilisé par les pages serveur et par le contexte des composants client.
import { Mail, MapPin, Phone } from "lucide-react";
import type { AccentText } from "@/data/pages";
import type { FeaturedReference } from "@/data/references";
import type { Sector } from "@/data/sectors";
import * as site from "@/data/site";
import type { Challenge, Industry, Metric, NavItem, RegulatoryTopic, Solution } from "@/data/site";
import { icons } from "@/lib/icons";
import { cleanText } from "./stega";
import type {
  AboutPage,
  Challenge as CmsChallenge,
  Common,
  ContactPage,
  Demo,
  Home,
  Media,
  Reference as CmsReference,
  ReferencesPage,
  Sector as CmsSector,
  SectorsPage,
  ServicesPage,
  Solution as CmsSolution,
  SolutionsPage,
} from "@/payload-types";

export type CmsRaw = {
  globals: {
    home: Home;
    solutionsPage: SolutionsPage;
    sectorsPage: SectorsPage;
    servicesPage: ServicesPage;
    referencesPage: ReferencesPage;
    aboutPage: AboutPage;
    contactPage: ContactPage;
    common: Common;
    demos: Demo;
  };
  solutions: CmsSolution[];
  sectors: CmsSector[];
  references: CmsReference[];
  challenges: CmsChallenge[];
};

type Lines = { value: string }[] | null | undefined;
const lines = (items: Lines) => (items ?? []).map((item) => item.value);
const text = (value: string | null | undefined) => value ?? undefined;
const accent = (title: { lead: string; accent?: string | null }): AccentText => ({
  lead: title.lead,
  accent: text(title.accent),
});
const url = (media: number | Media | null | undefined) => (typeof media === "object" && media?.url) || "";
const slugs = (items: (number | CmsSolution)[] | null | undefined) =>
  (items ?? []).flatMap((item) => (typeof item === "object" ? [item.slug] : []));
const rows = <T>(items: T[] | null | undefined) => items ?? [];

export function buildSiteContent(raw: CmsRaw) {
  const { home, solutionsPage, sectorsPage, servicesPage, referencesPage, aboutPage, contactPage, common, demos } =
    raw.globals;

  const cmsSolutions: Solution[] = raw.solutions.map((doc) => ({
    slug: doc.slug,
    title: doc.title,
    shortTitle: doc.shortTitle,
    product: text(doc.product),
    icon: icons[doc.icon],
    summary: doc.summary,
    intro: doc.intro,
    problem: doc.problem,
    solution: doc.solution,
    benefits: lines(doc.benefits),
    capabilities: lines(doc.capabilities),
    outcomes: lines(doc.outcomes),
    media:
      doc.media.kind === "video"
        ? { kind: "video", src: doc.media.video ?? "", poster: text(doc.media.poster), alt: doc.media.alt }
        : { kind: "image", src: url(doc.media.image), alt: doc.media.alt },
  }));
  // En développement, data/site.ts peut ajouter des fiches qui ne vivent qu'en local : elles restent affichées.
  const known = new Set(cmsSolutions.map((solution) => solution.slug));
  const localSolutions = process.env.NODE_ENV === "development" ? site.solutions.filter((s) => !known.has(s.slug)) : [];
  const solutions = [...cmsSolutions, ...localSolutions];
  const getSolution = (slug: string) => solutions.find((solution) => solution.slug === slug);

  const industries: Industry[] = raw.sectors.map((doc) => ({
    slug: doc.slug,
    title: doc.title,
    icon: icons[doc.icon],
    summary: doc.summary,
    challenges: lines(doc.challenges),
    outcomes: lines(doc.outcomes),
    media: url(doc.image),
  }));

  const sectors: Sector[] = raw.sectors.map((doc) => ({
    slug: doc.slug,
    title: doc.title,
    tagline: doc.tagline,
    desc: doc.description,
    challenges: [],
    solutions: slugs(doc.solutions),
    examples: rows(doc.examples).map((example) => ({ title: example.title, body: example.body })),
  }));

  const featuredReferences: FeaturedReference[] = raw.references.map((doc) => ({
    name: doc.name,
    sector: doc.sector,
    scope: doc.scope,
    image: url(doc.image),
    solutions: slugs(doc.solutions),
  }));

  const challenges: Challenge[] = raw.challenges.map((doc) => ({
    slug: doc.slug,
    title: doc.title,
    icon: icons[doc.icon],
    description: doc.description,
    points: lines(doc.points),
    href: doc.href,
  }));

  const regulatoryTopics: RegulatoryTopic[] = rows(home.compliance.topics).map((topic, index) => ({
    slug: topic.id ?? String(index),
    title: topic.title,
    description: topic.description,
    href: topic.href,
    linkLabel: topic.linkLabel,
    media: url(topic.image),
  }));

  const { navigation } = common;
  const navItems: NavItem[] = rows(navigation.items).map((item) => {
    if (item.href === "/solutions") {
      return {
        href: item.href,
        label: item.label,
        children: [
          ...solutions.map((solution) => ({ href: `/solutions/${solution.slug}`, label: solution.shortTitle })),
          { href: "/solutions", label: navigation.allSolutionsLabel },
        ],
      };
    }
    if (item.href === "/secteurs") {
      return {
        href: item.href,
        label: item.label,
        children: [
          ...industries.map((industry) => ({ href: `/secteurs#${industry.slug}`, label: industry.title })),
          { href: "/secteurs", label: navigation.allSectorsLabel },
        ],
      };
    }
    return { href: item.href, label: item.label };
  });

  const contactDetails = {
    email: common.contact.email,
    emailHref: `mailto:${cleanText(common.contact.email)}`,
    phone: common.contact.phone,
    phoneHref: `tel:${cleanText(common.contact.phone).replace(/[^+\d]/g, "")}`,
    addressLines: lines(common.contact.addressLines),
    regions: common.contact.regions,
  };

  const contactChannels = [
    { icon: Mail, label: contactPage.channels.emailLabel, value: contactDetails.email, href: contactDetails.emailHref },
    { icon: Phone, label: contactPage.channels.phoneLabel, value: contactDetails.phone, href: contactDetails.phoneHref },
    { icon: MapPin, label: contactPage.channels.addressLabel, value: common.contact.addressInline, href: common.contact.mapsUrl },
  ];

  const siteMetrics: Metric[] = rows(common.metrics?.items).map((item) => ({
    value: item.value,
    label: item.label,
    caption: text(item.caption),
  }));

  const processSteps = rows(common.process?.steps).map((step) => ({
    step: step.step,
    title: step.title,
    description: step.description,
    deliverables: lines(step.deliverables),
  }));

  const partners = rows(common.norms.partners).map((partner) => ({
    name: partner.name,
    role: partner.role,
    kind: partner.kind,
  }));

  const layerLabels = rows(demos.architecture?.layers);
  const architectureLayers = site.architectureLayers.map((layer, index) => ({
    ...layer,
    label: layerLabels[index]?.label ?? layer.label,
  }));

  const badgeDoor = {
    ...site.badgeDoor,
    eyebrow: demos.badgeDoor.eyebrow,
    title: demos.badgeDoor.title,
    steps: rows(demos.badgeDoor.steps).map((step) => ({ label: step.label, text: step.text })),
    hud: {
      reader: demos.badgeDoor.hud.reader,
      reading: demos.badgeDoor.hud.reading,
      badgeId: demos.badgeDoor.hud.badgeId,
      granted: demos.badgeDoor.hud.granted,
      decision: demos.badgeDoor.hud.decision,
    },
    event: { title: demos.badgeDoor.event.title, detail: demos.badgeDoor.event.detail, logged: demos.badgeDoor.event.logged },
    scrollHint: demos.badgeDoor.scrollHint,
  };

  const intrusionScene = {
    ...site.intrusionScene,
    eyebrow: demos.intrusion.eyebrow,
    title: demos.intrusion.title,
    steps: rows(demos.intrusion.steps).map((step) => ({ label: step.label, text: step.text })),
    hud: {
      detector: demos.intrusion.hud.detector,
      armed: demos.intrusion.hud.armed,
      watching: demos.intrusion.hud.watching,
      detected: demos.intrusion.hud.detected,
      panel: demos.intrusion.hud.panel,
      intruder: demos.intrusion.hud.intruder,
    },
    event: { title: demos.intrusion.event.title, detail: demos.intrusion.event.detail, logged: demos.intrusion.event.logged },
    scrollHint: demos.intrusion.scrollHint,
  };

  const explodeLabels = rows(demos.axisExplode.labels);
  const axisExplode = {
    ...site.axisExplode,
    eyebrow: demos.axisExplode.eyebrow,
    title: demos.axisExplode.title,
    description: demos.axisExplode.description,
    scrollHint: demos.axisExplode.scrollHint,
    labels: site.axisExplode.labels.map((item, index) => ({ ...item, label: explodeLabels[index]?.label ?? item.label })),
    steps: rows(demos.axisExplode.steps).map((step) => ({ title: step.title, text: step.text })),
  };

  const calloutLabels = rows(demos.solutionsHero.callouts);
  const arPreview = { ...site.arPreview, label: demos.solutionsHero.arLabel, title: demos.solutionsHero.title };
  const solutionsHeroModel = {
    ...site.solutionsHeroModel,
    name: demos.solutionsHero.title,
    hint: demos.solutionsHero.hint,
    callouts: site.solutionsHeroModel.callouts.map((item, index) => ({ ...item, label: calloutLabels[index]?.label ?? item.label })),
  };

  const alarmJourney = {
    ...site.alarmJourney,
    eyebrow: demos.alarmJourney.eyebrow,
    title: demos.alarmJourney.title,
    detection: demos.alarmJourney.detection,
  };

  const heroFilm = { ...site.heroFilm, status: demos.heroFilm.status };
  const supervisionRoom = { ...site.supervisionRoom, caption: demos.supervisionRoom.caption };
  const supervisionRoomCopy = {
    posterAlt: demos.supervisionRoom.posterAlt,
    dragHint: demos.supervisionRoom.dragHint,
    consoleTitle: demos.supervisionRoom.consoleTitle,
    systemsSuffix: demos.supervisionRoom.systemsSuffix,
    shownLabel: demos.supervisionRoom.shownLabel,
    showLabel: demos.supervisionRoom.showLabel,
  };

  const homePage = {
    hero: {
      title: accent(home.hero.title),
      description: home.hero.description,
      primaryCta: home.hero.primaryCta,
      secondaryCta: home.hero.secondaryCta,
      technologiesLabel: home.hero.technologiesLabel,
    },
    proof: { title: home.proof.title, description: home.proof.description, cta: home.proof.cta },
    architecture: {
      title: accent(home.architecture.title),
      description: home.architecture.description,
      diagramCaption: home.architecture.diagramCaption,
      diagramLabel: home.architecture.diagramLabel,
    },
    challenges: { title: accent(home.challenges.title), description: home.challenges.description },
    solutions: { title: accent(home.solutions.title), description: home.solutions.description, cta: home.solutions.cta },
    sectors: { title: home.sectors.title },
    method: { title: accent(home.method.title), description: home.method.description, cta: home.method.cta },
    compliance: { title: home.compliance.title, description: home.compliance.description },
    about: {
      mediaCaption: home.about.mediaCaption,
      title: accent(home.about.title),
      description: home.about.description,
      quote: home.about.quote,
      quoteAuthor: home.about.quoteAuthor,
      cta: home.about.cta,
    },
  };

  return {
    // Équivalents de data/site.ts
    mediaLibrary: site.mediaLibrary,
    siteMetrics,
    solutions,
    getSolution,
    industries,
    processSteps,
    differentiators: lines(home.about.differentiators),
    challenges,
    regulatoryTopics,
    navItems,
    partners,
    trustSignals: lines(common.norms.trustSignals),
    pillars: rows(home.method.pillars).map((pillar) => ({
      title: pillar.title,
      description: pillar.description,
      points: lines(pillar.points),
    })),
    architectureLayers,
    arPreview,
    badgeDoor,
    intrusionScene,
    axisExplode,
    solutionsHeroModel,
    alarmJourney,
    heroFilm,
    serviceCommitments: lines(servicesPage.method.commitments),
    aboutHighlights: rows(aboutPage.human.highlights).map((item) => ({ label: item.label, icon: icons[item.icon] })),
    aboutApproach: lines(aboutPage.human.approach),
    contactDetails,
    contactChannels,
    contactTopics: lines(contactPage.topics),
    supervisionRoom,
    heroTechnologies: lines(home.hero.technologies),
    architecturePoints: rows(home.architecture.points).map((item) => ({ label: item.label, icon: icons[item.icon] })),
    // Équivalents de data/sectors.ts et data/references.ts
    sectors,
    featuredReferences,
    // Équivalents de data/pages.ts
    uiLabels: { learnMore: common.labels.learnMore },
    headerCopy: { tagline: common.header.tagline, contactCta: common.header.contactCta, menuLabel: common.header.menuLabel },
    footerCopy: {
      description: common.footer.description,
      hashtag: common.footer.hashtag,
      navigationTitle: common.footer.navigationTitle,
      contactTitle: common.footer.contactTitle,
      complianceTitle: common.footer.complianceTitle,
      rights: common.footer.rights,
      legalLabel: common.footer.legalLabel,
      privacyLabel: common.footer.privacyLabel,
    },
    ctaBannerCopy: {
      title: accent(common.ctaBanner.title),
      description: common.ctaBanner.description,
      cta: common.ctaBanner.cta,
      consoleTitle: common.ctaBanner.consoleTitle,
      emailLabel: common.ctaBanner.emailLabel,
      phoneLabel: common.ctaBanner.phoneLabel,
      scopeLabel: common.ctaBanner.scopeLabel,
      scope: common.ctaBanner.scope,
    },
    normsCopy: {
      title: common.norms.title,
      description: common.norms.description,
      normsTitle: common.norms.normsTitle,
      associationsTitle: common.norms.associationsTitle,
      memberPrefix: common.norms.memberPrefix,
    },
    supervisionRoomCopy,
    homePage,
    solutionsPage: {
      hero: { title: solutionsPage.hero.title, description: solutionsPage.hero.description },
      detailCta: solutionsPage.detailCta,
    },
    solutionDetailPage: {
      backLink: solutionsPage.detail.backLink,
      contextTitle: solutionsPage.detail.contextTitle,
      capabilitiesTitle: solutionsPage.detail.capabilitiesTitle,
      answerTitle: solutionsPage.detail.answerTitle,
      benefitsTitle: solutionsPage.detail.benefitsTitle,
      outcomesTitle: solutionsPage.detail.outcomesTitle,
    },
    sectorsPage: {
      hero: {
        title: sectorsPage.hero.title,
        description: sectorsPage.hero.description,
        mediaCaption: sectorsPage.hero.mediaCaption,
      },
      navLabel: sectorsPage.navLabel,
      challengesTitle: sectorsPage.challengesTitle,
      outcomesTitle: sectorsPage.outcomesTitle,
    },
    servicesPage: {
      hero: {
        title: servicesPage.hero.title,
        description: servicesPage.hero.description,
        mediaAlt: servicesPage.hero.mediaAlt,
        mediaCaption: servicesPage.hero.mediaCaption,
      },
      deliverablesSuffix: servicesPage.deliverablesSuffix,
      method: { title: accent(servicesPage.method.title), commitmentsTitle: servicesPage.method.commitmentsTitle },
    },
    referencesPage: {
      hero: { title: referencesPage.hero.title, description: referencesPage.hero.description },
      disclaimer: referencesPage.disclaimer,
      featuredTitle: referencesPage.featuredTitle,
      sectorsTitle: referencesPage.sectorsTitle,
      deployedSolutionsTitle: referencesPage.deployedSolutionsTitle,
      footnote: referencesPage.footnote,
      solutionLabels: Object.fromEntries(raw.solutions.map((doc) => [doc.slug, doc.tagLabel])) as Record<string, string>,
    },
    aboutPage: {
      hero: {
        title: aboutPage.hero.title,
        description: aboutPage.hero.description,
        mediaAlt: aboutPage.hero.mediaAlt,
        mediaCaption: aboutPage.hero.mediaCaption,
      },
      parentGroup: {
        description: aboutPage.parentGroup.description,
        cta: aboutPage.parentGroup.cta,
      },
      human: {
        title: aboutPage.human.title,
        description: aboutPage.human.description,
        approachTitle: aboutPage.human.approachTitle,
      },
      vision: {
        title: aboutPage.vision.title,
        description: aboutPage.vision.description,
        people: rows(aboutPage.vision.people).map((person) => ({ name: person.name, role: person.role })),
      },
      spectrum: {
        title: aboutPage.spectrum.title,
        description: aboutPage.spectrum.description,
        schemaAlt: aboutPage.spectrum.schemaAlt,
      },
      members: { title: aboutPage.members.title, description: aboutPage.members.description },
    },
    contactPage: {
      hero: {
        title: contactPage.hero.title,
        description: contactPage.hero.description,
        mediaAlt: contactPage.hero.mediaAlt,
        mediaCaption: contactPage.hero.mediaCaption,
      },
      topicsTitle: contactPage.topicsTitle,
      meetingNote: contactPage.meetingNote,
      formTitle: accent(contactPage.formTitle),
    },
  };
}

export type SiteContent = ReturnType<typeof buildSiteContent>;
