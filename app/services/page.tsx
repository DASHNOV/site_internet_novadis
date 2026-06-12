import type { Metadata } from "next";
import { ClipboardList, Hammer, LineChart, ShieldCheck } from "lucide-react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { mediaLibrary, processSteps } from "@/data/site";

export const metadata: Metadata = {
  title: "Services & méthodologie",
  description:
    "Audit, conception, déploiement, maintenance et formation — un modèle de delivery rigoureux pour les environnements de sûreté complexes.",
};

const stepIcons = [ClipboardList, Hammer, ShieldCheck, LineChart];

export default function ServicesPage() {
  return (
    <main className="relative pb-20">
      <SiteHeader />
      <PageHero
        eyebrow="Services"
        title="Un modèle de delivery rigoureux pour les environnements de sûreté complexes"
        description="Nos services couvrent l'ensemble du cycle de vie : audit, conception, déploiement, maintenance et formation. L'objectif : protéger la qualité de déploiement, limiter les surprises lors des mises en service et préserver la maintenabilité à long terme."
      >
        <MediaFrame
          alt="Présentation Novadis"
          caption="Démonstration · Services Novadis"
          className="aspect-[16/11]"
          kind="video"
          poster={mediaLibrary.homepageVisual}
          src={mediaLibrary.presentVideo}
        />
      </PageHero>

      <section className="shell-wide pt-16">
        <div className="flex flex-col">
          {processSteps.map((item, index) => {
            const Icon = stepIcons[index] ?? ClipboardList;
            return (
              <Reveal delay={index * 0.06} key={item.step}>
                <article className="relative grid gap-8 border-t border-[rgba(var(--hairline-strong))] py-14 sm:grid-cols-[120px_minmax(0,1fr)] lg:py-16">
                  <div className="flex flex-col gap-6">
                    <span className="font-display text-6xl font-bold leading-none text-foreground-strong sm:text-7xl">
                      {item.step}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/35 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">
                      Étape {item.step} · {item.deliverables.length} livrables
                    </p>
                    <h2 className="section-title mt-3 text-balance text-2xl sm:text-3xl lg:text-[2.2rem]">
                      {item.title}
                    </h2>
                    <p className="mt-5 max-w-3xl text-base leading-7 text-muted-strong">{item.description}</p>
                    <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                      {item.deliverables.map((deliverable) => (
                        <span
                          className="inline-flex items-center gap-2 text-sm text-foreground"
                          key={deliverable}
                        >
                          <span className="h-1 w-1 rounded-full bg-primary" />
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="shell-wide pt-24">
        <Reveal>
          <div className="grid gap-12 border-t border-[rgba(var(--hairline-strong))] pt-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <p className="eyebrow">Engagement Novadis</p>
              <h2 className="section-title mt-5 text-balance text-3xl font-semibold sm:text-4xl">
                Une méthode conçue pour rester opérationnelle après le déploiement
              </h2>
            </div>
            <ul className="grid gap-px bg-[rgba(var(--hairline-strong))] sm:grid-cols-2">
              {[
                "Documentation technique livrée à chaque jalon",
                "Coordination avec exploitation, IT et services généraux",
                "Maintenance préventive planifiée par site",
                "Support 24/7 pour les environnements sensibles",
              ].map((label) => (
                <li
                  className="bg-[rgb(var(--background))] px-5 py-6 text-sm leading-6 text-foreground-strong"
                  key={label}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
