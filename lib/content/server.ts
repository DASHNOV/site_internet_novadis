import config from "@payload-config";
import { draftMode, headers } from "next/headers";
import { getPayload } from "payload";
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

  const [home, solutionsPage, sectorsPage, servicesPage, referencesPage, aboutPage, contactPage, common, demos] =
    await Promise.all([
      payload.findGlobal({ slug: "home", ...options }),
      payload.findGlobal({ slug: "solutions-page", ...options }),
      payload.findGlobal({ slug: "sectors-page", ...options }),
      payload.findGlobal({ slug: "services-page", ...options }),
      payload.findGlobal({ slug: "references-page", ...options }),
      payload.findGlobal({ slug: "about-page", ...options }),
      payload.findGlobal({ slug: "contact-page", ...options }),
      payload.findGlobal({ slug: "common", ...options }),
      payload.findGlobal({ slug: "demos", ...options }),
    ]);
  const [solutions, sectors, references, challenges] = await Promise.all([
    payload.find({ collection: "solutions", ...list }),
    payload.find({ collection: "sectors", ...list }),
    payload.find({ collection: "references", ...list }),
    payload.find({ collection: "challenges", ...list }),
  ]);

  return {
    globals: { home, solutionsPage, sectorsPage, servicesPage, referencesPage, aboutPage, contactPage, common, demos },
    solutions: solutions.docs,
    sectors: sectors.docs,
    references: references.docs,
    challenges: challenges.docs,
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
