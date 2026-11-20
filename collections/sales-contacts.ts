import type { Access, CollectionConfig } from "payload";
import { revalidateOnDelete, revalidateOnPublish } from "../hooks/revalidate";
import { canEdit, isAdmin, isLoggedIn } from "../access";
import { drafts, image, text, updatedBy, versionHistory } from "../fields";

// Le public ne voit que les fiches publiées ET cochées « visible » : une fiche masquée reste invisible de l'API.
const visibleOrLoggedIn: Access = ({ req }) =>
  req.user ? true : { _status: { equals: "published" }, visible: { equals: true } };

const PHONE_PATTERN = /^[0-9+().\s-]{6,30}$/;
const LINKEDIN_PATTERN = /^https:\/\/([a-z0-9-]+\.)?linkedin\.com\/\S+$/i;

export const SalesContacts: CollectionConfig = {
  slug: "sales-contacts",
  labels: { singular: "Interlocuteur", plural: "Interlocuteurs" },
  admin: {
    group: "Contact",
    components: { edit: { beforeDocumentControls: ["/components/admin/view-on-site#ViewOnSite"] }, views: versionHistory },
    useAsTitle: "name",
    defaultColumns: ["name", "role", "visible", "updatedAt"],
    description: "Commerciaux présentés sur la page Contact. Seules les fiches publiées et visibles s'affichent.",
  },
  defaultSort: "order",
  hooks: { afterChange: [revalidateOnPublish], afterDelete: [revalidateOnDelete] },
  access: {
    read: visibleOrLoggedIn,
    readVersions: isLoggedIn,
    create: canEdit,
    update: canEdit,
    delete: isAdmin,
  },
  versions: drafts,
  fields: [
    updatedBy,
    {
      name: "visible",
      label: "Visible sur le site",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "Décochée, la fiche reste dans l'administration mais n'apparaît pas sur le site." },
    },
    {
      name: "order",
      label: "Ordre d'affichage",
      type: "number",
      required: true,
      admin: { position: "sidebar" },
    },
    text("name", "Nom", "label"),
    text("role", "Fonction", "label"),
    image("photo", "Photo", false),
    text("areas", "Secteurs ou régions suivis", "title", { required: false }),
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      // L'adresse reçoit les demandes du formulaire : elle ne sort jamais vers le public, ni par l'API ni par le site.
      access: { read: ({ req }) => Boolean(req.user) },
      admin: { description: "Jamais affichée sur le site : elle reçoit les demandes envoyées depuis le formulaire." },
    },
    {
      name: "phone",
      label: "Téléphone",
      type: "text",
      maxLength: 30,
      validate: (value: unknown) =>
        !value || (typeof value === "string" && PHONE_PATTERN.test(value)) ? true : "Indiquez un numéro de téléphone valide.",
    },
    {
      name: "linkedin",
      label: "Profil LinkedIn",
      type: "text",
      maxLength: 300,
      admin: { description: "Adresse complète du profil, en https://." },
      validate: (value: unknown) =>
        !value || (typeof value === "string" && LINKEDIN_PATTERN.test(value))
          ? true
          : "L'adresse doit être un lien https:// vers LinkedIn.",
    },
  ],
};
