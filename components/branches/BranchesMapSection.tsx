"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDown, Clock, Filter, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DepositOffice, OfficesMapConfig } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";

const BranchesLeafletMap = dynamic(() => import("./BranchesLeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-[#64748B]">
      …
    </div>
  ),
});

interface BranchesMapSectionProps {
  config: OfficesMapConfig;
}

export default function BranchesMapSection({ config }: BranchesMapSectionProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const [tab, setTab] = useState<"offices" | "atms">("offices");
  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [cityOpen, setCityOpen] = useState(false);

  const offices = useMemo(() => config.offices ?? [], [config.offices]);
  const atms = useMemo(() => config.atms ?? [], [config.atms]);
  const allItems = useMemo(
    () => [...offices, ...atms, ...(config.locations ?? [])],
    [offices, atms, config.locations],
  );

  const cities = useMemo(() => {
    const map = new Map<string, string>();
    for (const item of allItems) {
      const label = getLocalizedText(item.city || config.city, lang).trim();
      if (label) map.set(label.toLowerCase(), label);
    }
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b, lang));
  }, [allItems, config.city, lang]);

  const baseList = tab === "offices" ? offices : atms;

  const items = baseList.filter((item) => {
    const name = getLocalizedText(item.name, lang);
    const address = getLocalizedText(item.address, lang);
    const city = getLocalizedText(item.city || config.city, lang);
    const haystack = `${name} ${address} ${city}`.toLowerCase();
    if (query && !haystack.includes(query.toLowerCase())) return false;
    if (cityFilter !== "all" && city.toLowerCase() !== cityFilter.toLowerCase()) {
      return false;
    }
    return true;
  });

  const [activeId, setActiveId] = useState(items[0]?.id || offices[0]?.id || "");

  useEffect(() => {
    if (!items.some((i) => i.id === activeId)) {
      setActiveId(items[0]?.id || "");
    }
  }, [items, activeId]);

  const active = items.find((i) => i.id === activeId) || items[0];
  const rawCityLabel = getLocalizedText(
    config.defaultCity || config.city,
    lang,
  ).trim();
  const cityLabel =
    cityFilter === "all"
      ? usableCityLabel(rawCityLabel) ||
        cities[0] ||
        (lang === "uz"
          ? "Toshkent shahri"
          : lang === "en"
            ? "Tashkent city"
            : "Город Ташкент")
      : cityFilter;

  return (
    <section id="offices" className="w-full bg-white px-4 py-9 lg:px-[120px]">
      <div className="mx-auto w-full max-w-[1200px]">
        <h2 className="mb-5 text-[28px] font-bold leading-[36px] text-[#0F172A] lg:mb-6 lg:text-[36px] lg:leading-[44px]">
          {getLocalizedText(config.officesTitle, lang)}
        </h2>

        <div className="relative flex min-h-[480px] overflow-visible rounded-[22px] border border-[#E7EAF0] bg-white shadow-[0px_9px_28px_rgba(26,38,64,0.06)] sm:min-h-[560px] lg:min-h-[665px]">
          <div className="flex w-full min-w-0 flex-col overflow-hidden rounded-[22px] border-r border-[#E7EAF0] p-[18px] lg:w-[351px] lg:shrink-0 lg:rounded-none lg:rounded-l-[22px]">
            <div className="mb-3.5 flex items-center gap-2 lg:hidden">
              <CitySelect
                cityLabel={cityLabel}
                cityOpen={cityOpen}
                setCityOpen={setCityOpen}
                cityFilter={cityFilter}
                setCityFilter={setCityFilter}
                cities={cities}
                lang={lang}
              />
            </div>
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
              {active
                ? getLocalizedText(active.hours, lang)
                : lang === "uz"
                  ? "du–ju: 09:00–17:00"
                  : lang === "en"
                    ? "Mon–Fri: 09:00–17:00"
                    : "пн–пт: 09:00–17:00"}
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
              {!items.length ? (
                <p className="px-3 py-6 text-center text-[13px] text-[#94A3B8]">
                  {lang === "uz"
                    ? "Hech narsa topilmadi"
                    : lang === "en"
                      ? "Nothing found"
                      : "Ничего не найдено"}
                </p>
              ) : null}
            </div>

            <a
              href={externalMapsUrl(active)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[11px] bg-[#0F172A] px-4 text-[14px] font-semibold text-white lg:hidden"
            >
              <span className="h-3 w-3 rounded-full bg-[#F43F5E]" />
              {lang === "uz" ? "Xaritada ochish" : lang === "en" ? "Open on map" : "Открыть на карте"}
            </a>
          </div>

          <div className="relative hidden min-w-0 flex-1 overflow-hidden rounded-r-[22px] bg-[#EEF0E9] lg:block">
            <BranchesLeafletMap
              items={items}
              activeId={activeId}
              onSelect={setActiveId}
              lang={lang}
            />
            <div className="pointer-events-none absolute inset-0 z-[1100]">
              <div className="pointer-events-auto absolute right-4 top-4">
                <CitySelect
                  cityLabel={cityLabel}
                  cityOpen={cityOpen}
                  setCityOpen={setCityOpen}
                  cityFilter={cityFilter}
                  setCityFilter={setCityFilter}
                  cities={cities}
                  lang={lang}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CitySelect({
  cityLabel,
  cityOpen,
  setCityOpen,
  cityFilter,
  setCityFilter,
  cities,
  lang,
}: {
  cityLabel: string;
  cityOpen: boolean;
  setCityOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  cityFilter: string;
  setCityFilter: (city: string) => void;
  cities: string[];
  lang: Language;
}) {
  return (
    <div className="relative flex items-center gap-3">
      <button
        type="button"
        onClick={() => setCityOpen((v) => !v)}
        className="inline-flex h-10 min-w-[180px] max-w-[240px] items-center justify-between gap-2 rounded-[11px] border border-[#E7EAF0] bg-white px-3.5 text-[14px] font-medium leading-[18px] text-[#0F172A] shadow-[0px_4px_11px_rgba(26,38,64,0.12)]"
      >
        <span className="truncate">{cityLabel}</span>
        <ChevronDown size={16} className="shrink-0 text-[#64748B]" />
      </button>
      <button
        type="button"
        aria-label="Filter"
        onClick={() => setCityOpen((v) => !v)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] border border-[#E7EAF0] bg-white shadow-[0px_4px_11px_rgba(26,38,64,0.12)]"
      >
        <Filter size={18} />
      </button>
      {cityOpen ? (
        <div className="absolute right-0 top-12 z-[1200] max-h-64 min-w-[240px] overflow-y-auto rounded-[12px] border border-[#E7EAF0] bg-white p-2 shadow-lg">
          <CityOption
            active={cityFilter === "all"}
            label={
              lang === "uz"
                ? "Barcha shaharlar"
                : lang === "en"
                  ? "All cities"
                  : "Все города"
            }
            onClick={() => {
              setCityFilter("all");
              setCityOpen(false);
            }}
          />
          {cities.map((city) => (
            <CityOption
              key={city}
              active={cityFilter.toLowerCase() === city.toLowerCase()}
              label={city}
              onClick={() => {
                setCityFilter(city);
                setCityOpen(false);
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function usableCityLabel(value: string): string {
  const s = value.trim();
  if (!s || /^DYNAMIC:\s*/i.test(s)) return "";
  return s;
}

function externalMapsUrl(item: DepositOffice | undefined) {
  if (item?.lat != null && item?.lng != null) {
    return `https://www.openstreetmap.org/?mlat=${item.lat}&mlon=${item.lng}#map=15/${item.lat}/${item.lng}`;
  }
  return "https://www.openstreetmap.org/#map=12/41.3111/69.2797";
}

function CityOption({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full rounded-[8px] px-3 py-2 text-left text-[13px] ${
        active ? "bg-[#F1F5F9] font-semibold text-[#0F172A]" : "text-[#64748B]"
      }`}
    >
      {label}
    </button>
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
      <p className="text-[15px] font-semibold leading-5 text-[#0F172A]">
        {getLocalizedText(item.name, lang)}
      </p>
      <p className="mt-[7px] text-[12px] leading-[18px] text-[#64748B]">
        {getLocalizedText(item.address, lang)}
      </p>
      <p className="mt-[7px] flex items-center gap-2 text-[12px] leading-[15px] text-[#64748B]">
        <Clock size={14} className="shrink-0" />
        {getLocalizedText(item.hours, lang)}
      </p>
    </button>
  );
}
