"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, CheckCircle2, MapPin } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";
import SectionIndex from "@/components/content/SectionIndex";
import { PageContainer } from "@/components/ui/PageKit";
import { useLang } from "@/hooks/useLang";
import { tr, trDeep } from "@/i18n/tr";
import { PAGES_DICT } from "@/i18n/dict/pages";
import { UI_DICT } from "@/i18n/dict/ui";
import {
  CURRENCY_OPERATIONS as CURRENCY_OPERATIONS_RU,
  EXCHANGE_RATES_TABLE as EXCHANGE_RATES_TABLE_RU,
  EXCHANGE_RATES_UPDATED,
} from "@/data/currencyPage";

export default function CurrencyPage() {
  const lang = useLang();
  const t = (x: string) => tr(lang, x, PAGES_DICT, UI_DICT);
  const EXCHANGE_RATES_TABLE = useMemo(() => trDeep(lang, EXCHANGE_RATES_TABLE_RU, PAGES_DICT, UI_DICT), [lang]);
  const CURRENCY_OPERATIONS = trDeep(lang, CURRENCY_OPERATIONS_RU, PAGES_DICT, UI_DICT);
  const [amount, setAmount] = useState<string>("100");
  const [selectedCode, setSelectedCode] = useState<string>("USD");
  const [direction, setDirection] = useState<"toUzs" | "fromUzs">("toUzs");

  const activeRate = useMemo(
    () =>
      EXCHANGE_RATES_TABLE.find((r) => r.code === selectedCode) ??
      EXCHANGE_RATES_TABLE[0],
    [selectedCode, EXCHANGE_RATES_TABLE]
  );

  const numericAmount = parseFloat(amount.replace(/\s+/g, "")) || 0;
  const converted = useMemo(() => {
    if (direction === "toUzs") {
      return numericAmount * activeRate.buy;
    }
    return activeRate.sell > 0 ? numericAmount / activeRate.sell : 0;
  }, [numericAmount, activeRate, direction]);

  return (
    <StaticPageShell>
      {/* Hero */}
      <section className="container-page pt-8">
        <div className="flex flex-col items-center justify-between gap-8 rounded-panel border border-line bg-white p-6 lg:flex-row lg:p-10">
          <div className="flex max-w-[640px] flex-col gap-4">
            <span className="w-fit rounded-full bg-primary-soft px-3.5 py-1.5 text-[13px] font-semibold text-primary">
              {t("Курсы валют")} ·{" "}
              {t("Обновлено")} {EXCHANGE_RATES_UPDATED}
            </span>
            <h1 className="text-[32px] font-bold leading-[1.15] text-ink lg:text-[40px]">
              {t("Курсы валют и валютно-обменные операции")}
            </h1>
            <p className="text-[16px] leading-relaxed text-text-muted">
              {t("Актуальные курсы покупки, продажи и курс ЦБ РУз. Обмен наличной валюты в офисах Трастбанка и мгновенная онлайн-конвертация в приложении Trastpay.")}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/filialy"
                className="inline-flex h-11 items-center gap-2 rounded-tile bg-primary px-6 text-[14px] font-semibold text-white hover:bg-primary-deep"
              >
                <MapPin size={16} />
                <span>{t("Обменные пункты на карте")}</span>
              </Link>
              <a
                href="#converter"
                className="inline-flex h-11 items-center rounded-tile bg-surface px-6 text-[14px] font-semibold text-ink hover:bg-line"
              >
                {t("Калькулятор обмена")}
              </a>
            </div>
          </div>

          <div className="relative h-[220px] w-full max-w-[340px] shrink-0 overflow-hidden rounded-card">
            <Image
              src="/images/static/currency-hero.jpg"
              alt={t("Валютные операции Трастбанка")}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Exchange Rates Table */}
      <section className="container-page mt-12">
        <div className="overflow-hidden rounded-panel border border-line bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-6 py-5">
            <div>
              <h2 className="text-[22px] font-bold text-ink">
                {t("Курсы иностранных валют (UZS)")}
              </h2>
              <p className="text-[13px] text-text-muted">
                {t("Данные на")} {EXCHANGE_RATES_UPDATED}
              </p>
            </div>
            <span className="rounded-full bg-surface px-3 py-1 text-[12px] font-medium text-text-muted">
              {t("За 1 единицу валюты")}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-line bg-page text-[13px] font-semibold text-text-muted">
                  <th className="px-6 py-3.5">{t("Валюта")}</th>
                  <th className="px-6 py-3.5">{t("Покупка банком")}</th>
                  <th className="px-6 py-3.5">{t("Продажа банком")}</th>
                  <th className="px-6 py-3.5">{t("Курс ЦБ РУз")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-[15px]">
                {EXCHANGE_RATES_TABLE.map((row) => (
                  <tr
                    key={row.code}
                    className="transition-colors hover:bg-page"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-12 items-center justify-center rounded-[10px] bg-primary-soft text-[13px] font-bold text-primary">
                          {row.code}
                        </span>
                        <span className="font-semibold text-ink">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-ink">
                      {row.buy.toLocaleString("ru-RU")} {t("сум")}
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">
                      {row.sell.toLocaleString("ru-RU")} {t("сум")}
                    </td>
                    <td className="px-6 py-4 text-text-muted">
                      {row.cbu.toLocaleString("ru-RU")} {t("сум")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive Converter */}
      <section
        id="converter"
        className="container-page mt-12"
      >
        <div className="rounded-panel border border-line bg-white p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-[22px] font-bold text-ink">
              {t("Конвертер валют")}
            </h2>
            <button
              type="button"
              onClick={() =>
                setDirection((d) => (d === "toUzs" ? "fromUzs" : "toUzs"))
              }
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-surface px-4 py-2 text-[13px] font-semibold text-ink hover:bg-line"
            >
              <ArrowLeftRight size={15} />
              <span>
                {direction === "toUzs"
                  ? `${selectedCode} → UZS (${t("покупка")})`
                  : `UZS → ${selectedCode} (${t("продажа")})`}
              </span>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-text-muted">
                {t("Валюта")}
              </label>
              <select
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                className="h-13 rounded-tile border border-line bg-page px-4 text-[15px] font-semibold text-ink outline-none focus:border-primary"
              >
                {EXCHANGE_RATES_TABLE.map((r) => (
                  <option key={r.code} value={r.code}>
                    {r.code} — {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-text-muted">
                {direction === "toUzs"
                  ? `${t("Сумма")} (${selectedCode})`
                  : "Сумма (UZS)"}
              </label>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-13 rounded-tile border border-line bg-page px-4 text-[16px] font-bold text-ink outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-semibold text-text-muted">
                {t("Результат расчёта")}
              </span>
              <div className="flex h-13 items-center rounded-tile bg-primary-soft px-4 text-[18px] font-bold text-primary">
                {converted.toLocaleString("ru-RU", {
                  maximumFractionDigits: 2,
                })}{" "}
                {direction === "toUzs" ? "UZS" : selectedCode}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Currency Operations */}
      <section
        id="operations"
        className="container-page mt-12 pb-16"
      >
        <h2 className="mb-6 text-[24px] font-bold text-ink lg:text-[28px]">
          {t("Валютно-обменные операции")}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CURRENCY_OPERATIONS.map((op) => (
            <div
              key={op.id}
              className="flex flex-col gap-4 rounded-card border border-line bg-white p-6"
            >
              <h3 className="text-[18px] font-bold text-ink">
                {op.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-text-muted">
                {op.description}
              </p>
              <ul className="mt-auto flex flex-col gap-2 border-t border-line pt-4">
                {op.details.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2 text-[13px] text-ink-soft"
                  >
                    <CheckCircle2
                      size={15}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <PageContainer className="pb-12">
        <SectionIndex sectionId="valyuta" className="" />
      </PageContainer>
    </StaticPageShell>
  );
}
