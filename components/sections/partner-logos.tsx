import { partnerTeaser, technologyPartners, technologyPartnersTitle } from "@/data/partners";
import { Reveal } from "@/components/motion/reveal";
import { PartnerTeaserCell } from "@/components/sections/partner-teaser-cell";

const cellClass =
  "flex min-h-28 flex-col items-center justify-center gap-1 border-b border-r border-hairline bg-surface p-5 sm:min-h-32";

function TeaserSilhouette() {
  return (
    <>
      <svg aria-hidden className="h-12 w-full max-w-36 text-hairline-strong" fill="currentColor" viewBox="0 0 144 48">
        <circle cx="24" cy="24" r="16" />
        <rect height="9" rx="4.5" width="78" x="50" y="10" />
        <rect height="9" rx="4.5" width="54" x="50" y="29" />
      </svg>
      <p className="mt-2 text-center text-sm font-semibold text-foreground-strong">{partnerTeaser.label}</p>
    </>
  );
}

export function PartnerLogos() {
  const { revealAt, pendingText, countdownPrefix, units } = partnerTeaser;
  return (
    <section className="section-y pb-0!">
      <div className="shell-wide">
        <Reveal>
          <h2 className="section-title text-balance text-[clamp(1.75rem,2.6vw,2.25rem)]">{technologyPartnersTitle}</h2>
        </Reveal>
        <Reveal className="mt-10" delay={0.05}>
          <ul className="grid grid-cols-2 border-l border-t border-hairline sm:grid-cols-3 lg:grid-cols-6">
            {technologyPartners.map((partner) => (
              <li className={cellClass} key={partner.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={partner.name}
                  className="h-12 w-full max-w-36 object-contain"
                  decoding="async"
                  loading="lazy"
                  src={partner.logo}
                />
              </li>
            ))}
            {revealAt ? (
              <PartnerTeaserCell
                className={cellClass}
                countdownPrefix={countdownPrefix}
                pendingText={pendingText}
                revealAt={revealAt}
                units={units}
              >
                <TeaserSilhouette />
              </PartnerTeaserCell>
            ) : (
              <li className={cellClass}>
                <TeaserSilhouette />
                <p className="mt-1 text-center text-xs leading-5 text-muted-strong">{pendingText}</p>
              </li>
            )}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
