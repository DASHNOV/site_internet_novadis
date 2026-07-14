import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, FileText } from "lucide-react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { getSolution, solutions } from "@/data/site";

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

  const Icon = solution.icon;

  return (
    <main className="relative pb-20">
      <SiteHeader />
      <PageHero eyebrow={solution.product || "Solution Novadis"} title={solution.title} description={solution.intro}>
        <MediaFrame
          alt={solution.media.alt}
          className="aspect-[16/11]"
          kind={solution.media.kind}
          poster={solution.media.poster}
          src={solution.media.src}
        />
      </PageHero>

      <section className="shell-wide pt-6">
        <Link
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-strong hover:text-primary"
          href="/solutions"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Retour aux solutions
        </Link>
      </section>

      <section className="shell-wide pt-16">
        <div className="grid gap-14 border-t border-[rgba(var(--hairline-strong))] pt-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal>
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/35 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Constat</span>
              </div>
              <h2 className="section-title mt-6 text-balance text-3xl sm:text-4xl">Le contexte que nous rencontrons</h2>
              <p className="mt-6 text-base leading-7 text-muted-strong">{solution.problem}</p>

              <div className="mt-10">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">Capacités clés</p>
                <ul className="mt-4 grid gap-3 border-t border-[rgba(var(--hairline))]">
                  {solution.capabilities.map((item) => (
                    <li
                      className="flex items-center gap-3 border-b border-[rgba(var(--hairline))] py-3 text-sm text-foreground-strong"
                      key={item}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Réponse Novadis</span>
              <h2 className="section-title mt-5 text-balance text-3xl sm:text-4xl">Comment nous y répondons</h2>
              <p className="mt-6 text-base leading-7 text-muted-strong">{solution.solution}</p>
              <ul className="mt-9 grid gap-px bg-[rgba(var(--hairline-strong))] sm:grid-cols-2">
                {solution.benefits.map((benefit) => (
                  <li
                    className="flex items-start gap-3 bg-[rgb(var(--background))] px-5 py-5 text-sm leading-6 text-foreground-strong"
                    key={benefit}
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell-wide pt-24">
        <Reveal>
          <div className="grid gap-10 border-t border-[rgba(var(--hairline-strong))] pt-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Impact opérationnel</span>
              <h2 className="section-title mt-5 text-balance text-3xl font-semibold sm:text-4xl">
                Ce que cela change sur le terrain
              </h2>
            </div>
            <ul className="grid gap-px bg-[rgba(var(--hairline-strong))] sm:grid-cols-2">
              {solution.outcomes.map((outcome) => (
                <li
                  className="bg-[rgb(var(--background))] px-5 py-6 text-sm leading-6 text-foreground-strong"
                  key={outcome}
                >
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {solution.docs && solution.docs.length > 0 && (
        <section className="shell-wide pt-24">
          <Reveal>
            <div className="border-t border-[rgba(var(--hairline-strong))] pt-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Documentation technique</p>
              <h2 className="section-title mt-4 text-balance text-2xl sm:text-3xl">Fiches produits</h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {solution.docs.map((doc) => (
                  <a
                    className="group flex items-center gap-4 rounded-xl border border-[rgba(var(--hairline-strong))] bg-[rgba(var(--card))] px-5 py-4 transition hover:border-primary/40 hover:bg-[rgb(var(--background-elevated))]"
                    href={doc.href}
                    key={doc.href}
                    rel="noopener"
                    target="_blank"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground-strong">{doc.label}</p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">PDF</p>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <section className="shell-wide pt-24">
        <Reveal>
          <div className="flex flex-col gap-6 border-t border-[rgba(var(--hairline-strong))] pt-14 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="section-title text-balance text-3xl sm:text-4xl">
                Discutons de cette solution dans le contexte réel de votre site
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-strong">
                Novadis conçoit chaque capacité pour servir un modèle d&apos;exploitation global, pas seulement une
                fonction technique isolée.
              </p>
            </div>
            <Link href="/contact">
              <Button size="lg" variant="primary">
                Parler à Novadis
                <ArrowUpRight className="cta-arrow h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>

      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
