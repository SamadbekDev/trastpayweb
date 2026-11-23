"use client";

import { useTranslation } from "react-i18next";
import { DepositDetailPageConfig } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";

interface DepositHighlightsProps {
  config: {
    highlights: DepositDetailPageConfig["highlights"];
    highlightsTitle?: DepositDetailPageConfig["highlightsTitle"];
  };
}

/** Figma «Вариант · Госпрограмма»: blue header + fact cards */
export default function DepositHighlights({ config }: DepositHighlightsProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const title =
    getLocalizedText(config.highlightsTitle, lang);
  const items = (config.highlights || []).slice(0, 3);

  if (items.length === 0) return null;

  return (
    <section className="flex w-full flex-col items-center justify-center bg-[#FAFAFA] px-4 py-10 lg:px-[120px] lg:py-20">
      <div className="flex w-full max-w-[1240px] flex-col items-start">
        <div
          className="relative flex w-full items-center justify-center overflow-hidden rounded-t-[28px] bg-[#3261EC]"
          style={{ height: 112 }}
        >
          <h2 className="relative z-10 px-4 text-center text-[20px] font-bold uppercase leading-7 tracking-normal text-white sm:text-[26px] sm:leading-8">
            {title}
          </h2>
        </div>

        <div
          className="flex w-full flex-col items-stretch gap-6 rounded-b-[28px] border border-black/12 bg-[#F6F7F8] px-6 py-8 sm:flex-row sm:items-center sm:gap-6 sm:px-14 sm:py-10"
        >
          {items.map((item, index) => (
            <div key={item.id} className="flex flex-1 items-center gap-6">
              {index > 0 ? (
                <div className="hidden h-16 w-px shrink-0 bg-[#2D6EE3] sm:block" />
              ) : null}
              <div className="flex flex-1 flex-col items-center gap-2.5 text-center">
                <p className="text-[24px] font-bold leading-8 text-[#1A1A1A] sm:text-[28px] sm:leading-[34px]">
                  {getLocalizedText(item.value, lang)}
                </p>
                <p className="text-[15px] font-normal leading-[19px] text-[#9AA0A6]">
                  {getLocalizedText(item.label, lang)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
