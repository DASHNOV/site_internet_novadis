import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function LegalPage() {
  return (
    <main className="relative pb-20">
      <SiteHeader />
      <section className="shell-narrow pt-16 lg:pt-24">
        <Reveal>
          <p className="eyebrow">Mentions légales</p>
          <h1 className="section-title mt-6 text-balance text-3xl sm:text-5xl">Informations légales</h1>
          <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted-strong">
            <p>
              Cette page est un emplacement réservé aux informations légales : raison sociale, capital, adresse,
              directeur de la publication, hébergement, droit applicable.
            </p>
            <p>Remplacez ce contenu par les mentions légales officielles de Novadis avant la mise en production.</p>
          </div>
          <div className="mt-12 divider" />
        </Reveal>
      </section>
      <SiteFooter />
    </main>
  );
}
