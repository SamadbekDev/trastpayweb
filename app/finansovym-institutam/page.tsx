"use client";

import Link from "next/link";
import { Building2, Globe } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";
import SectionIndex from "@/components/content/SectionIndex";
import { Breadcrumbs, PageHero, PageContainer } from "@/components/ui/PageKit";
import { useLang } from "@/hooks/useLang";
import { tr, trDeep } from "@/i18n/tr";
import { PAGES_DICT } from "@/i18n/dict/pages";
import { UI_DICT } from "@/i18n/dict/ui";
import { FINANCIAL_INSTITUTIONS_DATA as FINANCIAL_INSTITUTIONS_DATA_RU } from "@/data/extraSections";

export default function FinancialInstitutionsPage() {
  const lang = useLang();
  const t = (x: string) => tr(lang, x, PAGES_DICT, UI_DICT);
  const FINANCIAL_INSTITUTIONS_DATA = trDeep(lang, FINANCIAL_INSTITUTIONS_DATA_RU, PAGES_DICT, UI_DICT);
  return (
    <StaticPageShell>
      <section className="container-page pb-10 pt-6">
        <Breadcrumbs className="mb-6" items={[{ label: t("Главная"), href: "/" }, { label: t("Межбанковское и международное сотрудничество") }]} />
        <PageHero eyebrow={t("Финансовым институтам")} title={t("Межбанковское и международное сотрудничество")} subtitle={t("ЧАБ «Трастбанк» развивает корреспондентские отношения с банками Узбекистана и зарубежными финансовыми институтами, проводит операции на межбанковском рынке и выпускает документарные аккредитивы.")} />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {FINANCIAL_INSTITUTIONS_DATA.directions.map((dir) => (
            <div
              key={dir.title}
              className="flex flex-col gap-3 rounded-card border border-line bg-white p-6"
            >
              <h2 className="text-[19px] font-bold text-ink">
                {dir.title}
              </h2>
              <p className="text-[14px] leading-relaxed text-text-muted">
                {dir.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-panel border border-line bg-white p-6 lg:p-8">
            <div className="flex items-center gap-3">
              <Building2 size={22} className="text-primary" />
              <h2 className="text-[20px] font-bold text-ink">
                {t("Банки-корреспонденты в Узбекистане")}
              </h2>
            </div>
            <ul className="mt-4 divide-y divide-line">
              {FINANCIAL_INSTITUTIONS_DATA.domesticBanks.map((bank) => (
                <li
                  key={bank}
                  className="py-3 text-[15px] font-medium text-ink"
                >
                  {bank}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-panel border border-line bg-white p-6 lg:p-8">
            <div className="flex items-center gap-3">
              <Globe size={22} className="text-primary" />
              <h2 className="text-[20px] font-bold text-ink">
                {t("Зарубежные банки-корреспонденты")}
              </h2>
            </div>
            <ul className="mt-4 divide-y divide-line">
              {FINANCIAL_INSTITUTIONS_DATA.foreignBanks.map((bank) => (
                <li
                  key={bank.name}
                  className="flex items-center justify-between gap-4 py-3 text-[15px]"
                >
                  <span className="font-semibold text-ink">
                    {bank.name}
                  </span>
                  <span className="rounded-full bg-surface px-3 py-1 text-[12px] font-medium text-text-muted">
                    {bank.country}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-card border border-line bg-white p-6">
          <div className="text-[15px] text-ink">
            <strong>{t("SWIFT код ЧАБ «Трастбанк»:")}</strong> TRSAUZ22 ·{" "}
            <Link href="/investitsii" className="font-semibold text-primary">
              {t("Инвестиционные программы →")}
            </Link>
          </div>
          <Link
            href="/kontakty"
            className="inline-flex h-11 items-center rounded-tile bg-primary px-6 text-[14px] font-semibold text-white hover:bg-primary-deep"
          >
            {t("Контакты и реквизиты")}
          </Link>
        </div>
      </section>
      <PageContainer className="pb-12">
        <SectionIndex sectionId="finansovym-institutam" className="" />
      </PageContainer>
    </StaticPageShell>
  );
}
