import { cn } from "@/lib/utils";

type MediaFrameProps = {
  kind: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
  className?: string;
  priority?: boolean;
  caption?: string;
};

export function MediaFrame({ kind, src, alt, poster, className, caption, priority }: MediaFrameProps) {
  const media =
    kind === "video" ? (
      <video autoPlay className="h-full w-full object-cover" loop muted playsInline poster={poster} src={src} />
    ) : (
      <img alt={alt} className="h-full w-full object-cover" loading={priority ? undefined : "lazy"} src={src} />
    );

  if (!caption) {
    return (
      <figure className={cn("overflow-hidden rounded-xl border border-hairline bg-background-elevated", className)}>
        {media}
      </figure>
    );
  }

  return (
    <figure>
      <div className={cn("overflow-hidden rounded-xl border border-hairline bg-background-elevated", className)}>
        {media}
      </div>
      <figcaption className="data-label mt-3">{caption}</figcaption>
    </figure>
  );
}
