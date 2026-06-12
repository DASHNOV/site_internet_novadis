import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { featuredReferences } from "@/data/references";
import { sectors } from "@/data/sectors";
import { siteMetrics } from "@/data/site";

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
    <main className="relative pb-20">
      <SiteHeader />

      <PageHero
        eyebrow="Références clients"
        title="Des architectures de sûreté éprouvées sur le terrain"
        description="Chaque projet est unique. Ces cas illustrent comment Novadis adapte son expertise aux contraintes réelles de chaque environnement — de l'agence bancaire au CHU multi-sites, du flagship de luxe à la plateforme aéroportuaire."
      />

      {/* Disclaimer */}
      <section className="shell pt-10">
        <Reveal>
          <div className="flex items-start gap-3 rounded-xl border border-[rgba(var(--hairline-strong))] bg-[rgba(var(--card))] px-5 py-4">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <p className="text-sm leading-6 text-muted-strong">
              Certaines références emblématiques sont présentées avec l&apos;accord du client.
              Les autres cas sont anonymisés ; les données techniques et les périmètres restent réels.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Métriques globales */}
      <section className="shell pt-16">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[rgba(var(--hairline-strong))] bg-[rgba(var(--hairline-strong))] sm:grid-cols-4">
            {siteMetrics.map((metric) => (
              <div
                className="flex flex-col gap-1 bg-[rgb(var(--background))] px-6 py-6"
                key={metric.label}
              >
                <p className="text-2xl font-bold tracking-tight text-foreground-strong sm:text-3xl">
                  {metric.value}
                </p>
                <p className="text-xs font-medium text-muted-strong">{metric.label}</p>
                {metric.caption && (
                  <p className="text-[11px] text-muted">{metric.caption}</p>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Clients phares (nommés, avec accord) */}
      <section className="shell pt-20">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">
              Clients phares
            </p>
            <div className="h-px flex-1 bg-[rgba(var(--hairline))]" />
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground-strong sm:text-3xl">
            Des environnements à très forte exigence
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredReferences.map((ref, i) => (
            <Reveal delay={i * 0.05} key={ref.name}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(var(--hairline-strong))] bg-[rgba(var(--card))]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[rgba(var(--hairline))]">
                  <img
                    alt={ref.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    src={ref.image}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                    {ref.sector}
                  </p>
                  <h3 className="text-base font-semibold leading-snug text-foreground-strong">
                    {ref.name}
                  </h3>
                  <p className="text-sm leading-6 text-muted-strong">{ref.scope}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {ref.solutions.map((sol) => (
                      <span
                        className="inline-flex items-center rounded-md border border-[rgba(var(--hairline-strong))] bg-[rgb(var(--background))] px-2.5 py-1 text-[11px] font-medium text-foreground"
                        key={sol}
                      >
                        {solutionLabels[sol] ?? sol}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Études de cas par secteur (anonymisées) */}
      <section className="shell pt-20">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">
              Études de cas
            </p>
            <div className="h-px flex-1 bg-[rgba(var(--hairline))]" />
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground-strong sm:text-3xl">
            Déploiements par secteur
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-16">
          {sectors.map((sector, sectorIndex) => (
            <Reveal delay={sectorIndex * 0.05} key={sector.slug}>
              <div>
                {/* En-tête secteur */}
                <div className="flex items-baseline gap-4 border-t border-[rgba(var(--hairline-strong))] pt-10">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">
                    {`Secteur · 0${sectorIndex + 1}`}
                  </p>
                  <div className="h-px flex-1 bg-[rgba(var(--hairline))]" />
                </div>

                <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)]">
                  {/* Description secteur */}
                  <div className="lg:pt-1">
                    <h2 className="text-xl font-bold text-foreground-strong">{sector.title}</h2>
                    <p className="mt-2 text-sm font-medium text-primary">{sector.tagline}</p>
                    <p className="mt-4 text-sm leading-6 text-muted-strong">{sector.desc}</p>

                    {/* Solutions associées */}
                    <div className="mt-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                        Solutions déployées
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {sector.solutions.map((sol) => (
                          <span
                            className="inline-flex items-center rounded-md border border-[rgba(var(--hairline-strong))] bg-[rgba(var(--card))] px-2.5 py-1 text-[11px] font-medium text-foreground"
                            key={sol}
                          >
                            {solutionLabels[sol] ?? sol}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cartes cas clients */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {sector.examples.map((example, i) => (
                      <div
                        className="panel group flex flex-col gap-4 p-6 transition-colors hover:bg-[rgb(var(--background-elevated))]"
                        key={i}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                            {`Cas client · ${String(sectorIndex * 2 + i + 1).padStart(2, "0")}`}
                          </p>
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        <h3 className="text-base font-semibold leading-snug text-foreground-strong">
                          {example.title}
                        </h3>
                        <p className="text-sm leading-6 text-muted-strong">{example.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Note de bas de page */}
      <section className="shell pt-16">
        <Reveal>
          <p className="text-center text-sm text-muted">
            D&apos;autres références sont disponibles sur demande, sous accord de confidentialité.
          </p>
        </Reveal>
      </section>

      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
