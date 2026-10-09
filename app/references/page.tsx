import type { Metadata } from "next";
import { Info } from "lucide-react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { ReferenceCard } from "@/components/sections/reference-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatRow } from "@/components/sections/stat-row";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { featuredReferences } from "@/data/references";
import { sectors } from "@/data/sectors";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { IconBadge } from "@/components/ui/icon-badge";
import { NumberBadge } from "@/components/ui/number-badge";

export const metadata: Metadata = {
  title: "Références clients",
  description:
    "Études de cas anonymisées : découvrez comment Novadis conçoit et déploie des architectures de sûreté dans les environnements les plus exigeants.",
};

const solutionLabels: Record<string, string> = {
  supervision: "Supervision globale",
  "it-infrastructure": "Infrastructure IT",
  "access-control": "Contrôle d'accès",
  "intrusion-detection": "Détection intrusion",
  "video-surveillance": "Vidéosurveillance",
  "ai-video-analytics": "Analyse d'image",
  "smart-integrations": "Intégrations",
};

export default function ReferencesPage() {
  return (
    <main className="relative">
      <SiteHeader />

      <PageHero
        eyebrow="Références clients"
        title="Des architectures de sûreté éprouvées sur le terrain"
        description="Chaque projet est unique. Ces cas illustrent comment Novadis adapte son expertise aux contraintes réelles de chaque environnement — de l'agence bancaire au CHU multi-sites, du flagship de luxe à la plateforme aéroportuaire."
      />

      <section className="shell-wide">
        <Reveal>
          <Card className="flex items-start gap-4 p-5">
            <IconBadge icon={Info} size="sm" />
            <p className="text-sm leading-6 text-muted-strong">
              Certaines références emblématiques sont présentées avec l&apos;accord du client.
              Les autres cas sont anonymisés ; les données techniques et les périmètres restent réels.
            </p>
          </Card>
        </Reveal>
      </section>

      <StatRow className="pt-10" />

      {/* Clients phares (nommés, avec accord) */}
      <section className="section-y">
        <div className="shell-wide">
          <SectionHeading eyebrow="Clients phares" title="Des environnements à très forte exigence" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredReferences.map((ref, i) => (
              <Reveal className="h-full" delay={i * 0.05} key={ref.name}>
                <ReferenceCard reference={ref} tags={ref.solutions.map((sol) => solutionLabels[sol] ?? sol)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Études de cas par secteur (anonymisées) */}
      <section className="section-soft section-y">
        <div className="shell-wide">
          <SectionHeading eyebrow="Études de cas" title="Déploiements par secteur" />

          <div className="mt-12 flex flex-col gap-6">
            {sectors.map((sector, sectorIndex) => (
              <Reveal delay={0.04} key={sector.slug}>
                <Card className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)]">
                  <div>
                    <Badge tone="primary">{`Secteur 0${sectorIndex + 1}`}</Badge>
                    <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground-strong">
                      {sector.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-primary-strong">{sector.tagline}</p>
                    <p className="mt-4 text-sm leading-6 text-muted-strong">{sector.desc}</p>

                    <p className="kicker mt-6">Solutions déployées</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {sector.solutions.map((sol) => (
                        <Badge key={sol} tone="outline">
                          {solutionLabels[sol] ?? sol}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {sector.examples.map((example, i) => (
                      <div
                        className="flex flex-col gap-3 rounded-xl border border-hairline bg-background p-5 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-primary/20 hover:bg-surface hover:shadow-lift"
                        key={i}
                      >
                        <NumberBadge size="sm" value={sectorIndex * 2 + i + 1} />
                        <h4 className="font-display text-base font-semibold leading-snug text-foreground-strong">
                          {example.title}
                        </h4>
                        <p className="text-sm leading-6 text-muted-strong">{example.body}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-muted-strong">
            D&apos;autres références sont disponibles sur demande, sous accord de confidentialité.
          </p>
        </div>
      </section>

      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
