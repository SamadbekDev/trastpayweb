"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { ServicesConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface ServicesProps {
  config?: ServicesConfig;
}

export default function Services({ config }: ServicesProps) {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const titleText = getLocalizedText(config?.title, currentLang);
  const ratesTitleText = getLocalizedText(config?.ratesTitle, currentLang);
  const ratesDropdownLabelText = getLocalizedText(config?.ratesDropdownLabel, currentLang);
  const moreCurrenciesText = getLocalizedText(config?.moreCurrenciesText, currentLang);
  const moreCurrenciesHref = config?.moreCurrenciesHref || "#rates";

  let ratesDisclaimerText = getLocalizedText(config?.ratesDisclaimer, currentLang);
  const ratesDisclaimerLinkText = getLocalizedText(config?.ratesDisclaimerLinkText, currentLang);
  const ratesDisclaimerLinkHref = config?.ratesDisclaimerLinkHref || "#";

  const currencies = config?.currencies || [];
  const cards = config?.cards || [];

  // Extract long disclaimer text if it was accidentally saved inside a currency's name field in backend DB
  if (!ratesDisclaimerText) {
    for (const curr of currencies) {
      const nameText = getLocalizedText(curr.name, currentLang);
      if (nameText && (nameText.length > 25 || nameText.includes("Информация") || nameText.includes("Больше валют"))) {
        ratesDisclaimerText = nameText.replace(/^Больше валют[а-яА-Яa-zA-Z0-9\s]*/i, "").trim();
        break;
      }
    }
  }

  if (!config) return null;

  return (
    <section className="container mx-auto w-full mt-[72px] px-4 md:px-0">
      {titleText && <h1 className="text-center text-[40px] font-bold mb-10">{titleText}</h1>}
      <div className="flex justify-center items-stretch flex-col md:flex-row gap-[24px]">
        {/* Currency Rates Box */}
        {(ratesTitleText || currencies.length > 0) && (
          <div className="max-w-[558px] w-full bg-[#F3F4F5] rounded-[32px] p-8 flex flex-col justify-between gap-6">
            <div>
              {/* Header: Title + Dropdown Button */}
              <div className="flex items-center justify-between mb-6 min-h-[40px]">
                {ratesTitleText && (
                  <h2 className="text-[#030306E0] text-[28px] font-bold">
                    {ratesTitleText}
                  </h2>
                )}
                {ratesDropdownLabelText && (
                  <button className="flex items-center bg-[#212124] rounded-[99px] text-white py-1.5 px-3.5 text-sm font-semibold gap-[6px] hover:bg-[#323236] transition cursor-pointer ml-auto">
                    <span>{ratesDropdownLabelText}</span>
                    <ChevronDown size={16} />
                  </button>
                )}
              </div>

              {/* Table Header */}
              {currencies.length > 0 && (
                <>
                  <div className="grid grid-cols-[1fr_80px_80px] text-[14px] text-[#0404138C] mb-4">
                    <span className="text-left font-medium">Валюта</span>
                    <span className="text-right font-medium">Продать</span>
                    <span className="text-right font-medium">Купить</span>
                  </div>

                  {/* Currency List */}
                  <div className="flex flex-col gap-5">
                    {currencies.map((curr) => {
                      const rawName = getLocalizedText(curr.name, currentLang);
                      const isDisclaimerInName =
                        rawName && (rawName.length > 25 || rawName.includes("Информация") || rawName.includes("Больше валют"));

                      const currName = isDisclaimerInName ? "" : rawName;
                      const flagSrc = curr.flag ? getMediaUrl(curr.flag) : "";

                      return (
                        <div
                          key={curr.id}
                          className="grid grid-cols-[1fr_80px_80px] items-center"
                        >
                          <div className="flex items-center gap-3 min-w-0 pr-2">
                            {/* Flag or Initials Circle */}
                            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-[#EAEFF8] text-[#08243F] font-bold text-[12px] flex items-center justify-center">
                              {flagSrc ? (
                                <Image
                                  src={flagSrc}
                                  alt={curr.code}
                                  fill
                                  unoptimized
                                  className="object-cover"
                                />
                              ) : (
                                <span>{curr.code.slice(0, 2)}</span>
                              )}
                            </div>

                            <div className="flex flex-col leading-tight min-w-0">
                              <span className="font-bold text-[#030306E0] text-[16px]">
                                {curr.code}
                              </span>
                              {currName && currName !== curr.code && (
                                <span className="text-[12px] text-[#0404138C] font-medium mt-0.5">
                                  {currName}
                                </span>
                              )}
                            </div>
                          </div>

                          <span className="text-right font-semibold text-[#030306E0] text-[16px]">
                            {curr.sell}
                          </span>
                          <span className="text-right font-semibold text-[#030306E0] text-[16px]">
                            {curr.buy}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Footer Link & Disclaimer ALWAYS at the bottom */}
            {(moreCurrenciesText || ratesDisclaimerText || ratesDisclaimerLinkText) && (
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-200/60">
                {moreCurrenciesText && (
                  <a
                    href={moreCurrenciesHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[18px] font-semibold text-[#0303069D] hover:text-[#08243f] transition-colors"
                  >
                    <span>{moreCurrenciesText}</span>
                    <ChevronRight size={20} />
                  </a>
                )}
                {(ratesDisclaimerText || ratesDisclaimerLinkText) && (
                  <p className="text-[13px] text-[#0303069D] leading-[18px] max-w-[494px] whitespace-pre-line">
                    {ratesDisclaimerText}{" "}
                    {ratesDisclaimerLinkText && (
                      <a
                        href={ratesDisclaimerLinkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline underline-offset-2 hover:text-blue-800 transition-colors inline-block"
                      >
                        {ratesDisclaimerLinkText}
                      </a>
                    )}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Services Cards */}
        {cards.length > 0 && (
          <div className="grid grid-rows-3 max-w-[558px] w-full gap-[25px]">
            {cards.map((item) => {
              const itemTitle = getLocalizedText(item.title, currentLang);
              const itemDesc = getLocalizedText(item.description, currentLang);
              const iconSrc = item.icon ? getMediaUrl(item.icon) : "";

              return (
                <div
                  key={item.id}
                  className="flex justify-between bg-[#F3F4F5] rounded-[32px] p-8 items-center"
                >
                  <div className="flex flex-col gap-[8px]">
                    {itemTitle && (
                      <h3 className="text-[22px] font-bold leading-[26px] text-[#030306E0]">
                        {itemTitle}
                      </h3>
                    )}
                    {itemDesc && (
                      <p className="text-[#0303069D] text-[15.6px]">
                        {itemDesc}
                      </p>
                    )}
                  </div>

                  {iconSrc && (
                    <div className="relative w-[58px] h-[58px] shrink-0">
                      <Image
                        src={iconSrc}
                        alt={itemTitle || "Service Icon"}
                        fill
                        unoptimized
                        className="object-contain"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
