"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DepositFaqItem } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";

interface DepositFaqProps {
  config: {
    faqTitle: DepositFaqItem["question"];
    faq: DepositFaqItem[];
    faqMoreText: DepositFaqItem["question"];
  };
}

export default function DepositFaq({ config }: DepositFaqProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const [openId, setOpenId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const faq = config.faq ?? [];
  if (!faq.length) return null;
  const visible = showAll ? faq : faq.slice(0, 7);

  return (
    <section className="w-full bg-[#FAFAFA] py-12">
      <div className="mx-auto w-full max-w-[1176px] px-4 lg:px-0">
        <h2 className="mb-8 text-[28px] font-bold leading-[36px] text-[#1A1A2E] lg:mb-9 lg:px-3 lg:pt-3 lg:text-[36px] lg:leading-[44px]">
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
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left lg:px-8 lg:py-[22px]"
                >
                  <span className="text-[18px] leading-[26px] tracking-[-0.5px] text-[#2F3441] lg:text-[22px] lg:leading-[28px]">
                    {getLocalizedText(item.question, lang)}
                  </span>
                  <ChevronDown
                    size={32}
                    className={`shrink-0 text-[#606981] transition-transform ${open ? "rotate-180" : ""}`}
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
        {!showAll && faq.length > 7 ? (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="mt-10 inline-flex h-[52px] cursor-pointer items-center rounded-lg border border-[#9EADD4] px-6 text-[16px] leading-5 tracking-[-0.4px] text-[#2F3441]"
          >
            {getLocalizedText(config.faqMoreText, lang)}
          </button>
        ) : null}
      </div>
    </section>
  );
}
