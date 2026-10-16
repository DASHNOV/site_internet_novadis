import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { MediaFrame } from "@/components/sections/media-frame";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/ui/icon-badge";
import { SplitTitle } from "@/components/ui/split-title";
import { contactChannels, contactTopics, mediaLibrary } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Novadis pour échanger sur la sûreté, la convergence et la modernisation de vos systèmes de sécurité.",
};

const inputClass =
  "min-h-11 w-full rounded-lg border border-hairline bg-surface px-4 py-2.5 text-base font-normal text-foreground-strong placeholder:text-muted-strong/70 outline-none transition hover:border-hairline-strong focus:border-primary focus:ring-2 focus:ring-primary/60 focus:ring-offset-1 focus:ring-offset-surface";

const labelClass = "grid gap-2 text-sm font-semibold text-foreground-strong";

export default function ContactPage() {
  return (
    <main className="relative">
      <SiteHeader />
      <PageHero
        title="Démarrez une conversation de sûreté ancrée dans votre réalité opérationnelle"
        description="Partagez le profil de votre site, vos objectifs de modernisation, vos contraintes ou vos exigences d'intégration. Novadis peut cadrer un projet de site unique comme un environnement multi-sites."
      >
        <MediaFrame
          priority
          alt="Réunion de cadrage autour d'une table dans un bureau"
          caption="Échanges directs · cadrage projet sous 48h"
          className="aspect-[16/11]"
          kind="image"
          src={mediaLibrary.stockMeeting}
        />
      </PageHero>

      <section className="shell-wide pt-10">
        <ul className="grid border-l border-t border-hairline sm:grid-cols-3">
          {contactChannels.map((channel) => (
            <li className="border-b border-r border-hairline" key={channel.label}>
              <a
                className="group flex h-full items-start gap-4 bg-surface p-6 transition-colors duration-150 hover:bg-background-soft"
                href={channel.href}
              >
                <IconBadge className="mt-0.5" icon={channel.icon} />
                <span className="flex-1">
                  <span className="block text-sm text-muted-strong">{channel.label}</span>
                  <span className="mt-1 block text-sm font-semibold text-foreground-strong group-hover:text-primary-strong">
                    {channel.value}
                  </span>
                </span>
                <ArrowUpRight aria-hidden className="cta-arrow h-4 w-4 text-primary-strong" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-y">
        <div className="shell-wide grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <h2 className="section-title text-balance text-[clamp(1.75rem,2.6vw,2.25rem)]">
              <SplitTitle text="Les éléments que nous abordons en première discussion" />
            </h2>
            <ul className="mt-8 border-t border-hairline">
              {contactTopics.map((item) => (
                <li className="border-b border-hairline py-4 text-base leading-7 text-foreground-strong" key={item}>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-9 max-w-md text-sm leading-7 text-muted-strong">
              Vous préférez une rencontre directe ? Nous nous déplaçons sur vos sites en France, au Luxembourg
              et en Belgique pour cadrer le projet en conditions réelles.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="panel p-6 sm:p-10">
              <h2 className="section-title text-balance text-[clamp(1.75rem,2.6vw,2.25rem)]">
                Un message direct, <span className="text-second">traité par l&apos;équipe ingénierie</span>
              </h2>
              <form className="mt-9 grid gap-7 sm:grid-cols-2">
                <label className={labelClass}>
                  Nom
                  <input autoComplete="name" className={inputClass} placeholder="Votre nom" />
                </label>
                <label className={labelClass}>
                  Société
                  <input autoComplete="organization" className={inputClass} placeholder="Nom de la société" />
                </label>
                <label className={labelClass}>
                  Email
                  <input autoComplete="email" className={inputClass} placeholder="name@company.com" type="email" />
                </label>
                <label className={labelClass}>
                  Téléphone
                  <input autoComplete="tel" className={inputClass} placeholder="+33 ..." type="tel" />
                </label>
                <label className={`${labelClass} sm:col-span-2`}>
                  Projet
                  <textarea
                    className={`${inputClass} min-h-32 resize-y`}
                    placeholder="Présentez vos sites, vos contraintes et vos objectifs."
                  />
                </label>
                <div className="sm:col-span-2">
                  <Button size="lg" type="submit" variant="primary">
                    Envoyer la demande
                    <ArrowUpRight className="cta-arrow h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
