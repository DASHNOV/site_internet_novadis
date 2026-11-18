import type { CollectionConfig } from "payload";
import { revalidateOnDelete, revalidateOnPublish } from "../hooks/revalidate";
import { canEdit, isAdmin, isLoggedIn, publishedOrLoggedIn } from "../access";
import { drafts, image, text, updatedBy, versionHistory } from "../fields";

export const References: CollectionConfig = {
  slug: "references",
  labels: { singular: "Référence", plural: "Références" },
  admin: {
    group: "Offre",
    components: { edit: { beforeDocumentControls: ["/components/admin/view-on-site#ViewOnSite"] }, views: versionHistory },
    useAsTitle: "name",
    defaultColumns: ["name", "sector", "updatedAt"],
    description: "Cas phares anonymisés, affichés sur l'accueil et la page Références.",
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
    updatedBy,
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
