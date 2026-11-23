"use client";

import Image from "@/components/ui/SkeletonImage";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { OffersConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";
import { useHScroll } from "@/hooks/useHScroll";
import ScrollArrows from "@/components/ui/ScrollArrows";

interface OffersCarouselProps {
  config?: OffersConfig;
}

/**
 * «Предложения для вас»: a horizontal strip on native scrolling (drag / swipe / wheel / arrows).
 * Replaces the Swiper version, whose fixed 340px slides disagreed with its slidesPerView maths,
 * so the arrows and the end of the strip were computed wrong.
 */
export default function OffersCarousel({ config }: OffersCarouselProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const strip = useHScroll<HTMLDivElement>();

  if (!config?.slides?.length) return null;

  const title = getLocalizedText(config.title, lang);

  return (
    <section className="w-full bg-[#FAFAFA] py-8 lg:py-10">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 lg:gap-9 lg:px-[120px]">
        <div className="flex items-end justify-between gap-4">
          {title && (
            <h2 className="text-[28px] font-bold leading-[36px] text-[#1A1A2E] lg:text-[36px] lg:leading-[44px]">
              {title}
            </h2>
          )}
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

        <div
          ref={strip.ref}
          className={`${strip.dragClassName} -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:gap-6 lg:mx-0 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden`}
        >
          {config.slides.map((slide) => {
            const tag = getLocalizedText(slide.tag, lang);
            const slideTitle = getLocalizedText(slide.title, lang);
            const cta = getLocalizedText(slide.ctaText, lang);

            return (
              <div
                key={slide.id}
                className="relative flex h-[380px] w-[min(340px,85vw)] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl px-6 py-5 text-white"
              >
                <Image src={getMediaUrl(slide.image)} alt="" fill unoptimized className="object-cover" />
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.16)]" />

                <div className="relative z-10 flex flex-col gap-1">
                  {tag && <p className="text-[16px] font-bold leading-[20px] text-white">{tag}</p>}
                  <h3 className="max-w-[312px] text-[20px] font-medium leading-[140%] text-white">{slideTitle}</h3>
                </div>

                {cta && (
                  <Link
                    href={slide.href || "#"}
                    className="relative z-10 mt-auto inline-flex h-11 w-fit items-center justify-center rounded-xl bg-white px-6 text-[14px] font-semibold leading-[17px] text-[#12122B]"
                  >
                    {cta}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
