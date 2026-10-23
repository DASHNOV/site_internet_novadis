import { getSiteContent } from "@/lib/content/server";
import { Reveal } from "@/components/motion/reveal";

export async function NormsList() {
  const { partners, normsCopy: copy } = await getSiteContent();
  const norms = partners.filter((p) => p.kind === "norm");
  const associations = partners.filter((p) => p.kind === "association");
  return (
    <div className="grid gap-10 sm:grid-cols-2">
      <div>
        <h3 className="font-display text-lg font-bold text-foreground-strong">{copy.normsTitle}</h3>
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
        <h3 className="font-display text-lg font-bold text-foreground-strong">{copy.associationsTitle}</h3>
        <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
          {associations.map((asso) => (
            <li className="py-3 font-semibold text-foreground-strong" key={asso.name}>
              {copy.memberPrefix} {asso.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function PartnerCloud() {
  const { normsCopy: copy } = await getSiteContent();
  return (
    <section className="shell-wide section-y">
      <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-end">
        <h2 className="section-title text-balance text-[clamp(1.75rem,2.6vw,2.25rem)]">{copy.title}</h2>
        <p className="max-w-xl text-base leading-7 text-muted-strong">{copy.description}</p>
      </Reveal>
      <Reveal className="mt-10" delay={0.05}>
        <NormsList />
      </Reveal>
    </section>
  );
}
