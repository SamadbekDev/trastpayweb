"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CalculatorConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";
import FintechRangeSlider from "@/components/ui/FintechRangeSlider";
import { formatAmount } from "@/components/ui/AmountSlider";

interface LoanCalculatorProps {
  config?: CalculatorConfig;
  embedded?: boolean;
}

function formatTerm(months: number, lang: Language) {
  if (months >= 12 && months % 12 === 0) {
    const years = months / 12;
    if (lang === "en") return `${years} ${years === 1 ? "year" : "years"}`;
    if (lang === "uz") return `${years} yil`;
    return `${years} ${years === 1 ? "год" : years < 5 ? "года" : "лет"}`;
  }
  if (lang === "en") return `${months} mo.`;
  if (lang === "uz") return `${months} oy`;
  return `${months} мес.`;
}

export default function LoanCalculator({
  config,
  embedded: _embedded = false,
}: LoanCalculatorProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const tabs = config?.tabs || [];
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const [amount, setAmount] = useState(config?.amountDefault || 5_000_000);
  const [months, setMonths] = useState(config?.termDefaultMonths || 60);
  const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    config?.toggles?.forEach((t) => {
      init[t.id] = !!t.defaultOn;
    });
    return init;
  });
  const [optionsOpen, setOptionsOpen] = useState(true);
  const [selectId, setSelectId] = useState(() => {
    const list = config?.toggles || [];
    return list.find((t) => t.defaultOn)?.id || list[0]?.id || "";
  });

  const monthly = useMemo(() => {
    let rate = config?.baseRate ?? 0.22;
    if (config?.togglesAsSelect) {
      const selected = config.toggles?.find((t) => t.id === selectId);
      if (selected?.rate != null) rate = selected.rate;
      else if (selectId === "insurance") rate += 0.01;
    } else {
      if (toggles.salary) rate -= 0.02;
      if (toggles.pensioner) rate -= 0.01;
    }
    if (activeTab === "salary") rate = Math.max(0.01, rate - 0.04);
    const r = rate / 12;
    if (r === 0) return amount / months;
    return (
      (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
    );
  }, [amount, months, toggles, selectId, activeTab, config?.baseRate, config?.togglesAsSelect, config?.toggles]);

  if (!config) return null;

  const resultLabel = getLocalizedText(config.resultLabel, lang);
  const resultNote = getLocalizedText(config.resultNote, lang);
  const amountLabel = getLocalizedText(config.amountLabel, lang);
  const termLabel = getLocalizedText(config.termLabel, lang);
  const primaryCta = getLocalizedText(config.primaryCta, lang);
  const secondaryCta = getLocalizedText(config.secondaryCta, lang);
  const disclaimer = getLocalizedText(config.disclaimer, lang);

  const amountMin = config.amountMin || 1_000_000;
  const amountMax = config.amountMax || 50_000_000;
  const termMin = config.termMinMonths || 6;
  const termMax = config.termMaxMonths || 60;

  return (
    <section
      id="calculator"
      className="relative w-full overflow-hidden py-12 lg:py-16"
      style={{
        background:
          "linear-gradient(135deg, #4B7FE8 0%, #7BA3F0 42%, #C8B896 78%, #E8D4A8 100%)",
      }}
    >
      {config.backgroundImage && (
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={getMediaUrl(config.backgroundImage)}
            alt=""
            fill
            unoptimized
            className="object-cover opacity-50 blur-[2px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#5A93EC]/55 via-[#8EB0F0]/35 to-[#D4C09A]/45" />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 lg:px-[60px]">
        <div
          className="mx-auto flex w-full max-w-[920px] flex-col gap-3 rounded-[28px] p-5 sm:gap-4 sm:rounded-[32px] sm:p-8"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.18) 100%)",
            backdropFilter: "blur(48px)",
            WebkitBackdropFilter: "blur(48px)",
            boxShadow: "0 8px 40px rgba(15, 40, 90, 0.12)",
          }}
        >
          {/* Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex max-w-full gap-0.5 overflow-x-auto rounded-[16px] bg-white/35 p-1 backdrop-blur-sm">
              {tabs.map((tab) => {
                const label = getLocalizedText(tab.label, lang);
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 rounded-[12px] px-3 py-2.5 text-[13px] font-medium leading-[120%] transition-colors cursor-pointer sm:px-[18px] sm:text-[14px] ${
                      active
                        ? "bg-white text-[#0F172A] shadow-[0_2px_8px_rgba(15,23,42,0.08)]"
                        : "text-[#1A1A2E]/65 hover:text-[#0F172A]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col items-center gap-1 py-1 text-center sm:py-2">
            <p className="text-[16px] font-medium leading-[20px] text-white/95 sm:text-[18px] sm:leading-[22px]">
              {resultLabel}
            </p>
            <p className="flex items-baseline justify-center gap-2">
              <span className="text-[40px] font-bold leading-none tracking-tight text-white sm:text-[56px] lg:text-[64px]">
                {formatAmount(monthly)}
              </span>
              <span className="text-[28px] font-bold leading-none text-white/50 sm:text-[44px] lg:text-[56px]">
                сум
              </span>
            </p>
            {resultNote && (
              <div className="mt-3 flex max-w-[320px] items-start gap-3 text-left">
                <span className="mt-1 h-10 w-[2px] shrink-0 rounded-full bg-white/75" />
                <p className="text-[13px] leading-[18px] text-white/95 sm:text-[14px]">
                  <span className="text-white/80">Вам понадобится</span>
                  <br />
                  <span className="font-medium text-white">
                    — Паспорт или ID карта
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Sliders — Figma: 900×171, pad 24×28, gap 40, radius 18, bg #fff */}
          <div className="box-border flex w-full max-w-[900px] flex-col gap-10 self-center rounded-[18px] bg-white px-5 py-6 sm:h-[171px] sm:flex-row sm:items-start sm:gap-10 sm:px-7 sm:py-6">
            <FintechRangeSlider
              label={amountLabel}
              value={amount}
              min={amountMin}
              max={amountMax}
              step={500_000}
              displayValue={`${formatAmount(amount)} сум`}
              minLabel={`от ${formatAmount(amountMin)} сум`}
              maxLabel={`до ${formatAmount(amountMax)} сум`}
              onChange={setAmount}
            />
            <FintechRangeSlider
              label={termLabel}
              value={months}
              min={termMin}
              max={termMax}
              step={1}
              displayValue={formatTerm(months, lang)}
              minLabel={`от ${formatTerm(termMin, lang)}`}
              maxLabel={`до ${formatTerm(termMax, lang)}`}
              onChange={setMonths}
            />
          </div>

          {/* Rate options / collateral */}
          {(config.toggles?.length || 0) > 0 && config.togglesAsSelect ? (
            <div className="rounded-[18px] bg-white px-5 py-4 sm:px-7">
              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-medium text-[#6B7280]">
                  {getLocalizedText(config.togglesLabel, lang) || "Вид обеспечения"}
                </span>
                <select
                  className="h-12 cursor-pointer rounded-xl border border-[#E5E7EB] bg-white px-4 text-[15px] font-medium text-[#1A1A2E] outline-none"
                  value={selectId}
                  onChange={(e) => setSelectId(e.target.value)}
                >
                  {config.toggles.map((toggle) => (
                    <option key={toggle.id} value={toggle.id}>
                      {getLocalizedText(toggle.label, lang)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ) : (config.toggles?.length || 0) > 0 ? (
            <div className="rounded-[20px] bg-white p-5 sm:rounded-[24px] sm:p-6">
              <button
                type="button"
                onClick={() => setOptionsOpen((v) => !v)}
                className="flex w-full cursor-pointer items-center justify-between text-[15px] font-bold text-[#1A1A2E]"
              >
                {getLocalizedText(config.togglesLabel, lang) || "Снизить ставку"}
                <ChevronUp
                  size={18}
                  className={`text-[#6B7280] transition-transform ${
                    optionsOpen ? "" : "rotate-180"
                  }`}
                />
              </button>
              {optionsOpen && (
                <div className="mt-4 flex flex-col gap-4">
                  {config.toggles.map((toggle) => {
                    const label = getLocalizedText(toggle.label, lang);
                    const on = !!toggles[toggle.id];
                    return (
                      <label
                        key={toggle.id}
                        className="flex cursor-pointer items-center justify-between gap-4"
                      >
                        <span className="text-[14px] leading-5 text-[#374151]">
                          {label}
                        </span>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={on}
                          onClick={() =>
                            setToggles((prev) => ({
                              ...prev,
                              [toggle.id]: !prev[toggle.id],
                            }))
                          }
                          className={`relative h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors ${
                            on ? "bg-[#535BF1]" : "bg-[#D1D5DB]"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                              on ? "translate-x-5" : ""
                            }`}
                          />
                        </button>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null}

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="#"
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-[#535BF1] px-6 py-[18px] text-[16px] font-semibold text-white transition-colors hover:bg-[#454ce0] sm:py-[20px] sm:text-[17px]"
            >
              {primaryCta}
            </Link>
            <Link
              href="#"
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-white/50 px-6 py-[18px] text-[16px] font-semibold text-[#535BF1] backdrop-blur-sm transition-colors hover:bg-white/70 sm:py-[20px] sm:text-[17px]"
            >
              {secondaryCta}
            </Link>
            <button
              type="button"
              aria-label="Calendar"
              className="flex h-[56px] w-full shrink-0 cursor-pointer items-center justify-center self-stretch rounded-2xl bg-white/50 text-[#535BF1] backdrop-blur-sm transition-colors hover:bg-white/70 sm:h-auto sm:w-[68px]"
            >
              <Calendar size={22} />
            </button>
          </div>

          {disclaimer && (
            <p className="text-center text-[13px] leading-5 text-white/85 sm:text-[14px]">
              {disclaimer}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
