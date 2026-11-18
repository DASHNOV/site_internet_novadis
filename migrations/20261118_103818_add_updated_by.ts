import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "solutions" ADD COLUMN "updated_by" varchar;
  ALTER TABLE "_solutions_v" ADD COLUMN "version_updated_by" varchar;
  ALTER TABLE "sectors" ADD COLUMN "updated_by" varchar;
  ALTER TABLE "_sectors_v" ADD COLUMN "version_updated_by" varchar;
  ALTER TABLE "references" ADD COLUMN "updated_by" varchar;
  ALTER TABLE "_references_v" ADD COLUMN "version_updated_by" varchar;
  ALTER TABLE "challenges" ADD COLUMN "updated_by" varchar;
  ALTER TABLE "_challenges_v" ADD COLUMN "version_updated_by" varchar;
  ALTER TABLE "home" ADD COLUMN "updated_by" varchar;
  ALTER TABLE "_home_v" ADD COLUMN "version_updated_by" varchar;
  ALTER TABLE "solutions_page" ADD COLUMN "updated_by" varchar;
  ALTER TABLE "_solutions_page_v" ADD COLUMN "version_updated_by" varchar;
  ALTER TABLE "sectors_page" ADD COLUMN "updated_by" varchar;
  ALTER TABLE "_sectors_page_v" ADD COLUMN "version_updated_by" varchar;
  ALTER TABLE "services_page" ADD COLUMN "updated_by" varchar;
  ALTER TABLE "_services_page_v" ADD COLUMN "version_updated_by" varchar;
  ALTER TABLE "references_page" ADD COLUMN "updated_by" varchar;
  ALTER TABLE "_references_page_v" ADD COLUMN "version_updated_by" varchar;
  ALTER TABLE "about_page" ADD COLUMN "updated_by" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_updated_by" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "updated_by" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN "version_updated_by" varchar;
  ALTER TABLE "common" ADD COLUMN "updated_by" varchar;
  ALTER TABLE "_common_v" ADD COLUMN "version_updated_by" varchar;
  ALTER TABLE "demos" ADD COLUMN "updated_by" varchar;
  ALTER TABLE "_demos_v" ADD COLUMN "version_updated_by" varchar;
  ALTER TABLE "media" DROP COLUMN "_objectkey";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "_objectkey" varchar;
  ALTER TABLE "solutions" DROP COLUMN "updated_by";
  ALTER TABLE "_solutions_v" DROP COLUMN "version_updated_by";
  ALTER TABLE "sectors" DROP COLUMN "updated_by";
  ALTER TABLE "_sectors_v" DROP COLUMN "version_updated_by";
  ALTER TABLE "references" DROP COLUMN "updated_by";
  ALTER TABLE "_references_v" DROP COLUMN "version_updated_by";
  ALTER TABLE "challenges" DROP COLUMN "updated_by";
  ALTER TABLE "_challenges_v" DROP COLUMN "version_updated_by";
  ALTER TABLE "home" DROP COLUMN "updated_by";
  ALTER TABLE "_home_v" DROP COLUMN "version_updated_by";
  ALTER TABLE "solutions_page" DROP COLUMN "updated_by";
  ALTER TABLE "_solutions_page_v" DROP COLUMN "version_updated_by";
  ALTER TABLE "sectors_page" DROP COLUMN "updated_by";
  ALTER TABLE "_sectors_page_v" DROP COLUMN "version_updated_by";
  ALTER TABLE "services_page" DROP COLUMN "updated_by";
  ALTER TABLE "_services_page_v" DROP COLUMN "version_updated_by";
  ALTER TABLE "references_page" DROP COLUMN "updated_by";
  ALTER TABLE "_references_page_v" DROP COLUMN "version_updated_by";
  ALTER TABLE "about_page" DROP COLUMN "updated_by";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_updated_by";
  ALTER TABLE "contact_page" DROP COLUMN "updated_by";
  ALTER TABLE "_contact_page_v" DROP COLUMN "version_updated_by";
  ALTER TABLE "common" DROP COLUMN "updated_by";
  ALTER TABLE "_common_v" DROP COLUMN "version_updated_by";
  ALTER TABLE "demos" DROP COLUMN "updated_by";
  ALTER TABLE "_demos_v" DROP COLUMN "version_updated_by";`)
}
