"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import FintechRangeSlider from "@/components/ui/FintechRangeSlider";
import { formatAmount } from "@/components/ui/AmountSlider";
import { CreditCalculatorContent } from "@/types/credits";
import { useCreditText } from "./text";

export default function MicroLoanCalculator({
  calc,
}: {
  calc: CreditCalculatorContent;
}) {
  const text = useCreditText();
  const tabs = calc.tabs || [];
  const collateral = calc.toggles || [];
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "income");
  const [amount, setAmount] = useState(calc.amountDefault || 50_000_000);
  const [months, setMonths] = useState(calc.termDefault || 36);
  const [collateralId, setCollateralId] = useState(
    collateral.find((t) => t.defaultOn)?.id || collateral[0]?.id || "guarantee"
  );
  const [collateralOpen, setCollateralOpen] = useState(false);

  const selectedCollateral = collateral.find((t) => t.id === collateralId);
  const rate = useMemo(() => {
    let r = selectedCollateral?.rate ?? calc.rate ?? 0.29;
    if (activeTab === "salary") r = Math.max(0.01, r - 0.04);
    return r;
  }, [selectedCollateral, calc.rate, activeTab]);

  const monthly = useMemo(() => {
    const r = rate / 12;
    if (r === 0) return amount / months;
    return (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  }, [amount, months, rate]);

  const amountMin = calc.amountMin || 1_000_000;
  const amountMax = calc.amountMax || 100_000_000;
  const termMin = calc.termMin || 12;
  const termMax = calc.termMax || 60;

  return (
    /* Frame 2131333185: 1440×620 */
    <section
      id="calculator"
      className="relative flex w-full items-center justify-center overflow-hidden"
      style={{
        minHeight: 620,
        background: "linear-gradient(138.81deg, #5A93EC 10%, #C6DAF6 76.67%)",
      }}
    >
      {/* Decorative sky layer (image 7919) — soft radial accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(255,255,255,0.35) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 20% 70%, rgba(90,100,220,0.25) 0%, transparent 55%)",
        }}
      />

      {/* Frame 2131333184: 1256×520 · pad 40 · centered */}
      <div
        className="relative z-10 mx-4 flex w-full max-w-[1256px] flex-col items-start gap-2.5 rounded-[40px] p-5 sm:mx-6 sm:p-10 lg:min-h-[520px]"
        style={{
          background:
            "linear-gradient(109.17deg, rgba(255,255,255,0.32) -3.74%, rgba(255,255,255,0.2) 107.99%)",
          backdropFilter: "blur(42px)",
          WebkitBackdropFilter: "blur(42px)",
        }}
      >
        {/* Frame 2131333186: tabs row */}
        {tabs.length > 0 ? (
          <div className="flex w-full max-w-[1176px] flex-col justify-center py-3">
            <div className="inline-flex w-fit items-start gap-1 rounded-[14px] bg-[#F1F5F9] p-1">
              {tabs.map((tab) => {
                const active = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`cursor-pointer rounded-[10px] px-[18px] py-2.5 text-[14px] font-medium leading-[120%] ${
                      active
                        ? "bg-white text-[#0F172A] shadow-[0px_1px_2px_rgba(15,23,42,0.05)]"
                        : "text-[#6B7280]"
                    }`}
                  >
                    {text(tab.label)}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Frame 2131333258: 1175×360 · row · gap 25 */}
        <div className="flex w-full max-w-[1175px] flex-col items-stretch gap-4 lg:h-[360px] lg:flex-row lg:items-start lg:gap-[25px]">
          {/* Frame 2131333257: 720×360 · column · gap 16 */}
          <div className="flex w-full flex-col justify-center gap-4 lg:h-[360px] lg:w-[720px] lg:shrink-0">
            {/* Sliders: 720×172 · pad 24 28 · gap 40 */}
            <div className="box-border flex w-full flex-col gap-10 rounded-[18px] bg-white px-7 py-6 sm:flex-row lg:h-[172px] lg:items-start lg:gap-10">
              <FintechRangeSlider
                label={text(calc.amountLabel) || "Сумма микрозайма"}
                value={amount}
                min={amountMin}
                max={amountMax}
                step={500_000}
                displayValue={`${formatAmount(amount)} сум`}
                minLabel={`от ${formatAmount(amountMin)} сум`}
                maxLabel={`до ${formatAmount(amountMax)} сум`}
                onChange={setAmount}
                className="lg:!max-w-[312px]"
              />
              <FintechRangeSlider
                label={text(calc.termQuestion) || "Срок микрозайма"}
                value={months}
                min={termMin}
                max={termMax}
                step={1}
                displayValue={`${months} месяцев`}
                minLabel={`${termMin} мес.`}
                maxLabel={`${termMax} мес.`}
                onChange={setMonths}
                className="lg:!max-w-[312px]"
              />
            </div>

            {/* Collateral: 720×172 · pad 24 28 */}
            {collateral.length > 0 ? (
              <div className="box-border flex w-full flex-col justify-center rounded-[18px] bg-white px-7 py-6 lg:h-[172px]">
                <p className="text-[14px] leading-[17px] text-[#8A93A3]">
                  Вид обеспечения
                </p>
                <button
                  type="button"
                  onClick={() => setCollateralOpen((v) => !v)}
                  className="mt-3 flex w-full max-w-[664px] cursor-pointer items-center justify-between gap-3 text-left"
                >
                  <span className="text-[22px] font-semibold leading-[27px] text-[#1A2233]">
                    {text(selectedCollateral?.label) ||
                      "Поручительство физического лица"}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#6B7280] transition-transform ${
                      collateralOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {collateralOpen ? (
                  <div className="mt-3 flex max-w-[664px] flex-col gap-1 border-t border-[#E3E8F0] pt-3">
                    {collateral.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setCollateralId(opt.id);
                          setCollateralOpen(false);
                        }}
                        className={`cursor-pointer rounded-lg px-3 py-2 text-left text-[15px] ${
                          opt.id === collateralId
                            ? "bg-[#E8F0FE] font-semibold text-[#2D6EE3]"
                            : "text-[#1A2233] hover:bg-[#F4F6F9]"
                        }`}
                      >
                        {text(opt.label)}
                      </button>
                    ))}
                  </div>
                ) : null}
                <p className="mt-3 text-[14px] font-medium leading-[17px] text-[#7A8699]">
                  Со страховым полисом ставка выше на 0,4–1,9 п.п.
                </p>
              </div>
            ) : null}
          </div>

          {/* result: 430×360 · pad 24 32 · gap 12 */}
          <aside className="box-border flex w-full flex-col gap-3 rounded-[20px] bg-[linear-gradient(90deg,#123B78_0%,#0B2A4A_100%)] px-8 py-6 lg:h-[360px] lg:w-[430px] lg:shrink-0">
            <div className="flex flex-col gap-3">
              <p className="text-[15px] font-semibold leading-[18px] text-[#C7D6EE]">
                {text(calc.resultLabel) || "Ежемесячный платёж"}
              </p>
              <p className="text-[36px] font-bold leading-[44px] text-white">
                {formatAmount(Math.round(monthly))} сум
              </p>
            </div>

            <div className="h-px w-full max-w-[366px] bg-white/[0.18]" />

            <div className="flex w-full max-w-[366px] flex-col gap-3">
              <ResultRow label="Сумма займа" value={`${formatAmount(amount)} сум`} />
              <ResultRow
                label="Обеспечение"
                value={
                  collateralId === "insurance"
                    ? "Страховой полис"
                    : "Поручительство"
                }
              />
              <ResultRow
                label="Ставка"
                value={`${(rate * 100).toFixed(rate * 100 % 1 ? 1 : 0)}%`}
              />
              <ResultRow label="Срок" value={`${months} месяцев`} />
            </div>

            <Link
              href="#zayavka"
              className="mt-auto flex h-[51px] w-full max-w-[366px] items-center justify-center rounded-xl bg-[#3261EC] text-[16px] font-semibold leading-[19px] text-white"
            >
              {text(calc.submitLabel) || text(calc.primaryCta) || "Подать заявку"}
            </Link>

            {text(calc.disclaimer) ? (
              <p className="max-w-[366px] text-[12px] leading-[145%] text-[#9DB2D6]">
                {text(calc.disclaimer)}
              </p>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-center gap-3">
      <span className="shrink-0 text-[14px] leading-[17px] text-[#C7D6EE]">{label}</span>
      <span className="h-px min-w-4 flex-1 bg-transparent" />
      <span className="shrink-0 text-right text-[14px] font-semibold leading-[17px] text-white">
        {value}
      </span>
    </div>
  );
}
