"use client";

import Link from "next/link";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="relative pb-20">
      <section className="shell-wide flex min-h-[70vh] flex-col justify-center pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Erreur serveur</p>
        <h1 className="section-title mt-6 text-balance text-4xl sm:text-6xl">
          Un incident technique nous empêche d&apos;afficher cette page
        </h1>
        <p className="mt-7 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">
          L&apos;équipe Novadis a été notifiée. Vous pouvez réessayer maintenant ou revenir à
          l&apos;accueil le temps que l&apos;incident soit résolu.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => reset()} size="lg" variant="primary">
            Réessayer
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Link href="/">
            <Button size="lg" variant="outline">
              Retour à l&apos;accueil
              <ArrowUpRight className="cta-arrow h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
