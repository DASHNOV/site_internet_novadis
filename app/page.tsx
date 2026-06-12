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
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { PartnerCloud } from "@/components/sections/partner-cloud";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SolutionsScroll } from "@/components/motion/solutions-scroll";
import { StatRow } from "@/components/sections/stat-row";
import { Button } from "@/components/ui/button";
import {
  differentiators,
  industries,
  mediaLibrary,
  pillars,
  processSteps,
  solutions,
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
          <video
            aria-hidden
            autoPlay
            className="h-full w-full object-cover"
            loop
            muted
            playsInline
            poster={mediaLibrary.imgSecurityOps}
          >
            <source src="/novadis/videos/hero-earth.mp4" type="video/mp4" />
          </video>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--background-dark))]/70 via-[rgb(var(--background-dark))]/30 to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--background-dark))]/60 via-transparent to-transparent"
          />
        </div>
        <div className="shell-wide relative z-10 pb-28 pt-28 lg:pb-40 lg:pt-40">
          <div className="max-w-4xl">
            <Reveal>
              <p className="eyebrow">#DetailsMakeTheDifference</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="section-title mt-8 text-balance text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.75rem]">
                Créateur de solutions
                <br />
                globales de sûreté
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

            <Reveal className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/12 pt-8" delay={0.3}>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-400">
                Technologies partenaires
              </p>
              {["Amadeus", "Ocularis", "Galaxy", "Microsoft Embedded", "Dell OEM"].map((label) => (
                <span
                  className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-slate-200"
                  key={label}
                >
                  {label}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS + PARTNERS — fond blanc */}
      <StatRow />
      <PartnerCloud />

      {/* PILLARS — fond gris doux */}
      <section className="section-soft py-32 lg:py-40">
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
          />
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillarIcons[index] ?? Compass;
              return (
                <Reveal delay={index * 0.08} key={pillar.title}>
                  <article className="panel h-full p-8">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">
                      {`0${index + 1} / 03`}
                    </span>
                    <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground-strong">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-muted-strong">{pillar.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {pillar.points.map((point) => (
                        <span
                          className="rounded-full border border-[rgba(var(--hairline-strong))] px-3 py-1.5 text-xs text-foreground"
                          key={point}
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONVERGENCE NARRATIVE — fond blanc */}
      <section className="py-32 lg:py-40">
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
              <MediaFrame
                alt="Architecture de principe Novadis — réseau IP sûreté, serveurs, postes opérateurs, terrain"
                caption="Architecture de principe · Réseau IP Sûreté Novadis"
                className="aspect-[16/11]"
                kind="image"
                src={mediaLibrary.architecturePrincipe}
              />
            </Reveal>
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
          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-4">
            {industries.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal delay={index * 0.06} key={item.slug}>
                  <article className="group flex h-full flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
                      <img
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                        src={item.media}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-black/40 backdrop-blur">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute inset-x-5 bottom-5">
                        <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/80">
                          {`Secteur 0${index + 1}`}
                        </p>
                        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-muted-strong">{item.summary}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* METHODOLOGY — section dark feature, contraste fort */}
      <section className="section-dark py-32 lg:py-40">
        <div className="shell-wide">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)]">
            <Reveal className="max-w-xl">
              <p className="eyebrow">Services</p>
              <h2 className="section-title mt-6 text-balance text-4xl sm:text-6xl lg:text-[3.75rem]">
                De l&apos;étude à la maintenance, une discipline d&apos;exploitation
              </h2>
              <p className="mt-8 text-base leading-7 text-slate-300 sm:text-lg">
                Les environnements complexes exigent plus qu&apos;une installation. Ils demandent rigueur, coordination
                et logique de maintenabilité.
              </p>
              <Link className="mt-10 inline-block" href="/services">
                <Button
                  className="border-white/30 bg-white/5 text-white hover:border-white/60 hover:text-white"
                  size="lg"
                  variant="outline"
                >
                  Voir la méthodologie
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Button>
              </Link>
            </Reveal>
            <div className="space-y-0">
              {processSteps.map((item, index) => (
                <Reveal delay={index * 0.07} key={item.step}>
                  <div className="grid gap-6 border-t border-white/12 py-8 sm:grid-cols-[100px_minmax(0,1fr)] sm:items-start">
                    <div className="font-display text-3xl font-bold text-primary sm:text-4xl">{item.step}</div>
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-base leading-7 text-slate-300">{item.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.deliverables.map((deliverable) => (
                          <span
                            className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-slate-200"
                            key={deliverable}
                          >
                            {deliverable}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
              <div className="border-t border-white/12" />
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS — fond blanc */}
      <section className="py-32 lg:py-40">
        <div className="shell-wide">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <Reveal>
              <p className="eyebrow">Ce qui distingue Novadis</p>
              <h2 className="section-title mt-6 text-balance text-4xl sm:text-6xl lg:text-[3.75rem]">
                Ouverte, évolutive, utile à la décision
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {differentiators.map((item) => (
                  <div className="flex items-start gap-3 border-t border-[rgba(var(--hairline))] pt-5" key={item}>
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" />
                    <p className="text-base leading-7 text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ABOUT — fond gris doux */}
      <section className="section-soft py-32 lg:py-40">
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
