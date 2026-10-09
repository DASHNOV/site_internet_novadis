import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { MediaStage } from "@/components/sections/media-stage";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckList } from "@/components/ui/check-list";
import { IconBadge } from "@/components/ui/icon-badge";
import { industries } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Secteurs & environnements",
  description:
    "Tertiaire, industrie, logistique, sites sensibles, réseaux multi-sites, ERP : Novadis adapte chaque architecture à la logique d'exploitation du site.",
};

export default function SecteursPage() {
  return (
    <main className="relative">
      <SiteHeader />
      <PageHero
        eyebrow="Secteurs"
        title="Des systèmes adaptés à la logique d'exploitation de chaque environnement"
        description="La conception de la sûreté change selon qu'il s'agit d'un campus, d'une usine, d'une plateforme logistique ou d'un environnement critique. Novadis adapte l'architecture à la réalité du terrain."
      >
        <MediaStage>
          <MediaFrame
            priority
            alt={industries[0].title}
            caption="Tertiaire · convergence multi-sites"
            className="aspect-[16/11]"
            kind="image"
            src={industries[0].media}
          />
        </MediaStage>
      </PageHero>

      <section className="section-y">
        <div className="shell-wide space-y-20 lg:space-y-28">
          {industries.map((industry, index) => {
            const reversed = index % 2 === 1;
            return (
              <article
                className={cn(
                  "flex scroll-mt-28 flex-col gap-10 lg:items-center lg:gap-16",
                  reversed ? "lg:flex-row-reverse" : "lg:flex-row",
                )}
                id={industry.slug}
                key={industry.slug}
              >
                <Reveal className="lg:w-[48%]">
                  <MediaStage tilt={reversed ? "left" : "right"}>
                    <MediaFrame alt={industry.title} className="aspect-[4/3]" kind="image" src={industry.media} />
                  </MediaStage>
                </Reveal>
                <Reveal className="lg:w-[52%]" delay={0.08}>
                  <div className="flex items-center gap-3">
                    <IconBadge icon={industry.icon} />
                    <Badge tone="primary">{`Secteur 0${index + 1}`}</Badge>
                  </div>
                  <h2 className="section-title mt-6 text-balance text-3xl sm:text-4xl">{industry.title}</h2>
                  <p className="mt-5 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">{industry.summary}</p>

                  <Card className="mt-8 p-6">
                    <p className="kicker">Enjeux du terrain</p>
                    <CheckList className="mt-4" columns={2} items={industry.challenges} />
                  </Card>

                  <p className="kicker mt-8">Bénéfices observés</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {industry.outcomes.map((outcome) => (
                      <Badge key={outcome} tone="success">
                        {outcome}
                      </Badge>
                    ))}
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
