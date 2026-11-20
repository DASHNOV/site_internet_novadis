import config from "@payload-config";
import { draftMode, headers } from "next/headers";
import { getPayload, type GlobalSlug } from "payload";
import { cache } from "react";
import { annotateForEditing } from "./annotate";
import { buildSiteContent, type CmsRaw } from "./build";

// Mode édition : le cookie de brouillon de Next (posé par /edition) ET une session Payload encore valide.
export const isEditing = cache(async () => {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return false;
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });
  return Boolean(user);
});

const loadCmsRaw = cache(async (draft: boolean): Promise<CmsRaw> => {
  const payload = await getPayload({ config });
  // Hors édition, les règles d'accès d'un visiteur s'appliquent : seule la version publiée est lue.
  const options = { draft, depth: 1, overrideAccess: draft } as const;
  const list = { ...options, sort: "order", limit: 100, pagination: false } as const;

  // Un brouillon de page remplace le contenu principal du global : le visiteur n'y a plus accès et
  // reçoit un objet vide. On lui sert alors la dernière version publiée.
  async function findGlobal<S extends GlobalSlug>(slug: S) {
    const doc = await payload.findGlobal({ slug, ...options });
    if (draft || doc._status === "published") return doc;
    const { docs } = await payload.findGlobalVersions({
      slug,
      where: { "version._status": { equals: "published" } },
      sort: "-updatedAt",
      limit: 1,
      depth: 1,
    });
    return (docs[0]?.version ?? doc) as typeof doc;
  }

  const [home, solutionsPage, sectorsPage, servicesPage, referencesPage, aboutPage, contactPage, common, demos] =
    await Promise.all([
      findGlobal("home"),
      findGlobal("solutions-page"),
      findGlobal("sectors-page"),
      findGlobal("services-page"),
      findGlobal("references-page"),
      findGlobal("about-page"),
      findGlobal("contact-page"),
      findGlobal("common"),
      findGlobal("demos"),
    ]);
  const [solutions, sectors, references, challenges, salesContacts] = await Promise.all([
    payload.find({ collection: "solutions", ...list }),
    payload.find({ collection: "sectors", ...list }),
    payload.find({ collection: "references", ...list }),
    payload.find({ collection: "challenges", ...list }),
    payload.find({ collection: "sales-contacts", ...list, where: { visible: { equals: true } } }),
  ]);

  return {
    globals: { home, solutionsPage, sectorsPage, servicesPage, referencesPage, aboutPage, contactPage, common, demos },
    solutions: solutions.docs,
    sectors: sectors.docs,
    references: references.docs,
    challenges: challenges.docs,
    // L'adresse reçoit les demandes du formulaire : elle est retirée ici, car ce contenu part vers les composants client.
    salesContacts: salesContacts.docs.map(({ email: _email, ...contact }) => contact),
  };
});

// En mode édition, chaque texte porte l'adresse de son champ pour l'édition dans la page.
export const getCmsRaw = cache(async () => {
  const editing = await isEditing();
  const raw = await loadCmsRaw(editing);
  return editing ? annotateForEditing(raw) : raw;
});

export const getSiteContent = cache(async () => buildSiteContent(await getCmsRaw()));

// Hors requête (generateStaticParams, sitemap) : la version publiée, sans mode édition.
export const getPublishedContent = cache(async () => buildSiteContent(await loadCmsRaw(false)));
