"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { useTranslation } from "react-i18next";
import "swiper/css";

import { CardProduct } from "@/types/cards";
import { I18nText, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import CardProductCard from "./CardProductCard";

interface CardSuggestedProps {
  title: I18nText;
  products: CardProduct[];
}

export default function CardSuggested({ title, products }: CardSuggestedProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const syncEdges = (s: SwiperType) => {
    setIsBeginning(s.isBeginning || s.progress <= 0);
    setIsEnd(s.isEnd || s.progress >= 1);
  };

  if (!products.length) return null;

  return (
    <section className="w-full overflow-x-hidden bg-[#FAFAFA] py-12">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 pl-4 pr-4 lg:pl-20 lg:pr-0">
        <h2 className="pr-4 text-[32px] font-bold leading-[48px] text-[rgba(0,0,0,0.8)] lg:pr-20 lg:text-[40px]">
          {getLocalizedText(title, lang)}
        </h2>

        <Swiper
          spaceBetween={26}
          slidesPerView={1.08}
          breakpoints={{
            768: { slidesPerView: 1.25 },
            1100: { slidesPerView: 1.45 },
            1400: { slidesPerView: 1.55 },
          }}
          watchOverflow
          onSwiper={(s) => {
            swiperRef.current = s;
            syncEdges(s);
          }}
          onSlideChange={syncEdges}
          onReachBeginning={syncEdges}
          onReachEnd={syncEdges}
          onFromEdge={syncEdges}
          onResize={syncEdges}
          onUpdate={syncEdges}
          className="w-full !overflow-visible"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="!h-auto">
              <CardProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-end gap-2 pr-4 lg:pr-20">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            aria-label="Prev"
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              isBeginning
                ? "cursor-default bg-[rgba(38,55,88,0.06)] text-[rgba(5,11,44,0.22)]"
                : "cursor-pointer bg-[rgba(15,25,55,0.12)] text-[rgba(3,3,6,0.88)] hover:bg-[rgba(15,25,55,0.18)]"
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            aria-label="Next"
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              isEnd
                ? "cursor-default bg-[rgba(38,55,88,0.06)] text-[rgba(5,11,44,0.22)]"
                : "cursor-pointer bg-[rgba(15,25,55,0.12)] text-[rgba(3,3,6,0.88)] hover:bg-[rgba(15,25,55,0.18)]"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
