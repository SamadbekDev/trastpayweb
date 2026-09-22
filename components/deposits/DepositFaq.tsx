"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DepositDetailPageConfig } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";

interface DepositFaqProps {
  config: DepositDetailPageConfig;
}

export default function DepositFaq({ config }: DepositFaqProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const [openId, setOpenId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? config.faq : config.faq.slice(0, 7);

  return (
    <section className="w-full bg-[#FAFAFA] py-12">
      <div className="mx-auto w-full max-w-[1176px] px-4 lg:px-0">
        <h2 className="mb-10 text-[32px] font-bold leading-[48px] text-[#1A1A2E] lg:text-[40px]">
          {getLocalizedText(config.faqTitle, lang)}
        </h2>
        <div className="flex flex-col gap-4">
          {visible.map((item) => {
            const open = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-white shadow-[0px_2px_20px_rgba(21,93,241,0.05)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex w-full items-start justify-between gap-4 px-8 py-6 text-left cursor-pointer"
                >
                  <span className="text-[20px] leading-[30px] tracking-[-0.6px] text-[#2F3441] lg:text-[24px]">
                    {getLocalizedText(item.question, lang)}
                  </span>
                  <ChevronDown
                    size={28}
                    className={`mt-1 shrink-0 text-[#606981] transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <p className="px-8 pb-6 text-[16px] leading-6 text-[#606981]">
                    {getLocalizedText(item.answer, lang)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        {!showAll && (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="mt-12 inline-flex h-14 items-center rounded-lg border border-[#9EADD4] px-6 text-[18px] tracking-[-0.4px] text-[#2F3441] cursor-pointer"
          >
            {getLocalizedText(config.faqMoreText, lang)}
          </button>
        )}
      </div>
    </section>
  );
}
