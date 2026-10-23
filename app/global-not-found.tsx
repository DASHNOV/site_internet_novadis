import type { Metadata } from "next";
import { SiteContentProvider } from "@/components/content-provider";
import { getCmsRaw } from "@/lib/content/server";
import NotFound from "./(site)/not-found";
import { fontVariables } from "./(site)/fonts";
import "./(site)/globals.css";

// Le site et l'admin Payload ont chacun leur layout racine : une URL inconnue n'en traverse aucun.
export const metadata: Metadata = {
  title: "Page introuvable · Novadis",
};

export default async function GlobalNotFound() {
  const raw = await getCmsRaw();
  return (
    <html lang="fr">
      <body className={`${fontVariables} font-sans antialiased`}>
        <SiteContentProvider raw={raw}>
          <NotFound />
        </SiteContentProvider>
      </body>
    </html>
  );
}
