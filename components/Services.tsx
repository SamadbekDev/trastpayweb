"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { ServicesConfig } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";
import i18n from "@/i18n";

interface ServicesProps {
  config?: ServicesConfig;
}

export default function Services({ config }: ServicesProps) {
  const currentLang = i18n.language?.split("-")[0].toLowerCase() || "ru";

  const titleText = getLocalizedText(config?.title, currentLang) || "Сервисы";
  const ratesTitleText = getLocalizedText(config?.ratesTitle, currentLang) || "Курсы валют";
  const ratesDropdownLabelText = getLocalizedText(config?.ratesDropdownLabel, currentLang) || "Наличные";
  const moreCurrenciesText = getLocalizedText(config?.moreCurrenciesText, currentLang) || "Больше валют";
  const ratesDisclaimerText = getLocalizedText(config?.ratesDisclaimer, currentLang) ||
    "Информация о курсах обмена иностранных валют является справочной и может меняться в течение дня.";

  const currencies = config?.currencies || [
    { id: "usd", code: "USD", name: { ru: "Доллар США (USD)", uz: "AQSH dollari (USD)", en: "US Dollar (USD)" }, sell: "12 650", buy: "12 720", flag: "/images/flags/usd.svg" },
    { id: "eur", code: "EUR", name: { ru: "Евро (EUR)", uz: "Yevro (EUR)", en: "Euro (EUR)" }, sell: "13 410", buy: "13 520", flag: "/images/flags/eur.svg" },
    { id: "cny", code: "CNY", name: { ru: "Китайский юань (CNY)", uz: "Xitoy yuani (CNY)", en: "Chinese Yuan (CNY)" }, sell: "1 720", buy: "1 780", flag: "/images/flags/cny.svg" },
  ];

  const cards = config?.cards || [
    {
      id: "svc-1",
      title: { ru: "Отделения банка и банкоматы", uz: "Bank filiallari va bankomatlar", en: "Branches and ATMs" },
      description: { ru: "Найдите ближайшие к вам отделения и банкоматы", uz: "Eng yaqin filiallarni toping", en: "Find nearest branches" },
      icon: "/images/services/trustbank_loc.svg",
    },
  ];

  return (
    <section className="container mx-auto w-full mt-[72px] px-4 md:px-0">
      <h1 className="text-center text-[40px] font-bold">{titleText}</h1>
      <div className="flex justify-center items-stretch flex-col md:flex-row gap-[24px] mt-[40px]">
        <div className="max-w-[558px] w-full bg-[#F3F4F5] rounded-[32px] p-8 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#030306E0] text-[28px] font-bold">
                {ratesTitleText}
              </h2>
              <button className="flex items-center bg-[#212124] rounded-[99px] text-white py-1.5 px-3.5 text-sm gap-[6px] hover:bg-[#323236] transition">
                {ratesDropdownLabelText} <ChevronDown size={16} />
              </button>
            </div>

            <div className="grid grid-cols-[1fr_80px_80px] text-[14px] text-[#03030680] mb-2">
              <span className="text-[#0404138C] text-[13.9px] text-left">
                Валюта
              </span>
              <span className="text-[#0404138C] text-[13.9px] text-right">
                Продать
              </span>
              <span className="text-[#0404138C] text-[13.9px] text-right">
                Купить
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {currencies.map((curr) => {
                const currName = getLocalizedText(curr.name, currentLang) || curr.code;
                const flagSrc = getMediaUrl(curr.flag, "/images/flags/usd.svg");

                return (
                  <div
                    key={curr.id}
                    className="grid grid-cols-[1fr_80px_80px] items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={flagSrc}
                          alt={currName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="font-normal text-[#030306E0] text-[16px]">
                          {curr.code}
                        </span>
                        <span className="text-[12px] text-[#0404138C] font-normal">
                          {currName}
                        </span>
                      </div>
                    </div>
                    <span className="text-right font-medium text-[#030306E0] text-[16px]">
                      {curr.sell}
                    </span>
                    <span className="text-right font-medium text-[#030306E0] text-[16px]">
                      {curr.buy}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <a
              href="#"
              className="inline-flex items-center gap-1 text-[18px] font-medium text-[#0303069D] hover:opacity-80 transition"
            >
              {moreCurrenciesText} <ChevronRight size={20} />
            </a>
            <p className="text-[13.9px] text-[#0303069D] leading-[20px] max-w-[494px]">
              {ratesDisclaimerText}
            </p>
          </div>
        </div>

        <div className="grid grid-rows-3 max-w-[558px] w-full gap-[25px]">
          {cards.map((item) => {
            const itemTitle = getLocalizedText(item.title, currentLang);
            const itemDesc = getLocalizedText(item.description, currentLang);
            const iconSrc = getMediaUrl(item.icon, "/images/services/trustbank_loc.svg");

            return (
              <div
                key={item.id}
                className="flex justify-between bg-[#F3F4F5] rounded-[32px] p-8"
              >
                <div className="flex flex-col gap-[8px]">
                  <h3 className="text-[22px] font-bold leading-[26px] text-[#030306E0]">
                    {itemTitle}
                  </h3>
                  <p className="text-[#0303069D] text-[15.6px]">
                    {itemDesc}
                  </p>
                </div>

                <div className="relative w-full aspect-square max-w-[58px]">
                  <Image
                    src={iconSrc}
                    alt={itemTitle}
                    fill
                    sizes="(max-width: 58px) 100vw, 20vw"
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
