"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Mousewheel } from "swiper/modules";

import "swiper/css/mousewheel";
import "swiper/css";

interface CardProductItem {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
}

const productsData: CardProductItem[] = [
  {
    id: 1,
    title: "Денежные переводы",
    description:
      "Мгновенные международные переводы с гарантированной защитой и выдачей строго получателю».",
    imageSrc: "/images/getmore/getmore_money.png",
  },
  {
    id: 2,
    title: "Высокие ставки в TrastPay",
    description:
      "Растим ваши накопления в долларах и в суммах с повышенной ставкой для вклада от Трастбанка",
    imageSrc: "/images/getmore/getmore_security.png",
  },
  {
    id: 3,
    title: "Приводите в Trastpay всех",
    description:
      "Платим 100 000 сум за каждого, кто откроет счет и оформит карту банка",
    imageSrc: "/images/getmore/getmore_trastpay.png",
  },
  {
    id: 4,
    title: "Автокредит",
    description:
      "Мгновенные международные переводы с гарантированной защитой и выдачей строго получателю».",
    imageSrc: "/images/getmore/getmore_auto-credit.png",
  },
];

export default function GetMore() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className="w-full mx-auto py-10 pl-6 md:pl-12 lg:pl-16 overflow-hidden">
      <div className="flex justify-between items-center mb-6 pr-6 md:pr-12 lg:pr-16">
        <h2 className="text-black text-[44px] font-bold max-w-100 leading-12">
          Получайте больше с Трастбанком
        </h2>

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
        className="!p-6 !-m-6"
      >
        {productsData.map((product) => (
          <SwiperSlide
            key={product.id}
            className="!w-[320px] sm:!w-[360px] md:!w-[380px] !h-auto"
          >
            <div className="bg-white rounded-[34px] p-3 shadow-[0_4px_24px_0_rgba(6,52,123,0.12)] flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1 h-full select-none">
              <div className="relative w-full h-[200px] rounded-[20px] overflow-hidden mb-[20px] shrink-0">
                <Image
                  src={product.imageSrc}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 320px, 380px"
                />
              </div>

              <div className="flex flex-col items-center gap-[12px] px-[12px] pb-[12px]">
                <h3 className="text-[#000000] text-[24px] font-bold leading-tight">
                  {product.title}
                </h3>
                <p className="text-[#00000099] text-[16px] font-medium leading-normal">
                  {product.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
