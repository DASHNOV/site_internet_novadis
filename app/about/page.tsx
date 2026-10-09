import type { Metadata } from "next";
import { Award, KeyRound, ShieldCheck, Users } from "lucide-react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { MediaStage } from "@/components/sections/media-stage";
import { PageHero } from "@/components/sections/page-hero";
import { PartnerCloud } from "@/components/sections/partner-cloud";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StatRow } from "@/components/sections/stat-row";
import { Badge } from "@/components/ui/badge";
import { Blobs } from "@/components/ui/blobs";
import { Card } from "@/components/ui/card";
import { IconBadge } from "@/components/ui/icon-badge";
import { NumberBadge } from "@/components/ui/number-badge";
import { SplitTitle } from "@/components/ui/split-title";
import { mediaLibrary, trustSignals } from "@/data/site";

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
        eyebrow="À propos"
        title="Une ingénierie centrée sur l'humain pour les environnements où la fiabilité compte"
        description="Novadis s'adresse aux organisations qui ont besoin de systèmes capables de fonctionner durablement, en conditions réelles d'exploitation, entre plusieurs équipes et sur plusieurs années."
      >
        <MediaStage>
          <MediaFrame
            priority
            alt="Deux ingénieurs annotent un plan d'implantation"
            caption="Équipes à taille humaine · Levallois-Perret"
            className="aspect-[16/11]"
            kind="image"
            src={mediaLibrary.stockEngineering}
          />
        </MediaStage>
      </PageHero>

      <StatRow />

      <section className="section-y">
        <div className="shell-wide grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Principe fondateur</p>
            <h2 className="section-title mt-5 text-balance text-3xl sm:text-4xl lg:text-5xl">
              <SplitTitle text="L'humain au cœur de chaque projet technologique" />
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">
              Novadis combine expertise infrastructure, expérience terrain et discipline d&apos;intégration pour
              réduire la fragmentation entre cyber et sûreté physique. Nos équipes accompagnent chaque projet
              de l&apos;analyse de besoin à la maintenance et la formation des opérateurs.
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Pionnière de la solution globale en France", icon: Award },
                { label: "Exclusivité nationale sur ses produits clés", icon: KeyRound },
                { label: "Zéro sous-traitance", icon: Users },
              ].map((item) => (
                <Card className="p-5" interactive key={item.label}>
                  <IconBadge icon={item.icon} size="sm" tone="solid" />
                  <p className="mt-4 text-sm font-semibold leading-6 text-foreground-strong">{item.label}</p>
                </Card>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="eyebrow">Approche</p>
            <ol className="mt-7 space-y-3">
              {[
                "Une coordination transverse entre IT, services généraux et équipes sûreté",
                "Des choix technologiques guidés par l'interopérabilité plutôt que par le verrouillage fournisseur",
                "Des modèles de maintenance pensés pour l'uptime et l'évolution à long terme",
                "Une responsabilité sur l'ensemble du cycle de vie : audit, design, déploiement, maintenance",
              ].map((item, index) => (
                <li key={item}>
                  <Card className="flex items-start gap-4 p-5">
                    <NumberBadge size="sm" value={index + 1} />
                    <span className="text-base leading-7 text-foreground-strong">{item}</span>
                  </Card>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section-soft section-y">
        <div className="shell-wide grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center">
          <Reveal>
            <p className="eyebrow">Ils en parlent</p>
            <h2 className="section-title mt-5 text-balance text-3xl sm:text-4xl">
              <SplitTitle text="La vision Novadis en 40 secondes" />
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-strong">
              Alexis Roumelian (CEO) et Nicolas Jdanoff (Sales Director) présentent l&apos;approche Novadis lors
              de l&apos;interview SPAC Members — convergence, expertise et engagement terrain.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge tone="outline">Alexis Roumelian · CEO</Badge>
              <Badge tone="outline">Nicolas Jdanoff · Sales Director</Badge>
              <Badge tone="primary">SPAC Members</Badge>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <MediaStage tilt="left">
              <video className="w-full" controls playsInline poster={mediaLibrary.spacPoster} preload="none">
                <source src={mediaLibrary.spacInterview} type="video/mp4" />
              </video>
            </MediaStage>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="shell-wide flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <Reveal className="lg:w-1/2">
            <p className="eyebrow">Périmètre d&apos;expertise</p>
            <h2 className="section-title mt-5 text-balance text-3xl sm:text-4xl">
              <SplitTitle text="Un spectre complet, pensé pour la convergence" />
            </h2>
            <p className="mt-6 text-base leading-7 text-muted-strong">
              De la supervision à la protection périmétrique, de l&apos;informatique embarquée à la biométrie —
              Novadis couvre l&apos;ensemble des disciplines qui constituent un système de sûreté global et cohérent.
            </p>
          </Reveal>
          <Reveal className="w-full lg:w-1/2" delay={0.08}>
            <Card className="relative isolate flex justify-center overflow-hidden p-6 sm:p-10">
              <Blobs />
              <img
                alt="Schéma des solutions globales de sûreté Novadis"
                className="w-full max-w-[440px] object-contain"
                loading="lazy"
                src={mediaLibrary.schemaSolutions}
              />
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="section-soft section-y">
        <div className="shell-wide grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Conformité & affiliations</p>
            <h2 className="section-title mt-5 text-balance text-3xl sm:text-4xl">
              <SplitTitle text="Membres et standards qui structurent nos engagements" />
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-strong">
              Novadis exerce dans le respect des normes du secteur et des cadres réglementaires applicables aux
              systèmes de sûreté. Nos partenariats stratégiques sécurisent la chaîne de valeur de bout en bout.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {trustSignals.map((signal, index) => (
              <Reveal delay={index * 0.05} key={signal}>
                <Card className="flex items-center gap-3 p-4" interactive>
                  <IconBadge icon={ShieldCheck} size="sm" />
                  <span className="text-sm font-semibold text-foreground-strong">{signal}</span>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PartnerCloud />
      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
