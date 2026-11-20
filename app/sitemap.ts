import type { MetadataRoute } from "next";
import { ABOUT_BASE, ABOUT_LOCAL_PAGES } from "@/data/aboutSection";
import { aboutDetailParams } from "@/components/about/AboutViews";
import { LEGACY_PAGES, sectionAllKeys } from "@/data/legacy/content";
import { LEGACY_SECTIONS } from "@/data/legacy/sections";

const BASE_URL = "https://trustbank.uz";

const ROUTES = [
  { path: "/", priority: 1.0 },
  { path: "/karty", priority: 0.9 },
  { path: "/kredity", priority: 0.9 },
  { path: "/kredity/scoring", priority: 0.8 },
  { path: "/vklady", priority: 0.9 },
  { path: "/perevody", priority: 0.85 },
  { path: "/valyuta", priority: 0.9 },
  { path: "/tarify", priority: 0.85 },
  { path: "/filialy", priority: 0.85 },
  { path: "/biznes", priority: 0.95 },
  { path: "/biznes/rko", priority: 0.8 },
  { path: "/biznes/lizing", priority: 0.8 },
  { path: "/biznes/garantii", priority: 0.8 },
  { path: "/biznes/faktoring", priority: 0.8 },
  { path: "/biznes/ved", priority: 0.8 },
  { path: "/biznes/terminaly", priority: 0.75 },
  { path: "/biznes/zarplatnyj-proekt", priority: 0.75 },
  { path: "/biznes/tsennye-bumagi", priority: 0.75 },
  { path: "/biznes/capital-house", priority: 0.8 },
  { path: "/biznes/express", priority: 0.8 },
  { path: "/biznes/partnyer-biznesa", priority: 0.8 },
  { path: "/biznes/biznes-ipoteka", priority: 0.8 },
  { path: "/biznes/refinans", priority: 0.8 },
  { path: "/servisy", priority: 0.8 },
  { path: "/zayavki", priority: 0.85 },
  { path: "/o-banke", priority: 0.8 },
  { path: "/aktsioneram", priority: 0.8 },
  { path: "/press-tsentr", priority: 0.8 },
  { path: "/finansovym-institutam", priority: 0.75 },
  { path: "/investitsii", priority: 0.75 },
  { path: "/dokumenty", priority: 0.75 },
  { path: "/blanki", priority: 0.75 },
  { path: "/obrashcheniya", priority: 0.8 },
  { path: "/vakansii", priority: 0.7 },
  { path: "/kontakty", priority: 0.85 },
  { path: "/karta-sajta", priority: 0.6 },
  ...ABOUT_LOCAL_PAGES.map((p) => ({ path: `${ABOUT_BASE}/${p.slug}`, priority: 0.6 })),
  ...aboutDetailParams().map((p) => ({ path: `${ABOUT_BASE}/${p.slug.join("/")}`, priority: 0.4 })),
  // Pages migrated from the old trustbank.uz (section subpages and their detail pages)
  ...LEGACY_SECTIONS.flatMap((s) =>
    sectionAllKeys(s).map((k) => ({ path: LEGACY_PAGES[k].path!, priority: LEGACY_PAGES[k].detail ? 0.4 : 0.5 }))
  ),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const unique = ROUTES.filter((r, i) => ROUTES.findIndex((x) => x.path === r.path) === i);
  return unique.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.priority >= 0.9 ? "daily" : "weekly",
    priority: r.priority,
  }));
}
