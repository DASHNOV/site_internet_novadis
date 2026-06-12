import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Roboto, Oxygen, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

const oxygen = Oxygen({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

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
    "Ocularis",
    "Galaxy",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${oxygen.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
