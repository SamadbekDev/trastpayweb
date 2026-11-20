// Uploads the Figma artwork (public/images/figma) to the CMS (dashboard-api) and puts it into the content
// instead of placeholder stubs, empty credit images and media files missing on the server.
//
//   node scripts/cms-upload-figma.mjs <path to dashboard-api/.env>            dry run: prints the plan
//   node scripts/cms-upload-figma.mjs <path to dashboard-api/.env> --apply    uploads, saves the draft, publishes
//
// Signs in with the seed super admin from that .env (values are read from the file, never printed).
// Stops when the draft already has unpublished changes, so nobody's work gets published by accident.
import fs from "node:fs";
import path from "node:path";

const [envFile, flag] = process.argv.slice(2);
const APPLY = flag === "--apply";
const env = Object.fromEntries(
  fs.readFileSync(envFile, "utf8").split(/\r?\n/).filter((l) => /^\w+=/.test(l)).map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()])
);
const API = (env.PUBLIC_API_URL || `http://localhost:${env.PORT || 4000}`).replace(/\/$/, "") + "/api";
const ROOT = "public/images/figma";

/* ── what goes where (same mapping as utils/figmaAssets.ts) ── */
const PLACEHOLDERS = {
  "120x120:Card": "home/product-debit-card.webp", "120x120:FX Card": "home/product-fx-card.webp",
  "120x120:Cash": "home/product-credits.webp", "120x120:Car": "home/product-car-loan.webp",
  "120x120:Home": "home/product-mortgage.webp", "120x120:Family": "home/product-family.webp",
  "32x32:US": "flags/us.svg", "32x32:EU": "flags/eu.svg", "32x32:RU": "flags/ru.svg",
  "1400x800:Coins": "home/calculator-coins.webp", "360x420:Deposit": "home/offer-deposit.webp",
  "360x420:Delivery": "home/offer-delivery.webp", "400x280:Telegram": "home/news-telegram.webp",
  "348x218:Visa+Infinity": "cards/visa-infinity.webp", "348x218:Visa": "cards/visa.webp",
  "348x218:Maksadli": "cards/maksadli-globe.webp", "348x218:Card": "cards/maksadli-black.webp",
  "348x218:Credit": "cards/virtual.webp", "348x218:Gold": "cards/kulay-gold.webp",
  "348x218:Blue": "cards/kulay-blue.webp", "348x218:Navy": "cards/kulay-navy.webp",
  "348x218:UnionPay": "cards/istiklol-unionpay.webp", "260x218:Wallet": "deposits/wallet.webp",
  "260x218:Hearts": "deposits/hearts.webp", "260x218:Bear": "deposits/bear.webp", "260x218:USD+": "deposits/usd.webp",
};
const STOCK = { "photo-1516321318423-f06f85e504b3": "home/trastpay.webp" };
const CREDIT_PRODUCTS = {
  "sharq-bahori": "credits/mortgage-sharq-bahori.webp", ozshahar: "credits/mortgage-ozshahar.webp",
  "golden-house": "credits/mortgage-golden-house.webp", "ipoteka-refinance": "credits/mortgage-market.webp",
  "ipoteka-bank": "credits/mortgage-bank.webp", "bez-dohoda": "credits/mortgage-no-income.webp",
  "micro-income": "credits/micro-income.webp", "micro-employment": "credits/micro-employment.webp",
  "micro-self": "credits/micro-self.webp", "first-step": "credits/micro-first-step.webp",
  "first-step-2": "credits/micro-first-step-2.webp", universal: "credits/universal.webp",
  overdraft: "credits/overdraft.webp",
};
/** Micro-loan page slots ("Микрозайм" frame) when empty or pointing at a file missing on the server */
const MICRO_SLOTS = { heroImage: "credits/micro-hero.webp", stepsBannerImage: "credits/micro-self.webp", infoImage: "credits/micro-info.webp", requirementsImage: "credits/micro-hero.webp" };
const QULAY_IMAGE = "credits/micro-qulay.webp";

function stubTarget(url) {
  const ph = url.match(/placehold\.co\/(\d+x\d+)\/[^?]*\?text=([^&#]*)/);
  if (ph) return PLACEHOLDERS[`${ph[1]}:${decodeURIComponent(ph[2]).trim()}`];
  const k = Object.keys(STOCK).find((s) => url.includes(s));
  return k ? STOCK[k] : undefined;
}

async function json(res) {
  const t = await res.text();
  try { return JSON.parse(t); } catch { return { raw: t.slice(0, 200) }; }
}

/* ── sign in ── */
const login = await fetch(`${API}/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: env.SEED_SUPER_ADMIN_EMAIL, password: env.SEED_SUPER_ADMIN_PASSWORD }),
});
const auth = await json(login);
if (!login.ok || !auth.accessToken) {
  console.log("login failed:", login.status, auth.message || auth.error || "");
  process.exit(1);
}
const H = { Authorization: `Bearer ${auth.accessToken}` };
console.log("signed in as", auth.user?.role || "user");

/* ── draft ── */
const draftRes = await fetch(`${API}/content/draft`, { headers: H });
const draft = await json(draftRes);
if (!draftRes.ok) { console.log("draft:", draftRes.status, draft.message); process.exit(1); }
if (draft.meta?.hasUnpublishedChanges) {
  console.log("STOP: the draft has unpublished changes (by", draft.meta.draftUpdatedBy, "at", draft.meta.draftUpdatedAt + ") — publish or reject them in the dashboard first.");
  process.exit(2);
}
const content = draft.content;

/* ── media files referenced by the content that the server cannot serve ── */
const mediaUrls = [...new Set(JSON.stringify(content).match(/https?:\/\/[^"]*\/api\/media\/[^"]+/g) || [])];
const missing = new Set();
for (const u of mediaUrls) {
  const r = await fetch(u.replace(/^https?:\/\/[^/]+\/api/, API), { method: "GET" });
  if (r.status === 404) missing.add(u);
}

/* ── plan replacements ── */
const plan = []; // { path, from, file }
const walk = (v, p, parent, key) => {
  if (typeof v === "string") {
    const target = stubTarget(v);
    if (target) return plan.push({ path: p, parent, key, from: v, file: target });
    if (missing.has(v)) {
      const id = parent?.id;
      const file = key === "image" && id === "qulay" ? QULAY_IMAGE : MICRO_SLOTS[key] ?? (key === "image" ? CREDIT_PRODUCTS[id] : undefined);
      if (file) plan.push({ path: p, parent, key, from: "(missing file) " + v.split("/").pop(), file });
      else plan.push({ path: p, parent, key, from: "(missing file, no Figma match) " + v.split("/").pop(), file: null });
    }
    return;
  }
  if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${p}[${i}]`, v, i));
  if (v && typeof v === "object") {
    // credit products with an empty picture
    if (typeof v.id === "string" && CREDIT_PRODUCTS[v.id] && "image" in v && !String(v.image || "").trim())
      plan.push({ path: `${p}.image`, parent: v, key: "image", from: "(empty)", file: CREDIT_PRODUCTS[v.id] });
    for (const [k, x] of Object.entries(v)) walk(x, `${p}.${k}`, v, k);
  }
};
walk(content, "content", null, null);

console.log(`\nplan: ${plan.length} replacements (${missing.size} media files missing on the server)`);
const byFile = {};
for (const p of plan) (byFile[p.file ?? "—"] ??= []).push(`${p.path}  ←  ${p.from.slice(0, 70)}`);
for (const [f, rows] of Object.entries(byFile)) console.log(`\n${f}\n  ` + rows.join("\n  "));

if (!APPLY) {
  console.log("\ndry run — nothing uploaded or changed. Re-run with --apply.");
  process.exit(0);
}

/* ── upload each needed file once (files already uploaded earlier are reused) ── */
const UPLOADS = path.join(ROOT, "CMS_UPLOADS.json");
const uploaded = fs.existsSync(UPLOADS) ? JSON.parse(fs.readFileSync(UPLOADS, "utf8")) : {};
for (const file of [...new Set(plan.map((p) => p.file).filter(Boolean))]) {
  if (uploaded[file]) continue;
  const buf = fs.readFileSync(path.join(ROOT, file));
  const type = file.endsWith(".svg") ? "image/svg+xml" : "image/webp";
  const form = new FormData();
  form.append("file", new Blob([buf], { type }), path.basename(file).replace(/\.(\w+)$/, `-figma.$1`));
  const r = await fetch(`${API}/media/upload`, { method: "POST", headers: H, body: form });
  const j = await json(r);
  if (!r.ok || !j.url) { console.log("upload failed", file, r.status, j.message || j.raw); process.exit(1); }
  uploaded[file] = j.url;
  fs.writeFileSync(UPLOADS, JSON.stringify(uploaded, null, 1));
  console.log("uploaded", file, "→", j.url);
}

/* ── save draft and publish ── */
for (const p of plan) if (p.file) p.parent[p.key] = uploaded[p.file];
// The CMS stores its static header JSON together with a module `default` key, which its own
// validation then rejects on save; it is a duplicate of the header and is re-merged by the server.
if (content.header && typeof content.header === "object") delete content.header.default;
const save = await fetch(`${API}/content/draft`, { method: "PUT", headers: { ...H, "Content-Type": "application/json" }, body: JSON.stringify({ content }) });
const saved = await json(save);
if (!save.ok) { console.log("save draft failed", save.status, JSON.stringify(saved.message || saved).slice(0, 500)); process.exit(1); }
console.log("draft saved");
const pub = await fetch(`${API}/content/publish`, { method: "POST", headers: H });
const pubj = await json(pub);
if (!pub.ok) { console.log("publish failed", pub.status, pubj.message); process.exit(1); }
console.log("published at", pubj.meta?.publishedUpdatedAt);
