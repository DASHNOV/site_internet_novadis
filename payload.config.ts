import path from "node:path";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { fr } from "@payloadcms/translations/languages/fr";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Challenges } from "./collections/challenges";
import { Media } from "./collections/media";
import { References } from "./collections/references";
import { Sectors } from "./collections/sectors";
import { Solutions } from "./collections/solutions";
import { Users } from "./collections/users";
import { Common } from "./globals/common";
import { Demos } from "./globals/demos";
import { pageGlobals } from "./globals/pages";

// Démo locale : préremplit l'écran de connexion avec un compte de .env.local, choisi par CMS_PREFILL_ROLE.
function demoPrefill() {
  if (process.env.NODE_ENV !== "development") return false;
  const prefix = { admin: "CMS_ADMIN", publieur: "CMS_PUBLISHER", redacteur: "CMS_EDITOR" }[process.env.CMS_PREFILL_ROLE ?? "admin"];
  const email = prefix && process.env[`${prefix}_EMAIL`];
  return email ? { email, password: process.env[`${prefix}_PASSWORD`], prefillOnly: true } : false;
}

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · Novadis — Contenus",
      icons: [{ rel: "icon", type: "image/svg+xml", url: "/icon.svg" }],
    },
    // Le logo est sombre : l'admin reste en thème clair, comme le site.
    theme: "light",
    components: {
      graphics: {
        Logo: "/components/admin/brand#AdminLogo",
        Icon: "/components/admin/brand#AdminIcon",
      },
    },
    autoLogin: demoPrefill(),
  },
  collections: [Solutions, Sectors, References, Challenges, Media, Users],
  globals: [...pageGlobals, Common, Demos],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || "file:./cms/payload.db" },
  }),
  i18n: {
    supportedLanguages: { fr },
    fallbackLanguage: "fr",
  },
  typescript: {
    outputFile: path.resolve(process.cwd(), "payload-types.ts"),
  },
  sharp,
});
