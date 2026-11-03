import { NextResponse, type NextRequest } from "next/server";
import { editingSession, isAdminUser, pendingDrafts } from "@/lib/content/editing";

// Compte connecté et modifications en attente de publication, pour la barre d'édition.
export async function GET(request: NextRequest) {
  const { payload, user } = await editingSession(request.headers);
  if (!user) return NextResponse.json({ error: "Session expirée : reconnectez-vous." }, { status: 401 });
  return NextResponse.json({
    user: { name: user.name, role: user.role },
    isAdmin: isAdminUser(user),
    pending: await pendingDrafts(payload, user),
  });
}
