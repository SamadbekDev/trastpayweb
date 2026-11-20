// Usage: node scrape.mjs <dir with urls.txt> [urls file] [lang: ru|uz|en]
import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2];
const lang = process.argv[4] || "ru";
const out = path.join(dir, lang === "ru" ? "md" : `md_${lang}`);
fs.mkdirSync(out, { recursive: true });
const urls = fs.readFileSync(path.join(dir, process.argv[3] || "urls.txt"), "utf8").split(/\r?\n/).filter(Boolean);

const ent = (s) =>
  s.replace(/&nbsp;/g, " ").replace(/&laquo;/g, "«").replace(/&raquo;/g, "»").replace(/&quot;/g, '"')
   .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&ndash;/g, "–").replace(/&mdash;/g, "—")
   .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));

function toText(html) {
  let h = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<svg[\s\S]*?<\/svg>/gi, "");
  // Tables: one line per row, cells joined by " | "
  h = h.replace(/<tr[^>]*>([\s\S]*?)<\/tr>/gi, (_, row) => {
    const cells = [...row.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) =>
      ent(m[1].replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim()
    );
    return "\n| " + cells.join(" | ") + " |\n";
  });
  // Images from the CMS (galleries, awards, news photos): "![alt](url)" on its own line.
  // A thumbnail wrapped in a link to the full-size picture keeps the full-size URL.
  // Parentheses are percent-encoded so "[text](url)" stays parseable ("photo-(2).jpg").
  const absUrl = (u) => (u.startsWith("/") ? "https://trustbank.uz" + u : u).replace(/\(/g, "%28").replace(/\)/g, "%29");
  const imgLine = (src, alt) => `\n![${ent(alt || "").replace(/[\[\]]/g, "").trim()}](${absUrl(src)})\n`;
  h = h.replace(/<a\b[^>]*href="(\/upload\/[^"]+\.(?:jpe?g|png|gif|webp))"[^>]*>\s*(<img\b[^>]*>)\s*<\/a>/gi, (_, href, img) => imgLine(href, img.match(/alt="([^"]*)"/)?.[1]));
  h = h.replace(/<img\b[^>]*src="(\/upload\/[^"]+)"[^>]*>/gi, (all, src) => imgLine(src, all.match(/alt="([^"]*)"/)?.[1]));
  h = h.replace(/<iframe\b[^>]*src="((?:https?:)?\/\/[^"]+)"[^>]*>/gi, (_, src) => `\n[Смотреть видео](${src.replace(/^\/\//, "https://").replace(/\/video\/embed\//, "/watch/")})\n`);
  h = h.replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, t) => {
    // A photo linking to a page (unit heads, news previews): keep the photo, drop the wrapper link.
    if (/^\s*\n!\[[^\]]*\]\([^)]*\)\n\s*$/.test(t)) return t;
    const txt = t.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return txt ? `[${txt}](${absUrl(href)})` : "";
  });
  h = h.replace(/<h([1-4])[^>]*>/gi, (_, n) => "\n\n" + "#".repeat(+n) + " ").replace(/<\/h[1-4]>/gi, "\n");
  h = h.replace(/<li[^>]*>/gi, "\n- ").replace(/<\/(p|div|ul|ol|table|section)>/gi, "\n").replace(/<br\s*\/?>/gi, "\n");
  h = h.replace(/<[^>]+>/g, " ");
  h = ent(h).split("\n").map((l) => l.replace(/[ \t]+/g, " ").trim()).filter((l, i, a) => l || (a[i - 1] && a[i - 1].trim()));
  return h.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const index = [];
for (const u of urls) {
  const url = "https://trustbank.uz" + u.replace(/^\/ru\//, `/${lang}/`);
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await res.text();
    let start = html.indexOf('class="main__content"');
    if (start < 0) start = html.indexOf("<h1");
    let end = html.indexOf('class="main__sidebar"', start);
    if (end < 0) end = html.indexOf('class="main-map"', start);
    if (end < 0) end = html.indexOf("<footer", start);
    const body = start >= 0 ? html.slice(start - 5, end > 0 ? end : undefined) : "";
    const title = ent((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "").replace(/<[^>]+>/g, "").trim());
    const text = toText(body);
    const slug = u.replace(/^\/ru\//, "").replace(/\/$/, "").replace(/\//g, "__") || "home";
    fs.writeFileSync(path.join(out, slug + ".md"), `URL: ${url}\nSTATUS: ${res.status}\n\n${text}\n`);
    index.push(`${res.status}\t${text.length}\t${u}\t${title}`);
  } catch (e) {
    index.push(`ERR\t0\t${u}\t${e.message}`);
  }
  await sleep(250);
}
fs.writeFileSync(path.join(dir, (process.argv[3] || "urls.txt") + (lang === "ru" ? "" : `.${lang}`) + ".index.tsv"), index.join("\n") + "\n");
console.log("done", index.length);
