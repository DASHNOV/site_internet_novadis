import type { Metadata } from "next";
import { CheckCircle2, ClipboardList, Hammer, LineChart, ShieldCheck } from "lucide-react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { MediaStage } from "@/components/sections/media-stage";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { IconBadge } from "@/components/ui/icon-badge";
import { NumberBadge } from "@/components/ui/number-badge";
import { mediaLibrary, processSteps } from "@/data/site";

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
        eyebrow="Services"
        title="Un modèle de delivery rigoureux pour les environnements de sûreté complexes"
        description="Nos services couvrent l'ensemble du cycle de vie : audit, conception, déploiement, maintenance et formation. L'objectif : protéger la qualité de déploiement, limiter les surprises lors des mises en service et préserver la maintenabilité à long terme."
      >
        <MediaStage>
          <MediaFrame
            priority
            alt="Présentation Novadis"
            caption="Démonstration · Services Novadis"
            className="aspect-[16/11]"
            kind="video"
            poster={mediaLibrary.presentVideoPoster}
            src={mediaLibrary.presentVideo}
          />
        </MediaStage>
      </PageHero>

      <section className="section-y">
        <div className="shell-wide">
          <ol className="relative space-y-6 before:absolute before:bottom-10 before:left-6 before:top-10 before:hidden before:w-px before:bg-gradient-to-b before:from-primary/50 before:via-accent/30 before:to-transparent sm:before:block">
            {processSteps.map((item, index) => (
              <li className="relative grid gap-5 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-8" key={item.step}>
                <Reveal>
                  <NumberBadge className="relative z-10" size="lg" value={item.step} />
                </Reveal>
                <Reveal delay={0.06}>
                  <Card className="p-6 sm:p-8" interactive>
                    <div className="flex flex-wrap items-center gap-3">
                      <IconBadge icon={stepIcons[index] ?? ClipboardList} size="sm" />
                      <Badge tone="primary">{`Étape ${item.step} · ${item.deliverables.length} livrables`}</Badge>
                    </div>
                    <h2 className="section-title mt-5 text-balance text-2xl sm:text-3xl">{item.title}</h2>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-muted-strong">{item.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.deliverables.map((deliverable) => (
                        <Badge key={deliverable} tone="outline">
                          {deliverable}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-soft section-y">
        <div className="shell-wide grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
          <Reveal>
            <p className="eyebrow">Engagement Novadis</p>
            <h2 className="section-title mt-5 text-balance text-3xl sm:text-4xl">
              Une méthode conçue <span className="text-gradient">pour rester opérationnelle après le déploiement</span>
            </h2>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              "Documentation technique livrée à chaque jalon",
              "Coordination avec exploitation, IT et services généraux",
              "Maintenance préventive planifiée par site",
              "Support 24/7 pour les environnements sensibles",
            ].map((label, index) => (
              <li className="h-full" key={label}>
                <Reveal className="h-full" delay={index * 0.06}>
                  <Card className="flex h-full items-start gap-4 p-5" interactive>
                    <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 flex-none text-success" />
                    <p className="text-sm font-medium leading-6 text-foreground-strong">{label}</p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
