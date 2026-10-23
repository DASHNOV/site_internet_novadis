import type { Field, GroupField, UploadField } from "payload";
import { iconNames } from "../lib/icon-names";

// Limites de longueur : elles protègent la mise en page sans gêner les textes actuels (440 caractères au plus).
const limits = { label: 60, title: 140, text: 280, paragraph: 600 } as const;
type Size = keyof typeof limits;

type Options = { description?: string; required?: boolean };

export function text(name: string, label: string, size: Size = "title", options: Options = {}): Field {
  const base = {
    name,
    label,
    required: options.required ?? true,
    maxLength: limits[size],
    admin: options.description ? { description: options.description } : undefined,
  };
  return size === "paragraph" || size === "text" ? { ...base, type: "textarea" } : { ...base, type: "text" };
}

// Titre en deux tons : la première partie en encre, la suite en gris.
export function accentTitle(name: string, label: string): GroupField {
  return {
    name,
    label,
    type: "group",
    admin: { description: "La suite du titre s'affiche en gris." },
    fields: [
      { type: "row", fields: [text("lead", "Début du titre", "title"), text("accent", "Suite en gris", "title", { required: false })] },
    ],
  };
}

export function textList(name: string, label: string, size: Size = "title", description?: string): Field {
  return {
    name,
    label,
    type: "array",
    labels: { singular: "Ligne", plural: "Lignes" },
    admin: { description, initCollapsed: false },
    fields: [text("value", "Texte", size)],
  };
}

export function icon(name = "icon", label = "Icône"): Field {
  return {
    name,
    label,
    type: "select",
    required: true,
    options: iconNames.map((value) => ({ label: value, value })),
  };
}

export function image(name: string, label: string, required = true): UploadField {
  return { name, label, type: "upload", relationTo: "media", required };
}

// Slug d'URL : il pilote les liens et les démonstrations, les rédacteurs ne le modifient pas.
export const slug: Field = {
  name: "slug",
  label: "Identifiant d'URL",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: { readOnly: true, position: "sidebar", description: "Utilisé dans l'adresse de la page. Non modifiable." },
};

// Liens internes : chemins du site comme /solutions/supervision ou /services.
export function link(name: string, label: string): Field {
  return {
    name,
    label,
    type: "text",
    required: true,
    admin: { description: "Adresse interne au site, par exemple /solutions/supervision." },
    validate: (value: unknown) =>
      typeof value === "string" && value.startsWith("/") ? true : "L'adresse doit commencer par « / ».",
  };
}

export const drafts = { drafts: { autosave: { interval: 800 } }, maxPerDoc: 50 } as const;
