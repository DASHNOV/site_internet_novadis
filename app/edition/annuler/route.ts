import { NextResponse, type NextRequest } from "next/server";
import type { CollectionSlug, GlobalSlug } from "payload";
import { editingSession, pendingDrafts } from "@/lib/content/editing";

// Abandonne les modifications en attente : chaque contenu revient à sa dernière version publiée.
export async function POST(request: NextRequest) {
  const { payload, user } = await editingSession(request.headers);
  if (!user) return NextResponse.json({ error: "Session expirée : reconnectez-vous." }, { status: 401 });

  const options = { user, overrideAccess: false, depth: 0 } as const;
  const published = { "version._status": { equals: "published" } } as const;
  const failed: string[] = [];
  for (const item of await pendingDrafts(payload, user)) {
    try {
      if (item.kind === "global") {
        const slug = item.slug as GlobalSlug;
        const { docs } = await payload.findGlobalVersions({ slug, where: published, sort: "-updatedAt", limit: 1, ...options });
        if (!docs[0]) throw new Error("aucune version publiée");
        await payload.restoreGlobalVersion({ slug, id: String(docs[0].id), ...options });
      } else {
        const collection = item.slug as CollectionSlug;
        const { docs } = await payload.findVersions({
          collection,
          where: { ...published, parent: { equals: item.id } },
          sort: "-updatedAt",
          limit: 1,
          ...options,
        });
        if (!docs[0]) throw new Error("aucune version publiée");
        await payload.restoreVersion({ collection, id: String(docs[0].id), ...options });
      }
    } catch (error) {
      payload.logger.warn({ msg: `Annulation impossible : ${item.label}`, error });
      failed.push(item.label);
    }
  }
  return NextResponse.json({ failed }, { status: failed.length ? 400 : 200 });
}
