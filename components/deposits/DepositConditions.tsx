"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DepositDetailPageConfig } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";

interface DepositConditionsProps {
  config: DepositDetailPageConfig;
}

export default function DepositConditions({ config }: DepositConditionsProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const [openHint, setOpenHint] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-white px-4 py-16 lg:px-[120px]">
      <div className="mx-auto w-full max-w-[1200px]">
        <h2 className="text-[32px] font-bold leading-[48px] text-[rgba(0,0,0,0.8)] lg:text-[40px]">
          {getLocalizedText(config.conditionsTitle, lang)}
        </h2>
        <div className="mt-10">
          {config.conditions.map((row) => (
            <div key={row.id} className="border-b border-[#ECEEF2]">
              <div className="grid grid-cols-1 items-center gap-2 py-6 md:grid-cols-[540px_1fr]">
                <p className="text-[18px] leading-[22px] text-[#6B7280]">
                  {getLocalizedText(row.label, lang)}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-[18px] leading-[22px] text-[#2E2E4A]">
                    {getLocalizedText(row.value, lang)}
                  </p>
                  {row.hint && (
                    <button
                      type="button"
                      aria-label="Info"
                      onClick={() => setOpenHint((id) => (id === row.id ? null : row.id))}
                      className="flex h-5 w-5 items-center justify-center rounded-full border border-[#B7BAC4] text-[11px] text-[#9AA0AC] cursor-pointer"
                    >
                      <Info size={11} />
                    </button>
                  )}
                </div>
              </div>
              {openHint === row.id && row.hint && (
                <p className="pb-4 text-[14px] text-[#6B7280] md:pl-[540px]">
                  {getLocalizedText(row.hint, lang)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
