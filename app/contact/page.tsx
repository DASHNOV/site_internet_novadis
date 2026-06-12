import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MediaFrame } from "@/components/sections/media-frame";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
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
  "w-full border-0 border-b border-[rgba(var(--hairline-strong))] bg-transparent px-0 py-3 text-base text-foreground-strong placeholder:text-muted outline-none transition focus:border-primary";

const labelClass =
  "grid gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted-strong";

export default function ContactPage() {
  return (
    <main className="relative pb-20">
      <SiteHeader />
      <PageHero
        eyebrow="Contact"
        title="Démarrez une conversation de sûreté ancrée dans votre réalité opérationnelle"
        description="Partagez le profil de votre site, vos objectifs de modernisation, vos contraintes ou vos exigences d'intégration. Novadis peut cadrer un projet de site unique comme un environnement multi-sites."
      >
        <MediaFrame
          alt="Novadis · article visual"
          caption="Échanges directs · cadrage projet sous 48h"
          className="aspect-[16/11]"
          kind="image"
          src={mediaLibrary.articleVisual}
        />
      </PageHero>

      <section className="shell-wide pt-12">
        <div className="grid gap-px bg-[rgba(var(--hairline-strong))] sm:grid-cols-3">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.label}>
                <a
                  className="group flex h-full items-start gap-4 bg-[rgb(var(--background))] p-6 transition hover:bg-[rgb(var(--background-elevated))]"
                  href={card.href}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">{card.label}</p>
                    <p className="mt-2 text-sm font-semibold text-foreground-strong">{card.value}</p>
                  </div>
                  <ArrowUpRight className="cta-arrow h-4 w-4 text-foreground" />
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="shell-wide pt-24">
        <div className="grid gap-16 border-t border-[rgba(var(--hairline-strong))] pt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <div>
              <p className="eyebrow">Cadrage projet</p>
              <h2 className="section-title mt-5 text-balance text-2xl font-semibold sm:text-3xl">
                Les éléments que nous abordons en première discussion
              </h2>
              <ul className="mt-8 divide-y divide-[rgba(var(--hairline))] border-t border-[rgba(var(--hairline))]">
                {[
                  "Infrastructure existante et contraintes de site",
                  "Exigences de contrôle d'accès et d'identité",
                  "Vidéo, analyse, preuves et workflows d'investigation",
                  "Maintenance, uptime et attentes de gouvernance",
                ].map((item, index) => (
                  <li
                    className="flex items-start gap-5 py-4 text-base leading-7 text-foreground-strong"
                    key={item}
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
                      0{index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-9 max-w-md text-sm leading-7 text-muted-strong">
                Vous préférez une rencontre directe ? Nous nous déplaçons sur vos sites en France, au Luxembourg
                et en Belgique pour cadrer le projet en conditions réelles.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <p className="eyebrow">Demander une consultation</p>
              <h2 className="section-title mt-5 text-balance text-2xl font-semibold sm:text-3xl">
                Un message direct, traité par l&apos;équipe ingénierie
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
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
