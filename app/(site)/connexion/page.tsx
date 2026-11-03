import type { Metadata } from "next";
import { LoginForm } from "@/components/edit/login-form";
import { mediaLibrary } from "@/data/site";
import { demoPrefill } from "@/lib/demo-prefill";
import { safePath } from "@/lib/safe-path";

export const metadata: Metadata = {
  title: "Modifier le site",
  robots: { index: false, follow: false },
};

// Porte d'entrée des commerciaux : connexion, puis le site s'ouvre directement en mode modification.
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-hairline-strong bg-surface p-8 shadow-overlay">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="Novadis" className="h-7 w-auto" src={mediaLibrary.logo} />
        <h1 className="mt-8 text-2xl font-semibold text-foreground-strong">Modifier le site</h1>
        <p className="mt-2 text-sm text-muted-strong">
          Connectez-vous : le site s&apos;ouvre, et un clic sur un texte ou une image suffit pour le modifier.
        </p>
        <LoginForm page={safePath(page ?? null)} prefill={demoPrefill()} />
      </div>
    </main>
  );
}
