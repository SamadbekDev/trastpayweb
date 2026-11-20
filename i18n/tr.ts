/**
 * Content translations keyed by the Russian source text.
 * Data files (data/*.ts) stay in Russian; each domain has a dictionary
 * (i18n/dict/*.ts) with the Uzbek (Latin) and English versions.
 * A missing entry falls back to Russian — `node scripts/i18n-check.mjs` lists them.
 */
import type { Language } from "@/types/pageConfig";

export type Dict = Record<string, { uz: string; en: string }>;

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

/** Translates one Russian string. */
export function tr(lang: Language, ru: string, ...dicts: Dict[]): string {
  if (lang === "ru" || !ru) return ru;
  const key = norm(ru);
  for (const d of dicts) {
    const hit = d[key] ?? d[ru];
    if (hit) return hit[lang];
  }
  return ru;
}

/** Translates every string inside a data object (cards, product details, menus…). Keys like href/id/slug are kept. */
export function trDeep<T>(lang: Language, value: T, ...dicts: Dict[]): T {
  if (lang === "ru") return value;
  const walk = (v: unknown, key?: string): unknown => {
    if (key && KEEP.has(key)) return v;
    if (typeof v === "string") return tr(lang, v, ...dicts);
    if (Array.isArray(v)) return v.map((x) => walk(x, key));
    // plain data objects only (keeps React components, icons, dates…)
    if (v && typeof v === "object" && Object.getPrototypeOf(v) === Object.prototype && !("$$typeof" in v)) {
      return Object.fromEntries(Object.entries(v as Record<string, unknown>).map(([k, x]) => [k, walk(x, k)]));
    }
    return v;
  };
  return walk(value) as T;
}

const KEEP = new Set(["id", "slug", "href", "url", "src", "image", "icon", "orderHref", "detailHref", "key", "path", "base", "legacyKey", "variant", "tone", "kind", "type"]);
