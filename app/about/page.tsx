import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { PageHero } from "@/components/sections/page-hero";
import { PartnerCloud } from "@/components/sections/partner-cloud";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StatRow } from "@/components/sections/stat-row";
import { IconBadge } from "@/components/ui/icon-badge";
import { SplitTitle } from "@/components/ui/split-title";
import { aboutApproach, aboutHighlights, mediaLibrary, trustSignals } from "@/data/site";

export const metadata: Metadata = {
  title: "À propos de Novadis",
  description:
    "Une ingénierie centrée sur l'humain. Plus de 20 ans d'expertise, 2,3 M m² protégés, des partenariats stricts et des équipes à taille humaine.",
};

export default function AboutPage() {
  return (
    <main className="relative">
      <SiteHeader />
      <PageHero
        title="Une ingénierie centrée sur l'humain pour les environnements où la fiabilité compte"
        description="Novadis s'adresse aux organisations qui ont besoin de systèmes capables de fonctionner durablement, en conditions réelles d'exploitation, entre plusieurs équipes et sur plusieurs années."
      >
        <MediaFrame
          priority
          alt="Deux ingénieurs annotent un plan d'implantation"
          caption="Équipes à taille humaine · Levallois-Perret"
          className="aspect-[16/11]"
          kind="image"
          src={mediaLibrary.stockEngineering}
        />
      </PageHero>

      <div className="shell-wide pt-10">
        <StatRow />
      </div>

      <section className="section-y">
        <div className="shell-wide grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <Reveal>
            <h2 className="section-title text-balance text-[clamp(2rem,3.4vw,3rem)]">
              <SplitTitle text="L'humain au cœur de chaque projet technologique" />
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">
              Novadis combine expertise infrastructure, expérience terrain et discipline d&apos;intégration pour
              réduire la fragmentation entre cyber et sûreté physique. Nos équipes accompagnent chaque projet
              de l&apos;analyse de besoin à la maintenance et la formation des opérateurs.
            </p>
            <ul className="mt-10 grid border-l border-t border-hairline sm:grid-cols-3">
              {aboutHighlights.map((item) => (
                <li className="flex flex-col gap-3 border-b border-r border-hairline bg-surface p-5" key={item.label}>
                  <IconBadge icon={item.icon} />
                  <p className="text-sm font-semibold leading-6 text-foreground-strong">{item.label}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground-strong">Approche</h2>
            <ul className="mt-6 border-t border-hairline">
              {aboutApproach.map((item) => (
                <li className="border-b border-hairline py-4 text-base leading-7 text-foreground-strong" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-dark section-y">
        <div className="shell-wide grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center">
          <Reveal>
            <h2 className="section-title text-balance text-[clamp(2rem,3.4vw,3rem)]">
              <SplitTitle text="La vision Novadis en 40 secondes" />
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-strong">
              Alexis Roumelian (CEO) et Nicolas Jdanoff (Sales Director) présentent l&apos;approche Novadis lors
              de l&apos;interview SPAC Members — convergence, expertise et engagement terrain.
            </p>
            <ul className="mt-8 divide-y divide-night-line border-y border-night-line text-sm">
              <li className="flex justify-between gap-4 py-3">
                <span className="font-semibold text-white">Alexis Roumelian</span>
                <span className="text-muted-strong">CEO</span>
              </li>
              <li className="flex justify-between gap-4 py-3">
                <span className="font-semibold text-white">Nicolas Jdanoff</span>
                <span className="text-muted-strong">Sales Director</span>
              </li>
              <li className="flex justify-between gap-4 py-3">
                <span className="font-semibold text-white">SPAC Members</span>
                <span className="text-muted-strong">Interview</span>
              </li>
            </ul>
          </Reveal>
          <Reveal className="console overflow-hidden" delay={0.06}>
            <video className="block w-full" controls playsInline poster={mediaLibrary.spacPoster} preload="none">
              <source src={mediaLibrary.spacInterview} type="video/mp4" />
            </video>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="shell-wide flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <Reveal className="lg:w-1/2">
            <h2 className="section-title text-balance text-[clamp(2rem,3.4vw,3rem)]">
              <SplitTitle text="Un spectre complet, pensé pour la convergence" />
            </h2>
            <p className="mt-6 text-base leading-7 text-muted-strong">
              De la supervision à la protection périmétrique, de l&apos;informatique embarquée à la biométrie —
              Novadis couvre l&apos;ensemble des disciplines qui constituent un système de sûreté global et cohérent.
            </p>
          </Reveal>
          <Reveal className="w-full lg:w-1/2" delay={0.06}>
            <div className="panel flex justify-center p-6 sm:p-10">
              <img
                alt="Schéma des solutions globales de sûreté Novadis"
                className="w-full max-w-[440px] object-contain"
                loading="lazy"
                src={mediaLibrary.schemaSolutions}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-soft section-y">
        <div className="shell-wide grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="section-title text-balance text-[clamp(2rem,3.4vw,3rem)]">
              <SplitTitle text="Membres et standards qui structurent nos engagements" />
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-strong">
              Novadis exerce dans le respect des normes du secteur et des cadres réglementaires applicables aux
              systèmes de sûreté. Nos partenariats stratégiques sécurisent la chaîne de valeur de bout en bout.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <ul className="border-t border-hairline">
              {trustSignals.map((signal) => (
                <li className="flex items-center gap-3 border-b border-hairline py-4 text-sm font-semibold text-foreground-strong" key={signal}>
                  <IconBadge icon={ShieldCheck} size="sm" />
                  {signal}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <PartnerCloud />
      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
