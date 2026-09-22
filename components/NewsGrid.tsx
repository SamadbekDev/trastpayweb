"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NewsConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface NewsGridProps {
  config?: NewsConfig;
}

export default function NewsGrid({ config }: NewsGridProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  if (!config?.items?.length) return null;

  const title = getLocalizedText(config.title, lang);
  const promoTitle = getLocalizedText(config.promo?.title, lang);
  const promoSubtitle = getLocalizedText(config.promo?.subtitle, lang);
  const promoCta = getLocalizedText(config.promo?.ctaText, lang);

  return (
    <section className="w-full bg-[#FAFAFA] px-4 py-10 lg:px-[120px]">
      <div className="mx-auto flex w-full max-w-[1212px] flex-col gap-10">
        {title && (
          <h2 className="text-[28px] lg:text-[34px] font-bold leading-[41px] text-[#1A1A2E]">
            {title}
          </h2>
        )}

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {config.items.slice(0, 3).map((item) => {
              const itemTitle = getLocalizedText(item.title, lang);
              const category = getLocalizedText(item.category, lang);
              return (
                <Link
                  key={item.id}
                  href={item.href || "#"}
                  className="flex h-[220px] flex-col justify-between rounded-[18px] bg-[#F2F3F5] px-6 pb-5 pt-6"
                >
                  <h3 className="text-[18px] font-bold leading-6 text-[#1A1A2E]">
                    {itemTitle}
                  </h3>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-medium leading-4 text-[#6B7280]">
                        {category}
                      </span>
                      <span className="text-[13px] font-normal leading-4 text-[#6B7280]">
                        {item.date}
                      </span>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-3xl border border-[#E8EAF0] bg-white">
                      <ChevronRight size={18} className="text-[rgba(3,3,6,0.88)]" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {config.items.slice(3, 5).map((item) => {
              const itemTitle = getLocalizedText(item.title, lang);
              const category = getLocalizedText(item.category, lang);
              return (
                <Link
                  key={item.id}
                  href={item.href || "#"}
                  className="flex h-[220px] flex-col justify-between rounded-[18px] bg-[#F2F3F5] px-6 pb-5 pt-6"
                >
                  <h3 className="text-[18px] font-bold leading-6 text-[#1A1A2E]">
                    {itemTitle}
                  </h3>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-medium leading-4 text-[#6B7280]">
                        {category}
                      </span>
                      <span className="text-[13px] font-normal leading-4 text-[#6B7280]">
                        {item.date}
                      </span>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-3xl border border-[#E8EAF0] bg-white">
                      <ChevronRight size={18} className="text-[rgba(3,3,6,0.88)]" />
                    </span>
                  </div>
                </Link>
              );
            })}

            {config.promo && (
              <div className="relative flex h-[220px] flex-col justify-between overflow-hidden rounded-2xl p-5 text-white sm:p-6">
                {config.promo.image && (
                  <Image
                    src={getMediaUrl(config.promo.image)}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.16)]" />
                <div className="relative z-10 flex flex-col gap-1">
                  <p className="text-[17px] font-bold leading-[22px]">{promoTitle}</p>
                  {promoSubtitle && (
                    <p className="max-w-[170px] text-[22px] font-medium leading-[144%]">
                      {promoSubtitle}
                    </p>
                  )}
                </div>
                {promoCta && (
                  <Link
                    href={config.promo.href || "#"}
                    className="relative z-10 mt-auto inline-flex h-11 w-fit items-center justify-center rounded-xl bg-white px-6 text-[14px] font-semibold leading-[17px] text-[#12122B]"
                  >
                    {promoCta}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
