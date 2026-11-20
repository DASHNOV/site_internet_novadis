import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { SplitTitle } from "@/components/ui/split-title";
import { salesContactsCopy } from "@/data/contact-form";
import type { SalesContactCard } from "@/lib/content/build";
import { cleanText } from "@/lib/content/stega";
import { cn } from "@/lib/utils";

const initialsOf = (name: string) =>
  cleanText(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

function Portrait({ contact }: { contact: SalesContactCard }) {
  if (contact.photo) {
    return (
      <img
        alt={contact.photo.alt}
        className="h-16 w-16 shrink-0 rounded-full border border-hairline object-cover"
        loading="lazy"
        src={contact.photo.url}
      />
    );
  }
  return (
    <span
      aria-hidden
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-hairline bg-background-soft font-display text-lg font-bold tracking-tight text-muted-strong"
    >
      {initialsOf(contact.name)}
    </span>
  );
}

export function SalesContacts({ contacts }: { contacts: SalesContactCard[] }) {
  const cards = contacts.slice(0, salesContactsCopy.maxCards);
  if (cards.length === 0) return null;

  return (
    <section className="shell-wide pt-16 sm:pt-20">
      <Reveal className="max-w-2xl">
        <h2 className="section-title text-balance text-[clamp(1.75rem,2.6vw,2.25rem)]">
          <SplitTitle text={salesContactsCopy.title} lead={1} />
        </h2>
        <p className="mt-4 text-base leading-7 text-muted-strong">{salesContactsCopy.intro}</p>
      </Reveal>

      <Reveal className="mt-8" delay={0.06}>
        <ul
          className={cn(
            "grid border-l border-t border-hairline sm:grid-cols-2",
            cards.length === 5 ? "lg:grid-cols-3 xl:grid-cols-5" : cards.length === 6 ? "lg:grid-cols-3" : "lg:grid-cols-4",
          )}
        >
          {cards.map((contact) => (
            <li className="border-b border-r border-hairline" key={contact.id}>
              <article className="flex h-full flex-col gap-5 bg-surface p-6">
                <div className="flex items-center gap-4">
                  <Portrait contact={contact} />
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-foreground-strong">
                      {contact.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary-strong">{contact.role}</p>
                  </div>
                </div>
                {contact.areas ? <p className="text-sm leading-6 text-muted-strong">{contact.areas}</p> : null}
                <div className="mt-auto flex flex-col gap-4">
                  {contact.linkedin || contact.phone ? (
                    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-foreground-strong">
                      {contact.linkedin ? (
                        <li>
                          <a
                            className="inline-flex items-center gap-1 hover:text-primary-strong"
                            href={contact.linkedin}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {salesContactsCopy.linkedin}
                            <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                          </a>
                        </li>
                      ) : null}
                      {contact.phone ? (
                        <li>
                          <a
                            className="inline-flex items-center gap-1.5 hover:text-primary-strong"
                            href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                          >
                            <Phone aria-hidden className="h-3.5 w-3.5" />
                            {contact.phone}
                          </a>
                        </li>
                      ) : null}
                    </ul>
                  ) : null}
                  <Link
                    aria-label={`${salesContactsCopy.contactCta} ${cleanText(contact.name)}`}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "self-start")}
                    href={`/contact?${salesContactsCopy.param}=${contact.id}#${salesContactsCopy.formAnchor}`}
                    scroll
                  >
                    {salesContactsCopy.contactCta}
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
