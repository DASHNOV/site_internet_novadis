// Comptes de démo, lus dans .env.local : un par rôle.
import type { Payload } from "payload";
import type { Role } from "../../access";

const accounts: { role: Role; name: string; emailVar: string; passwordVar: string }[] = [
  { role: "admin", name: "Administrateur", emailVar: "CMS_ADMIN_EMAIL", passwordVar: "CMS_ADMIN_PASSWORD" },
  { role: "publieur", name: "Responsable commercial", emailVar: "CMS_PUBLISHER_EMAIL", passwordVar: "CMS_PUBLISHER_PASSWORD" },
  { role: "redacteur", name: "Commercial", emailVar: "CMS_EDITOR_EMAIL", passwordVar: "CMS_EDITOR_PASSWORD" },
];

export async function upsertDemoAccounts(payload: Payload) {
  for (const account of accounts) {
    const email = process.env[account.emailVar];
    const password = process.env[account.passwordVar];
    if (!email || !password) throw new Error(`${account.emailVar} ou ${account.passwordVar} manque dans .env.local`);

    const data = { email, password, name: account.name, role: account.role };
    const existing = await payload.find({ collection: "users", where: { email: { equals: email } }, limit: 1 });
    if (existing.docs[0]) {
      await payload.update({ collection: "users", id: existing.docs[0].id, data, overrideAccess: true });
    } else {
      await payload.create({ collection: "users", data, overrideAccess: true });
    }
    payload.logger.info(`Compte ${account.role} prêt : ${email}`);
  }
}
