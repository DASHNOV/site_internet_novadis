import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { EquipmentGallery } from "@/components/sections/equipment-gallery";
import { MediaFrame } from "@/components/sections/media-frame";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CheckList } from "@/components/ui/check-list";
import { IconBadge } from "@/components/ui/icon-badge";
import { SplitTitle } from "@/components/ui/split-title";
import { AxisExplode } from "@/components/motion/axis-explode";
import { BadgeDoor } from "@/components/motion/badge-door";
import { IntrusionScene } from "@/components/motion/intrusion-scene";
import { SupervisionRoom } from "@/components/three/supervision-room";
import { axisExplode, badgeDoor, getSolution, intrusionScene, solutions, supervisionRoom } from "@/data/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return {
    title: solution.title,
    description: solution.summary,
  };
}

export default async function SolutionDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  return (
    <main className="relative">
      <SiteHeader />
      <nav aria-label="Fil d'Ariane" className="shell-wide pt-6">
        <Link
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-strong hover:text-primary-strong"
          href="/solutions"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          Retour aux solutions
        </Link>
      </nav>
      <PageHero title={solution.title} description={solution.intro}>
        <MediaFrame
          priority
          alt={solution.media.alt}
          className="aspect-[16/11]"
          kind={solution.media.kind}
          poster={solution.media.poster}
          src={solution.media.src}
        />
      </PageHero>


      {slug === badgeDoor.solutionSlug && (
        <div className="mt-16">
          <BadgeDoor />
        </div>
      )}

      {slug === intrusionScene.solutionSlug && (
        <div className="mt-16">
          <IntrusionScene />
        </div>
      )}

      {slug === supervisionRoom.solutionSlug && (
        <div className="mt-16">
          <SupervisionRoom />
        </div>
      )}

      {slug === axisExplode.solutionSlug && (
        <div className="mt-16">
          <AxisExplode />
        </div>
      )}

      <section className="section-y">
        <div className="shell-wide grid border-y border-hairline lg:grid-cols-2">
          <Reveal className="h-full border-hairline py-12 lg:border-r lg:py-14 lg:pr-14">
            <h2 className="section-title text-balance text-[clamp(1.75rem,2.6vw,2.25rem)]">
              <SplitTitle lead={2} text="Le contexte que nous rencontrons" />
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-strong">{solution.problem}</p>
            <h3 className="mt-10 font-display text-lg font-bold text-foreground-strong">Capacités clés</h3>
            <CheckList className="mt-4" items={solution.capabilities} />
          </Reveal>

          <Reveal className="h-full border-t border-hairline py-12 lg:border-t-0 lg:py-14 lg:pl-14" delay={0.06}>
            <h2 className="section-title text-balance text-[clamp(1.75rem,2.6vw,2.25rem)]">
              <SplitTitle lead={2} text="Comment nous y répondons" />
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-strong">{solution.solution}</p>
            <h3 className="mt-10 font-display text-lg font-bold text-foreground-strong">Bénéfices</h3>
            <CheckList className="mt-4" items={solution.benefits} tone="success" />
          </Reveal>
        </div>
      </section>

      <section className="section-soft section-y">
        <div className="shell-wide">
          <SectionHeading title="Ce que cela change sur le terrain" />
          <ul className="mt-12 grid border-l border-t border-hairline sm:grid-cols-2 lg:grid-cols-4">
            {solution.outcomes.map((outcome) => (
              <li
                className="border-b border-r border-hairline bg-surface p-6 font-display text-lg font-bold leading-snug text-foreground-strong sm:p-7"
                key={outcome}
              >
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {solution.equipment && <EquipmentGallery {...solution.equipment} />}

      {solution.docs && solution.docs.length > 0 && (
        <section className="section-y">
          <div className="shell-wide">
            <SectionHeading title="Fiches produits" />
            <ul className="mt-10 grid border-t border-hairline md:grid-cols-2 md:gap-x-10">
              {solution.docs.map((doc) => (
                <li className="border-b border-hairline" key={doc.href}>
                  <a
                    className="group flex min-h-16 items-center gap-4 py-4 hover:text-primary-strong"
                    href={doc.href}
                    rel="noopener"
                    target="_blank"
                  >
                    <IconBadge icon={FileText} />
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground-strong group-hover:text-primary-strong">
                      {doc.label}
                    </span>
                    <span className="data-label">PDF</span>
                    <ArrowUpRight aria-hidden className="cta-arrow h-4 w-4 shrink-0 text-primary-strong" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
