"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Mousewheel } from "swiper/modules";
import { useTranslation } from "react-i18next";

import "swiper/css/mousewheel";
import "swiper/css";

import { PromoCarouselConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface GetMoreProps {
  config?: PromoCarouselConfig;
}

export default function GetMore({ config }: GetMoreProps) {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const titleText = getLocalizedText(config?.title, currentLang);
  const slides = config?.slides || [];

  if (!config || slides.length === 0) return null;

  return (
    <section className="w-full container mx-auto py-10 pl-6 md:pl-12 lg:pl-16">
      <div className="flex justify-between items-center mb-6 pr-6 md:pr-12 lg:pr-16">
        {titleText && (
          <h2 className="text-black text-[44px] font-bold max-w-100 leading-12">
            {titleText}
          </h2>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            aria-label="Назад"
            className="w-10 h-10 rounded-full bg-[#08243f]/5 hover:bg-[#08243f]/10 active:scale-95 disabled:opacity-20 disabled:pointer-events-none flex items-center justify-center text-[#08243f] transition-all cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            aria-label="Вперед"
            className="w-10 h-10 rounded-full bg-[#08243f]/5 hover:bg-[#08243f]/10 active:scale-95 disabled:opacity-20 disabled:pointer-events-none flex items-center justify-center text-[#08243f] transition-all cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Mousewheel]}
        mousewheel={{
          forceToAxis: true,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateNavState(swiper);
        }}
        onSlideChange={(swiper) => updateNavState(swiper)}
        onReachEnd={(swiper) => updateNavState(swiper)}
        onReachBeginning={(swiper) => updateNavState(swiper)}
        onTouchEnd={(swiper) => updateNavState(swiper)}
        spaceBetween={12}
        slidesPerView="auto"
        grabCursor={true}
        className="!p-8 !-m-6"
      >
        {slides.map((slide) => {
          const itemTitle = getLocalizedText(slide.title, currentLang);
          const itemDescription = getLocalizedText(slide.description, currentLang);
          const itemImg = slide.image ? getMediaUrl(slide.image) : "";

          return (
            <SwiperSlide
              key={slide.id}
              className="!w-[380px] !h-[346px] shrink-0"
            >
              <div className="w-full h-full bg-white rounded-[34px] p-3 shadow-[0_4px_24px_0_rgba(6,52,123,0.12)] flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1 select-none box-border">
                {itemImg && (
                  <div className="relative w-full h-[180px] rounded-[22px] overflow-hidden mb-3 shrink-0">
                    <Image
                      src={itemImg}
                      alt={itemTitle || "Promo Slide"}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="380px"
                    />
                  </div>
                )}

                <div className="flex flex-col items-center gap-2 px-2 my-auto">
                  {itemTitle && (
                    <h3 className="text-[#000000] text-[22px] font-bold leading-tight line-clamp-1">
                      {itemTitle}
                    </h3>
                  )}
                  {itemDescription && (
                    <p className="text-[#00000099] text-[14px] font-medium leading-snug line-clamp-3">
                      {itemDescription}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
