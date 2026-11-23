"use client";

import Image from "@/components/ui/SkeletonImage";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NewsConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";
import { useHScroll } from "@/hooks/useHScroll";
import ScrollArrows from "@/components/ui/ScrollArrows";

interface NewsGridProps {
  config?: NewsConfig;
}

const ALL_NEWS: Record<Language, string> = {
  ru: "Все новости",
  uz: "Barcha yangiliklar",
  en: "All news",
};

/** «Новости банка»: a horizontal strip of news cards (drag / swipe / arrows) ending with the promo card. */
export default function NewsGrid({ config }: NewsGridProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const strip = useHScroll<HTMLDivElement>();

  if (!config?.items?.length) return null;

  const title = getLocalizedText(config.title, lang);
  const promoTitle = getLocalizedText(config.promo?.title, lang);
  const promoSubtitle = getLocalizedText(config.promo?.subtitle, lang);
  const promoCta = getLocalizedText(config.promo?.ctaText, lang);
  const card =
    "h-[360px] w-[min(384px,82vw)] shrink-0 snap-start overflow-hidden rounded-[18px]";

  return (
    <section className="w-full bg-[#FAFAFA]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 lg:gap-10 lg:px-[60px]">
        <div className="flex items-end justify-between gap-4">
          {title && (
            <h2 className="text-[28px] font-bold leading-[41px] text-[#1A1A2E] lg:text-[34px]">
              {title}
            </h2>
          )}
          <div className="flex items-center gap-4">
            <Link
              href="/press-tsentr/news"
              className="hidden text-[15px] font-semibold text-[#1E54E0] hover:underline sm:inline"
            >
              {ALL_NEWS[lang] ?? ALL_NEWS.ru}
            </Link>
            {strip.overflow && (
              <ScrollArrows
                lang={lang}
                canPrev={strip.canPrev}
                canNext={strip.canNext}
                onPrev={strip.prev}
                onNext={strip.next}
              />
            )}
          </div>
        </div>

        <div
          ref={strip.ref}
          className={`${strip.dragClassName} -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:gap-6 lg:mx-0 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden`}
        >
          {config.items.map((item) => {
            const itemTitle = getLocalizedText(item.title, lang);
            const category = getLocalizedText(item.category, lang);
            return (
              <Link
                key={item.id}
                href={item.href || "#"}
                className={`${card} group flex flex-col bg-[#F2F3F5] transition-colors hover:bg-[#EAECF0]`}
              >
                <div className="relative h-[180px] w-full shrink-0 overflow-hidden bg-[#E4E7EC]">
                  {item.image ? (
                    <Image
                      src={getMediaUrl(item.image)}
                      alt=""
                      fill
                      unoptimized
                      sizes="384px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                <div className="flex min-h-0 flex-1 flex-col justify-between gap-3 px-6 pb-5 pt-4">
                  <h3 className="line-clamp-3 text-[17px] font-bold leading-[22px] text-[#1A1A2E]">
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
                    <span className="flex h-10 w-10 items-center justify-center rounded-3xl border border-[#E8EAF0] bg-white transition-transform group-hover:translate-x-0.5">
                      <ChevronRight
                        size={18}
                        className="text-[rgba(3,3,6,0.88)]"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}

          {config.promo && (
            <div
              className={`${card} relative flex flex-col justify-between overflow-hidden p-5 text-white sm:p-6`}
            >
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
                <p className="text-[17px] font-bold leading-[22px]">
                  {promoTitle}
                </p>
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

        <Link
          href="/press-tsentr/news"
          className="-mt-4 text-[15px] font-semibold text-[#1E54E0] sm:hidden"
        >
          {ALL_NEWS[lang] ?? ALL_NEWS.ru}
        </Link>
      </div>
    </section>
  );
}
