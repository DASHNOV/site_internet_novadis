import path from "node:path";
import { APIError, type CollectionBeforeOperationHook, type CollectionConfig } from "payload";
import { revalidateOnDelete, revalidateOnPublish } from "../hooks/revalidate";
import { isLoggedIn, isPublisher } from "../access";

// Remplacer le fichier d'une image revient à la supprimer du site : même droit que la suppression.
// Le texte alternatif reste modifiable par tous les comptes.
const replaceFileOnlyForPublishers: CollectionBeforeOperationHook = ({ args, operation, req }) => {
  if (operation === "update" && req.file && !isPublisher({ req })) {
    throw new APIError("Seul un responsable commercial peut remplacer le fichier d'une image.", 403);
  }
  return args;
};

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Image", plural: "Médiathèque" },
  admin: { group: "Médias" },
  hooks: {
    beforeOperation: [replaceFileOnlyForPublishers],
    afterChange: [revalidateOnPublish],
    afterDelete: [revalidateOnDelete],
  },
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
