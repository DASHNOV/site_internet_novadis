import type { CollectionConfig } from "payload";
import { canEdit, isAdmin, isLoggedIn, publishedOrLoggedIn } from "../access";
import { drafts, image, text } from "../fields";

export const References: CollectionConfig = {
  slug: "references",
  labels: { singular: "Référence", plural: "Références" },
  admin: {
    group: "Offre",
    useAsTitle: "name",
    defaultColumns: ["name", "sector", "updatedAt"],
    description: "Cas phares anonymisés, affichés sur l'accueil et la page Références.",
  },
  defaultSort: "order",
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
    {
      name: "order",
      label: "Ordre d'affichage",
      type: "number",
      required: true,
      admin: { position: "sidebar" },
    },
    text("name", "Nom anonymisé", "title"),
    text("sector", "Secteur", "label"),
    text("scope", "Périmètre", "paragraph"),
    image("image", "Image"),
    {
      name: "solutions",
      label: "Solutions déployées",
      type: "relationship",
      relationTo: "solutions",
      hasMany: true,
    },
  ],
};
