import path from "node:path";
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Image", plural: "Médiathèque" },
  admin: { group: "Médias" },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: path.resolve(process.cwd(), "cms/media"),
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      label: "Texte alternatif",
      type: "text",
      required: true,
      admin: { description: "Décrit l'image pour les lecteurs d'écran et le référencement." },
    },
  ],
};
