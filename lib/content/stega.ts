// Signature invisible des textes en mode édition : chaque texte venant du CMS se termine par son adresse
// (document et chemin du champ), écrite en caractères de largeur nulle. Le script d'édition la relit
// dans la page pour savoir quel champ modifier. Les visiteurs ne reçoivent jamais ces signatures.

export type EditTarget =
  | { kind: "global"; slug: string; path: string }
  | { kind: "collection"; collection: string; id: number | string; path: string };

const START = "﻿";
const DIGITS = ["​", "‌", "‍", "⁠"];
const MARK = /﻿([​‌‍⁠]+)/;
const MARKS = /﻿[​‌‍⁠]+/g;

export function encodeTarget(target: EditTarget) {
  const bytes = new TextEncoder().encode(JSON.stringify(target));
  let out = START;
  for (const byte of bytes) {
    for (let shift = 6; shift >= 0; shift -= 2) out += DIGITS[(byte >> shift) & 3];
  }
  return out;
}

export function decodeTarget(text: string): EditTarget | null {
  const match = MARK.exec(text);
  if (!match) return null;
  const digits = [...match[1]].map((char) => DIGITS.indexOf(char));
  const bytes = new Uint8Array(Math.floor(digits.length / 4));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = (digits[i * 4] << 6) | (digits[i * 4 + 1] << 4) | (digits[i * 4 + 2] << 2) | digits[i * 4 + 3];
  }
  try {
    return JSON.parse(new TextDecoder().decode(bytes)) as EditTarget;
  } catch {
    return null;
  }
}

export const cleanText = (text: string) => text.replace(MARKS, "");

export const hasTarget = (text: string) => text.includes(START);

// Les images portent leur adresse dans un paramètre d'URL, ignoré par le serveur de fichiers.
export const IMAGE_PARAM = "cms-edit";

export function encodeImageTarget(url: string, target: EditTarget) {
  const value = btoa(unescape(encodeURIComponent(JSON.stringify(target))));
  return `${url}${url.includes("?") ? "&" : "?"}${IMAGE_PARAM}=${encodeURIComponent(value)}`;
}

export function decodeImageTarget(url: string): EditTarget | null {
  const value = new URL(url, "http://local").searchParams.get(IMAGE_PARAM);
  if (!value) return null;
  try {
    return JSON.parse(decodeURIComponent(escape(atob(value)))) as EditTarget;
  } catch {
    return null;
  }
}
