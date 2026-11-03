// Outils serveur de l'édition dans la page : session, description d'un champ, brouillons en attente.
// Toutes les opérations passent par l'API locale avec le compte connecté : ses droits Payload s'appliquent.
import config from "@payload-config";
import { getPayload, type CollectionSlug, type FlattenedField, type GlobalSlug, type Payload } from "payload";
import type { Role } from "@/access";
import type { EditTarget } from "./stega";

export const EDITABLE_GLOBALS: GlobalSlug[] = [
  "home",
  "solutions-page",
  "sectors-page",
  "services-page",
  "references-page",
  "about-page",
  "contact-page",
  "common",
  "demos",
];
export const EDITABLE_COLLECTIONS: CollectionSlug[] = ["solutions", "sectors", "references", "challenges"];

export async function editingSession(headers: Headers) {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers });
  return { payload, user };
}

type Field = { label: string; maxLength?: number; multiline: boolean; type: "text" | "image" };

const labelOf = (field: FlattenedField) => (typeof field.label === "string" ? field.label : field.name);

// Retrouve la définition du champ visé (« hero.title.lead », « capabilities.2.value »…).
export function describeField(payload: Payload, target: EditTarget): Field | null {
  const entity =
    target.kind === "global"
      ? payload.config.globals.find((global) => global.slug === target.slug)
      : payload.config.collections.find((collection) => collection.slug === target.collection);
  if (!entity) return null;

  let fields: FlattenedField[] = entity.flattenedFields;
  let field: FlattenedField | undefined;
  const labels: string[] = [];
  for (const key of target.path.split(".")) {
    if (/^\d+$/.test(key)) {
      labels.push(`ligne ${Number(key) + 1}`);
      continue;
    }
    field = fields.find((candidate) => "name" in candidate && candidate.name === key);
    if (!field) return null;
    // Une ligne de liste simple n'a qu'un champ « Texte » : « Capacités clés › ligne 2 » suffit.
    if (!(key === "value" && /^ligne \d+$/.test(labels.at(-1) ?? ""))) labels.push(labelOf(field));
    fields = "flattenedFields" in field ? field.flattenedFields : [];
  }
  if (!field) return null;
  if (field.type === "upload") return { label: labels.join(" › "), multiline: false, type: "image" };
  if (field.type !== "text" && field.type !== "textarea") return null;
  return {
    label: labels.join(" › "),
    maxLength: field.maxLength ?? undefined,
    multiline: field.type === "textarea",
    type: "text",
  };
}

const META = new Set(["id", "createdAt", "updatedAt", "globalType", "_status", "updatedBy"]);

export function withoutMeta(doc: object): Record<string, unknown> {
  return Object.fromEntries(Object.entries(doc).filter(([key]) => !META.has(key)));
}

// Remplace une seule valeur dans une copie du document ; le chemin doit déjà exister.
export function setAtPath(doc: Record<string, unknown>, path: string, value: unknown) {
  const copy = structuredClone(doc);
  const keys = path.split(".");
  let node: unknown = copy;
  for (const key of keys.slice(0, -1)) {
    if (!node || typeof node !== "object" || !(key in node)) return null;
    node = (node as Record<string, unknown>)[key];
  }
  const last = keys.at(-1)!;
  if (!node || typeof node !== "object" || !(last in node)) return null;
  (node as Record<string, unknown>)[last] = value;
  return copy;
}

export type Pending = { kind: "global" | "collection"; slug: string; id?: number | string; label: string };

// Documents dont la dernière version est un brouillon non publié.
export async function pendingDrafts(payload: Payload, user: NonNullable<Awaited<ReturnType<typeof editingSession>>["user"]>) {
  const pending: Pending[] = [];
  const options = { user, overrideAccess: false, draft: true, depth: 0 } as const;
  for (const slug of EDITABLE_GLOBALS) {
    const doc = await payload.findGlobal({ slug, ...options });
    if (doc._status === "draft") {
      const label = payload.config.globals.find((global) => global.slug === slug)?.label;
      pending.push({ kind: "global", slug, label: typeof label === "string" ? label : slug });
    }
  }
  for (const collection of EDITABLE_COLLECTIONS) {
    const { docs } = await payload.find({ collection, ...options, pagination: false, where: { _status: { equals: "draft" } } });
    const config = payload.config.collections.find((entry) => entry.slug === collection);
    const titleKey = config?.admin.useAsTitle ?? "id";
    for (const doc of docs) {
      pending.push({ kind: "collection", slug: collection, id: doc.id, label: String((doc as unknown as Record<string, unknown>)[titleKey]) });
    }
  }
  return pending;
}

export const isAdminUser = (user: { role?: Role } | null) => user?.role === "admin";
