import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/legal-document";
import { privacyPolicy } from "@/data/legal";

export const metadata: Metadata = {
  title: privacyPolicy.metaTitle,
  description: privacyPolicy.metaDescription,
};

export default function PrivacyPage() {
  return <LegalDocument copy={privacyPolicy} />;
}
