import { NextResponse, type NextRequest } from "next/server";
import { ValidationError, type CollectionSlug, type GlobalSlug } from "payload";
import {
  EDITABLE_COLLECTIONS,
  EDITABLE_GLOBALS,
  describeField,
  editingSession,
  setAtPath,
  withoutMeta,
} from "@/lib/content/editing";
import type { EditTarget } from "@/lib/content/stega";

type Body = { target: EditTarget; value: unknown };

// Enregistre en brouillon un texte ou une image modifiés dans la page, avec les droits du compte connecté.
export async function POST(request: NextRequest) {
  const { payload, user } = await editingSession(request.headers);
  if (!user) return NextResponse.json({ error: "Session expirée : reconnectez-vous." }, { status: 401 });

  const { target, value } = (await request.json()) as Body;
  const field = describeField(payload, target);
  if (!field) return NextResponse.json({ error: "Ce texte ne se modifie pas ici." }, { status: 400 });
  if (field.type === "text") {
    if (typeof value !== "string" || !value.trim()) {
      return NextResponse.json({ error: "Le texte ne peut pas être vide." }, { status: 400 });
    }
    // Payload ne contrôle pas les longueurs d'un brouillon : on prévient dès l'enregistrement.
    if (field.maxLength && value.length > field.maxLength) {
      return NextResponse.json(
        { error: `Texte trop long : ${field.maxLength} caractères au maximum (${value.length} actuellement).` },
        { status: 400 },
      );
    }
  } else if (typeof value !== "number") {
    return NextResponse.json({ error: "Image invalide." }, { status: 400 });
  }

  const options = { user, overrideAccess: false, draft: true, depth: 0 } as const;
  try {
    if (target.kind === "global") {
      if (!EDITABLE_GLOBALS.includes(target.slug as GlobalSlug)) throw new Error("page inconnue");
      const slug = target.slug as GlobalSlug;
      const doc = await payload.findGlobal({ slug, ...options });
      const data = setAtPath(withoutMeta(doc), target.path, value);
      if (!data) return NextResponse.json({ error: "Ce texte n'existe plus." }, { status: 409 });
      await payload.updateGlobal({ slug, data: { ...data, _status: "draft" } as never, ...options });
    } else {
      if (!EDITABLE_COLLECTIONS.includes(target.collection as CollectionSlug)) throw new Error("fiche inconnue");
      const collection = target.collection as CollectionSlug;
      const doc = await payload.findByID({ collection, id: target.id, ...options });
      const data = setAtPath(withoutMeta(doc), target.path, value);
      if (!data) return NextResponse.json({ error: "Ce texte n'existe plus." }, { status: 409 });
      await payload.update({ collection, id: target.id, data: { ...data, _status: "draft" } as never, ...options });
    }
  } catch (error) {
    const message = error instanceof ValidationError ? error.message : "Enregistrement refusé.";
    payload.logger.warn({ msg: "Édition dans la page refusée", error });
    return NextResponse.json({ error: message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
