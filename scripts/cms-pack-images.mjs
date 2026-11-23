// Replaces low-resolution CMS pictures with the designer's originals from the "Image for Samat" pack.
// Each entry: a path inside the CMS content → a pack file. Pictures are converted to webp
// (photos max 1600px wide, transparency kept), saved to public/images/pack/<section>/ and uploaded
// to the CMS media store; then the draft is saved and published.
//
//   node scripts/cms-pack-images.mjs <dashboard-api/.env> <pack folder> <section> [--apply]
//
// Sections: credits. Dry run by default. Stops when the draft already has unpublished changes.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { openCms } from "./cms-lib.mjs";

const [envFile, srcDir, section, flag] = process.argv.slice(2);
const APPLY = flag === "--apply";
const UPLOADS = "scripts/legacy/cms-media.json";

const MAPS = {
  credits: {
    // catalog cards
    "credits.products[id=adm-jizzakh].image": "autoloan-03.png",
    "credits.products[id=auto-new-used].image": "autoloan-01.png",
    "credits.products[id=ipoteka-minek].image": "credits-15.png",
    "credits.products[id=sharq-bahori].image": "credits-05.png",
    "credits.products[id=ipoteka-refinance].image": "mortgage-01.png",
    "credits.products[id=ozshahar].image": "credits-04.png",
    "credits.products[id=golden-house].image": "credits-03.png",
    "credits.products[id=ipoteka-bank].image": "mortgage-08.png",
    "credits.products[id=bez-dohoda].image": "mortgage-04.png",
    "credits.products[id=qulay].image": "microloan-05.png",
    "credits.products[id=micro-self].image": "microloan-06.png",
    "credits.products[id=micro-employment].image": "microloan-03.png",
    "credits.products[id=universal].image": "credits-07.png",
    // consumer-credit template
    "credits.pages.standard.related[0].image": "credits-06.png",
    "credits.pages.standard.related[1].image": "credits-07.png",
    "credits.pages.standard.related[2].image": "credits-08.png",
    "credits.pages.standard.infoImage": "mortgage-06.png",
    // mortgage template
    "credits.pages.mortgage.related[0].image": "credits-14.png",
    "credits.pages.mortgage.related[1].image": "mortgage-06.png",
    "credits.pages.mortgage.related[2].image": "credits-06.png",
    "credits.pages.mortgage.heroImage": "mortgage-01.png", // Figma: a photo of the building
    "credits.pages.mortgage.stepsBannerImage": "mortgage-04.png", // Figma: cut-out buildings on the brown banner
    "credits.pages.mortgage.infoImage": "credits-14.png",
    "credits.pages.mortgage.requirementsImage": "credits-13.png",
    // car-loan template + dealer (brand page) pictures
    "credits.pages.auto.heroImage": "autoloan-01.png",
    "credits.pages.auto.infoImage": "autoloan-01.png",
    "credits.pages.auto.stepsBannerImage": "autoloan-07.png",
    "credits.pages.auto.requirementsImage": "autoloan-02.png",
    "credits.pages.auto.dealers[0].image": "credits-16.png",
    "credits.pages.auto.dealers[1].image": "credits-17.png",
    "credits.pages.auto.dealers[2].image": "credits-18.png",
    "credits.pages.auto.dealers[3].image": "credits-19.png",
    "credits.pages.auto.dealers[4].image": "credits-20.png",
    // microloan template
    "credits.pages.micro.stepsBannerImage": "microloan-06.png",
    "credits.pages.micro.infoImage": "mortgage-06.png",
    "credits.pages.micro.requirementsImage": "microloan-04.png",
  },
};

/** resolve "a.b[0].c" / "a.list[id=x].c" → [parent object, key] */
function locate(root, p) {
  const parts = p.match(/[^.[\]]+|\[[^\]]+\]/g);
  let cur = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const t = parts[i];
    if (t.startsWith("[")) {
      const inner = t.slice(1, -1);
      cur = inner.startsWith("id=") ? cur?.find?.((x) => x?.id === inner.slice(3)) : cur?.[Number(inner)];
    } else cur = cur?.[t];
    if (cur == null) return null;
  }
  return [cur, parts.at(-1)];
}

const map = MAPS[section];
if (!map) { console.log("unknown section", section); process.exit(1); }
const cms = await openCms(envFile);
const content = cms.content;

const plan = [];
for (const [p, file] of Object.entries(map)) {
  const loc = locate(content, p);
  if (!loc || !(loc[1] in loc[0])) { console.log("  not found:", p); continue; }
  if (!fs.existsSync(path.join(srcDir, file))) { console.log("  no file:", file); continue; }
  plan.push({ p, file, loc, from: String(loc[0][loc[1]] || "").slice(-24) });
}
for (const x of plan) console.log(`${x.file.padEnd(16)} → ${x.p}   (was …${x.from})`);
if (!APPLY) { console.log(`\n${plan.length} pictures — dry run, nothing changed. Re-run with --apply.`); process.exit(0); }

const OUT = `public/images/pack/${section}`;
fs.mkdirSync(OUT, { recursive: true });
const urls = {};
for (const file of [...new Set(plan.map((x) => x.file))]) {
  const src = sharp(path.join(srcDir, file));
  const meta = await src.metadata();
  const buf = await (meta.hasAlpha ? src.trim() : src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82, alphaQuality: 90 }).toBuffer();
  const name = file.replace(/\.png$/, ".webp");
  fs.writeFileSync(path.join(OUT, name), buf);
  urls[file] = await cms.upload(buf, name, "image/webp", UPLOADS, `pack:${file}:${buf.length}`);
}
for (const x of plan) x.loc[0][x.loc[1]] = urls[x.file];
await cms.saveAndPublish(content);
