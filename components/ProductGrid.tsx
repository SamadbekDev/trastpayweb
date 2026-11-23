"use client";

import Image from "@/components/ui/SkeletonImage";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ProductsConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface ProductGridProps {
  config?: ProductsConfig;
}

export default function ProductGrid({ config }: ProductGridProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  if (!config?.items?.length) return null;

  const title = getLocalizedText(config.title, lang);

  return (
    <section className="w-full bg-[#FAFAFA]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-7 px-4 lg:px-[60px]">
        {title && (
          <h2 className="text-[28px] lg:text-[34px] font-bold leading-[41px] text-[#1A1A2E]">
            {title}
          </h2>
        )}

        <div className="flex flex-wrap content-center items-center gap-y-2">
          {config.items.map((item) => {
            const label = getLocalizedText(item.label, lang);
            return (
              <Link
                key={item.id}
                href={
                  item.href && item.href !== "#"
                    ? item.href
                    : item.id === "p1"
                      ? "/vklady"
                      : "#"
                }
                className={`group flex w-1/2 md:w-1/4 h-[140px] sm:h-[179px] flex-col items-center justify-center gap-3.5 rounded-[20px] px-0 py-6 transition-colors 
                    "hover:bg-[#F6F6F8]"
                `}
              >
                <div
                  className={`relative h-24 w-24 
                    transition-transform duration-300 group-hover:scale-105
                  `}
                >
                  <Image
                    src={getMediaUrl(item.icon)}
                    alt={label}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <span className="text-center text-[17px] font-medium leading-[21px] text-[#1A1A2E]">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
