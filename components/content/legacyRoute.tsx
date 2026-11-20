/**
 * Factory for catch-all routes that serve migrated pages of a section:
 *
 *   // app/aktsioneram/[...slug]/page.tsx
 *   const r = legacyRoute("aktsioneram");
 *   export const generateStaticParams = r.generateStaticParams;
 *   export const generateMetadata = r.generateMetadata;
 *   export default r.Page;
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LegacySectionView } from "@/components/content/LegacySectionView";
import { LEGACY_PAGES, getLegacyPage, legacyKeyByPath, sectionAllKeys } from "@/data/legacy/content";
import { findSection, inSection, type LegacySection } from "@/data/legacy/sections";

type Params = { params: Promise<{ slug: string[] }> };

export function resolveLegacy(section: LegacySection, slug: string[]) {
  const path = `${section.base}/${slug.map(decodeURIComponent).join("/")}`;
  const key = legacyKeyByPath(path);
  const page = key ? getLegacyPage(key) : undefined;
  return key && page && inSection(section, key, page) ? { key, page } : null;
}

export function legacyRoute(sectionId: string, extras?: Record<string, { before?: ReactNode; after?: ReactNode }>) {
  const section = findSection(sectionId);
  return {
    generateStaticParams: () =>
      sectionAllKeys(section).map((k) => ({ slug: LEGACY_PAGES[k].path!.slice(section.base.length + 1).split("/") })),
    generateMetadata: async ({ params }: Params): Promise<Metadata> => {
      const found = resolveLegacy(section, (await params).slug);
      if (!found) return {};
      return { title: found.page.title, description: `${found.page.title} — ${section.title}, ЧАБ «Трастбанк».` };
    },
    Page: async function LegacyPageRoute({ params }: Params) {
      const found = resolveLegacy(section, (await params).slug);
      if (!found) notFound();
      const extra = extras?.[found.page.path ?? ""];
      return <LegacySectionView section={section} pageKey={found.key} before={extra?.before} after={extra?.after} />;
    },
  };
}
