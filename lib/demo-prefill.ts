// Démo locale : préremplit les écrans de connexion avec un compte de .env.local, choisi par CMS_PREFILL_ROLE.
export function demoPrefill() {
  if (process.env.NODE_ENV !== "development") return null;
  const prefix = { admin: "CMS_ADMIN", publieur: "CMS_PUBLISHER", redacteur: "CMS_EDITOR" }[process.env.CMS_PREFILL_ROLE ?? "admin"];
  const email = prefix && process.env[`${prefix}_EMAIL`];
  return email ? { email, password: process.env[`${prefix}_PASSWORD`] ?? "" } : null;
}
