import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StaticPageShell from "@/components/layout/StaticPageShell";
import ProductDetailTemplate from "@/components/templates/ProductDetailTemplate";
import { ContentBlocks } from "@/components/content/ContentBlocks";
import { legacyRoute, resolveLegacy } from "@/components/content/legacyRoute";
import { PageContainer, Panel, SectionHeading } from "@/components/ui/PageKit";
import { CORPORATE_DETAILS } from "@/data/corporatePage";
import { findSection } from "@/data/legacy/sections";
import ByLang from "@/components/i18n/ByLang";
import { RussianOnlyNote } from "@/components/content/LegacySectionView";
import { getLegacyPageIn } from "@/data/legacy/content";
import { tr } from "@/i18n/tr";
import { CORPORATE_DICT } from "@/i18n/dict/corporate";
import type { Language } from "@/types/pageConfig";

/**
 * /biznes/<product>: curated product template when we have one (data/corporatePage.ts),
 * otherwise the page migrated from the old trustbank.uz. Curated pages also show the
 * full conditions from the old site below the template.
 */
const section = findSection("biznes");
const legacy = legacyRoute("biznes");

type Params = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const curated = Object.keys(CORPORATE_DETAILS).map((s) => ({ slug: [s] }));
  const migrated = legacy.generateStaticParams().filter((p) => !(p.slug.length === 1 && CORPORATE_DETAILS[p.slug[0]]));
  return [...curated, ...migrated];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const detail = slug.length === 1 ? CORPORATE_DETAILS[slug[0]] : undefined;
  if (detail) return { title: detail.title, description: `${detail.title} — корпоративным клиентам ЧАБ «Трастбанк».` };
  return legacy.generateMetadata({ params });
}

/** Full conditions of a curated product, as published on the old site (in the given language). */
function conditions(key: string, lang: Language) {
  const { page, fallback } = getLegacyPageIn(key, lang)!;
  return (
    <PageContainer as="section" className="flex flex-col gap-4 pb-16">
      <SectionHeading id="usloviya" title={tr(lang, "Подробные условия", CORPORATE_DICT)} />
      {fallback ? <RussianOnlyNote lang={lang} /> : null}
      <Panel>
        <ContentBlocks blocks={page.blocks} lang={lang} />
      </Panel>
    </PageContainer>
  );
}

export default async function BusinessDetailPage({ params }: Params) {
  const { slug } = await params;
  const detail = slug.length === 1 ? CORPORATE_DETAILS[slug[0]] : undefined;
  const migrated = resolveLegacy(section, slug);

  if (detail) {
    return (
      <StaticPageShell>
        <ProductDetailTemplate data={detail} />
        {migrated ? (
          <ByLang ru={conditions(migrated.key, "ru")} uz={conditions(migrated.key, "uz")} en={conditions(migrated.key, "en")} />
        ) : null}
      </StaticPageShell>
    );
  }

  if (!migrated) notFound();
  return legacy.Page({ params });
}
