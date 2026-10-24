import type { CollectionConfig } from "payload";
import { revalidateOnDelete, revalidateOnPublish } from "../hooks/revalidate";
import { canEdit, isAdmin, isLoggedIn, publishedOrLoggedIn } from "../access";
import { drafts, icon, image, slug, text, textList } from "../fields";

export const Sectors: CollectionConfig = {
  slug: "sectors",
  labels: { singular: "Secteur", plural: "Secteurs" },
  admin: {
    group: "Offre",
    components: { edit: { beforeDocumentControls: ["/components/admin/view-on-site#ViewOnSite"] } },
    useAsTitle: "title",
    defaultColumns: ["title", "updatedAt"],
  },
  defaultSort: "order",
  hooks: { afterChange: [revalidateOnPublish], afterDelete: [revalidateOnDelete] },
  access: {
    read: publishedOrLoggedIn,
    readVersions: isLoggedIn,
    // L'offre est fixe pour la démo : seuls les admins ajoutent ou retirent des fiches.
    create: isAdmin,
    update: canEdit,
    delete: isAdmin,
  },
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
          label: "Page Secteurs",
          fields: [
            text("title", "Titre", "label"),
            icon(),
            text("summary", "Résumé", "text"),
            textList("challenges", "Enjeux du terrain", "label"),
            textList("outcomes", "Bénéfices observés", "label"),
            image("image", "Image"),
          ],
        },
        {
          label: "Page Références",
          description: "Bloc « Déploiements par secteur ».",
          fields: [
            text("tagline", "Accroche", "title"),
            text("description", "Description", "paragraph"),
            {
              name: "solutions",
              label: "Solutions déployées",
              type: "relationship",
              relationTo: "solutions",
              hasMany: true,
            },
            {
              name: "examples",
              label: "Exemples de déploiement",
              type: "array",
              labels: { singular: "Exemple", plural: "Exemples" },
              fields: [text("title", "Titre", "title"), text("body", "Texte", "paragraph")],
            },
          ],
        },
      ],
    },
  ],
};
