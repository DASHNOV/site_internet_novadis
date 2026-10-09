import { CheckCircle2, MonitorPlay, ShieldCheck } from "lucide-react";
import { featuredReferences } from "@/data/references";
import { getSolution, heroConsole } from "@/data/site";
import { IconBadge } from "@/components/ui/icon-badge";

export function HeroConsole() {
  const reference = featuredReferences[1];
  const modules = heroConsole.modules.flatMap((slug) => getSolution(slug) ?? []);

  return (
    <div className="iso-stage relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="iso-card relative overflow-hidden rounded-2xl border border-hairline bg-surface shadow-float">
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4">
          <div className="flex items-center gap-3">
            <IconBadge icon={MonitorPlay} size="sm" tone="solid" />
            <div>
              <p className="font-display text-sm font-bold text-foreground-strong">{heroConsole.title}</p>
              <p className="text-xs text-muted-strong">{heroConsole.subtitle}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/70 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {heroConsole.status}
          </span>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden">
          <img alt="" aria-hidden className="h-full w-full object-cover" src={reference.image} />
          <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent" />
          <div className="absolute inset-4 rounded-lg border border-white/25" />
          <p className="absolute bottom-6 left-6 right-6 text-xs font-semibold text-white">
            {reference.name} · site protégé par Novadis
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-px bg-hairline">
          {modules.map((module) => (
            <li className="flex items-center gap-3 bg-surface px-3 py-3.5 sm:px-4" key={module.slug}>
              <IconBadge icon={module.icon} size="sm" />
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-snug text-foreground-strong">{module.shortTitle}</p>
                <p className="text-xs font-medium text-emerald-700">{heroConsole.moduleStatus}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute -bottom-12 right-6 z-10 hidden items-center gap-3 sm:flex lg:right-10">
        <div className="flex animate-float items-center gap-3 rounded-xl border border-hairline bg-surface px-4 py-3 shadow-lift">
          <ShieldCheck aria-hidden className="h-5 w-5 text-primary" />
          <p className="text-sm font-semibold text-foreground-strong">{heroConsole.badge}</p>
        </div>
        <div className="flex animate-float items-center gap-3 rounded-xl border border-hairline bg-surface px-4 py-3 shadow-lift [animation-delay:-3s]">
          <CheckCircle2 aria-hidden className="h-5 w-5 text-success" />
          <p className="text-sm font-semibold text-foreground-strong">{heroConsole.highlight}</p>
        </div>
      </div>
    </div>
  );
}
