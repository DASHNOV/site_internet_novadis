import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { featuredReferences } from "@/data/references";
import { ArchitectureDiagram } from "@/components/motion/architecture-diagram";
import { HeroFilm } from "@/components/motion/hero-film";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { NormsList, PartnerGrid } from "@/components/sections/partner-cloud";
import { ReferenceCard } from "@/components/sections/reference-card";
import { SectorsRail } from "@/components/sections/sectors-rail";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StatRow } from "@/components/sections/stat-row";
import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/ui/icon-badge";
import { NumberBadge } from "@/components/ui/number-badge";
import {
  architecturePoints,
  challenges,
  differentiators,
  getSolution,
  heroFilm,
  heroTechnologies,
  industries,
  pillars,
  processSteps,
  regulatoryTopics,
  solutions,
  trustSignals,
} from "@/data/site";

export default function HomePage() {
  const heroMarkers = heroFilm.markers.flatMap((marker) => {
    const solution = getSolution(marker.slug);
    return solution ? [{ id: marker.slug, label: solution.shortTitle, x: marker.x, y: marker.y, side: marker.side }] : [];
  });

  return (
    <main className="relative overflow-clip">
      <SiteHeader />

      {/* 1 · HERO — plan drone du site, puis les repères de supervision se verrouillent sur l'image */}
      <section className="section-dark relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <HeroFilm
            focusX={heroFilm.focusX}
            hubId={heroFilm.hub}
            markers={heroMarkers}
            perimeter={heroFilm.perimeter}
            posterEnd={heroFilm.posterEnd}
            posterStart={heroFilm.posterStart}
            status={heroFilm.status}
            video={heroFilm.video}
          />
        </div>
        <div className="shell-wide flex min-h-[calc(100svh-4rem)] items-end pb-14 pt-24 md:items-center md:pb-24 lg:min-h-[calc(100svh-5rem)]">
          <div className="max-w-2xl">
            <Reveal>
              <h1 className="section-title text-balance text-[clamp(2.5rem,5.4vw,4.5rem)]">
                Protégez vos sites, <span className="text-second">vos équipes et vos données</span>
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-xl text-base leading-7 text-foreground sm:text-lg sm:leading-8">
                Novadis conçoit, intègre et maintient des systèmes de sûreté pour les entreprises, les sites
                industriels et les infrastructures critiques. De l&apos;informatique à la supervision intelligente,
                chaque couche est pensée pour durer.
              </p>
            </Reveal>
            <Reveal className="mt-9 flex flex-col gap-3 sm:flex-row" delay={0.14}>
              <Link href="/contact">
                <Button className="w-full sm:w-auto" size="lg" variant="inverse">
                  Prendre contact
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button className="w-full sm:w-auto" size="lg" variant="outline-night">
                  Découvrir les solutions
                </Button>
              </Link>
            </Reveal>

            <Reveal className="mt-12 hidden border-t border-night-line pt-6 sm:block" delay={0.2}>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground">
                {trustSignals
                  .filter((signal) => !signal.startsWith("Membre"))
                  .map((signal) => (
                    <li key={signal}>{signal}</li>
                  ))}
              </ul>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="data-label">Technologies</span>
                {heroTechnologies.map((label) => (
                  <span className="font-display text-base font-bold text-white" key={label}>
                    {label}
                  </span>
                ))}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2 · PREUVE — chiffres puis références nommées */}
      <section className="section-y">
        <div className="shell-wide">
          <StatRow />
          <SectionHeading
            actions={
              <Link href="/references">
                <Button variant="outline">
                  Voir toutes nos références
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Button>
              </Link>
            }
            className="mt-20 lg:mt-28"
            description="Hôpitaux, sites patrimoniaux, environnements de luxe : Novadis opère là où l'erreur n'est pas permise."
            title="Des environnements à très forte exigence"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {featuredReferences.map((reference, index) => (
              <Reveal className="h-full" delay={index * 0.06} key={reference.name}>
                <ReferenceCard href="/references" reference={reference} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · CONVERGENCE — l'architecture de principe en console */}
      <section className="section-dark section-y">
        <div className="shell-wide grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
          <Reveal>
            <h2 className="section-title text-balance text-[clamp(2rem,3.4vw,3rem)]">
              L&apos;architecture compte <span className="text-second">autant que les équipements</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">
              Chez Novadis, la valeur ne vient pas d&apos;une juxtaposition de briques techniques. Elle vient
              d&apos;un système cohérent, documenté, évolutif et lisible pour les équipes qui l&apos;exploitent.
            </p>
            <ul className="mt-10 divide-y divide-night-line border-y border-night-line">
              {architecturePoints.map((item) => (
                <li className="flex items-center gap-3 py-3.5 text-sm font-medium text-white" key={item.label}>
                  <IconBadge icon={item.icon} tone="glass" />
                  {item.label}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="console overflow-hidden">
              <ArchitectureDiagram
                caption="Architecture de principe · Réseau IP Sûreté Novadis"
                label="Architecture de principe Novadis — réseau IP sûreté, serveurs, postes opérateurs, terrain"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 · ENJEUX → SOLUTIONS — on entre par le problème, on sort sur la brique */}
      <section className="section-y">
        <div className="shell-wide">
          <SectionHeading
            description="Conformité, migration, multi-sites, charge opérateur : partez de votre enjeu, nous le relions à la bonne architecture."
            title={
              <>
                Chaque projet commence <span className="text-second">par un problème concret</span>
              </>
            }
          />
          <ul className="mt-12 grid border-l border-t border-hairline md:grid-cols-2 xl:grid-cols-3">
            {challenges.map((challenge) => (
              <li className="border-b border-r border-hairline" key={challenge.slug}>
                <Link
                  className="group flex h-full flex-col bg-surface p-7 transition-colors duration-150 hover:bg-background-soft sm:p-8"
                  href={challenge.href}
                >
                  <h3 className="flex items-start gap-3 font-display text-xl font-bold tracking-tight text-foreground-strong group-hover:text-primary-strong">
                    <IconBadge className="mt-1" icon={challenge.icon} />
                    {challenge.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-strong">{challenge.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-foreground">
                    {challenge.points.map((point) => (
                      <li className="flex items-center gap-2" key={point}>
                        <span aria-hidden className="h-1 w-1 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-primary-strong">
                    En savoir plus
                    <ArrowRight aria-hidden className="cta-arrow h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <Reveal>
              <h2 className="section-title text-balance text-[clamp(1.75rem,2.6vw,2.25rem)]">
                Des briques métiers <span className="text-second">conçues pour fonctionner ensemble</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-muted-strong">
                Chaque domaine apporte sa propre valeur. L&apos;avantage Novadis est de les faire converger en un
                environnement homogène, durable et lisible.
              </p>
              <Link className="mt-8 inline-block" href="/solutions">
                <Button variant="outline">
                  Voir toutes les solutions
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Button>
              </Link>
            </Reveal>
            <Reveal delay={0.06}>
              <ul className="border-t border-hairline">
                {solutions.map((solution) => (
                  <li className="border-b border-hairline" key={solution.slug}>
                    <Link
                      className="group grid min-h-16 grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_auto]"
                      href={`/solutions/${solution.slug}`}
                    >
                      <span className="flex items-center gap-3 font-display text-lg font-bold text-foreground-strong group-hover:text-primary-strong">
                        <IconBadge icon={solution.icon} />
                        {solution.title}
                      </span>
                      <span className="col-start-1 row-start-2 pl-8 text-sm text-muted-strong sm:col-start-2 sm:row-start-1 sm:pl-0">
                        {solution.product}
                      </span>
                      <ArrowRight
                        aria-hidden
                        className="cta-arrow col-start-2 row-span-2 row-start-1 h-4 w-4 text-primary-strong sm:col-start-3 sm:row-span-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5 · SECTEURS */}
      <SectorsRail heading={<SectionHeading title="Des systèmes adaptés à la logique réelle de chaque environnement" />} />

      {/* 6 · MÉTHODE — trois temps puis les quatre étapes de service */}
      <section className="section-dark section-y">
        <div className="shell-wide">
          <SectionHeading
            actions={
              <Link href="/services">
                <Button variant="outline-night">
                  Voir la méthodologie
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Button>
              </Link>
            }
            description="Nos clients ne cherchent pas une brique technique, mais un partenaire capable de cadrer, faire converger et inscrire la sûreté dans la durée."
            title={
              <>
                Trois temps qui structurent <span className="text-second">chaque projet de sûreté</span>
              </>
            }
          />
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal className="h-full" delay={index * 0.06} key={pillar.title}>
                <article className="console flex h-full flex-col">
                  <div className="p-7 sm:p-8">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-white">{pillar.title}</h3>
                    <p className="mt-3 text-base leading-7 text-muted-strong">{pillar.description}</p>
                  </div>
                  <ul className="mt-auto border-t border-night-line">
                    {pillar.points.map((point) => (
                      <li className="data-label border-b border-night-line px-7 py-3 last:border-b-0 sm:px-8" key={point}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <ol className="mt-20 grid gap-x-8 gap-y-12 border-t border-night-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item, index) => (
              <li className="relative" key={item.step}>
                {index < processSteps.length - 1 && (
                  <span aria-hidden className="absolute left-14 right-[-2rem] top-5 hidden h-px bg-night-line lg:block" />
                )}
                <Reveal delay={index * 0.06}>
                  <NumberBadge className="border-night-line bg-background-dark" value={item.step} />
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-strong">{item.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7 · CONFORMITÉ — réglementation, normes et partenaires regroupés */}
      <section className="section-y">
        <div className="shell-wide">
          <SectionHeading
            description="NIS2, ANSSI, CNIL : les échéances réglementaires deviennent le premier déclencheur des projets de sûreté. Nous les transformons en feuille de route."
            title="La réglementation redessine la sûreté"
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {regulatoryTopics.map((topic, index) => (
              <Reveal className="h-full" delay={index * 0.06} key={topic.slug}>
                <Link
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-surface transition-colors duration-150 hover:border-primary sm:flex-row"
                  href={topic.href}
                >
                  <img
                    alt=""
                    className="aspect-[16/9] w-full border-b border-hairline object-cover sm:aspect-auto sm:w-2/5 sm:border-b-0 sm:border-r"
                    loading="lazy"
                    src={topic.media}
                  />
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-3xl font-bold tracking-tight text-foreground-strong">{topic.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-strong">{topic.description}</p>
                    <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-primary-strong">
                      {topic.linkLabel}
                      <ArrowRight aria-hidden className="cta-arrow h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-end">
            <h2 className="section-title text-balance text-[clamp(1.75rem,2.6vw,2.25rem)]">Partenaires & conformité</h2>
            <p className="max-w-xl text-base leading-7 text-muted-strong">
              Une chaîne de partenariats stricts et un cadre normatif clair pour bâtir des architectures ouvertes,
              normées et tenues dans la durée.
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <NormsList />
          </Reveal>
          <Reveal className="mt-10">
            <PartnerGrid />
          </Reveal>
        </div>
      </section>

      {/* 8 · À PROPOS */}
      <section className="section-soft section-y">
        <div className="shell-wide grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <MediaFrame
              alt={industries[2].title}
              caption="Novadis · 14-16 Rue Clément Bayard · Levallois-Perret"
              className="aspect-[16/12]"
              kind="image"
              src={industries[2].media}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="section-title text-balance text-[clamp(2rem,3.4vw,3rem)]">
              Une ingénierie centrée <span className="text-second">sur l&apos;humain et la continuité de service</span>
            </h2>
            <p className="mt-6 text-base leading-7 text-muted-strong sm:text-lg">
              Novadis combine expertise infrastructure, expérience terrain et discipline d&apos;intégration pour
              livrer des systèmes que les équipes peuvent exploiter durablement, pas seulement valider sur le papier.
            </p>
            <ul className="mt-8 grid border-t border-hairline sm:grid-cols-2 sm:gap-x-8">
              {differentiators.map((item) => (
                <li className="border-b border-hairline py-3 text-sm leading-6 text-foreground-strong" key={item}>
                  {item}
                </li>
              ))}
            </ul>
            <blockquote className="mt-10">
              <p className="font-display text-xl font-semibold leading-snug tracking-tight text-foreground-strong sm:text-2xl">
                «&nbsp;L&apos;Homme et sa sécurité doivent constituer la première préoccupation de toute aventure
                technologique.&nbsp;»
              </p>
              <footer className="mt-3 text-sm text-muted-strong">Albert Einstein — principe fondateur Novadis</footer>
            </blockquote>
            <Link className="mt-10 inline-block" href="/about">
              <Button variant="outline">
                Découvrir Novadis
                <ArrowUpRight className="cta-arrow h-4 w-4" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
