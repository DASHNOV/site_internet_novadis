import path from "node:path";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { fr } from "@payloadcms/translations/languages/fr";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "./collections/media";
import { Users } from "./collections/users";

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: " · Novadis — Contenus" },
  },
  collections: [Users, Media],
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
