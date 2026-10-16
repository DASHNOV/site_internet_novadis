import { Reveal } from "@/components/motion/reveal";
import { partners } from "@/data/site";

export function PartnerGrid() {
  const techPartners = partners.filter((p) => p.kind === "tech");
  return (
    <ul className="grid grid-cols-2 border-l border-t border-hairline sm:grid-cols-3 lg:grid-cols-6">
      {techPartners.map((partner) => (
        <li className="group flex flex-col justify-between gap-4 border-b border-r border-hairline bg-surface p-5" key={partner.name}>
          {partner.logo ? (
            <img
              alt={partner.name}
              className="h-8 max-w-[120px] object-contain object-left opacity-70 grayscale transition duration-150 group-hover:opacity-100 group-hover:grayscale-0"
              loading="lazy"
              src={partner.logo}
            />
          ) : (
            <p className="font-display text-lg font-bold text-foreground-strong">{partner.name}</p>
          )}
          <p className="text-xs font-medium text-muted-strong">{partner.role}</p>
        </li>
      ))}
    </ul>
  );
}

export function NormsList() {
  const norms = partners.filter((p) => p.kind === "norm");
  const associations = partners.filter((p) => p.kind === "association");
  return (
    <div className="grid gap-10 sm:grid-cols-2">
      <div>
        <h3 className="font-display text-lg font-bold text-foreground-strong">Conformité & normes</h3>
        <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
          {norms.map((norm) => (
            <li className="flex items-baseline justify-between gap-4 py-3" key={norm.name}>
              <span className="font-semibold text-foreground-strong">{norm.name}</span>
              <span className="text-sm text-muted-strong">{norm.role}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-display text-lg font-bold text-foreground-strong">Associations professionnelles</h3>
        <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
          {associations.map((asso) => (
            <li className="py-3 font-semibold text-foreground-strong" key={asso.name}>
              Membre {asso.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PartnerCloud() {
  return (
    <section className="shell-wide section-y">
      <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-end">
        <h2 className="section-title text-balance text-[clamp(1.75rem,2.6vw,2.25rem)]">Partenaires & conformité</h2>
        <p className="max-w-xl text-base leading-7 text-muted-strong">
          Une chaîne de partenariats stricts et un cadre normatif clair pour bâtir des architectures ouvertes, normées
          et tenues dans la durée.
        </p>
      </Reveal>
      <Reveal className="mt-10" delay={0.05}>
        <PartnerGrid />
      </Reveal>
      <Reveal className="mt-12" delay={0.1}>
        <NormsList />
      </Reveal>
    </section>
  );
}
