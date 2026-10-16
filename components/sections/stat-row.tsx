import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { siteMetrics } from "@/data/site";
import { cn } from "@/lib/utils";

export function StatRow({ className }: { className?: string }) {
  return (
    <Reveal className={className}>
      <dl className="grid grid-cols-2 border-y border-hairline lg:grid-cols-4">
        {siteMetrics.map((stat, index) => (
          <div
            className={cn(
              "flex flex-col gap-2 px-1 py-7 sm:px-6 sm:py-9",
              index % 2 === 1 && "border-l border-hairline pl-5",
              index >= 2 && "border-t border-hairline lg:border-t-0",
              index === 2 && "lg:border-l lg:pl-6",
            )}
            key={stat.label}
          >
            <dt className="order-2 text-sm font-medium text-foreground-strong">{stat.label}</dt>
            <dd className="tabular order-1 font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-none tracking-[-0.03em] text-foreground-strong">
              <CountUp value={stat.value} />
            </dd>
            {stat.caption && <dd className="order-3 text-sm text-muted-strong">{stat.caption}</dd>}
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
