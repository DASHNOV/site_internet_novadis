import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
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

        title="Des systèmes adaptés à la logique d'exploitation de chaque environnement"
        description="La conception de la sûreté change selon qu'il s'agit d'un campus, d'une usine, d'une plateforme logistique ou d'un environnement critique. Novadis adapte l'architecture à la réalité du terrain."
      >
        <MediaFrame
          priority
          alt={industries[0].title}
          caption="Tertiaire · convergence multi-sites"
          className="aspect-[16/11]"
          kind="image"
          src={industries[0].media}
        />
      </PageHero>

      <nav aria-label="Secteurs" className="sticky top-16 z-30 border-b border-hairline bg-background lg:top-20">
        <ul className="shell-wide no-scrollbar flex gap-6 overflow-x-auto">
          {industries.map((industry) => (
            <li className="flex-none" key={industry.slug}>
              <a
                className="flex min-h-12 items-center gap-2 text-sm font-medium text-foreground hover:text-primary-strong"
                href={`#${industry.slug}`}
              >
                <IconBadge icon={industry.icon} size="sm" />
                {industry.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="pt-6">
        <div className="shell-wide divide-y divide-hairline border-b border-hairline">
          {industries.map((industry, index) => {
            const reversed = index % 2 === 1;
            return (
              <article
                className={cn(
                  "flex scroll-mt-36 flex-col gap-10 py-14 lg:items-center lg:gap-16 lg:py-20",
                  reversed ? "lg:flex-row-reverse" : "lg:flex-row",
                )}
                id={industry.slug}
                key={industry.slug}
              >
                <Reveal className="lg:w-[48%]">
                  <MediaFrame alt={industry.title} className="aspect-[4/3]" kind="image" src={industry.media} />
                </Reveal>
                <Reveal className="lg:w-[52%]" delay={0.06}>
                  <h2 className="section-title flex items-start gap-3 text-balance text-[clamp(1.75rem,2.8vw,2.5rem)]">
                    <IconBadge className="mt-2" icon={industry.icon} size="lg" />
                    {industry.title}
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">{industry.summary}</p>

                  <h3 className="mt-9 font-display text-lg font-bold text-foreground-strong">Enjeux du terrain</h3>
                  <CheckList className="mt-4" columns={2} items={industry.challenges} />

                  <h3 className="mt-9 font-display text-lg font-bold text-foreground-strong">Bénéfices observés</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {industry.outcomes.map((outcome) => (
                      <li key={outcome}>
                        <Badge tone="outline">{outcome}</Badge>
                      </li>
                    ))}
                  </ul>
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
