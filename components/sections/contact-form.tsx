"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { submitContactForm, type ContactFormState } from "@/app/(site)/contact/actions";
import { Button } from "@/components/ui/button";
import { contactFormCopy, contactFormLimits } from "@/data/contact-form";

const inputClass =
  "min-h-11 w-full rounded-lg border border-hairline bg-surface px-4 py-2.5 text-base font-normal text-foreground-strong placeholder:text-muted-strong/70 outline-none transition hover:border-hairline-strong focus:border-primary focus:ring-2 focus:ring-primary/60 focus:ring-offset-1 focus:ring-offset-surface";

const labelClass = "grid content-start gap-2 text-sm font-semibold text-foreground-strong";

const errorClass = "text-sm font-semibold text-danger";

const initialState: ContactFormState = { status: "idle" };

type ContactFormProps = {
  fallbackEmail: string;
  contacts: { id: number; label: string }[];
  defaultContact: string;
};

export function ContactForm({ fallbackEmail, contacts, defaultContact }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const errors = state.status === "invalid" ? (state.errors ?? {}) : {};
  const values = state.values;
  const selectedContact = values?.contact ?? defaultContact;

  const fieldProps = (field: keyof typeof contactFormLimits) => ({
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    "aria-invalid": errors[field] ? true : undefined,
    defaultValue: values?.[field],
    maxLength: contactFormLimits[field],
    name: field,
  });

  const fieldError = (field: keyof typeof contactFormLimits) =>
    errors[field] ? (
      <span className={errorClass} id={`contact-${field}-error`}>
        {errors[field]}
      </span>
    ) : null;

  const mailto = (
    <a className="font-semibold text-primary-strong underline underline-offset-4" href={`mailto:${fallbackEmail}`}>
      {fallbackEmail}
    </a>
  );

  return (
    <form action={formAction} className="mt-9 grid gap-7 sm:grid-cols-2">
      {contacts.length > 0 ? (
        <label className={`${labelClass} sm:col-span-2`}>
          {contactFormCopy.contact.label}
          <select className={inputClass} defaultValue={selectedContact} key={selectedContact} name="contact">
            <option value="">{contactFormCopy.contact.fallbackOption}</option>
            {contacts.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.label}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <label className={labelClass}>
        Nom
        <input autoComplete="name" className={inputClass} placeholder="Votre nom" required {...fieldProps("name")} />
        {fieldError("name")}
      </label>
      <label className={labelClass}>
        Société
        <input
          autoComplete="organization"
          className={inputClass}
          placeholder="Nom de la société"
          {...fieldProps("company")}
        />
        {fieldError("company")}
      </label>
      <label className={labelClass}>
        Email
        <input
          autoComplete="email"
          className={inputClass}
          placeholder="name@company.com"
          required
          type="email"
          {...fieldProps("email")}
        />
        {fieldError("email")}
      </label>
      <label className={labelClass}>
        Téléphone
        <input autoComplete="tel" className={inputClass} placeholder="+33 ..." type="tel" {...fieldProps("phone")} />
        {fieldError("phone")}
      </label>
      <label className={`${labelClass} sm:col-span-2`}>
        Projet
        <textarea
          className={`${inputClass} min-h-32 resize-y`}
          placeholder="Présentez vos sites, vos contraintes et vos objectifs."
          required
          {...fieldProps("message")}
        />
        {fieldError("message")}
      </label>

      <div aria-hidden className="sr-only">
        <label>
          Ne pas remplir
          <input autoComplete="off" name="website" tabIndex={-1} type="text" />
        </label>
      </div>

      <div className="sm:col-span-2">
        <Button disabled={pending} size="lg" type="submit" variant="primary">
          {pending ? contactFormCopy.submitting : contactFormCopy.submit}
          <ArrowUpRight className="cta-arrow h-4 w-4" />
        </Button>
        <div aria-live="polite" role="status">
          {state.status === "sent" ? (
            <p className="mt-5 text-sm leading-7 text-foreground-strong">{contactFormCopy.sent}</p>
          ) : null}
          {state.status === "invalid" ? (
            <p className="mt-5 text-sm font-semibold leading-7 text-danger">{contactFormCopy.invalid}</p>
          ) : null}
          {state.status === "disabled" ? (
            <p className="mt-5 text-sm leading-7 text-foreground-strong">
              {contactFormCopy.disabled} {mailto}.
            </p>
          ) : null}
          {state.status === "error" ? (
            <p className="mt-5 text-sm font-semibold leading-7 text-danger">
              {contactFormCopy.error} {mailto}.
            </p>
          ) : null}
        </div>
        <p className="mt-5 text-xs leading-6 text-muted-strong">
          {contactFormCopy.privacy.lead}{" "}
          <Link className="underline underline-offset-4 hover:text-primary-strong" href={contactFormCopy.privacy.href}>
            {contactFormCopy.privacy.linkLabel}
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
