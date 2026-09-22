"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CalculatorConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface LoanCalculatorProps {
  config?: CalculatorConfig;
}

const fmt = (n: number) =>
  Math.round(n).toLocaleString("ru-RU").replace(/,/g, " ");

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

export default function LoanCalculator({ config }: LoanCalculatorProps) {
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

  const monthly = useMemo(() => {
    let rate = 0.22;
    if (toggles.salary) rate -= 0.02;
    if (toggles.pensioner) rate -= 0.01;
    const r = rate / 12;
    if (r === 0) return amount / months;
    return (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  }, [amount, months, toggles]);

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

  const amountPct = ((amount - amountMin) / (amountMax - amountMin)) * 100;
  const termPct = ((months - termMin) / (termMax - termMin)) * 100;

  return (
    <section
      id="calculator"
      className="relative w-full overflow-hidden my-[100px] py-14"
      style={{
        background: "linear-gradient(138.81deg, #5A93EC 10%, #C6DAF6 76.67%)",
      }}
    >
      {config.backgroundImage && (
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <Image
            src={getMediaUrl(config.backgroundImage)}
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-[980px] px-4">
        <div
          className="flex flex-col gap-2.5 rounded-[40px] p-6 sm:p-10"
          style={{
            background:
              "linear-gradient(109.17deg, rgba(255,255,255,0.32) -3.74%, rgba(255,255,255,0.2) 107.99%)",
            backdropFilter: "blur(42px)",
            WebkitBackdropFilter: "blur(42px)",
          }}
        >
          {/* Tabs */}
          <div className="mb-2 flex justify-center">
            <div className="inline-flex gap-1 rounded-[14px] bg-[#F1F5F9] p-1">
              {tabs.map((tab) => {
                const label = getLocalizedText(tab.label, lang);
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-[10px] px-[18px] py-2.5 text-[14px] font-medium leading-[120%] cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-white text-[#0F172A] shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
                        : "text-[#64748B]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result — white on glass */}
          <div className="mb-4 flex flex-col items-center gap-1.5 py-2 text-center">
            <p className="text-[18px] font-medium leading-[22px] text-white">{resultLabel}</p>
            <p className="flex items-baseline gap-2">
              <span className="text-[48px] sm:text-[64px] font-bold leading-none text-white">
                {fmt(monthly)}
              </span>
              <span className="text-[36px] sm:text-[56px] font-bold leading-none text-white/55">
                сум
              </span>
            </p>
            {resultNote && (
              <div className="mt-2 flex items-start gap-3 text-left">
                <span className="mt-0.5 h-[42px] w-[3px] rounded bg-white/70" />
                <div>
                  <p className="text-[14px] text-white/95">Вам понадобится</p>
                  <p className="text-[14px] font-medium text-white">
                    — Паспорт или ID карта
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Inputs */}
          <div className="bg-white rounded-[24px] p-5 sm:p-6 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[13px] text-navy/50 mb-1">{amountLabel}</p>
              <p className="text-[22px] font-bold text-navy mb-4">
                {fmt(amount)} сум
              </p>
              <input
                type="range"
                min={amountMin}
                max={amountMax}
                step={100_000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full"
                style={{
                  background: `linear-gradient(to right, #2F6BF0 ${amountPct}%, #E3E8F0 ${amountPct}%)`,
                }}
              />
              <div className="flex justify-between text-[11px] text-navy/40 mt-2">
                <span>от {fmt(amountMin)} сум</span>
                <span>до {fmt(amountMax)} сум</span>
              </div>
            </div>

            <div>
              <p className="text-[13px] text-navy/50 mb-1">{termLabel}</p>
              <p className="text-[22px] font-bold text-navy mb-4">
                {formatTerm(months, lang)}
              </p>
              <input
                type="range"
                min={termMin}
                max={termMax}
                step={1}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full"
                style={{
                  background: `linear-gradient(to right, #2F6BF0 ${termPct}%, #E3E8F0 ${termPct}%)`,
                }}
              />
              <div className="flex justify-between text-[11px] text-navy/40 mt-2">
                <span>от {formatTerm(termMin, lang)}</span>
                <span>до {formatTerm(termMax, lang)}</span>
              </div>
            </div>
          </div>

          {/* Toggles */}
          {(config.toggles?.length || 0) > 0 && (
            <div className="bg-white rounded-[24px] p-5 sm:p-6 mb-6">
              <button
                type="button"
                onClick={() => setOptionsOpen((v) => !v)}
                className="w-full flex items-center justify-between text-[15px] font-bold text-navy cursor-pointer"
              >
                Снизить ставку
                <ChevronUp
                  size={18}
                  className={`transition-transform ${optionsOpen ? "" : "rotate-180"}`}
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
                        className="flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <span className="text-[14px] text-navy/80">{label}</span>
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
                          className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${
                            on ? "bg-[#2F6BF0]" : "bg-[#C9D0DB]"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
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
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="#"
              className="flex-1 inline-flex items-center justify-center rounded-2xl bg-[#2F6BF0] px-6 py-[22px] text-[17px] font-semibold text-white hover:bg-[#2559d4] transition-colors"
            >
              {primaryCta}
            </Link>
            <Link
              href="#"
              className="flex-1 inline-flex items-center justify-center rounded-2xl bg-white/55 px-6 py-[22px] text-[17px] font-semibold text-[#2F6BF0] hover:bg-white/70 transition-colors"
            >
              {secondaryCta}
            </Link>
            <button
              type="button"
              aria-label="Calendar"
              className="w-[76px] h-[68px] rounded-2xl bg-white/55 text-[#2F6BFF] flex items-center justify-center hover:bg-white/70 cursor-pointer shrink-0 self-center sm:self-auto"
            >
              <Calendar size={20} />
            </button>
          </div>

          {disclaimer && (
            <p className="mt-5 text-center text-[14px] text-white/90">{disclaimer}</p>
          )}
        </div>
      </div>
    </section>
  );
}
