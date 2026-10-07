"use client";

import { useEffect, useState } from "react";
import { Box } from "lucide-react";
import { arPreview } from "@/data/site";
import { cn } from "@/lib/utils";

type Platform = "ios" | "android" | null;

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  // iPadOS reports a desktop Safari user agent: tell it apart by touch support.
  const isIOS = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  if (isIOS) {
    const a = document.createElement("a");
    return a.relList?.supports?.("ar") ? "ios" : null;
  }
  return /Android/.test(ua) ? "android" : null;
}

const pillWidth = (label: string) => 56 + label.length * 8;

function pillImage(label: string) {
  const w = pillWidth(label);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="44" viewBox="0 0 ${w} 44">` +
    `<rect x="0.5" y="0.5" width="${w - 1}" height="43" rx="21.5" fill="#ffffff" fill-opacity="0.92" stroke="#36353524"/>` +
    `<path d="M20 15l7 4v8l-7 4-7-4v-8z M13 19l7 4 7-4 M20 23v8" fill="none" stroke="#36a4d9" stroke-width="1.6" stroke-linejoin="round"/>` +
    `<text x="36" y="27" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="600" fill="#1e1d1d">${label}</text>` +
    `</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Native AR viewers, no extra package: Quick Look on iOS, Google Scene Viewer on Android.
export function ArButton({ className }: { className?: string }) {
  const [platform, setPlatform] = useState<Platform>(null);
  const [href, setHref] = useState("");

  useEffect(() => {
    const detected = detectPlatform();
    setPlatform(detected);
    if (detected === "ios") {
      setHref(arPreview.usdz);
    } else if (detected === "android") {
      const file = new URL(arPreview.glb, window.location.origin).href;
      const params = new URLSearchParams({
        file,
        mode: "ar_preferred",
        title: arPreview.title,
        enable_vertical_placement: "true",
      });
      setHref(
        `intent://arvr.google.com/scene-viewer/1.0?${params}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;` +
          `action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(window.location.href)};end;`,
      );
    }
  }, []);

  if (!platform || !href) return null;

  const classes = cn(
    "inline-flex items-center gap-2 rounded-full border border-[rgba(var(--hairline-strong))] bg-background/90 px-4 py-2.5 text-sm font-semibold text-foreground-strong shadow-sm backdrop-blur",
    className,
  );

  return platform === "ios" ? (
    // Quick Look only accepts a single <img> inside the rel="ar" link, so the pill is drawn as an image.
    <a aria-label={arPreview.label} className={className} href={href} rel="ar">
      <img alt={arPreview.label} height={44} src={pillImage(arPreview.label)} width={pillWidth(arPreview.label)} />
    </a>
  ) : (
    <a className={classes} href={href}>
      <Box className="h-4 w-4 text-primary" />
      {arPreview.label}
    </a>
  );
}
