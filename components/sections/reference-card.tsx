import Link from "next/link";
import type { FeaturedReference } from "@/data/references";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type ReferenceCardProps = {
  reference: FeaturedReference;
  href?: string;
  tags?: string[];
};

export function ReferenceCard({ reference, href, tags }: ReferenceCardProps) {
  const card = (
    <Card className="flex h-full flex-col overflow-hidden" interactive={Boolean(href)}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          alt={reference.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          src={reference.image}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Badge className="self-start" tone="primary">
          {reference.sector}
        </Badge>
        <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground-strong">{reference.name}</h3>
        <p className="mt-3 text-sm leading-7 text-muted-strong">{reference.scope}</p>
        {tags && tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {tags.map((tag) => (
              <Badge key={tag} tone="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );

  if (!href) return <div className="group h-full">{card}</div>;
  return (
    <Link className="group block h-full" href={href}>
      {card}
    </Link>
  );
}
