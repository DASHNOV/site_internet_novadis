// Extension explicite : ce module est aussi chargé hors de Next, par les scripts en ESM.
import { revalidatePath } from "next/cache.js";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";

function revalidateSite() {
  try {
    revalidatePath("/", "layout");
  } catch {
    // Hors de Next (scripts de migration), il n'y a pas de cache à invalider.
  }
}

const isPublished = (doc: { _status?: string | null }) => doc._status !== "draft";

// Un brouillon ne change rien au site public : seule une publication (ou un retour en arrière) l'invalide.
export const revalidateOnPublish: CollectionAfterChangeHook & GlobalAfterChangeHook = ({ doc }) => {
  if (isPublished(doc)) revalidateSite();
  return doc;
};

export const revalidateOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateSite();
  return doc;
};
