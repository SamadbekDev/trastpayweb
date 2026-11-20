/**
 * «О банке» — overview + inner pages (Figma Ultimate Design · «О банке — страницы»).
 * Server components: migrated content is read from data/legacy on the server and every page is
 * prerendered in ru / uz / en; <ByLang> shows the one matching the UI language.
 */
import type { ReactNode } from "react";
import StaticPageShell from "@/components/layout/StaticPageShell";
import ByLang from "@/components/i18n/ByLang";
import { ContentBlocks } from "@/components/content/ContentBlocks";
import { RussianOnlyNote } from "@/components/content/LegacySectionView";
import AnticorruptionForm from "@/components/forms/AnticorruptionForm";
import {
  Breadcrumbs,
  CardGrid,
  LinkCard,
  PageContainer,
  PageHero,
  PagerNav,
  Panel,
  PendingContent,
  SectionHeading,
  SectionLayout,
  SideNav,
} from "@/components/ui/PageKit";
import {
  ABOUT_BASE,
  ABOUT_GROUPS,
  ABOUT_LOCAL_PAGES,
  ABOUT_OVERVIEW,
  ABOUT_SIDENAV,
  aboutHref,
  findAboutPage,
  type AboutPage,
} from "@/data/aboutSection";
import { LEGACY_PAGES, getLegacyPageIn, legacyAncestors, legacyDetailKeys, legacyKeyByPath, legacyTitleIn } from "@/data/legacy/content";
import { tr, trDeep } from "@/i18n/tr";
import { UI_DICT } from "@/i18n/dict/ui";
import type { Language } from "@/types/pageConfig";

const ui = (lang: Language, s: string) => tr(lang, s, UI_DICT);
const ALL: Language[] = ["ru", "uz", "en"];

/** Renders `render(lang)` for each language and shows the current one. */
function Localized({ render }: { render: (lang: Language) => ReactNode }) {
  const [ru, uz, en] = ALL.map(render);
  return (
    <StaticPageShell>
      <ByLang ru={ru} uz={uz} en={en} />
    </StaticPageShell>
  );
}

function AboutSideNav({ activeHref, lang }: { activeHref: string; lang: Language }) {
  return (
    <SideNav
      title={ui(lang, "О банке")}
      overview={{ label: ui(lang, "Обзор раздела"), href: ABOUT_BASE }}
      items={trDeep(lang, ABOUT_SIDENAV, UI_DICT)}
      activeHref={activeHref}
    />
  );
}

export function AboutOverview() {
  return (
    <Localized
      render={(lang) => {
        const o = trDeep(lang, ABOUT_OVERVIEW, UI_DICT);
        return (
          <PageContainer className="flex flex-col gap-6 pb-6 pt-6">
            <Breadcrumbs items={[{ label: ui(lang, "Главная"), href: "/" }, { label: o.title }]} />
            <SectionLayout sidebar={<AboutSideNav activeHref={ABOUT_BASE} lang={lang} />}>
              <PageHero
                variant="brand"
                eyebrow={o.eyebrow}
                title={o.title}
                subtitle={o.text}
                image="/images/static/about-bank-hero.jpg"
                imageAlt={ui(lang, "Головной офис ЧАБ «Трастбанк»")}
                stats={o.stats}
              />
              {ABOUT_GROUPS.map((g) => (
                <section key={g.id} className="flex flex-col gap-4">
                  <SectionHeading id={g.id} title={ui(lang, g.title)} />
                  <CardGrid cols={3}>
                    {g.pages.map((p) => (
                      <LinkCard key={p.slug} href={aboutHref(p)} icon={p.icon} title={ui(lang, p.title)} description={ui(lang, p.description)} />
                    ))}
                  </CardGrid>
                </section>
              ))}
            </SectionLayout>
          </PageContainer>
        );
      }}
    />
  );
}

/** Interactive extras rendered under specific pages (old-site functions). */
const PAGE_EXTRAS: Record<string, ReactNode> = {
  antikorruptsiya: <AnticorruptionForm />,
};

function aboutBody(page: AboutPage, lang: Language) {
  const legacy = page.legacyKey ? getLegacyPageIn(page.legacyKey, lang) : undefined;
  if (legacy?.page.blocks.length) return { blocks: legacy.page.blocks, fallback: legacy.fallback };
  return { blocks: page.blocks ? trDeep(lang, page.blocks, UI_DICT) : undefined, fallback: false };
}

export function AboutSubpage({ slug }: { slug: string }) {
  const found = findAboutPage(slug);
  if (!found) return null;
  const { group, page, prev, next } = found;
  const href = aboutHref(page);

  return (
    <Localized
      render={(lang) => {
        const { blocks, fallback } = aboutBody(page, lang);
        return (
          <PageContainer className="flex flex-col gap-6 pb-6 pt-6">
            <Breadcrumbs
              items={[
                { label: ui(lang, "Главная"), href: "/" },
                { label: ui(lang, "О банке"), href: ABOUT_BASE },
                { label: ui(lang, group.title), href: aboutHref(group.pages[0]) },
                { label: ui(lang, page.title) },
              ]}
            />
            <SectionLayout sidebar={<AboutSideNav activeHref={href} lang={lang} />}>
              <PageHero variant="soft" eyebrow={ui(lang, group.title)} title={ui(lang, page.title)} subtitle={ui(lang, page.heroSubtitle ?? page.description)} />
              {fallback ? <RussianOnlyNote lang={lang} /> : null}
              <Panel>{blocks?.length ? <ContentBlocks blocks={blocks} lang={lang} /> : <PendingContent lang={lang} />}</Panel>
              {PAGE_EXTRAS[slug]}
              <PagerNav
                lang={lang}
                prev={prev ? { label: ui(lang, prev.title), href: aboutHref(prev) } : undefined}
                next={next ? { label: ui(lang, next.title), href: aboutHref(next) } : undefined}
              />
            </SectionLayout>
          </PageContainer>
        );
      }}
    />
  );
}

/* ───────── third-level pages of «О банке» (units, awards, management cards…) ───────── */

/** Old-site prefixes of «О банке» pages that have migrated detail pages. */
const aboutLegacyRoots = () => ABOUT_LOCAL_PAGES.flatMap((p) => (p.legacyKey ? [p.legacyKey] : []));

/** Slug arrays of all «О банке» detail pages, for generateStaticParams. */
export function aboutDetailParams(): { slug: string[] }[] {
  return aboutLegacyRoots()
    .flatMap((root) => legacyDetailKeys(root))
    .map((k) => ({ slug: LEGACY_PAGES[k].path!.slice(ABOUT_BASE.length + 1).split("/") }));
}

export function resolveAboutDetail(slug: string[]) {
  const key = legacyKeyByPath(`${ABOUT_BASE}/${slug.map(decodeURIComponent).join("/")}`);
  const page = key ? LEGACY_PAGES[key] : undefined;
  if (!key || !page?.detail || !key.startsWith("about/")) return null;
  return { key, page };
}

export function AboutDetail({ slug }: { slug: string[] }) {
  const found = resolveAboutDetail(slug);
  if (!found) return null;
  const { key } = found;
  const ancestors = legacyAncestors(key);
  const parentKey = ancestors.at(-1);
  const owner = ABOUT_LOCAL_PAGES.find((p) => p.legacyKey && ancestors.includes(p.legacyKey));
  const ownerHref = owner ? aboutHref(owner) : ABOUT_BASE;

  return (
    <Localized
      render={(lang) => {
        const { page, fallback } = getLegacyPageIn(key, lang)!;
        const label = (k: string) => (k === owner?.legacyKey ? ui(lang, owner.title) : legacyTitleIn(k, lang));
        return (
          <PageContainer className="flex flex-col gap-6 pb-6 pt-6">
            <Breadcrumbs
              items={[
                { label: ui(lang, "Главная"), href: "/" },
                { label: ui(lang, "О банке"), href: ABOUT_BASE },
                ...ancestors.filter((k) => k !== "about").map((k) => ({ label: label(k), href: LEGACY_PAGES[k].path! })),
                { label: page.title },
              ]}
            />
            <SectionLayout sidebar={<AboutSideNav activeHref={ownerHref} lang={lang} />}>
              <PageHero variant="soft" eyebrow={owner ? ui(lang, owner.title) : ui(lang, "О банке")} title={page.title} />
              {fallback ? <RussianOnlyNote lang={lang} /> : null}
              <Panel>
                <ContentBlocks blocks={page.blocks} lang={lang} />
              </Panel>
              <PagerNav
                lang={lang}
                prevLabel="Назад к разделу"
                prev={parentKey ? { label: label(parentKey), href: LEGACY_PAGES[parentKey].path! } : undefined}
              />
            </SectionLayout>
          </PageContainer>
        );
      }}
    />
  );
}
