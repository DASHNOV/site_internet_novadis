import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getSiteContent } from "@/lib/content/server";
import { ContactForm } from "@/components/sections/contact-form";
import { MediaFrame } from "@/components/sections/media-frame";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { IconBadge } from "@/components/ui/icon-badge";
import { AccentTitle, SplitTitle } from "@/components/ui/split-title";
import { contactDetails } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Novadis pour échanger sur la sûreté, la convergence et la modernisation de vos systèmes de sécurité.",
};

export default async function ContactPage() {
  const { mediaLibrary, contactChannels, contactTopics, contactPage: copy } = await getSiteContent();
  return (
    <main className="relative">
      <SiteHeader />
      <PageHero title={copy.hero.title} description={copy.hero.description}>
        <MediaFrame
          priority
          alt={copy.hero.mediaAlt}
          caption={copy.hero.mediaCaption}
          className="aspect-[16/11]"
          kind="image"
          src={mediaLibrary.stockMeeting}
        />
      </PageHero>

      <section className="shell-wide pt-10">
        <ul className="grid border-l border-t border-hairline sm:grid-cols-3">
          {contactChannels.map((channel) => (
            <li className="border-b border-r border-hairline" key={channel.label}>
              <a
                className="group flex h-full items-start gap-4 bg-surface p-6 transition-colors duration-150 hover:bg-background-soft"
                href={channel.href}
              >
                <IconBadge className="mt-0.5" icon={channel.icon} />
                <span className="flex-1">
                  <span className="block text-sm text-muted-strong">{channel.label}</span>
                  <span className="mt-1 block text-sm font-semibold text-foreground-strong group-hover:text-primary-strong">
                    {channel.value}
                  </span>
                </span>
                <ArrowUpRight aria-hidden className="cta-arrow h-4 w-4 text-primary-strong" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-y">
        <div className="shell-wide grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <h2 className="section-title text-balance text-[clamp(1.75rem,2.6vw,2.25rem)]">
              <SplitTitle text={copy.topicsTitle} />
            </h2>
            <ul className="mt-8 border-t border-hairline">
              {contactTopics.map((item) => (
                <li className="border-b border-hairline py-4 text-base leading-7 text-foreground-strong" key={item}>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-9 max-w-md text-sm leading-7 text-muted-strong">{copy.meetingNote}</p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="panel p-6 sm:p-10">
              <h2 className="section-title text-balance text-[clamp(1.75rem,2.6vw,2.25rem)]">
                <AccentTitle title={copy.formTitle} />
              </h2>
              <ContactForm fallbackEmail={contactDetails.email} />
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
