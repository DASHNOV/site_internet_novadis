import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { industries } from "@/data/site";

export const metadata: Metadata = {
  title: "Secteurs & environnements",
  description:
    "Tertiaire, industrie, logistique, sites sensibles, réseaux multi-sites, ERP : Novadis adapte chaque architecture à la logique d'exploitation du site.",
};

export default function SecteursPage() {
  return (
    <main className="relative pb-20">
      <SiteHeader />
      <PageHero
        eyebrow="Secteurs"
        title="Des systèmes adaptés à la logique d'exploitation de chaque environnement"
        description="La conception de la sûreté change selon qu'il s'agit d'un campus, d'une usine, d'une plateforme logistique ou d'un environnement critique. Novadis adapte l'architecture à la réalité du terrain."
      >
        <MediaFrame
          alt={industries[0].title}
          caption="Tertiaire · convergence multi-sites"
          className="aspect-[16/11]"
          kind="image"
          src={industries[0].media}
        />
      </PageHero>

      <section className="shell-wide pt-16">
        <div className="flex flex-col">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const reverse = index % 2 === 1;
            return (
              <Reveal delay={index * 0.05} key={industry.slug}>
                <article
                  className={`grid gap-10 border-t border-[rgba(var(--hairline-strong))] py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-20 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className="relative">
                    <MediaFrame
                      alt={industry.title}
                      className="aspect-[4/3]"
                      kind="image"
                      src={industry.media}
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">
                      {`Secteur · 0${index + 1}`}
                    </p>
                    <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/35 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="section-title mt-6 text-balance text-3xl sm:text-4xl lg:text-[2.4rem]">
                      {industry.title}
                    </h2>
                    <p className="mt-5 max-w-xl text-base leading-7 text-muted-strong">{industry.summary}</p>

                    <div className="mt-10">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                        Enjeux du terrain
                      </p>
                      <ul className="mt-4 grid gap-0 border-t border-[rgba(var(--hairline))] sm:grid-cols-2">
                        {industry.challenges.map((challenge) => (
                          <li
                            className="border-b border-[rgba(var(--hairline))] py-3 text-sm leading-6 text-foreground-strong sm:[&:nth-child(odd)]:pr-6 sm:[&:nth-child(even)]:pl-6 sm:[&:nth-child(even)]:border-l"
                            key={challenge}
                          >
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                        Bénéfices observés
                      </p>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                        {industry.outcomes.map((outcome) => (
                          <span
                            className="inline-flex items-center gap-2 text-sm text-primary"
                            key={outcome}
                          >
                            <span className="h-1 w-1 rounded-full bg-primary" />
                            {outcome}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
