"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DepositCalculator from "./DepositCalculator";
import {
  CalculatorTabsConfig,
  DepositStepsConfig,
  DepositCalculatorConfig,
} from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import i18n from "@/i18n";

interface QuickToolsProps {
  calcTabsConfig?: CalculatorTabsConfig;
  stepsConfig?: DepositStepsConfig;
  calculatorConfig?: DepositCalculatorConfig;
}

export default function QuickTools({
  calcTabsConfig,
  stepsConfig,
  calculatorConfig,
}: QuickToolsProps) {
  const currentLang = i18n.language?.split("-")[0].toLowerCase() || "ru";

  const calcTitle = getLocalizedText(calcTabsConfig?.title, currentLang) || "Быстрый расчёт Вклада";

  const tabs = calcTabsConfig?.tabs || [
    { id: "calc-deposit", label: { ru: "Вклады", uz: "Omonatlar", en: "Deposits" } },
    { id: "calc-loan", label: { ru: "Расчет кредита", uz: "Kredit hisobi", en: "Loan Calculator" } },
    { id: "calc-card", label: { ru: "Заказ карты", uz: "Karta buyurtma", en: "Order Card" } },
  ];

  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id || "calc-deposit");

  const stepsTitle = getLocalizedText(stepsConfig?.title, currentLang) || "Открыть вклад легко";

  const steps = stepsConfig?.steps || [
    { id: "step-1", number: 1, text: { ru: "Заполните онлайн-заявку — посещать банк не нужно", uz: "Onlayn ariza to'ldiring", en: "Fill online application" } },
    { id: "step-2", number: 2, text: { ru: "Бесплатно доставим договор и дебетовую карту", uz: "Shartnoma va kartani bepul yetkazamiz", en: "Free delivery" } },
    { id: "step-3", number: 3, text: { ru: "Пополните вклад онлайн или наличными без комиссии", uz: "Omonatni komissiyasiz to'ldiring", en: "Top up online without fee" } },
  ];

  return (
    <section
      id="calculator"
      className="py-10 relative overflow-hidden w-full"
    >
      <div className="container flex justify-center items-center flex-col mx-auto gap-5">
        <h1 className="text-center text-[#000000DE] text-[32px] font-semibold max-w-90 leading-10">
          {calcTitle}
        </h1>
        <div className="flex bg-[#F3F4F7] rounded-2xl p-1 mt-4 md:mt-0 max-w-fit gap-1">
          {tabs.map((tab) => {
            const tabLabel = getLocalizedText(tab.label, currentLang) || tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`relative px-5 py-2.5 rounded-xl text-[14px] font-semibold transition-colors cursor-pointer ${
                  activeTabId === tab.id ? "text-[#262626]" : "text-[#262626CC]"
                }`}
              >
                {activeTabId === tab.id && (
                  <motion.span
                    layoutId="activeToolTabBg"
                    className="absolute inset-0 bg-[#FFFFFF] rounded-xl shadow-sm"
                    transition={{ type: "tween", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto flex items-center justify-center mt-16">
        <h1 className="text-center text-[40.9px] max-w-108.75 font-bold py-6">
          {stepsTitle}
        </h1>
      </div>

      <div className="container mx-auto flex items-center justify-center mt-[52px] gap-12 flex-wrap">
        {steps.map((item) => {
          const stepText = getLocalizedText(item.text, currentLang);

          return (
            <div
              key={item.id}
              className="bg-[#F6F7F8] rounded-3xl relative w-full max-w-[336px] min-h-[160px] flex items-center justify-center"
            >
              <div className="absolute -top-7 bg-[#126DF7] text-white text-[24px] rounded-[17.5px] font-medium w-[56px] h-[56px] flex items-center justify-center">
                {item.number}
              </div>
              <p className="text-[15px] font-normal max-w-[260px] text-center leading-[20px]">
                {stepText}
              </p>
            </div>
          );
        })}
      </div>

      {/* Calculator */}
      <div className="container mx-auto mt-16">
        <AnimatePresence mode="wait">
          {activeTabId === "calc-deposit" && (
            <motion.div
              key="calc-deposit"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <DepositCalculator config={calculatorConfig} />
            </motion.div>
          )}

          {activeTabId === "calc-loan" && (
            <motion.div
              key="calc-loan"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center text-slate-400 text-sm"
            >
              Калькулятор кредита скоро будет здесь
            </motion.div>
          )}

          {activeTabId === "calc-card" && (
            <motion.div
              key="calc-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center text-slate-400 text-sm"
            >
              Форма заказа карты скоро будет здесь
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
