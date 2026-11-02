"use client";

import { useState } from "react";
import { ChevronLeft, Clock, Filter, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DepositOffice, OfficesMapConfig } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";

interface DepositOfficesProps {
  config: OfficesMapConfig;
}

export default function DepositOffices({ config }: DepositOfficesProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const [tab, setTab] = useState<"offices" | "atms">("offices");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(config.offices[0]?.id || "");

  const items = (tab === "offices" ? config.offices : config.atms).filter((item) => {
    const haystack = `${getLocalizedText(item.name, lang)} ${getLocalizedText(item.address, lang)}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  return (
    <section id="offices" className="w-full bg-white px-4 py-9 lg:px-[120px]">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mb-9">
          <h2 className="text-[28px] font-bold leading-[36px] text-[#0F172A] lg:text-[36px] lg:leading-[44px]">
            {getLocalizedText(config.officesTitle, lang)}
          </h2>
          <div className="flex items-center gap-3.5">
            <span className="inline-flex items-center gap-2 text-[14px] font-medium leading-[18px] text-[#0F172A]">
              <ChevronLeft size={16} className="text-[#64748B]" />
              {getLocalizedText(config.city, lang)}
            </span>
            <button
              type="button"
              aria-label="Filter"
              className="flex h-10 w-10 items-center justify-center rounded-[11px] border border-[#E7EAF0] bg-white"
            >
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="flex min-h-[480px] overflow-hidden rounded-[22px] border border-[#E7EAF0] bg-white shadow-[0px_9px_28px_rgba(26,38,64,0.06)] sm:min-h-[560px] lg:min-h-[665px]">
          <div className="flex w-full min-w-0 flex-col border-r border-[#E7EAF0] p-[18px] lg:w-[351px] lg:shrink-0">
            <div className="flex rounded-[15px] bg-[#F1F5F9] p-1">
              <TabButton
                active={tab === "offices"}
                onClick={() => setTab("offices")}
                label={lang === "uz" ? "Ofislar" : lang === "en" ? "Offices" : "Офисы"}
              />
              <TabButton
                active={tab === "atms"}
                onClick={() => setTab("atms")}
                label={lang === "uz" ? "Bankomatlar" : lang === "en" ? "ATMs" : "Банкоматы"}
              />
            </div>

            <label className="mt-3.5 flex h-10 items-center gap-2 rounded-[13px] border border-[#E7EAF0] px-3.5">
              <Search size={16} className="text-[#94A3B8]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={lang === "uz" ? "Qidiruv" : lang === "en" ? "Search" : "Поиск"}
                className="w-full bg-transparent text-[13px] leading-[17px] text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
              />
            </label>

            <p className="mt-3.5 flex items-center gap-2 py-1 text-[12px] leading-[15px] text-[#94A3B8]">
              <Clock size={14} className="shrink-0" />
              {lang === "uz"
                ? "du–ju: 09:00–17:00; shanba, yakshanba: dam olish"
                : lang === "en"
                  ? "Mon–Fri: 09:00–17:00; Sat, Sun: closed"
                  : "пн–пт: 09:00–17:00; сб, вс: выходной"}
            </p>

            <div className="mt-2 min-h-0 flex-1 overflow-y-auto">
              {items.map((item) => (
                <OfficeRow
                  key={item.id}
                  item={item}
                  lang={lang}
                  active={activeId === item.id}
                  onClick={() => setActiveId(item.id)}
                />
              ))}
            </div>

            <a
              href={config.mapEmbedUrl || "https://yandex.ru/maps"}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[11px] bg-[#0F172A] px-4 text-[14px] font-semibold text-white lg:hidden"
            >
              <span className="h-3 w-3 rounded-full bg-[#F43F5E]" />
              {lang === "uz" ? "Xaritada ochish" : lang === "en" ? "Open on map" : "Открыть на карте"}
            </a>
          </div>

          <div className="relative hidden min-w-0 flex-1 bg-[#EEF0E9] lg:block">
            <iframe
              title="Map"
              src={config.mapEmbedUrl}
              className="h-full w-full border-0"
            />
            <a
              href="https://yandex.ru/maps"
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-[22px] left-[18px] inline-flex items-center gap-2 rounded-[11px] bg-white py-[11px] pl-[15px] pr-4 text-[13px] font-semibold leading-4 text-[#0F172A] shadow-[0px_4px_11px_rgba(26,38,64,0.18)]"
            >
              <span className="h-4 w-3 rounded-full bg-[#F43F5E]" />
              {lang === "uz" ? "Yandex Xaritalarni ochish" : lang === "en" ? "Open Yandex Maps" : "Открыть Яндекс Карты"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-[37px] flex-1 cursor-pointer rounded-[11px] border-2 text-[13px] font-semibold leading-[17px] ${
        active ? "border-[#3B82F6] bg-[#2D6EE3] text-white" : "border-transparent text-[#64748B]"
      }`}
    >
      {label}
    </button>
  );
}

function OfficeRow({
  item,
  lang,
  active,
  onClick,
}: {
  item: DepositOffice;
  lang: Language;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full border-t border-[#E7EAF0] px-3 py-4 text-left cursor-pointer ${
        active ? "rounded-[15px] bg-[#F1F5F9]" : ""
      }`}
    >
      <p className="text-[15px] font-semibold leading-5 text-[#0F172A]">{getLocalizedText(item.name, lang)}</p>
      <p className="mt-[7px] text-[12px] leading-[18px] text-[#64748B]">
        {getLocalizedText(item.address, lang)}
      </p>
      <p className="mt-[7px] flex items-center gap-[7px] text-[12px] leading-[15px] text-[#64748B]">
        <Clock size={14} className="shrink-0" />
        {getLocalizedText(item.hours, lang)}
      </p>
    </button>
  );
}
