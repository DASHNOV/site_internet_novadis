// Ajoute au CMS les solutions de cms/seed-content.json qui lui manquent et aligne l'ordre d'affichage,
// sans toucher aux textes déjà édités dans l'administration (contrairement à cms:seed, qui remet tout à zéro).
// Usage : npm run cms:sync-solutions
// Pour réécrire les textes de fiches existantes depuis data/ : CMS_SYNC_REPLACE=slug1,slug2 (le visuel est conservé).
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { getPayload } from "payload";
import config from "../payload.config";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type SolutionDoc = { slug: string; order: number; [key: string]: Json };

const online = Boolean(process.env.DATABASE_URL);
if (online && process.env.CMS_SYNC_ONLINE !== "oui") {
  throw new Error("DATABASE_URL pointe vers la base en ligne : relancez avec CMS_SYNC_ONLINE=oui pour la modifier");
}

const contentFile = path.resolve(process.cwd(), "cms/seed-content.json");
if (!existsSync(contentFile)) throw new Error("cms/seed-content.json manque : lancez d'abord l'export");
const { solutions } = JSON.parse(readFileSync(contentFile, "utf8")) as { solutions: SolutionDoc[] };

const payload = await getPayload({ config });
const local = { overrideAccess: true } as const;

async function resolve(value: Json): Promise<Json> {
  if (Array.isArray(value)) return Promise.all(value.map(resolve));
  if (value === null || typeof value !== "object") return value;
  if (typeof value.$image === "string") {
    const filePath = path.resolve(process.cwd(), "public", value.$image.replace(/^\//, ""));
    const media = await payload.create({ collection: "media", data: { alt: String(value.alt) }, filePath, ...local });
    return media.id;
  }
  const entries = await Promise.all(Object.entries(value).map(async ([key, item]) => [key, await resolve(item)] as const));
  return Object.fromEntries(entries);
}

const existing = await payload.find({ collection: "solutions", limit: 100, depth: 0, draft: true, ...local });
const bySlug = new Map(existing.docs.map((doc) => [doc.slug, doc]));
const replace = new Set((process.env.CMS_SYNC_REPLACE ?? "").split(",").filter(Boolean));

for (const solution of solutions) {
  const current = bySlug.get(solution.slug);
  if (current && replace.has(solution.slug)) {
    const { media: _media, ...text } = solution;
    await payload.update({ collection: "solutions", id: current.id, data: { ...text, _status: "published" } as never, ...local });
    payload.logger.info(`Textes réécrits : ${solution.slug}`);
  } else if (!current) {
    const data = (await resolve(solution)) as Record<string, unknown>;
    await payload.create({ collection: "solutions", data: { ...data, _status: "published" } as never, ...local });
    payload.logger.info(`Ajoutée : ${solution.slug} (ordre ${solution.order})`);
  } else if (current.order !== solution.order) {
    await payload.update({ collection: "solutions", id: current.id, data: { order: solution.order }, ...local });
    payload.logger.info(`Ordre : ${solution.slug} ${current.order} → ${solution.order}`);
  }
}

process.exit(0);
