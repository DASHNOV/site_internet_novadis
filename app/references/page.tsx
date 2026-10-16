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
import { IconBadge } from "@/components/ui/icon-badge";

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
        title="Des architectures de sûreté éprouvées sur le terrain"
        description="Chaque projet est unique. Ces cas illustrent comment Novadis adapte son expertise aux contraintes réelles de chaque environnement — de l'agence bancaire au CHU multi-sites, du flagship de luxe à la plateforme aéroportuaire."
      />

      <section className="shell-wide pt-8">
        <p className="flex max-w-3xl items-start gap-3 text-sm leading-6 text-muted-strong">
          <IconBadge className="mt-1" icon={Info} size="sm" />
          Certaines références emblématiques sont présentées avec l&apos;accord du client. Les autres cas sont
          anonymisés ; les données techniques et les périmètres restent réels.
        </p>
      </section>

      <div className="shell-wide pt-10">
        <StatRow />
      </div>

      {/* Clients phares (nommés, avec accord) */}
      <section className="section-y">
        <div className="shell-wide">
          <SectionHeading title="Des environnements à très forte exigence" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
          <SectionHeading title="Déploiements par secteur" />

          <div className="mt-12 border-t border-hairline">
            {sectors.map((sector) => (
              <Reveal key={sector.slug}>
                <article className="grid gap-8 border-b border-hairline py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] lg:gap-12">
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-foreground-strong">{sector.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-primary-strong">{sector.tagline}</p>
                    <p className="mt-4 text-sm leading-6 text-muted-strong">{sector.desc}</p>
                    <h4 className="mt-6 text-sm font-semibold text-foreground-strong">Solutions déployées</h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {sector.solutions.map((sol) => (
                        <li key={sol}>
                          <Badge tone="outline">{solutionLabels[sol] ?? sol}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <ul className="grid border-l border-t border-hairline sm:grid-cols-2">
                    {sector.examples.map((example) => (
                      <li className="flex flex-col gap-3 border-b border-r border-hairline bg-surface p-6" key={example.title}>
                        <h4 className="font-display text-lg font-bold leading-snug text-foreground-strong">{example.title}</h4>
                        <p className="text-sm leading-6 text-muted-strong">{example.body}</p>
                      </li>
                    ))}
                  </ul>
                </article>
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
