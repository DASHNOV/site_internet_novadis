import { Gutter, SetDocumentStepNav } from "@payloadcms/ui";
import Link from "next/link";
import type { CollectionSlug, DocumentViewServerProps, GlobalSlug } from "payload";
import { formatAdminURL } from "payload/shared";

type VersionRow = { id: number | string; updatedAt: string; version: { _status?: string | null; updatedBy?: string | null } };

const VERSIONS_PER_DOCUMENT = 50;

export const dateFormat = new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "medium", timeZone: "Europe/Paris" });

export const statusLabel = (status?: string | null) => (status === "published" ? "Publiée" : "Brouillon");

// Remplace la liste standard de Payload, qui ne permet pas d'ajouter la colonne de l'auteur.
export async function VersionHistory({ initPageResult }: DocumentViewServerProps) {
  const { collectionConfig, docID, globalConfig, req } = initPageResult;
  const { payload, user } = req;
  const options = { depth: 0, limit: VERSIONS_PER_DOCUMENT, overrideAccess: false, req, sort: "-updatedAt", user } as const;

  const { docs } = collectionConfig
    ? await payload.findVersions({
        ...options,
        collection: collectionConfig.slug as CollectionSlug,
        where: { parent: { equals: docID } },
      })
    : await payload.findGlobalVersions({ ...options, slug: globalConfig!.slug as GlobalSlug });

  const basePath: `/${string}` = collectionConfig
    ? `/collections/${collectionConfig.slug}/${docID}/versions`
    : `/globals/${globalConfig!.slug}/versions`;
  const adminRoute = payload.config.routes.admin;

  return (
    <>
      <SetDocumentStepNav
        collectionSlug={collectionConfig?.slug}
        globalSlug={globalConfig?.slug}
        id={docID}
        pluralLabel={collectionConfig ? String(collectionConfig.labels.plural) : String(globalConfig!.label)}
        useAsTitle={collectionConfig?.admin.useAsTitle ?? globalConfig?.slug}
        view="Versions"
      />
      <main className="versions">
        <Gutter className="versions__wrap">
          {docs.length === 0 ? (
            <p>Aucune version pour le moment.</p>
          ) : (
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Modifié par</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {(docs as unknown as VersionRow[]).map(({ id, updatedAt, version }) => (
                    <tr key={id}>
                      <td>
                        <Link href={formatAdminURL({ adminRoute, path: `${basePath}/${id}` })} prefetch={false}>
                          {dateFormat.format(new Date(updatedAt))}
                        </Link>
                      </td>
                      <td>{version.updatedBy ?? "Non renseigné"}</td>
                      <td>{statusLabel(version._status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Gutter>
      </main>
    </>
  );
}
