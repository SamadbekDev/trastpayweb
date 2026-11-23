// Puts the latest bank news migrated from the old trustbank.uz (data/legacy/pages.json) into the
// home page «Новости банка» block of the CMS (content.news.items), linking to our /press-tsentr/news/… pages.
// Each card gets the news' first photo (resized to 768px webp and uploaded to the CMS media store).
//
//   node scripts/cms-news-from-legacy.mjs <path to dashboard-api/.env> [--apply] [--count 10]
//
// Dry run by default. Stops when the draft already has unpublished changes.
// The old site publishes news in Russian only, so uz/en titles stay empty and the site shows the ru title.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { openCms } from "./cms-lib.mjs";

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const COUNT = Number(args[args.indexOf("--count") + 1]) || 10;
const UPLOADS = "scripts/legacy/cms-media.json"; // source → CMS media URL (re-runs reuse uploads)

/* ── latest news from the migrated pages ── */
const MONTHS = ["янв", "фев", "мар", "апр", "ма", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const pages = JSON.parse(fs.readFileSync("data/legacy/pages.json", "utf8"));
const order = fs.readFileSync("scripts/legacy/urls3.txt", "utf8").split(/\r?\n/).map((u) => u.replace(/^\/ru\/|\/$/g, ""));
const news = [];
for (const [key, page] of Object.entries(pages)) {
  if (!key.startsWith("press_center/news/") || key.split("/").length !== 3) continue;
  // the first text block of a news page starts with its date: "20 ноя 2026"
  const text = (page.blocks || []).filter((b) => b.type === "text").flatMap((b) => b.paragraphs || []).join("\n");
  const m = text.match(/(\d{1,2})\s+([а-я]+)\.?\s+(\d{4})/i);
  if (!m) continue;
  const month = MONTHS.findIndex((p) => m[2].toLowerCase().startsWith(p));
  if (month < 0) continue;
  const photo = (page.blocks || []).find((b) => b.type === "gallery")?.images?.[0]?.src || "";
  news.push({ key, page, date: new Date(Date.UTC(+m[3], month, +m[1])), rank: order.indexOf(key), photo });
}
// newest first; same day → the order of the old site's list (urls3.txt)
news.sort((a, b) => b.date - a.date || a.rank - b.rank);
const pad = (n) => String(n).padStart(2, "0");
const picked = news.slice(0, COUNT);
console.log(`${news.length} migrated news, taking ${picked.length}:`);
for (const n of picked) console.log(`  ${n.date.toISOString().slice(0, 10)}  ${n.page.title.slice(0, 70)}  [${n.photo ? "photo" : "no photo"}]`);

const cms = await openCms(args[0]);
const content = cms.content;
console.log(`\nCMS has ${(content.news?.items || []).length} news now`);
if (!APPLY) { console.log("\ndry run — nothing uploaded or changed. Re-run with --apply."); process.exit(0); }

const items = [];
for (const { key, page, date, photo } of picked) {
  let image = "";
  // local copy mirrored by scripts/legacy/files.mjs (public/upload/…)
  const local = photo.startsWith("/") ? path.join("public", decodeURI(photo)) : "";
  if (local && fs.existsSync(local)) {
    const thumb = await sharp(local).rotate().resize({ width: 768, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
    image = await cms.upload(thumb, `news-${key.split("/").pop().slice(0, 40)}.webp`, "image/webp", UPLOADS, `news-thumb:${photo}`);
  }
  items.push({
    id: "legacy-" + key.split("/").pop().slice(0, 60),
    title: { ru: page.title, uz: "", en: "" },
    category: { ru: "Новости", uz: "Yangiliklar", en: "News" },
    date: `${pad(date.getUTCDate())}.${pad(date.getUTCMonth() + 1)}.${date.getUTCFullYear()}`,
    href: page.path,
    image,
  });
}
if (JSON.stringify(content.news?.items) === JSON.stringify(items)) { console.log("already up to date"); process.exit(0); }
content.news = { ...content.news, items };
await cms.saveAndPublish(content);
