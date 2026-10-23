// N'accepte qu'un chemin interne au site, pour qu'un lien /edition ne puisse pas rediriger ailleurs.
export function safePath(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}
