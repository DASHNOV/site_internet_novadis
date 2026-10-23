import type { Field, GlobalConfig } from "payload";
import { canEdit, isLoggedIn, publishedOrLoggedIn } from "../access";
import { drafts, text } from "../fields";

// Le nombre d'étapes et d'étiquettes suit les films et les modèles 3D : il est figé.
function steps(count: number, titleName: "label" | "title"): Field {
  return {
    name: "steps",
    label: "Étapes",
    type: "array",
    minRows: count,
    maxRows: count,
    labels: { singular: "Étape", plural: "Étapes" },
    fields: [text(titleName, "Titre", "label"), text("text", "Texte", "text")],
  };
}

function event(): Field {
  return {
    name: "event",
    label: "Événement final",
    type: "group",
    fields: [{ type: "row", fields: [text("title", "Titre", "label"), text("detail", "Détail", "label"), text("logged", "Mention de suivi", "label")] }],
  };
}

export const Demos: GlobalConfig = {
  slug: "demos",
  label: "Démonstrations",
  admin: {
    group: "Éléments communs",
    description: "Textes affichés dans les films et les scènes 3D. Les animations elles-mêmes restent gérées par l'équipe technique.",
  },
  access: { read: publishedOrLoggedIn, readVersions: isLoggedIn, update: canEdit },
  versions: drafts,
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "heroFilm",
          label: "Film de l'accueil",
          fields: [text("status", "Statut des repères", "label")],
        },
        {
          name: "supervisionRoom",
          label: "Salle de supervision",
          fields: [
            text("caption", "Légende", "title"),
            text("posterAlt", "Texte alternatif de l'image", "text"),
            text("dragHint", "Indication de rotation", "label"),
            text("consoleTitle", "Titre de l'encadré", "label"),
            {
              type: "row",
              fields: [
                text("systemsSuffix", "Mot après le nombre de systèmes", "label"),
                text("showLabel", "Bouton « afficher »", "label"),
                text("shownLabel", "Bouton « affiché »", "label"),
              ],
            },
          ],
        },
        {
          name: "badgeDoor",
          label: "Porte à badge",
          fields: [
            { type: "row", fields: [text("eyebrow", "Surtitre", "label"), text("title", "Titre", "title")] },
            steps(3, "label"),
            {
              name: "hud",
              label: "Incrustations du film",
              type: "group",
              fields: [
                {
                  type: "row",
                  fields: [text("reader", "Lecteur", "label"), text("reading", "Lecture", "label"), text("badgeId", "Identifiant du badge", "label")],
                },
                { type: "row", fields: [text("granted", "Droit validé", "label"), text("decision", "Décision", "label")] },
              ],
            },
            event(),
            text("scrollHint", "Indication de défilement", "label"),
          ],
        },
        {
          name: "intrusion",
          label: "Intrusion",
          fields: [
            { type: "row", fields: [text("eyebrow", "Surtitre", "label"), text("title", "Titre", "title")] },
            steps(3, "label"),
            {
              name: "hud",
              label: "Incrustations du film",
              type: "group",
              fields: [
                { type: "row", fields: [text("detector", "Détecteur", "label"), text("armed", "Zone armée", "label"), text("watching", "Surveillance", "label")] },
                { type: "row", fields: [text("detected", "Détection", "label"), text("panel", "Centrale", "label"), text("intruder", "Intrus", "label")] },
              ],
            },
            event(),
            text("scrollHint", "Indication de défilement", "label"),
          ],
        },
        {
          name: "axisExplode",
          label: "Caméra éclatée",
          fields: [
            { type: "row", fields: [text("eyebrow", "Surtitre", "label"), text("title", "Titre", "title")] },
            text("description", "Description", "text"),
            text("scrollHint", "Indication de défilement", "label"),
            {
              name: "labels",
              label: "Étiquettes des pièces",
              type: "array",
              minRows: 5,
              maxRows: 5,
              labels: { singular: "Étiquette", plural: "Étiquettes" },
              admin: { description: "Dans l'ordre des pièces du modèle 3D." },
              fields: [text("label", "Texte", "label")],
            },
            steps(2, "title"),
          ],
        },
        {
          name: "solutionsHero",
          label: "Caméra 3D (page Solutions)",
          fields: [
            { type: "row", fields: [text("title", "Nom de la caméra", "label"), text("arLabel", "Bouton réalité augmentée", "label")] },
            text("hint", "Indication de rotation", "label"),
            {
              name: "callouts",
              label: "Étiquettes",
              type: "array",
              minRows: 2,
              maxRows: 2,
              labels: { singular: "Étiquette", plural: "Étiquettes" },
              fields: [text("label", "Texte", "label")],
            },
          ],
        },
        {
          name: "architecture",
          label: "Schéma d'architecture",
          description: "Schéma de l'accueil et parcours d'alarme de la page Solutions.",
          fields: [
            {
              name: "layers",
              label: "Couches, du bas vers le haut",
              type: "array",
              minRows: 3,
              maxRows: 3,
              labels: { singular: "Couche", plural: "Couches" },
              fields: [text("label", "Nom", "label")],
            },
          ],
        },
        {
          name: "alarmJourney",
          label: "Parcours d'une alarme",
          fields: [
            { type: "row", fields: [text("eyebrow", "Surtitre", "label"), text("title", "Titre", "title")] },
            text("detection", "Alarme affichée", "label"),
          ],
        },
      ],
    },
  ],
};
