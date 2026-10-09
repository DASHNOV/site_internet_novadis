import Link from "next/link";
import {
  ArrowRight,
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
import { HeroConsole } from "@/components/sections/hero-console";
import { MediaFrame } from "@/components/sections/media-frame";
import { PartnerCloud } from "@/components/sections/partner-cloud";
import { SectorsRail } from "@/components/sections/sectors-rail";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StatRow } from "@/components/sections/stat-row";
import { Badge } from "@/components/ui/badge";
import { Blobs } from "@/components/ui/blobs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconBadge } from "@/components/ui/icon-badge";
import { cn } from "@/lib/utils";
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
  const spotlightSolutions = solutions.slice(0, 3);
  const otherSolutions = solutions.slice(3);
  const pillarIcons = [Compass, Layers, Network];

  return (
    <main className="relative overflow-hidden">
      <SiteHeader />

      {/* HERO — texte d'abord, console de supervision isométrique à droite */}
      <section className="relative isolate overflow-hidden">
        <Blobs variant="hero" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(var(--primary)/0.14)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,black,transparent)]"
        />
        <div className="shell-wide grid gap-16 pb-10 pt-12 sm:pt-16 lg:grid-cols-2 lg:items-center lg:gap-12 lg:pb-16 lg:pt-20">
          <div>
            <Reveal>
              <p className="eyebrow">Créateur de solutions globales de sûreté</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="section-title mt-7 text-balance text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
                Protégez vos sites, <span className="text-gradient">vos équipes et vos données</span>
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-7 max-w-xl text-base leading-7 text-muted-strong sm:text-lg sm:leading-8">
                Novadis conçoit, intègre et maintient des systèmes de sûreté pour les entreprises, les sites
                industriels et les infrastructures critiques. De l&apos;informatique à la supervision intelligente,
                chaque couche est pensée pour durer.
              </p>
            </Reveal>
            <Reveal className="mt-9 flex flex-col gap-3 sm:flex-row" delay={0.22}>
              <Link href="/contact">
                <Button className="w-full sm:w-auto" size="lg" variant="primary">
                  Prendre contact
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button className="w-full sm:w-auto" size="lg" variant="outline">
                  Découvrir les solutions
                </Button>
              </Link>
            </Reveal>

            <Reveal className="mt-10" delay={0.3}>
              <div className="flex flex-wrap items-center gap-2">
                {trustSignals
                  .filter((signal) => !signal.startsWith("Membre"))
                  .map((signal) => (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1.5 text-xs font-medium text-foreground shadow-soft"
                      key={signal}
                    >
                      <ShieldCheck aria-hidden className="h-3.5 w-3.5 text-primary" />
                      {signal}
                    </span>
                  ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                <p className="kicker">Technologies</p>
                {["Amadeus", "Ocularis", "Galaxy"].map((label) => (
                  <span className="font-display text-sm font-bold text-foreground-strong" key={label}>
                    {label}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <HeroConsole />
          </Reveal>
        </div>
      </section>

      <StatRow className="pt-10 lg:pt-12" />

      {/* RÉFÉRENCES — preuve client remontée en haut de page */}
      <section className="section-soft section-y mt-8">
        <div className="shell-wide">
          <SectionHeading
            eyebrow="Ils nous font confiance"
            title="Des environnements à très forte exigence"
            description="Hôpitaux, sites patrimoniaux, environnements de luxe : Novadis opère là où l'erreur n'est pas permise."
            actions={
              <Link href="/references">
                <Button variant="outline">
                  Voir toutes nos références
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Button>
              </Link>
            }
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredReferences.map((reference, index) => (
              <Reveal className="h-full" delay={index * 0.07} key={reference.name}>
                <Link className="group block h-full" href="/references">
                  <Card className="flex h-full flex-col overflow-hidden" interactive>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        alt={reference.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                        src={reference.image}
                      />
                      <div className="absolute inset-0 bg-night/0 transition duration-500 group-hover:bg-night/15" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <Badge className="self-start" tone="primary">
                        {reference.sector}
                      </Badge>
                      <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground-strong">
                        {reference.name}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-strong">{reference.scope}</p>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PartnerCloud />

      {/* ARCHITECTURE — schéma isométrique */}
      <section className="section-y relative isolate">
        <Blobs />
        <div className="shell-wide">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
            <Reveal>
              <p className="eyebrow">Architecture</p>
              <h2 className="section-title mt-5 text-balance text-3xl sm:text-4xl lg:text-5xl">
                L&apos;architecture compte <span className="text-gradient">autant que les équipements</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">
                Chez Novadis, la valeur ne vient pas d&apos;une juxtaposition de briques techniques. Elle vient
                d&apos;un système cohérent, documenté, évolutif et lisible pour les équipes qui l&apos;exploitent.
              </p>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Couche opérationnelle unifiée", icon: Workflow },
                  { label: "Corrélation inter-systèmes", icon: Network },
                  { label: "Conception durcie & maintenable", icon: ShieldCheck },
                  { label: "Intégrations prêtes pour l'évolution", icon: Sparkles },
                ].map((item) => (
                  <Card className="flex items-center gap-4 p-4" interactive key={item.label}>
                    <IconBadge icon={item.icon} size="sm" />
                    <p className="text-sm font-semibold text-foreground-strong">{item.label}</p>
                  </Card>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="iso-stage">
                <div className="iso-card-reverse rounded-2xl border border-hairline bg-surface p-3 shadow-float sm:p-4">
                  <ArchitectureDiagram
                    caption="Architecture de principe · Réseau IP Sûreté Novadis"
                    label="Architecture de principe Novadis — réseau IP sûreté, serveurs, postes opérateurs, terrain"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ENJEUX — entrée par problème métier */}
      <section className="section-soft section-y">
        <div className="shell-wide">
          <SectionHeading
            eyebrow="Vos enjeux"
            title={
              <>
                Chaque projet commence <span className="text-gradient">par un problème concret</span>
              </>
            }
            description="Conformité, migration, multi-sites, charge opérateur : partez de votre enjeu, nous le relions à la bonne architecture."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {challenges.map((challenge, index) => (
              <Reveal className="h-full" delay={index * 0.06} key={challenge.slug}>
                <Link className="group block h-full" href={challenge.href}>
                  <Card className="flex h-full flex-col p-7" interactive>
                    <IconBadge icon={challenge.icon} />
                    <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-foreground-strong">
                      {challenge.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-strong">{challenge.description}</p>
                    <ul className="mt-5 space-y-2.5">
                      {challenge.points.map((point) => (
                        <li className="flex items-center gap-3 text-sm text-foreground" key={point}>
                          <CheckCircle2 aria-hidden className="h-4 w-4 flex-none text-primary" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-primary-strong">
                      En savoir plus
                      <ArrowRight className="cta-arrow h-4 w-4" />
                    </p>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS — zig-zag des solutions phares, puis grille */}
      <section className="section-y">
        <div className="shell-wide">
          <SectionHeading
            eyebrow="Nos solutions"
            title="Des briques métiers conçues pour fonctionner ensemble"
            description="Chaque domaine apporte sa propre valeur. L'avantage Novadis est de les faire converger en un environnement homogène, durable et lisible."
            actions={
              <Link href="/solutions">
                <Button variant="outline">
                  Voir toutes les solutions
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Button>
              </Link>
            }
          />

          <div className="mt-16 space-y-20 lg:space-y-28">
            {spotlightSolutions.map((solution, index) => {
              const reversed = index % 2 === 1;
              return (
                <div
                  className={cn("flex flex-col gap-10 lg:items-center lg:gap-16", reversed ? "lg:flex-row-reverse" : "lg:flex-row")}
                  key={solution.slug}
                >
                  <Reveal className="lg:w-1/2">
                    <div className="group perspective-[2000px]">
                      <div
                        className={cn(
                          "overflow-hidden rounded-2xl border border-hairline bg-surface p-2 shadow-float transition-transform duration-500 ease-out lg:group-hover:rotate-y-0",
                          reversed ? "lg:-rotate-y-6" : "lg:rotate-y-6",
                        )}
                      >
                        <MediaFrame
                          alt={solution.media.alt}
                          className="aspect-[16/10] rounded-xl"
                          kind={solution.media.kind}
                          poster={solution.media.poster}
                          src={solution.media.src}
                        />
                      </div>
                    </div>
                  </Reveal>
                  <Reveal className="lg:w-1/2" delay={0.1}>
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-brand-gradient font-display text-sm font-bold text-white shadow-glow">
                        {`0${index + 1}`}
                      </span>
                      {solution.product && <p className="text-sm font-medium text-muted-strong">{solution.product}</p>}
                    </div>
                    <h3 className="section-title mt-6 text-2xl sm:text-3xl lg:text-4xl">{solution.title}</h3>
                    <p className="mt-5 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">{solution.summary}</p>
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {solution.benefits.map((benefit) => (
                        <li className="flex items-center gap-3 text-sm font-medium text-foreground-strong" key={benefit}>
                          <CheckCircle2 aria-hidden className="h-5 w-5 flex-none text-success" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <Link
                      className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary-strong hover:text-primary"
                      href={`/solutions/${solution.slug}`}
                    >
                      Découvrir la solution
                      <ArrowRight className="cta-arrow h-4 w-4" />
                    </Link>
                  </Reveal>
                </div>
              );
            })}
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
            {otherSolutions.map((solution, index) => (
              <Reveal className="h-full" delay={index * 0.06} key={solution.slug}>
                <Link className="group block h-full" href={`/solutions/${solution.slug}`}>
                  <Card className="flex h-full flex-col p-6" interactive>
                    <IconBadge icon={solution.icon} />
                    <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-foreground-strong">
                      {solution.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-strong">{solution.summary}</p>
                    <span className="mt-auto pt-5 text-primary-strong">
                      <ArrowRight aria-hidden className="cta-arrow h-4 w-4" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTEURS */}
      <section className="section-soft section-y">
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

      {/* MÉTHODE — piliers + étapes, section nuit */}
      <section className="section-dark section-y relative isolate overflow-hidden">
        <Blobs variant="night" />
        <div className="shell-wide">
          <SectionHeading
            eyebrow="Notre signature"
            title={
              <>
                Trois temps qui structurent <span className="text-gradient">chaque projet de sûreté</span>
              </>
            }
            description="Nos clients ne cherchent pas une brique technique, mais un partenaire capable de cadrer, faire converger et inscrire la sûreté dans la durée."
            actions={
              <Link href="/services">
                <Button variant="glass">
                  Voir la méthodologie
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Button>
              </Link>
            }
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal className="h-full" delay={index * 0.08} key={pillar.title}>
                <Card className="h-full p-8" interactive tone="glass">
                  <div className="flex items-center justify-between">
                    <IconBadge icon={pillarIcons[index] ?? Compass} tone="solid" />
                    <span className="text-xs font-semibold tracking-[0.12em] text-glow">{`0${index + 1} / 03`}</span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-white">{pillar.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-300">{pillar.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {pillar.points.map((point) => (
                      <span
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200"
                        key={point}
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20">
            <p className="eyebrow">Services</p>
          </Reveal>
          <ol className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item, index) => (
              <li className="relative" key={item.step}>
                {index < processSteps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-14 right-[-2rem] top-6 hidden h-px bg-gradient-to-r from-glow/50 to-white/0 lg:block"
                  />
                )}
                <Reveal delay={index * 0.07}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient font-display text-base font-bold text-white shadow-glow">
                    {item.step}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SUJETS DU MOMENT — la réglementation comme accroche */}
      <section className="section-y">
        <div className="shell-wide">
          <SectionHeading
            eyebrow="Les sujets du moment"
            title="La réglementation redessine la sûreté"
            description="NIS2, ANSSI, CNIL : les échéances réglementaires deviennent le premier déclencheur des projets de sûreté. Nous les transformons en feuille de route."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {regulatoryTopics.map((topic, index) => (
              <Reveal delay={index * 0.08} key={topic.slug}>
                <Link className="group block" href={topic.href}>
                  <article className="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl p-8 shadow-soft transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:shadow-lift sm:p-10">
                    <img
                      alt=""
                      aria-hidden
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      src={topic.media}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/70 to-primary-deep/40"
                    />
                    <div className="relative">
                      <h3 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        {topic.title}
                      </h3>
                      <p className="mt-4 max-w-lg text-sm leading-7 text-slate-200 sm:text-base">{topic.description}</p>
                    </div>
                    <p className="relative mt-8 inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                      {topic.linkLabel}
                      <ArrowRight className="cta-arrow h-4 w-4" />
                    </p>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* À PROPOS + différenciateurs */}
      <section className="section-soft section-y">
        <div className="shell-wide">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="relative perspective-[2000px]">
                <div className="overflow-hidden rounded-2xl border border-hairline bg-surface p-2 shadow-float lg:rotate-x-[4deg] lg:rotate-y-[8deg]">
                  <MediaFrame
                    alt={industries[2].title}
                    caption="Novadis · 14-16 Rue Clément Bayard · Levallois-Perret"
                    className="aspect-[16/12] rounded-xl"
                    kind="image"
                    src={industries[2].media}
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow">À propos</p>
              <h2 className="section-title mt-5 text-balance text-3xl sm:text-4xl lg:text-5xl">
                Une ingénierie centrée <span className="text-gradient">sur l&apos;humain et la continuité de service</span>
              </h2>
              <p className="mt-6 text-base leading-7 text-muted-strong sm:text-lg">
                Novadis combine expertise infrastructure, expérience terrain et discipline d&apos;intégration pour
                livrer des systèmes que les équipes peuvent exploiter durablement, pas seulement valider sur le papier.
              </p>
              <ul className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {differentiators.map((item) => (
                  <li className="flex items-start gap-3" key={item}>
                    <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 flex-none text-success" />
                    <p className="text-sm leading-6 text-foreground">{item}</p>
                  </li>
                ))}
              </ul>
              <blockquote className="panel mt-8 border-l-4 border-l-primary p-6">
                <p className="text-base leading-7 text-foreground-strong">
                  «&nbsp;L&apos;Homme et sa sécurité doivent constituer la première préoccupation de toute aventure
                  technologique.&nbsp;»
                </p>
                <p className="mt-3 text-xs font-semibold text-muted-strong">Albert Einstein — principe fondateur Novadis</p>
              </blockquote>
              <div className="mt-8">
                <Link href="/about">
                  <Button variant="outline">
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
