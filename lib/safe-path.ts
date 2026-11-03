const ORIGIN = "http://site.invalid";

// Vrai seulement pour un chemin interne au site. Le navigateur lit « /\evil » ou « /<tab>/evil » comme
// une autre origine : on laisse donc l'analyseur d'URL trancher plutôt qu'un simple préfixe.
export function isInternalPath(value: unknown): value is string {
  // eslint-disable-next-line no-control-regex
  if (typeof value !== "string" || !value.startsWith("/") || /[\u0000-\u001f\u007f]/.test(value)) return false;
  try {
    return new URL(value, ORIGIN).origin === ORIGIN;
  } catch {
    return false;
  }
}

// N'accepte qu'un chemin interne au site, pour qu'un lien /edition ne puisse pas rediriger ailleurs.
export function safePath(value: string | null) {
  return isInternalPath(value) ? value : "/";
}
