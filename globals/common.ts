import type { GlobalConfig } from "payload";
import { canEdit, isLoggedIn, publishedOrLoggedIn } from "../access";
import { accentTitle, drafts, link, text, textList } from "../fields";

export const Common: GlobalConfig = {
  slug: "common",
  label: "Éléments communs",
  admin: { group: "Éléments communs", description: "Textes repris sur plusieurs pages du site." },
  access: { read: publishedOrLoggedIn, readVersions: isLoggedIn, update: canEdit },
  versions: drafts,
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "header",
          label: "En-tête",
          fields: [
            text("tagline", "Signature à côté du logo", "label"),
            text("contactCta", "Bouton de contact", "label"),
            text("menuLabel", "Nom du bouton menu mobile (accessibilité)", "label"),
          ],
        },
        {
          name: "navigation",
          label: "Menu",
          description: "Les sous-menus Solutions et Secteurs sont générés à partir de l'offre.",
          fields: [
            {
              name: "items",
              label: "Entrées du menu",
              type: "array",
              labels: { singular: "Entrée", plural: "Entrées" },
              fields: [{ type: "row", fields: [text("label", "Libellé", "label"), link("href", "Lien")] }],
            },
            {
              type: "row",
              fields: [
                text("allSolutionsLabel", "Dernière ligne du sous-menu Solutions", "label"),
                text("allSectorsLabel", "Dernière ligne du sous-menu Secteurs", "label"),
              ],
            },
          ],
        },
        {
          name: "contact",
          label: "Coordonnées",
          fields: [
            { type: "row", fields: [text("email", "Email", "label"), text("phone", "Téléphone", "label")] },
            textList("addressLines", "Adresse (une ligne par ligne affichée)", "label"),
            text("addressInline", "Adresse sur une ligne (page Contact)", "title"),
            { name: "mapsUrl", label: "Lien Google Maps", type: "text", required: true },
            text("regions", "Pays couverts", "label"),
          ],
        },
        {
          name: "footer",
          label: "Pied de page",
          fields: [
            text("description", "Présentation", "text"),
            text("hashtag", "Hashtag", "label"),
            {
              type: "row",
              fields: [
                text("navigationTitle", "Titre colonne menu", "label"),
                text("contactTitle", "Titre colonne contact", "label"),
                text("complianceTitle", "Titre colonne conformité", "label"),
              ],
            },
            text("rights", "Mention de copyright", "label"),
            { type: "row", fields: [text("legalLabel", "Lien mentions légales", "label"), text("privacyLabel", "Lien confidentialité", "label")] },
          ],
        },
        {
          name: "ctaBanner",
          label: "Bandeau de contact",
          description: "Bloc sombre en bas de la plupart des pages.",
          fields: [
            accentTitle("title", "Titre"),
            text("description", "Description", "text"),
            text("cta", "Bouton", "label"),
            text("consoleTitle", "Titre de l'encadré", "label"),
            { type: "row", fields: [text("emailLabel", "Libellé email", "label"), text("phoneLabel", "Libellé téléphone", "label")] },
            text("scopeLabel", "Libellé périmètre", "label"),
            text("scope", "Périmètre", "title"),
          ],
        },
        {
          name: "norms",
          label: "Normes & engagements",
          fields: [
            text("title", "Titre", "title"),
            text("description", "Description", "text"),
            { type: "row", fields: [text("normsTitle", "Titre colonne normes", "label"), text("associationsTitle", "Titre colonne associations", "label")] },
            text("memberPrefix", "Mot devant le nom des associations", "label"),
            {
              name: "partners",
              label: "Normes et associations",
              type: "array",
              labels: { singular: "Ligne", plural: "Lignes" },
              fields: [
                {
                  type: "row",
                  fields: [
                    text("name", "Nom", "label"),
                    text("role", "Rôle", "label"),
                    {
                      name: "kind",
                      label: "Type",
                      type: "select",
                      required: true,
                      options: [
                        { label: "Norme", value: "norm" },
                        { label: "Association", value: "association" },
                      ],
                    },
                  ],
                },
              ],
            },
            textList("trustSignals", "Mentions de confiance (haut de l'accueil, pied de page, à propos)", "label"),
          ],
        },
        {
          name: "metrics",
          label: "Chiffres clés",
          fields: [
            {
              name: "items",
              label: "Chiffres",
              type: "array",
              labels: { singular: "Chiffre", plural: "Chiffres" },
              fields: [
                {
                  type: "row",
                  fields: [text("value", "Valeur", "label"), text("label", "Libellé", "label"), text("caption", "Précision", "label", { required: false })],
                },
              ],
            },
          ],
        },
        {
          name: "process",
          label: "Étapes de service",
          description: "Les quatre étapes de l'accueil et de la page Services.",
          fields: [
            {
              name: "steps",
              label: "Étapes",
              type: "array",
              labels: { singular: "Étape", plural: "Étapes" },
              fields: [
                { type: "row", fields: [text("step", "Numéro", "label"), text("title", "Titre", "label")] },
                text("description", "Description", "text"),
                textList("deliverables", "Livrables", "title"),
              ],
            },
          ],
        },
        {
          name: "labels",
          label: "Libellés",
          fields: [text("learnMore", "Lien « En savoir plus »", "label")],
        },
      ],
    },
  ],
};
