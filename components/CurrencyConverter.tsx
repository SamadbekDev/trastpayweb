"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CurrencyConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface CurrencyConverterProps {
  config?: CurrencyConfig;
}

const fmt = (n: number) =>
  n.toLocaleString("ru-RU", {
    maximumFractionDigits: 2,
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
  });

export default function CurrencyConverter({ config }: CurrencyConverterProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const rates = useMemo(() => config?.rates || [], [config?.rates]);
  const [fromCode, setFromCode] = useState(config?.defaultFrom || "USD");
  const [toCode, setToCode] = useState(config?.defaultTo || "UZS");
  const [amount, setAmount] = useState(100);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const rateMap = useMemo(() => {
    const map: Record<string, number> = { UZS: 1 };
    rates.forEach((r) => {
      map[r.code] = r.rate;
    });
    return map;
  }, [rates]);

  const converted = useMemo(() => {
    const fromRate = rateMap[fromCode] || 1;
    const toRate = rateMap[toCode] || 1;
    const inUzs = fromCode === "UZS" ? amount : amount * fromRate;
    return toCode === "UZS" ? inUzs : inUzs / toRate;
  }, [amount, fromCode, toCode, rateMap]);

  if (!config) return null;

  const title = getLocalizedText(config.title, lang);
  const haveLabel = getLocalizedText(config.haveLabel, lang);
  const wantLabel = getLocalizedText(config.wantLabel, lang);
  const amountLabel = getLocalizedText(config.amountLabel, lang);
  const currencyLabel = getLocalizedText(config.currencyLabel, lang);
  const seeAllText = getLocalizedText(config.seeAllText, lang);

  const codes = ["UZS", ...rates.map((r) => r.code)];

  const swap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  const Field = ({
    label,
    children,
  }: {
    label: string;
    children: ReactNode;
  }) => (
    <div className="flex flex-1 flex-col gap-2">
      <p className="text-[14px] font-semibold leading-[17px] text-[#1A1A2E]">{label}</p>
      <div className="flex h-[65px] items-center rounded-[14px] bg-white">{children}</div>
    </div>
  );

  const CurrencySelect = ({
    value,
    open,
    setOpen,
    onSelect,
  }: {
    value: string;
    open: boolean;
    setOpen: (v: boolean) => void;
    onSelect: (c: string) => void;
  }) => (
    <div className="relative flex h-full items-center gap-2 px-[18px] py-3.5">
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] leading-[13px] text-[#6B7280]">{currencyLabel}</span>
        <span className="text-[18px] font-bold leading-[22px] text-[#1A1A2E]">{value}</span>
      </div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E7E7EA] cursor-pointer"
      >
        <ChevronDown size={14} className="text-black" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 min-w-[100px] rounded-xl border border-black/5 bg-white py-1 shadow-lg">
          {codes.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                onSelect(c);
                setOpen(false);
              }}
              className={`block w-full px-3 py-1.5 text-left text-[13px] font-semibold cursor-pointer ${
                c === value ? "text-[#1E54E0]" : "text-[#1A1A2E] hover:bg-[#F2F3F5]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section id="currency" className="w-full bg-[#FAFAFA]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 lg:px-[60px]">
        {title && (
          <h2 className="text-[26px] font-bold leading-[31px] text-[#1A1A2E]">{title}</h2>
        )}

        <div className="flex flex-col gap-6 rounded-[20px] bg-[#F2F3F5] p-5 sm:p-7">
          <div className="flex flex-col items-stretch gap-5 lg:flex-row lg:items-center">
            <Field label={haveLabel}>
              <div className="flex flex-1 flex-col gap-0.5 px-5 py-3.5">
                <span className="text-[11px] leading-[13px] text-[#6B7280]">{amountLabel}</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  className="w-full bg-transparent text-[18px] font-semibold leading-[22px] text-[#1A1A2E] outline-none"
                />
              </div>
              <div className="h-11 w-px bg-[#E8EAF0]" />
              <CurrencySelect
                value={fromCode}
                open={fromOpen}
                setOpen={(v) => {
                  setFromOpen(v);
                  setToOpen(false);
                }}
                onSelect={setFromCode}
              />
            </Field>

            <button
              type="button"
              onClick={swap}
              aria-label="Swap"
              className="mx-auto flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#12122B] text-white cursor-pointer lg:mt-6"
            >
              <ArrowLeftRight size={18} />
            </button>

            <Field label={wantLabel}>
              <div className="flex flex-1 flex-col gap-0.5 px-5 py-3.5">
                <span className="text-[11px] leading-[13px] text-[#6B7280]">{amountLabel}</span>
                <p className="text-[18px] font-semibold leading-[22px] text-[#1A1A2E] tabular-nums">
                  {fmt(converted)}
                </p>
              </div>
              <div className="h-11 w-px bg-[#E8EAF0]" />
              <CurrencySelect
                value={toCode}
                open={toOpen}
                setOpen={(v) => {
                  setToOpen(v);
                  setFromOpen(false);
                }}
                onSelect={setToCode}
              />
            </Field>
          </div>

          <p className="text-[14px] font-semibold leading-[17px] text-[#1A1A2E]">
            Курсы валют
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            {rates.slice(0, 3).map((rate) => (
              <div
                key={rate.id}
                className="flex flex-1 flex-col gap-3.5 rounded-[14px] bg-white px-5 py-[18px]"
              >
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={getMediaUrl(rate.flag)}
                    alt={rate.code}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-medium leading-[13px] text-[#6B7280]">
                    {getLocalizedText(rate.name, lang)}
                  </span>
                  <span className="text-[18px] font-bold leading-[22px] text-[#1A1A2E] tabular-nums">
                    {fmt(rate.rate)}
                  </span>
                </div>
              </div>
            ))}

            <Link
              href={config.seeAllHref || "#"}
              className="flex min-h-[125px] flex-1 flex-col items-start justify-between rounded-[14px] bg-white px-5 py-[18px]"
            >
              <span className="text-[22px] font-bold text-[#1A1A2E]">↗</span>
              <span className="text-[15px] font-semibold leading-[18px] text-[#1A1A2E]">
                {seeAllText}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
