import { getSiteContent } from "@/lib/content/server";
import Link from "next/link";
import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react";

const columnTitle = "font-display text-base font-bold text-white";

export async function SiteFooter() {
  const { mediaLibrary, navItems, trustSignals, contactDetails, footerCopy: copy } = await getSiteContent();
  return (
    <footer className="section-dark mt-16 sm:mt-20 lg:mt-24">
      <div className="shell-wide">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Link className="inline-flex items-center" href="/">
              <img alt="Novadis" className="h-7 w-auto object-contain" loading="lazy" src={mediaLibrary.logoDark} />
            </Link>
            <p className="mt-6 max-w-sm text-base leading-7 text-muted-strong">{copy.description}</p>
            <p className="mt-7 text-sm font-semibold text-glow">{copy.hashtag}</p>
          </div>

          <nav aria-label="Pied de page">
            <h2 className={columnTitle}>{copy.navigationTitle}</h2>
            <div className="mt-5 grid">
              {navItems.map((item) => (
                <Link
                  className="group flex min-h-11 items-center justify-between border-b border-night-line py-2.5 text-sm font-medium text-foreground hover:text-glow"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                  <ArrowUpRight aria-hidden className="cta-arrow h-3.5 w-3.5 text-white/40" />
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <h2 className={columnTitle}>{copy.contactTitle}</h2>
            <div className="mt-5 space-y-4 text-sm text-foreground">
              <a className="flex min-h-11 items-start gap-3 hover:text-glow" href={`mailto:${contactDetails.email}`}>
                <Mail aria-hidden className="mt-0.5 h-4 w-4 text-glow" />
                {contactDetails.email}
              </a>
              <a className="tabular flex min-h-11 items-start gap-3 hover:text-glow" href={contactDetails.phoneHref}>
                <Phone aria-hidden className="mt-0.5 h-4 w-4 text-glow" />
                {contactDetails.phone}
              </a>
              <div className="flex items-start gap-3">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 text-glow" />
                <span className="leading-6 text-muted-strong">
                  {contactDetails.addressLines.map((line, index) => (
                    <span key={line}>
                      {index > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className={columnTitle}>{copy.complianceTitle}</h2>
            <ul className="mt-5 divide-y divide-night-line border-y border-night-line">
              {trustSignals.map((signal) => (
                <li className="py-2.5 text-sm text-foreground" key={signal}>
                  {signal}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-night-line py-6 text-sm text-muted-strong sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {copy.rights}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link className="hover:text-glow" href="/legal">
              {copy.legalLabel}
            </Link>
            <span aria-hidden className="divider-dot" />
            <Link className="hover:text-glow" href="/privacy">
              {copy.privacyLabel}
            </Link>
            <span aria-hidden className="divider-dot" />
            <span className="font-mono text-xs tracking-[0.14em] text-glow">{contactDetails.regions}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
