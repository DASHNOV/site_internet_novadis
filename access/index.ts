import type { Access, PayloadRequest } from "payload";

export const roles = [
  { label: "Commercial", value: "redacteur" },
  { label: "Responsable commercial", value: "publieur" },
  { label: "Administrateur", value: "admin" },
] as const;

export type Role = (typeof roles)[number]["value"];

const roleOf = (req: PayloadRequest): Role | undefined => (req.user as { role?: Role } | null)?.role;

export const isLoggedIn: Access = ({ req }) => Boolean(req.user);

export const isAdmin: Access = ({ req }) => roleOf(req) === "admin";

// Supprimer une image de la médiathèque reste réservé au responsable et aux admins.
export const isPublisher: Access = ({ req }) => roleOf(req) === "publieur" || roleOf(req) === "admin";

// Publication directe : tout compte connecté modifie, publie et revient à une version précédente.
export const canEdit: Access = isLoggedIn;

// Le site public ne lit que la version publiée ; les comptes connectés voient aussi les brouillons.
export const publishedOrLoggedIn: Access = ({ req }) => (req.user ? true : { _status: { equals: "published" } });
