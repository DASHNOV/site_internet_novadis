"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

const inputClass =
  "min-h-11 w-full rounded-lg border border-hairline bg-surface px-4 py-2.5 text-base font-normal text-foreground-strong outline-none transition hover:border-hairline-strong focus:border-primary focus:ring-2 focus:ring-primary/60 focus:ring-offset-1 focus:ring-offset-surface";
const labelClass = "grid gap-2 text-sm font-semibold text-foreground-strong";

type LoginFormProps = { page: string; prefill: { email: string; password: string } | null };

export function LoginForm({ page, prefill }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSending(true);
    setError(null);
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });
    if (response.ok) {
      window.location.assign(`/edition?page=${encodeURIComponent(page)}`);
      return;
    }
    setSending(false);
    setError(response.status === 429 ? "Trop de tentatives : réessayez dans quelques minutes." : "Email ou mot de passe incorrect.");
  };

  return (
    <form className="mt-8 grid gap-5" onSubmit={submit}>
      <label className={labelClass}>
        Email
        <input autoComplete="email" className={inputClass} defaultValue={prefill?.email} name="email" required type="email" />
      </label>
      <label className={labelClass}>
        Mot de passe
        <input
          autoComplete="current-password"
          className={inputClass}
          defaultValue={prefill?.password}
          name="password"
          required
          type="password"
        />
      </label>
      {error && (
        <p className="text-sm font-semibold text-danger" role="alert">
          {error}
        </p>
      )}
      <Button disabled={sending} type="submit">
        {sending ? "Connexion…" : "Se connecter"}
      </Button>
    </form>
  );
}
