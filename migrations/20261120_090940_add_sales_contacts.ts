import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sales_contacts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__sales_contacts_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "sales_contacts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_by" varchar,
  	"visible" boolean DEFAULT false,
  	"order" numeric,
  	"name" varchar,
  	"role" varchar,
  	"photo_id" integer,
  	"areas" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"linkedin" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_sales_contacts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_sales_contacts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_updated_by" varchar,
  	"version_visible" boolean DEFAULT false,
  	"version_order" numeric,
  	"version_name" varchar,
  	"version_role" varchar,
  	"version_photo_id" integer,
  	"version_areas" varchar,
  	"version_email" varchar,
  	"version_phone" varchar,
  	"version_linkedin" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__sales_contacts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "sales_contacts_id" integer;
  ALTER TABLE "sales_contacts" ADD CONSTRAINT "sales_contacts_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sales_contacts_v" ADD CONSTRAINT "_sales_contacts_v_parent_id_sales_contacts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sales_contacts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sales_contacts_v" ADD CONSTRAINT "_sales_contacts_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "sales_contacts_photo_idx" ON "sales_contacts" USING btree ("photo_id");
  CREATE INDEX "sales_contacts_updated_at_idx" ON "sales_contacts" USING btree ("updated_at");
  CREATE INDEX "sales_contacts_created_at_idx" ON "sales_contacts" USING btree ("created_at");
  CREATE INDEX "sales_contacts__status_idx" ON "sales_contacts" USING btree ("_status");
  CREATE INDEX "_sales_contacts_v_parent_idx" ON "_sales_contacts_v" USING btree ("parent_id");
  CREATE INDEX "_sales_contacts_v_version_version_photo_idx" ON "_sales_contacts_v" USING btree ("version_photo_id");
  CREATE INDEX "_sales_contacts_v_version_version_updated_at_idx" ON "_sales_contacts_v" USING btree ("version_updated_at");
  CREATE INDEX "_sales_contacts_v_version_version_created_at_idx" ON "_sales_contacts_v" USING btree ("version_created_at");
  CREATE INDEX "_sales_contacts_v_version_version__status_idx" ON "_sales_contacts_v" USING btree ("version__status");
  CREATE INDEX "_sales_contacts_v_created_at_idx" ON "_sales_contacts_v" USING btree ("created_at");
  CREATE INDEX "_sales_contacts_v_updated_at_idx" ON "_sales_contacts_v" USING btree ("updated_at");
  CREATE INDEX "_sales_contacts_v_latest_idx" ON "_sales_contacts_v" USING btree ("latest");
  CREATE INDEX "_sales_contacts_v_autosave_idx" ON "_sales_contacts_v" USING btree ("autosave");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sales_contacts_fk" FOREIGN KEY ("sales_contacts_id") REFERENCES "public"."sales_contacts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_sales_contacts_id_idx" ON "payload_locked_documents_rels" USING btree ("sales_contacts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sales_contacts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sales_contacts_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "sales_contacts" CASCADE;
  DROP TABLE "_sales_contacts_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sales_contacts_fk";
  
  DROP INDEX "payload_locked_documents_rels_sales_contacts_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "sales_contacts_id";
  DROP TYPE "public"."enum_sales_contacts_status";
  DROP TYPE "public"."enum__sales_contacts_v_version_status";`)
}
