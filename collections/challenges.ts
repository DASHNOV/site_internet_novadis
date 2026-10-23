import type { CollectionConfig } from "payload";
import { drafts, icon, link, slug, text, textList } from "../fields";

export const Challenges: CollectionConfig = {
  slug: "challenges",
  labels: { singular: "Enjeu", plural: "Enjeux" },
  admin: {
    group: "Offre",
    useAsTitle: "title",
    defaultColumns: ["title", "href", "updatedAt"],
    description: "Bloc « Chaque projet commence par un problème concret » de l'accueil.",
  },
  defaultSort: "order",
  access: { read: () => true },
  versions: drafts,
  fields: [
    slug,
    {
      name: "order",
      label: "Ordre d'affichage",
      type: "number",
      required: true,
      admin: { position: "sidebar" },
    },
    text("title", "Titre", "title"),
    icon(),
    text("description", "Description", "text"),
    textList("points", "Points clés", "label"),
    link("href", "Lien « En savoir plus »"),
  ],
};
