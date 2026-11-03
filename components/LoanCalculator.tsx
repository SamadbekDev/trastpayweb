"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CalculatorConfig, Language } from "@/types/pageConfig";
import { DepositProduct } from "@/types/deposits";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";
import FintechRangeSlider from "@/components/ui/FintechRangeSlider";
import { formatAmount } from "@/components/ui/AmountSlider";
import { getDepositsPage } from "@/api/pageService";
import { useDragScroll } from "@/hooks/useDragScroll";

interface LoanCalculatorProps {
  config?: CalculatorConfig;
  embedded?: boolean;
}

const SUGGESTED_GRADIENTS = [
  "linear-gradient(119.05deg, #7A3FF2 0%, #9D5CF5 71.43%)",
  "linear-gradient(119.05deg, #3A0B3F 0%, #A01A7D 71.43%)",
  "linear-gradient(119.05deg, #1958D6 0%, #3E86F5 71.43%)",
];

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

function monthsLabel(months: number, lang: Language) {
  if (lang === "en") return `${months} months`;
  if (lang === "uz") return `${months} oy`;
  const n = Math.abs(months) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return `${months} месяцев`;
  if (n1 === 1) return `${months} месяц`;
  if (n1 > 1 && n1 < 5) return `${months} месяца`;
  return `${months} месяцев`;
}

function isDepositTab(tabId: string) {
  return tabId === "loan" || tabId === "deposits" || tabId === "deposit";
}

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`relative flex h-[30px] w-[52px] shrink-0 cursor-pointer items-center rounded-[15px] px-[3px] transition-colors ${
        on ? "justify-end bg-[#2F6BF0]" : "justify-start bg-[#C9D0DB]"
      }`}
    >
      <span className="h-6 w-6 rounded-full bg-white shadow-[0px_1px_3px_rgba(26,51,102,0.2)]" />
    </button>
  );
}

export default function LoanCalculator({
  config,
  embedded = false,
}: LoanCalculatorProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const tabs = config?.tabs || [];
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const depositMode = !embedded && isDepositTab(activeTab);

  const [amount, setAmount] = useState(
    depositMode ? 100_000_000 : config?.amountDefault || 5_000_000
  );
  const [months, setMonths] = useState(
    depositMode ? 3 : config?.termDefaultMonths || 60
  );
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
  const [topUp, setTopUp] = useState(true);
  const [partial, setPartial] = useState(false);
  const [paramsOpen, setParamsOpen] = useState(true);
  const [suggested, setSuggested] = useState<DepositProduct[]>([]);
  const dragScroll = useDragScroll<HTMLDivElement>();

  useEffect(() => {
    if (!depositMode) return;
    let cancelled = false;
    void getDepositsPage()
      .then((page) => {
        if (!cancelled) setSuggested(page.products || []);
      })
      .catch(() => {
        if (!cancelled) setSuggested([]);
      });
    return () => {
      cancelled = true;
    };
  }, [depositMode]);

  useEffect(() => {
    if (!config) return;
    if (depositMode) {
      setAmount(100_000_000);
      setMonths(3);
    } else {
      setAmount(config.amountDefault || 5_000_000);
      setMonths(config.termDefaultMonths || 60);
    }
  }, [activeTab, depositMode, config]);

  const rate = useMemo(() => {
    let value = config?.baseRate ?? 0.22;
    if (depositMode) {
      value = 0.188;
      if (topUp) value += 0.002;
      if (partial) value -= 0.003;
      return value;
    }
    if (config?.togglesAsSelect) {
      const selected = config.toggles?.find((t) => t.id === selectId);
      if (selected?.rate != null) value = selected.rate;
      else if (selectId === "insurance") value += 0.01;
    } else {
      if (toggles.salary) value -= 0.02;
      if (toggles.pensioner) value -= 0.01;
    }
    if (activeTab === "salary") value = Math.max(0.01, value - 0.04);
    return value;
  }, [
    activeTab,
    config?.baseRate,
    config?.togglesAsSelect,
    config?.toggles,
    depositMode,
    partial,
    selectId,
    toggles.pensioner,
    toggles.salary,
    topUp,
  ]);

  const resultValue = useMemo(() => {
    if (depositMode) {
      let result = amount * (1 + rate * (months / 12));
      if (topUp) result *= 1.002;
      if (partial) result *= 0.997;
      return result;
    }
    const r = rate / 12;
    if (r === 0) return amount / months;
    return (
      (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
    );
  }, [amount, depositMode, months, partial, rate, topUp]);

  if (!config) return null;

  const resultLabel = depositMode
    ? lang === "uz"
      ? "Muddat oxiridagi summa"
      : lang === "en"
        ? "Amount at maturity"
        : "Сумма в конце срока"
    : getLocalizedText(config.resultLabel, lang);
  const amountLabel = depositMode
    ? lang === "uz"
      ? "Qancha summa kiritmoqchisiz?"
      : lang === "en"
        ? "How much do you want to invest?"
        : "Какую сумму хотите вложить?"
    : getLocalizedText(config.amountLabel, lang);
  const termLabel = depositMode
    ? lang === "uz"
      ? "Qancha muddatga ochmoqchisiz?"
      : lang === "en"
        ? "For what term do you want to open a deposit?"
        : "На какой срок хотите открыть вклад?"
    : getLocalizedText(config.termLabel, lang);
  const primaryCta = depositMode
    ? lang === "uz"
      ? "Omonat ochish"
      : lang === "en"
        ? "Open deposit"
        : "Открыть вклад"
    : getLocalizedText(config.primaryCta, lang);
  const secondaryCta = getLocalizedText(config.secondaryCta, lang);
  const disclaimer = getLocalizedText(config.disclaimer, lang);

  const amountMin = depositMode ? 1_000_000 : config.amountMin || 1_000_000;
  const amountMax = depositMode
    ? 5_000_000_000
    : config.amountMax || 50_000_000;
  const termMin = depositMode ? 3 : config.termMinMonths || 6;
  const termMax = depositMode ? 24 : config.termMaxMonths || 60;
  const rateLabel = (rate * 100).toFixed(1).replace(".", ",");

  return (
    <section
      id="calculator"
      className="relative w-full overflow-hidden py-12 lg:py-16"
      style={{
        background: depositMode
          ? "linear-gradient(138.81deg, #5A93EC 10%, #C6DAF6 76.67%)"
          : "linear-gradient(135deg, #4B7FE8 0%, #7BA3F0 42%, #C8B896 78%, #E8D4A8 100%)",
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
          className="mx-auto flex w-full max-w-[980px] flex-col gap-2.5 rounded-[40px] p-5 sm:p-10"
          style={{
            background:
              "linear-gradient(109.17deg, rgba(255, 255, 255, 0.32) -3.74%, rgba(255, 255, 255, 0.2) 107.99%)",
            backdropFilter: "blur(42px)",
            WebkitBackdropFilter: "blur(42px)",
          }}
        >
          {/* Tabs */}
          <div className="flex w-full flex-col items-center py-3">
            <div className="flex max-w-full items-start gap-1 overflow-x-auto rounded-[14px] bg-[#F1F5F9] p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {tabs.map((tab) => {
                const label = getLocalizedText(tab.label, lang);
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 cursor-pointer rounded-[10px] px-[18px] py-2.5 text-[14px] font-medium leading-[120%] ${
                      active
                        ? "bg-white text-[#0F172A] shadow-[0px_1px_2px_rgba(15,23,42,0.05)]"
                        : "text-[#64748B]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result */}
          <div className="flex w-full flex-col items-center gap-1.5">
            <p className="text-[18px] font-medium leading-[22px] text-white">
              {resultLabel}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-[40px] font-bold leading-none text-white sm:text-[58px] sm:leading-[70px]">
                {formatAmount(resultValue)}
              </span>
              <span className="text-[34px] font-bold leading-none text-white/55 sm:text-[50px] sm:leading-[62px]">
                сум
              </span>
            </div>
            {depositMode ? (
              <div className="mt-1 flex max-w-full items-center gap-2 rounded-full bg-white/25 px-[18px] py-[9px]">
                <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-[#EAFFF4]" />
                <span className="truncate text-[13px] font-semibold leading-[18px] text-white sm:text-[15px]">
                  {lang === "uz"
                    ? `${rateLabel}% yillik — maksimal muddat va kapitallashtirishda`
                    : lang === "en"
                      ? `${rateLabel}% per year — at max term and capitalization`
                      : `${rateLabel}% годовых — при максимальном сроке и капитализации`}
                </span>
              </div>
            ) : null}
            <div className="mt-1 flex items-start gap-3">
              <span className="mt-0.5 h-[42px] w-[3px] shrink-0 rounded-[2px] bg-white/70" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] leading-[17px] text-white/95">
                  {lang === "uz"
                    ? "Sizga kerak bo‘ladi"
                    : lang === "en"
                      ? "You will need"
                      : "Вам понадобится"}
                </span>
                <span className="text-[14px] font-medium leading-[17px] text-white">
                  {lang === "uz"
                    ? "— Pasport yoki ID-karta"
                    : lang === "en"
                      ? "— Passport or ID card"
                      : "— Паспорт или ID карта"}
                </span>
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div className="mt-1 flex w-full flex-col gap-10 rounded-[18px] bg-white px-5 py-6 sm:flex-row sm:gap-10 sm:px-7 sm:py-6">
            <FintechRangeSlider
              label={amountLabel}
              value={amount}
              min={amountMin}
              max={amountMax}
              step={depositMode ? 100_000 : 500_000}
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
              displayValue={
                depositMode
                  ? monthsLabel(months, lang)
                  : formatTerm(months, lang)
              }
              minLabel={
                depositMode
                  ? `от ${monthsLabel(termMin, lang)}`
                  : `от ${formatTerm(termMin, lang)}`
              }
              maxLabel={
                depositMode
                  ? `до ${monthsLabel(termMax, lang)}`
                  : `до ${formatTerm(termMax, lang)}`
              }
              onChange={setMonths}
            />
          </div>

          {/* Parameters */}
          {depositMode ? (
            <div className="flex w-full flex-col gap-5 rounded-[18px] bg-white px-5 py-6 sm:px-7">
              <button
                type="button"
                onClick={() => setParamsOpen((v) => !v)}
                className="flex w-full cursor-pointer items-center justify-between"
              >
                <span className="text-[20px] font-semibold leading-6 text-[#1A2233]">
                  {lang === "uz"
                    ? "Omonat parametrlari"
                    : lang === "en"
                      ? "Deposit parameters"
                      : "Параметры вклада"}
                </span>
                <ChevronUp
                  size={20}
                  className={`text-[#1A2233] transition-transform ${paramsOpen ? "" : "rotate-180"}`}
                />
              </button>
              {paramsOpen ? (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[17px] leading-[21px] text-[#1A2233]">
                      {lang === "uz"
                        ? "Omonatni to‘ldirish"
                        : lang === "en"
                          ? "Deposit top-up"
                          : "Пополнение вклада"}
                    </span>
                    <Toggle on={topUp} onChange={setTopUp} />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[17px] leading-[21px] text-[#1A2233]">
                      {lang === "uz"
                        ? "Qisman yechib olish"
                        : lang === "en"
                          ? "Partial withdrawal"
                          : "Частичное снятие"}
                    </span>
                    <Toggle on={partial} onChange={setPartial} />
                  </div>
                </>
              ) : null}
            </div>
          ) : (config.toggles?.length || 0) > 0 && config.togglesAsSelect ? (
            <div className="rounded-[18px] bg-white px-5 py-4 sm:px-7">
              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-medium text-[#6B7280]">
                  {getLocalizedText(config.togglesLabel, lang) ||
                    "Вид обеспечения"}
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

          {/* Suggested deposits — dynamic + horizontal scroll */}
          {depositMode && suggested.length > 0 ? (
            <div className="flex w-full flex-col gap-3.5 py-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-[20px] font-semibold leading-6 text-white">
                  {lang === "uz"
                    ? "Sizga ham mos keladi"
                    : lang === "en"
                      ? "Also suitable for you"
                      : "Вам также подойдёт"}
                </h3>
                <span className="text-[15px] leading-[18px] text-white/80">
                  {lang === "uz"
                    ? "summangiz va muddatingiz bo‘yicha"
                    : lang === "en"
                      ? "for your amount and term"
                      : "по вашей сумме и сроку"}
                </span>
              </div>
              <div
                ref={dragScroll.ref}
                className={`${dragScroll.className} -mx-1 flex gap-4 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {suggested.map((item, index) => {
                  const badge =
                    index === 0
                      ? lang === "uz"
                        ? "Tavsiya etamiz"
                        : lang === "en"
                          ? "Recommended"
                          : "Рекомендуем"
                      : index === 1
                        ? lang === "uz"
                          ? "Yangi mahsulot"
                          : lang === "en"
                            ? "New product"
                            : "Новый продукт"
                        : "";
                  const badgeClass =
                    index === 1
                      ? "bg-[#22C55E] text-white"
                      : "bg-[#2F6BF0] text-white";
                  const href =
                    item.primaryHref && item.primaryHref !== "#"
                      ? item.primaryHref
                      : `/vklady/${item.id}`;
                  return (
                    <Link
                      key={item.id}
                      href={href}
                      className="flex w-[min(344px,82vw)] shrink-0 snap-start flex-col gap-3.5 rounded-[18px] px-5 py-[18px] text-white"
                      style={{
                        background:
                          SUGGESTED_GRADIENTS[
                            index % SUGGESTED_GRADIENTS.length
                          ],
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-[17px] font-semibold leading-[21px]">
                          {getLocalizedText(item.title, lang)}
                        </p>
                        {badge ? (
                          <span
                            className={`shrink-0 rounded-lg px-2.5 py-1 text-[12px] font-semibold leading-[15px] ${badgeClass}`}
                          >
                            {badge}
                          </span>
                        ) : null}
                      </div>
                      <div className="flex gap-3.5">
                        <div className="min-w-0 flex-1">
                          <p className="text-[15px] font-bold leading-[18px]">
                            {getLocalizedText(item.rate, lang)}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-[13px] text-white/72">
                            {lang === "uz"
                              ? "Stavka, yillik"
                              : lang === "en"
                                ? "Rate, annual"
                                : "Ставка, годовых"}
                          </p>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[15px] font-bold leading-[18px]">
                            {getLocalizedText(item.amount, lang)}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-[13px] text-white/72">
                            {lang === "uz"
                              ? "Omonat summasi"
                              : lang === "en"
                                ? "Deposit amount"
                                : "Сумма вклада"}
                          </p>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[15px] font-bold leading-[18px]">
                            {getLocalizedText(item.term, lang)}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-[13px] text-white/72">
                            {lang === "uz"
                              ? "Muddat"
                              : lang === "en"
                                ? "Term"
                                : "Срок"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* CTAs */}
          <div className="flex w-full flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <Link
              href={depositMode ? "/vklady" : "#"}
              className="flex h-[65px] flex-1 items-center justify-center rounded-2xl bg-[#2F6BF0] text-[17px] font-semibold leading-[21px] text-white"
            >
              {primaryCta}
            </Link>
            <Link
              href={depositMode ? "/vklady" : "#"}
              className="flex h-[65px] flex-1 items-center justify-center rounded-2xl bg-white/55 text-[17px] font-semibold leading-[21px] text-[#2F6BF0]"
            >
              {secondaryCta}
            </Link>
            <button
              type="button"
              aria-label="Calendar"
              className="flex h-[68px] w-full shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-white/55 sm:w-[76px]"
            >
              <Calendar size={32} className="text-[#2F6BFF]" />
            </button>
          </div>

          {disclaimer && (
            <p className="w-full text-center text-[14px] leading-[14px] text-white/90">
              {disclaimer}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
