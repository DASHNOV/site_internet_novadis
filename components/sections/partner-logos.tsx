import type { CSSProperties } from "react";
import { partnerTeaser, technologyPartners, technologyPartnersTitle } from "@/data/partners";
import { Reveal } from "@/components/motion/reveal";
import { PartnerTeaserCell } from "@/components/sections/partner-teaser-cell";

type Partner = (typeof technologyPartners)[number];

// Même poids visuel pour tous : un logo carré monte plus haut qu'un logo très allongé.
// Hauteur de référence 40 px pour un logo 3:1, plafonnée à 52 px pour les logos carrés.
function logoHeight(ratio: number) {
  return Math.min(52, Math.round(40 * Math.pow(3 / ratio, 0.45)));
}

const FEATURED_HEIGHT = 92;
const itemClass = "flex items-center justify-center";

function Logo({ partner, height }: { partner: Partner; height: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={partner.name}
      className="h-[calc(var(--logo-h)*0.62)] w-auto sm:h-(--logo-h)"
      decoding="async"
      height={height}
      loading="lazy"
      src={partner.logo}
      // Hauteur calculée par logo : seule la variable passe en style, la mise en forme reste en classes.
      style={{ "--logo-h": `${height}px` } as CSSProperties}
      width={Math.round(height * partner.ratio)}
    />
  );
}

function TeaserSilhouette() {
  return (
    <>
      <svg aria-hidden className="h-8 w-24 text-hairline-strong" fill="currentColor" viewBox="0 0 144 48">
        <circle cx="24" cy="24" r="16" />
        <rect height="9" rx="4.5" width="78" x="50" y="10" />
        <rect height="9" rx="4.5" width="54" x="50" y="29" />
      </svg>
      <p className="mt-1.5 text-center text-sm font-semibold text-foreground-strong">{partnerTeaser.label}</p>
    </>
  );
}

export function PartnerLogos() {
  const { revealAt, pendingText, countdownPrefix, units } = partnerTeaser;
  const featured = technologyPartners.find((partner) => partner.featured);
  const others = technologyPartners.filter((partner) => !partner.featured);
  // Forme en losange sur grand écran : 5 / 6 / DDS / 6 / 5 (la case « Nouveau partenaire » ferme la dernière rangée).
  const middle = Math.ceil(others.length / 2);
  const before = others.slice(0, middle);
  const after = others.slice(middle);
  const firstBreak = Math.floor(before.length / 2);
  const lastBreak = Math.ceil((after.length + 1) / 2);
  const teaserClass = `${itemClass} flex-col`;
  // Saut de rangée : une ligne vide de hauteur nulle, dont la marge négative annule l'écart qu'elle ajoute.
  const rowBreak = (key: string) => (
    <li aria-hidden className="-mt-11 hidden h-0 basis-full xl:block" key={key} role="presentation" />
  );

  const cloudItem = (partner: Partner) => (
    <li className={`${itemClass} grayscale opacity-70 transition duration-150 hover:opacity-100 hover:grayscale-0`} key={partner.name}>
      <Logo height={logoHeight(partner.ratio)} partner={partner} />
    </li>
  );

  return (
    <section className="section-y pb-0!">
      <div className="shell-wide">
        <Reveal>
          <h2 className="section-title text-balance text-[clamp(1.75rem,2.6vw,2.25rem)]">{technologyPartnersTitle}</h2>
        </Reveal>
        <Reveal className="mt-10" delay={0.05}>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-7 rounded-xl border border-hairline bg-surface px-4 py-10 sm:gap-x-14 sm:gap-y-11 sm:px-12 lg:px-20 lg:py-16">
            {before.slice(0, firstBreak).map(cloudItem)}
            {rowBreak("break-top")}
            {before.slice(firstBreak).map(cloudItem)}
            {featured && (
              <li className={`${itemClass} basis-full py-3 sm:py-5`}>
                <Logo height={FEATURED_HEIGHT} partner={featured} />
              </li>
            )}
            {after.slice(0, lastBreak).map(cloudItem)}
            {rowBreak("break-bottom")}
            {after.slice(lastBreak).map(cloudItem)}
            {revealAt ? (
              <PartnerTeaserCell
                className={teaserClass}
                countdownPrefix={countdownPrefix}
                pendingText={pendingText}
                revealAt={revealAt}
                units={units}
              >
                <TeaserSilhouette />
              </PartnerTeaserCell>
            ) : (
              <li className={teaserClass}>
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
