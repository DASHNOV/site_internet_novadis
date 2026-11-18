import type { CmsRaw } from "./build";
import { encodeImageTarget, encodeTarget, type EditTarget } from "./stega";

// Champs techniques : ils pilotent des liens, des icônes ou l'ordre, une signature les casserait.
const TECHNICAL = new Set([
  "id",
  "slug",
  "href",
  "icon",
  "kind",
  "video",
  "poster",
  "mapsUrl",
  "order",
  "_status",
  "createdAt",
  "updatedAt",
  "updatedBy",
  "globalType",
]);

type Target = (path: string) => EditTarget;
type Doc = Record<string, unknown>;

const isDocument = (value: Doc) => "id" in value && "createdAt" in value;
const isMedia = (value: Doc) => isDocument(value) && typeof value.mimeType === "string" && typeof value.url === "string";

function annotate(value: unknown, path: string, target: Target): unknown {
  if (typeof value === "string") return value + encodeTarget(target(path));
  if (Array.isArray(value)) return value.map((item, index) => annotate(item, `${path}.${index}`, target));
  if (!value || typeof value !== "object") return value;

  const doc = value as Doc;
  if (isMedia(doc)) return { ...doc, url: encodeImageTarget(doc.url as string, target(path)) };
  // Documents liés (les solutions d'un secteur, par exemple) : ils se modifient sur leur propre fiche.
  if (path && isDocument(doc)) return doc;

  return Object.fromEntries(
    Object.entries(doc).map(([key, item]) => [
      key,
      TECHNICAL.has(key) ? item : annotate(item, path ? `${path}.${key}` : key, target),
    ]),
  );
}

const GLOBAL_SLUGS: Record<keyof CmsRaw["globals"], string> = {
  home: "home",
  solutionsPage: "solutions-page",
  sectorsPage: "sectors-page",
  servicesPage: "services-page",
  referencesPage: "references-page",
  aboutPage: "about-page",
  contactPage: "contact-page",
  common: "common",
  demos: "demos",
};

const COLLECTIONS = ["solutions", "sectors", "references", "challenges"] as const;

// Ajoute à chaque texte et à chaque image l'adresse du champ CMS d'où il vient (mode édition uniquement).
export function annotateForEditing(raw: CmsRaw): CmsRaw {
  const globals = Object.fromEntries(
    Object.entries(raw.globals).map(([key, doc]) => {
      const slug = GLOBAL_SLUGS[key as keyof CmsRaw["globals"]];
      return [key, annotate(doc, "", (path) => ({ kind: "global", slug, path }))];
    }),
  ) as CmsRaw["globals"];

  const collections = Object.fromEntries(
    COLLECTIONS.map((collection) => [
      collection,
      raw[collection].map((doc) => {
        const { id } = doc;
        return Object.fromEntries(
          Object.entries(doc).map(([key, item]) => [
            key,
            TECHNICAL.has(key) ? item : annotate(item, key, (path) => ({ kind: "collection", collection, id, path })),
          ]),
        );
      }),
    ]),
  );

  return { ...raw, ...collections, globals } as CmsRaw;
}
