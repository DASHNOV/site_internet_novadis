"use client";

import { Button, useDocumentInfo } from "@payloadcms/ui";

const globalPaths: Record<string, string> = {
  home: "/",
  "solutions-page": "/solutions",
  "sectors-page": "/secteurs",
  "services-page": "/services",
  "references-page": "/references",
  "about-page": "/about",
  "contact-page": "/contact",
  common: "/",
  demos: "/",
};

function sitePath(collectionSlug?: string, globalSlug?: string, slug?: unknown) {
  if (globalSlug) return globalPaths[globalSlug];
  if (collectionSlug === "solutions" && typeof slug === "string") return `/solutions/${slug}`;
  if (collectionSlug === "sectors" && typeof slug === "string") return `/secteurs#${slug}`;
  if (collectionSlug === "references") return "/references";
  if (collectionSlug === "challenges") return "/";
}

// Ouvre la page concernée en mode édition, pour voir le brouillon et le modifier sur place.
export function ViewOnSite() {
  const { collectionSlug, globalSlug, savedDocumentData } = useDocumentInfo();
  const path = sitePath(collectionSlug, globalSlug, savedDocumentData?.slug);
  if (!path) return null;

  return (
    <Button buttonStyle="secondary" el="anchor" margin={false} newTab size="medium" url={`/edition?page=${encodeURIComponent(path)}`}>
      Voir sur le site
    </Button>
  );
}
