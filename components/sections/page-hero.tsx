import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Blobs } from "@/components/ui/blobs";
import { SplitTitle } from "@/components/ui/split-title";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <Blobs variant="hero" />
      <div className="shell-wide grid gap-12 pb-16 pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,1fr)] lg:items-center lg:pb-24 lg:pt-20">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="section-title mt-6 text-balance text-4xl font-extrabold sm:text-5xl lg:text-6xl">
              <SplitTitle text={title} />
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">{description}</p>
          </Reveal>
        </div>
        {children && <Reveal delay={0.22}>{children}</Reveal>}
      </div>
    </section>
  );
}
