import Link from "next/link";
import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react";
import { mediaLibrary, navItems, trustSignals } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 bg-[rgb(11_18_32)] pt-24 text-white/80">
      <div className="shell-wide">
        <div className="border-t border-white/15" />
        <div className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Link className="inline-flex items-center" href="/">
              <img alt="Novadis" className="h-9 w-auto object-contain" src={mediaLibrary.logoDark} />
            </Link>
            <p className="mt-6 max-w-sm text-base leading-7 text-white/70">
              Créateur de solutions globales de sûreté. De l&apos;infrastructure informatique à
              l&apos;analyse d&apos;image, Novadis livre des systèmes pensés pour la durée et l&apos;exploitation.
            </p>
            <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
              #DetailsMakeTheDifference
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">Navigation</p>
            <div className="mt-5 grid">
              {navItems.map((item) => (
                <Link
                  className="flex items-center justify-between border-b border-white/10 py-3 text-sm font-semibold text-white transition hover:text-primary"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/55" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">Contact</p>
            <div className="mt-5 space-y-4 text-sm text-white">
              <a className="flex items-start gap-3 hover:text-primary" href="mailto:contact@novadis.eu">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                contact@novadis.eu
              </a>
              <a className="flex items-start gap-3 hover:text-primary" href="tel:+35226190173">
                <Phone className="mt-0.5 h-4 w-4 text-primary" />
                +352 26 19 01 73
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span className="leading-6 text-white/70">
                  14-16 Rue Clément Bayard
                  <br />
                  92300 Levallois-Perret · France
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">Conformité</p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {trustSignals.map((signal) => (
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-white"
                  key={signal}
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/15" />
        <div className="flex flex-col gap-4 py-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Novadis · Tous droits réservés</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link className="hover:text-primary" href="/legal">
              Mentions légales
            </Link>
            <span className="divider-dot" aria-hidden />
            <Link className="hover:text-primary" href="/privacy">
              Confidentialité
            </Link>
            <span className="divider-dot" aria-hidden />
            <span className="font-mono uppercase tracking-[0.22em] text-primary">FR · LU · BE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
