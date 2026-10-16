import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitTitle } from "@/components/ui/split-title";

type PageHeroProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageHero({ title, description, children }: PageHeroProps) {
  return (
    <section className="border-b border-hairline">
      <div className="shell-wide grid gap-12 pb-16 pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,1fr)] lg:items-center lg:pb-24 lg:pt-20">
        <div className="max-w-3xl">
          <Reveal>
            <h1 className="section-title text-balance text-[clamp(2.5rem,5vw,4.25rem)]">
              <SplitTitle text={title} />
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">{description}</p>
          </Reveal>
        </div>
        {children && <Reveal delay={0.14}>{children}</Reveal>}
      </div>
    </section>
  );
}
