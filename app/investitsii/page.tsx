"use client";

import Link from "next/link";
import { Ban, CheckCircle2 } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";
import { Breadcrumbs, PageHero } from "@/components/ui/PageKit";
import { useLang } from "@/hooks/useLang";
import { tr, trDeep } from "@/i18n/tr";
import { PAGES_DICT } from "@/i18n/dict/pages";
import { UI_DICT } from "@/i18n/dict/ui";
import { ITFC_INVESTMENT_DATA as ITFC_INVESTMENT_DATA_RU } from "@/data/extraSections";

export default function InvestmentsPage() {
  const lang = useLang();
  const t = (x: string) => tr(lang, x, PAGES_DICT, UI_DICT);
  const ITFC_INVESTMENT_DATA = trDeep(lang, ITFC_INVESTMENT_DATA_RU, PAGES_DICT, UI_DICT);
  return (
    <StaticPageShell>
      <section className="container-page pb-10 pt-6">
        <Breadcrumbs className="mb-6" items={[{ label: t("Главная"), href: "/" }, { label: t("Инвестиционные предложения и линия ITFC") }]} />
        <PageHero eyebrow={t("Инвестиции и торговое финансирование")} title={t("Инвестиционные предложения и линия ITFC")} subtitle={t("ЧАБ «Трастбанк» приглашает предпринимателей и инвесторов к реализации проектов с использованием международных кредитных линий и инструментов торгового финансирования.")} />

        <div className="mt-10 rounded-panel border border-line bg-white p-6 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
            <div>
              <span className="text-[13px] font-semibold text-primary">
                {t("Договор от")} {ITFC_INVESTMENT_DATA.date}
              </span>
              <h2 className="mt-1 text-[24px] font-bold text-ink">
                {ITFC_INVESTMENT_DATA.partner}
              </h2>
            </div>
            <div className="rounded-card bg-primary-soft px-6 py-3 text-right">
              <div className="text-[12px] font-medium text-text-muted">
                {t("Сумма линии")}
              </div>
              <div className="text-[26px] font-bold text-primary">
                {ITFC_INVESTMENT_DATA.amount}
              </div>
            </div>
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
            <strong>{t("Механизм финансирования:")}</strong>{" "}
            {ITFC_INVESTMENT_DATA.mechanism}.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-card bg-page p-6">
              <h3 className="text-[17px] font-bold text-ink">
                {t("Допустимые проекты")}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {ITFC_INVESTMENT_DATA.eligible.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[14px] text-ink-soft"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-[#0D9488]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card bg-page p-6">
              <h3 className="text-[17px] font-bold text-ink">
                {t("Исключённые отрасли")}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {ITFC_INVESTMENT_DATA.prohibited.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[14px] text-ink-soft"
                  >
                    <Ban size={16} className="mt-0.5 shrink-0 text-[#DC2626]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/zayavki?tab=business"
              className="inline-flex h-11 items-center rounded-tile bg-primary px-6 text-[14px] font-semibold text-white hover:bg-primary-deep"
            >
              {t("Подать заявку на финансирование")}
            </Link>
            <Link
              href="/finansovym-institutam"
              className="inline-flex h-11 items-center rounded-tile bg-surface px-6 text-[14px] font-semibold text-ink hover:bg-line"
            >
              {t("Финансовым институтам")}
            </Link>
          </div>
        </div>
      </section>
    </StaticPageShell>
  );
}
