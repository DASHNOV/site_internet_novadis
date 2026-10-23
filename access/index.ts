import type { Access, PayloadRequest } from "payload";

export const roles = [
  { label: "Rédacteur", value: "redacteur" },
  { label: "Publieur", value: "publieur" },
  { label: "Administrateur", value: "admin" },
] as const;

export type Role = (typeof roles)[number]["value"];

const roleOf = (req: PayloadRequest): Role | undefined => (req.user as { role?: Role } | null)?.role;

export const isLoggedIn: Access = ({ req }) => Boolean(req.user);

export const isAdmin: Access = ({ req }) => roleOf(req) === "admin";

export const canPublish = (req: PayloadRequest) => {
  const role = roleOf(req);
  return role === "publieur" || role === "admin";
};

export const isPublisher: Access = ({ req }) => canPublish(req);

// Tout compte connecté peut modifier, mais seuls publieurs et admins passent un contenu à l'état publié.
// L'admin interroge cette même règle avec `_status: "published"` pour afficher ou masquer « Publier »,
// et la restauration d'une version publiée passe aussi par elle.
export const canEdit: Access = ({ req, data }) => {
  if (!req.user) return false;
  if ((data as { _status?: string } | undefined)?._status === "published") return canPublish(req);
  return true;
};

// Le site public ne lit que la version publiée ; les comptes connectés voient aussi les brouillons.
export const publishedOrLoggedIn: Access = ({ req }) => (req.user ? true : { _status: { equals: "published" } });
