/**
 * Sections that host pages migrated from the old trustbank.uz (see scripts/legacy).
 * Client-safe: uses only the small index.json (titles + routes), never the full content.
 */
import INDEX from "./index.json";
import type { Language } from "@/types/pageConfig";
import { tr } from "@/i18n/tr";
import { UI_DICT } from "@/i18n/dict/ui";

export interface LegacyIndexEntry {
  title: string;
  path: string | null;
  /** Titles of the Uzbek / English versions of the page on the old site (when they exist) */
  uz?: string;
  en?: string;
}

export const LEGACY_INDEX = INDEX as Record<string, LegacyIndexEntry>;

export interface LegacySection {
  id: string;
  base: string;
  title: string;
  /** Old-site path prefixes (without /ru/) that belong to this section */
  roots: string[];
  exclude?: string[];
}

export const LEGACY_SECTIONS: LegacySection[] = [
  { id: "aktsioneram", base: "/aktsioneram", title: "Акционерам и инвесторам", roots: ["shareholders"] },
  { id: "press-tsentr", base: "/press-tsentr", title: "Пресс-центр", roots: ["press_center"] },
  { id: "obrashcheniya", base: "/obrashcheniya", title: "Обращения граждан", roots: ["services/citizens"] },
  { id: "servisy", base: "/servisy", title: "Сервисы", roots: ["services", "private/communal"], exclude: ["services/citizens", "services/blanks"] },
  { id: "finansovym-institutam", base: "/finansovym-institutam", title: "Финансовым институтам", roots: ["financial-organizations"] },
  { id: "dokumenty", base: "/dokumenty", title: "Банковское законодательство", roots: ["documents"] },
  { id: "tarify", base: "/tarify", title: "Тарифы", roots: ["private/tariffs", "corporate/tariffs"] },
  { id: "kontakty", base: "/kontakty", title: "Контакты", roots: ["contacts"] },
  { id: "biznes", base: "/biznes", title: "Корпоративным клиентам", roots: ["corporate"], exclude: ["corporate/tariffs"] },
  { id: "valyuta", base: "/valyuta", title: "Валюта", roots: ["private/currency-exchange-transactions"] },
  { id: "blanki", base: "/blanki", title: "Бланки и образцы", roots: ["services/blanks"] },
];

/** Shorter sidebar labels for very long legacy titles. */
const NAV_LABELS: Record<string, string> = {
  "shareholders/corporate-management/rating": "Оценка корпоративного управления",
  "shareholders/corporate-management/documents": "Внутренние документы по Кодексу",
  "shareholders/corporate-management/code": "Следование Кодексу корпоративного управления",
  "shareholders/distribution-of-profits/dividends": "Дивиденды за 3 года",
  "shareholders/distribution-of-profits/justification-of-distribution": "Обоснование распределения прибыли",
  "shareholders/general-meetings": "Общие собрания акционеров",
  "shareholders/structure/over-20-percent": "Акционеры свыше 20%",
  "shareholders/structure/over-5-percent": "Акционеры свыше 5%",
  "shareholders/disclosures/annual-reports": "Квартальные и годовые отчёты",
  "shareholders/disclosures/material-facts": "Существенные факты",
  "shareholders/reports": "Финансовая отчётность за год",
  "shareholders/hotline": "Горячая линия акционерам",
  "services/citizens/law": "Закон об обращениях",
  "services/citizens/rating-score": "Рейтинговая оценка филиалов",
  "documents/izmenyonnie-dokumenti": "Утратившие силу документы",
};

export const legacyLabel = (key: string, lang: Language = "ru"): string =>
  lang === "ru" ? (NAV_LABELS[key] ?? LEGACY_INDEX[key]?.title ?? key) : (LEGACY_INDEX[key]?.[lang] ?? legacyLabel(key));

/** Section title in the UI language. */
export const sectionTitle = (s: LegacySection, lang: Language = "ru") => tr(lang, s.title, UI_DICT);

const parentKey = (k: string) => k.split("/").slice(0, -1).join("/");

export function inSection(s: LegacySection, key: string, e: { path: string | null }) {
  if (!e.path || !e.path.startsWith(s.base + "/")) return false;
  if (s.exclude?.some((x) => key === x || key.startsWith(x + "/"))) return false;
  return s.roots.some((r) => key === r || key.startsWith(r + "/"));
}

/** Legacy keys of the section's subpages in source order (old site menu order). */
export function sectionKeys(s: LegacySection): string[] {
  return Object.entries(LEGACY_INDEX)
    .filter(([k, e]) => inSection(s, k, e))
    .map(([k]) => k);
}

export interface NavNode {
  key: string;
  label: string;
  href: string;
  children: { key: string; label: string; href: string }[];
}

/** Two-level tree: top-level pages, with deeper pages folded under their nearest listed ancestor. */
export function sectionTree(s: LegacySection, lang: Language = "ru"): NavNode[] {
  const keys = sectionKeys(s);
  const set = new Set(keys);
  /** Topmost ancestor of `k` that is itself a page of this section (or `k` when none). */
  const rootOf = (k: string) => {
    let root = k;
    for (let p = parentKey(k); p; p = parentKey(p)) if (set.has(p)) root = p;
    return root;
  };
  const top = new Map<string, NavNode>();
  for (const k of keys) {
    const r = rootOf(k);
    if (r === k) top.set(k, { key: k, label: legacyLabel(k, lang), href: LEGACY_INDEX[k].path!, children: [] });
  }
  for (const k of keys) {
    const r = rootOf(k);
    if (r !== k) top.get(r)?.children.push({ key: k, label: legacyLabel(k, lang), href: LEGACY_INDEX[k].path! });
  }
  return [...top.values()];
}

export const findSection = (id: string) => LEGACY_SECTIONS.find((s) => s.id === id)!;

export function keyForPath(s: LegacySection, path: string): string | undefined {
  return sectionKeys(s).find((k) => LEGACY_INDEX[k].path === path);
}
