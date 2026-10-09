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
  return (
    <figure
      className={cn(
        "group relative overflow-hidden bg-[rgb(var(--background-elevated))]",
        className,
      )}
    >
      {kind === "video" ? (
        <video
          autoPlay
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
          loop
          muted
          playsInline
          poster={poster}
          src={src}
        />
      ) : (
        <img
          alt={alt}
          loading={priority ? undefined : "lazy"}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
          src={src}
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />

      {caption && (
        <figcaption className="absolute bottom-5 left-5 right-5 text-xs font-semibold text-white drop-shadow-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
