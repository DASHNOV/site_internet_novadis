// Textes juridiques : ils ne passent pas par le CMS, pour qu'un compte éditeur ne puisse pas les modifier.
export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  closing?: string[];
  link?: { href: string; label: string };
};

export type LegalPageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  updatedAt: string;
  sections: LegalSection[];
};

const updatedAt = "Dernière mise à jour : 18 novembre 2026";

export const legalNotice: LegalPageCopy = {
  metaTitle: "Mentions légales",
  metaDescription: "Informations sur l'éditeur et l'hébergeur du site Novadis, propriété intellectuelle et responsabilités.",
  eyebrow: "Mentions légales",
  title: "Informations légales",
  updatedAt,
  sections: [
    {
      title: "Éditeur du site",
      items: [
        "Dénomination sociale : NOVADIS",
        "Forme juridique : société par actions simplifiée (SAS) au capital de 245 168 €",
        "Siège social : 14-16 rue Clément Bayard, 92300 Levallois-Perret, France",
        "RCS Nanterre 392 844 122",
        "SIRET du siège : 392 844 122 00052",
        "TVA intracommunautaire : FR32 392 844 122",
        "Téléphone : +33 1 41 34 09 90",
        "E-mail : com@novadis.eu",
      ],
    },
    {
      title: "Directeur de la publication",
      paragraphs: ["Le directeur de la publication est le représentant légal de NOVADIS."],
    },
    {
      title: "Hébergement",
      paragraphs: [
        "Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis : https://vercel.com",
      ],
    },
    {
      title: "Propriété intellectuelle",
      paragraphs: [
        "Conformément au code de la propriété intellectuelle, toute reproduction, partielle ou totale, des textes, images ou illustrations de ce site qui ne sont pas explicitement destinés à être téléchargés est interdite sans l'autorisation préalable de l'éditeur ou de tout ayant droit.",
      ],
    },
    {
      title: "Visuels",
      paragraphs: [
        "Les photographies, images, vidéos et modèles 3D du site sont des visuels d'illustration, dont une partie est générée par intelligence artificielle. Sauf mention contraire, ils ne représentent pas des sites ou des installations de clients de Novadis.",
      ],
    },
    {
      title: "Responsabilité",
      paragraphs: [
        "L'utilisation des informations contenues sur ce site relève de la seule responsabilité de son utilisateur.",
        "Les textes, visuels et illustrations (schémas, dessins, plans, photographies et animations informatiques) sont communiqués à titre purement informatif et ne peuvent engager la responsabilité de l'éditeur. Aucun contenu du site n'a de valeur contractuelle.",
      ],
    },
    {
      title: "Marques, logos et liens hypertextes",
      paragraphs: [
        "Toute utilisation des noms de marques et logos de ce site est interdite sans l'autorisation de NOVADIS. Tout lien hypertexte visant ce site est soumis à autorisation préalable.",
      ],
    },
    {
      title: "Données personnelles",
      paragraphs: ["Le traitement de vos données personnelles est décrit dans notre politique de confidentialité."],
      link: { href: "/privacy", label: "Consulter la politique de confidentialité" },
    },
    {
      title: "Droit applicable",
      paragraphs: ["Le présent site et ses mentions légales sont soumis au droit français."],
    },
  ],
};

export const privacyPolicy: LegalPageCopy = {
  metaTitle: "Politique de confidentialité",
  metaDescription: "Données personnelles traitées par Novadis, finalités, durées de conservation, cookies et droits des personnes.",
  eyebrow: "Confidentialité",
  title: "Politique de confidentialité",
  updatedAt,
  sections: [
    {
      title: "1. Qui sommes-nous ?",
      paragraphs: [
        "NOVADIS, 14-16 rue Clément Bayard, 92300 Levallois-Perret, France, est responsable du traitement des données personnelles liées à ce site, au sens du Règlement général sur la protection des données (RGPD, UE 2016/679).",
        "Téléphone : +33 1 41 34 09 90. E-mail : dpo@novadis.eu",
      ],
    },
    {
      title: "2. Quelles données traitons-nous ?",
      items: [
        "Données de contact : nom, prénom, société, adresse e-mail, numéro de téléphone et contenu de votre message, lorsque vous nous écrivez ou nous appelez.",
        "Données techniques de connexion : adresse IP, type de navigateur, date, heure et page demandée, enregistrées par notre hébergeur lors de votre visite.",
        "Comptes de l'équipe Novadis : nom, adresse e-mail, rôle, mot de passe protégé et historique des contenus modifiés.",
      ],
      closing: [
        "Ce site n'utilise aucun outil de mesure d'audience ou de publicité. Nous ne collectons aucune donnée sensible par son intermédiaire.",
      ],
    },
    {
      title: "3. Pourquoi et sur quelle base ?",
      items: [
        "Répondre à vos demandes de contact ou de devis : mesures précontractuelles ou intérêt légitime.",
        "Assurer le fonctionnement et la sécurité du site : intérêt légitime.",
        "Gérer les accès de l'équipe et conserver l'historique des contenus publiés : intérêt légitime.",
      ],
    },
    {
      title: "4. Cookies et stockage local",
      paragraphs: [
        "La consultation des pages publiques ne dépose aucun cookie de mesure d'audience, de publicité ou de suivi. Aucun consentement n'est donc demandé.",
        "L'espace réservé à l'équipe Novadis utilise des cookies techniques de connexion, nécessaires à son fonctionnement. La session expire après 2 heures sans renouvellement.",
        "Votre navigateur garde en mémoire, le temps de la session, que l'animation d'accueil a déjà été jouée. Cette information n'est pas transmise à Novadis.",
        "Le lien vers Google Maps ouvre un service tiers, soumis à ses propres règles de confidentialité.",
      ],
    },
    {
      title: "5. Qui a accès à vos données ?",
      paragraphs: ["Vos données sont destinées aux services de Novadis habilités à les traiter. Elles peuvent aussi être traitées par nos prestataires techniques :"],
      items: [
        "Vercel Inc. : hébergement du site et stockage de ses fichiers ;",
        "Neon : base de données des contenus et des comptes de l'équipe ;",
        "notre prestataire de messagerie, pour les échanges par e-mail.",
      ],
      closing: [
        "Nous ne vendons ni ne louons vos données. Elles ne sont communiquées à des tiers que si la loi l'impose ou pour la défense de nos droits.",
      ],
    },
    {
      title: "6. Transferts hors de l'Union européenne",
      paragraphs: [
        "Notre hébergeur Vercel Inc. est établi aux États-Unis et certifié au titre du Data Privacy Framework UE–États-Unis. Lorsque d'autres prestataires transfèrent des données hors de l'Union européenne, ces transferts doivent être encadrés par les garanties prévues par le RGPD.",
      ],
    },
    {
      title: "7. Combien de temps conservons-nous vos données ?",
      items: [
        "Données de contact et de prospection : 3 ans à compter du dernier contact.",
        "Données clients (facturation, contrat) : 10 ans, au titre des obligations comptables.",
        "Comptes de l'équipe : pendant la durée d'activité du compte.",
        "Nom de l'auteur d'une modification : tant que la version concernée est conservée, dans la limite des 50 dernières versions de chaque contenu.",
        "Données techniques de connexion : durée limitée fixée par notre hébergeur pour la sécurité et le fonctionnement du service.",
      ],
    },
    {
      title: "8. Quels sont vos droits ?",
      paragraphs: ["Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :"],
      items: [
        "droit d'accès à vos données ;",
        "droit de rectification des données inexactes ;",
        "droit à l'effacement ;",
        "droit à la limitation du traitement ;",
        "droit d'opposition, notamment à la prospection ;",
        "droit à la portabilité de vos données ;",
        "droit de définir des directives sur le sort de vos données après votre décès.",
      ],
      closing: [
        "Pour les exercer, écrivez à dpo@novadis.eu ou à l'adresse indiquée à l'article 1. Nous répondons dans un délai d'un mois.",
        "Vous pouvez également adresser une réclamation à la CNIL : https://www.cnil.fr/fr/plaintes",
      ],
    },
    {
      title: "9. Sécurité",
      paragraphs: [
        "Novadis met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, altération ou divulgation.",
      ],
    },
    {
      title: "10. Modification de cette politique",
      paragraphs: [
        "Cette politique peut être mise à jour, notamment pour suivre l'évolution du site ou de la réglementation. La date de dernière mise à jour figure en haut de cette page.",
      ],
    },
  ],
};
