"use client";

import { CalendarDays, Percent, ShieldCheck, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DepositHighlight } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";

const icons = {
  rate: Percent,
  amount: Wallet,
  term: CalendarDays,
  safe: ShieldCheck,
};

interface DepositHighlightsProps {
  config: { highlights: DepositHighlight[] };
}

export default function DepositHighlights({ config }: DepositHighlightsProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  return (
    <section className="w-full bg-white">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-8 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-[80px]">
        {config.highlights.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons] || Percent;
          return (
            <div key={item.id} className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F0FF] text-[#2D6EE3]">
                <Icon size={22} />
              </div>
              <div>
                <p className="text-[24px] font-medium leading-8 tracking-[-1.5px] text-[#0A2896]">
                  {getLocalizedText(item.value, lang)}
                </p>
                <p className="mt-2 text-[15px] leading-5 tracking-[-0.02em] text-[#606981]">
                  {getLocalizedText(item.label, lang)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
