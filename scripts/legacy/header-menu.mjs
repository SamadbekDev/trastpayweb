// Builds data/legacy/header-menu.json — the old trustbank.uz top menu «О банке ▾» (a dropdown of
// sections: О банке, Пресс-центр, Интерактивные услуги, Банковское законодательство, Финансовым
// институтам, Форум, Контакты — each with its pages) and the «Продажа имущества» link, in ru/uz/en,
// with every link mapped to our route the same way convert.mjs maps migrated pages.
//
//   node scripts/legacy/header-menu.mjs
//
// Items whose page is not on our site (empty old pages: forum, blogs, polls…) are dropped;
// external links (e.g. the chairman's virtual reception) are kept as they are.
import fs from "node:fs";
import path from "node:path";

const OLD = "https://trustbank.uz";
const LANGS = ["ru", "uz", "en"];

/* ── old path → our route: pages.json first, then PATH_MAP of convert.mjs (read from its source,
      because importing convert.mjs would run a conversion) ── */
const pages = JSON.parse(fs.readFileSync("data/legacy/pages.json", "utf8"));
const src = fs.readFileSync("scripts/legacy/convert.mjs", "utf8");
const start = src.indexOf("const PATH_MAP = [");
const PATH_MAP = new Function(`${src.slice(start, src.indexOf("];", start) + 2)}; return PATH_MAP;`)();
/** Routes of our own pages (not migrated JSON) that PATH_MAP points to */
const APP_ROUTES = new Set(
  fs.readdirSync("app", { withFileTypes: true }).filter((d) => d.isDirectory() && fs.existsSync(path.join("app", d.name, "page.tsx"))).map((d) => "/" + d.name)
);
/** «О банке» pages rendered by app/o-banke from data/aboutSection.ts (slugs read from its source) */
const ABOUT_ROUTES = [...fs.readFileSync("data/aboutSection.ts", "utf8").matchAll(/slug: "([^"]+)"/g)].map((m) => "/o-banke/" + m[1]);
const ROUTES = new Set([...Object.values(pages).map((p) => p.path), ...APP_ROUTES, ...ABOUT_ROUTES]);

/** The same document categories have other ids in the uz / en versions of the old site. */
const DOC_IDS = {
  uz: { 2551: 2536, 2462: 2456, 2463: 2457, 2464: 2458, 2466: 2460, 2467: 2461, 2552: 2538, 2553: 2539, 2465: 2537, 3126: 3127 },
  en: { 2468: 2456, 2469: 2457, 2470: 2458, 2471: 2459, 2472: 2460, 2473: 2461 },
};

/** old href in any language → the Russian key ("about/history") */
function ruKey(href, lang) {
  const m = href.trim().match(/^(?:https?:\/\/(?:www\.)?trust?bank\.uz)?\/(ru|uz|en)\/([^?#]*?)(?:index\.php)?\/?$/);
  if (!m) return null;
  let key = m[2].replace(/\/$/, "");
  const doc = key.match(/^documents\/(\d+)$/);
  if (doc && DOC_IDS[lang]?.[doc[1]]) key = `documents/${DOC_IDS[lang][doc[1]]}`;
  return key;
}
function route(key) {
  if (pages[key]?.path) return pages[key].path;
  for (const [from, to] of PATH_MAP) {
    if (key === from) return to;
    if (key.startsWith(from + "/")) return to + key.slice(from.length);
  }
  return null;
}
const exists = (r) => r && ROUTES.has(r.split(/[?#]/)[0]);

const decode = (s) =>
  s.replace(/&quot;/g, '"').replace(/&laquo;/g, "«").replace(/&raquo;/g, "»").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

/* ── parse the old menu of one language ── */
async function readMenu(lang) {
  const html = await (await fetch(`${OLD}/${lang}/about/`, { headers: { "User-Agent": "Mozilla/5.0" } })).text();
  const sections = [...html.matchAll(/<a href="([^"]+)" data-target="(nav_\w+)">\s*<span>([^<]+)<\/span>/g)].map(([, href, id, label]) => {
    // the panel of this section: <div class="header-top__dropnav_elem [active] nav_…"><ul>…</ul>
    const at = html.search(new RegExp(`header-top__dropnav_elem[^"]*\\b${id}\\b`));
    const block = at < 0 ? "" : html.slice(at, html.indexOf("</ul>", at));
    const items = [...block.matchAll(/<a href="([^"]+)"[^>]*>\s*<span>([^<]+)<\/span>/g)].map(([, h, l]) => ({ href: h.trim(), label: decode(l) }));
    return { href, label: decode(label), items };
  });
  const sale = html.match(/<a href="([^"]*tenders\/real-estate[^"]*)">\s*<span>([^<]+)<\/span>/);
  return { sections, sale: sale && { href: sale[1], label: decode(sale[2]) } };
}

const menus = Object.fromEntries(await Promise.all(LANGS.map(async (l) => [l, await readMenu(l)])));

/** {key → label} per language */
const labels = Object.fromEntries(
  LANGS.map((l) => {
    const map = {};
    for (const s of menus[l].sections) {
      const k = ruKey(s.href, l);
      if (k) map[k] = s.label;
      for (const i of s.items) {
        const ik = ruKey(i.href, l);
        if (ik) map[ik] = i.label;
        else map[i.href] = i.label; // external link
      }
    }
    if (menus[l].sale) map[ruKey(menus[l].sale.href, l)] = menus[l].sale.label;
    return [l, map];
  })
);
const L = (key, ru) => ({ ru, uz: labels.uz[key] || "", en: labels.en[key] || "" });

const dropped = [];
const sections = menus.ru.sections.map((s) => {
  const key = ruKey(s.href, "ru");
  const items = [];
  for (const i of s.items) {
    const ik = ruKey(i.href, "ru");
    if (!ik) {
      // external (virtual reception): keep; the uz/en menus link the same site in their language
      const ext = (l) => menus[l].sections.flatMap((x) => x.items).find((x) => !ruKey(x.href, l) && x.href.split("/")[2] === i.href.split("/")[2]);
      items.push({ label: { ru: i.label, uz: ext("uz")?.label || "", en: ext("en")?.label || "" }, href: i.href, external: true });
      continue;
    }
    const r = route(ik);
    if (!exists(r)) { dropped.push(`${i.label} (${i.href})`); continue; }
    if (items.some((x) => x.href === r)) continue; // «Контакты» repeats its own section page
    items.push({ label: L(ik, i.label), href: r });
  }
  const r = route(key);
  return { key, label: L(key, s.label), href: exists(r) ? r : items[0]?.href, items };
}).filter((s) => s.href && s.items.length);

const saleKey = ruKey(menus.ru.sale.href, "ru");
const out = {
  source: `${OLD}/ru/about/ (header-top__nav), built by scripts/legacy/header-menu.mjs`,
  sale: { label: L(saleKey, menus.ru.sale.label), href: route(saleKey) },
  sections,
};
fs.writeFileSync("data/legacy/header-menu.json", JSON.stringify(out, null, 1) + "\n");
console.log(sections.map((s) => `${s.label.ru} (${s.items.length}) → ${s.href}`).join("\n"));
console.log("sale →", out.sale.href);
if (dropped.length) console.log("\nnot on our site, left out:\n  " + dropped.join("\n  "));
