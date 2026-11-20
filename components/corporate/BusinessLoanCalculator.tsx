"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { pickText, useLang } from "@/hooks/useLang";

const COLLATERAL_OPTIONS = [
  {
    id: "realty",
    ru: "Недвижимость / автотранспорт и спецтехника",
    uz: "Ko‘chmas mulk / avtotransport va maxsus texnika",
    en: "Real estate / vehicles & special machinery",
    insuranceRate: 0.004,
  },
  {
    id: "equipment",
    ru: "Оборудование",
    uz: "Asbob-uskunalar",
    en: "Equipment",
    insuranceRate: 0.006,
  },
  {
    id: "fx_deposit",
    ru: "Депозит в иностранной валюте",
    uz: "Xorijiy valyutadagi depozit",
    en: "Foreign currency deposit",
    insuranceRate: 0,
  },
] as const;

export default function BusinessLoanCalculator() {
  const lang = useLang();
  const [amountMln, setAmountMln] = useState<number>(500);
  const [months, setMonths] = useState<number>(36);
  const [rate, setRate] = useState<number>(22);
  const [graceMonths, setGraceMonths] = useState<number>(6);
  const [collateralId, setCollateralId] = useState<string>("realty");

  const calc = useMemo(() => {
    const principal = amountMln * 1_000_000;
    const monthlyRate = rate / 100 / 12;
    const repayMonths = Math.max(1, months - graceMonths);
    const monthlyPayment =
      monthlyRate > 0
        ? (principal * monthlyRate) /
          (1 - Math.pow(1 + monthlyRate, -repayMonths))
        : principal / repayMonths;
    const graceInterest = principal * monthlyRate;

    const col =
      COLLATERAL_OPTIONS.find((c) => c.id === collateralId) ??
      COLLATERAL_OPTIONS[0];
    const insuranceCost = principal * col.insuranceRate * (months / 12);
    const appraisalCost = collateralId === "fx_deposit" ? 0 : 3_000_000;
    const notaryCost = collateralId === "fx_deposit" ? 0 : 1_000_000;

    return {
      monthlyPayment,
      graceInterest,
      insuranceCost,
      appraisalCost,
      notaryCost,
    };
  }, [amountMln, months, rate, graceMonths, collateralId]);

  const fmt = (n: number) =>
    Math.round(n).toLocaleString("ru-RU");

  return (
    <div className="rounded-panel border border-line bg-white p-6 lg:p-10">
      <div className="flex flex-col gap-2">
        <span className="w-fit rounded-full bg-primary-soft px-3 py-1 text-[12px] font-semibold text-primary">
          {pickText(lang, "Калькулятор для бизнеса", "Biznes kalkulyatori", "Business Loan Calculator")}
        </span>
        <h2 className="text-[24px] font-bold text-ink lg:text-[28px]">
          {pickText(
            lang,
            "Расчёт бизнес-кредита и сопутствующих расходов",
            "Biznes krediti va qo‘shimcha xarajatlarni hisoblash",
            "Calculate Business Loan & Related Costs"
          )}
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-ink">
              {pickText(lang, "Сумма кредита (млн сум)", "Kredit summasi (mln so‘m)", "Loan amount (mln UZS)")}
            </label>
            <input
              type="number"
              min={50}
              max={10000}
              step={50}
              value={amountMln}
              onChange={(e) => setAmountMln(Math.max(50, Number(e.target.value) || 50))}
              className="h-12 rounded-tile border border-line bg-page px-4 text-[15px] font-bold text-ink outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-ink">
              {pickText(lang, "Срок кредита (мес.)", "Kredit muddati (oy)", "Loan term (months)")}
            </label>
            <select
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="h-12 rounded-tile border border-line bg-page px-4 text-[14px] font-semibold text-ink outline-none focus:border-primary"
            >
              {[12, 18, 24, 36, 48, 60].map((m) => (
                <option key={m} value={m}>
                  {m} {pickText(lang, "мес.", "oy", "mo.")}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-ink">
              {pickText(lang, "Годовая ставка (%)", "Yillik foiz stavkasi (%)", "Annual interest rate (%)")}
            </label>
            <input
              type="number"
              min={14}
              max={35}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Math.max(1, Number(e.target.value) || 22))}
              className="h-12 rounded-tile border border-line bg-page px-4 text-[15px] font-bold text-ink outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-ink">
              {pickText(lang, "Льготный период (мес.)", "Imtiyozli davr (oy)", "Grace period (months)")}
            </label>
            <select
              value={graceMonths}
              onChange={(e) => setGraceMonths(Number(e.target.value))}
              className="h-12 rounded-tile border border-line bg-page px-4 text-[14px] font-semibold text-ink outline-none focus:border-primary"
            >
              {[0, 1, 2, 3, 6, 12].filter((g) => g < months).map((g) => (
                <option key={g} value={g}>
                  {g} {pickText(lang, "мес.", "oy", "mo.")}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-[13px] font-semibold text-ink">
              {pickText(lang, "Обеспечение по кредиту", "Kredit ta’minoti", "Collateral type")}
            </label>
            <select
              value={collateralId}
              onChange={(e) => setCollateralId(e.target.value)}
              className="h-12 rounded-tile border border-line bg-page px-4 text-[14px] font-semibold text-ink outline-none focus:border-primary"
            >
              {COLLATERAL_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {pickText(lang, c.ru, c.uz, c.en)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary Card */}
        <div className="flex flex-col justify-between gap-4 rounded-card bg-page p-6">
          <div className="flex flex-col gap-3">
            <span className="text-[13px] font-medium text-text-muted">
              {pickText(lang, "Ежемесячный платёж (после льготного периода)", "Oylik to‘lov (imtiyozli davrdan so‘ng)", "Monthly payment (after grace)")}
            </span>
            <div className="text-[28px] font-bold text-primary">
              {fmt(calc.monthlyPayment)} {pickText(lang, "сум", "so‘m", "UZS")}
            </div>

            <div className="my-1 h-px bg-line" />

            <div className="flex justify-between text-[13px]">
              <span className="text-text-muted">
                {pickText(lang, "Платёж в льготный период", "Imtiyozli davrda to‘lov", "Grace period interest")}
              </span>
              <span className="font-semibold text-ink">
                {fmt(calc.graceInterest)} {pickText(lang, "сум", "so‘m", "UZS")}
              </span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-text-muted">
                {pickText(lang, "Страхование (ориентировочно)", "Sug‘urta xarajatlari", "Est. insurance")}
              </span>
              <span className="font-semibold text-ink">
                {fmt(calc.insuranceCost)} {pickText(lang, "сум", "so‘m", "UZS")}
              </span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-text-muted">
                {pickText(lang, "Оценка имущества (ср.)", "Mulkni baholash (o‘rt.)", "Appraisal (avg.)")}
              </span>
              <span className="font-semibold text-ink">
                {fmt(calc.appraisalCost)} {pickText(lang, "сум", "so‘m", "UZS")}
              </span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-text-muted">
                {pickText(lang, "Нотариальное оформление (ср.)", "Notarial rasmiylashtirish", "Notary fee (avg.)")}
              </span>
              <span className="font-semibold text-ink">
                {fmt(calc.notaryCost)} {pickText(lang, "сум", "so‘m", "UZS")}
              </span>
            </div>
          </div>

          <Link
            href="/zayavki?tab=business"
            className="mt-2 inline-flex h-11 items-center justify-center rounded-tile bg-primary text-[14px] font-semibold text-white hover:bg-primary-deep"
          >
            {pickText(lang, "Оставить заявку", "Ariza yuborish", "Apply online")}
          </Link>
        </div>
      </div>
    </div>
  );
}
