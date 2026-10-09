import Link from "next/link";
import { ArrowUpRight, Download, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Blobs } from "@/components/ui/blobs";
import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/ui/icon-badge";

export function CtaBanner() {
  return (
    <section className="shell-wide pt-16 sm:pt-20 lg:pt-24">
      <Reveal>
        <div className="section-dark relative isolate overflow-hidden rounded-2xl px-6 py-12 shadow-float sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <Blobs variant="night" />
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div>
              <p className="eyebrow">Échangeons sur votre projet</p>
              <h2 className="section-title mt-6 max-w-3xl text-balance text-3xl font-extrabold sm:text-4xl lg:text-5xl">
                Construisez un environnement de sûreté <span className="text-gradient">pensé pour le réel</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-strong sm:text-lg">
                Infrastructures, contrôle d&apos;accès, vidéosurveillance, convergence, modernisation ou maintenance —
                échangez avec Novadis sur vos contraintes concrètes.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/contact">
                  <Button size="lg" variant="inverse">
                    Demander une consultation
                    <ArrowUpRight className="cta-arrow h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="glass">
                    Voir nos services
                  </Button>
                </Link>
                <a href="/novadis/documents/plaquette-novadis.pdf" target="_blank" rel="noopener">
                  <Button size="lg" variant="glass">
                    <Download className="h-4 w-4" />
                    Télécharger la plaquette
                  </Button>
                </a>
              </div>
            </div>

            <div className="grid gap-3">
              <a
                className="group flex items-center justify-between rounded-xl border border-white/12 bg-white/[0.06] px-5 py-4 backdrop-blur-sm hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.1]"
                href="mailto:contact@novadis.eu"
              >
                <div className="flex items-center gap-4">
                  <IconBadge icon={Mail} size="sm" tone="glass" />
                  <div>
                    <p className="text-xs font-medium text-muted">Email</p>
                    <p className="mt-0.5 text-sm font-semibold text-white">contact@novadis.eu</p>
                  </div>
                </div>
                <ArrowUpRight className="cta-arrow h-4 w-4 text-white/70" />
              </a>
              <a
                className="group flex items-center justify-between rounded-xl border border-white/12 bg-white/[0.06] px-5 py-4 backdrop-blur-sm hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.1]"
                href="tel:+35226190173"
              >
                <div className="flex items-center gap-4">
                  <IconBadge icon={Phone} size="sm" tone="glass" />
                  <div>
                    <p className="text-xs font-medium text-muted">Téléphone</p>
                    <p className="mt-0.5 text-sm font-semibold text-white">+352 26 19 01 73</p>
                  </div>
                </div>
                <ArrowUpRight className="cta-arrow h-4 w-4 text-white/70" />
              </a>
              <div className="rounded-xl border border-white/12 px-5 py-4">
                <p className="text-xs font-medium text-muted">Périmètre</p>
                <p className="mt-1 text-sm leading-6 text-foreground">
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
