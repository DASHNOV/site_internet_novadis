import Link from "next/link";
import { ArrowUpRight, Download, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="shell-wide pt-32">
      <Reveal>
        <div className="border-t border-[rgba(var(--hairline-strong))] pt-16">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
            <div>
              <p className="eyebrow">Échangeons sur votre projet</p>
              <h2 className="section-title mt-6 max-w-3xl text-balance text-3xl sm:text-5xl lg:text-[3.4rem]">
                Construisez un environnement de sûreté pensé pour le réel
              </h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">
                Infrastructures, contrôle d&apos;accès, vidéosurveillance, convergence, modernisation ou maintenance —
                échangez avec Novadis sur vos contraintes concrètes.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/contact">
                  <Button size="lg" variant="primary">
                    Demander une consultation
                    <ArrowUpRight className="cta-arrow h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline">
                    Voir nos services
                  </Button>
                </Link>
                <a href="/novadis/documents/plaquette-novadis.pdf" target="_blank" rel="noopener">
                  <Button size="lg" variant="outline">
                    <Download className="h-4 w-4" />
                    Télécharger la plaquette
                  </Button>
                </a>
              </div>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[20px] border border-[rgba(var(--hairline-strong))] bg-[rgba(var(--hairline-strong))]">
              <a
                className="group flex items-center justify-between bg-[rgb(var(--background))] px-6 py-5 transition hover:bg-[rgb(var(--background-elevated))]"
                href="mailto:contact@novadis.eu"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">Email</p>
                    <p className="mt-1 text-sm font-semibold text-foreground-strong">contact@novadis.eu</p>
                  </div>
                </div>
                <ArrowUpRight className="cta-arrow h-4 w-4 text-foreground" />
              </a>
              <a
                className="group flex items-center justify-between bg-[rgb(var(--background))] px-6 py-5 transition hover:bg-[rgb(var(--background-elevated))]"
                href="tel:+35226190173"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">Téléphone</p>
                    <p className="mt-1 text-sm font-semibold text-foreground-strong">+352 26 19 01 73</p>
                  </div>
                </div>
                <ArrowUpRight className="cta-arrow h-4 w-4 text-foreground" />
              </a>
              <div className="bg-[rgb(var(--background))] px-6 py-5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">Périmètre</p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  Grandes entreprises · sites industriels · infrastructures critiques · multi-sites Europe
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
