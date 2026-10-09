import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { MediaStage } from "@/components/sections/media-stage";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconBadge } from "@/components/ui/icon-badge";
import { NumberBadge } from "@/components/ui/number-badge";
import { SplitTitle } from "@/components/ui/split-title";
import { mediaLibrary } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Novadis pour échanger sur la sûreté, la convergence et la modernisation de vos systèmes de sécurité.",
};

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@novadis.eu",
    href: "mailto:contact@novadis.eu",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+352 26 19 01 73",
    href: "tel:+35226190173",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "14-16 Rue Clément Bayard, 92300 Levallois-Perret",
    href: "https://maps.google.com/?q=14-16+Rue+Cl%C3%A9ment+Bayard+Levallois-Perret",
  },
];

const inputClass =
  "min-h-11 w-full rounded-lg border border-hairline bg-surface px-4 py-2.5 text-base font-normal text-foreground-strong shadow-[0_1px_2px_rgb(18_145_206/0.05)] placeholder:text-muted-strong/70 outline-none transition hover:border-hairline-strong focus:border-primary focus:ring-2 focus:ring-primary/60 focus:ring-offset-1 focus:ring-offset-surface";

const labelClass = "grid gap-2 text-sm font-semibold text-foreground-strong";

export default function ContactPage() {
  return (
    <main className="relative">
      <SiteHeader />
      <PageHero
        eyebrow="Contact"
        title="Démarrez une conversation de sûreté ancrée dans votre réalité opérationnelle"
        description="Partagez le profil de votre site, vos objectifs de modernisation, vos contraintes ou vos exigences d'intégration. Novadis peut cadrer un projet de site unique comme un environnement multi-sites."
      >
        <MediaStage>
          <MediaFrame
            priority
            alt="Réunion de cadrage autour d'une table dans un bureau"
            caption="Échanges directs · cadrage projet sous 48h"
            className="aspect-[16/11]"
            kind="image"
            src={mediaLibrary.stockMeeting}
          />
        </MediaStage>
      </PageHero>

      <section className="shell-wide">
        <div className="grid gap-4 sm:grid-cols-3">
          {contactCards.map((card, index) => (
            <Reveal className="h-full" delay={index * 0.06} key={card.label}>
              <a className="group block h-full" href={card.href}>
                <Card className="flex h-full items-start gap-4 p-6" interactive>
                  <IconBadge icon={card.icon} />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-strong">{card.label}</p>
                    <p className="mt-1 text-sm font-semibold text-foreground-strong">{card.value}</p>
                  </div>
                  <ArrowUpRight aria-hidden className="cta-arrow h-4 w-4 text-primary-strong" />
                </Card>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="shell-wide grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <div>
              <p className="eyebrow">Cadrage projet</p>
              <h2 className="section-title mt-5 text-balance text-2xl sm:text-3xl">
                <SplitTitle text="Les éléments que nous abordons en première discussion" />
              </h2>
              <ol className="mt-8 space-y-3">
                {[
                  "Infrastructure existante et contraintes de site",
                  "Exigences de contrôle d'accès et d'identité",
                  "Vidéo, analyse, preuves et workflows d'investigation",
                  "Maintenance, uptime et attentes de gouvernance",
                ].map((item, index) => (
                  <li key={item}>
                    <Card className="flex items-center gap-4 p-4">
                      <NumberBadge size="sm" value={index + 1} />
                      <span className="text-base leading-7 text-foreground-strong">{item}</span>
                    </Card>
                  </li>
                ))}
              </ol>
              <p className="mt-9 max-w-md text-sm leading-7 text-muted-strong">
                Vous préférez une rencontre directe ? Nous nous déplaçons sur vos sites en France, au Luxembourg
                et en Belgique pour cadrer le projet en conditions réelles.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="p-6 shadow-lift sm:p-10">
              <p className="eyebrow">Demander une consultation</p>
              <h2 className="section-title mt-5 text-balance text-2xl sm:text-3xl">
                Un message direct, <span className="text-gradient">traité par l&apos;équipe ingénierie</span>
              </h2>
              <form className="mt-9 grid gap-7 sm:grid-cols-2">
                <label className={labelClass}>
                  Nom
                  <input className={inputClass} placeholder="Votre nom" />
                </label>
                <label className={labelClass}>
                  Société
                  <input className={inputClass} placeholder="Nom de la société" />
                </label>
                <label className={labelClass}>
                  Email
                  <input className={inputClass} placeholder="name@company.com" type="email" />
                </label>
                <label className={labelClass}>
                  Téléphone
                  <input className={inputClass} placeholder="+33 ..." />
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
            </Card>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
