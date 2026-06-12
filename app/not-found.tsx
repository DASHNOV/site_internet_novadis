import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <main className="relative pb-20">
      <SiteHeader />
      <section className="shell-wide flex min-h-[60vh] flex-col justify-center pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Erreur 404</p>
        <h1 className="section-title mt-6 text-balance text-4xl sm:text-6xl">
          Cette page n&apos;existe plus ou a été déplacée
        </h1>
        <p className="mt-7 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">
          Vous pouvez revenir à l&apos;accueil, explorer nos solutions ou nous contacter directement
          si vous cherchiez un contenu précis.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/">
            <Button size="lg" variant="primary">
              Retour à l&apos;accueil
              <ArrowUpRight className="cta-arrow h-4 w-4" />
            </Button>
          </Link>
          <Link href="/solutions">
            <Button size="lg" variant="outline">
              Voir les solutions
            </Button>
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
