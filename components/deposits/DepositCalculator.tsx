"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DepositDetailPageConfig } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface DepositCalculatorProps {
  config: DepositDetailPageConfig;
}

const fmt = (n: number) => Math.round(n).toLocaleString("ru-RU").replace(/,/g, " ");

const AD_GRADIENTS = [
  "linear-gradient(135deg, #3B1F6E 0%, #1A1035 100%)",
  "linear-gradient(135deg, #5B1A4A 0%, #2A0F28 100%)",
];

export default function DepositCalculator({ config }: DepositCalculatorProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const [channel, setChannel] = useState<"online" | "office">("online");
  const [termId, setTermId] = useState(config.calculatorTerms[0]?.id || "");
  const [amount, setAmount] = useState(config.calculatorDefault);
  const [currency, setCurrency] = useState<"UZS" | "USD">(config.calculatorCurrency);
  const [topUp, setTopUp] = useState(true);
  const [partial, setPartial] = useState(false);

  const selected =
    config.calculatorTerms.find((term) => term.id === termId) ||
    config.calculatorTerms[0];
  const rate = selected?.rate || config.calculatorRate;
  const months = selected?.months || 12;

  const finalAmount = useMemo(() => {
    const yearly = rate / 100;
    let result = amount * (1 + yearly * (months / 12));
    if (topUp) result *= 1.002;
    if (partial) result *= 0.997;
    return result;
  }, [amount, months, rate, topUp, partial]);

  const range = Math.max(config.calculatorMax - config.calculatorMin, 1);
  const pct = ((amount - config.calculatorMin) / range) * 100;
  const rateLabel = String(rate).replace(".", ",");
  const sideImage = config.calculatorImage
    ? getMediaUrl(config.calculatorImage)
    : "";

  return (
    <section id="calculator" className="w-full bg-[#FAFAFA] py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-4 lg:px-0">
        {/* Калькулятор вклада (TBC) */}
        <div className="flex flex-col overflow-hidden rounded-[26px] border border-black/10 bg-white shadow-[0px_18.55px_46.38px_rgba(26,38,64,0.08)] lg:min-h-[916px] lg:flex-row lg:items-stretch">
          {/* Left Frame — #186BED */}
          <div className="relative isolate flex min-h-[360px] w-full flex-col justify-end overflow-hidden bg-[#186BED] px-[45px] pb-[52px] pt-12 lg:w-[427px] lg:min-h-[916px] lg:shrink-0 lg:gap-[13px]">
            {/* image 7919 — coins: visible in panel, slight overflow right */}
            {sideImage ? (
              <div
                className="pointer-events-none absolute z-0"
                style={{
                  width: 520,
                  height: 520,
                  left: "50%",
                  top: 24,
                  transform: "translateX(-48%)",
                }}
              >
                <Image
                  src={sideImage}
                  alt=""
                  fill
                  unoptimized
                  className="object-contain object-center"
                  sizes="520px"
                />
              </div>
            ) : null}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[48%] bg-gradient-to-t from-[#186BED] via-[#186BED]/75 to-transparent" />

            <div className="relative z-[1] flex flex-col gap-[13px]">
              <p className="text-[72px] font-bold leading-none tracking-[-2.78px] text-[#BECFFF] sm:text-[96px] lg:h-[135px] lg:text-[111px] lg:leading-[135px]">
                {rateLabel}%
              </p>
              <p className="max-w-[338px] text-[20px] font-semibold leading-7 text-white sm:text-[22px]">
                {getLocalizedText(config.calculatorRateCaption, lang)}
              </p>
            </div>
          </div>

          {/* Right Frame */}
          <div className="flex flex-1 flex-col gap-[26px] bg-white px-5 py-8 sm:px-[45px] sm:pb-[37px] sm:pt-[41px]">
            {/* Если вы откроете вклад */}
            <div className="flex flex-col gap-[15px]">
              <h2 className="text-[24px] font-bold leading-7 text-black">
                {getLocalizedText(config.calculatorTitle, lang)}
              </h2>
              <div className="flex flex-wrap gap-[11px]">
                {config.calculatorChannels.map((item) => {
                  const active = channel === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setChannel(item.id)}
                      className={`rounded-[13px] px-[17px] py-[11px] text-[14px] font-semibold leading-[17px] cursor-pointer ${
                        active
                          ? "bg-[#0561FF] text-white"
                          : "border border-[#E4E7EC] bg-white text-[#1A1A2E]"
                      }`}
                    >
                      {getLocalizedText(item.label, lang)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* На срок */}
            <div className="flex flex-col gap-[15px]">
              <h3 className="text-[24px] font-bold leading-7 text-black">
                {lang === "uz" ? "Muddat" : lang === "en" ? "Term" : "На срок"}
              </h3>
              <div className="flex flex-wrap gap-[11px]">
                {config.calculatorTerms.map((term) => {
                  const active = term.id === termId;
                  const label =
                    lang === "en"
                      ? `${term.months} mo. (${term.rate}%)`
                      : lang === "uz"
                        ? `${term.months} oy (${term.rate}%)`
                        : `${term.months} мес. (${term.rate}%)`;
                  return (
                    <button
                      key={term.id}
                      type="button"
                      onClick={() => setTermId(term.id)}
                      className={`rounded-[13px] px-[17px] py-[11px] text-[14px] font-semibold leading-[17px] cursor-pointer ${
                        active
                          ? "bg-[#0561FF] text-white"
                          : "border border-[#E4E7EC] bg-white text-[#1A1A2E]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* И пополните его на */}
            <div className="flex flex-col gap-[15px]">
              <h3 className="text-[24px] font-bold leading-7 text-black">
                {lang === "uz"
                  ? "Va uni to‘ldirasiz"
                  : lang === "en"
                    ? "And top it up with"
                    : "И пополните его на"}
              </h3>
              <div className="rounded-[20px] bg-[#FAFAFA] px-[22px] py-[19px]">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-[4px]">
                    <p className="text-[12px] font-medium leading-[15px] text-[#9AA0A6]">
                      {lang === "en" ? "Max." : lang === "uz" ? "Maks." : "Макс."}{" "}
                      {fmt(config.calculatorMax)}
                    </p>
                    <p className="text-[24px] font-bold leading-[29px] text-[#0561FF]">
                      {fmt(amount)}
                    </p>
                  </div>
                  <div className="flex rounded-[11px] bg-white p-1">
                    {(["UZS", "USD"] as const).map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setCurrency(code)}
                        className={`rounded-[8px] px-[15px] py-[7px] text-[13px] font-bold leading-4 cursor-pointer ${
                          currency === code
                            ? "bg-[#0561FF] text-white"
                            : "text-[#1A1A2E]"
                        }`}
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative mt-[19px] h-[13px]">
                  <input
                    type="range"
                    min={config.calculatorMin}
                    max={config.calculatorMax}
                    step={currency === "USD" ? 100 : 100_000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="deposit-calc-range w-full"
                    style={{
                      background: `linear-gradient(to right, #20B2C0 0%, #20B2C0 ${pct}%, #D7DBE0 ${pct}%, #D7DBE0 100%)`,
                    }}
                    aria-label={
                      lang === "en"
                        ? "Deposit amount"
                        : lang === "uz"
                          ? "Omonat summasi"
                          : "Сумма вклада"
                    }
                  />
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-[13px]">
              <label className="flex items-center gap-[11px] text-[14px] font-medium leading-[17px] text-[#110C30]">
                <button
                  type="button"
                  onClick={() => setTopUp((v) => !v)}
                  className={`flex h-[22px] w-[22px] items-center justify-center rounded-[6.5px] cursor-pointer ${
                    topUp ? "bg-[#0561FF]" : "border-[1.5px] border-[#C7CBD1] bg-white"
                  }`}
                  aria-pressed={topUp}
                >
                  {topUp && <Check size={14} className="text-white" strokeWidth={3} />}
                </button>
                <span>
                  {lang === "uz"
                    ? "Omonatni to‘ldirish"
                    : lang === "en"
                      ? "Deposit top-up"
                      : "Пополнение вклада"}
                </span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#9AA0A6] text-[10px] font-bold text-[#9AA0A6]">
                  i
                </span>
              </label>
              <label className="flex items-center gap-[11px] text-[14px] leading-[17px] text-[#9AA0A6]">
                <button
                  type="button"
                  onClick={() => setPartial((v) => !v)}
                  className={`flex h-[22px] w-[22px] items-center justify-center rounded-[6.5px] cursor-pointer ${
                    partial
                      ? "bg-[#0561FF] text-white"
                      : "border-[1.5px] border-[#C7CBD1] bg-white"
                  }`}
                  aria-pressed={partial}
                >
                  {partial && <Check size={14} className="text-white" strokeWidth={3} />}
                </button>
                <span className={partial ? "font-medium text-[#110C30]" : "font-normal"}>
                  {lang === "uz"
                    ? "Qisman yechib olish"
                    : lang === "en"
                      ? "Partial withdrawal"
                      : "Частичное снятие"}
                </span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#9AA0A6] text-[10px] font-bold text-[#9AA0A6]">
                  i
                </span>
              </label>
            </div>

            {/* Вам также подойдет + Frame 2131333208 */}
            {config.suggested.length > 0 && (
              <>
                <h3 className="-mt-3 -mb-3 text-[24px] font-bold leading-7 text-black">
                  {lang === "uz"
                    ? "Sizga ham mos keladi"
                    : lang === "en"
                      ? "You may also like"
                      : "Вам также подойдет"}
                </h3>
                <div className="-mt-3 flex w-full max-w-[750px] flex-row items-start">
                  {config.suggested.slice(0, 2).map((item, index) => (
                    <div
                      key={item.id}
                      className={`relative isolate flex w-1/2 flex-col ${
                        index === 0 ? "py-3 pl-0 pr-2" : "p-3"
                      }`}
                    >
                      <Link
                        href={item.href}
                        className="relative isolate flex h-[105px] w-full items-center overflow-hidden rounded-[20px] p-4 text-white shadow-[0px_1px_8px_rgba(2,132,199,0.08)]"
                        style={{ background: AD_GRADIENTS[index % AD_GRADIENTS.length] }}
                      >
                        {item.image ? (
                          <>
                            <Image
                              src={getMediaUrl(item.image)}
                              alt=""
                              fill
                              unoptimized
                              className="object-cover opacity-60"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                          </>
                        ) : null}
                        {item.badge && (
                          <span
                            className="absolute z-[1] rounded-lg px-1.5 py-1 text-[14px] font-medium leading-5 text-white"
                            style={{
                              right: 8,
                              top: 4,
                              backgroundColor: item.badgeColor || "#56BB27",
                            }}
                          >
                            {getLocalizedText(item.badge, lang)}
                          </span>
                        )}
                        <div className="relative z-[1] flex w-full flex-col gap-4 pr-6">
                          <p className="truncate text-[17px] font-semibold leading-5">
                            {getLocalizedText(item.title, lang)}
                          </p>
                          <div className="flex flex-row items-start gap-4 text-[12px] leading-[14px] text-white">
                            <div className="flex min-w-0 flex-col gap-1">
                              <p className="text-[14px] font-bold leading-[17px]">
                                {getLocalizedText(item.rate, lang)}
                              </p>
                              <p className="opacity-90">
                                {getLocalizedText(config.product.rateLabel, lang)}
                              </p>
                            </div>
                            <div className="flex min-w-0 flex-col gap-1">
                              <p className="text-[14px] font-bold leading-[17px]">
                                {getLocalizedText(item.amount, lang)}
                              </p>
                              <p className="opacity-90">
                                {getLocalizedText(config.product.amountLabel, lang)}
                              </p>
                            </div>
                            <div className="flex min-w-0 flex-col gap-1">
                              <p className="text-[16px] font-bold leading-[19px]">
                                {getLocalizedText(item.term, lang)}
                              </p>
                              <p className="opacity-90">
                                {getLocalizedText(config.product.termLabel, lang)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Result */}
            <div className="mt-auto flex flex-col gap-[13px]">
              <h3 className="text-[24px] font-bold leading-7 text-black">
                {lang === "uz"
                  ? "Muddat oxirida omonat summasi"
                  : lang === "en"
                    ? "At maturity the deposit will be"
                    : "То в конце срока сумма вклада будет"}
              </h3>
              <div className="h-px w-full bg-[#E4E7EC]" />
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex max-w-[390px] flex-col gap-2">
                  <p className="text-[32px] font-bold leading-[41px] text-black sm:text-[41px] sm:leading-[49px]">
                    {fmt(finalAmount)} {currency}*
                  </p>
                  <p className="text-[12px] leading-[17px] text-[#9AA0A6]">
                    {lang === "uz"
                      ? "*Muddat oxiridagi taxminiy hisob. Aniq hisobni ilovada bilish mumkin"
                      : lang === "en"
                        ? "*Estimated amount at maturity. Exact calculation is available in the app"
                        : "*Примерный расчёт суммы вклада в конце срока. Точный расчёт можно узнать в приложении TBC UZ"}
                  </p>
                </div>
                <div className="flex items-center gap-[13px]">
                  <button
                    type="button"
                    className="flex h-14 w-14 items-center justify-center rounded-[15px] bg-[#EEF0F2] cursor-pointer"
                    aria-label="Calendar"
                  >
                    <Calendar size={24} className="text-black" />
                  </button>
                  <Link
                    href="#"
                    className="inline-flex h-14 items-center justify-center rounded-[15px] bg-[#0561FF] px-7 text-[12px] font-bold uppercase tracking-[0.46px] text-white"
                  >
                    {lang === "uz"
                      ? "Muddatli omonat ochish"
                      : lang === "en"
                        ? "Open a term deposit"
                        : "Открыть срочный вклад"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
