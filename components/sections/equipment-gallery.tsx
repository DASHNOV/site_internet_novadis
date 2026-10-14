import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Solution } from "@/data/site";

type EquipmentGalleryProps = NonNullable<Solution["equipment"]>;

export function EquipmentGallery({ eyebrow, title, description, items }: EquipmentGalleryProps) {
  return (
    <section className="section-y">
      <div className="shell-wide">
        <SectionHeading description={description} eyebrow={eyebrow} title={title} />
        <ul className={cn("mt-12 grid grid-cols-2 gap-4 sm:gap-6", items.length > 4 ? "lg:grid-cols-4" : "md:grid-cols-4")}>
          {items.map((camera, index) => (
            <li key={camera.src}>
              <Reveal className="h-full" delay={(index % 4) * 0.06}>
                <Card className="group h-full p-3" interactive>
                  <div className="aspect-square overflow-hidden rounded-lg bg-white">
                    <img
                      alt={`Caméra ${camera.brand} — ${camera.type}`}
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      src={camera.src}
                    />
                  </div>
                  <div className="px-2 pb-2 pt-4">
                    <p className="kicker">{camera.brand}</p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-foreground-strong">{camera.type}</p>
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
