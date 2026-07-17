"use client";

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
    imageSrc: "/images/card_suitcase.png"
  },
  {
    id: 2,
    title: "Дебетовые карты",
    subtitle: "Суперкэшбек до 20%",
    imageSrc: "/images/card_mouse.png"
  },
  {
    id: 3,
    title: "Дебетовые карты",
    subtitle: "Суперкэшбек до 20%",
    imageSrc: "/images/card_keys.png"
  },
  {
    id: 4,
    title: "Дебетовые карты",
    subtitle: "Суперкэшбек до 20%",
    imageSrc: "/images/card_stand.png"
  },
  {
    id: 5,
    title: "Дебетовые карты",
    subtitle: "Суперкэшбек до 20%",
    imageSrc: "/images/card_globe.png"
  },
  {
    id: 6,
    title: "Дебетовые карты",
    subtitle: "Суперкэшбек до 20%",
    imageSrc: "/images/card_mouse.png"
  },
  {
    id: 7,
    title: "Дебетовые карты",
    subtitle: "Суперкэшбек до 20%",
    imageSrc: "/images/card_keys.png"
  },
  {
    id: 8,
    title: "Дебетовые карты",
    subtitle: "Суперкэшбек до 20%",
    imageSrc: "/images/card_stand.png"
  }
];

export default function CardProducts() {
  const [activeSegment, setActiveSegment] = useState<"all" | "small-business" | "corporate">("all");

  return (
    <section id="cards" className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Row 1: Section Title and Segment Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Выбирайте лучшее
          </h2>
          
          {/* Segment Toggle Filters */}
          <div className="flex bg-[#f4f4f4] rounded-full p-1 border border-slate-200/50 mt-4 md:mt-0 max-w-sm">
            <button
              onClick={() => setActiveSegment("all")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all uppercase ${
                activeSegment === "all"
                  ? "bg-black text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Для всех
            </button>
            <button
              onClick={() => setActiveSegment("small-business")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all uppercase ${
                activeSegment === "small-business"
                  ? "bg-black text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Малому бизнесу
            </button>
            <button
              onClick={() => setActiveSegment("corporate")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all uppercase ${
                activeSegment === "corporate"
                  ? "bg-black text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Бизнесу
            </button>
          </div>
        </div>

        {/* Row 2: 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsData.map((prod) => (
            <div 
              key={prod.id}
              className="bg-white border border-slate-100 hover:border-slate-200 shadow-md shadow-slate-100 rounded-3xl p-6 flex flex-col justify-between items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
            >
              {/* Card Meta */}
              <div className="w-full text-left">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
                  {prod.title}
                </h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">
                  {prod.subtitle}
                </p>
              </div>

              {/* 3D Illustration Image */}
              <div className="relative w-full aspect-square max-w-[160px] my-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={prod.imageSrc}
                  alt={prod.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 20vw"
                  className="object-contain"
                  loading="lazy"
                />
              </div>

              {/* Apply online hover link trigger placeholder */}
              <div className="w-full pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[11px] font-extrabold text-[#1b2c7a] uppercase tracking-wider">
                  Подробнее
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
