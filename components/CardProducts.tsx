"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { ProductTabsConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface CardProductsProps {
  config?: ProductTabsConfig;
}

export default function CardProducts({ config }: CardProductsProps) {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const titleText = getLocalizedText(config?.title, currentLang);
  const tabs = config?.tabs || [];

  const [activeTabId, setActiveTabId] = useState<string>("");

  useEffect(() => {
    if (tabs.length > 0 && !activeTabId) {
      setActiveTabId(tabs[0].id);
    }
  }, [tabs, activeTabId]);

  if (!config || tabs.length === 0) return null;

  const currentTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const cards = currentTab?.cards || [];

  return (
    <section id="cards" className="py-10 bg-white">
      <div className="container mx-auto px-4 lg:px-[130px]">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          {titleText && <h2 className="text-[44px] font-bold text-black">{titleText}</h2>}

          <div className="flex justify-between bg-[#f4f4f4] rounded-2xl p-1 mt-4 md:mt-0 max-w-fit gap-1 min-h-[52px]">
            {tabs.map((tab) => {
              const tabLabel = getLocalizedText(tab.label, currentLang);
              if (!tabLabel) return null;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`relative px-5 py-2.5 rounded-xl text-[14px] font-semibold transition-colors cursor-pointer ${
                    activeTabId === tab.id
                      ? "text-white"
                      : "text-[#262626CC]"
                  }`}
                >
                  {activeTabId === tab.id && (
                    <motion.span
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-black rounded-xl shadow-sm"
                      transition={{ type: "tween", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {cards.map((prod) => {
            const cardTitle = getLocalizedText(prod.title, currentLang);
            const cardSubtitle = getLocalizedText(prod.subtitle, currentLang);
            const cardImg = prod.image ? getMediaUrl(prod.image) : "";

            return (
              <div
                key={prod.id}
                className="bg-white max-w-[280px] max-h-[264px] w-full shadow-[0_0_25px_0_#06347B1F] rounded-[20px] p-3 flex flex-col justify-between items-center text-center transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
              >
                <div className="w-full text-center">
                  {cardTitle && (
                    <h3 className="text-[20px] font-bold text-[#000000]">
                      {cardTitle}
                    </h3>
                  )}
                  {cardSubtitle && (
                    <p className="text-[15px] text-[#00000099] font-medium mt-2">
                      {cardSubtitle}
                    </p>
                  )}
                </div>

                {cardImg && (
                  <div className="relative w-full aspect-square max-w-[226px] max-h-[160px] my-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={cardImg}
                      alt={cardTitle || "Product Card"}
                      fill
                      unoptimized
                      sizes="(max-width: 226px) 100vw, 20vw"
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
