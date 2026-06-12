import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Confidentialité",
};

export default function PrivacyPage() {
  return (
    <main className="relative pb-20">
      <SiteHeader />
      <section className="shell-narrow pt-16 lg:pt-24">
        <Reveal>
          <p className="eyebrow">Confidentialité</p>
          <h1 className="section-title mt-6 text-balance text-3xl sm:text-5xl">Politique de confidentialité</h1>
          <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted-strong">
            <p>
              Cette page est un emplacement réservé aux informations RGPD et au traitement des données personnelles
              relatives aux demandes de contact, cookies et outils d&apos;analyse.
            </p>
            <p>Remplacez ce contenu par la politique officielle de Novadis avant la mise en production.</p>
          </div>
          <div className="mt-12 divider" />
        </Reveal>
      </section>
      <SiteFooter />
    </main>
  );
}
