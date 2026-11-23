// Replaces the card pictures in the CMS with the designer's high-resolution, transparent versions
// ("Image for Samat" pack, cards-NN.png): converted to webp (max 840px wide, alpha kept), saved to
// public/images/cards/<id>.webp and uploaded to the CMS media store. Every place that used the old
// picture of a card (catalog, card page hero, «похожие карты») gets the new URL.
//
//   node scripts/cms-card-images.mjs <dashboard-api/.env> <folder with cards-NN.png> [--apply]
//
// Dry run by default. Stops when the draft already has unpublished changes.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { openCms } from "./cms-lib.mjs";

const [envFile, srcDir, flag] = process.argv.slice(2);
const APPLY = flag === "--apply";
const OUT = "public/images/cards";
const UPLOADS = "scripts/legacy/cms-media.json";

/** card id (CMS) → file of the pack */
const MAP = {
  "visa-infinity": "cards-01.png",
  visa: "cards-02.png",
  maksadli: "cards-06.png",
  "maksadli-2": "cards-04.png",
  "debit-extra": "cards-13.png",
  "kulay-1": "cards-05.png",
  "kulay-2": "cards-03.png",
  "kulay-3": "cards-07.png",
  istiklol: "cards-08.png",
};

const cms = await openCms(envFile);
const content = cms.content;

/* the card products (content.cards.products — deposits reuse ids like «maksadli», «istiklol») */
const found = {};
for (const p of content.cards?.products || []) {
  if (MAP[p.id] && typeof p.image === "string" && p.image) found[p.id] = p.image;
}
for (const id of Object.keys(MAP)) console.log(`${id.padEnd(14)} ${MAP[id]}  ←  ${found[id] || "(not found in CMS)"}`);
if (!APPLY) { console.log("\ndry run — nothing converted, uploaded or changed. Re-run with --apply."); process.exit(0); }

fs.mkdirSync(OUT, { recursive: true });
const replace = new Map(); // old URL → new URL
for (const [id, file] of Object.entries(MAP)) {
  if (!found[id]) continue;
  const buf = await sharp(path.join(srcDir, file)).trim().resize({ width: 840, withoutEnlargement: true }).webp({ quality: 86, alphaQuality: 90 }).toBuffer();
  fs.writeFileSync(path.join(OUT, `${id}.webp`), buf);
  const url = await cms.upload(buf, `card-${id}.webp`, "image/webp", UPLOADS, `card:${file}:${buf.length}`);
  replace.set(found[id], url);
}

/* swap the old URLs everywhere in the content */
let swaps = 0;
const swap = (v) => {
  if (Array.isArray(v)) return v.map(swap);
  if (v && typeof v === "object") { for (const k of Object.keys(v)) v[k] = swap(v[k]); return v; }
  if (typeof v === "string" && replace.has(v)) { swaps++; return replace.get(v); }
  return v;
};
swap(content);
console.log(`replaced ${swaps} references`);
await cms.saveAndPublish(content);
