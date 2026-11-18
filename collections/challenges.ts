import type { CollectionConfig } from "payload";
import { revalidateOnDelete, revalidateOnPublish } from "../hooks/revalidate";
import { canEdit, isAdmin, isLoggedIn, publishedOrLoggedIn } from "../access";
import { drafts, icon, link, slug, text, textList, updatedBy, versionHistory } from "../fields";

export const Challenges: CollectionConfig = {
  slug: "challenges",
  labels: { singular: "Enjeu", plural: "Enjeux" },
  admin: {
    group: "Offre",
    components: { edit: { beforeDocumentControls: ["/components/admin/view-on-site#ViewOnSite"] }, views: versionHistory },
    useAsTitle: "title",
    defaultColumns: ["title", "href", "updatedAt"],
    description: "Bloc « Chaque projet commence par un problème concret » de l'accueil.",
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
