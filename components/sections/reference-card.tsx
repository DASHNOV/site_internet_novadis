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
      <div className="aspect-[16/10] overflow-hidden border-b border-hairline">
        <img alt={reference.name} className="h-full w-full object-cover" loading="lazy" src={reference.image} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-bold tracking-tight text-foreground-strong">{reference.name}</h3>
        <p className="mt-1 text-sm font-medium text-primary-strong">{reference.sector}</p>
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

  if (!href) return <div className="h-full">{card}</div>;
  return (
    <Link className="group block h-full" href={href}>
      {card}
    </Link>
  );
}
