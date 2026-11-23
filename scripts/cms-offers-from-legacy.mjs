// Adds the promo slides of the old trustbank.uz home page (/ru/private/ «promo» slider, texts in ru/uz/en)
// to the home page «Предложения для вас» block of the CMS (content.offers.slides).
//
//   node scripts/cms-offers-from-legacy.mjs <path to dashboard-api/.env> [--apply]
//
// The old pictures are cut-outs on a transparent background (phones, a car, an ATM), while our offer cards
// are full-bleed pictures with white text on top. So each one is placed on a brand gradient
// (680×760 = the 340×380 card at 2×, upper part left free for the text) and saved to public/images/offers.
// Slides already present (same id) are left alone; existing slides linking to "#" get real pages.
// Dry run by default. Stops when the draft already has unpublished changes.
import crypto from "node:crypto";
import fs from "node:fs";
import sharp from "sharp";
import { openCms } from "./cms-lib.mjs";

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const OUT = "public/images/offers";
const UPLOADS = "scripts/legacy/cms-media.json";
const OLD = "https://trustbank.uz";

const L = (ru, uz, en) => ({ ru, uz, en });
const SLIDES = [
  {
    id: "legacy-trastpay",
    src: "/upload/iblock/b0c/2zzl3hd9b1xijvywfdsfxw0gh84fh3w4/800kh750-rus.png",
    gradient: ["#2F6BF0", "#10357F"],
    tag: L("Всегда рядом", "Har doim yaqin", "Always near"),
    title: L(
      "Пользуйтесь услугами банка онлайн через Trastpay",
      "Trastpay ilovasida bank xizmatlaridan onlayn foydalaning",
      "Bank online with Trastpay"
    ),
    ctaText: L("Подробнее", "Batafsil", "Details"),
    href: "/servisy/internet-banking/trustpay",
  },
  {
    id: "legacy-autocredit",
    src: "/upload/iblock/308/u4c5o2cvyhr5pju5rnxvnn4iu3xzxlfn/Trastbank_slider_BYD.webp",
    gradient: ["#1E88C8", "#0B3A66"],
    tag: L("Автокредит", "Avtokredit", "Auto loan"),
    title: L("от 21% до 60 месяцев", "21 % dan boshlab 60 oygacha", "from 21% up to 60 months"),
    ctaText: L("Подробнее", "Batafsil", "Details"),
    href: "/kredity/auto-new-used",
  },
  {
    id: "legacy-atm",
    src: "/upload/iblock/7b8/2uxhba2jqoc63x4w4rzcp8g003cdzesu/trust.jpg",
    gradient: ["#3B4FD8", "#1A1F5C"],
    tag: L("Обменивайте валюту выгодно", "Valyutangizni foyda bilan almashtiring", "Exchange currency profitably"),
    title: L("Многофункциональные банкоматы", "Ko‘pfunksional bankomatlar", "Multifunctional ATM"),
    ctaText: L("Подробнее", "Batafsil", "Details"),
    href: "/valyuta",
  },
];
/** Existing demo slides that still link to "#" */
const HREF_FIX = { o1: "/vklady", o2: "/zayavki" };

async function compose(slide) {
  const res = await fetch(OLD + slide.src);
  if (!res.ok) throw new Error(`${slide.src}: ${res.status}`);
  const W = 680, H = 760;
  const [from, to] = slide.gradient;
  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
      `<stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>` +
      `<radialGradient id="r" cx="0.75" cy="0.8" r="0.6"><stop offset="0" stop-color="#fff" stop-opacity="0.22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>` +
      `<rect width="${W}" height="${H}" fill="url(#g)"/><rect width="${W}" height="${H}" fill="url(#r)"/></svg>`
  );
  const src = Buffer.from(await res.arrayBuffer());
  const layers = [];
  if ((await sharp(src).metadata()).hasAlpha) {
    // cut-out: trim the transparent margin, fit into the lower part of the card (text sits above it)
    const cut = await sharp(src).trim().resize({ width: 560, height: 470, fit: "inside" }).png().toBuffer();
    const m = await sharp(cut).metadata();
    layers.push({ input: cut, left: W - m.width - 24, top: H - m.height - 24 });
  } else {
    // a photo on its own background (the ATM): show it as a rounded tile with a soft shadow
    const tw = 380, th = 440, r = 28;
    const photo = await sharp(src).resize({ width: tw, height: th, fit: "cover" }).png().toBuffer();
    const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${tw}" height="${th}"><rect width="${tw}" height="${th}" rx="${r}"/></svg>`);
    const tile = await sharp(photo).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
    const shadow = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${tw + 80}" height="${th + 80}"><rect x="40" y="52" width="${tw}" height="${th}" rx="${r}" fill="#000" fill-opacity="0.35"/></svg>`)).blur(18).png().toBuffer();
    const left = W - tw - 40, top = H - th - 40;
    layers.push({ input: shadow, left: left - 40, top: top - 40 }, { input: tile, left, top });
  }
  return sharp(bg).composite(layers).webp({ quality: 84 }).toBuffer();
}

const cms = await openCms(args[0]);
const content = cms.content;
const slides = content.offers?.slides || [];
const missing = SLIDES.filter((s) => !slides.some((x) => x.id === s.id));
const fixes = slides.filter((s) => HREF_FIX[s.id] && (!s.href || s.href === "#"));
console.log(`CMS has ${slides.length} offers: ${slides.map((s) => s.title?.ru).join(" | ")}`);
console.log(`to add: ${missing.map((s) => s.title.ru).join(" | ") || "—"}`);
console.log(`links to fix: ${fixes.map((s) => `${s.id} → ${HREF_FIX[s.id]}`).join(", ") || "—"}`);
if (!APPLY) { console.log("\ndry run — nothing uploaded or changed (pictures are rebuilt on --apply)."); process.exit(0); }

// Pictures are rebuilt every run; the upload cache is keyed by content, so only changed pictures are
// uploaded again, and only this script's slides get their picture replaced.
fs.mkdirSync(OUT, { recursive: true });
let changed = fixes.length;
for (const s of SLIDES) {
  const file = `${OUT}/${s.id.replace(/^legacy-/, "")}.webp`;
  const buf = await compose(s);
  fs.writeFileSync(file, buf);
  const hash = crypto.createHash("sha1").update(buf).digest("hex").slice(0, 12);
  const image = await cms.upload(buf, file.split("/").pop(), "image/webp", UPLOADS, `offer:${file}:${hash}`);
  const existing = slides.find((x) => x.id === s.id);
  if (!existing) {
    slides.push({ id: s.id, tag: s.tag, title: s.title, image, ctaText: s.ctaText, href: s.href, backgroundColor: s.gradient[1] });
    changed++;
  } else if (existing.image !== image) {
    existing.image = image;
    changed++;
  }
}
for (const s of fixes) s.href = HREF_FIX[s.id];
if (!changed) { console.log("already up to date"); process.exit(0); }
content.offers = { ...content.offers, slides };
await cms.saveAndPublish(content);
