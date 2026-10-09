import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { siteMetrics } from "@/data/site";
import { cn } from "@/lib/utils";

export function StatRow({ className }: { className?: string }) {
  return (
    <section className={cn("shell-wide relative z-10 pt-16", className)}>
      <Reveal>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline shadow-lift lg:grid-cols-4">
          {siteMetrics.map((stat) => (
            <div className="flex flex-col gap-1.5 bg-surface px-5 py-7 sm:px-8 sm:py-8" key={stat.label}>
              <p className="font-display text-3xl font-extrabold tracking-tight text-gradient sm:text-4xl lg:text-[2.75rem]">
                <CountUp value={stat.value} />
              </p>
              <p className="text-sm font-semibold text-foreground-strong">{stat.label}</p>
              {stat.caption && <p className="text-xs text-muted-strong">{stat.caption}</p>}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
