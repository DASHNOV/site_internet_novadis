import type { Metadata } from "next";
import { CheckCircle2, ClipboardList, Hammer, LineChart, ShieldCheck } from "lucide-react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { IconBadge } from "@/components/ui/icon-badge";
import { NumberBadge } from "@/components/ui/number-badge";
import { mediaLibrary, processSteps, serviceCommitments } from "@/data/site";

export const metadata: Metadata = {
  title: "Services & méthodologie",
  description:
    "Audit, conception, déploiement, maintenance et formation — un modèle de delivery rigoureux pour les environnements de sûreté complexes.",
};

const stepIcons = [ClipboardList, Hammer, ShieldCheck, LineChart];

export default function ServicesPage() {
  return (
    <main className="relative">
      <SiteHeader />
      <PageHero
        title="Un modèle de delivery rigoureux pour les environnements de sûreté complexes"
        description="Nos services couvrent l'ensemble du cycle de vie : audit, conception, déploiement, maintenance et formation. L'objectif : protéger la qualité de déploiement, limiter les surprises lors des mises en service et préserver la maintenabilité à long terme."
      >
        <MediaFrame
          priority
          alt="Présentation Novadis"
          caption="Démonstration · Services Novadis"
          className="aspect-[16/11]"
          kind="video"
          poster={mediaLibrary.presentVideoPoster}
          src={mediaLibrary.presentVideo}
        />
      </PageHero>

      <section className="section-y">
        <div className="shell-wide">
          <ol className="border-t border-hairline">
            {processSteps.map((item, index) => {
              const Icon = stepIcons[index] ?? ClipboardList;
              return (
                <li
                  className="grid gap-6 border-b border-hairline py-10 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[64px_minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14 lg:py-14"
                  key={item.step}
                >
                  <Reveal>
                    <NumberBadge size="lg" value={item.step} />
                  </Reveal>
                  <Reveal delay={0.04}>
                    <h2 className="section-title flex items-center gap-3 text-balance text-[clamp(1.5rem,2.4vw,2rem)]">
                      <IconBadge icon={Icon} size="lg" />
                      {item.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-muted-strong">{item.description}</p>
                  </Reveal>
                  <Reveal className="sm:col-start-2 lg:col-start-3" delay={0.08}>
                    <h3 className="data-label">{`${item.deliverables.length} livrables`}</h3>
                    <ul className="mt-3 border-t border-hairline">
                      {item.deliverables.map((deliverable) => (
                        <li className="border-b border-hairline py-2.5 text-sm text-foreground-strong" key={deliverable}>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section-dark section-y">
        <div className="shell-wide grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
          <Reveal>
            <h2 className="section-title text-balance text-[clamp(2rem,3.4vw,3rem)]">
              Une méthode conçue <span className="text-second">pour rester opérationnelle après le déploiement</span>
            </h2>
          </Reveal>
          <Reveal className="console overflow-hidden" delay={0.06}>
            <div className="console-head">
              <span>Engagement Novadis</span>
            </div>
            <ul>
              {serviceCommitments.map((label) => (
                <li
                  className="flex items-start gap-3 border-b border-night-line px-5 py-4 text-sm font-medium leading-6 text-white last:border-b-0"
                  key={label}
                >
                  <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 flex-none text-glow" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
