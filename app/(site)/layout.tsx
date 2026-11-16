import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteContentProvider } from "@/components/content-provider";
import { EditModeLoader } from "@/components/edit/edit-mode-loader";
import { getCmsRaw, isEditing } from "@/lib/content/server";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://novadis.eu"),
  title: {
    default: "Novadis — Créateur de solutions globales de sûreté",
    template: "%s · Novadis",
  },
  description:
    "Novadis conçoit, intègre et maintient des systèmes globaux de sûreté pour les entreprises, l'industrie et les infrastructures critiques. Convergence IT, contrôle d'accès, vidéosurveillance, intrusion, analyse d'image.",
  keywords: [
    "sûreté",
    "sécurité",
    "contrôle d'accès",
    "vidéosurveillance",
    "infrastructures critiques",
    "Amadeus",
    "convergence IT",
    "Novadis",
  ],
  openGraph: {
    title: "Novadis — Créateur de solutions globales de sûreté",
    description:
      "De l'infrastructure informatique à l'analyse d'image, Novadis livre des systèmes de sûreté pensés pour la durée et l'exploitation.",
    type: "website",
    locale: "fr_FR",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [raw, editing] = await Promise.all([getCmsRaw(), isEditing()]);
  return (
    <html lang="fr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${fontVariables} font-sans antialiased`}
      >
        {/* Scroll-reveal content is server-rendered hidden; show it when JS never runs. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <SiteContentProvider raw={raw}>
          {children}
          {editing && <EditModeLoader />}
        </SiteContentProvider>
      </body>
    </html>
  );
}
