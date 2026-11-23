// Shared helpers for the scripts that write content into the CMS (dashboard-api).
// Sign-in uses the seed super admin from dashboard-api's .env; credentials are read from the file
// and never printed.
import fs from "node:fs";
import path from "node:path";

export function readEnv(envFile) {
  return Object.fromEntries(
    fs.readFileSync(envFile, "utf8").split(/\r?\n/).filter((l) => /^\w+=/.test(l)).map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()])
  );
}

async function json(res) {
  const t = await res.text();
  try { return JSON.parse(t); } catch { return { raw: t.slice(0, 200) }; }
}

/** Signs in and loads the draft. Exits when the draft already has someone's unpublished changes. */
export async function openCms(envFile) {
  const env = readEnv(envFile);
  const API = (env.PUBLIC_API_URL || `http://localhost:${env.PORT || 4000}`).replace(/\/$/, "") + "/api";
  const login = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: env.SEED_SUPER_ADMIN_EMAIL, password: env.SEED_SUPER_ADMIN_PASSWORD }),
  });
  const auth = await json(login);
  if (!login.ok || !auth.accessToken) { console.log("login failed:", login.status, auth.message || ""); process.exit(1); }
  const H = { Authorization: `Bearer ${auth.accessToken}` };

  const draftRes = await fetch(`${API}/content/draft`, { headers: H });
  const draft = await json(draftRes);
  if (!draftRes.ok) { console.log("draft:", draftRes.status, draft.message); process.exit(1); }
  if (draft.meta?.hasUnpublishedChanges) {
    console.log("STOP: the draft has unpublished changes (by", draft.meta.draftUpdatedBy, "at", draft.meta.draftUpdatedAt + ") — publish or reject them in the dashboard first.");
    process.exit(2);
  }

  return {
    content: draft.content,

    /** Uploads a buffer once; `cacheFile` maps cache keys to CMS media URLs so re-runs reuse uploads. */
    async upload(buffer, fileName, type, cacheFile, cacheKey) {
      const cache = fs.existsSync(cacheFile) ? JSON.parse(fs.readFileSync(cacheFile, "utf8")) : {};
      if (cache[cacheKey]) return cache[cacheKey];
      const form = new FormData();
      form.append("file", new Blob([buffer], { type }), fileName);
      const r = await fetch(`${API}/media/upload`, { method: "POST", headers: H, body: form });
      const j = await json(r);
      if (!r.ok || !j.url) { console.log("upload failed", fileName, r.status, j.message || j.raw); process.exit(1); }
      cache[cacheKey] = j.url;
      fs.mkdirSync(path.dirname(cacheFile), { recursive: true });
      fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 1));
      console.log("uploaded", fileName, "→", j.url);
      return j.url;
    },

    async saveAndPublish(content) {
      // The CMS stores its static header JSON with a module `default` key that its own validation rejects.
      if (content.header && typeof content.header === "object") delete content.header.default;
      const save = await fetch(`${API}/content/draft`, { method: "PUT", headers: { ...H, "Content-Type": "application/json" }, body: JSON.stringify({ content }) });
      const saved = await json(save);
      if (!save.ok) { console.log("save draft failed", save.status, JSON.stringify(saved.message || saved).slice(0, 500)); process.exit(1); }
      const pub = await fetch(`${API}/content/publish`, { method: "POST", headers: H });
      const pubj = await json(pub);
      if (!pub.ok) { console.log("publish failed", pub.status, pubj.message); process.exit(1); }
      console.log("published at", pubj.meta?.publishedUpdatedAt);
    },
  };
}
