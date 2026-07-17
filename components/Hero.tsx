"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Откройте банковский счет бесплатно",
    highlight: "в мобильном приложении",
    description:
      "Управляйте своими финансами 24/7. Быстрая регистрация, моментальные переводы и платежи без комиссий.",
    buttonText: "Скачать приложение",
    link: "#mobile-app",
    image: "/images/hero_bank_account.png",
    gradient: "from-[#08243f] via-[#0f3d68] to-[#1b5a96]",
    badge: "Быстро & Бесплатно",
  },
  {
    title: "Карты VISA для всего мира",
    highlight: "с кэшбэком до 5%",
    description:
      "Платите в любой точке мира, совершайте безопасные интернет-покупки и получайте высокий кэшбэк на любимые категории.",
    buttonText: "Оформить карту",
    link: "#cards",
    image: "/images/hero_visa_cards.png",
    gradient: "from-[#110e2d] via-[#1c184c] to-[#342f7c]",
    badge: "Кэшбэк & Привилегии",
  },
  {
    title: "Автокредит на новые авто",
    highlight: "от 10% годовых",
    description:
      "Приобретайте автомобиль вашей мечты с минимальным пакетом документов. Одобрение заявки за 15 минут.",
    buttonText: "Рассчитать кредит",
    link: "#calculator",
    image: "/images/hero_auto_loan.png",
    gradient: "from-[#211204] via-[#3d240c] to-[#6d441f]",
    badge: "Программа Авто",
  },
  {
    title: "Микрозаймы онлайн",
    highlight: "за 5 минут на карту",
    description:
      "Нужны деньги до зарплаты? Получите нужную сумму прямо на карту через приложение Trastpay без залога и поручителей.",
    buttonText: "Получить деньги",
    link: "#loans",
    image: "/images/hero_microloan.png",
    gradient: "from-[#032f30] via-[#094749] to-[#146b6e]",
    badge: "Онлайн займ",
  },
  {
    title: "Надежные сейфовые ячейки",
    highlight: "для полной безопасности",
    description:
      "Храните ценные бумаги, драгоценности и важные документы в сертифицированных сейфах банка с высоким уровнем защиты.",
    buttonText: "Забронировать ячейку",
    link: "#vault",
    image: "/images/hero_safe_vault.png",
    gradient: "from-[#1c1e24] via-[#2d313a] to-[#4c5260]",
    badge: "Безопасность",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  // Track previous slide to trigger re-animation on change
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setAnimKey((k) => k + 1);
  }, []);

  const nextSlide = useCallback(() => {
    goTo(current === slides.length - 1 ? 0 : current + 1);
  }, [current, goTo]);

  const prevSlide = () => {
    goTo(current === 0 ? slides.length - 1 : current - 1);
  };

  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isAutoplay, nextSlide]);

  return (
    <section className="w-full bg-[#f8fafc] pb-12 pt-8">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div
          className="relative mx-auto h-[620px] overflow-hidden rounded-[28px] lg:rounded-[36px] text-white shadow-2xl bg-slate-900"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          {/* Slides */}
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 flex flex-col lg:flex-row items-center justify-between
                bg-gradient-to-r ${slide.gradient}
                transition-opacity duration-700
                ${idx === current ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"}`}
            >
              {/* Decorative blobs */}
              <div className="anim-blob-1 absolute top-[10%] right-[10%] w-[350px] h-[350px] bg-gradient-to-br from-[#82c9ff]/15 to-[#82c9ff]/5 rounded-full blur-[90px] pointer-events-none" />
              <div className="anim-blob-2 absolute bottom-[-10%] left-[5%] w-[300px] h-[300px] bg-gradient-to-tr from-white/5 to-[#82c9ff]/5 rounded-full blur-[80px] pointer-events-none" />

              {/* SVG Waves */}
              <svg
                className="absolute inset-x-0 bottom-0 w-full h-[150px] pointer-events-none opacity-30 z-0"
                viewBox="0 0 1440 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="anim-wave-1"
                  d="M0,100 C360,140 720,60 1080,100 C1260,120 1380,110 1440,100 L1440,150 L0,150 Z"
                  fill="url(#neon-grad-1)"
                />
                <path
                  className="anim-wave-2"
                  d="M0,80 C480,50 960,110 1440,70 L1440,150 L0,150 Z"
                  fill="url(#neon-grad-2)"
                  opacity="0.5"
                />
                <defs>
                  <linearGradient id="neon-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#82c9ff" stopOpacity="0.4" />
                    <stop offset="50%"  stopColor="#48a9f8" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#08243f" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="neon-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#00f2fe" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0"   />
                  </linearGradient>
                </defs>
              </svg>

              {/* Text Content — CSS stagger animation */}
              {idx === current && (
                <div className="relative z-10 flex flex-col justify-center items-start w-full lg:w-[55%] h-full px-6 sm:px-12 lg:pl-[90px] lg:pr-0 pt-[60px] lg:pt-0">
                  {/* Badge */}
                  <span
                    key={`badge-${animKey}`}
                    className="anim-slide-up inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-wider rounded-full bg-white/10 backdrop-blur-md text-[#82c9ff] border border-white/10"
                    style={{ animationDelay: "0ms" }}
                  >
                    {slide.badge}
                  </span>

                  {/* Heading */}
                  <h1
                    key={`h1-${animKey}`}
                    className="anim-slide-up font-display text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold leading-[1.12] tracking-tight text-white mb-6"
                    style={{ animationDelay: "120ms" }}
                  >
                    {slide.title}
                    <br />
                    <span className="bg-gradient-to-r from-[#82c9ff] to-[#b3e0ff] bg-clip-text text-transparent">
                      {slide.highlight}
                    </span>
                  </h1>

                  {/* Description */}
                  <p
                    key={`p-${animKey}`}
                    className="anim-slide-up text-[15px] sm:text-[18px] text-white/80 font-medium leading-[1.5] max-w-[520px] mb-8"
                    style={{ animationDelay: "220ms" }}
                  >
                    {slide.description}
                  </p>

                  {/* CTA */}
                  <a
                    key={`cta-${animKey}`}
                    href={slide.link}
                    className="anim-slide-up inline-flex h-[52px] items-center justify-center rounded-[14px] bg-white px-8 text-[16px] font-bold text-[#08243f] shadow-lg hover:shadow-xl hover:bg-[#f3f7fc] active:scale-95 transition-all duration-200"
                    style={{ animationDelay: "320ms" }}
                  >
                    {slide.buttonText}
                  </a>
                </div>
              )}

              {/* Image */}
              <div className="relative w-full lg:w-[45%] h-[300px] sm:h-[380px] lg:h-full flex items-center justify-center px-6 lg:px-0 pb-8 lg:pb-0">
                <div className="relative w-[320px] h-[260px] sm:w-[400px] sm:h-[330px] lg:w-[490px] lg:h-[460px] transition-transform duration-700 hover:scale-105">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1024px) 100vw, 490px"
                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Prev/Next buttons */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-black/15 px-4 py-2 rounded-full backdrop-blur-md">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === current ? "w-8 bg-[#82c9ff]" : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
