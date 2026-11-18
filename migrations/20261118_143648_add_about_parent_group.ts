import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page" ADD COLUMN "parent_group_description" varchar;
  ALTER TABLE "about_page" ADD COLUMN "parent_group_cta" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_parent_group_description" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_parent_group_cta" varchar;
  UPDATE "about_page" SET
    "parent_group_description" = 'Depuis 2021, Novadis fait partie du Groupe Sucheme, qui réunit 10 sociétés expertes en sûreté et sécurité, en accueil et services aux occupants, ainsi qu''en conseil et formation.',
    "parent_group_cta" = 'Découvrir le groupe';
  UPDATE "_about_page_v" SET
    "version_parent_group_description" = 'Depuis 2021, Novadis fait partie du Groupe Sucheme, qui réunit 10 sociétés expertes en sûreté et sécurité, en accueil et services aux occupants, ainsi qu''en conseil et formation.',
    "version_parent_group_cta" = 'Découvrir le groupe';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page" DROP COLUMN "parent_group_description";
  ALTER TABLE "about_page" DROP COLUMN "parent_group_cta";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_parent_group_description";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_parent_group_cta";`)
}
