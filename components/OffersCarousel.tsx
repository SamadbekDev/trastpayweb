"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { useTranslation } from "react-i18next";
import "swiper/css";

import { OffersConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface OffersCarouselProps {
  config?: OffersConfig;
}

export default function OffersCarousel({ config }: OffersCarouselProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!config?.slides?.length) return null;

  const title = getLocalizedText(config.title, lang);

  return (
    <section className="w-full bg-[#FAFAFA] py-2.5 pl-4 pr-0 lg:pl-[120px]">
      <div className="mx-auto flex w-full max-w-[1310px] flex-col gap-10">
        {title && (
          <h2 className="text-[28px] lg:text-[34px] font-bold leading-[41px] text-[#1A1A2E]">
            {title}
          </h2>
        )}

        <Swiper
          spaceBetween={24}
          slidesPerView={1.15}
          breakpoints={{
            640: { slidesPerView: 2.1 },
            1024: { slidesPerView: 3.2 },
          }}
          onSwiper={(s) => {
            swiperRef.current = s;
            setIsBeginning(s.isBeginning);
            setIsEnd(s.isEnd);
          }}
          onSlideChange={(s) => {
            setIsBeginning(s.isBeginning);
            setIsEnd(s.isEnd);
          }}
          className="w-full"
        >
          {config.slides.map((slide) => {
            const tag = getLocalizedText(slide.tag, lang);
            const slideTitle = getLocalizedText(slide.title, lang);
            const cta = getLocalizedText(slide.ctaText, lang);

            return (
              <SwiperSlide key={slide.id} className="!w-[360px] max-w-[85vw]">
                <div className="relative flex h-[400px] flex-col justify-between overflow-hidden rounded-2xl p-5 text-white sm:p-6">
                  <Image
                    src={getMediaUrl(slide.image)}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[rgba(0,0,0,0.16)]" />

                  <div className="relative z-10 flex flex-col gap-1">
                    {tag && (
                      <p className="text-[17px] font-bold leading-[22px] text-white">{tag}</p>
                    )}
                    <h3 className="text-[22px] font-medium leading-[144%] text-white max-w-[312px]">
                      {slideTitle}
                    </h3>
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
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="flex justify-end gap-2 pr-4 lg:pr-0">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            aria-label="Prev"
            className="flex h-10 w-10 items-center justify-center rounded-3xl bg-[rgba(38,55,88,0.06)] disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft size={20} className="text-[rgba(5,11,44,0.18)]" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-3xl bg-[rgba(15,25,55,0.1)] disabled:opacity-40 cursor-pointer"
          >
            <ChevronRight size={20} className="text-[rgba(3,3,6,0.88)]" />
          </button>
        </div>
      </div>
    </section>
  );
}
