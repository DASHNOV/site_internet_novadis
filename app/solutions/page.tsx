import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { MediaStage } from "@/components/sections/media-stage";
import { PageHero } from "@/components/sections/page-hero";
import { PartnerCloud } from "@/components/sections/partner-cloud";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AlarmJourney } from "@/components/three/alarm-journey";
import { SolutionsHeroModel } from "@/components/three/solutions-hero-model";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckList } from "@/components/ui/check-list";
import { IconBadge } from "@/components/ui/icon-badge";
import { NumberBadge } from "@/components/ui/number-badge";
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
        eyebrow="Solutions"
        title="Un portefeuille modulaire conçu comme un système cohérent"
        description="Un environnement de sûreté complet couvre l'infrastructure, l'accès, la détection, la vidéo, l'analyse et les intégrations. Cette page montre comment Novadis structure chaque couche."
      >
        <SolutionsHeroModel className="aspect-[16/11]" />
      </PageHero>

      <AlarmJourney />

      <section className="section-y">
        <div className="shell-wide space-y-20 lg:space-y-28">
          {solutions.map((solution, index) => {
            const reversed = index % 2 === 1;
            return (
              <article
                className={cn(
                  "flex scroll-mt-28 flex-col gap-10 lg:items-center lg:gap-16",
                  reversed ? "lg:flex-row-reverse" : "lg:flex-row",
                )}
                id={solution.slug}
                key={solution.slug}
              >
                <Reveal className="lg:w-1/2">
                  <MediaStage tilt={reversed ? "left" : "right"}>
                    <MediaFrame
                      alt={solution.media.alt}
                      className="aspect-[4/3]"
                      kind={solution.media.kind}
                      poster={solution.media.poster}
                      src={solution.media.src}
                    />
                  </MediaStage>
                </Reveal>
                <Reveal className="lg:w-1/2" delay={0.08}>
                  <div className="flex flex-wrap items-center gap-3">
                    <NumberBadge value={index + 1} />
                    <IconBadge icon={solution.icon} size="sm" />
                    {solution.product && <Badge tone="primary">{solution.product}</Badge>}
                  </div>
                  <h2 className="section-title mt-6 text-balance text-3xl sm:text-4xl">{solution.title}</h2>
                  <p className="mt-5 max-w-xl text-base leading-7 text-foreground sm:text-lg">{solution.summary}</p>
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
