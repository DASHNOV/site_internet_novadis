import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { PageHero } from "@/components/sections/page-hero";
import { PartnerCloud } from "@/components/sections/partner-cloud";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SolutionsHeroModel } from "@/components/three/solutions-hero-model";
import { Button } from "@/components/ui/button";
import { solutions } from "@/data/site";

export const metadata: Metadata = {
  title: "Solutions globales de sûreté",
  description:
    "Un portefeuille modulaire conçu comme un système cohérent : Amadeus, Ocularis, Galaxy, infrastructure IT, analyse d'image, intégrations.",
};

export default function SolutionsPage() {
  return (
    <main className="relative pb-20">
      <SiteHeader />
      <PageHero
        eyebrow="Solutions"
        title="Un portefeuille modulaire conçu comme un système cohérent"
        description="Un environnement de sûreté complet couvre l'infrastructure, l'accès, la détection, la vidéo, l'analyse et les intégrations. Cette page montre comment Novadis structure chaque couche."
      >
        <SolutionsHeroModel className="aspect-[16/11]" />
      </PageHero>

      <section className="shell-wide pt-16">
        <div className="flex flex-col">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            const reverse = index % 2 === 1;
            return (
              <Reveal delay={index * 0.04} key={solution.slug}>
                <article
                  className={`grid gap-10 border-t border-[rgba(var(--hairline-strong))] py-16 lg:grid-cols-2 lg:gap-16 lg:py-20 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className="relative">
                    <MediaFrame
                      alt={solution.media.alt}
                      className="aspect-[4/3]"
                      kind={solution.media.kind}
                      poster={solution.media.poster}
                      src={solution.media.src}
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">
                      {`Solution · 0${index + 1}`}
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/35 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      {solution.product && (
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground-strong">
                          {solution.product}
                        </span>
                      )}
                    </div>
                    <h2 className="section-title mt-6 text-balance text-3xl sm:text-4xl lg:text-[2.4rem]">
                      {solution.title}
                    </h2>
                    <p className="mt-5 max-w-xl text-base leading-7 text-muted-strong">{solution.summary}</p>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-muted">{solution.solution}</p>
                    <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                      {solution.capabilities.map((capability) => (
                        <span
                          className="inline-flex items-center gap-2 text-sm text-foreground"
                          key={capability}
                        >
                          <span className="h-1 w-1 rounded-full bg-primary" />
                          {capability}
                        </span>
                      ))}
                    </div>
                    <div className="mt-9">
                      <Link href={`/solutions/${solution.slug}`}>
                        <Button size="default" variant="outline">
                          Voir le détail
                          <ArrowUpRight className="cta-arrow h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <PartnerCloud />
      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
