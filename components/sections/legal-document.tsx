import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { LegalPageCopy } from "@/data/legal";

const linkClass = "font-medium text-primary-strong underline underline-offset-2";
const CONTACT_PATTERN = /([\w.-]+@[\w-]+\.[a-z]+|https:\/\/[^\s]+)/g;

function LegalText({ text }: { text: string }) {
  return text.split(CONTACT_PATTERN).map((part, index) => {
    if (index % 2 === 0) return part;
    const external = part.startsWith("https://");
    return (
      <a
        className={`${linkClass} break-words`}
        href={external ? part : `mailto:${part}`}
        key={part}
        rel={external ? "noreferrer" : undefined}
        target={external ? "_blank" : undefined}
      >
        {external ? part.replace("https://", "") : part}
      </a>
    );
  });
}

function Paragraphs({ texts }: { texts?: string[] }) {
  return texts?.map((text) => (
    <p key={text}>
      <LegalText text={text} />
    </p>
  ));
}

export function LegalDocument({ copy }: { copy: LegalPageCopy }) {
  return (
    <main className="relative pb-20">
      <SiteHeader />
      <section className="shell-narrow pt-16 lg:pt-24">
        <Reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="section-title mt-6 text-balance text-3xl sm:text-5xl">{copy.title}</h1>
          <p className="mt-5 text-sm text-muted-strong">{copy.updatedAt}</p>
        </Reveal>
        <div className="mt-12 max-w-3xl space-y-10 text-base leading-7 text-muted-strong">
          {copy.sections.map((section) => (
            <section className="space-y-3" key={section.title}>
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground-strong">{section.title}</h2>
              <Paragraphs texts={section.paragraphs} />
              {section.items && (
                <ul className="list-disc space-y-1.5 pl-5">
                  {section.items.map((item) => (
                    <li key={item}>
                      <LegalText text={item} />
                    </li>
                  ))}
                </ul>
              )}
              <Paragraphs texts={section.closing} />
              {section.link && (
                <p>
                  <Link className={linkClass} href={section.link.href}>
                    {section.link.label}
                  </Link>
                </p>
              )}
            </section>
          ))}
        </div>
        <div className="mt-12 divider" />
      </section>
      <SiteFooter />
    </main>
  );
}
