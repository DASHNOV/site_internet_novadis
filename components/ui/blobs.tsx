import { cn } from "@/lib/utils";

type BlobsProps = {
  variant?: "hero" | "section" | "night";
  className?: string;
};

// Halos flous de profondeur : purement décoratifs, posés sous le contenu.
export function Blobs({ variant = "section", className }: BlobsProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        variant !== "night" && "[mask-image:linear-gradient(to_bottom,black_65%,transparent)]",
        className,
      )}
    >
      {variant === "hero" && (
        <>
          <div className="blob -right-32 -top-40 h-[560px] w-[560px] animate-breathe bg-accent/35" />
          <div className="blob -left-40 top-1/3 h-[460px] w-[460px] bg-glow/30" />
          <div className="blob bottom-[-200px] right-1/4 h-[420px] w-[420px] bg-primary/20" />
        </>
      )}
      {variant === "section" && (
        <>
          <div className="blob -left-48 top-10 h-[440px] w-[440px] bg-glow/25" />
          <div className="blob -right-40 bottom-0 h-[400px] w-[400px] bg-accent/15" />
        </>
      )}
      {variant === "night" && (
        <>
          <div className="blob -right-24 -top-32 h-[520px] w-[520px] animate-breathe bg-primary/40" />
          <div className="blob -left-40 bottom-[-160px] h-[480px] w-[480px] bg-accent/20" />
        </>
      )}
    </div>
  );
}
