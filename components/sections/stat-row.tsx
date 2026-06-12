import { Reveal } from "@/components/motion/reveal";
import { siteMetrics } from "@/data/site";

export function StatRow() {
  return (
    <section className="shell-wide pt-24">
      <Reveal>
        <div className="grid divide-y divide-[rgba(var(--hairline-strong))] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {siteMetrics.map((stat) => (
            <div className="flex flex-col gap-2 px-4 py-7 sm:px-8" key={stat.label}>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">{stat.caption}</p>
              <p className="font-display text-4xl font-bold tracking-tight text-foreground-strong sm:text-5xl">
                {stat.value}
              </p>
              <p className="text-sm text-muted-strong">{stat.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
