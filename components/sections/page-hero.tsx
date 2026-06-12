import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="shell-wide pt-16 lg:pt-20">
      <div className="grid gap-12 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(360px,1.05fr)] lg:items-end lg:pb-20">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="section-title mt-6 text-balance text-4xl sm:text-5xl lg:text-[3.6rem]">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-strong sm:text-lg">{description}</p>
          </Reveal>
        </div>
        {children && <Reveal delay={0.22}>{children}</Reveal>}
      </div>
      <div className="divider" />
    </section>
  );
}
