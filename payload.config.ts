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

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: " · Novadis — Contenus" },
    // Démo locale : préremplit l'écran de connexion avec le compte de test de .env.local.
    autoLogin:
      process.env.NODE_ENV === "development" && process.env.CMS_ADMIN_EMAIL
        ? { email: process.env.CMS_ADMIN_EMAIL, password: process.env.CMS_ADMIN_PASSWORD, prefillOnly: true }
        : false,
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
