"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { DepositDetailPageConfig } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface DepositConditionsProps {
  config: DepositDetailPageConfig;
}

/** Useful info tabs — CMS only (infoTabs / infoTabContent / conditions) */
export default function DepositConditions({ config }: DepositConditionsProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const tabs = config.infoTabs || [];
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  const tabContent = useMemo(() => {
    const fromCms = config.infoTabContent?.find((item) => item.id === activeTab);
    if (fromCms?.items?.length) return fromCms;

    if (activeTab === "terms" || !config.infoTabContent?.length) {
      const fromConditions = (config.conditions || []).map(
        (row) =>
          ({
            ru: `${getLocalizedText(row.label, "ru")}: ${getLocalizedText(row.value, "ru")}`,
            uz: `${getLocalizedText(row.label, "uz")}: ${getLocalizedText(row.value, "uz")}`,
            en: `${getLocalizedText(row.label, "en")}: ${getLocalizedText(row.value, "en")}`,
          }) as { ru: string; uz: string; en: string }
      );
      if (fromConditions.length) {
        return {
          id: "terms",
          title: config.conditionsTitle,
          items: fromConditions,
        };
      }
    }
    return config.infoTabContent?.[0] || null;
  }, [activeTab, config]);

  const title = getLocalizedText(config.infoTitle, lang);
  const contentTitle = getLocalizedText(tabContent?.title, lang);
  const imageSrc = config.infoImage?.trim()
    ? getMediaUrl(config.infoImage)
    : "";

  if (!tabs.length && !tabContent && !title) return null;

  return (
    <section className="w-full bg-white px-4 py-16 lg:px-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-9">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center">
          {title ? (
            <h2 className="flex-1 text-[28px] font-bold leading-[36px] text-[#0F0F17] lg:text-[36px] lg:leading-[44px]">
              {title}
            </h2>
          ) : (
            <div className="flex-1" />
          )}
          {tabs.length > 0 ? (
            <div className="flex max-w-full flex-wrap items-center gap-1 rounded-full bg-[#EBEDF2] p-1.5">
              {tabs.map((tab) => {
                const active = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`cursor-pointer rounded-full px-5 py-[11px] text-[15px] leading-[19px] transition-colors ${
                      active
                        ? "bg-white font-semibold text-[#0F0F17] shadow-[0px_2px_6px_rgba(0,0,0,0.08)]"
                        : "font-medium text-[#6B7280]"
                    }`}
                  >
                    {getLocalizedText(tab.label, lang)}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col items-stretch gap-8 lg:flex-row">
          <div className="flex min-h-[280px] flex-1 flex-col gap-5 rounded-3xl bg-[#F3F4F7] px-8 py-9 lg:px-10">
            {contentTitle ? (
              <h3 className="text-[22px] font-bold leading-7 text-[#0F0F17] lg:text-[28px] lg:leading-[34px]">
                {contentTitle}
              </h3>
            ) : null}
            <ul className="flex flex-col gap-3.5">
              {(tabContent?.items || []).map((item, index) => {
                const text = getLocalizedText(item, lang);
                if (!text) return null;
                return (
                  <li key={`${activeTab}-${index}`} className="flex items-start gap-2.5">
                    <span className="mt-0.5 shrink-0 text-[15px] leading-[19px] text-[#6B7280]">
                      —
                    </span>
                    <span className="text-[15px] leading-[22px] text-[#3A3F4B]">{text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative h-[240px] w-full shrink-0 overflow-hidden rounded-3xl bg-[#E8EEF8] lg:h-[360px] lg:w-[480px]">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt=""
                fill
                unoptimized
                className="object-cover"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
