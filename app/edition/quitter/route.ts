import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { safePath } from "@/lib/safe-path";

export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  redirect(safePath(request.nextUrl.searchParams.get("page")));
}
