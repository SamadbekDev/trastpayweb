"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";

interface CardProductItem {
  id: number;
  title: string;
  subtitle: string;
  imageSrc: string;
}

const productsData: CardProductItem[] = [
  {
    id: 1,
    title: "Дебетовые карты",
    subtitle: "Суперкэшбек до 20%",
    imageSrc: "/images/card_suitcase.svg",
  },
  {
    id: 2,
    title: "Дебетовые карты",
    subtitle: "Суперкэшбек до 20%",
    imageSrc: "/images/card_mouse.svg",
  },
  {
    id: 3,
    title: "Дебетовые карты",
    subtitle: "Суперкэшбек до 20%",
    imageSrc: "/images/card_keys.svg",
  },
  {
    id: 4,
    title: "Дебетовые карты",
    subtitle: "Суперкэшбек до 20%",
    imageSrc: "/images/card_stand.svg",
  },
  {
    id: 5,
    title: "Дебетовые карты",
    subtitle: "Суперкэшбек до 20%",
    imageSrc: "/images/card_globe.svg",
  },
  {
    id: 6,
    title: "Дебетовые карты",
    subtitle: "Суперкэшбек до 20%",
    imageSrc: "/images/card_mouse.svg",
  },
  {
    id: 7,
    title: "Дебетовые карты",
    subtitle: "Суперкэшбек до 20%",
    imageSrc: "/images/card_keys.svg",
  },
  {
    id: 8,
    title: "Дебетовые карты",
    subtitle: "Суперкэшбек до 20%",
    imageSrc: "/images/card_stand.svg",
  },
];

export default function CardProducts() {
  const [activeSegment, setActiveSegment] = useState<
    "all" | "small-business" | "corporate"
  >("all");

  return (
    <section id="cards" className="py-10 bg-white">
      <div className="container mx-auto px-4 lg:px-[130px]">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <h2 className="text-[44px] font-bold text-black">Выбирайте лучшее</h2>

          <div className="flex justify-between bg-[#f4f4f4] rounded-2xl p-1 mt-4 md:mt-0 max-w-[398px] w-full min-h-[52px]">
            {[
              { id: "all", label: "Для физ лиц" },
              { id: "small-business", label: "Малому бизнесу" },
              { id: "corporate", label: "Бизнесу" },
            ].map((segment) => (
              <button
                key={segment.id}
                onClick={() => setActiveSegment(segment.id)}
                className={`relative px-5 py-2.5 rounded-xl text-[14px] font-semibold transition-colors cursor-pointer ${
                  activeSegment === segment.id
                    ? "text-white"
                    : "text-[#262626CC]"
                }`}
              >
                {activeSegment === segment.id && (
                  <motion.span
                    layoutId="activeSegmentBg"
                    className="absolute inset-0 bg-black rounded-xl shadow-sm"
                    transition={{ type: "tween", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{segment.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {productsData.map((prod) => (
            <div
              key={prod.id}
              className="bg-white max-w-[280px] max-h-[264px] w-full shadow-[0_0_25px_0_#06347B1F] rounded-[20px] p-3 flex flex-col justify-between items-center text-center transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
            >
              <div className="w-full text-center">
                <h3 className="text-[20px] font-bold text-[#000000]">
                  {prod.title}
                </h3>
                <p className="text-[15px] text-[#00000099] font-medium mt-2">
                  {prod.subtitle}
                </p>
              </div>

              <div className="relative w-full aspect-square max-w-[226px] max-h-[160px] my-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={prod.imageSrc}
                  alt={prod.title}
                  fill
                  sizes="(max-width: 226px) 100vw, 20vw"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
