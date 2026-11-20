"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";
import SectionIndex from "@/components/content/SectionIndex";
import { Breadcrumbs, PageHero, PageContainer } from "@/components/ui/PageKit";
import { useLang } from "@/hooks/useLang";
import { tr, trDeep } from "@/i18n/tr";
import { PAGES_DICT } from "@/i18n/dict/pages";
import { UI_DICT } from "@/i18n/dict/ui";
import { INVESTORS_SECTIONS as INVESTORS_SECTIONS_RU } from "@/data/institutionalPages";

export default function InvestorsPage() {
  const lang = useLang();
  const t = (x: string) => tr(lang, x, PAGES_DICT, UI_DICT);
  const INVESTORS_SECTIONS = trDeep(lang, INVESTORS_SECTIONS_RU, PAGES_DICT, UI_DICT);
  return (
    <StaticPageShell>
      <section className="container-page pb-10 pt-6">
        <Breadcrumbs className="mb-6" items={[{ label: t("Главная"), href: "/" }, { label: t("Акционерам и инвесторам") }]} />
        <PageHero eyebrow={t("Корпоративное управление и раскрытие информации")} title={t("Акционерам и инвесторам")} subtitle={t("Ключевые сведения о корпоративном управлении, структуре акционерного капитала, финансовой отчётности и собраниях акционеров ЧАБ «Трастбанк» (тикер на РФБ «Тошкент»: TRSB).")} />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {INVESTORS_SECTIONS.map((sec) => (
            <div
              key={sec.id}
              id={sec.id}
              className="flex flex-col gap-4 rounded-panel border border-line bg-white p-6 lg:p-8"
            >
              <span className="w-fit rounded-full bg-surface px-3 py-1 text-[12px] font-semibold text-primary">
                {sec.badge}
              </span>
              <h2 className="text-[22px] font-bold text-ink">
                {sec.title}
              </h2>
              <p className="text-[14px] leading-relaxed text-text-muted">
                {sec.description}
              </p>
              <ul className="mt-2 flex flex-col gap-2.5 border-t border-line pt-4">
                {sec.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[14px] text-ink-soft"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-card border border-line bg-white p-6 lg:p-8">
          <div>
            <h3 className="text-[18px] font-bold text-ink">
              {t("Нужны официальные документы или реквизиты?")}
            </h3>
            <p className="mt-1 text-[14px] text-text-muted">
              {t("Свяжитесь с корпоративным секретариатом или перейдите в раздел «О банке».")}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/o-banke"
              className="inline-flex h-11 items-center rounded-tile bg-surface px-5 text-[14px] font-semibold text-ink hover:bg-line"
            >
              {t("О банке")}
            </Link>
            <Link
              href="/kontakty"
              className="inline-flex h-11 items-center rounded-tile bg-primary px-5 text-[14px] font-semibold text-white hover:bg-primary-deep"
            >
              {t("Контакты и реквизиты")}
            </Link>
          </div>
        </div>
      </section>
      <PageContainer className="pb-12">
        <SectionIndex sectionId="aktsioneram" className="" />
      </PageContainer>
    </StaticPageShell>
  );
}
