import type { CollectionConfig } from "payload";
import { drafts, icon, image, slug, text, textList } from "../fields";

export const Solutions: CollectionConfig = {
  slug: "solutions",
  labels: { singular: "Solution", plural: "Solutions" },
  admin: {
    group: "Offre",
    useAsTitle: "title",
    defaultColumns: ["title", "product", "updatedAt"],
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
    {
      type: "tabs",
      tabs: [
        {
          label: "Présentation",
          fields: [
            text("title", "Titre", "title"),
            {
              type: "row",
              fields: [
                text("shortTitle", "Titre court", "label", { description: "Menu, schémas et démonstrations." }),
                text("tagLabel", "Étiquette", "label", { description: "Étiquettes de la page Références." }),
              ],
            },
            text("product", "Produit ou périmètre", "title", { required: false }),
            icon(),
            text("summary", "Résumé", "text", { description: "Cartes, listes et description pour Google." }),
            text("intro", "Introduction", "paragraph", { description: "Haut de la fiche solution." }),
          ],
        },
        {
          label: "Contexte et réponse",
          fields: [
            text("problem", "Le contexte que nous rencontrons", "paragraph"),
            textList("capabilities", "Capacités clés", "label"),
            text("solution", "Comment nous y répondons", "paragraph"),
            textList("benefits", "Bénéfices", "label"),
            textList("outcomes", "Ce que cela change sur le terrain", "label"),
          ],
        },
        {
          label: "Visuel",
          fields: [
            {
              name: "media",
              label: "Visuel principal",
              type: "group",
              fields: [
                {
                  name: "kind",
                  label: "Type",
                  type: "select",
                  required: true,
                  defaultValue: "image",
                  options: [
                    { label: "Image", value: "image" },
                    { label: "Vidéo", value: "video" },
                  ],
                  admin: { readOnly: true, description: "Les vidéos restent gérées par l'équipe technique." },
                },
                {
                  ...image("image", "Image", false),
                  admin: { condition: (_, siblingData) => siblingData?.kind === "image" },
                },
                {
                  name: "video",
                  label: "Vidéo",
                  type: "text",
                  admin: { readOnly: true, condition: (_, siblingData) => siblingData?.kind === "video" },
                },
                {
                  name: "poster",
                  label: "Image d'attente de la vidéo",
                  type: "text",
                  admin: { readOnly: true, condition: (_, siblingData) => siblingData?.kind === "video" },
                },
                text("alt", "Texte alternatif", "title", {
                  description: "Décrit le visuel pour les lecteurs d'écran.",
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
};
