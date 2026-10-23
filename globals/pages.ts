import type { Field, GlobalConfig, Tab } from "payload";
import { canEdit, isLoggedIn, publishedOrLoggedIn } from "../access";
import { accentTitle, drafts, icon, image, link, text, textList } from "../fields";

function pageGlobal(slug: string, label: string, fields: Field[]): GlobalConfig {
  return {
    slug,
    label,
    admin: { group: "Pages" },
    access: { read: publishedOrLoggedIn, readVersions: isLoggedIn, update: canEdit },
    versions: drafts,
    fields,
  };
}

function section(name: string, label: string, fields: Field[], description?: string): Tab {
  return { name, label, description, fields };
}

function hero(withMedia: "none" | "caption" | "full" = "none"): Field {
  const media: Field[] =
    withMedia === "full"
      ? [text("mediaAlt", "Texte alternatif du visuel", "title"), text("mediaCaption", "Légende du visuel", "title")]
      : withMedia === "caption"
        ? [text("mediaCaption", "Légende du visuel", "title")]
        : [];
  return {
    name: "hero",
    label: "Haut de page",
    type: "group",
    fields: [
      text("title", "Titre", "title", { description: "Les trois premiers mots s'affichent en encre, la suite en gris." }),
      text("description", "Introduction", "paragraph"),
      ...media,
    ],
  };
}

export const HomePage = pageGlobal("home", "Accueil", [
  {
    type: "tabs",
    tabs: [
      section("hero", "Haut de page", [
        accentTitle("title", "Titre"),
        text("description", "Introduction", "paragraph"),
        {
          type: "row",
          fields: [text("primaryCta", "Bouton principal", "label"), text("secondaryCta", "Bouton secondaire", "label")],
        },
        text("technologiesLabel", "Libellé des technologies", "label"),
        textList("technologies", "Technologies mises en avant", "label"),
      ]),
      section("proof", "Références", [
        text("title", "Titre", "title"),
        text("description", "Description", "text"),
        text("cta", "Bouton", "label"),
      ]),
      section("architecture", "Architecture", [
        accentTitle("title", "Titre"),
        text("description", "Description", "paragraph"),
        {
          name: "points",
          label: "Points clés",
          type: "array",
          labels: { singular: "Point", plural: "Points" },
          fields: [{ type: "row", fields: [text("label", "Texte", "title"), icon()] }],
        },
        text("diagramCaption", "Légende du schéma", "title"),
        text("diagramLabel", "Description du schéma (accessibilité)", "text"),
      ]),
      section("challenges", "Enjeux", [accentTitle("title", "Titre"), text("description", "Description", "text")],
        "Les enjeux eux-mêmes se modifient dans Offre › Enjeux."),
      section("solutions", "Solutions", [
        accentTitle("title", "Titre"),
        text("description", "Description", "text"),
        text("cta", "Bouton", "label"),
      ]),
      section("sectors", "Secteurs", [text("title", "Titre", "title")]),
      section("method", "Méthode", [
        accentTitle("title", "Titre"),
        text("description", "Description", "text"),
        text("cta", "Bouton", "label"),
        {
          name: "pillars",
          label: "Les trois temps",
          type: "array",
          minRows: 3,
          maxRows: 3,
          labels: { singular: "Temps", plural: "Temps" },
          fields: [text("title", "Titre", "label"), text("description", "Description", "text"), textList("points", "Mots-clés", "label")],
        },
      ], "Les quatre étapes de service se modifient dans Éléments communs › Étapes de service."),
      section("compliance", "Réglementation", [
        text("title", "Titre", "title"),
        text("description", "Description", "text"),
        {
          name: "topics",
          label: "Sujets réglementaires",
          type: "array",
          labels: { singular: "Sujet", plural: "Sujets" },
          fields: [
            text("title", "Titre", "label"),
            text("description", "Description", "paragraph"),
            { type: "row", fields: [link("href", "Lien"), text("linkLabel", "Texte du lien", "label")] },
            image("image", "Image"),
          ],
        },
      ]),
      section("about", "À propos", [
        text("mediaCaption", "Légende de la photo", "title"),
        accentTitle("title", "Titre"),
        text("description", "Description", "paragraph"),
        textList("differentiators", "Différenciateurs", "text"),
        text("quote", "Citation", "text"),
        text("quoteAuthor", "Auteur de la citation", "title"),
        text("cta", "Bouton", "label"),
      ]),
    ],
  },
]);

export const SolutionsPage = pageGlobal("solutions-page", "Solutions", [
  hero(),
  text("detailCta", "Bouton des cartes", "label"),
  {
    name: "detail",
    label: "Fiches solution (textes communs)",
    type: "group",
    admin: { description: "Titres repris sur chaque fiche solution." },
    fields: [
      text("backLink", "Lien de retour", "label"),
      text("contextTitle", "Titre « contexte »", "title"),
      text("capabilitiesTitle", "Titre « capacités »", "label"),
      text("answerTitle", "Titre « réponse »", "title"),
      text("benefitsTitle", "Titre « bénéfices »", "label"),
      text("outcomesTitle", "Titre « résultats »", "title"),
    ],
  },
]);

export const SectorsPage = pageGlobal("sectors-page", "Secteurs", [
  hero("caption"),
  text("navLabel", "Nom du menu des secteurs (accessibilité)", "label"),
  { type: "row", fields: [text("challengesTitle", "Titre « enjeux »", "label"), text("outcomesTitle", "Titre « bénéfices »", "label")] },
]);

export const ServicesPage = pageGlobal("services-page", "Services", [
  hero("full"),
  text("deliverablesSuffix", "Mot après le nombre de livrables", "label"),
  {
    name: "method",
    label: "Engagements",
    type: "group",
    fields: [
      accentTitle("title", "Titre"),
      text("commitmentsTitle", "Titre de l'encadré", "label"),
      textList("commitments", "Engagements", "title"),
    ],
  },
]);

export const ReferencesPage = pageGlobal("references-page", "Références", [
  hero(),
  text("disclaimer", "Avertissement d'anonymisation", "text"),
  text("featuredTitle", "Titre des cas phares", "title"),
  text("sectorsTitle", "Titre des déploiements par secteur", "title"),
  text("deployedSolutionsTitle", "Titre « solutions déployées »", "label"),
  text("footnote", "Note de bas de page", "text"),
]);

export const AboutPage = pageGlobal("about-page", "À propos", [
  {
    type: "tabs",
    tabs: [
      section("hero", "Haut de page", [
        text("title", "Titre", "title"),
        text("description", "Introduction", "paragraph"),
        text("mediaAlt", "Texte alternatif de la photo", "title"),
        text("mediaCaption", "Légende de la photo", "title"),
      ]),
      section("human", "L'humain", [
        text("title", "Titre", "title"),
        text("description", "Description", "paragraph"),
        {
          name: "highlights",
          label: "Points forts",
          type: "array",
          labels: { singular: "Point fort", plural: "Points forts" },
          fields: [{ type: "row", fields: [text("label", "Texte", "title"), icon()] }],
        },
        text("approachTitle", "Titre « approche »", "label"),
        textList("approach", "Approche", "text"),
      ]),
      section("vision", "Vidéo", [
        text("title", "Titre", "title"),
        text("description", "Description", "paragraph"),
        {
          name: "people",
          label: "Intervenants",
          type: "array",
          labels: { singular: "Intervenant", plural: "Intervenants" },
          fields: [{ type: "row", fields: [text("name", "Nom", "label"), text("role", "Rôle", "label")] }],
        },
      ]),
      section("spectrum", "Spectre", [
        text("title", "Titre", "title"),
        text("description", "Description", "paragraph"),
        text("schemaAlt", "Texte alternatif du schéma", "title"),
      ]),
      section("members", "Engagements", [text("title", "Titre", "title"), text("description", "Description", "paragraph")]),
    ],
  },
]);

export const ContactPage = pageGlobal("contact-page", "Contact", [
  hero("full"),
  {
    name: "channels",
    label: "Libellés des coordonnées",
    type: "group",
    admin: { description: "Les coordonnées elles-mêmes se modifient dans Éléments communs › Coordonnées." },
    fields: [
      {
        type: "row",
        fields: [
          text("emailLabel", "Email", "label"),
          text("phoneLabel", "Téléphone", "label"),
          text("addressLabel", "Adresse", "label"),
        ],
      },
    ],
  },
  text("topicsTitle", "Titre des sujets abordés", "title"),
  textList("topics", "Sujets abordés", "title"),
  text("meetingNote", "Note « rencontre directe »", "text"),
  accentTitle("formTitle", "Titre du formulaire"),
]);

export const pageGlobals = [HomePage, SolutionsPage, SectorsPage, ServicesPage, ReferencesPage, AboutPage, ContactPage];
