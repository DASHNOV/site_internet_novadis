import type { CollectionConfig } from "payload";
import { isAdmin, roles } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Utilisateur", plural: "Utilisateurs" },
  auth: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    group: "Administration",
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== "admin",
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
