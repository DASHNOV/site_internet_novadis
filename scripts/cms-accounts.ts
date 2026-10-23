// Crée ou remet à jour les comptes de démo à partir de .env.local.
// Usage : npm run cms:accounts
import { getPayload } from "payload";
import config from "../payload.config";
import { upsertDemoAccounts } from "./lib/demo-accounts";

const payload = await getPayload({ config });
await upsertDemoAccounts(payload);
process.exit(0);
