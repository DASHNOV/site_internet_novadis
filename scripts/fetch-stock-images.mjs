// Télécharge les photos Unsplash du site et leur applique l'étalonnage commun
// (froid, légèrement désaturé, voile bleu Novadis) avant export en WebP.
// Sources et licences : docs/CONTENT.md › Crédits médias.
//
//   node scripts/fetch-stock-images.mjs            → tout le manifeste
//   node scripts/fetch-stock-images.mjs erp.webp   → uniquement les sorties qui contiennent ce texte

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const OUT_ROOT = resolve(process.cwd(), "public/novadis/images");
const WIDTH = 1800;

const manifest = [
  { id: "atYoXjIr8qY", out: "secteurs/tertiaire.webp" },
  { id: "pWUyHVJgLhg", out: "secteurs/industrie.webp" },
  { id: "c_4eaGRDSVU", out: "secteurs/logistique.webp" },
  { id: "VuR4oHZ3ucc", out: "secteurs/sites-sensibles.webp" },
  { id: "8lQ252pO1xM", out: "secteurs/multi-sites.webp" },
  { id: "CCexwt3Rl4A", out: "secteurs/erp.webp" },
  { id: "aWslrFhs1w4", out: "stock/datacenter.webp" },
  { id: "a40akJxBhT8", out: "stock/mat-cameras.webp" },
  { id: "qB8tpVXQh6Y", out: "stock/clavier-acces.webp" },
  { id: "xYCBw1uIP_M", out: "stock/etude-plan.webp" },
  { id: "05gac-Qn0k4", out: "stock/reunion-projet.webp" },
  { id: "TtMKq3lJm-U", out: "stock/salle-supervision.webp" },
  { id: "pDtgBIGa0cM", out: "stock/camera-videosurveillance.webp" },
  { id: "SRFG7iwktDk", out: "stock/biometrie-empreinte.webp" },
  { id: "CSMbdyGa8mE", out: "clients/casino-monaco.webp", grade: false },
];

// Les sites clients restent fidèles à la réalité : pas de voile coloré.
async function grade(input, enabled) {
  const base = sharp(input).rotate().resize({ width: WIDTH, height: 1350, fit: "inside", withoutEnlargement: true });
  if (!enabled) return base.modulate({ saturation: 0.92 });
  const { data, info } = await base
    .modulate({ saturation: 0.8, brightness: 1.03 })
    .toBuffer({ resolveWithObject: true });
  const veil = await sharp({
    create: { width: info.width, height: info.height, channels: 4, background: { r: 18, g: 145, b: 206, alpha: 0.12 } },
  })
    .png()
    .toBuffer();
  return sharp(data).composite([{ input: veil, blend: "soft-light" }]).linear(1.04, -4);
}

const filter = process.argv[2];
for (const { id, out, grade: withGrade = true } of manifest) {
  if (filter && !out.includes(filter)) continue;
  const res = await fetch(`https://unsplash.com/photos/${id}/download?w=${WIDTH * 1.2}`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) {
    console.error(`FAIL  ${out} (${id}) → HTTP ${res.status}`);
    continue;
  }
  const target = resolve(OUT_ROOT, out);
  await mkdir(dirname(target), { recursive: true });
  const image = await grade(Buffer.from(await res.arrayBuffer()), withGrade);
  const info = await image.webp({ quality: 78, effort: 5 }).toFile(target);
  console.log(`OK    ${out}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} Ko`);
}
