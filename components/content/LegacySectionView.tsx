/**
 * Section inner page (Figma Ultimate Design · «О банке — страницы» layout):
 * breadcrumbs → soft hero → content panel → prev/next, with the section sidebar on the right.
 * Server component: the page is prerendered in ru / uz / en (texts of the old site in each
 * language) and <ByLang> shows the one matching the UI language.
 */
import type { ReactNode } from "react";
import StaticPageShell from "@/components/layout/StaticPageShell";
import ByLang from "@/components/i18n/ByLang";
import { ContentBlocks } from "@/components/content/ContentBlocks";
import {
  Breadcrumbs,
  PageContainer,
  PageHero,
  PagerNav,
  Panel,
  SectionLayout,
  SideNav,
  type Crumb,
} from "@/components/ui/PageKit";
import { LEGACY_PAGES, getLegacyPageIn, legacyAncestors, legacyTitleIn } from "@/data/legacy/content";
import { LEGACY_INDEX, inSection, legacyLabel, sectionKeys, sectionTitle, sectionTree, type LegacySection } from "@/data/legacy/sections";
import { tr } from "@/i18n/tr";
import { UI_DICT } from "@/i18n/dict/ui";
import type { Language } from "@/types/pageConfig";

export function SectionSideNav({ section, activeHref, lang = "ru" }: { section: LegacySection; activeHref: string; lang?: Language }) {
  return (
    <SideNav
      title={sectionTitle(section, lang)}
      overview={{ label: tr(lang, "Обзор раздела", UI_DICT), href: section.base }}
      items={sectionTree(section, lang).map((n) => ({ label: n.label, href: n.href, children: n.children.length ? n.children : undefined }))}
      activeHref={activeHref}
    />
  );
}

/** Notice shown when a page has no Uzbek / English version on the old site. */
export function RussianOnlyNote({ lang }: { lang: Language }) {
  return (
    <p className="rounded-tile bg-primary-soft px-4 py-3 text-[13px] leading-5 text-primary">
      {tr(lang, "Материал опубликован только на русском языке.", UI_DICT)}
    </p>
  );
}

function SectionPage({
  section,
  pageKey,
  lang,
  before,
  after,
}: {
  section: LegacySection;
  pageKey: string;
  lang: Language;
  before?: ReactNode;
  after?: ReactNode;
}) {
  const { page, fallback } = getLegacyPageIn(pageKey, lang)!;
  const keys = sectionKeys(section);
  const ancestors = legacyAncestors(pageKey).filter((k) => inSection(section, k, LEGACY_PAGES[k]));
  const label = (k: string) => (LEGACY_INDEX[k] ? legacyLabel(k, lang) : legacyTitleIn(k, lang));
  // Detail pages are not in the menu: highlight their nearest menu ancestor, link back to the parent.
  const menuKey = page.detail ? [...ancestors].reverse().find((k) => keys.includes(k)) : pageKey;
  const parentKey = ancestors.at(-1);
  const idx = page.detail ? -1 : keys.indexOf(pageKey);
  const prevKey = idx > 0 ? keys[idx - 1] : undefined;
  const nextKey = idx >= 0 && idx < keys.length - 1 ? keys[idx + 1] : undefined;

  const crumbs: Crumb[] = [
    { label: tr(lang, "Главная", UI_DICT), href: "/" },
    { label: sectionTitle(section, lang), href: section.base },
    ...ancestors.map((k) => ({ label: label(k), href: LEGACY_PAGES[k].path! })),
    { label: page.detail ? page.title : legacyLabel(pageKey, lang) },
  ];

  return (
    <PageContainer className="flex flex-col gap-6 pb-6 pt-6">
      <Breadcrumbs items={crumbs} />
      <SectionLayout sidebar={<SectionSideNav section={section} lang={lang} activeHref={(menuKey && LEGACY_INDEX[menuKey]?.path) ?? ""} />}>
        <PageHero variant="soft" eyebrow={sectionTitle(section, lang)} title={page.title} />
        {fallback ? <RussianOnlyNote lang={lang} /> : null}
        {before}
        <Panel>
          <ContentBlocks blocks={page.blocks} lang={lang} />
        </Panel>
        {after}
        <PagerNav
          lang={lang}
          prevLabel={page.detail ? "Назад к разделу" : undefined}
          prev={
            page.detail && parentKey
              ? { label: label(parentKey), href: LEGACY_PAGES[parentKey].path! }
              : prevKey
                ? { label: legacyLabel(prevKey, lang), href: LEGACY_INDEX[prevKey].path! }
                : undefined
          }
          next={nextKey ? { label: legacyLabel(nextKey, lang), href: LEGACY_INDEX[nextKey].path! } : undefined}
        />
      </SectionLayout>
    </PageContainer>
  );
}

export function LegacySectionView({
  section,
  pageKey,
  before,
  after,
}: {
  section: LegacySection;
  pageKey: string;
  /** Extra content rendered above / below the migrated blocks (e.g. forms). */
  before?: ReactNode;
  after?: ReactNode;
}) {
  const render = (lang: Language) => <SectionPage section={section} pageKey={pageKey} lang={lang} before={before} after={after} />;
  return (
    <StaticPageShell>
      <ByLang ru={render("ru")} uz={render("uz")} en={render("en")} />
    </StaticPageShell>
  );
}
