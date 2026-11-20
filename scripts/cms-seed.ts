// Étape 2 de la migration : remet le CMS à zéro et publie le contenu de cms/seed-content.json.
// Usage : npm run cms:seed (réinitialise aussi la démo : contenu, médiathèque, historique et comptes).
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { getPayload, type CollectionSlug, type GlobalSlug } from "payload";
import config from "../payload.config";
import { upsertDemoAccounts } from "./lib/demo-accounts";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

// En ligne, la remise à zéro effacerait le travail des commerciaux : il faut la demander explicitement.
const online = Boolean(process.env.DATABASE_URL);
if (online && process.env.CMS_SEED_ONLINE !== "oui") {
  throw new Error("DATABASE_URL pointe vers la base en ligne : relancez avec CMS_SEED_ONLINE=oui pour l'écraser");
}

const contentFile = path.resolve(process.cwd(), "cms/seed-content.json");
if (!existsSync(contentFile)) throw new Error("cms/seed-content.json manque : lancez npm run cms:seed");
const content = JSON.parse(readFileSync(contentFile, "utf8")) as {
  solutions: Json[];
  sectors: Json[];
  references: Json[];
  challenges: Json[];
  salesContacts?: Json[];
  globals: Record<string, Json>;
};

const payload = await getPayload({ config });
const local = { overrideAccess: true } as const;

// 1. Remise à zéro : les fiches emportent leurs versions, la médiathèque ses fichiers.
const collections: CollectionSlug[] = ["sales-contacts", "references", "sectors", "challenges", "solutions", "media"];
for (const collection of collections) {
  await payload.delete({ collection, where: { id: { exists: true } }, ...local });
}
for (const slug of Object.keys(content.globals)) {
  await payload.db.deleteVersions({ globalSlug: slug as GlobalSlug, where: {} });
}

// 2. Images et liens vers les solutions, désignés dans l'export par `$image` et `$solutions`.
const mediaIds = new Map<string, number | string>();
const solutionIds = new Map<string, number | string>();

async function uploadImage(src: string, alt: string) {
  const cached = mediaIds.get(src);
  if (cached) return cached;
  const filePath = path.resolve(process.cwd(), "public", src.replace(/^\//, ""));
  const doc = await payload.create({ collection: "media", data: { alt }, filePath, ...local });
  mediaIds.set(src, doc.id);
  return doc.id;
}

async function resolve(value: Json): Promise<Json> {
  if (Array.isArray(value)) return Promise.all(value.map(resolve));
  if (value === null || typeof value !== "object") return value;
  if (typeof value.$image === "string") return uploadImage(value.$image, String(value.alt));
  if (Array.isArray(value.$solutions)) {
    return value.$solutions.map((slug) => {
      const id = solutionIds.get(String(slug));
      if (!id) throw new Error(`Solution inconnue : ${slug}`);
      return id;
    });
  }
  const entries = await Promise.all(Object.entries(value).map(async ([key, item]) => [key, await resolve(item)] as const));
  return Object.fromEntries(entries);
}

// 3. Fiches, publiées. Les solutions d'abord : secteurs et références s'y rattachent.
async function publishAll(collection: CollectionSlug, docs: Json[]) {
  for (const doc of docs) {
    const data = (await resolve(doc)) as Record<string, unknown>;
    // Le contenu vient d'un JSON validé par Payload à l'écriture : son type exact n'apporte rien ici.
    const created = await payload.create({ collection, data: { ...data, _status: "published" } as never, ...local });
    if (collection === "solutions") solutionIds.set(String(data.slug), created.id);
  }
  payload.logger.info(`${docs.length} × ${collection}`);
}

await publishAll("solutions", content.solutions);
await publishAll("sectors", content.sectors);
await publishAll("references", content.references);
await publishAll("challenges", content.challenges);
await publishAll("sales-contacts", content.salesContacts ?? []);

// 4. Pages et blocs communs, publiés.
for (const [slug, doc] of Object.entries(content.globals)) {
  const data = (await resolve(doc)) as Record<string, unknown>;
  await payload.updateGlobal({ slug: slug as GlobalSlug, data: { ...data, _status: "published" } as never, ...local });
}
payload.logger.info(`${Object.keys(content.globals).length} pages et blocs publiés, ${mediaIds.size} images dans la médiathèque`);

// 5. Comptes de démo, jamais en ligne : les comptes y sont nominatifs et créés par l'admin.
if (!online) await upsertDemoAccounts(payload);
process.exit(0);
