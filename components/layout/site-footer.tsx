import Link from "next/link";
import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react";
import { mediaLibrary, navItems, trustSignals } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="relative mt-16 border-t border-hairline bg-surface pt-4 text-foreground sm:mt-20 lg:mt-24">
      <div className="shell-wide">
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Link className="inline-flex items-center" href="/">
              <img loading="lazy" alt="Novadis" className="h-7 w-auto object-contain" src={mediaLibrary.logo} />
            </Link>
            <p className="mt-6 max-w-sm text-base leading-7 text-muted-strong">
              Créateur de solutions globales de sûreté. De l&apos;infrastructure informatique à
              l&apos;analyse d&apos;image, Novadis livre des systèmes pensés pour la durée et l&apos;exploitation.
            </p>
            <p className="mt-7 text-sm font-bold text-gradient">
              #DetailsMakeTheDifference
            </p>
          </div>

          <div>
            <p className="kicker">Navigation</p>
            <div className="mt-5 grid">
              {navItems.map((item) => (
                <Link
                  className="group flex min-h-11 items-center justify-between border-b border-hairline py-2.5 text-sm font-medium text-foreground-strong transition hover:text-primary-strong"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                  <ArrowUpRight className="cta-arrow h-3.5 w-3.5 text-muted" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="kicker">Contact</p>
            <div className="mt-5 space-y-4 text-sm text-foreground-strong">
              <a className="flex items-start gap-3 hover:text-primary-strong" href="mailto:contact@novadis.eu">
                <Mail className="mt-0.5 h-4 w-4 text-primary-strong" />
                contact@novadis.eu
              </a>
              <a className="flex items-start gap-3 hover:text-primary-strong" href="tel:+35226190173">
                <Phone className="mt-0.5 h-4 w-4 text-primary-strong" />
                +352 26 19 01 73
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-primary-strong" />
                <span className="leading-6 text-muted-strong">
                  14-16 Rue Clément Bayard
                  <br />
                  92300 Levallois-Perret · France
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="kicker">Conformité</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {trustSignals.map((signal) => (
                <span
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-strong"
                  key={signal}
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-hairline py-6 text-xs text-muted-strong sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Novadis · Tous droits réservés</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link className="hover:text-primary-strong" href="/legal">
              Mentions légales
            </Link>
            <span className="divider-dot" aria-hidden />
            <Link className="hover:text-primary-strong" href="/privacy">
              Confidentialité
            </Link>
            <span className="divider-dot" aria-hidden />
            <span className="font-semibold tracking-[0.12em] text-primary-strong">FR · LU · BE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
