"use client";

import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import DepositCalculator from "./DepositCalculator";

const depositSteps = [
  {
    id: 1,
    description: "Заполните онлайн-заявку — посещать банк не нужно",
  },
  {
    id: 2,
    description:
      "Бесплатно доставим договор и дебетовую карту Т‑Банка, если у вас ее нет",
  },
  {
    id: 3,
    description: "Пополните вклад онлайн или наличными без комиссии",
  },
];

const tabs = [
  { id: "deposit", label: "Вклады" },
  { id: "calc-credit", label: "Расчет кредита" },
  { id: "order-card", label: "Заказ карты" },
] as const;

type ToolTab = (typeof tabs)[number]["id"];

export default function QuickTools() {
  const [activeToolTab, setToolTab] = useState<ToolTab>("deposit");

  return (
    <section
      id="calculator"
      className="py-10 relative overflow-hidden w-full"
    >
      <div className="container flex justify-center items-center flex-col mx-auto gap-5">
        <h1 className="text-center text-[#000000DE] text-[32px] font-semibold max-w-90 leading-10">
          Быстрый расчёт Вклада
        </h1>
        <div className="flex bg-[#F3F4F7] rounded-2xl p-1 mt-4 md:mt-0 max-w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setToolTab(tab.id)}
              className={`relative px-5 py-2.5 rounded-xl text-[14px] font-semibold transition-colors cursor-pointer ${
                activeToolTab === tab.id ? "text-[#262626]" : "text-[#262626CC]"
              }`}
            >
              {activeToolTab === tab.id && (
                <motion.span
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-[#FFFFFF] rounded-xl shadow-sm"
                  transition={{ type: "tween", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto flex items-center justify-center mt-16">
        <h1 className="text-center text-[40.9px] max-w-108.75 font-bold py-6">
          Открыть вклад легко
        </h1>
      </div>

      <div className="container mx-auto flex items-center justify-center mt-[52px] gap-12">
        {depositSteps.map((item) => (
          <div
            key={item.id}
            className="bg-[#F6F7F8] rounded-3xl relative w-full max-w-[336px] min-h-[160px] flex items-center justify-center"
          >
            <div className="absolute -top-7 bg-[#126DF7] text-white text-[24px] rounded-[17.5px] font-medium w-[56px] h-[56px] flex items-center justify-center">
              {item.id}
            </div>
            <p className="text-[15px] font-normal max-w-[260px] text-center leading-[20px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Calculator, shown under the steps for the active tab */}
      <div className="container mx-auto mt-16">
        <AnimatePresence mode="wait">
          {activeToolTab === "deposit" && (
            <motion.div
              key="deposit"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <DepositCalculator />
            </motion.div>
          )}

          {activeToolTab === "calc-credit" && (
            <motion.div
              key="calc-credit"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center text-slate-400 text-sm"
            >
              Калькулятор кредита скоро будет здесь
            </motion.div>
          )}

          {activeToolTab === "order-card" && (
            <motion.div
              key="order-card"
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
