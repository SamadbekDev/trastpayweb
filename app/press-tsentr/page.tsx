"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";
import SectionIndex from "@/components/content/SectionIndex";
import { Breadcrumbs, PageHero, PageContainer } from "@/components/ui/PageKit";
import { useLang } from "@/hooks/useLang";
import { tr, trDeep } from "@/i18n/tr";
import { PAGES_DICT } from "@/i18n/dict/pages";
import { UI_DICT } from "@/i18n/dict/ui";
import { PRESS_FAQ as PRESS_FAQ_RU, PRESS_NEWS as PRESS_NEWS_RU } from "@/data/extraSections";

type FilterType = "Все" | "Новости" | "Объявления" | "Продажа имущества";

const FILTERS: { id: FilterType; uz: string }[] = [
  { id: "Все", uz: "Barchasi" },
  { id: "Новости", uz: "Yangiliklar" },
  { id: "Объявления", uz: "E’lonlar" },
  { id: "Продажа имущества", uz: "Sotuvdagi mulklar" },
];

export default function PressCenterPage() {
  const lang = useLang();
  const t = (x: string) => tr(lang, x, PAGES_DICT, UI_DICT);
  const PRESS_FAQ = trDeep(lang, PRESS_FAQ_RU, PAGES_DICT, UI_DICT);
  const [filter, setFilter] = useState<FilterType>("Все");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const items = useMemo(() => {
    const local = trDeep(lang, PRESS_NEWS_RU, PAGES_DICT, UI_DICT);
    if (filter === "Все") return local;
    return local.filter((_, i) => PRESS_NEWS_RU[i].category === filter);
  }, [filter, lang]);

  return (
    <StaticPageShell>
      <section className="container-page pb-10 pt-6">
        <Breadcrumbs className="mb-6" items={[{ label: t("Главная"), href: "/" }, { label: t("Новости, тендеры и продажа имущества") }]} />
        <PageHero eyebrow={t("Пресс-центр")} title={t("Новости, тендеры и продажа имущества")} subtitle={t("Официальные новости ЧАБ «Трастбанк», рейтинги, конкурсы, продажа недвижимости и ответы на частые вопросы клиентов.")} />

        <div className="mt-8 flex flex-wrap gap-2.5">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`cursor-pointer rounded-full px-5 py-2.5 text-[14px] font-semibold transition-colors ${
                  active
                    ? "bg-[#12122B] text-white"
                    : "border border-line bg-white text-ink hover:bg-surface"
                }`}
              >
                {t(f.id)}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-4 rounded-card border border-line bg-white p-6"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-2 text-[12px]">
                  <span className="rounded-full bg-primary-soft px-3 py-1 font-semibold text-primary">
                    {item.category}
                  </span>
                  <span className="text-text-muted">{item.date}</span>
                </div>
                <h2 className="text-[18px] font-bold leading-snug text-ink">
                  {item.titleRu}
                </h2>
                <p className="text-[14px] leading-relaxed text-ink-soft">
                  {item.summary}
                </p>
              </div>
              <Link
                href="/kontakty"
                className="text-[13px] font-semibold text-primary hover:text-primary-deep"
              >
                {t("Связаться с пресс-службой →")}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-14">
          <h2 className="mb-6 text-[26px] font-bold text-ink">
            {t("Вопрос — Ответ (FAQ)")}
          </h2>
          <div className="flex flex-col gap-3">
            {PRESS_FAQ.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-card border border-line bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-4 text-left"
                  >
                    <span className="text-[16px] font-semibold text-ink">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-text-muted transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-line px-6 py-4 text-[14px] leading-relaxed text-text-muted">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <PageContainer className="pb-12">
        <SectionIndex sectionId="press-tsentr" className="" />
      </PageContainer>
    </StaticPageShell>
  );
}
