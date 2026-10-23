import path from "node:path";
import type { CollectionConfig } from "payload";
import { isLoggedIn, isPublisher } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Image", plural: "Médiathèque" },
  admin: { group: "Médias" },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isPublisher,
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
