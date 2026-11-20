// Usage: node convert.mjs <tb dir> <out json>
// Converts scraped markdown of trustbank.uz/ru into ContentBlock JSON keyed by old path.
import fs from "node:fs";
import path from "node:path";

const [dir, outFile, LANG = "ru"] = process.argv.slice(2);
// ru → md/, uz → md_uz/, en → md_en/ (scrape.mjs <dir> <urls> <lang>)
const md = path.join(dir, LANG === "ru" ? "md" : `md_${LANG}`);

/* Labels of the old site in each language */
const SIZE = /^(Размер|Hajmi|Size):/;
const CUT = /^## (Оставьте отзыв|Другие новости|Другие статьи|Другие объявления|Xizmat sifati haqida fikr|Boshqa yangiliklar|Boshqa maqolalar|Boshqa e'lonlar|Leave (a )?(review|feedback)|Other news|Other articles|Other announcements)/i;
/** Third-level pages (urls3–6.txt): rendered by the routes but kept out of section menus. */
const DETAIL = new Set(
  ["urls3.txt", "urls4.txt", "urls5.txt", "urls6.txt"].map((f) => (fs.existsSync(path.join(dir, f)) ? fs.readFileSync(path.join(dir, f), "utf8") : "")).join(String.fromCharCode(10))
    .split(/\r?\n/).map((u) => u.replace(/^\/ru\//, "").replace(/\/$/, "").trim()).filter(Boolean)
);
/** Documents mirrored into public/ by files.mjs: old path → local path. */
const FILES_MANIFEST = path.join(process.cwd(), "scripts/legacy/files.json");
const FILES = fs.existsSync(FILES_MANIFEST) ? JSON.parse(fs.readFileSync(FILES_MANIFEST, "utf8")) : {};

const OLD = "https://trustbank.uz";
const PATH_MAP = [
  ["about/vacancies/personnel-policy", "/o-banke/kadrovaya-politika"],
  ["about/vacancies/list", "/vakansii"],
  ["about/vacancies", "/vakansii"],
  ["about/mission", "/o-banke/missiya"],
  ["about/history", "/o-banke/istoriya"],
  ["about/strategy", "/o-banke/strategiya"],
  ["about/business-plan", "/o-banke/biznes-plan"],
  ["about/policy-quality", "/o-banke/politika-kachestva"],
  ["about/management", "/o-banke/pravlenie"],
  ["about/commission", "/o-banke/komitety"],
  ["about/central-office", "/o-banke/struktura"],
  ["about/internal-audit", "/o-banke/vnutrenniy-audit"],
  ["about/auditor", "/o-banke/revizor"],
  ["about/organizations", "/o-banke/dochernie"],
  ["about/ratings", "/o-banke/reytingi"],
  ["about/awards", "/o-banke/nagrady"],
  ["about/charter", "/o-banke/ustav"],
  ["about/license", "/o-banke/litsenzii"],
  ["about/documents", "/o-banke/pravoustanavlivayushchie-dokumenty"],
  ["about/fighting-against-corruption/send", "/o-banke/antikorruptsiya#soobshchit"],
  ["about/fighting-against-corruption", "/o-banke/antikorruptsiya"],
  ["services/citizens/send", "/zayavki?tab=appeal"],
  ["services/citizens/status", "/obrashcheniya#status"],
  ["about/gender-policy", "/o-banke/gendernaya-politika"],
  ["about/requisites", "/o-banke/rekvizity"],
  ["about", "/o-banke"],
  ["shareholders", "/aktsioneram"],
  ["press_center", "/press-tsentr"],
  ["services/citizens", "/obrashcheniya"],
  ["services/blanks", "/blanki"],
  ["services/exchange-rates-in-branches", "/valyuta"],
  ["services/exchange-rates", "/valyuta"],
  ["services/online-application", "/zayavki"],
  ["services", "/servisy"],
  ["financial-organizations", "/finansovym-institutam"],
  ["documents", "/dokumenty"],
  // Corporate products → existing /biznes/<slug> catalog entries
  ["corporate/crediting/kredit-capital-house", "/biznes/capital-house"],
  ["corporate/crediting/kredit-ekspress", "/biznes/express"],
  ["corporate/crediting/partnyer-biznesa", "/biznes/partnyer-biznesa"],
  ["corporate/crediting/biznes-ipoteka", "/biznes/biznes-ipoteka"],
  ["corporate/crediting/kredit-refinans", "/biznes/refinans"],
  ["corporate/crediting/dlya-stroitelstva-mnogokvartirnykh-zhilykh-domov-v-massivakh-yangi-uzbekiston", "/biznes/yangi-uzbekiston"],
  ["corporate/crediting/prestij-avto", "/biznes/prestij-avto"],
  ["corporate/crediting/kredit-ipoteka-uslug", "/biznes/ipoteka-uslug"],
  ["corporate/crediting/produkt-zelenoe-finansitrovanie-", "/biznes/zelenoe-finansirovanie"],
  ["corporate/crediting/faktoringovye-uslugi-dlya-korporativnykh-klientov", "/biznes/faktoring"],
  ["corporate/crediting/mikrokredit-razvitie-biznesa-i-sozdanie-novykh-rabochikh-mest", "/biznes/mikrokredit-rabochiye-mesta"],
  ["corporate/crediting/kredit-razvitie-biznesa-i-sozdanie-novykh-rabochikh-mest-dlya-korporativnykh-klientov", "/biznes/kredit-rabochiye-mesta"],
  ["corporate/crediting/dlya-popolnenie-oborotnykh-sredstv-stroitelnyya-organizatsiyam-uchastvuyushchikh-v-stroitelstve-mnog", "/biznes/oborotnye-stroitelstvo"],
  ["corporate/crediting/dlya-subektov-predprinimatelstva-osushchestvlyayushchikh-deyatelnost-v-sfere-turizma", "/biznes/turizm"],
  ["corporate/crediting/obespechenie-oborotnymi-sredstvami-tekstilnye-i-shveyno-trikotazhnye-predpriyatiya-za-schet-revolver", "/biznes/tekstil-revolver"],
  ["corporate/crediting/lgotnyy-mikrokredit-dlya-razvitiya-malogo-biznesa", "/biznes/lgotnyy-mikrokredit"],
  ["corporate/crediting/export-activity", "/biznes/eksport-oborotnye"],
  ["corporate/crediting/investment-credit", "/biznes/investitsionnyy-kredit"],
  ["corporate/crediting/microcredit", "/biznes/mikrokredit"],
  ["corporate/crediting/working-capital-fruits", "/biznes/oborotnye-plodoovoshchi"],
  ["corporate/crediting/working-capital", "/biznes/oborotnyy-kapital"],
  ["corporate/crediting/avto-start", "/biznes/avto-start"],
  ["corporate/crediting", "/biznes/kredity"],
  ["corporate/cash-services", "/biznes/rko"],
  ["corporate/leasing", "/biznes/lizing"],
  ["corporate/guarantees", "/biznes/garantii"],
  ["corporate/export-import", "/biznes/ved"],
  ["corporate/payment-terminals", "/biznes/terminaly"],
  ["corporate/payroll-project", "/biznes/zarplatnyj-proekt"],
  ["corporate/securities-transactions", "/biznes/tsennye-bumagi"],
  ["corporate/deposit-operations", "/biznes/depozity"],
  ["corporate/client", "/biznes/stat-klientom"],
  ["corporate/plastic-cards/list/international/visa-business", "/biznes/karty/visa-business"],
  ["corporate/plastic-cards/list/national/corporate", "/biznes/karty/korporativnaya"],
  ["corporate/plastic-cards/list/national/payroll-cards", "/biznes/karty/zarplatnye"],
  ["corporate/plastic-cards/list", "/biznes/karty"],
  ["corporate/plastic-cards", "/biznes/karty"],
  ["private/communal", "/servisy/kommunalnye-platezhi"],
  ["private/currency-exchange-transactions", "/valyuta/obmennye-operatsii"],
  ["corporate/tariffs", "/tarify/korporativnye"],
  ["private/tariffs", "/tarify/chastnye"],
  ["corporate", "/biznes"],
  ["private/deposit", "/vklady"],
  ["private/plastic-cards", "/karty"],
  ["private/crediting/scoring", "/kredity/scoring"],
  ["private/crediting", "/kredity"],
  ["private/money-transfer", "/perevody"],
  ["investments", "/investitsii"],
  ["branches", "/filialy"],
  ["contacts", "/kontakty"],
  ["map", "/karta-sajta"],
];

export function mapPath(old) {
  // old: "about/mission" (no /ru/, no slashes at ends)
  for (const [from, to] of PATH_MAP) {
    if (old === from) return to;
    if (old.startsWith(from + "/")) {
      // Only mirror sub-paths for sections rendered by catch-all routes
      return to + decodeURIComponent(old.slice(from.length)).trim().replace(/\s+/g, "-");
    }
  }
  return null;
}

/** mapped route → original old-site URL (used to keep links to pages we did not migrate) */
const ORIGINAL = new Map();

function rewriteHref(href) {
  const f = href.match(/^https?:\/\/(?:www\.)?trustbank\.uz(\/(?:upload\/|download\.php).*)$/);
  if (f) return FILES[f[1]] ?? FILES[f[1].replace(/&amp;/g, "&")] ?? href;
  const m = href.match(/^https?:\/\/(?:www\.)?trustbank\.uz\/(?:ru|uz|en)\/([^?#]*)/);
  if (!m) return href;
  const p = m[1].replace(/\/$/, "");
  const mapped = mapPath(p);
  if (!mapped) return href;
  ORIGINAL.set(mapped, href);
  return mapped;
}

/** Thumbnails inside link texts ("[![](img) Title](url)") — the image is dropped, the link kept. */
const INLINE_IMG = /!\[[^\]]*\]\([^)]*\)\s*/g;
const NOISE =/^(Дата обновления|Yangilangan sana|Last updated|Date of update|Updated:|Kommentariylar:|Comments:|Элемент не найден|\[(Ro[’'‘]yxatga qaytish|Back to (the )?list)\]\([^)]*\)$|Format:|<div|Формат:|Телефон:$|Telefon:$|Phone:$|Telephone:$|\[Смотреть подробно\]|Подробнее$|Скачать$|Файл$|\[Назад к списку\]\([^)]*\)$)/;

function parse(text) {
  let lines = text.split("\n");
  const cut = lines.findIndex((l) => CUT.test(l));
  if (cut >= 0) lines = lines.slice(0, cut);
  lines = lines.map((l) => l.trim()).filter((l) => l && !NOISE.test(l));
  // news footer: "Источник: / не указано / / / Просмотров: / 68"
  lines = lines.filter((l, k, a) => !/^(Источник:|не указано|Manba:|ko[‘']rsatilmagan|Source:|not specified|\/|-|Просмотров:|Ko[‘']rishlar( soni)?:|Views:|Текст\.+)$/i.test(l) && !(/^\d+$/.test(l) && /^(Просмотров|Ko[‘']rishlar( soni)?|Views):$/.test(a[k - 1] || "")));
  const title = (lines.find((l) => l.startsWith("# ")) || "").slice(2).trim();
  lines = lines.filter((l) => !l.startsWith("# "));

  const blocks = [];
  let i = 0;
  const linkRe = /^\[([^\]]+)\]\(([^)]+)\)$/;
  const imgRe = /^!\[([^\]]*)\]\(([^)]+)\)$/;
  while (i < lines.length) {
    const l = lines[i];
    if (/^#{2,4} /.test(l)) {
      const raw = l.replace(/^#+ /, "");
      const lm = raw.match(linkRe);
      blocks.push(lm ? { type: "heading", text: lm[1], href: rewriteHref(lm[2]) } : { type: "heading", text: raw });
      i++;
      continue;
    }
    if (l.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        const cells = lines[i].replace(/^\|\s*/, "").replace(/\s*\|$/, "").split(" | ").map((c) => c.trim());
        if (cells.some(Boolean)) rows.push(cells.filter((c, k) => c || k < cells.length - 1));
        i++;
      }
      if (rows.length) blocks.push({ type: "table", rows: rows.map((r) => r.map((c) => c.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, h) => `[${t}](${rewriteHref(h)})`))) });
      continue;
    }
    if (l.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        const it = lines[i].slice(2).trim();
        if (it && it !== "[Все](#)") items.push(it.replace(INLINE_IMG, "").replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, h) => `[${t}](${rewriteHref(h)})`));
        i++;
      }
      if (items.length) blocks.push({ type: "list", items });
      continue;
    }
    if (imgRe.test(l)) {
      const images = [];
      while (i < lines.length && imgRe.test(lines[i])) {
        const [, alt, src] = lines[i].match(imgRe);
        const href = rewriteHref(src);
        if (!images.some((x) => x.src === href)) images.push({ src: href, alt: /\.(jpe?g|png|gif|webp)$/i.test(alt) ? "" : alt });
        i++;
      }
      blocks.push({ type: "gallery", images });
      continue;
    }
    const lm = l.match(linkRe);
    if (lm && SIZE.test(lines[i + 1] || "")) {
      const items = [];
      while (i < lines.length) {
        const m2 = lines[i].match(linkRe);
        if (!m2 || !SIZE.test(lines[i + 1] || "")) break;
        items.push({ label: m2[1], href: rewriteHref(m2[2]), meta: lines[i + 1].replace(SIZE, "").trim() });
        i += 2;
      }
      blocks.push({ type: "docs", items });
      continue;
    }
    // paragraph (merge consecutive plain lines into separate paragraphs of one block)
    const paragraphs = [];
    while (
      i < lines.length &&
      !/^#{2,4} /.test(lines[i]) &&
      !lines[i].startsWith("|") &&
      !lines[i].startsWith("- ") &&
      !imgRe.test(lines[i]) &&
      !(linkRe.test(lines[i]) && SIZE.test(lines[i + 1] || ""))
    ) {
      paragraphs.push(lines[i].replace(INLINE_IMG, "").replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, h) => `[${t}](${rewriteHref(h)})`));
      i++;
    }
    if (paragraphs.length) blocks.push({ type: "text", paragraphs });
  }
  return { title, blocks };
}

/* ───────── cleanup / post-processing ───────── */

const JUNK_PARA = /(\[(Блог|Форум|Blog|Forum|Изменить код|Посмотреть|Сформировать[^\]]*|Перейти к организации[^\]]*|Подробнее)\]\([^)]*\))|-->|^Введите код с картинки|^\* поля обязательны|^Отправить$|^Проверить$|^Сравнить$|\*\s*:?\s*$|^Обзор(&hellip;|…)|^Максимальный размер файла|^добавить ещё$|^Rasmdagi kodni tering|^Yuborish$|^Faylning maksimal hajmi|^yana$|^Enter the code|^Send$|^Maximum file size/;
const DAY = /^(Пн|Вт|Ср|Чт|Пт|Сб|Вс|Du|Se|Ch|Pa|Ju|Sh|Ya|Mon|Tue|Wed|Thu|Fri|Sat|Sun|Mo|Tu|We|Th|Fr|Sa|Su)$/;
const linkOnlyAnchors = (items) => items.every((it) => /^\[[^\]]*\]\(#[^)]*\)$/.test(it));

function postProcess(blocks) {
  const outB = [];
  for (const b of blocks) {
    if (b.type === "list" && linkOnlyAnchors(b.items)) continue;
    if (b.type !== "text") { outB.push(b); continue; }
    const paras = b.paragraphs.filter((p) => !JUNK_PARA.test(p));
    // Split into text paragraphs, schedule rows and "Label:" value rows
    let buf = [];
    let rows = [];
    const flushText = () => { if (buf.length) { outB.push({ type: "text", paragraphs: buf }); buf = []; } };
    const flushRows = () => { if (rows.length) { outB.push({ type: "table", rows }); rows = []; } };
    for (let i = 0; i < paras.length; i++) {
      const p = paras[i];
      if (DAY.test(p)) {
        flushText();
        // a day off has no time ("-" lines are dropped as noise): don't swallow the next day
        if (i + 1 < paras.length && !DAY.test(paras[i + 1])) {
          rows.push([p, paras[i + 1]]);
          i++;
        } else rows.push([p, "-"]);
        continue;
      }
      if (/^[А-ЯЁA-Z][^:]{1,40}:$/.test(p) && i + 1 < paras.length && !/:$/.test(paras[i + 1])) {
        flushText();
        rows.push([p.replace(/:$/, ""), paras[i + 1]]);
        i++;
        continue;
      }
      flushRows();
      buf.push(p);
    }
    flushRows();
    flushText();
  }
  // Merge "heading 'Label:'" + following single text paragraph into a table row
  const merged = [];
  for (let i = 0; i < outB.length; i++) {
    const b = outB[i];
    const n = outB[i + 1];
    if (b.type === "heading" && !b.href && /:$/.test(b.text) && n && n.type === "text" && n.paragraphs.length === 1) {
      const row = [b.text.replace(/:$/, ""), n.paragraphs[0]];
      const prev = merged[merged.length - 1];
      if (prev && prev.type === "table" && prev.rows[0].length === 2) prev.rows.push(row);
      else merged.push({ type: "table", rows: [row] });
      i++;
      continue;
    }
    if (b.type === "heading" && !b.href && /:$/.test(b.text) && n && n.type === "table") {
      // "Режим работы:" + schedule table → keep heading as label
      merged.push({ type: "heading", text: b.text.replace(/:$/, ""), level: 3 });
      continue;
    }
    if (b.type === "heading" && !b.href && /:$/.test(b.text)) continue; // empty label (map, transport)
    merged.push(b);
  }
  return merged;
}

/* ───────── custom: Правление ───────── */
const BIO_KEEP = /^(Место работы|Образование|Специальность|Стаж|Опыт|Ish joyi|Ma[’']lumoti|Mutaxassisligi|Bank tizimidagi ish staji|Egallab turgan|Place of work|Education|Speciali[sz]|Work experience|Experience)/;
const WORKPLACE = /^(Место работы|Ish joyi|Place of work)/;
function parseManagement(blocks) {
  const people = [];
  let cur = null;
  for (const b of blocks) {
    if (b.type === "heading") {
      cur = { name: b.text, position: "", phone: "", duties: [], bio: [], schedule: [], bookingHref: "" };
      people.push(cur);
      continue;
    }
    if (!cur) continue;
    if (b.type === "text") {
      for (const p of b.paragraphs) {
        const tel = p.match(/^\[([^\]]+)\]\(tel:/);
        const book = p.match(/^\[(Записаться на приём|Qabul(i)?ga yozilish|Make an appointment|Book an appointment)\]\(([^)]+)\)/);
        if (book) cur.bookingHref = book[3];
        else if (tel) cur.phone = tel[1];
        else if (/^\[.*\]\(mailto:/.test(p) || /^\(\+?998/.test(p) || /^(Факс|E-mail|Faks|Fax|Elektron pochta|Telefon|Phone|Телефон):?$/.test(p) || /^(Факс|E-mail|Faks|Fax|Elektron pochta)/.test(p)) continue;
        else if (!cur.position) cur.position = p;
        else cur.duties.push(p);
      }
    } else if (b.type === "table") {
      for (const r of b.rows) {
        if (DAY.test(r[0])) {
          const b = r[1].match(/^\[[^\]]+\]\(([^)]+)\)$/);
          if (b) cur.bookingHref = cur.bookingHref || b[1];
          cur.schedule.push(b ? [r[0], "-"] : r);
        }
        else if (BIO_KEEP.test(r[0]) && r[1]) cur.bio.push(r);
        else if (WORKPLACE.test(r[0]) && !cur.position) cur.position = r[1];
      }
    }
  }
  for (const p of people) if (!p.position) p.position = p.bio.find((r) => WORKPLACE.test(r[0]))?.[1] || "";
  return [{ type: "people", items: people }];
}

/* ───────── custom: Реквизиты (головной офис + реквизиты филиалов) ───────── */
let REQ_BRANCHES = [];
function parseRequisites(blocks) {
  const rows = blocks.filter((b) => b.type === "table").flatMap((b) => b.rows);
  const head = [];
  const branches = [];
  let cur = null;
  for (const r of rows) {
    if (r.length === 2 && /^(Полное наименование филиала|Filialning to[‘']liq nomi|Full name of the branch)/.test(r[1])) {
      cur = { name: r[0].replace(/[“”]/g, "«").replace(/«([^«]*)«/, "«$1»"), rows: [] };
      branches.push(cur);
      const [l, ...v] = r[1].split(": ");
      cur.rows.push([l, v.join(": ")]);
      continue;
    }
    if (!cur && r.length === 2) { head.push([r[0].replace(/:\s*$/, ""), r[1]]); continue; }
    if (cur && r.length === 1) {
      const i = r[0].indexOf(": ");
      if (i > 0 && r[0].slice(i + 2).trim()) cur.rows.push([r[0].slice(0, i), r[0].slice(i + 2).trim()]);
    }
  }
  REQ_BRANCHES = branches;
  const out = [{ type: "table", rows: head }];
  if (branches.length) {
    out.push({ type: "heading", text: { ru: "Реквизиты офисов банковских услуг", uz: "Bank xizmatlari ofislari rekvizitlari", en: "Details of bank service offices" }[LANG] });
    for (const b of branches) {
      out.push({ type: "heading", text: b.name, level: 3 });
      out.push({ type: "table", rows: b.rows });
    }
  }
  return out;
}

/* ───────── custom: филиалы (contacts → «Контакты филиалов») ───────── */
function parseOffices(blocks) {
  const offices = [];
  let cur = null;
  for (const b of blocks) {
    if (b.type === "heading" && b.href && b.href.startsWith("/filialy/")) {
      cur = { name: b.text.replace(/[“”]/g, "«").replace(/«([^«]*)«/, "«$1»"), slug: b.href.split("/").pop(), address: "", phone: "", fax: "" };
      offices.push(cur);
      continue;
    }
    if (!cur) continue;
    const take = (label, value) => {
      if (/^(Адрес|Manzil|Address)/.test(label)) cur.address = value;
      else if (/^(Факс|Faks|Fax)/.test(label)) cur.fax = value;
    };
    if (b.type === "table") b.rows.forEach((r) => take(r[0], r[1]));
    if (b.type === "text") for (const p of b.paragraphs) { const t = p.match(/^\[([^\]]+)\]\(tel:/); if (t && !cur.phone) cur.phone = t[1]; }
  }
  return offices;
}

const EXCLUDE = new Set([
  "services/citizens/send", "services/citizens/status", "about/fighting-against-corruption/send", "services/votes",
  "search", "subscribe", "private/plastic-cards/request", "private/crediting/request", "map",
  "services/internet-banking/trustpay/",
  // data exports / downloads, not pages
  "branches/pdf", "branches/open_data/xml", "branches/open_data/csv", "about/management/open_data/xml",
  "about/management/open_data/csv", "corporate/plastic-cards/list/0",
  // duplicates of list pages / product pages owned by the CMS (cards, deposits, retail loans)
  "corporate/plastic-cards/list", "corporate", "private", "private/plastic-cards", "private/plastic-cards/list",
  "private/crediting", "private/crediting/scoring", "private/crediting/anderrayting", "private/deposit",
  "private/deposit/zamin", "private/deposit/onlayn-zamin", "private/money-transfer",
  "services/exchange-rates", "services/exchange-rates-in-branches", "services/online-application",
  "services/citizens", "investments", "about", "about/vacancies",
]);

const out = {};
let offices = [];
/** Russian pages (routes, menu) — the base for the uz / en conversions. */
const RU_FILE = path.join(path.dirname(outFile), "pages.json");
const RU_PAGES = LANG === "ru" ? null : JSON.parse(fs.readFileSync(RU_FILE, "utf8"));
const outName = (name) => path.join(path.dirname(outFile), LANG === "ru" ? `${name}.json` : `${name}.${LANG}.json`);
for (const f of fs.readdirSync(md)) {
  const raw = fs.readFileSync(path.join(md, f), "utf8");
  const status = raw.match(/^STATUS: (\d+)/m)?.[1];
  if (status !== "200") continue;
  const key = f.replace(/\.md$/, "").replace(/__/g, "/").trim().replace(/\/$/, "");
  if (out[key]) continue; // duplicate URL variant (trailing slash / space)
  const body = raw.split("\n").slice(3).join("\n");
  if (EXCLUDE.has(key)) continue;
  if (RU_PAGES && !RU_PAGES[key] && key !== "contacts") continue; // translations only for pages that exist in Russian
  const parsed = parse(body);
  let blocks = postProcess(parsed.blocks);
  if (key === "contacts") { offices = parseOffices(blocks); continue; }
  if (key === "about/management") blocks = parseManagement(blocks);
  if (key === "about/requisites") blocks = parseRequisites(blocks);
  // Photo albums all share the h1 «Фотогалерея»: the album name is the first paragraph.
  if (/^(Фотогалерея|Fotogalereya|Photo ?gallery)$/i.test(parsed.title) && blocks[0]?.type === "text" && blocks[0].paragraphs[0]?.length < 120) {
    parsed.title = blocks[0].paragraphs.shift();
    if (!blocks[0].paragraphs.length) blocks.shift();
  }
  if (!parsed.title || !blocks.length) continue;
  out[key] = { title: parsed.title, source: `${OLD}/${LANG}/${key}/`, path: mapPath(key), ...(DETAIL.has(key) ? { detail: true } : {}), blocks };
}
fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
const norm = (s) => s.toLowerCase().replace(/[«»"“”]/g, "").replace(/s+/g, " ").trim();
for (const o of offices) {
  const b = REQ_BRANCHES.find((r) => norm(r.name) === norm(o.name));
  o.inn = b?.rows.find((r) => r[0] === "ИНН")?.[1] ?? "";
  o.helpline = b?.rows.find((r) => r[0] === "Телефон доверия")?.[1] ?? "";
}
fs.writeFileSync(outName("offices"), JSON.stringify(offices, null, 1));
// index.json: menu pages with their titles in every language available
const INDEX_FILE = outName("index").replace(/index\.\w+\.json$/, "index.json");
const localTitles = (lang) => {
  const file = path.join(path.dirname(outFile), `pages.${lang}.json`);
  const pages = lang === LANG ? out : fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
  return (k) => pages[k]?.title;
};
if (LANG === "ru") {
  const uz = localTitles("uz"), en = localTitles("en");
  const index = Object.fromEntries(
    Object.entries(out).filter(([, v]) => !v.detail).map(([k, v]) => [k, { title: v.title, path: v.path, ...(uz(k) ? { uz: uz(k) } : {}), ...(en(k) ? { en: en(k) } : {}) }])
  );
  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 1));
} else {
  const index = JSON.parse(fs.readFileSync(INDEX_FILE, "utf8"));
  for (const [k, e] of Object.entries(index)) {
    if (out[k]) e[LANG] = out[k].title;
    else delete e[LANG];
  }
  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 1));
}
console.log(Object.keys(out).length, "pages", offices.length, "offices");

/* ───────── keep links to non-migrated pages pointing at the old site ───────── */
// Routes that exist on the new site independently of the migrated content.
const NEW_SITE_ROUTES = new Set([
  "/", "/karty", "/kredity", "/kredity/scoring", "/vklady", "/perevody", "/valyuta", "/tarify", "/filialy", "/biznes",
  "/servisy", "/zayavki", "/o-banke", "/aktsioneram", "/press-tsentr", "/finansovym-institutam", "/investitsii",
  "/dokumenty", "/blanki", "/obrashcheniya", "/vakansii", "/kontakty", "/karta-sajta",
  ...["missiya", "istoriya", "strategiya", "biznes-plan", "politika-kachestva", "pravlenie", "komitety", "struktura",
    "vnutrenniy-audit", "revizor", "dochernie", "reytingi", "nagrady", "ustav", "litsenzii",
    "pravoustanavlivayushchie-dokumenty", "antikorruptsiya", "gendernaya-politika", "kadrovaya-politika", "rekvizity"].map((s) => `/o-banke/${s}`),
]);
const generated = new Set(Object.values(RU_PAGES ?? out).map((v) => v.path));
const exists = (p) => {
  const bare = p.replace(/[?#].*$/, "").replace(/\/$/, "") || "/";
  return NEW_SITE_ROUTES.has(bare) || generated.has(bare);
};
const fix = (h) => (h.startsWith("/") && !exists(h) && ORIGINAL.has(h) ? ORIGINAL.get(h) : h);
let fixed = 0;
const fixText = (t) => t.replace(/\]\((\/[^)]+)\)/g, (all, h) => { const n = fix(h); if (n !== h) fixed++; return `](${n})`; });
for (const v of Object.values(out)) {
  for (const b of v.blocks) {
    if (b.href) { const n = fix(b.href); if (n !== b.href) { b.href = n; fixed++; } }
    if (b.paragraphs) b.paragraphs = b.paragraphs.map(fixText);
    if (b.items && typeof b.items[0] === "string") b.items = b.items.map(fixText);
    if (b.items && typeof b.items[0] === "object") for (const it of b.items) if (it.href) { const n = fix(it.href); if (n !== it.href) { it.href = n; fixed++; } }
    if (b.rows) b.rows = b.rows.map((r) => r.map(fixText));
  }
}
/* ───────── uz / en: Cyrillic look-alike letters typed inside Latin words on the old site ───────── */
const LOOKALIKE = { а: "a", е: "e", о: "o", р: "p", с: "c", у: "y", х: "x", і: "i", ј: "j", А: "A", В: "B", Е: "E", К: "K", М: "M", Н: "H", О: "O", Р: "P", С: "C", Т: "T", У: "Y", Х: "X" };
let homoglyphs = 0;
const latinize = (s) =>
  s.replace(/[\p{L}’'‘ʻ-]+/gu, (w) => {
    if (!/[A-Za-z]/.test(w) || !/[А-Яа-яЁёІіЈј]/.test(w)) return w;
    const fixedWord = w.replace(/[а-яА-ЯіЈј]/g, (c) => LOOKALIKE[c] ?? c);
    if (/[А-Яа-яЁё]/.test(fixedWord)) return w; // a real mixed word, leave as is
    homoglyphs++;
    return fixedWord;
  });
const deepLatinize = (v) =>
  typeof v === "string" ? latinize(v) : Array.isArray(v) ? v.map(deepLatinize) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === "href" || k === "source" || k === "path" ? x : deepLatinize(x)])) : v;
if (LANG !== "ru") {
  for (const k of Object.keys(out)) out[k] = deepLatinize(out[k]);
  console.log("look-alike letters fixed in words:", homoglyphs);
}
fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
console.log("links kept on old site:", fixed);
