import config from "@payload-config";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { getPayload } from "payload";
import { safePath } from "@/lib/safe-path";

// Ouvre le site en mode édition (brouillons visibles) pour un compte connecté à l'admin.
export async function GET(request: NextRequest) {
  const page = safePath(request.nextUrl.searchParams.get("page"));
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: request.headers });
  if (!user) redirect(`/admin/login?redirect=${encodeURIComponent(`/edition?page=${page}`)}`);

  (await draftMode()).enable();
  redirect(page);
}
