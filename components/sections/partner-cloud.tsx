import { Reveal } from "@/components/motion/reveal";
import { partners } from "@/data/site";

export function PartnerCloud() {
  const techPartners = partners.filter((p) => p.kind === "tech");
  const norms = partners.filter((p) => p.kind === "norm");
  const associations = partners.filter((p) => p.kind === "association");
  const ticker = [...techPartners, ...techPartners];

  return (
    <section className="shell-wide pb-12 pt-20">
      <Reveal>
        <div className="grid gap-8 border-b border-t border-[rgba(var(--hairline-strong))] py-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2.15fr)] lg:items-center">
          <div>
            <p className="eyebrow">Partenaires & conformité</p>
            <p className="mt-4 max-w-sm text-base leading-7 text-muted-strong">
              Une chaîne de partenariats stricts et un cadre normatif clair pour bâtir des architectures
              ouvertes, normées et tenues dans la durée.
            </p>
          </div>
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
            <div className="ticker-track flex w-max items-center gap-10">
              {ticker.map((partner, index) =>
                partner.logo ? (
                  <div
                    className="flex min-w-[130px] flex-col items-start gap-2"
                    key={`${partner.name}-${index}`}
                  >
                    <img
                      alt={partner.name}
                      className="h-8 max-w-[120px] object-contain grayscale transition-all duration-300 hover:grayscale-0"
                      loading="lazy"
                      src={partner.logo}
                      style={{ opacity: 0.6 }}
                    />
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{partner.role}</p>
                  </div>
                ) : (
                  <div
                    className="flex min-w-[150px] items-center gap-3"
                    key={`${partner.name}-${index}`}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 font-mono text-[10px] font-semibold text-primary">
                      {partner.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground-strong">{partner.name}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{partner.role}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="grid gap-8 border-b border-[rgba(var(--hairline-strong))] py-8 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">Conformité & normes</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {norms.map((norm) => (
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                  key={norm.name}
                >
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {norm.name}
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{norm.role}</span>
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">Associations professionnelles</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {associations.map((asso) => (
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(var(--hairline-strong))] bg-[rgba(var(--card))] px-3 py-1.5 text-xs font-medium text-foreground-strong"
                  key={asso.name}
                >
                  Membre {asso.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
