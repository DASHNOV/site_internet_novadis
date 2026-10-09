import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, FileText, Sparkles } from "lucide-react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { MediaStage } from "@/components/sections/media-stage";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Blobs } from "@/components/ui/blobs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckList } from "@/components/ui/check-list";
import { IconBadge } from "@/components/ui/icon-badge";
import { NumberBadge } from "@/components/ui/number-badge";
import { SplitTitle } from "@/components/ui/split-title";
import { AxisExplode } from "@/components/motion/axis-explode";
import { BadgeDoor } from "@/components/three/badge-door";
import { axisExplode, badgeDoor, getSolution, solutions } from "@/data/site";

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
      <PageHero eyebrow={solution.product || "Solution Novadis"} title={solution.title} description={solution.intro}>
        <MediaStage>
          <MediaFrame
            priority
            alt={solution.media.alt}
            className="aspect-[16/11]"
            kind={solution.media.kind}
            poster={solution.media.poster}
            src={solution.media.src}
          />
        </MediaStage>
      </PageHero>

      <section className="shell-wide">
        <Link
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-surface px-4 text-sm font-medium text-foreground shadow-soft hover:-translate-y-0.5 hover:text-primary-strong"
          href="/solutions"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          Retour aux solutions
        </Link>
      </section>

      {slug === badgeDoor.solutionSlug && (
        <div className="mt-16">
          <BadgeDoor />
        </div>
      )}

      {slug === axisExplode.solutionSlug && (
        <div className="mt-16">
          <AxisExplode />
        </div>
      )}

      <section className="section-y">
        <div className="shell-wide grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal className="h-full">
            <Card className="h-full p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <IconBadge icon={solution.icon} />
                <p className="eyebrow">Constat</p>
              </div>
              <h2 className="section-title mt-6 text-balance text-2xl sm:text-3xl">
                <SplitTitle lead={2} text="Le contexte que nous rencontrons" />
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-strong">{solution.problem}</p>
              <p className="kicker mt-8">Capacités clés</p>
              <CheckList className="mt-4" items={solution.capabilities} />
            </Card>
          </Reveal>

          <Reveal className="h-full" delay={0.08}>
            <Card className="h-full border-primary/25 p-7 shadow-lift sm:p-9">
              <div className="flex items-center gap-3">
                <IconBadge icon={Sparkles} tone="solid" />
                <p className="eyebrow">Réponse Novadis</p>
              </div>
              <h2 className="section-title mt-6 text-balance text-2xl sm:text-3xl">
                <SplitTitle lead={2} text="Comment nous y répondons" />
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-strong">{solution.solution}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {solution.benefits.map((benefit) => (
                  <li
                    className="flex items-start gap-3 rounded-xl bg-primary/[0.06] px-4 py-4 text-sm font-medium leading-6 text-foreground-strong"
                    key={benefit}
                  >
                    <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 flex-none text-success" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="section-soft section-y">
        <div className="shell-wide">
          <SectionHeading eyebrow="Impact opérationnel" title="Ce que cela change sur le terrain" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solution.outcomes.map((outcome, index) => (
              <Reveal className="h-full" delay={index * 0.06} key={outcome}>
                <Card className="h-full p-6" interactive>
                  <NumberBadge size="sm" value={index + 1} />
                  <p className="mt-5 font-display text-lg font-semibold leading-snug text-foreground-strong">{outcome}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {solution.docs && solution.docs.length > 0 && (
        <section className="section-y">
          <div className="shell-wide">
            <SectionHeading eyebrow="Documentation technique" title="Fiches produits" />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {solution.docs.map((doc) => (
                <a className="group block" href={doc.href} key={doc.href} rel="noopener" target="_blank">
                  <Card className="flex items-center gap-4 px-5 py-4" interactive>
                    <IconBadge icon={FileText} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground-strong">{doc.label}</p>
                      <p className="mt-0.5 text-xs font-medium text-muted-strong">PDF</p>
                    </div>
                    <ArrowUpRight aria-hidden className="cta-arrow h-4 w-4 shrink-0 text-primary-strong" />
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="shell-wide">
        <Reveal>
          <Card className="relative isolate flex flex-col gap-6 overflow-hidden p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <Blobs />
            <div className="max-w-2xl">
              <h2 className="section-title text-balance text-2xl sm:text-3xl">
                Discutons de cette solution <span className="text-gradient">dans le contexte réel de votre site</span>
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-strong">
                Novadis conçoit chaque capacité pour servir un modèle d&apos;exploitation global, pas seulement une
                fonction technique isolée.
              </p>
            </div>
            <Link className="flex-none" href="/contact">
              <Button size="lg" variant="primary">
                Parler à Novadis
                <ArrowUpRight className="cta-arrow h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </Reveal>
      </section>

      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
