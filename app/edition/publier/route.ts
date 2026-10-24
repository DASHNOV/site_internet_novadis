import { NextResponse, type NextRequest } from "next/server";
import type { CollectionSlug, GlobalSlug } from "payload";
import { editingSession, pendingDrafts, userCanPublish, withoutMeta } from "@/lib/content/editing";

// Publie tous les brouillons en attente. Réservé aux publieurs et aux admins (vérifié aussi par Payload).
export async function POST(request: NextRequest) {
  const { payload, user } = await editingSession(request.headers);
  if (!user) return NextResponse.json({ error: "Session expirée : reconnectez-vous." }, { status: 401 });
  if (!userCanPublish(user)) return NextResponse.json({ error: "Seul un publieur peut publier." }, { status: 403 });

  const options = { user, overrideAccess: false, depth: 0 } as const;
  const failed: string[] = [];
  const pending = await pendingDrafts(payload, user);
  for (const item of pending) {
    try {
      if (item.kind === "global") {
        const slug = item.slug as GlobalSlug;
        const doc = await payload.findGlobal({ slug, ...options, draft: true });
        await payload.updateGlobal({ slug, data: { ...withoutMeta(doc), _status: "published" } as never, ...options });
      } else {
        const collection = item.slug as CollectionSlug;
        const doc = await payload.findByID({ collection, id: item.id!, ...options, draft: true });
        await payload.update({
          collection,
          id: item.id!,
          data: { ...withoutMeta(doc), _status: "published" } as never,
          ...options,
        });
      }
    } catch (error) {
      payload.logger.warn({ msg: `Publication refusée : ${item.label}`, error });
      failed.push(item.label);
    }
  }
  return NextResponse.json({ published: pending.length - failed.length, failed }, { status: failed.length ? 400 : 200 });
}
