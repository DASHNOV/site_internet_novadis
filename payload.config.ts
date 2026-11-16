import path from "node:path";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
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
import { demoPrefill } from "./lib/demo-prefill";
import { migrations } from "./migrations";

const prefill = demoPrefill();

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
    autoLogin: prefill ? { ...prefill, prefillOnly: true } : false,
  },
  collections: [Solutions, Sectors, References, Challenges, Media, Users],
  globals: [...pageGlobals, Common, Demos],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  // En ligne : Postgres Neon (DATABASE_URL, posée par Vercel). En local : la base SQLite de la démo.
  db: process.env.DATABASE_URL
    ? postgresAdapter({
        pool: { connectionString: process.env.DATABASE_URL },
        push: false,
        migrationDir: path.resolve(process.cwd(), "migrations"),
        prodMigrations: migrations,
      })
    : sqliteAdapter({
        client: { url: process.env.DATABASE_URI || "file:./cms/payload.db" },
      }),
  plugins: [
    // Sans jeton (en local), les images restent dans cms/media.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      // Les fonctions Vercel refusent les envois de plus de 4,5 Mo : le navigateur envoie l'image directement.
      clientUploads: true,
    }),
  ],
  i18n: {
    supportedLanguages: { fr },
    fallbackLanguage: "fr",
  },
  typescript: {
    outputFile: path.resolve(process.cwd(), "payload-types.ts"),
  },
  sharp,
});
