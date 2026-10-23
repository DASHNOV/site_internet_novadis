"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { buildSiteContent, type CmsRaw, type SiteContent } from "@/lib/content/build";

const SiteContentContext = createContext<SiteContent | null>(null);

// Les contenus Payload arrivent du serveur en JSON ; icônes et réglages techniques sont rattachés ici.
export function SiteContentProvider({ raw, children }: { raw: CmsRaw; children: ReactNode }) {
  const content = useMemo(() => buildSiteContent(raw), [raw]);
  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const content = useContext(SiteContentContext);
  if (!content) throw new Error("useSiteContent doit être utilisé sous <SiteContentProvider>");
  return content;
}
