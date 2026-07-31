"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, HelpCircle, TrendingUp, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DepositCalculatorConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";

const fmt = (n: number) =>
  Math.round(n).toLocaleString("ru-RU").replace(/,/g, " ");

interface DepositCalculatorProps {
  config?: DepositCalculatorConfig;
}

export default function DepositCalculator({ config }: DepositCalculatorProps) {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const MONTH_MIN = 1;
  const MONTH_MAX = 24;
  const AMOUNT_MIN = 50000;
  const AMOUNT_MAX = 30000000;
  const BASE_RATE = 11;
  const UZS_RATE = 98.13;

  function calcPromoRate(months: number, replenishable: boolean) {
    let bonus = 2.14 * Math.min(months / 6, 2);
    if (replenishable) bonus += 0.5;
    return +(BASE_RATE + bonus).toFixed(2);
  }

  function calcYield(rate: number) {
    const y = (Math.pow(1 + rate / 100 / 12, 12) - 1) * 100;
    return +y.toFixed(1);
  }

  const currencyOptions = config?.currencyOptions || [];

  const [activeCurrencyId, setActiveCurrencyId] = useState<string>(currencyOptions[0]?.id || "");
  const [months, setMonths] = useState(6);
  const [amount, setAmount] = useState(1000000);
  const [replenishable, setReplenishable] = useState(false);

  const rate = useMemo(
    () => calcPromoRate(months, replenishable),
    [months, replenishable],
  );
  const yieldRate = useMemo(() => calcYield(rate), [rate]);

  const profit = useMemo(
    () => amount * (rate / 100) * (months / 12),
    [amount, rate, months],
  );
  const endSum = amount + profit;
  const endSumUzs = endSum * UZS_RATE;

  const rateBoxBgColor = config?.rateBoxColor || "#E8F1FF";

  const offerBannerText = getLocalizedText(config?.offerBannerText, currentLang);
  const offerBannerBtn = getLocalizedText(config?.offerBannerButtonText, currentLang);
  const titleText = getLocalizedText(config?.title, currentLang);
  const currencyLabel = getLocalizedText(config?.currencyLabel, currentLang);
  const termLabel = getLocalizedText(config?.termLabel, currentLang);
  const amountLabel = getLocalizedText(config?.amountLabel, currentLang);
  const replenishableLabel = getLocalizedText(config?.replenishableLabel, currentLang);
  const rateLabel = getLocalizedText(config?.rateLabel, currentLang);
  const yieldLabel = getLocalizedText(config?.yieldLabel, currentLang);
  const endAmountLabel = getLocalizedText(config?.endAmountLabel, currentLang);
  const legalText = getLocalizedText(config?.legalText, currentLang);
  const resultLabel = getLocalizedText(config?.resultLabel, currentLang);
  const resultNote = getLocalizedText(config?.resultNote, currentLang);
  const ctaText = getLocalizedText(config?.ctaText, currentLang);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-[752px] rounded-[28px] bg-white p-10 shadow-[0_20px_60px_-8px_rgba(6,52,123,0.12)]">
        {(offerBannerText || offerBannerBtn) && (
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2 text-[13px] text-[#244A7F0F]">
              <BadgeCheck className="h-5 w-5 shrink-0 text-blue-600" />
              <span className="text-[#333333]">
                {offerBannerText}{" "}
                {offerBannerBtn && (
                  <a
                    href="#"
                    className="text-blue-600 underline underline-offset-2"
                  >
                    {offerBannerBtn}
                  </a>
                )}
              </span>
            </div>
            {offerBannerBtn && (
              <button className="shrink-0 rounded-lg bg-blue-700 px-4 py-1.5 text-[14px] font-semibold text-white hover:bg-blue-800 transition-colors">
                {offerBannerBtn}
              </button>
            )}
          </div>
        )}

        {titleText && (
          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            {titleText}
          </h1>
        )}

        <div className="mt-5">
          {currencyLabel && (
            <p className="text-xs text-slate-400">
              {currencyLabel}
              <span className="text-red-500">*</span>
            </p>
          )}
          {currencyOptions.length > 0 && (
            <div className="mt-2 flex gap-2">
              {currencyOptions.map((opt) => {
                const optLabel = getLocalizedText(opt.label, currentLang);
                if (!optLabel) return null;

                return (
                  <button
                    key={opt.id}
                    onClick={() => setActiveCurrencyId(opt.id)}
                    className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                      activeCurrencyId === opt.id
                        ? "border-blue-600 text-blue-700 bg-blue-50"
                        : "border-slate-200 text-slate-500"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                        activeCurrencyId === opt.id ? "border-blue-600" : "border-slate-300"
                      }`}
                    >
                      {activeCurrencyId === opt.id && (
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                      )}
                    </span>
                    {optLabel}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-400">
              {termLabel || "Срок вклада"}
            </p>
            <p className="mt-0.5 text-[15px] font-semibold text-slate-900">
              {months} месяцев
            </p>
            <input
              type="range"
              min={MONTH_MIN}
              max={MONTH_MAX}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="range-slider mt-3 w-full"
              style={{
                background: `linear-gradient(to right, #1d4ed8 ${
                  ((months - MONTH_MIN) / (MONTH_MAX - MONTH_MIN)) * 100
                }%, #e2e8f0 0%)`,
              }}
            />
            <div className="mt-2 flex justify-between text-[11px] text-slate-400">
              <span>1 месяц</span>
              <span>24 месяца</span>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-400">
              {amountLabel || "Сумма вклада"}
            </p>
            <p className="mt-0.5 text-[15px] font-semibold text-slate-900">
              {fmt(amount)} ₽
            </p>
            <input
              type="range"
              min={AMOUNT_MIN}
              max={AMOUNT_MAX}
              step={10000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="range-slider mt-3 w-full"
              style={{
                background: `linear-gradient(to right, #1d4ed8 ${
                  ((amount - AMOUNT_MIN) / (AMOUNT_MAX - AMOUNT_MIN)) * 100
                }%, #e2e8f0 0%)`,
              }}
            />
            <div className="mt-2 flex justify-between text-[11px] text-slate-400">
              <span>{fmt(AMOUNT_MIN)}</span>
              <span>{fmt(AMOUNT_MAX)}</span>
            </div>
          </div>
        </div>

        {replenishableLabel && (
          <label className="mt-4 flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={replenishable}
              onChange={(e) => setReplenishable(e.target.checked)}
              className="h-5 w-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700">
              {replenishableLabel}
            </span>
            <HelpCircle className="h-4 w-4 text-slate-300" />
          </label>
        )}

        <div className="mt-4 rounded-2xl p-5" style={{ backgroundColor: rateBoxBgColor }}>
          <p className="text-xl font-bold text-blue-700">
            {rateLabel && `${rateLabel} `}{rate}%{" "}
            <span className="ml-1 text-sm font-medium text-slate-400 line-through">
              {BASE_RATE}%
            </span>
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-slate-900">{yieldRate}%</p>
              {yieldLabel && (
                <p className="flex items-center gap-1 text-xs text-slate-500">
                  {yieldLabel}{" "}
                  <HelpCircle className="h-3.5 w-3.5 text-slate-300" />
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="flex items-center justify-end gap-2 text-lg font-bold text-slate-900">
                {fmt(endSum)}
                <span className="flex items-center gap-0.5 text-sm font-semibold text-emerald-500">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {fmt(profit)} сум
                </span>
              </p>
              {endAmountLabel && (
                <p className="flex items-center justify-end gap-1 text-xs text-slate-500">
                  {endAmountLabel}{" "}
                  <HelpCircle className="h-3.5 w-3.5 text-slate-300" />
                </p>
              )}
            </div>
          </div>
        </div>

        {legalText && (
          <p className="mt-3 text-xs text-slate-400">
            {legalText}
          </p>
        )}

        <hr className="mt-5 border-slate-100" />

        {resultLabel && (
          <p className="mt-5 text-lg font-semibold text-slate-900">
            {resultLabel}
          </p>
        )}
        <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">
          {fmt(endSumUzs)}
        </p>
        <p className="text-lg font-bold text-slate-900">UZS*</p>

        <div className="mt-4 flex items-center gap-3">
          {resultNote && (
            <p className="flex-1 text-[11px] leading-snug text-slate-400">
              {resultNote}
            </p>
          )}
          <button
            aria-label="Открыть календарь"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <Calendar className="h-5 w-5" />
          </button>
          {ctaText && (
            <button className="shrink-0 rounded-full bg-blue-700 px-6 py-3.5 text-xs font-bold tracking-wide text-white hover:bg-blue-800 transition-colors whitespace-nowrap">
              {ctaText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
