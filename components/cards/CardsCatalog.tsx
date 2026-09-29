"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CardsPageConfig } from "@/types/cards";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import CardProductCard from "./CardProductCard";

interface CardsCatalogProps {
  config: CardsPageConfig;
}

export default function CardsCatalog({ config }: CardsCatalogProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const [activeTab, setActiveTab] = useState(config.tabs[0]?.id || "all");

  const activeFilter =
    config.tabs.find((tab) => tab.id === activeTab)?.filter || "all";

  const visibleGroups = useMemo(() => {
    return config.groups
      .map((group) => {
        const products = config.products.filter((p) => {
          if (p.groupId !== group.id) return false;
          if (activeFilter === "all") return true;
          return p.category === activeFilter;
        });
        return { group, products };
      })
      .filter(({ products }) => products.length > 0);
  }, [config.groups, config.products, activeFilter]);

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-4 pb-16 lg:px-0">
      <div className="flex flex-col gap-6 pt-10 lg:pt-20">
        <h1 className="text-[28px] font-bold leading-[1.2] text-[#110C30] sm:text-[34px] lg:text-[40px] lg:leading-[48px]">
          {getLocalizedText(config.title, lang)}
        </h1>

        <div className="flex w-full items-center rounded-[14px] bg-[#EEEEF0] p-1">
          {config.tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex h-[37px] flex-1 items-center justify-center rounded-[10px] px-3 text-[13px] font-medium leading-[120%] transition-colors sm:px-[18px] sm:text-[14px] cursor-pointer ${
                  isActive
                    ? "bg-[#2D6EE3] text-white shadow-[0px_1px_2px_rgba(15,23,42,0.05)]"
                    : "bg-transparent text-[#64748B] hover:text-[#110C30]"
                }`}
              >
                {getLocalizedText(tab.label, lang)}
              </button>
            );
          })}
        </div>
      </div>

      {visibleGroups.length === 0 ? (
        <p className="py-16 text-center text-[16px] text-[#6B7280]">
          {lang === "en"
            ? "No cards in this category yet."
            : lang === "uz"
              ? "Bu toifada kartalar yo‘q."
              : "В этой категории пока нет карт."}
        </p>
      ) : (
        visibleGroups.map(({ group, products }) => (
          <section key={group.id} className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-[24px] font-bold leading-9 text-[#1A1A2E] lg:text-[30px]">
                {getLocalizedText(group.title, lang)}
              </h2>
              <span className="inline-flex h-9 items-center rounded-[20px] bg-[#E3E9F5] px-3 text-[13px] font-semibold leading-4 text-[#1F3FBF]">
                {getLocalizedText(group.badge, lang)}
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {products.map((product) => (
                <CardProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
