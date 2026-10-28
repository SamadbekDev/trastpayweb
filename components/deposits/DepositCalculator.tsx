"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import FintechRangeSlider from "@/components/ui/FintechRangeSlider";
import { DepositDetailPageConfig } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface DepositCalculatorProps {
  config: DepositDetailPageConfig;
}

const fmt = (n: number) => Math.round(n).toLocaleString("ru-RU").replace(/,/g, " ");

const SUGGESTED_GRADIENTS = [
  "linear-gradient(119.05deg, #7A3FF2 0%, #9D5CF5 71.43%)",
  "linear-gradient(119.05deg, #3A0B3F 0%, #A01A7D 71.43%)",
  "linear-gradient(119.05deg, #1958D6 0%, #3E86F5 71.43%)",
];

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

/** Figma «Калькулятор вклада — стекло» */
export default function DepositCalculator({ config }: DepositCalculatorProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const termMin = Math.min(...config.calculatorTerms.map((t) => t.months), 3);
  const termMax = Math.max(...config.calculatorTerms.map((t) => t.months), 24);
  const defaultMonths =
    config.calculatorTerms.find((t) => t.months === 3)?.months ||
    config.calculatorTerms[0]?.months ||
    termMin;

  const [channel, setChannel] = useState<"online" | "office">("online");
  const [amount, setAmount] = useState(config.calculatorDefault);
  const [months, setMonths] = useState(defaultMonths);
  const [topUp, setTopUp] = useState(true);
  const [partial, setPartial] = useState(false);
  const [paramsOpen, setParamsOpen] = useState(true);

  const selected = useMemo(() => {
    const sorted = [...config.calculatorTerms].sort(
      (a, b) => Math.abs(a.months - months) - Math.abs(b.months - months)
    );
    return sorted[0] || { months, rate: config.calculatorRate };
  }, [config.calculatorRate, config.calculatorTerms, months]);

  const rate = selected.rate || config.calculatorRate;

  const finalAmount = useMemo(() => {
    const yearly = rate / 100;
    let result = amount * (1 + yearly * (months / 12));
    if (topUp) result *= 1.002;
    if (partial) result *= 0.997;
    return result;
  }, [amount, months, rate, topUp, partial]);

  const currencyLabel = config.calculatorCurrency === "USD" ? "$" : "сум";
  const rateLabel = String(rate).replace(".", ",");
  const coinsSrc = config.calculatorImage?.trim()
    ? getMediaUrl(config.calculatorImage)
    : "";

  const amountMinLabel =
    lang === "en"
      ? `from ${fmt(config.calculatorMin)} ${currencyLabel}`
      : lang === "uz"
        ? `${fmt(config.calculatorMin)} ${currencyLabel} dan`
        : `от ${fmt(config.calculatorMin)} ${currencyLabel}`;
  const amountMaxLabel =
    lang === "en"
      ? `to ${fmt(config.calculatorMax)} ${currencyLabel}`
      : lang === "uz"
        ? `${fmt(config.calculatorMax)} ${currencyLabel} gacha`
        : `до ${fmt(config.calculatorMax)} ${currencyLabel}`;
  const termMinLabel =
    lang === "en"
      ? `from ${termMin} months`
      : lang === "uz"
        ? `${termMin} oydan`
        : `от ${termMin} месяцев`;
  const termMaxLabel =
    lang === "en"
      ? `to ${termMax} months`
      : lang === "uz"
        ? `${termMax} oygacha`
        : `до ${termMax} месяцев`;

  const [whole, fraction] = fmt(finalAmount).includes(",")
    ? fmt(finalAmount).split(",")
    : [fmt(finalAmount), ""];

  return (
    <section
      id="calculator"
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(138.81deg, #5A93EC 10%, #C6DAF6 76.67%)",
        minHeight: 1085,
      }}
    >
      {coinsSrc ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image
            src={coinsSrc}
            alt=""
            fill
            unoptimized
            className="object-cover object-center mix-blend-screen opacity-95"
            sizes="100vw"
            priority
          />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-center px-4 py-10 lg:py-12">
        <div
          className="flex w-full max-w-[980px] flex-col items-start gap-2.5 rounded-[40px] p-5 sm:p-10"
          style={{
            background:
              "linear-gradient(109.17deg, rgba(255, 255, 255, 0.32) -3.74%, rgba(255, 255, 255, 0.2) 107.99%)",
            backdropFilter: "blur(42px)",
            WebkitBackdropFilter: "blur(42px)",
          }}
        >
          {/* Tabs */}
          <div className="flex w-full flex-col items-center py-3">
            <div className="flex items-start gap-1 rounded-[14px] bg-[#F1F5F9] p-1">
              {config.calculatorChannels.map((item) => {
                const active = channel === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setChannel(item.id)}
                    className={`cursor-pointer rounded-[10px] px-[18px] py-2.5 text-[14px] font-medium leading-[120%] ${
                      active
                        ? "bg-white text-[#0F172A] shadow-[0px_1px_2px_rgba(15,23,42,0.05)]"
                        : "text-[#64748B]"
                    }`}
                  >
                    {getLocalizedText(item.label, lang)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result */}
          <div className="flex w-full flex-col items-center gap-1.5">
            <p className="text-[18px] font-medium leading-[22px] text-white">
              {lang === "uz"
                ? "Muddat oxiridagi summa"
                : lang === "en"
                  ? "Amount at maturity"
                  : "Сумма в конце срока"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-[40px] font-bold leading-none text-white sm:text-[58px] sm:leading-[70px]">
                {whole}
                {fraction ? `,${fraction}` : ""}
              </span>
              <span className="text-[34px] font-bold leading-none text-white/55 sm:text-[50px] sm:leading-[62px]">
                {currencyLabel}
              </span>
            </div>
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
              value={amount}
              min={config.calculatorMin}
              max={config.calculatorMax}
              step={config.calculatorCurrency === "USD" ? 100 : 100_000}
              label={
                lang === "uz"
                  ? "Qancha summa kiritmoqchisiz?"
                  : lang === "en"
                    ? "How much do you want to invest?"
                    : "Какую сумму хотите вложить?"
              }
              displayValue={`${fmt(amount)} ${currencyLabel}`}
              minLabel={amountMinLabel}
              maxLabel={amountMaxLabel}
              onChange={setAmount}
            />
            <FintechRangeSlider
              value={months}
              min={termMin}
              max={termMax}
              step={1}
              label={
                lang === "uz"
                  ? "Qancha muddatga ochmoqchisiz?"
                  : lang === "en"
                    ? "For what term do you want to open a deposit?"
                    : "На какой срок хотите открыть вклад?"
              }
              displayValue={monthsLabel(months, lang)}
              minLabel={termMinLabel}
              maxLabel={termMaxLabel}
              onChange={setMonths}
            />
          </div>

          {/* Parameters */}
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

          {/* Suggested */}
          {config.suggested.length > 0 ? (
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
              <div className="flex gap-4 overflow-x-auto pb-1">
                {config.suggested.slice(0, 3).map((item, index) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="flex min-w-[280px] flex-1 flex-col gap-3.5 rounded-[18px] px-5 py-[18px] text-white sm:min-w-[300px]"
                    style={{
                      background:
                        SUGGESTED_GRADIENTS[index % SUGGESTED_GRADIENTS.length],
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[17px] font-semibold leading-[21px]">
                        {getLocalizedText(item.title, lang)}
                      </p>
                      {item.badge || index === 2 ? (
                        <span
                          className={`shrink-0 rounded-lg px-2.5 py-1 text-[12px] font-semibold leading-[15px] ${
                            index === 2
                              ? "bg-white text-[#1958D6]"
                              : index === 1
                                ? "bg-[#22C55E] text-white"
                                : "bg-[#2F6BF0] text-white"
                          }`}
                        >
                          {index === 2
                            ? getLocalizedText(item.rate, lang)
                            : getLocalizedText(item.badge!, lang)}
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
                          {lang === "uz" ? "Muddat" : lang === "en" ? "Term" : "Срок"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {/* Actions */}
          <div className="flex w-full flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <Link
              href={config.product.primaryHref || "#"}
              className="flex h-[65px] flex-1 items-center justify-center rounded-2xl bg-[#2F6BF0] text-[17px] font-semibold leading-[21px] text-white"
            >
              {getLocalizedText(config.product.primaryCta, lang) ||
                (lang === "uz"
                  ? "Omonat ochish"
                  : lang === "en"
                    ? "Open deposit"
                    : "Открыть вклад")}
            </Link>
            <Link
              href={config.product.secondaryHref || "#info"}
              className="flex h-[65px] flex-1 items-center justify-center rounded-2xl bg-white/55 text-[17px] font-semibold leading-[21px] text-[#2F6BF0]"
            >
              {getLocalizedText(config.product.secondaryCta, lang) ||
                (lang === "uz" ? "Batafsil" : lang === "en" ? "Details" : "Подробнее")}
            </Link>
            <button
              type="button"
              className="flex h-[68px] w-full shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-white/55 sm:w-[76px]"
              aria-label="Calendar"
            >
              <Calendar size={32} className="text-[#2F6BFF]" />
            </button>
          </div>

          <p className="w-full text-center text-[14px] leading-[14px] text-white/90">
            {lang === "uz"
              ? "Dastlabki hisob. Oferta hisoblanmaydi."
              : lang === "en"
                ? "Preliminary calculation. Not an offer."
                : "Предварительный расчёт. Не является офертой."}
          </p>
        </div>
      </div>
    </section>
  );
}
