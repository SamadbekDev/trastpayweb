"use client";

import Link from "next/link";
import { Database, FileText } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";
import SectionIndex from "@/components/content/SectionIndex";
import { Breadcrumbs, PageHero, PageContainer } from "@/components/ui/PageKit";
import { useLang } from "@/hooks/useLang";
import { tr, trDeep } from "@/i18n/tr";
import { PAGES_DICT } from "@/i18n/dict/pages";
import { UI_DICT } from "@/i18n/dict/ui";
import { DOCUMENTS_CATEGORIES as DOCUMENTS_CATEGORIES_RU, OPEN_DATA_SETS as OPEN_DATA_SETS_RU } from "@/data/extraSections";

export default function DocumentsPage() {
  const lang = useLang();
  const t = (x: string) => tr(lang, x, PAGES_DICT, UI_DICT);
  const OPEN_DATA_SETS = trDeep(lang, OPEN_DATA_SETS_RU, PAGES_DICT, UI_DICT);
  const DOCUMENTS_CATEGORIES = trDeep(lang, DOCUMENTS_CATEGORIES_RU, PAGES_DICT, UI_DICT);
  return (
    <StaticPageShell>
      <section className="container-page pb-10 pt-6">
        <Breadcrumbs className="mb-6" items={[{ label: t("Главная"), href: "/" }, { label: t("Нормативные документы и открытые данные") }]} />
        <PageHero eyebrow={t("Банковское законодательство и открытые данные")} title={t("Нормативные документы и открытые данные")} subtitle={t("Правовая база банковской деятельности в Республике Узбекистан, внутренние документы банка и наборы открытых данных.")} />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {DOCUMENTS_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="flex flex-col gap-4 rounded-card border border-line bg-white p-6"
            >
              <div className="flex items-center gap-2.5">
                <FileText size={20} className="shrink-0 text-primary" />
                <h2 className="text-[18px] font-bold text-ink">
                  {cat.title}
                </h2>
              </div>
              <ul className="flex flex-col gap-2.5 text-[14px] text-ink-soft">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-[10px] bg-page px-3.5 py-2.5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-panel border border-line bg-white p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Database size={22} className="text-primary" />
              <h2 className="text-[22px] font-bold text-ink">
                {t("Открытые данные (Ochiq ma’lumotlar)")}
              </h2>
            </div>
            <Link
              href="/aktsioneram"
              className="text-[14px] font-semibold text-primary hover:text-primary-deep"
            >
              {t("Отчётность акционерам →")}
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {OPEN_DATA_SETS.map((ds) => (
              <div
                key={ds.name}
                className="flex items-center justify-between rounded-card border border-line bg-page px-4 py-3.5"
              >
                <span className="text-[14px] font-semibold text-ink">
                  {ds.name}
                </span>
                <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary">
                  {ds.formats}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PageContainer className="pb-12">
        <SectionIndex sectionId="dokumenty" className="" />
      </PageContainer>
    </StaticPageShell>
  );
}
