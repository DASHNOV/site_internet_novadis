import { NextResponse, type NextRequest } from "next/server";
import { describeField, editingSession } from "@/lib/content/editing";
import type { EditTarget } from "@/lib/content/stega";

// Libellé et longueur maximale du champ qu'on s'apprête à modifier dans la page.
export async function POST(request: NextRequest) {
  const { payload, user } = await editingSession(request.headers);
  if (!user) return NextResponse.json({ error: "Session expirée : reconnectez-vous." }, { status: 401 });
  const field = describeField(payload, (await request.json()) as EditTarget);
  if (!field) return NextResponse.json({ error: "Ce texte ne se modifie pas ici." }, { status: 404 });
  return NextResponse.json(field);
}
