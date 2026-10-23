import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { AccentTitle } from "@/components/ui/split-title";
import { ctaBannerCopy as copy } from "@/data/pages";
import { contactDetails } from "@/data/site";

const contactRow =
  "group flex min-h-16 items-center justify-between gap-4 border-b border-night-line px-5 py-4 transition-colors duration-150 hover:bg-white/[0.03]";

export function CtaBanner() {
  return (
    <section className="shell-wide pt-16 sm:pt-20 lg:pt-24">
      <Reveal>
        <div className="section-dark overflow-hidden rounded-xl bg-night-gradient px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div>
              <h2 className="section-title max-w-3xl text-balance text-[clamp(2rem,3.4vw,3rem)]">
                <AccentTitle title={copy.title} />
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">
                {copy.description}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/contact">
                  <Button size="lg" variant="inverse">
                    {copy.cta}
                    <ArrowUpRight className="cta-arrow h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="console overflow-hidden">
              <div className="console-head">
                <span>{copy.consoleTitle}</span>
                <span className="text-glow">{contactDetails.regions}</span>
              </div>
              <a className={contactRow} href={`mailto:${contactDetails.email}`}>
                <span className="flex items-center gap-4">
                  <Mail aria-hidden className="h-4 w-4 text-glow" />
                  <span>
                    <span className="block text-xs text-muted-strong">{copy.emailLabel}</span>
                    <span className="mt-0.5 block text-sm font-semibold text-white">{contactDetails.email}</span>
                  </span>
                </span>
                <ArrowUpRight aria-hidden className="cta-arrow h-4 w-4 text-white/60" />
              </a>
              <a className={contactRow} href={contactDetails.phoneHref}>
                <span className="flex items-center gap-4">
                  <Phone aria-hidden className="h-4 w-4 text-glow" />
                  <span>
                    <span className="block text-xs text-muted-strong">{copy.phoneLabel}</span>
                    <span className="tabular mt-0.5 block text-sm font-semibold text-white">{contactDetails.phone}</span>
                  </span>
                </span>
                <ArrowUpRight aria-hidden className="cta-arrow h-4 w-4 text-white/60" />
              </a>
              <div className="px-5 py-4">
                <p className="text-xs text-muted-strong">{copy.scopeLabel}</p>
                <p className="mt-1 text-sm leading-6 text-foreground">{copy.scope}</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
