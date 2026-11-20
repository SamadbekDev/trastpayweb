// Usage: node scripts/legacy/files.mjs data/legacy/pages.json
// Downloads documents (PDF, DOC, XLS…) linked from the migrated pages into public/upload/…
// and writes scripts/legacy/files.json: { "<old path>": "<new public path>" }.
// Re-run convert.mjs afterwards: it rewrites the links to the local copies.
// Installers and archives (/upload/media/soft/…) are not mirrored: links stay on trustbank.uz.
import fs from "node:fs";
import path from "node:path";

const [pagesFile] = process.argv.slice(2);
const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const MANIFEST = path.join(ROOT, "scripts/legacy/files.json");
const OLD = "https://trustbank.uz";

const text = fs.readFileSync(pagesFile, "utf8");
const re = /https?:\/\/(?:www\.)?trustbank\.uz(\/(?:upload\/[^)"\s\\]+|download\.php\?[^)"\s\\]+))/g;
const urls = [...new Set([...text.matchAll(re)].map((m) => m[1]))];
const SKIP = /^\/upload\/media\/soft\/|\.(msi|exe|rar|zip)$/i;

/** Old path → local public path. download.php?f=<name>&i=<id> becomes /upload/dl/<id>/<name>. */
function localPath(u) {
  if (u.startsWith("/download.php")) {
    const q = new URLSearchParams(u.split("?")[1].replace(/&amp;/g, "&"));
    const f = q.get("f"), i = q.get("i");
    return f && i ? `/upload/dl/${i}/${f}` : null;
  }
  return decodeURI(u.split("?")[0]);
}

const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};
let ok = 0, bytes = 0;
const failed = [];
for (const u of urls) {
  if (SKIP.test(u.split("?")[0])) continue;
  const local = localPath(u);
  if (!local) continue;
  const dest = path.join(PUBLIC, local);
  if (manifest[u] && fs.existsSync(dest)) continue;
  try {
    const res = await fetch(OLD + u.replace(/&amp;/g, "&"), { headers: { "User-Agent": "Mozilla/5.0" } });
    const type = res.headers.get("content-type") || "";
    if (!res.ok || type.includes("text/html")) throw new Error(`${res.status} ${type}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, buf);
    manifest[u] = local;
    ok++;
    bytes += buf.length;
  } catch (e) {
    failed.push(`${u}\t${e.message}`);
  }
}
// Drop local copies that no page links to any more (old URL and local path both absent).
let pruned = 0;
for (const [u, local] of Object.entries(manifest)) {
  if (text.includes(u) || text.includes(local)) continue;
  fs.rmSync(path.join(PUBLIC, local), { force: true });
  delete manifest[u];
  pruned++;
}
if (pruned) console.log(`pruned ${pruned} unreferenced files`);
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1));
console.log(`downloaded ${ok} files, ${(bytes / 1048576).toFixed(1)} MB; in manifest ${Object.keys(manifest).length}; failed ${failed.length}`);
if (failed.length) console.log(failed.join("\n"));
