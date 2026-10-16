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
    <main className="relative">
      <SiteHeader />

      <section className="shell-wide flex min-h-[60vh] flex-col justify-center py-24">

        <h1 className="section-title max-w-4xl text-balance text-4xl text-[clamp(2.5rem,5vw,4.25rem)]">
          Cette page n&apos;existe plus ou a été déplacée
        </h1>
        <p className="mt-7 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">
          Vous pouvez revenir à l&apos;accueil, explorer nos solutions ou nous contacter directement
          si vous cherchiez un contenu précis.
        </p>
        <p className="data-label mt-6">Erreur 404</p>
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
