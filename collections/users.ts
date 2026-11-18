import type { CollectionBeforeChangeHook, CollectionConfig, PayloadRequest } from "payload";
import { isAdmin, roles } from "../access";

const noUserYet = async (req: PayloadRequest) =>
  (await req.payload.count({ collection: "users", overrideAccess: true, req })).totalDocs === 0;

// Le premier compte est créé sur /admin/create-first-user, sans personne de connecté pour lui donner un rôle :
// il devient administrateur, sinon personne ne pourrait gérer les comptes.
const firstUserIsAdmin: CollectionBeforeChangeHook = async ({ data, operation, req }) =>
  operation === "create" && (await noUserYet(req)) ? { ...data, role: "admin" } : data;

export const Users: CollectionConfig = {
  slug: "users",
  hooks: { beforeChange: [firstUserIsAdmin] },
  labels: { singular: "Utilisateur", plural: "Utilisateurs" },
  // Comptes nominatifs : 5 essais ratés bloquent le compte 15 minutes.
  auth: { maxLoginAttempts: 5, lockTime: 15 * 60 * 1000 },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role", "versions"],
    group: "Administration",
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== "admin",
    components: {
      views: {
        edit: {
          activity: {
            Component: "/components/admin/user-activity#UserActivity",
            path: "/activite",
            tab: { label: "Versions", href: "/activite", condition: ({ req }) => Boolean(isAdmin({ req })) },
          },
        },
      },
    },
  },
  access: {
    // Chacun lit et modifie son propre compte (mot de passe), l'admin gère tous les comptes.
    read: ({ req }) => (isAdmin({ req }) ? true : req.user ? { id: { equals: req.user.id } } : false),
    update: ({ req }) => (isAdmin({ req }) ? true : req.user ? { id: { equals: req.user.id } } : false),
    create: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: "name", label: "Nom", type: "text", required: true },
    {
      name: "versions",
      label: "Versions",
      type: "ui",
      admin: { components: { Cell: "/components/admin/user-activity#UserVersionsLink" } },
    },
    {
      name: "role",
      label: "Rôle",
      type: "select",
      required: true,
      defaultValue: "redacteur",
      saveToJWT: true,
      options: [...roles],
      access: {
        create: ({ req }) => Boolean(isAdmin({ req })),
        update: ({ req }) => Boolean(isAdmin({ req })),
      },
      admin: {
        description:
          "Commercial : modifie et publie le site. Responsable commercial : peut aussi supprimer des images. Administrateur : gère aussi les comptes et les fiches de l'offre.",
      },
    },
  ],
};
