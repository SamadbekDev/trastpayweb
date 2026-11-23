"use client";

import Image from "@/components/ui/SkeletonImage";
import { useTranslation } from "react-i18next";
import type { DepositHighlight } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";

/** CMS icon keys → 3D icons of the Figma «Карточные продукты» card page (designer pack cards-09…12) */
const ICONS: Record<string, string> = {
  amount: "/images/cards/icons/amount.webp",
  rate: "/images/cards/icons/rate.webp",
  term: "/images/cards/icons/term.webp",
  safe: "/images/cards/icons/safe.webp",
};

/**
 * Figma «Карточные продукты» → card page: a white strip under the hero with four facts,
 * each an icon, a value and a caption. Phones: 2×2 grid; from lg: one row.
 */
export default function CardHighlights({ items }: { items: DepositHighlight[] }) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const list = (items || []).slice(0, 4);
  if (list.length === 0) return null;

  return (
    <section className="w-full bg-[#FAFAFA]">
      <div className="mx-auto grid w-full max-w-[1176px] grid-cols-2 gap-x-4 gap-y-6 px-4 py-7 lg:grid-cols-4 lg:gap-8 lg:px-0 lg:py-9">
        {list.map((item) => {
          const icon = ICONS[item.icon];
          return (
            <div key={item.id} className="flex min-w-0 items-center gap-3">
              {icon ? (
                <Image src={icon} alt="" width={48} height={48} unoptimized className="h-10 w-10 shrink-0 lg:h-12 lg:w-12" />
              ) : null}
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="text-[17px] font-semibold leading-[22px] text-[#1F3FBF] lg:text-[20px] lg:leading-6">
                  {getLocalizedText(item.value, lang)}
                </p>
                <p className="text-[12px] leading-4 text-[#6B7280] lg:text-[13px]">
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
