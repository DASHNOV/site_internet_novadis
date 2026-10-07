import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Layers,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { featuredReferences } from "@/data/references";
import { ArchitectureDiagram } from "@/components/motion/architecture-diagram";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { PartnerCloud } from "@/components/sections/partner-cloud";
import { SectorsRail } from "@/components/sections/sectors-rail";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SolutionsScroll } from "@/components/motion/solutions-scroll";
import { TiltCard } from "@/components/motion/tilt-card";
import { StatRow } from "@/components/sections/stat-row";
import { Button } from "@/components/ui/button";
import {
  challenges,
  differentiators,
  industries,
  pillars,
  processSteps,
  regulatoryTopics,
  solutions,
  trustSignals,
} from "@/data/site";

export default function HomePage() {
  const featuredSolutions = solutions.slice(0, 6);
  const featuredSolutionsScroll = featuredSolutions.map((solution) => ({
    slug: solution.slug,
    title: solution.title,
    summary: solution.summary,
    benefits: solution.benefits,
    product: solution.product,
    media: solution.media,
  }));

  const pillarIcons = [Compass, Layers, Network];

  return (
    <main className="relative overflow-hidden">
      <SiteHeader />

      {/* HERO — full-bleed photo, dark overlay, Genetec-style */}
      <section className="section-dark relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            src={featuredReferences[1].image}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--background-dark))]/95 via-[rgb(var(--background-dark))]/65 to-[rgb(var(--background-dark))]/30"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--background-dark))]/80 via-[rgb(var(--background-dark))]/20 to-transparent"
          />
        </div>
        <p className="absolute bottom-6 right-6 z-10 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-white/60 lg:block">
          {featuredReferences[1].name} · site protégé par Novadis
        </p>
        <div className="shell-wide relative z-10 pb-28 pt-28 lg:pb-40 lg:pt-40">
          <div className="max-w-4xl">
            <Reveal>
              <p className="eyebrow">Créateur de solutions globales de sûreté</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="section-title mt-8 text-balance text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.75rem]">
                Protégez vos sites,
                <br />
                vos équipes et vos données
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-9 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                Novadis conçoit, intègre et maintient des systèmes de sûreté pour les entreprises, les sites
                industriels et les infrastructures critiques. De l&apos;informatique à la supervision intelligente,
                chaque couche est pensée pour durer.
              </p>
            </Reveal>
            <Reveal className="mt-11 flex flex-col gap-3 sm:flex-row" delay={0.22}>
              <Link href="/contact">
                <Button size="lg" variant="primary">
                  Prendre contact
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button
                  className="border-white/30 bg-white/5 text-white hover:border-white/60 hover:text-white"
                  size="lg"
                  variant="outline"
                >
                  Découvrir les solutions
                </Button>
              </Link>
            </Reveal>

            <Reveal className="mt-16 border-t border-white/12 pt-8" delay={0.3}>
              <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  {trustSignals
                    .filter((signal) => !signal.startsWith("Membre"))
                    .map((signal) => (
                      <span
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-white"
                        key={signal}
                      >
                        <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                        {signal}
                      </span>
                    ))}
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-400">
                    Technologies
                  </p>
                  {["Amadeus", "Ocularis", "Galaxy"].map((label) => (
                    <span
                      className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-slate-200"
                      key={label}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS — fond blanc */}
      <StatRow />

      {/* RÉFÉRENCES — preuve client remontée en haut de page */}
      <section className="section-soft py-32 lg:py-40">
        <div className="shell-wide">
          <SectionHeading
            eyebrow="Ils nous font confiance"
            title="Des environnements à très forte exigence"
            description="Hôpitaux, sites patrimoniaux, environnements de luxe : Novadis opère là où l'erreur n'est pas permise."
            actions={
              <Link href="/references">
                <Button size="default" variant="outline">
                  Voir toutes nos références
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Button>
              </Link>
            }
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {featuredReferences.map((reference, index) => (
              <Reveal delay={index * 0.07} key={reference.name}>
                <Link className="group block h-full" href="/references">
                  <article className="flex h-full flex-col">
                    <TiltCard className="rounded-[20px]">
                      <div className="relative aspect-[16/11] overflow-hidden rounded-[20px]">
                        <img
                          alt={reference.name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                          src={reference.image}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                        <div className="absolute inset-x-5 bottom-5">
                          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/80">
                            {reference.sector}
                          </p>
                          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white">
                            {reference.name}
                          </h3>
                        </div>
                      </div>
                    </TiltCard>
                    <p className="mt-4 text-sm leading-7 text-muted-strong">{reference.scope}</p>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS — fond blanc */}
      <PartnerCloud />

      {/* CONVERGENCE NARRATIVE — fond gris doux */}
      <section className="section-soft py-32 lg:py-40">
        <div className="shell-wide">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
            <Reveal>
              <p className="eyebrow">Architecture</p>
              <h2 className="section-title mt-6 text-balance text-4xl sm:text-6xl lg:text-[3.75rem]">
                L&apos;architecture compte autant que les équipements
              </h2>
              <p className="mt-8 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">
                Chez Novadis, la valeur ne vient pas d&apos;une juxtaposition de briques techniques. Elle vient
                d&apos;un système cohérent, documenté, évolutif et lisible pour les équipes qui l&apos;exploitent.
              </p>
              <div className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {[
                  { label: "Couche opérationnelle unifiée", icon: Workflow },
                  { label: "Corrélation inter-systèmes", icon: Network },
                  { label: "Conception durcie & maintenable", icon: ShieldCheck },
                  { label: "Intégrations prêtes pour l'évolution", icon: Sparkles },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div className="flex items-start gap-4 border-t border-[rgba(var(--hairline))] pt-5" key={item.label}>
                      <Icon className="mt-1 h-5 w-5 flex-none text-primary" />
                      <p className="text-base text-foreground">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ArchitectureDiagram
                caption="Architecture de principe · Réseau IP Sûreté Novadis"
                label="Architecture de principe Novadis — réseau IP sûreté, serveurs, postes opérateurs, terrain"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ENJEUX — entrée par problème métier, fond sombre */}
      <section className="section-dark py-32 lg:py-40">
        <div className="shell-wide">
          <SectionHeading
            eyebrow="Vos enjeux"
            title={
              <>
                Chaque projet commence
                <br />
                par un problème concret
              </>
            }
            description="Conformité, migration, multi-sites, charge opérateur : partez de votre enjeu, nous le relions à la bonne architecture."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              return (
                <Reveal delay={index * 0.06} key={challenge.slug}>
                  <Link className="group block h-full" href={challenge.href}>
                    <TiltCard className="h-full rounded-[20px]">
                      <article className="flex h-full flex-col rounded-[20px] border border-white/12 bg-white/[0.04] p-7 transition duration-300 group-hover:border-white/30 group-hover:bg-white/[0.07]">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-white">
                          {challenge.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-300">{challenge.description}</p>
                        <ul className="mt-5 space-y-2.5">
                          {challenge.points.map((point) => (
                            <li className="flex items-center gap-3 text-sm text-slate-200" key={point}>
                              <span aria-hidden className="h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                              {point}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-white">
                          En savoir plus
                          <ArrowUpRight className="cta-arrow h-4 w-4" />
                        </p>
                      </article>
                    </TiltCard>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOLUTIONS — fond gris doux */}
      <section className="section-soft py-32 lg:py-40">
        <div className="shell-wide">
          <SectionHeading
            eyebrow="Nos solutions"
            title="Des briques métiers conçues pour fonctionner ensemble"
            description="Chaque domaine apporte sa propre valeur. L'avantage Novadis est de les faire converger en un environnement homogène, durable et lisible."
            actions={
              <Link href="/solutions">
                <Button size="default" variant="outline">
                  Voir toutes les solutions
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Button>
              </Link>
            }
          />
          <div className="mt-12">
            <SolutionsScroll solutions={featuredSolutionsScroll} />
          </div>
        </div>
      </section>

      {/* INDUSTRIES — fond blanc */}
      <section className="py-32 lg:py-40">
        <div className="shell-wide">
          <SectionHeading
            eyebrow="Secteurs"
            title="Des systèmes adaptés à la logique réelle de chaque environnement"
          />
          <div className="mt-10">
            <SectorsRail />
          </div>
        </div>
      </section>

      {/* MÉTHODE — piliers + étapes du projet, fond sombre */}
      <section className="section-dark py-32 lg:py-40">
        <div className="shell-wide">
          <SectionHeading
            eyebrow="Notre signature"
            title={
              <>
                Trois temps qui structurent
                <br />
                chaque projet de sûreté
              </>
            }
            description="Nos clients ne cherchent pas une brique technique, mais un partenaire capable de cadrer, faire converger et inscrire la sûreté dans la durée."
            actions={
              <Link href="/services">
                <Button
                  className="border-white/30 bg-white/5 text-white hover:border-white/60 hover:text-white"
                  size="default"
                  variant="outline"
                >
                  Voir la méthodologie
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Button>
              </Link>
            }
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillarIcons[index] ?? Compass;
              return (
                <Reveal delay={index * 0.08} key={pillar.title}>
                  <article className="h-full rounded-[20px] border border-white/12 bg-white/[0.04] p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">
                        {`0${index + 1} / 03`}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-slate-300">{pillar.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {pillar.points.map((point) => (
                        <span className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-slate-200" key={point}>
                          {point}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-20">
            <p className="eyebrow">Services</p>
          </Reveal>
          <ol className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item, index) => (
              <li className="border-t border-white/12 pt-6" key={item.step}>
                <Reveal delay={index * 0.07}>
                  <p className="font-display text-3xl font-bold text-primary">{item.step}</p>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SUJETS DU MOMENT — réglementation comme accroche, fond gris doux */}
      <section className="section-soft py-32 lg:py-40">
        <div className="shell-wide">
          <SectionHeading
            eyebrow="Les sujets du moment"
            title="La réglementation redessine la sûreté"
            description="NIS2, ANSSI, CNIL : les échéances réglementaires deviennent le premier déclencheur des projets de sûreté. Nous les transformons en feuille de route."
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {regulatoryTopics.map((topic, index) => (
              <Reveal delay={index * 0.08} key={topic.slug}>
                <Link className="group block" href={topic.href}>
                  <article className="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[20px] p-8 sm:p-10">
                    <img
                      alt=""
                      aria-hidden
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      src={topic.media}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--background-dark))]/95 via-[rgb(var(--background-dark))]/65 to-[rgb(var(--background-dark))]/35"
                    />
                    <div className="relative">
                      <h3 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {topic.title}
                      </h3>
                      <p className="mt-4 max-w-lg text-sm leading-7 text-slate-200 sm:text-base">
                        {topic.description}
                      </p>
                    </div>
                    <p className="relative mt-8 flex items-center gap-2 text-sm font-medium text-white">
                      {topic.linkLabel}
                      <ArrowUpRight className="cta-arrow h-4 w-4" />
                    </p>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT + différenciateurs — fond blanc */}
      <section className="py-32 lg:py-40">
        <div className="shell-wide">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
            <Reveal>
              <MediaFrame
                alt={industries[2].title}
                caption="Novadis · 14-16 Rue Clément Bayard · Levallois-Perret"
                className="aspect-[16/12]"
                kind="image"
                src={industries[2].media}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow">À propos</p>
              <h2 className="section-title mt-6 text-balance text-4xl sm:text-6xl lg:text-[3.75rem]">
                Une ingénierie centrée sur l&apos;humain et la continuité de service
              </h2>
              <p className="mt-8 text-base leading-7 text-muted-strong sm:text-lg">
                Novadis combine expertise infrastructure, expérience terrain et discipline d&apos;intégration pour
                livrer des systèmes que les équipes peuvent exploiter durablement, pas seulement valider sur le papier.
              </p>
              <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {differentiators.map((item) => (
                  <li className="flex items-start gap-3 border-t border-[rgba(var(--hairline))] pt-4" key={item}>
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" />
                    <p className="text-sm leading-6 text-foreground">{item}</p>
                  </li>
                ))}
              </ul>
              <blockquote className="mt-10 border-l-2 border-primary pl-6">
                <p className="text-base leading-7 text-foreground">
                  «&nbsp;L&apos;Homme et sa sécurité doivent constituer la première préoccupation de toute aventure
                  technologique.&nbsp;»
                </p>
                <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                  Albert Einstein — principe fondateur Novadis
                </p>
              </blockquote>
              <div className="mt-10">
                <Link href="/about">
                  <Button size="default" variant="outline">
                    Découvrir Novadis
                    <ArrowUpRight className="cta-arrow h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
