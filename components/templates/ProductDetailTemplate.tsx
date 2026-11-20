"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, CheckCircle2, FileText } from "lucide-react";
import { CorporateDetailData } from "@/data/corporatePage";
import { pickText, useLang } from "@/hooks/useLang";
import { tr, trDeep } from "@/i18n/tr";
import { CORPORATE_DICT } from "@/i18n/dict/corporate";

export default function ProductDetailTemplate({
  data: source,
  backHref = "/biznes",
  backLabel = "Корпоративным клиентам",
}: {
  data: CorporateDetailData;
  backHref?: string;
  backLabel?: string;
}) {
  const lang = useLang();
  const t = (s: string) => tr(lang, s, CORPORATE_DICT);
  const data = useMemo(() => trDeep(lang, source, CORPORATE_DICT), [lang, source]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full bg-page pb-16">
      {/* Breadcrumbs */}
      <div className="container-page flex items-center gap-2 pt-6 text-[13px] text-text-muted">
        <Link href="/" className="hover:text-ink">
          {pickText(lang, "Главная", "Bosh sahifa", "Home")}
        </Link>
        <span>/</span>
        <Link href={backHref} className="hover:text-ink">
          {t(backLabel)}
        </Link>
        <span>/</span>
        <span className="font-medium text-ink">{data.title}</span>
      </div>

      {/* Hero — Figma 1674:20038 pattern adapted to homepage */}
      <section className="container-page mt-6">
        <div
          className="flex flex-col justify-between gap-8 rounded-panel p-6 text-white lg:flex-row lg:items-center lg:p-12"
          style={{
            background: "linear-gradient(125deg, #0B2A4A 0%, #123B78 100%)",
          }}
        >
          <div className="flex max-w-[660px] flex-col items-start gap-5">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3.5 py-1.5 text-[13px] font-medium text-[#93C5FD]">
              {data.category}
            </span>
            <h1 className="text-[28px] font-bold leading-[1.15] sm:text-[36px] lg:text-[42px]">
              {data.title}
            </h1>
            <p className="text-[16px] leading-[1.5] text-white/80 lg:text-[17px]">
              {data.subtitle}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/zayavki?tab=business"
                className="inline-flex h-12 items-center justify-center rounded-tile bg-primary px-7 text-[15px] font-semibold text-white transition-colors hover:bg-primary-deep"
              >
                {t("Оставить заявку")}
              </Link>
              <Link
                href="/tarify"
                className="inline-flex h-12 items-center justify-center rounded-tile bg-white/15 px-7 text-[15px] font-semibold text-white transition-colors hover:bg-white/25"
              >
                {t("Все тарифы")}
              </Link>
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-3 rounded-card border border-white/20 bg-white/10 p-6 backdrop-blur-sm lg:w-[340px]">
            <span className="text-[13px] font-medium text-white/75">
              {data.heroMetricLabel}
            </span>
            <div className="text-[34px] font-bold leading-tight">
              {data.heroMetricValue}
            </div>
            <span className="text-[13px] text-white/75">
              {data.heroMetricSub}
            </span>
            <div className="my-1 h-px w-full bg-white/20" />
            <div className="flex flex-col gap-2.5">
              {data.heroFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center justify-between gap-3 text-[13px]"
                >
                  <span className="text-white/75">{fact.label}</span>
                  <span className="text-right font-semibold text-white">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="container-page mt-12">
        <h2 className="mb-6 text-[24px] font-bold text-ink lg:text-[28px]">
          {t("Основные условия")}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.conditions.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-2 rounded-card border border-line bg-white p-6"
            >
              <span className="text-[13px] font-medium text-text-muted">
                {item.label}
              </span>
              <span className="text-[17px] font-bold text-ink">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits & Documents */}
      <section className="container-page mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-card border border-line bg-white p-6 lg:p-8">
          <h3 className="text-[20px] font-bold text-ink">
            {t("Преимущества для бизнеса")}
          </h3>
          <ul className="flex flex-col gap-3">
            {data.benefits.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-soft"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 rounded-card border border-line bg-white p-6 lg:p-8">
          <h3 className="text-[20px] font-bold text-ink">
            {t("Необходимые документы")}
          </h3>
          <ul className="flex flex-col gap-3">
            {data.documents.map((doc) => (
              <li
                key={doc}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-soft"
              >
                <FileText
                  size={18}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      {data.faq.length > 0 && (
        <section className="container-page mt-12">
          <h2 className="mb-6 text-[24px] font-bold text-ink">
            {t("Частые вопросы")}
          </h2>
          <div className="flex flex-col gap-3">
            {data.faq.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className="rounded-card border border-line bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-4 text-left"
                  >
                    <span className="text-[16px] font-semibold text-ink">
                      {item.q}
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
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
