"use client";

// Édition dans la page : chargé uniquement en mode édition (/edition), jamais pour les visiteurs.
// Les textes portent une signature invisible (lib/content/stega.ts) qui donne le champ CMS à modifier.
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { cleanText, decodeImageTarget, decodeTarget, encodeTarget, hasTarget, type EditTarget } from "@/lib/content/stega";

type TextEntry = { kind: "text"; node: Text; target: EditTarget; value: string; anchor: Element };
type ImageEntry = { kind: "image"; node: HTMLImageElement; target: EditTarget; anchor: Element };
type Entry = TextEntry | ImageEntry;
type Field = { label: string; maxLength?: number; multiline: boolean; type: "text" | "image" };
type Status = {
  user: { name: string; role: string };
  canPublish: boolean;
  pending: { label: string }[];
};

const ROLE_LABELS: Record<string, string> = { redacteur: "Rédacteur", publieur: "Publieur", admin: "Administrateur" };
const UI = "[data-cms-ui]";

function caretNode(x: number, y: number): Node | null {
  const doc = document as Document & {
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node } | null;
    caretRangeFromPoint?: (x: number, y: number) => Range | null;
  };
  return doc.caretPositionFromPoint?.(x, y)?.offsetNode ?? doc.caretRangeFromPoint?.(x, y)?.startContainer ?? null;
}

// Textes signés de la page : relus à chaque changement du DOM (rafraîchissement, animations).
function scan(): Map<Text, TextEntry> {
  const entries = new Map<Text, TextEntry>();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node as Text;
    if (!hasTarget(text.data) || text.parentElement?.closest(UI)) continue;
    const target = decodeTarget(text.data);
    if (target) entries.set(text, { kind: "text", node: text, target, value: cleanText(text.data), anchor: text.parentElement! });
  }
  return entries;
}

// Élément visé : l'image signée, le texte signé sous le curseur, ou l'unique texte signé d'un bloc proche
// (un titre en deux tons dont seule la seconde partie porte la signature, par exemple).
function resolve(x: number, y: number, target: EventTarget | null, entries: Map<Text, TextEntry>): Entry | null {
  if (!(target instanceof Element) || target.closest(UI)) return null;
  if (target instanceof HTMLImageElement) {
    const imageTarget = decodeImageTarget(target.currentSrc || target.src);
    if (imageTarget) return { kind: "image", node: target, target: imageTarget, anchor: target };
  }
  const caret = caretNode(x, y);
  if (caret instanceof Text && entries.has(caret)) return entries.get(caret)!;

  let element: Element | null = caret?.parentElement ?? target;
  for (let depth = 0; element && depth < 3 && element !== document.body; depth++, element = element.parentElement) {
    const inside = [...entries.values()].filter((entry) => element!.contains(entry.node));
    if (inside.length === 1) return { ...inside[0], anchor: element };
    if (inside.length > 1) return null;
  }
  return null;
}

export function EditMode() {
  const router = useRouter();
  const pathname = usePathname();
  const entries = useRef(new Map<Text, TextEntry>());
  const [mode, setMode] = useState<"edit" | "browse">("edit");
  const [hover, setHover] = useState<{ rect: DOMRect; kind: Entry["kind"] } | null>(null);
  const [editing, setEditing] = useState<Entry | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const refreshStatus = useCallback(async () => {
    const response = await fetch("/edition/etat", { cache: "no-store" });
    if (response.ok) setStatus(await response.json());
    else setMessage("Session expirée : reconnectez-vous depuis l'admin.");
  }, []);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  // Les messages de confirmation s'effacent pour laisser voir le nombre de brouillons en attente.
  useEffect(() => {
    if (!message || message.endsWith("…")) return;
    const timer = window.setTimeout(() => setMessage(null), 4000);
    return () => window.clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    let timer = 0;
    const rescan = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => (entries.current = scan()), 150);
    };
    rescan();
    const observer = new MutationObserver(rescan);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (mode !== "edit" || editing) {
      setHover(null);
      return;
    }
    let frame = 0;
    const onMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const entry = resolve(event.clientX, event.clientY, event.target, entries.current);
        setHover(entry ? { rect: entry.anchor.getBoundingClientRect(), kind: entry.kind } : null);
      });
    };
    const onClick = (event: MouseEvent) => {
      const entry = resolve(event.clientX, event.clientY, event.target, entries.current);
      if (!entry) return;
      event.preventDefault();
      event.stopPropagation();
      setEditing(entry);
    };
    const onScroll = () => setHover(null);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("click", onClick, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mode, editing]);

  const saved = useCallback(
    async (text: string) => {
      setEditing(null);
      setMessage(text);
      router.refresh();
      await refreshStatus();
    },
    [refreshStatus, router],
  );

  const publish = async () => {
    setMessage("Publication en cours…");
    const response = await fetch("/edition/publier", { method: "POST" });
    const result = await response.json();
    setMessage(
      response.ok
        ? "Modifications publiées : le site public est à jour."
        : result.error ?? `Publication refusée pour : ${result.failed?.join(", ")}`,
    );
    router.refresh();
    await refreshStatus();
  };

  const pending = status?.pending.length ?? 0;

  return (
    <div data-cms-ui="">
      {hover && (
        <div
          aria-hidden
          className="pointer-events-none fixed z-[90] rounded-md outline outline-2 outline-offset-4 outline-primary"
          style={{ left: hover.rect.left, top: hover.rect.top, width: hover.rect.width, height: hover.rect.height }}
        >
          <span className="absolute -top-8 left-0 whitespace-nowrap rounded-md bg-primary px-2 py-0.5 font-sans text-xs font-semibold text-white">
            {hover.kind === "image" ? "Remplacer l'image" : "Modifier le texte"}
          </span>
        </div>
      )}

      {editing?.kind === "text" && <TextEditor entry={editing} onCancel={() => setEditing(null)} onSaved={saved} />}
      {editing?.kind === "image" && <ImageEditor entry={editing} onCancel={() => setEditing(null)} onSaved={saved} />}

      <div className="fixed inset-x-0 bottom-4 z-[95] flex justify-center px-4">
        <div className="flex max-w-full flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-hairline-strong bg-surface px-4 py-3 text-sm text-foreground-strong shadow-overlay">
          <span className="flex items-center gap-2 font-semibold">
            <span aria-hidden className="h-2 w-2 rounded-full bg-primary" />
            Mode édition
            {status && (
              <span className="font-normal text-muted-strong">
                · {status.user.name} ({ROLE_LABELS[status.user.role] ?? status.user.role})
              </span>
            )}
          </span>

          <div className="flex rounded-lg border border-hairline p-0.5" role="group" aria-label="Action au clic">
            {(["edit", "browse"] as const).map((value) => (
              <button
                className={cn(
                  "rounded-md px-3 py-1 font-medium transition-colors",
                  mode === value ? "bg-primary text-white" : "text-muted-strong hover:text-foreground-strong",
                )}
                key={value}
                onClick={() => setMode(value)}
                type="button"
              >
                {value === "edit" ? "Modifier" : "Naviguer"}
              </button>
            ))}
          </div>

          <span className="text-muted-strong" title={status?.pending.map((item) => item.label).join(", ")}>
            {message ??
              (pending
                ? `${pending} contenu${pending > 1 ? "s" : ""} en brouillon`
                : "Aucune modification en attente")}
          </span>

          {status?.canPublish ? (
            <button
              className="rounded-lg bg-primary px-3 py-1.5 font-semibold text-white disabled:opacity-40"
              disabled={!pending}
              onClick={publish}
              type="button"
            >
              Publier{pending ? ` (${pending})` : ""}
            </button>
          ) : (
            status && <span className="text-muted-strong">Le responsable commercial publiera vos modifications.</span>
          )}

          <a className="font-medium text-primary-strong hover:underline" href="/admin" target="_blank" rel="noreferrer">
            Admin
          </a>
          <a className="font-medium text-muted-strong hover:text-foreground-strong" href={`/edition/quitter?page=${encodeURIComponent(pathname)}`}>
            Quitter
          </a>
        </div>
      </div>
    </div>
  );
}

// Panneau sous l'élément modifié, ou au-dessus s'il manque de place (la barre d'édition occupe le bas).
function usePanelPosition(anchor: Element) {
  const panel = useRef<HTMLDivElement>(null);
  const rect = anchor.getBoundingClientRect();
  const width = Math.min(Math.max(rect.width, 360), 560, window.innerWidth - 32);
  const left = Math.min(Math.max(rect.left, 16), window.innerWidth - width - 16);
  const [top, setTop] = useState(rect.bottom + 12);

  useLayoutEffect(() => {
    const height = panel.current?.offsetHeight ?? 0;
    const bottomLimit = window.innerHeight - 96;
    if (rect.bottom + 12 + height <= bottomLimit) setTop(rect.bottom + 12);
    else if (rect.top - 12 - height >= 16) setTop(rect.top - 12 - height);
    else setTop(Math.max(16, bottomLimit - height));
  }, [rect.bottom, rect.top]);

  return { ref: panel, style: { left, top, width } };
}

async function saveValue(target: EditTarget, value: string | number) {
  const response = await fetch("/edition/enregistrer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ target, value }),
  });
  if (response.ok) return null;
  return ((await response.json()) as { error?: string }).error ?? "Enregistrement refusé.";
}

function TextEditor({ entry, onCancel, onSaved }: { entry: TextEntry; onCancel: () => void; onSaved: (message: string) => void }) {
  const [field, setField] = useState<Field | null>(null);
  const [value, setValue] = useState(entry.value);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const panel = usePanelPosition(entry.anchor);
  const original = useRef(entry.node.data);
  const signature = useRef(encodeTarget(entry.target));

  useEffect(() => {
    fetch("/edition/champ", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(entry.target) })
      .then((response) => response.json())
      .then((result) => (result.error ? setError(result.error) : setField(result)));
  }, [entry.target]);

  // Aperçu dans la page pendant la frappe ; le texte d'origine revient si on annule.
  useEffect(() => {
    const node = entry.node;
    if (node.isConnected) node.data = value + signature.current;
  }, [entry.node, value]);

  const cancel = () => {
    if (entry.node.isConnected) entry.node.data = original.current;
    onCancel();
  };

  const save = async () => {
    if (value === entry.value) return cancel();
    setSaving(true);
    const failure = await saveValue(entry.target, value);
    setSaving(false);
    if (failure) setError(failure);
    else onSaved("Brouillon enregistré.");
  };

  const onKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "Escape") cancel();
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      save();
    }
  };

  const tooLong = field?.maxLength !== undefined && value.length > field.maxLength;

  return (
    <div
      className="fixed z-[100] rounded-xl border border-hairline-strong bg-surface p-4 text-sm text-foreground-strong shadow-overlay"
      ref={panel.ref}
      style={panel.style}
    >
      <p className="font-semibold">{field?.label ?? "Texte"}</p>
      <textarea
        autoFocus
        className="mt-3 w-full resize-y rounded-lg border border-hairline bg-background px-3 py-2 text-base leading-6 text-foreground-strong outline-none focus:border-primary"
        onChange={(event) => setValue(event.target.value.replace(/\n/g, " "))}
        onKeyDown={onKeyDown}
        rows={field?.multiline ? 5 : 2}
        value={value}
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <span className={cn("tabular text-xs", tooLong ? "font-semibold text-danger" : "text-muted-strong")}>
          {value.length}
          {field?.maxLength ? ` / ${field.maxLength}` : ""} caractères
        </span>
        <span className="flex gap-2">
          <button className="rounded-lg px-3 py-1.5 font-medium text-muted-strong hover:text-foreground-strong" onClick={cancel} type="button">
            Annuler (Échap)
          </button>
          <button
            className="rounded-lg bg-primary px-3 py-1.5 font-semibold text-white disabled:opacity-40"
            disabled={saving || tooLong || !value.trim()}
            onClick={save}
            type="button"
          >
            {saving ? "Enregistrement…" : "Enregistrer (Entrée)"}
          </button>
        </span>
      </div>
      {error && <p className="mt-2 text-danger">{error}</p>}
    </div>
  );
}

function ImageEditor({ entry, onCancel, onSaved }: { entry: ImageEntry; onCancel: () => void; onSaved: (message: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState(cleanText(entry.node.alt));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const panel = usePanelPosition(entry.anchor);
  const preview = file ? URL.createObjectURL(file) : entry.node.currentSrc || entry.node.src;

  const save = async () => {
    if (!file || !alt.trim()) return;
    setSaving(true);
    const form = new FormData();
    form.append("file", file);
    form.append("_payload", JSON.stringify({ alt }));
    const upload = await fetch("/api/media", { method: "POST", body: form });
    const result = await upload.json();
    const failure = upload.ok ? await saveValue(entry.target, result.doc.id) : result.errors?.[0]?.message ?? "Envoi de l'image refusé.";
    setSaving(false);
    if (failure) setError(failure);
    else onSaved("Image remplacée en brouillon.");
  };

  return (
    <div
      className="fixed z-[100] rounded-xl border border-hairline-strong bg-surface p-4 text-sm text-foreground-strong shadow-overlay"
      onKeyDown={(event) => event.key === "Escape" && onCancel()}
      ref={panel.ref}
      style={panel.style}
    >
      <p className="font-semibold">Remplacer l&apos;image</p>
      <img alt="" className="mt-3 aspect-[16/9] w-full rounded-lg border border-hairline object-cover" src={preview} />
      <input
        accept="image/*"
        autoFocus
        className="mt-3 block w-full text-sm"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        type="file"
      />
      <label className="mt-3 grid gap-1 font-medium">
        Texte alternatif (décrit l&apos;image)
        <input
          className="rounded-lg border border-hairline bg-background px-3 py-2 font-normal outline-none focus:border-primary"
          onChange={(event) => setAlt(event.target.value)}
          value={alt}
        />
      </label>
      <div className="mt-3 flex justify-end gap-2">
        <button className="rounded-lg px-3 py-1.5 font-medium text-muted-strong hover:text-foreground-strong" onClick={onCancel} type="button">
          Annuler
        </button>
        <button
          className="rounded-lg bg-primary px-3 py-1.5 font-semibold text-white disabled:opacity-40"
          disabled={saving || !file || !alt.trim()}
          onClick={save}
          type="button"
        >
          {saving ? "Envoi…" : "Remplacer"}
        </button>
      </div>
      {error && <p className="mt-2 text-danger">{error}</p>}
    </div>
  );
}
