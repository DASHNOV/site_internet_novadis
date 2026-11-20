"use server";

import config from "@payload-config";
import { getPayload } from "payload";
import { contactFormCopy, contactFormLimits } from "@/data/contact-form";
import { contactDetails } from "@/data/site";

type FieldName = "name" | "company" | "email" | "phone" | "message";

export type ContactFormValues = Record<FieldName, string>;

export type ContactFormState = {
  status: "idle" | "disabled" | "sent" | "invalid" | "error";
  values?: ContactFormValues;
  errors?: Partial<Record<FieldName, string>>;
};

const EMAIL_PATTERN = /^[^\s@<>"',;:()[\]\\]+@[^\s@<>"',;:()[\]\\]+\.[^\s@<>"',;:()[\]\\]{2,}$/;
const PHONE_PATTERN = /^[0-9+().\s-]+$/;
const CONTROL_CHARS = /[\p{Cc}\u2028\u2029]/gu;
const CONTROL_CHARS_KEEP_NEWLINES = /[^\P{Cc}\n\t]|[\u2028\u2029]/gu;

function singleLine(raw: FormDataEntryValue | null) {
  return typeof raw === "string" ? raw.replace(CONTROL_CHARS, " ").replace(/\s+/g, " ").trim() : "";
}

function multiLine(raw: FormDataEntryValue | null) {
  if (typeof raw !== "string") return "";
  return raw
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARS_KEEP_NEWLINES, " ")
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function validate(values: ContactFormValues) {
  const errors: ContactFormState["errors"] = {};
  const { fieldErrors } = contactFormCopy;

  if (!values.name) errors.name = fieldErrors.name;
  else if (values.name.length > contactFormLimits.name) errors.name = fieldErrors.tooLong;

  if (values.company.length > contactFormLimits.company) errors.company = fieldErrors.tooLong;

  if (!values.email || !EMAIL_PATTERN.test(values.email)) errors.email = fieldErrors.email;
  else if (values.email.length > contactFormLimits.email) errors.email = fieldErrors.tooLong;

  if (values.phone) {
    const digits = values.phone.replace(/\D/g, "");
    if (values.phone.length > contactFormLimits.phone) errors.phone = fieldErrors.tooLong;
    else if (!PHONE_PATTERN.test(values.phone) || digits.length < 6) errors.phone = fieldErrors.phone;
  }

  if (!values.message) errors.message = fieldErrors.message;
  else if (values.message.length > contactFormLimits.message) errors.message = fieldErrors.tooLong;

  return errors;
}

function buildMailText(values: ContactFormValues) {
  const { labels, notProvided } = contactFormCopy.mail;
  return [
    `${labels.name} : ${values.name}`,
    `${labels.company} : ${values.company || notProvided}`,
    `${labels.email} : ${values.email}`,
    `${labels.phone} : ${values.phone || notProvided}`,
    "",
    `${labels.message} :`,
    values.message,
  ].join("\n");
}

export async function submitContactForm(_previous: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Interrupteur : tant qu'il n'est pas activé, rien n'est envoyé ni conservé.
  // La saisie est seulement renvoyée au formulaire pour que le visiteur ne perde pas son texte.
  const values: ContactFormValues = {
    name: singleLine(formData.get("name")),
    company: singleLine(formData.get("company")),
    email: singleLine(formData.get("email")),
    phone: singleLine(formData.get("phone")),
    message: multiLine(formData.get("message")),
  };
  if (process.env.CONTACT_FORM_ENABLED !== "true") return { status: "disabled", values };

  // Champ piège : un humain ne le voit pas, un robot le remplit. Rejet silencieux, sans rien envoyer.
  if (singleLine(formData.get("website"))) return { status: "sent" };

  const errors = validate(values);
  if (Object.keys(errors).length > 0) return { status: "invalid", values, errors };

  try {
    const payload = await getPayload({ config });
    await payload.sendEmail({
      to: process.env.CONTACT_FORM_TO || contactDetails.email,
      replyTo: values.email,
      subject: `${contactFormCopy.mail.subjectPrefix} - ${values.name}${values.company ? ` (${values.company})` : ""}`,
      text: buildMailText(values),
    });
    return { status: "sent" };
  } catch (error) {
    console.error("[contact] Échec de l'envoi du formulaire de contact", error);
    return { status: "error", values };
  }
}
