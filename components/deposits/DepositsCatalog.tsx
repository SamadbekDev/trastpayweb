"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { pageTransition } from "@/components/motion/transitions";
import { DepositsPageConfig } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import DepositCard from "./DepositCard";

interface DepositsCatalogProps {
  config: DepositsPageConfig;
}

export default function DepositsCatalog({ config }: DepositsCatalogProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const [activeTab, setActiveTab] = useState(config.tabs[0]?.id || "all");

  const activeFilter =
    config.tabs.find((tab) => tab.id === activeTab)?.filter || "all";

  const visibleGroups = useMemo(() => {
    return config.groups
      .map((group) => {
        const products = config.products.filter((p) => {
          if (p.category !== group.category) return false;
          if (activeFilter === "all") return true;
          if (activeFilter === "online") {
            return p.category === "online";
          }
          return p.category === activeFilter;
        });
        return { group, products };
      })
      .filter(({ products }) => products.length > 0);
  }, [config.groups, config.products, activeFilter]);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 pb-16 lg:px-0">
      <div className="flex flex-col gap-6 pt-10 lg:pt-20">
        <h1 className="text-[28px] font-bold leading-[1.2] text-[#110C30] sm:text-[34px] lg:text-[40px] lg:leading-[48px]">
          {getLocalizedText(config.title, lang)}
        </h1>

        <div className="flex w-full max-w-[1200px] flex-wrap items-start gap-2.5">
          {config.tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex cursor-pointer items-center rounded-full px-[18px] py-[11px] text-[14px] leading-[17px] transition-colors ${
                  isActive
                    ? "bg-[#0F1F3D] font-semibold text-white"
                    : "border border-[#E2E8F2] bg-[#F4F7FB] font-medium text-[#0F1F3D] hover:bg-[#EAEFF8]"
                }`}
              >
                {getLocalizedText(tab.label, lang)}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTab}
          className="flex flex-col gap-10 will-change-transform"
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
          transition={pageTransition.transition}
        >
          {visibleGroups.length === 0 ? (
            <p className="py-16 text-center text-[16px] text-[#6B7280]">
              {lang === "en"
                ? "No deposits in this category yet."
                : lang === "uz"
                  ? "Bu toifada omonatlar yo‘q."
                  : "В этой категории пока нет вкладов."}
            </p>
          ) : (
            visibleGroups.map(({ group, products }) => (
              <section key={group.id} className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-[24px] font-bold leading-9 text-[#1A1A2E] lg:text-[30px]">
                    {getLocalizedText(group.title, lang)}
                  </h2>
                  <span className="inline-flex h-[26px] items-center rounded-[20px] bg-[#E3E9F5] px-3 text-[13px] font-semibold leading-4 text-[#1F3FBF]">
                    {getLocalizedText(group.badge, lang)}
                  </span>
                </div>

                <div className="flex flex-col gap-6">
                  {products.map((product) => (
                    <DepositCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
