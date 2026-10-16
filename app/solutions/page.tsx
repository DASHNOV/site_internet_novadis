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
import { AlarmJourney } from "@/components/three/alarm-journey";
import { SolutionsHeroModel } from "@/components/three/solutions-hero-model";
import { Button } from "@/components/ui/button";
import { CheckList } from "@/components/ui/check-list";
import { IconBadge } from "@/components/ui/icon-badge";
import { cn } from "@/lib/utils";
import { solutions } from "@/data/site";

export const metadata: Metadata = {
  title: "Solutions globales de sûreté",
  description:
    "Un portefeuille modulaire conçu comme un système cohérent : Amadeus, Ocularis, Galaxy, infrastructure IT, analyse d'image, intégrations.",
};

export default function SolutionsPage() {
  return (
    <main className="relative">
      <SiteHeader />
      <PageHero

        title="Un portefeuille modulaire conçu comme un système cohérent"
        description="Un environnement de sûreté complet couvre l'infrastructure, l'accès, la détection, la vidéo, l'analyse et les intégrations. Cette page montre comment Novadis structure chaque couche."
      >
        <SolutionsHeroModel className="aspect-[16/11]" />
      </PageHero>

      <AlarmJourney />

      <section className="pt-18 sm:pt-24 lg:pt-32">
        <div className="shell-wide divide-y divide-hairline border-y border-hairline">
          {solutions.map((solution, index) => {
            const reversed = index % 2 === 1;
            return (
              <article
                className={cn(
                  "flex scroll-mt-28 flex-col gap-10 py-14 lg:items-center lg:gap-16 lg:py-20",
                  reversed ? "lg:flex-row-reverse" : "lg:flex-row",
                )}
                id={solution.slug}
                key={solution.slug}
              >
                <Reveal className="lg:w-1/2">
                  <MediaFrame
                    alt={solution.media.alt}
                    className="aspect-[4/3]"
                    kind={solution.media.kind}
                    poster={solution.media.poster}
                    src={solution.media.src}
                  />
                </Reveal>
                <Reveal className="lg:w-1/2" delay={0.06}>
                  <h2 className="section-title flex items-start gap-3 text-balance text-[clamp(1.75rem,2.8vw,2.5rem)]">
                    <IconBadge className="mt-2" icon={solution.icon} size="lg" />
                    {solution.title}
                  </h2>
                  {solution.product && !solution.title.includes(solution.product) && <p className="mt-2 pl-9 text-sm font-medium text-primary-strong">{solution.product}</p>}
                  <p className="mt-6 max-w-xl text-base leading-7 text-foreground sm:text-lg">{solution.summary}</p>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-muted-strong">{solution.solution}</p>
                  <CheckList className="mt-7" columns={2} items={solution.capabilities} />
                  <div className="mt-9">
                    <Link href={`/solutions/${solution.slug}`}>
                      <Button variant="outline">
                        Voir le détail
                        <ArrowUpRight className="cta-arrow h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </Reveal>
              </article>
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
