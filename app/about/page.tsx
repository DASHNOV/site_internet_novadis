import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { PageHero } from "@/components/sections/page-hero";
import { PartnerCloud } from "@/components/sections/partner-cloud";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StatRow } from "@/components/sections/stat-row";
import { mediaLibrary, trustSignals } from "@/data/site";

export const metadata: Metadata = {
  title: "À propos de Novadis",
  description:
    "Une ingénierie centrée sur l'humain. Plus de 20 ans d'expertise, 2,3 M m² protégés, des partenariats stricts et des équipes à taille humaine.",
};

export default function AboutPage() {
  return (
    <main className="relative pb-20">
      <SiteHeader />
      <PageHero
        eyebrow="À propos"
        title="Une ingénierie centrée sur l'humain pour les environnements où la fiabilité compte"
        description="Novadis s'adresse aux organisations qui ont besoin de systèmes capables de fonctionner durablement, en conditions réelles d'exploitation, entre plusieurs équipes et sur plusieurs années."
      >
        <MediaFrame
          alt="Novadis · équipes & expertise"
          caption="Équipes à taille humaine · Levallois-Perret"
          className="aspect-[16/11]"
          kind="image"
          src={mediaLibrary.aboutBanner}
        />
      </PageHero>

      <StatRow />

      <section className="shell-wide pt-24">
        <div className="grid gap-14 border-t border-[rgba(var(--hairline-strong))] pt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <Reveal>
            <div>
              <p className="eyebrow">Principe fondateur</p>
              <h2 className="section-title mt-5 text-balance text-3xl sm:text-4xl lg:text-[2.6rem]">
                L&apos;humain au cœur de chaque projet technologique
              </h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-muted-strong">
                Novadis combine expertise infrastructure, expérience terrain et discipline d&apos;intégration pour
                réduire la fragmentation entre cyber et sûreté physique. Nos équipes accompagnent chaque projet
                de l&apos;analyse de besoin à la maintenance et la formation des opérateurs.
              </p>
              <div className="mt-9 grid gap-px bg-[rgba(var(--hairline-strong))] sm:grid-cols-3">
                {["Pionnière de la solution globale en France", "Exclusivité nationale sur ses produits clés", "Zéro sous-traitance"].map((item) => (
                  <div
                    className="bg-[rgb(var(--background))] px-5 py-5 text-sm font-semibold text-foreground-strong"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <p className="eyebrow">Approche</p>
              <ul className="mt-7 divide-y divide-[rgba(var(--hairline))] border-t border-[rgba(var(--hairline))]">
                {[
                  "Une coordination transverse entre IT, services généraux et équipes sûreté",
                  "Des choix technologiques guidés par l'interopérabilité plutôt que par le verrouillage fournisseur",
                  "Des modèles de maintenance pensés pour l'uptime et l'évolution à long terme",
                  "Une responsabilité sur l'ensemble du cycle de vie : audit, design, déploiement, maintenance",
                ].map((item, index) => (
                  <li
                    className="flex items-start gap-5 py-5 text-base leading-7 text-foreground-strong"
                    key={item}
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
                      0{index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell-wide pt-24">
        <Reveal>
          <div className="border-t border-[rgba(var(--hairline-strong))] pt-14">
            <div className="flex items-baseline gap-4">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">Ils en parlent</p>
              <div className="h-px flex-1 bg-[rgba(var(--hairline))]" />
            </div>
            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center">
              <div>
                <h2 className="section-title text-balance text-3xl sm:text-4xl">
                  La vision Novadis en 40 secondes
                </h2>
                <p className="mt-5 text-base leading-7 text-muted-strong">
                  Alexis Roumelian (CEO) et Nicolas Jdanoff (Sales Director) présentent l&apos;approche Novadis lors
                  de l&apos;interview SPAC Members — convergence, expertise et engagement terrain.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(var(--hairline-strong))] bg-[rgba(var(--card))] px-3 py-1.5 text-xs font-medium text-foreground-strong">
                    Alexis Roumelian · CEO
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(var(--hairline-strong))] bg-[rgba(var(--card))] px-3 py-1.5 text-xs font-medium text-foreground-strong">
                    Nicolas Jdanoff · Sales Director
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                    SPAC Members
                  </span>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-[rgba(var(--hairline-strong))]">
                <video
                  className="w-full"
                  controls
                  playsInline
                  poster={mediaLibrary.spacPoster}
                  preload="none"
                >
                  <source src={mediaLibrary.spacInterview} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="shell-wide pt-24">
        <Reveal>
          <div className="border-t border-[rgba(var(--hairline-strong))] pt-14">
            <div className="flex items-baseline gap-4">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">Périmètre d&apos;expertise</p>
              <div className="h-px flex-1 bg-[rgba(var(--hairline))]" />
            </div>
            <div className="mt-10 flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-16">
              <div className="lg:w-1/2">
                <h2 className="section-title text-balance text-3xl sm:text-4xl">
                  Un spectre complet, pensé pour la convergence
                </h2>
                <p className="mt-6 text-base leading-7 text-muted-strong">
                  De la supervision à la protection périmétrique, de l&apos;informatique embarquée à la biométrie —
                  Novadis couvre l&apos;ensemble des disciplines qui constituent un système de sûreté global et cohérent.
                </p>
              </div>
              <div className="flex justify-center lg:w-1/2">
                <img
                  alt="Schéma des solutions globales de sûreté Novadis"
                  className="w-full max-w-[480px] object-contain"
                  loading="lazy"
                  src={mediaLibrary.schemaSolutions}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="shell-wide pt-24">
        <Reveal>
          <div className="grid gap-12 border-t border-[rgba(var(--hairline-strong))] pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <p className="eyebrow">Conformité & affiliations</p>
              <h2 className="section-title mt-5 text-balance text-3xl sm:text-4xl">
                Membres et standards qui structurent nos engagements
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-strong">
                Novadis exerce dans le respect des normes du secteur et des cadres réglementaires applicables aux
                systèmes de sûreté. Nos partenariats stratégiques sécurisent la chaîne de valeur de bout en bout.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-[rgba(var(--hairline-strong))]">
              {trustSignals.map((signal) => (
                <div
                  className="bg-[rgb(var(--background))] px-5 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground-strong"
                  key={signal}
                >
                  {signal}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <PartnerCloud />
      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
