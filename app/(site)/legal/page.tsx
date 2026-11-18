import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/legal-document";
import { legalNotice } from "@/data/legal";

export const metadata: Metadata = {
  title: legalNotice.metaTitle,
  description: legalNotice.metaDescription,
};

export default function LegalPage() {
  return <LegalDocument copy={legalNotice} />;
}
