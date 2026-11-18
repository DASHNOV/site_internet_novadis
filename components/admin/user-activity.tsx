import { Gutter, SetDocumentStepNav } from "@payloadcms/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CollectionSlug, DefaultServerCellComponentProps, DocumentViewServerProps, GlobalSlug } from "payload";
import { formatAdminURL } from "payload/shared";
import { dateFormat, statusLabel } from "./version-history";

export const USER_ACTIVITY_PATH = "/activite";

const MAX_ROWS = 200;

type Version = { id: number | string; parent?: number | string; updatedAt: string; version: Record<string, unknown> };
type Row = { key: string; title: string; type: string; path: `/${string}`; updatedAt: string; status: string };

export function UserVersionsLink({ payload, rowData }: DefaultServerCellComponentProps) {
  // Payload prépare aussi cette cellule sans ligne, pour les réglages de colonnes.
  if (!rowData?.id) return null;
  const href = formatAdminURL({
    adminRoute: payload.config.routes.admin,
    path: `/collections/users/${rowData.id}${USER_ACTIVITY_PATH}`,
  });
  return (
    <Link href={href} prefetch={false}>
      Voir les versions
    </Link>
  );
}

// Les versions gardent le nom de leur auteur : la recherche se fait donc sur le nom du compte.
export async function UserActivity({ initPageResult }: DocumentViewServerProps) {
  const { collectionConfig, docID, req } = initPageResult;
  const { payload, user } = req;
  if (user?.role !== "admin" || !docID) notFound();

  const member = await payload.findByID({ collection: "users", id: docID, depth: 0, overrideAccess: false, req, user });
  const options = {
    depth: 0,
    limit: MAX_ROWS,
    overrideAccess: false,
    req,
    sort: "-updatedAt",
    user,
    where: { "version.updatedBy": { equals: member.name } },
  } as const;

  const collections = payload.config.collections.filter((collection) => collection.versions);
  const globals = payload.config.globals.filter((global) => global.versions);

  const [collectionResults, globalResults] = await Promise.all([
    Promise.all(
      collections.map(async (collection) => {
        const { docs, totalDocs } = await payload.findVersions({ ...options, collection: collection.slug as CollectionSlug });
        const rows = (docs as unknown as Version[]).map(({ id, parent, updatedAt, version }): Row => ({
          key: `${collection.slug}-${id}`,
          title: String(version[collection.admin.useAsTitle ?? "id"] ?? parent),
          type: String(collection.labels.singular),
          path: `/collections/${collection.slug}/${parent}/versions/${id}`,
          updatedAt,
          status: statusLabel(version._status as string | null | undefined),
        }));
        return { rows, totalDocs };
      }),
    ),
    Promise.all(
      globals.map(async (global) => {
        const { docs, totalDocs } = await payload.findGlobalVersions({ ...options, slug: global.slug as GlobalSlug });
        const rows = (docs as unknown as Version[]).map(({ id, updatedAt, version }): Row => ({
          key: `${global.slug}-${id}`,
          title: String(global.label),
          type: "Page",
          path: `/globals/${global.slug}/versions/${id}`,
          updatedAt,
          status: statusLabel(version._status as string | null | undefined),
        }));
        return { rows, totalDocs };
      }),
    ),
  ]);

  const results = [...collectionResults, ...globalResults];
  const total = results.reduce((sum, result) => sum + result.totalDocs, 0);
  const rows = results
    .flatMap((result) => result.rows)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, MAX_ROWS);
  const adminRoute = payload.config.routes.admin;

  return (
    <>
      <SetDocumentStepNav
        collectionSlug={collectionConfig?.slug}
        id={docID}
        pluralLabel={String(collectionConfig?.labels.plural)}
        useAsTitle={collectionConfig?.admin.useAsTitle}
        view="Versions"
      />
      <main className="versions">
        <Gutter className="versions__wrap">
          <p>
            {total === 0
              ? `Aucune version enregistrée pour ${member.name}.`
              : total > rows.length
                ? `${rows.length} dernières versions sur ${total} pour ${member.name}.`
                : `${total} version${total > 1 ? "s" : ""} pour ${member.name}.`}
          </p>
          {rows.length > 0 && (
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Contenu</th>
                    <th>Type</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.key}>
                      <td>
                        <Link href={formatAdminURL({ adminRoute, path: row.path })} prefetch={false}>
                          {dateFormat.format(new Date(row.updatedAt))}
                        </Link>
                      </td>
                      <td>{row.title}</td>
                      <td>{row.type}</td>
                      <td>{row.status}</td>
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
