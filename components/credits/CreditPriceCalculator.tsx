"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CreditCalculatorContent } from "@/types/credits";
import { useCreditText } from "./text";
import FintechRangeSlider from "@/components/ui/FintechRangeSlider";
import { formatAmount } from "@/components/ui/AmountSlider";

function annuity(principal: number, annualRate: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRate / 12;
  if (r === 0) return principal / months;
  const pow = Math.pow(1 + r, months);
  return (principal * r * pow) / (pow - 1);
}

export default function CreditPriceCalculator({
  calc,
}: {
  calc: CreditCalculatorContent;
}) {
  const text = useCreditText();
  const tabs = calc.kind === "auto" ? calc.brands : calc.regions;
  const [tabId, setTabId] = useState(tabs[0]?.id || "");
  const active = tabs.find((item) => item.id === tabId) || tabs[0];
  const [price, setPrice] = useState(calc.priceDefault);
  const [down, setDown] = useState(calc.downDefault);
  const [months, setMonths] = useState(calc.termDefault);

  const priceMin = calc.priceMin;
  const priceMax = calc.priceMax;
  const downMin = calc.downMin;
  const downMax = calc.downMax;
  const termMin = calc.termMin;
  const termMax = calc.termMax;
  const rate = active?.rate ?? calc.rate;
  const maxLoan = active?.maxLoan;

  const result = useMemo(() => {
    const downAmount = Math.round((price * down) / 100);
    const requested = Math.max(price - downAmount, 0);
    const loan = maxLoan ? Math.min(requested, maxLoan) : requested;
    return {
      downAmount,
      loan,
      monthly: annuity(loan, rate, months),
      capped: Boolean(maxLoan && requested > maxLoan),
    };
  }, [price, down, months, rate, maxLoan]);

  const currency = text(calc.currencySuffix);
  const monthsWord = text(calc.monthsSuffix);
  const fromWord = text(calc.fromWord);
  const toWord = text(calc.toWord);
  const rateLabel = text(active?.rateLabel) || text(calc.rateLabel);

  const rows = [
    [text(calc.loanLabel), `${formatAmount(result.loan)} ${currency}`],
    [text(calc.downAmountLabel), `${formatAmount(result.downAmount)} ${currency}`],
    [text(calc.rateCaption), rateLabel],
    [text(calc.termCaption), `${months} ${monthsWord}`],
  ];

  return (
    <section
      id="calculator"
      className="relative flex w-full items-center overflow-hidden py-12 lg:py-16"
      style={{
        background:
          "linear-gradient(135deg, #4B7FE8 0%, #7BA3F0 42%, #C8B896 78%, #E8D4A8 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-[#5A93EC]/55 via-[#8EB0F0]/35 to-[#D4C09A]/45" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 lg:px-[60px]">
        <div
          className="flex flex-col gap-3 rounded-[28px] p-5 sm:gap-4 sm:rounded-[32px] sm:p-8"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.18) 100%)",
            backdropFilter: "blur(48px)",
            WebkitBackdropFilter: "blur(48px)",
            boxShadow: "0 8px 40px rgba(15, 40, 90, 0.12)",
          }}
        >
          {tabs.length > 0 && (
            <div className="flex justify-start">
              <div className="inline-flex max-w-full gap-0.5 overflow-x-auto rounded-[16px] bg-white/35 p-1 backdrop-blur-sm">
                {tabs.map((item) => {
                  const on = tabId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTabId(item.id)}
                      className={`shrink-0 cursor-pointer rounded-[12px] px-3 py-2.5 text-[13px] font-medium leading-[120%] transition-colors sm:px-[18px] sm:text-[14px] ${
                        on
                          ? "bg-white text-[#0F172A] shadow-[0_2px_8px_rgba(15,23,42,0.08)]"
                          : "text-[#1A1A2E]/65 hover:text-[#0F172A]"
                      }`}
                    >
                      {text(item.label)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_430px] lg:gap-6">
            <div className="flex flex-col justify-center gap-4">
              <div className="grid grid-cols-1 gap-10 rounded-[18px] bg-white px-5 py-6 sm:grid-cols-2 sm:px-7 sm:py-6">
                <FintechRangeSlider
                  label={text(calc.priceLabel)}
                  value={price}
                  min={priceMin}
                  max={priceMax}
                  step={calc.priceStep || 500_000}
                  displayValue={`${formatAmount(price)} ${currency}`}
                  minLabel={`${fromWord} ${formatAmount(priceMin)} ${currency}`}
                  maxLabel={`${toWord} ${formatAmount(priceMax)} ${currency}`}
                  onChange={setPrice}
                />
                <FintechRangeSlider
                  label={text(calc.downLabel)}
                  value={down}
                  min={downMin}
                  max={downMax}
                  step={1}
                  displayValue={`${down} %`}
                  minLabel={`${fromWord} ${downMin}%`}
                  maxLabel={`${toWord} ${downMax}%`}
                  onChange={setDown}
                />
              </div>

              <div className="rounded-[18px] bg-white px-5 py-6 sm:px-7">
                <FintechRangeSlider
                  label={text(calc.termQuestion)}
                  value={months}
                  min={termMin}
                  max={termMax}
                  step={1}
                  displayValue={`${months} ${monthsWord}`}
                  minLabel={`${fromWord} ${termMin} ${monthsWord}`}
                  maxLabel={`${toWord} ${termMax} ${monthsWord}`}
                  onChange={setMonths}
                />
              </div>
            </div>

            <aside className="flex flex-col gap-3 rounded-[20px] bg-[linear-gradient(90deg,#123B78_0%,#0B2A4A_100%)] px-8 py-6 text-white">
              <div className="flex flex-col gap-3">
                <p className="text-[15px] font-semibold leading-[18px] text-[#C7D6EE]">
                  {text(calc.resultLabel)}
                </p>
                <p className="text-[32px] font-bold leading-[44px] sm:text-[36px]">
                  {formatAmount(result.monthly)} {currency}
                </p>
              </div>
              <div className="h-px w-full bg-white/[0.18]" />
              <div className="flex flex-col gap-3">
                {rows.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 text-[14px] leading-[17px]"
                  >
                    <span className="text-[#C7D6EE]">{label}</span>
                    <span className="text-right font-semibold">{value}</span>
                  </div>
                ))}
              </div>
              <Link
                href="#zayavka"
                className="inline-flex h-[51px] shrink-0 items-center justify-center rounded-xl bg-[#535BF1] text-[16px] font-semibold leading-[19px] text-white hover:bg-[#454ce0]"
              >
                {text(calc.submitLabel)}
              </Link>
              <p className="text-[13px] leading-[1.45] text-[#9DB2D6]">
                {text(calc.disclaimer)}
                {result.capped && maxLoan
                  ? ` ${text(calc.limitNote)} ${formatAmount(maxLoan)} ${currency}.`
                  : ""}
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
