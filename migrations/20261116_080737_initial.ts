import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_solutions_icon" AS ENUM('Award', 'Blocks', 'Building2', 'Cpu', 'Factory', 'FingerprintPattern', 'Gauge', 'KeyRound', 'Mail', 'MapPin', 'MonitorPlay', 'Network', 'Phone', 'Radar', 'RefreshCw', 'ScanSearch', 'ShieldAlert', 'ShieldCheck', 'Sparkles', 'Truck', 'Users', 'Video', 'Workflow');
  CREATE TYPE "public"."enum_solutions_media_kind" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_solutions_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__solutions_v_version_icon" AS ENUM('Award', 'Blocks', 'Building2', 'Cpu', 'Factory', 'FingerprintPattern', 'Gauge', 'KeyRound', 'Mail', 'MapPin', 'MonitorPlay', 'Network', 'Phone', 'Radar', 'RefreshCw', 'ScanSearch', 'ShieldAlert', 'ShieldCheck', 'Sparkles', 'Truck', 'Users', 'Video', 'Workflow');
  CREATE TYPE "public"."enum__solutions_v_version_media_kind" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__solutions_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_sectors_icon" AS ENUM('Award', 'Blocks', 'Building2', 'Cpu', 'Factory', 'FingerprintPattern', 'Gauge', 'KeyRound', 'Mail', 'MapPin', 'MonitorPlay', 'Network', 'Phone', 'Radar', 'RefreshCw', 'ScanSearch', 'ShieldAlert', 'ShieldCheck', 'Sparkles', 'Truck', 'Users', 'Video', 'Workflow');
  CREATE TYPE "public"."enum_sectors_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__sectors_v_version_icon" AS ENUM('Award', 'Blocks', 'Building2', 'Cpu', 'Factory', 'FingerprintPattern', 'Gauge', 'KeyRound', 'Mail', 'MapPin', 'MonitorPlay', 'Network', 'Phone', 'Radar', 'RefreshCw', 'ScanSearch', 'ShieldAlert', 'ShieldCheck', 'Sparkles', 'Truck', 'Users', 'Video', 'Workflow');
  CREATE TYPE "public"."enum__sectors_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_references_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__references_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_challenges_icon" AS ENUM('Award', 'Blocks', 'Building2', 'Cpu', 'Factory', 'FingerprintPattern', 'Gauge', 'KeyRound', 'Mail', 'MapPin', 'MonitorPlay', 'Network', 'Phone', 'Radar', 'RefreshCw', 'ScanSearch', 'ShieldAlert', 'ShieldCheck', 'Sparkles', 'Truck', 'Users', 'Video', 'Workflow');
  CREATE TYPE "public"."enum_challenges_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__challenges_v_version_icon" AS ENUM('Award', 'Blocks', 'Building2', 'Cpu', 'Factory', 'FingerprintPattern', 'Gauge', 'KeyRound', 'Mail', 'MapPin', 'MonitorPlay', 'Network', 'Phone', 'Radar', 'RefreshCw', 'ScanSearch', 'ShieldAlert', 'ShieldCheck', 'Sparkles', 'Truck', 'Users', 'Video', 'Workflow');
  CREATE TYPE "public"."enum__challenges_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('redacteur', 'publieur', 'admin');
  CREATE TYPE "public"."enum_home_architecture_points_icon" AS ENUM('Award', 'Blocks', 'Building2', 'Cpu', 'Factory', 'FingerprintPattern', 'Gauge', 'KeyRound', 'Mail', 'MapPin', 'MonitorPlay', 'Network', 'Phone', 'Radar', 'RefreshCw', 'ScanSearch', 'ShieldAlert', 'ShieldCheck', 'Sparkles', 'Truck', 'Users', 'Video', 'Workflow');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_architecture_points_icon" AS ENUM('Award', 'Blocks', 'Building2', 'Cpu', 'Factory', 'FingerprintPattern', 'Gauge', 'KeyRound', 'Mail', 'MapPin', 'MonitorPlay', 'Network', 'Phone', 'Radar', 'RefreshCw', 'ScanSearch', 'ShieldAlert', 'ShieldCheck', 'Sparkles', 'Truck', 'Users', 'Video', 'Workflow');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_solutions_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__solutions_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_sectors_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__sectors_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_references_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__references_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_about_page_human_highlights_icon" AS ENUM('Award', 'Blocks', 'Building2', 'Cpu', 'Factory', 'FingerprintPattern', 'Gauge', 'KeyRound', 'Mail', 'MapPin', 'MonitorPlay', 'Network', 'Phone', 'Radar', 'RefreshCw', 'ScanSearch', 'ShieldAlert', 'ShieldCheck', 'Sparkles', 'Truck', 'Users', 'Video', 'Workflow');
  CREATE TYPE "public"."enum_about_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_version_human_highlights_icon" AS ENUM('Award', 'Blocks', 'Building2', 'Cpu', 'Factory', 'FingerprintPattern', 'Gauge', 'KeyRound', 'Mail', 'MapPin', 'MonitorPlay', 'Network', 'Phone', 'Radar', 'RefreshCw', 'ScanSearch', 'ShieldAlert', 'ShieldCheck', 'Sparkles', 'Truck', 'Users', 'Video', 'Workflow');
  CREATE TYPE "public"."enum__about_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_contact_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_common_norms_partners_kind" AS ENUM('norm', 'association');
  CREATE TYPE "public"."enum_common_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__common_v_version_norms_partners_kind" AS ENUM('norm', 'association');
  CREATE TYPE "public"."enum__common_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_demos_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__demos_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "solutions_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "solutions_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "solutions_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "solutions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"order" numeric,
  	"title" varchar,
  	"short_title" varchar,
  	"tag_label" varchar,
  	"product" varchar,
  	"icon" "enum_solutions_icon",
  	"summary" varchar,
  	"intro" varchar,
  	"problem" varchar,
  	"solution" varchar,
  	"media_kind" "enum_solutions_media_kind" DEFAULT 'image',
  	"media_image_id" integer,
  	"media_video" varchar,
  	"media_poster" varchar,
  	"media_alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_solutions_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_solutions_v_version_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v_version_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v_version_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_order" numeric,
  	"version_title" varchar,
  	"version_short_title" varchar,
  	"version_tag_label" varchar,
  	"version_product" varchar,
  	"version_icon" "enum__solutions_v_version_icon",
  	"version_summary" varchar,
  	"version_intro" varchar,
  	"version_problem" varchar,
  	"version_solution" varchar,
  	"version_media_kind" "enum__solutions_v_version_media_kind" DEFAULT 'image',
  	"version_media_image_id" integer,
  	"version_media_video" varchar,
  	"version_media_poster" varchar,
  	"version_media_alt" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__solutions_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "sectors_challenges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "sectors_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "sectors_examples" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "sectors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"order" numeric,
  	"title" varchar,
  	"icon" "enum_sectors_icon",
  	"summary" varchar,
  	"image_id" integer,
  	"tagline" varchar,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_sectors_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "sectors_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"solutions_id" integer
  );
  
  CREATE TABLE "_sectors_v_version_challenges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sectors_v_version_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sectors_v_version_examples" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sectors_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_order" numeric,
  	"version_title" varchar,
  	"version_icon" "enum__sectors_v_version_icon",
  	"version_summary" varchar,
  	"version_image_id" integer,
  	"version_tagline" varchar,
  	"version_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__sectors_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_sectors_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"solutions_id" integer
  );
  
  CREATE TABLE "references" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"name" varchar,
  	"sector" varchar,
  	"scope" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_references_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "references_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"solutions_id" integer
  );
  
  CREATE TABLE "_references_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_order" numeric,
  	"version_name" varchar,
  	"version_sector" varchar,
  	"version_scope" varchar,
  	"version_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__references_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_references_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"solutions_id" integer
  );
  
  CREATE TABLE "challenges_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "challenges" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"order" numeric,
  	"title" varchar,
  	"icon" "enum_challenges_icon",
  	"description" varchar,
  	"href" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_challenges_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_challenges_v_version_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_challenges_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_order" numeric,
  	"version_title" varchar,
  	"version_icon" "enum__challenges_v_version_icon",
  	"version_description" varchar,
  	"version_href" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__challenges_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'redacteur' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"solutions_id" integer,
  	"sectors_id" integer,
  	"references_id" integer,
  	"challenges_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_hero_technologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "home_architecture_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" "enum_home_architecture_points_icon"
  );
  
  CREATE TABLE "home_method_pillars_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "home_method_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "home_compliance_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"link_label" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "home_about_differentiators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title_lead" varchar,
  	"hero_title_accent" varchar,
  	"hero_description" varchar,
  	"hero_primary_cta" varchar,
  	"hero_secondary_cta" varchar,
  	"hero_technologies_label" varchar,
  	"proof_title" varchar,
  	"proof_description" varchar,
  	"proof_cta" varchar,
  	"architecture_title_lead" varchar,
  	"architecture_title_accent" varchar,
  	"architecture_description" varchar,
  	"architecture_diagram_caption" varchar,
  	"architecture_diagram_label" varchar,
  	"challenges_title_lead" varchar,
  	"challenges_title_accent" varchar,
  	"challenges_description" varchar,
  	"solutions_title_lead" varchar,
  	"solutions_title_accent" varchar,
  	"solutions_description" varchar,
  	"solutions_cta" varchar,
  	"sectors_title" varchar,
  	"method_title_lead" varchar,
  	"method_title_accent" varchar,
  	"method_description" varchar,
  	"method_cta" varchar,
  	"compliance_title" varchar,
  	"compliance_description" varchar,
  	"about_media_caption" varchar,
  	"about_title_lead" varchar,
  	"about_title_accent" varchar,
  	"about_description" varchar,
  	"about_quote" varchar,
  	"about_quote_author" varchar,
  	"about_cta" varchar,
  	"_status" "enum_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_home_v_version_hero_technologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_architecture_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" "enum__home_v_version_architecture_points_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_method_pillars_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_method_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_compliance_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"link_label" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_about_differentiators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_title_lead" varchar,
  	"version_hero_title_accent" varchar,
  	"version_hero_description" varchar,
  	"version_hero_primary_cta" varchar,
  	"version_hero_secondary_cta" varchar,
  	"version_hero_technologies_label" varchar,
  	"version_proof_title" varchar,
  	"version_proof_description" varchar,
  	"version_proof_cta" varchar,
  	"version_architecture_title_lead" varchar,
  	"version_architecture_title_accent" varchar,
  	"version_architecture_description" varchar,
  	"version_architecture_diagram_caption" varchar,
  	"version_architecture_diagram_label" varchar,
  	"version_challenges_title_lead" varchar,
  	"version_challenges_title_accent" varchar,
  	"version_challenges_description" varchar,
  	"version_solutions_title_lead" varchar,
  	"version_solutions_title_accent" varchar,
  	"version_solutions_description" varchar,
  	"version_solutions_cta" varchar,
  	"version_sectors_title" varchar,
  	"version_method_title_lead" varchar,
  	"version_method_title_accent" varchar,
  	"version_method_description" varchar,
  	"version_method_cta" varchar,
  	"version_compliance_title" varchar,
  	"version_compliance_description" varchar,
  	"version_about_media_caption" varchar,
  	"version_about_title_lead" varchar,
  	"version_about_title_accent" varchar,
  	"version_about_description" varchar,
  	"version_about_quote" varchar,
  	"version_about_quote_author" varchar,
  	"version_about_cta" varchar,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "solutions_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_description" varchar,
  	"detail_cta" varchar,
  	"detail_back_link" varchar,
  	"detail_context_title" varchar,
  	"detail_capabilities_title" varchar,
  	"detail_answer_title" varchar,
  	"detail_benefits_title" varchar,
  	"detail_outcomes_title" varchar,
  	"_status" "enum_solutions_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_solutions_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_title" varchar,
  	"version_hero_description" varchar,
  	"version_detail_cta" varchar,
  	"version_detail_back_link" varchar,
  	"version_detail_context_title" varchar,
  	"version_detail_capabilities_title" varchar,
  	"version_detail_answer_title" varchar,
  	"version_detail_benefits_title" varchar,
  	"version_detail_outcomes_title" varchar,
  	"version__status" "enum__solutions_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "sectors_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_description" varchar,
  	"hero_media_caption" varchar,
  	"nav_label" varchar,
  	"challenges_title" varchar,
  	"outcomes_title" varchar,
  	"_status" "enum_sectors_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_sectors_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_title" varchar,
  	"version_hero_description" varchar,
  	"version_hero_media_caption" varchar,
  	"version_nav_label" varchar,
  	"version_challenges_title" varchar,
  	"version_outcomes_title" varchar,
  	"version__status" "enum__sectors_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "services_page_method_commitments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_description" varchar,
  	"hero_media_alt" varchar,
  	"hero_media_caption" varchar,
  	"deliverables_suffix" varchar,
  	"method_title_lead" varchar,
  	"method_title_accent" varchar,
  	"method_commitments_title" varchar,
  	"_status" "enum_services_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_services_page_v_version_method_commitments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_title" varchar,
  	"version_hero_description" varchar,
  	"version_hero_media_alt" varchar,
  	"version_hero_media_caption" varchar,
  	"version_deliverables_suffix" varchar,
  	"version_method_title_lead" varchar,
  	"version_method_title_accent" varchar,
  	"version_method_commitments_title" varchar,
  	"version__status" "enum__services_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "references_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_description" varchar,
  	"disclaimer" varchar,
  	"featured_title" varchar,
  	"sectors_title" varchar,
  	"deployed_solutions_title" varchar,
  	"footnote" varchar,
  	"_status" "enum_references_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_references_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_title" varchar,
  	"version_hero_description" varchar,
  	"version_disclaimer" varchar,
  	"version_featured_title" varchar,
  	"version_sectors_title" varchar,
  	"version_deployed_solutions_title" varchar,
  	"version_footnote" varchar,
  	"version__status" "enum__references_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "about_page_human_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" "enum_about_page_human_highlights_icon"
  );
  
  CREATE TABLE "about_page_human_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "about_page_vision_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_description" varchar,
  	"hero_media_alt" varchar,
  	"hero_media_caption" varchar,
  	"human_title" varchar,
  	"human_description" varchar,
  	"human_approach_title" varchar,
  	"vision_title" varchar,
  	"vision_description" varchar,
  	"spectrum_title" varchar,
  	"spectrum_description" varchar,
  	"spectrum_schema_alt" varchar,
  	"members_title" varchar,
  	"members_description" varchar,
  	"_status" "enum_about_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_about_page_v_version_human_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" "enum__about_page_v_version_human_highlights_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_human_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_vision_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_title" varchar,
  	"version_hero_description" varchar,
  	"version_hero_media_alt" varchar,
  	"version_hero_media_caption" varchar,
  	"version_human_title" varchar,
  	"version_human_description" varchar,
  	"version_human_approach_title" varchar,
  	"version_vision_title" varchar,
  	"version_vision_description" varchar,
  	"version_spectrum_title" varchar,
  	"version_spectrum_description" varchar,
  	"version_spectrum_schema_alt" varchar,
  	"version_members_title" varchar,
  	"version_members_description" varchar,
  	"version__status" "enum__about_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "contact_page_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_description" varchar,
  	"hero_media_alt" varchar,
  	"hero_media_caption" varchar,
  	"channels_email_label" varchar,
  	"channels_phone_label" varchar,
  	"channels_address_label" varchar,
  	"topics_title" varchar,
  	"meeting_note" varchar,
  	"form_title_lead" varchar,
  	"form_title_accent" varchar,
  	"_status" "enum_contact_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contact_page_v_version_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contact_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_title" varchar,
  	"version_hero_description" varchar,
  	"version_hero_media_alt" varchar,
  	"version_hero_media_caption" varchar,
  	"version_channels_email_label" varchar,
  	"version_channels_phone_label" varchar,
  	"version_channels_address_label" varchar,
  	"version_topics_title" varchar,
  	"version_meeting_note" varchar,
  	"version_form_title_lead" varchar,
  	"version_form_title_accent" varchar,
  	"version__status" "enum__contact_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "common_navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "common_contact_address_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "common_norms_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"kind" "enum_common_norms_partners_kind"
  );
  
  CREATE TABLE "common_norms_trust_signals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "common_metrics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "common_process_steps_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "common_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "common" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_tagline" varchar,
  	"header_contact_cta" varchar,
  	"header_menu_label" varchar,
  	"navigation_all_solutions_label" varchar,
  	"navigation_all_sectors_label" varchar,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"contact_address_inline" varchar,
  	"contact_maps_url" varchar,
  	"contact_regions" varchar,
  	"footer_description" varchar,
  	"footer_hashtag" varchar,
  	"footer_navigation_title" varchar,
  	"footer_contact_title" varchar,
  	"footer_compliance_title" varchar,
  	"footer_rights" varchar,
  	"footer_legal_label" varchar,
  	"footer_privacy_label" varchar,
  	"cta_banner_title_lead" varchar,
  	"cta_banner_title_accent" varchar,
  	"cta_banner_description" varchar,
  	"cta_banner_cta" varchar,
  	"cta_banner_console_title" varchar,
  	"cta_banner_email_label" varchar,
  	"cta_banner_phone_label" varchar,
  	"cta_banner_scope_label" varchar,
  	"cta_banner_scope" varchar,
  	"norms_title" varchar,
  	"norms_description" varchar,
  	"norms_norms_title" varchar,
  	"norms_associations_title" varchar,
  	"norms_member_prefix" varchar,
  	"labels_learn_more" varchar,
  	"_status" "enum_common_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_common_v_version_navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_common_v_version_contact_address_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_common_v_version_norms_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"kind" "enum__common_v_version_norms_partners_kind",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_common_v_version_norms_trust_signals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_common_v_version_metrics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_common_v_version_process_steps_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_common_v_version_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"step" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_common_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_header_tagline" varchar,
  	"version_header_contact_cta" varchar,
  	"version_header_menu_label" varchar,
  	"version_navigation_all_solutions_label" varchar,
  	"version_navigation_all_sectors_label" varchar,
  	"version_contact_email" varchar,
  	"version_contact_phone" varchar,
  	"version_contact_address_inline" varchar,
  	"version_contact_maps_url" varchar,
  	"version_contact_regions" varchar,
  	"version_footer_description" varchar,
  	"version_footer_hashtag" varchar,
  	"version_footer_navigation_title" varchar,
  	"version_footer_contact_title" varchar,
  	"version_footer_compliance_title" varchar,
  	"version_footer_rights" varchar,
  	"version_footer_legal_label" varchar,
  	"version_footer_privacy_label" varchar,
  	"version_cta_banner_title_lead" varchar,
  	"version_cta_banner_title_accent" varchar,
  	"version_cta_banner_description" varchar,
  	"version_cta_banner_cta" varchar,
  	"version_cta_banner_console_title" varchar,
  	"version_cta_banner_email_label" varchar,
  	"version_cta_banner_phone_label" varchar,
  	"version_cta_banner_scope_label" varchar,
  	"version_cta_banner_scope" varchar,
  	"version_norms_title" varchar,
  	"version_norms_description" varchar,
  	"version_norms_norms_title" varchar,
  	"version_norms_associations_title" varchar,
  	"version_norms_member_prefix" varchar,
  	"version_labels_learn_more" varchar,
  	"version__status" "enum__common_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "demos_badge_door_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "demos_intrusion_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "demos_axis_explode_labels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "demos_axis_explode_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "demos_solutions_hero_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "demos_architecture_layers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "demos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_film_status" varchar,
  	"supervision_room_caption" varchar,
  	"supervision_room_poster_alt" varchar,
  	"supervision_room_drag_hint" varchar,
  	"supervision_room_console_title" varchar,
  	"supervision_room_systems_suffix" varchar,
  	"supervision_room_show_label" varchar,
  	"supervision_room_shown_label" varchar,
  	"badge_door_eyebrow" varchar,
  	"badge_door_title" varchar,
  	"badge_door_hud_reader" varchar,
  	"badge_door_hud_reading" varchar,
  	"badge_door_hud_badge_id" varchar,
  	"badge_door_hud_granted" varchar,
  	"badge_door_hud_decision" varchar,
  	"badge_door_event_title" varchar,
  	"badge_door_event_detail" varchar,
  	"badge_door_event_logged" varchar,
  	"badge_door_scroll_hint" varchar,
  	"intrusion_eyebrow" varchar,
  	"intrusion_title" varchar,
  	"intrusion_hud_detector" varchar,
  	"intrusion_hud_armed" varchar,
  	"intrusion_hud_watching" varchar,
  	"intrusion_hud_detected" varchar,
  	"intrusion_hud_panel" varchar,
  	"intrusion_hud_intruder" varchar,
  	"intrusion_event_title" varchar,
  	"intrusion_event_detail" varchar,
  	"intrusion_event_logged" varchar,
  	"intrusion_scroll_hint" varchar,
  	"axis_explode_eyebrow" varchar,
  	"axis_explode_title" varchar,
  	"axis_explode_description" varchar,
  	"axis_explode_scroll_hint" varchar,
  	"solutions_hero_title" varchar,
  	"solutions_hero_ar_label" varchar,
  	"solutions_hero_hint" varchar,
  	"alarm_journey_eyebrow" varchar,
  	"alarm_journey_title" varchar,
  	"alarm_journey_detection" varchar,
  	"_status" "enum_demos_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_demos_v_version_badge_door_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_demos_v_version_intrusion_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_demos_v_version_axis_explode_labels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_demos_v_version_axis_explode_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_demos_v_version_solutions_hero_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_demos_v_version_architecture_layers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_demos_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_film_status" varchar,
  	"version_supervision_room_caption" varchar,
  	"version_supervision_room_poster_alt" varchar,
  	"version_supervision_room_drag_hint" varchar,
  	"version_supervision_room_console_title" varchar,
  	"version_supervision_room_systems_suffix" varchar,
  	"version_supervision_room_show_label" varchar,
  	"version_supervision_room_shown_label" varchar,
  	"version_badge_door_eyebrow" varchar,
  	"version_badge_door_title" varchar,
  	"version_badge_door_hud_reader" varchar,
  	"version_badge_door_hud_reading" varchar,
  	"version_badge_door_hud_badge_id" varchar,
  	"version_badge_door_hud_granted" varchar,
  	"version_badge_door_hud_decision" varchar,
  	"version_badge_door_event_title" varchar,
  	"version_badge_door_event_detail" varchar,
  	"version_badge_door_event_logged" varchar,
  	"version_badge_door_scroll_hint" varchar,
  	"version_intrusion_eyebrow" varchar,
  	"version_intrusion_title" varchar,
  	"version_intrusion_hud_detector" varchar,
  	"version_intrusion_hud_armed" varchar,
  	"version_intrusion_hud_watching" varchar,
  	"version_intrusion_hud_detected" varchar,
  	"version_intrusion_hud_panel" varchar,
  	"version_intrusion_hud_intruder" varchar,
  	"version_intrusion_event_title" varchar,
  	"version_intrusion_event_detail" varchar,
  	"version_intrusion_event_logged" varchar,
  	"version_intrusion_scroll_hint" varchar,
  	"version_axis_explode_eyebrow" varchar,
  	"version_axis_explode_title" varchar,
  	"version_axis_explode_description" varchar,
  	"version_axis_explode_scroll_hint" varchar,
  	"version_solutions_hero_title" varchar,
  	"version_solutions_hero_ar_label" varchar,
  	"version_solutions_hero_hint" varchar,
  	"version_alarm_journey_eyebrow" varchar,
  	"version_alarm_journey_title" varchar,
  	"version_alarm_journey_detection" varchar,
  	"version__status" "enum__demos_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "solutions_capabilities" ADD CONSTRAINT "solutions_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_benefits" ADD CONSTRAINT "solutions_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_outcomes" ADD CONSTRAINT "solutions_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions" ADD CONSTRAINT "solutions_media_image_id_media_id_fk" FOREIGN KEY ("media_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_v_version_capabilities" ADD CONSTRAINT "_solutions_v_version_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_version_benefits" ADD CONSTRAINT "_solutions_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_version_outcomes" ADD CONSTRAINT "_solutions_v_version_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v" ADD CONSTRAINT "_solutions_v_parent_id_solutions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."solutions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_v" ADD CONSTRAINT "_solutions_v_version_media_image_id_media_id_fk" FOREIGN KEY ("version_media_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sectors_challenges" ADD CONSTRAINT "sectors_challenges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sectors_outcomes" ADD CONSTRAINT "sectors_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sectors_examples" ADD CONSTRAINT "sectors_examples_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sectors" ADD CONSTRAINT "sectors_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sectors_rels" ADD CONSTRAINT "sectors_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sectors_rels" ADD CONSTRAINT "sectors_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sectors_v_version_challenges" ADD CONSTRAINT "_sectors_v_version_challenges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sectors_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sectors_v_version_outcomes" ADD CONSTRAINT "_sectors_v_version_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sectors_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sectors_v_version_examples" ADD CONSTRAINT "_sectors_v_version_examples_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sectors_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sectors_v" ADD CONSTRAINT "_sectors_v_parent_id_sectors_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sectors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sectors_v" ADD CONSTRAINT "_sectors_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sectors_v_rels" ADD CONSTRAINT "_sectors_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_sectors_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sectors_v_rels" ADD CONSTRAINT "_sectors_v_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "references" ADD CONSTRAINT "references_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "references_rels" ADD CONSTRAINT "references_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."references"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "references_rels" ADD CONSTRAINT "references_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_references_v" ADD CONSTRAINT "_references_v_parent_id_references_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."references"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_references_v" ADD CONSTRAINT "_references_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_references_v_rels" ADD CONSTRAINT "_references_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_references_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_references_v_rels" ADD CONSTRAINT "_references_v_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "challenges_points" ADD CONSTRAINT "challenges_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."challenges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_challenges_v_version_points" ADD CONSTRAINT "_challenges_v_version_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_challenges_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_challenges_v" ADD CONSTRAINT "_challenges_v_parent_id_challenges_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."challenges"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sectors_fk" FOREIGN KEY ("sectors_id") REFERENCES "public"."sectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_references_fk" FOREIGN KEY ("references_id") REFERENCES "public"."references"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_challenges_fk" FOREIGN KEY ("challenges_id") REFERENCES "public"."challenges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_hero_technologies" ADD CONSTRAINT "home_hero_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_architecture_points" ADD CONSTRAINT "home_architecture_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_method_pillars_points" ADD CONSTRAINT "home_method_pillars_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_method_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_method_pillars" ADD CONSTRAINT "home_method_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_compliance_topics" ADD CONSTRAINT "home_compliance_topics_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_compliance_topics" ADD CONSTRAINT "home_compliance_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_about_differentiators" ADD CONSTRAINT "home_about_differentiators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_hero_technologies" ADD CONSTRAINT "_home_v_version_hero_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_architecture_points" ADD CONSTRAINT "_home_v_version_architecture_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_method_pillars_points" ADD CONSTRAINT "_home_v_version_method_pillars_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_method_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_method_pillars" ADD CONSTRAINT "_home_v_version_method_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_compliance_topics" ADD CONSTRAINT "_home_v_version_compliance_topics_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_compliance_topics" ADD CONSTRAINT "_home_v_version_compliance_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_about_differentiators" ADD CONSTRAINT "_home_v_version_about_differentiators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_method_commitments" ADD CONSTRAINT "services_page_method_commitments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_page_v_version_method_commitments" ADD CONSTRAINT "_services_page_v_version_method_commitments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_human_highlights" ADD CONSTRAINT "about_page_human_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_human_approach" ADD CONSTRAINT "about_page_human_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_vision_people" ADD CONSTRAINT "about_page_vision_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_human_highlights" ADD CONSTRAINT "_about_page_v_version_human_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_human_approach" ADD CONSTRAINT "_about_page_v_version_human_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_vision_people" ADD CONSTRAINT "_about_page_v_version_vision_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_topics" ADD CONSTRAINT "contact_page_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_page_v_version_topics" ADD CONSTRAINT "_contact_page_v_version_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "common_navigation_items" ADD CONSTRAINT "common_navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."common"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "common_contact_address_lines" ADD CONSTRAINT "common_contact_address_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."common"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "common_norms_partners" ADD CONSTRAINT "common_norms_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."common"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "common_norms_trust_signals" ADD CONSTRAINT "common_norms_trust_signals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."common"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "common_metrics_items" ADD CONSTRAINT "common_metrics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."common"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "common_process_steps_deliverables" ADD CONSTRAINT "common_process_steps_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."common_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "common_process_steps" ADD CONSTRAINT "common_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."common"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_common_v_version_navigation_items" ADD CONSTRAINT "_common_v_version_navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_common_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_common_v_version_contact_address_lines" ADD CONSTRAINT "_common_v_version_contact_address_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_common_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_common_v_version_norms_partners" ADD CONSTRAINT "_common_v_version_norms_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_common_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_common_v_version_norms_trust_signals" ADD CONSTRAINT "_common_v_version_norms_trust_signals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_common_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_common_v_version_metrics_items" ADD CONSTRAINT "_common_v_version_metrics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_common_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_common_v_version_process_steps_deliverables" ADD CONSTRAINT "_common_v_version_process_steps_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_common_v_version_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_common_v_version_process_steps" ADD CONSTRAINT "_common_v_version_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_common_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "demos_badge_door_steps" ADD CONSTRAINT "demos_badge_door_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."demos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "demos_intrusion_steps" ADD CONSTRAINT "demos_intrusion_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."demos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "demos_axis_explode_labels" ADD CONSTRAINT "demos_axis_explode_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."demos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "demos_axis_explode_steps" ADD CONSTRAINT "demos_axis_explode_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."demos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "demos_solutions_hero_callouts" ADD CONSTRAINT "demos_solutions_hero_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."demos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "demos_architecture_layers" ADD CONSTRAINT "demos_architecture_layers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."demos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_demos_v_version_badge_door_steps" ADD CONSTRAINT "_demos_v_version_badge_door_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_demos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_demos_v_version_intrusion_steps" ADD CONSTRAINT "_demos_v_version_intrusion_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_demos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_demos_v_version_axis_explode_labels" ADD CONSTRAINT "_demos_v_version_axis_explode_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_demos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_demos_v_version_axis_explode_steps" ADD CONSTRAINT "_demos_v_version_axis_explode_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_demos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_demos_v_version_solutions_hero_callouts" ADD CONSTRAINT "_demos_v_version_solutions_hero_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_demos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_demos_v_version_architecture_layers" ADD CONSTRAINT "_demos_v_version_architecture_layers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_demos_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "solutions_capabilities_order_idx" ON "solutions_capabilities" USING btree ("_order");
  CREATE INDEX "solutions_capabilities_parent_id_idx" ON "solutions_capabilities" USING btree ("_parent_id");
  CREATE INDEX "solutions_benefits_order_idx" ON "solutions_benefits" USING btree ("_order");
  CREATE INDEX "solutions_benefits_parent_id_idx" ON "solutions_benefits" USING btree ("_parent_id");
  CREATE INDEX "solutions_outcomes_order_idx" ON "solutions_outcomes" USING btree ("_order");
  CREATE INDEX "solutions_outcomes_parent_id_idx" ON "solutions_outcomes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "solutions_slug_idx" ON "solutions" USING btree ("slug");
  CREATE INDEX "solutions_media_media_image_idx" ON "solutions" USING btree ("media_image_id");
  CREATE INDEX "solutions_updated_at_idx" ON "solutions" USING btree ("updated_at");
  CREATE INDEX "solutions_created_at_idx" ON "solutions" USING btree ("created_at");
  CREATE INDEX "solutions__status_idx" ON "solutions" USING btree ("_status");
  CREATE INDEX "_solutions_v_version_capabilities_order_idx" ON "_solutions_v_version_capabilities" USING btree ("_order");
  CREATE INDEX "_solutions_v_version_capabilities_parent_id_idx" ON "_solutions_v_version_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_version_benefits_order_idx" ON "_solutions_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_solutions_v_version_benefits_parent_id_idx" ON "_solutions_v_version_benefits" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_version_outcomes_order_idx" ON "_solutions_v_version_outcomes" USING btree ("_order");
  CREATE INDEX "_solutions_v_version_outcomes_parent_id_idx" ON "_solutions_v_version_outcomes" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_parent_idx" ON "_solutions_v" USING btree ("parent_id");
  CREATE INDEX "_solutions_v_version_version_slug_idx" ON "_solutions_v" USING btree ("version_slug");
  CREATE INDEX "_solutions_v_version_media_version_media_image_idx" ON "_solutions_v" USING btree ("version_media_image_id");
  CREATE INDEX "_solutions_v_version_version_updated_at_idx" ON "_solutions_v" USING btree ("version_updated_at");
  CREATE INDEX "_solutions_v_version_version_created_at_idx" ON "_solutions_v" USING btree ("version_created_at");
  CREATE INDEX "_solutions_v_version_version__status_idx" ON "_solutions_v" USING btree ("version__status");
  CREATE INDEX "_solutions_v_created_at_idx" ON "_solutions_v" USING btree ("created_at");
  CREATE INDEX "_solutions_v_updated_at_idx" ON "_solutions_v" USING btree ("updated_at");
  CREATE INDEX "_solutions_v_latest_idx" ON "_solutions_v" USING btree ("latest");
  CREATE INDEX "_solutions_v_autosave_idx" ON "_solutions_v" USING btree ("autosave");
  CREATE INDEX "sectors_challenges_order_idx" ON "sectors_challenges" USING btree ("_order");
  CREATE INDEX "sectors_challenges_parent_id_idx" ON "sectors_challenges" USING btree ("_parent_id");
  CREATE INDEX "sectors_outcomes_order_idx" ON "sectors_outcomes" USING btree ("_order");
  CREATE INDEX "sectors_outcomes_parent_id_idx" ON "sectors_outcomes" USING btree ("_parent_id");
  CREATE INDEX "sectors_examples_order_idx" ON "sectors_examples" USING btree ("_order");
  CREATE INDEX "sectors_examples_parent_id_idx" ON "sectors_examples" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sectors_slug_idx" ON "sectors" USING btree ("slug");
  CREATE INDEX "sectors_image_idx" ON "sectors" USING btree ("image_id");
  CREATE INDEX "sectors_updated_at_idx" ON "sectors" USING btree ("updated_at");
  CREATE INDEX "sectors_created_at_idx" ON "sectors" USING btree ("created_at");
  CREATE INDEX "sectors__status_idx" ON "sectors" USING btree ("_status");
  CREATE INDEX "sectors_rels_order_idx" ON "sectors_rels" USING btree ("order");
  CREATE INDEX "sectors_rels_parent_idx" ON "sectors_rels" USING btree ("parent_id");
  CREATE INDEX "sectors_rels_path_idx" ON "sectors_rels" USING btree ("path");
  CREATE INDEX "sectors_rels_solutions_id_idx" ON "sectors_rels" USING btree ("solutions_id");
  CREATE INDEX "_sectors_v_version_challenges_order_idx" ON "_sectors_v_version_challenges" USING btree ("_order");
  CREATE INDEX "_sectors_v_version_challenges_parent_id_idx" ON "_sectors_v_version_challenges" USING btree ("_parent_id");
  CREATE INDEX "_sectors_v_version_outcomes_order_idx" ON "_sectors_v_version_outcomes" USING btree ("_order");
  CREATE INDEX "_sectors_v_version_outcomes_parent_id_idx" ON "_sectors_v_version_outcomes" USING btree ("_parent_id");
  CREATE INDEX "_sectors_v_version_examples_order_idx" ON "_sectors_v_version_examples" USING btree ("_order");
  CREATE INDEX "_sectors_v_version_examples_parent_id_idx" ON "_sectors_v_version_examples" USING btree ("_parent_id");
  CREATE INDEX "_sectors_v_parent_idx" ON "_sectors_v" USING btree ("parent_id");
  CREATE INDEX "_sectors_v_version_version_slug_idx" ON "_sectors_v" USING btree ("version_slug");
  CREATE INDEX "_sectors_v_version_version_image_idx" ON "_sectors_v" USING btree ("version_image_id");
  CREATE INDEX "_sectors_v_version_version_updated_at_idx" ON "_sectors_v" USING btree ("version_updated_at");
  CREATE INDEX "_sectors_v_version_version_created_at_idx" ON "_sectors_v" USING btree ("version_created_at");
  CREATE INDEX "_sectors_v_version_version__status_idx" ON "_sectors_v" USING btree ("version__status");
  CREATE INDEX "_sectors_v_created_at_idx" ON "_sectors_v" USING btree ("created_at");
  CREATE INDEX "_sectors_v_updated_at_idx" ON "_sectors_v" USING btree ("updated_at");
  CREATE INDEX "_sectors_v_latest_idx" ON "_sectors_v" USING btree ("latest");
  CREATE INDEX "_sectors_v_autosave_idx" ON "_sectors_v" USING btree ("autosave");
  CREATE INDEX "_sectors_v_rels_order_idx" ON "_sectors_v_rels" USING btree ("order");
  CREATE INDEX "_sectors_v_rels_parent_idx" ON "_sectors_v_rels" USING btree ("parent_id");
  CREATE INDEX "_sectors_v_rels_path_idx" ON "_sectors_v_rels" USING btree ("path");
  CREATE INDEX "_sectors_v_rels_solutions_id_idx" ON "_sectors_v_rels" USING btree ("solutions_id");
  CREATE INDEX "references_image_idx" ON "references" USING btree ("image_id");
  CREATE INDEX "references_updated_at_idx" ON "references" USING btree ("updated_at");
  CREATE INDEX "references_created_at_idx" ON "references" USING btree ("created_at");
  CREATE INDEX "references__status_idx" ON "references" USING btree ("_status");
  CREATE INDEX "references_rels_order_idx" ON "references_rels" USING btree ("order");
  CREATE INDEX "references_rels_parent_idx" ON "references_rels" USING btree ("parent_id");
  CREATE INDEX "references_rels_path_idx" ON "references_rels" USING btree ("path");
  CREATE INDEX "references_rels_solutions_id_idx" ON "references_rels" USING btree ("solutions_id");
  CREATE INDEX "_references_v_parent_idx" ON "_references_v" USING btree ("parent_id");
  CREATE INDEX "_references_v_version_version_image_idx" ON "_references_v" USING btree ("version_image_id");
  CREATE INDEX "_references_v_version_version_updated_at_idx" ON "_references_v" USING btree ("version_updated_at");
  CREATE INDEX "_references_v_version_version_created_at_idx" ON "_references_v" USING btree ("version_created_at");
  CREATE INDEX "_references_v_version_version__status_idx" ON "_references_v" USING btree ("version__status");
  CREATE INDEX "_references_v_created_at_idx" ON "_references_v" USING btree ("created_at");
  CREATE INDEX "_references_v_updated_at_idx" ON "_references_v" USING btree ("updated_at");
  CREATE INDEX "_references_v_latest_idx" ON "_references_v" USING btree ("latest");
  CREATE INDEX "_references_v_autosave_idx" ON "_references_v" USING btree ("autosave");
  CREATE INDEX "_references_v_rels_order_idx" ON "_references_v_rels" USING btree ("order");
  CREATE INDEX "_references_v_rels_parent_idx" ON "_references_v_rels" USING btree ("parent_id");
  CREATE INDEX "_references_v_rels_path_idx" ON "_references_v_rels" USING btree ("path");
  CREATE INDEX "_references_v_rels_solutions_id_idx" ON "_references_v_rels" USING btree ("solutions_id");
  CREATE INDEX "challenges_points_order_idx" ON "challenges_points" USING btree ("_order");
  CREATE INDEX "challenges_points_parent_id_idx" ON "challenges_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "challenges_slug_idx" ON "challenges" USING btree ("slug");
  CREATE INDEX "challenges_updated_at_idx" ON "challenges" USING btree ("updated_at");
  CREATE INDEX "challenges_created_at_idx" ON "challenges" USING btree ("created_at");
  CREATE INDEX "challenges__status_idx" ON "challenges" USING btree ("_status");
  CREATE INDEX "_challenges_v_version_points_order_idx" ON "_challenges_v_version_points" USING btree ("_order");
  CREATE INDEX "_challenges_v_version_points_parent_id_idx" ON "_challenges_v_version_points" USING btree ("_parent_id");
  CREATE INDEX "_challenges_v_parent_idx" ON "_challenges_v" USING btree ("parent_id");
  CREATE INDEX "_challenges_v_version_version_slug_idx" ON "_challenges_v" USING btree ("version_slug");
  CREATE INDEX "_challenges_v_version_version_updated_at_idx" ON "_challenges_v" USING btree ("version_updated_at");
  CREATE INDEX "_challenges_v_version_version_created_at_idx" ON "_challenges_v" USING btree ("version_created_at");
  CREATE INDEX "_challenges_v_version_version__status_idx" ON "_challenges_v" USING btree ("version__status");
  CREATE INDEX "_challenges_v_created_at_idx" ON "_challenges_v" USING btree ("created_at");
  CREATE INDEX "_challenges_v_updated_at_idx" ON "_challenges_v" USING btree ("updated_at");
  CREATE INDEX "_challenges_v_latest_idx" ON "_challenges_v" USING btree ("latest");
  CREATE INDEX "_challenges_v_autosave_idx" ON "_challenges_v" USING btree ("autosave");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_solutions_id_idx" ON "payload_locked_documents_rels" USING btree ("solutions_id");
  CREATE INDEX "payload_locked_documents_rels_sectors_id_idx" ON "payload_locked_documents_rels" USING btree ("sectors_id");
  CREATE INDEX "payload_locked_documents_rels_references_id_idx" ON "payload_locked_documents_rels" USING btree ("references_id");
  CREATE INDEX "payload_locked_documents_rels_challenges_id_idx" ON "payload_locked_documents_rels" USING btree ("challenges_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_hero_technologies_order_idx" ON "home_hero_technologies" USING btree ("_order");
  CREATE INDEX "home_hero_technologies_parent_id_idx" ON "home_hero_technologies" USING btree ("_parent_id");
  CREATE INDEX "home_architecture_points_order_idx" ON "home_architecture_points" USING btree ("_order");
  CREATE INDEX "home_architecture_points_parent_id_idx" ON "home_architecture_points" USING btree ("_parent_id");
  CREATE INDEX "home_method_pillars_points_order_idx" ON "home_method_pillars_points" USING btree ("_order");
  CREATE INDEX "home_method_pillars_points_parent_id_idx" ON "home_method_pillars_points" USING btree ("_parent_id");
  CREATE INDEX "home_method_pillars_order_idx" ON "home_method_pillars" USING btree ("_order");
  CREATE INDEX "home_method_pillars_parent_id_idx" ON "home_method_pillars" USING btree ("_parent_id");
  CREATE INDEX "home_compliance_topics_order_idx" ON "home_compliance_topics" USING btree ("_order");
  CREATE INDEX "home_compliance_topics_parent_id_idx" ON "home_compliance_topics" USING btree ("_parent_id");
  CREATE INDEX "home_compliance_topics_image_idx" ON "home_compliance_topics" USING btree ("image_id");
  CREATE INDEX "home_about_differentiators_order_idx" ON "home_about_differentiators" USING btree ("_order");
  CREATE INDEX "home_about_differentiators_parent_id_idx" ON "home_about_differentiators" USING btree ("_parent_id");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE INDEX "_home_v_version_hero_technologies_order_idx" ON "_home_v_version_hero_technologies" USING btree ("_order");
  CREATE INDEX "_home_v_version_hero_technologies_parent_id_idx" ON "_home_v_version_hero_technologies" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_architecture_points_order_idx" ON "_home_v_version_architecture_points" USING btree ("_order");
  CREATE INDEX "_home_v_version_architecture_points_parent_id_idx" ON "_home_v_version_architecture_points" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_method_pillars_points_order_idx" ON "_home_v_version_method_pillars_points" USING btree ("_order");
  CREATE INDEX "_home_v_version_method_pillars_points_parent_id_idx" ON "_home_v_version_method_pillars_points" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_method_pillars_order_idx" ON "_home_v_version_method_pillars" USING btree ("_order");
  CREATE INDEX "_home_v_version_method_pillars_parent_id_idx" ON "_home_v_version_method_pillars" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_compliance_topics_order_idx" ON "_home_v_version_compliance_topics" USING btree ("_order");
  CREATE INDEX "_home_v_version_compliance_topics_parent_id_idx" ON "_home_v_version_compliance_topics" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_compliance_topics_image_idx" ON "_home_v_version_compliance_topics" USING btree ("image_id");
  CREATE INDEX "_home_v_version_about_differentiators_order_idx" ON "_home_v_version_about_differentiators" USING btree ("_order");
  CREATE INDEX "_home_v_version_about_differentiators_parent_id_idx" ON "_home_v_version_about_differentiators" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE INDEX "_home_v_autosave_idx" ON "_home_v" USING btree ("autosave");
  CREATE INDEX "solutions_page__status_idx" ON "solutions_page" USING btree ("_status");
  CREATE INDEX "_solutions_page_v_version_version__status_idx" ON "_solutions_page_v" USING btree ("version__status");
  CREATE INDEX "_solutions_page_v_created_at_idx" ON "_solutions_page_v" USING btree ("created_at");
  CREATE INDEX "_solutions_page_v_updated_at_idx" ON "_solutions_page_v" USING btree ("updated_at");
  CREATE INDEX "_solutions_page_v_latest_idx" ON "_solutions_page_v" USING btree ("latest");
  CREATE INDEX "_solutions_page_v_autosave_idx" ON "_solutions_page_v" USING btree ("autosave");
  CREATE INDEX "sectors_page__status_idx" ON "sectors_page" USING btree ("_status");
  CREATE INDEX "_sectors_page_v_version_version__status_idx" ON "_sectors_page_v" USING btree ("version__status");
  CREATE INDEX "_sectors_page_v_created_at_idx" ON "_sectors_page_v" USING btree ("created_at");
  CREATE INDEX "_sectors_page_v_updated_at_idx" ON "_sectors_page_v" USING btree ("updated_at");
  CREATE INDEX "_sectors_page_v_latest_idx" ON "_sectors_page_v" USING btree ("latest");
  CREATE INDEX "_sectors_page_v_autosave_idx" ON "_sectors_page_v" USING btree ("autosave");
  CREATE INDEX "services_page_method_commitments_order_idx" ON "services_page_method_commitments" USING btree ("_order");
  CREATE INDEX "services_page_method_commitments_parent_id_idx" ON "services_page_method_commitments" USING btree ("_parent_id");
  CREATE INDEX "services_page__status_idx" ON "services_page" USING btree ("_status");
  CREATE INDEX "_services_page_v_version_method_commitments_order_idx" ON "_services_page_v_version_method_commitments" USING btree ("_order");
  CREATE INDEX "_services_page_v_version_method_commitments_parent_id_idx" ON "_services_page_v_version_method_commitments" USING btree ("_parent_id");
  CREATE INDEX "_services_page_v_version_version__status_idx" ON "_services_page_v" USING btree ("version__status");
  CREATE INDEX "_services_page_v_created_at_idx" ON "_services_page_v" USING btree ("created_at");
  CREATE INDEX "_services_page_v_updated_at_idx" ON "_services_page_v" USING btree ("updated_at");
  CREATE INDEX "_services_page_v_latest_idx" ON "_services_page_v" USING btree ("latest");
  CREATE INDEX "_services_page_v_autosave_idx" ON "_services_page_v" USING btree ("autosave");
  CREATE INDEX "references_page__status_idx" ON "references_page" USING btree ("_status");
  CREATE INDEX "_references_page_v_version_version__status_idx" ON "_references_page_v" USING btree ("version__status");
  CREATE INDEX "_references_page_v_created_at_idx" ON "_references_page_v" USING btree ("created_at");
  CREATE INDEX "_references_page_v_updated_at_idx" ON "_references_page_v" USING btree ("updated_at");
  CREATE INDEX "_references_page_v_latest_idx" ON "_references_page_v" USING btree ("latest");
  CREATE INDEX "_references_page_v_autosave_idx" ON "_references_page_v" USING btree ("autosave");
  CREATE INDEX "about_page_human_highlights_order_idx" ON "about_page_human_highlights" USING btree ("_order");
  CREATE INDEX "about_page_human_highlights_parent_id_idx" ON "about_page_human_highlights" USING btree ("_parent_id");
  CREATE INDEX "about_page_human_approach_order_idx" ON "about_page_human_approach" USING btree ("_order");
  CREATE INDEX "about_page_human_approach_parent_id_idx" ON "about_page_human_approach" USING btree ("_parent_id");
  CREATE INDEX "about_page_vision_people_order_idx" ON "about_page_vision_people" USING btree ("_order");
  CREATE INDEX "about_page_vision_people_parent_id_idx" ON "about_page_vision_people" USING btree ("_parent_id");
  CREATE INDEX "about_page__status_idx" ON "about_page" USING btree ("_status");
  CREATE INDEX "_about_page_v_version_human_highlights_order_idx" ON "_about_page_v_version_human_highlights" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_human_highlights_parent_id_idx" ON "_about_page_v_version_human_highlights" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_human_approach_order_idx" ON "_about_page_v_version_human_approach" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_human_approach_parent_id_idx" ON "_about_page_v_version_human_approach" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_vision_people_order_idx" ON "_about_page_v_version_vision_people" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_vision_people_parent_id_idx" ON "_about_page_v_version_vision_people" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_version__status_idx" ON "_about_page_v" USING btree ("version__status");
  CREATE INDEX "_about_page_v_created_at_idx" ON "_about_page_v" USING btree ("created_at");
  CREATE INDEX "_about_page_v_updated_at_idx" ON "_about_page_v" USING btree ("updated_at");
  CREATE INDEX "_about_page_v_latest_idx" ON "_about_page_v" USING btree ("latest");
  CREATE INDEX "_about_page_v_autosave_idx" ON "_about_page_v" USING btree ("autosave");
  CREATE INDEX "contact_page_topics_order_idx" ON "contact_page_topics" USING btree ("_order");
  CREATE INDEX "contact_page_topics_parent_id_idx" ON "contact_page_topics" USING btree ("_parent_id");
  CREATE INDEX "contact_page__status_idx" ON "contact_page" USING btree ("_status");
  CREATE INDEX "_contact_page_v_version_topics_order_idx" ON "_contact_page_v_version_topics" USING btree ("_order");
  CREATE INDEX "_contact_page_v_version_topics_parent_id_idx" ON "_contact_page_v_version_topics" USING btree ("_parent_id");
  CREATE INDEX "_contact_page_v_version_version__status_idx" ON "_contact_page_v" USING btree ("version__status");
  CREATE INDEX "_contact_page_v_created_at_idx" ON "_contact_page_v" USING btree ("created_at");
  CREATE INDEX "_contact_page_v_updated_at_idx" ON "_contact_page_v" USING btree ("updated_at");
  CREATE INDEX "_contact_page_v_latest_idx" ON "_contact_page_v" USING btree ("latest");
  CREATE INDEX "_contact_page_v_autosave_idx" ON "_contact_page_v" USING btree ("autosave");
  CREATE INDEX "common_navigation_items_order_idx" ON "common_navigation_items" USING btree ("_order");
  CREATE INDEX "common_navigation_items_parent_id_idx" ON "common_navigation_items" USING btree ("_parent_id");
  CREATE INDEX "common_contact_address_lines_order_idx" ON "common_contact_address_lines" USING btree ("_order");
  CREATE INDEX "common_contact_address_lines_parent_id_idx" ON "common_contact_address_lines" USING btree ("_parent_id");
  CREATE INDEX "common_norms_partners_order_idx" ON "common_norms_partners" USING btree ("_order");
  CREATE INDEX "common_norms_partners_parent_id_idx" ON "common_norms_partners" USING btree ("_parent_id");
  CREATE INDEX "common_norms_trust_signals_order_idx" ON "common_norms_trust_signals" USING btree ("_order");
  CREATE INDEX "common_norms_trust_signals_parent_id_idx" ON "common_norms_trust_signals" USING btree ("_parent_id");
  CREATE INDEX "common_metrics_items_order_idx" ON "common_metrics_items" USING btree ("_order");
  CREATE INDEX "common_metrics_items_parent_id_idx" ON "common_metrics_items" USING btree ("_parent_id");
  CREATE INDEX "common_process_steps_deliverables_order_idx" ON "common_process_steps_deliverables" USING btree ("_order");
  CREATE INDEX "common_process_steps_deliverables_parent_id_idx" ON "common_process_steps_deliverables" USING btree ("_parent_id");
  CREATE INDEX "common_process_steps_order_idx" ON "common_process_steps" USING btree ("_order");
  CREATE INDEX "common_process_steps_parent_id_idx" ON "common_process_steps" USING btree ("_parent_id");
  CREATE INDEX "common__status_idx" ON "common" USING btree ("_status");
  CREATE INDEX "_common_v_version_navigation_items_order_idx" ON "_common_v_version_navigation_items" USING btree ("_order");
  CREATE INDEX "_common_v_version_navigation_items_parent_id_idx" ON "_common_v_version_navigation_items" USING btree ("_parent_id");
  CREATE INDEX "_common_v_version_contact_address_lines_order_idx" ON "_common_v_version_contact_address_lines" USING btree ("_order");
  CREATE INDEX "_common_v_version_contact_address_lines_parent_id_idx" ON "_common_v_version_contact_address_lines" USING btree ("_parent_id");
  CREATE INDEX "_common_v_version_norms_partners_order_idx" ON "_common_v_version_norms_partners" USING btree ("_order");
  CREATE INDEX "_common_v_version_norms_partners_parent_id_idx" ON "_common_v_version_norms_partners" USING btree ("_parent_id");
  CREATE INDEX "_common_v_version_norms_trust_signals_order_idx" ON "_common_v_version_norms_trust_signals" USING btree ("_order");
  CREATE INDEX "_common_v_version_norms_trust_signals_parent_id_idx" ON "_common_v_version_norms_trust_signals" USING btree ("_parent_id");
  CREATE INDEX "_common_v_version_metrics_items_order_idx" ON "_common_v_version_metrics_items" USING btree ("_order");
  CREATE INDEX "_common_v_version_metrics_items_parent_id_idx" ON "_common_v_version_metrics_items" USING btree ("_parent_id");
  CREATE INDEX "_common_v_version_process_steps_deliverables_order_idx" ON "_common_v_version_process_steps_deliverables" USING btree ("_order");
  CREATE INDEX "_common_v_version_process_steps_deliverables_parent_id_idx" ON "_common_v_version_process_steps_deliverables" USING btree ("_parent_id");
  CREATE INDEX "_common_v_version_process_steps_order_idx" ON "_common_v_version_process_steps" USING btree ("_order");
  CREATE INDEX "_common_v_version_process_steps_parent_id_idx" ON "_common_v_version_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_common_v_version_version__status_idx" ON "_common_v" USING btree ("version__status");
  CREATE INDEX "_common_v_created_at_idx" ON "_common_v" USING btree ("created_at");
  CREATE INDEX "_common_v_updated_at_idx" ON "_common_v" USING btree ("updated_at");
  CREATE INDEX "_common_v_latest_idx" ON "_common_v" USING btree ("latest");
  CREATE INDEX "_common_v_autosave_idx" ON "_common_v" USING btree ("autosave");
  CREATE INDEX "demos_badge_door_steps_order_idx" ON "demos_badge_door_steps" USING btree ("_order");
  CREATE INDEX "demos_badge_door_steps_parent_id_idx" ON "demos_badge_door_steps" USING btree ("_parent_id");
  CREATE INDEX "demos_intrusion_steps_order_idx" ON "demos_intrusion_steps" USING btree ("_order");
  CREATE INDEX "demos_intrusion_steps_parent_id_idx" ON "demos_intrusion_steps" USING btree ("_parent_id");
  CREATE INDEX "demos_axis_explode_labels_order_idx" ON "demos_axis_explode_labels" USING btree ("_order");
  CREATE INDEX "demos_axis_explode_labels_parent_id_idx" ON "demos_axis_explode_labels" USING btree ("_parent_id");
  CREATE INDEX "demos_axis_explode_steps_order_idx" ON "demos_axis_explode_steps" USING btree ("_order");
  CREATE INDEX "demos_axis_explode_steps_parent_id_idx" ON "demos_axis_explode_steps" USING btree ("_parent_id");
  CREATE INDEX "demos_solutions_hero_callouts_order_idx" ON "demos_solutions_hero_callouts" USING btree ("_order");
  CREATE INDEX "demos_solutions_hero_callouts_parent_id_idx" ON "demos_solutions_hero_callouts" USING btree ("_parent_id");
  CREATE INDEX "demos_architecture_layers_order_idx" ON "demos_architecture_layers" USING btree ("_order");
  CREATE INDEX "demos_architecture_layers_parent_id_idx" ON "demos_architecture_layers" USING btree ("_parent_id");
  CREATE INDEX "demos__status_idx" ON "demos" USING btree ("_status");
  CREATE INDEX "_demos_v_version_badge_door_steps_order_idx" ON "_demos_v_version_badge_door_steps" USING btree ("_order");
  CREATE INDEX "_demos_v_version_badge_door_steps_parent_id_idx" ON "_demos_v_version_badge_door_steps" USING btree ("_parent_id");
  CREATE INDEX "_demos_v_version_intrusion_steps_order_idx" ON "_demos_v_version_intrusion_steps" USING btree ("_order");
  CREATE INDEX "_demos_v_version_intrusion_steps_parent_id_idx" ON "_demos_v_version_intrusion_steps" USING btree ("_parent_id");
  CREATE INDEX "_demos_v_version_axis_explode_labels_order_idx" ON "_demos_v_version_axis_explode_labels" USING btree ("_order");
  CREATE INDEX "_demos_v_version_axis_explode_labels_parent_id_idx" ON "_demos_v_version_axis_explode_labels" USING btree ("_parent_id");
  CREATE INDEX "_demos_v_version_axis_explode_steps_order_idx" ON "_demos_v_version_axis_explode_steps" USING btree ("_order");
  CREATE INDEX "_demos_v_version_axis_explode_steps_parent_id_idx" ON "_demos_v_version_axis_explode_steps" USING btree ("_parent_id");
  CREATE INDEX "_demos_v_version_solutions_hero_callouts_order_idx" ON "_demos_v_version_solutions_hero_callouts" USING btree ("_order");
  CREATE INDEX "_demos_v_version_solutions_hero_callouts_parent_id_idx" ON "_demos_v_version_solutions_hero_callouts" USING btree ("_parent_id");
  CREATE INDEX "_demos_v_version_architecture_layers_order_idx" ON "_demos_v_version_architecture_layers" USING btree ("_order");
  CREATE INDEX "_demos_v_version_architecture_layers_parent_id_idx" ON "_demos_v_version_architecture_layers" USING btree ("_parent_id");
  CREATE INDEX "_demos_v_version_version__status_idx" ON "_demos_v" USING btree ("version__status");
  CREATE INDEX "_demos_v_created_at_idx" ON "_demos_v" USING btree ("created_at");
  CREATE INDEX "_demos_v_updated_at_idx" ON "_demos_v" USING btree ("updated_at");
  CREATE INDEX "_demos_v_latest_idx" ON "_demos_v" USING btree ("latest");
  CREATE INDEX "_demos_v_autosave_idx" ON "_demos_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "solutions_capabilities" CASCADE;
  DROP TABLE "solutions_benefits" CASCADE;
  DROP TABLE "solutions_outcomes" CASCADE;
  DROP TABLE "solutions" CASCADE;
  DROP TABLE "_solutions_v_version_capabilities" CASCADE;
  DROP TABLE "_solutions_v_version_benefits" CASCADE;
  DROP TABLE "_solutions_v_version_outcomes" CASCADE;
  DROP TABLE "_solutions_v" CASCADE;
  DROP TABLE "sectors_challenges" CASCADE;
  DROP TABLE "sectors_outcomes" CASCADE;
  DROP TABLE "sectors_examples" CASCADE;
  DROP TABLE "sectors" CASCADE;
  DROP TABLE "sectors_rels" CASCADE;
  DROP TABLE "_sectors_v_version_challenges" CASCADE;
  DROP TABLE "_sectors_v_version_outcomes" CASCADE;
  DROP TABLE "_sectors_v_version_examples" CASCADE;
  DROP TABLE "_sectors_v" CASCADE;
  DROP TABLE "_sectors_v_rels" CASCADE;
  DROP TABLE "references" CASCADE;
  DROP TABLE "references_rels" CASCADE;
  DROP TABLE "_references_v" CASCADE;
  DROP TABLE "_references_v_rels" CASCADE;
  DROP TABLE "challenges_points" CASCADE;
  DROP TABLE "challenges" CASCADE;
  DROP TABLE "_challenges_v_version_points" CASCADE;
  DROP TABLE "_challenges_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_hero_technologies" CASCADE;
  DROP TABLE "home_architecture_points" CASCADE;
  DROP TABLE "home_method_pillars_points" CASCADE;
  DROP TABLE "home_method_pillars" CASCADE;
  DROP TABLE "home_compliance_topics" CASCADE;
  DROP TABLE "home_about_differentiators" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "_home_v_version_hero_technologies" CASCADE;
  DROP TABLE "_home_v_version_architecture_points" CASCADE;
  DROP TABLE "_home_v_version_method_pillars_points" CASCADE;
  DROP TABLE "_home_v_version_method_pillars" CASCADE;
  DROP TABLE "_home_v_version_compliance_topics" CASCADE;
  DROP TABLE "_home_v_version_about_differentiators" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "solutions_page" CASCADE;
  DROP TABLE "_solutions_page_v" CASCADE;
  DROP TABLE "sectors_page" CASCADE;
  DROP TABLE "_sectors_page_v" CASCADE;
  DROP TABLE "services_page_method_commitments" CASCADE;
  DROP TABLE "services_page" CASCADE;
  DROP TABLE "_services_page_v_version_method_commitments" CASCADE;
  DROP TABLE "_services_page_v" CASCADE;
  DROP TABLE "references_page" CASCADE;
  DROP TABLE "_references_page_v" CASCADE;
  DROP TABLE "about_page_human_highlights" CASCADE;
  DROP TABLE "about_page_human_approach" CASCADE;
  DROP TABLE "about_page_vision_people" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "_about_page_v_version_human_highlights" CASCADE;
  DROP TABLE "_about_page_v_version_human_approach" CASCADE;
  DROP TABLE "_about_page_v_version_vision_people" CASCADE;
  DROP TABLE "_about_page_v" CASCADE;
  DROP TABLE "contact_page_topics" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "_contact_page_v_version_topics" CASCADE;
  DROP TABLE "_contact_page_v" CASCADE;
  DROP TABLE "common_navigation_items" CASCADE;
  DROP TABLE "common_contact_address_lines" CASCADE;
  DROP TABLE "common_norms_partners" CASCADE;
  DROP TABLE "common_norms_trust_signals" CASCADE;
  DROP TABLE "common_metrics_items" CASCADE;
  DROP TABLE "common_process_steps_deliverables" CASCADE;
  DROP TABLE "common_process_steps" CASCADE;
  DROP TABLE "common" CASCADE;
  DROP TABLE "_common_v_version_navigation_items" CASCADE;
  DROP TABLE "_common_v_version_contact_address_lines" CASCADE;
  DROP TABLE "_common_v_version_norms_partners" CASCADE;
  DROP TABLE "_common_v_version_norms_trust_signals" CASCADE;
  DROP TABLE "_common_v_version_metrics_items" CASCADE;
  DROP TABLE "_common_v_version_process_steps_deliverables" CASCADE;
  DROP TABLE "_common_v_version_process_steps" CASCADE;
  DROP TABLE "_common_v" CASCADE;
  DROP TABLE "demos_badge_door_steps" CASCADE;
  DROP TABLE "demos_intrusion_steps" CASCADE;
  DROP TABLE "demos_axis_explode_labels" CASCADE;
  DROP TABLE "demos_axis_explode_steps" CASCADE;
  DROP TABLE "demos_solutions_hero_callouts" CASCADE;
  DROP TABLE "demos_architecture_layers" CASCADE;
  DROP TABLE "demos" CASCADE;
  DROP TABLE "_demos_v_version_badge_door_steps" CASCADE;
  DROP TABLE "_demos_v_version_intrusion_steps" CASCADE;
  DROP TABLE "_demos_v_version_axis_explode_labels" CASCADE;
  DROP TABLE "_demos_v_version_axis_explode_steps" CASCADE;
  DROP TABLE "_demos_v_version_solutions_hero_callouts" CASCADE;
  DROP TABLE "_demos_v_version_architecture_layers" CASCADE;
  DROP TABLE "_demos_v" CASCADE;
  DROP TYPE "public"."enum_solutions_icon";
  DROP TYPE "public"."enum_solutions_media_kind";
  DROP TYPE "public"."enum_solutions_status";
  DROP TYPE "public"."enum__solutions_v_version_icon";
  DROP TYPE "public"."enum__solutions_v_version_media_kind";
  DROP TYPE "public"."enum__solutions_v_version_status";
  DROP TYPE "public"."enum_sectors_icon";
  DROP TYPE "public"."enum_sectors_status";
  DROP TYPE "public"."enum__sectors_v_version_icon";
  DROP TYPE "public"."enum__sectors_v_version_status";
  DROP TYPE "public"."enum_references_status";
  DROP TYPE "public"."enum__references_v_version_status";
  DROP TYPE "public"."enum_challenges_icon";
  DROP TYPE "public"."enum_challenges_status";
  DROP TYPE "public"."enum__challenges_v_version_icon";
  DROP TYPE "public"."enum__challenges_v_version_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_home_architecture_points_icon";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_architecture_points_icon";
  DROP TYPE "public"."enum__home_v_version_status";
  DROP TYPE "public"."enum_solutions_page_status";
  DROP TYPE "public"."enum__solutions_page_v_version_status";
  DROP TYPE "public"."enum_sectors_page_status";
  DROP TYPE "public"."enum__sectors_page_v_version_status";
  DROP TYPE "public"."enum_services_page_status";
  DROP TYPE "public"."enum__services_page_v_version_status";
  DROP TYPE "public"."enum_references_page_status";
  DROP TYPE "public"."enum__references_page_v_version_status";
  DROP TYPE "public"."enum_about_page_human_highlights_icon";
  DROP TYPE "public"."enum_about_page_status";
  DROP TYPE "public"."enum__about_page_v_version_human_highlights_icon";
  DROP TYPE "public"."enum__about_page_v_version_status";
  DROP TYPE "public"."enum_contact_page_status";
  DROP TYPE "public"."enum__contact_page_v_version_status";
  DROP TYPE "public"."enum_common_norms_partners_kind";
  DROP TYPE "public"."enum_common_status";
  DROP TYPE "public"."enum__common_v_version_norms_partners_kind";
  DROP TYPE "public"."enum__common_v_version_status";
  DROP TYPE "public"."enum_demos_status";
  DROP TYPE "public"."enum__demos_v_version_status";`)
}
