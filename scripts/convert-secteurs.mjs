import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(process.cwd());
const PAPIERS_DIR = resolve(ROOT, "_sources/00-Visuels/01-Images/Papiers peints");
const OUT_DIR = resolve(ROOT, "public/novadis/images/secteurs");

const mappings = [
  { contains: "Office.png", out: "tertiaire.webp" },
  { contains: "Night.png", out: "logistique.webp" },
  { contains: "IGH.png", out: "sites-sensibles.webp" },
  { contains: "Paris.png", out: "multi-sites.webp" },
  { contains: "Public.png", out: "erp.webp" },
];

const subdirs = await readdir(PAPIERS_DIR, { withFileTypes: true });
const oneScreenDir = subdirs.find((d) => d.isDirectory() && d.name.includes("1 Ecran") && d.name.includes("1920"));
if (!oneScreenDir) throw new Error("Source directory not found");
const sourceDir = resolve(PAPIERS_DIR, oneScreenDir.name);
const files = await readdir(sourceDir);

await mkdir(OUT_DIR, { recursive: true });

for (const { contains, out } of mappings) {
  const match = files.find((f) => f.endsWith(contains) && !f.includes("IGH 2") && !f.includes("Office 2") && !f.includes("Paris 2"));
  if (!match) {
    console.error(`MISS  ${out} (no file ending with ${contains})`);
    continue;
  }
  const input = resolve(sourceDir, match);
  const output = resolve(OUT_DIR, out);
  const info = await sharp(input)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(output);
  console.log(`${out.padEnd(25)} ${(info.size / 1024).toFixed(0)} KB  (from ${match})`);
}
