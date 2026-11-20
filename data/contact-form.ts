export const contactFormLimits = {
  name: 120,
  company: 160,
  email: 254,
  phone: 30,
  message: 5000,
} as const;

export const contactFormCopy = {
  submit: "Envoyer la demande",
  submitting: "Envoi en cours…",
  sent: "Merci, votre demande a bien été envoyée. Nous revenons vers vous rapidement.",
  error:
    "Votre demande n'a pas pu être envoyée. Réessayez dans quelques instants ou écrivez-nous directement à",
  disabled: "L'envoi en ligne n'est pas encore disponible. Pour nous contacter, écrivez-nous à",
  invalid: "Merci de corriger les champs signalés.",
  fieldErrors: {
    name: "Indiquez votre nom.",
    email: "Indiquez une adresse email valide.",
    message: "Décrivez brièvement votre projet.",
    tooLong: "Ce champ est trop long.",
    phone: "Indiquez un numéro de téléphone valide.",
  },
  privacy: {
    lead: "Vos données servent uniquement à répondre à votre demande. Voir notre",
    linkLabel: "politique de confidentialité",
    href: "/privacy",
  },
  mail: {
    subjectPrefix: "[Site Novadis] Demande de contact",
    labels: {
      name: "Nom",
      company: "Société",
      email: "Email",
      phone: "Téléphone",
      message: "Projet",
    },
    notProvided: "non renseigné",
  },
} as const;
