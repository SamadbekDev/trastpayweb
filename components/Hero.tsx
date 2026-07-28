"use client";

import Image from "next/image";
import { HeroConfig } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";
import i18n from "@/i18n";

interface HeroProps {
  config?: HeroConfig;
}

export default function Hero({ config }: HeroProps) {
  const currentLang = i18n.language?.split("-")[0].toLowerCase() || "ru";

  const titleText = getLocalizedText(config?.title, currentLang);
  const highlightText = getLocalizedText(config?.highlightText, currentLang);
  const buttonText = getLocalizedText(config?.buttonText, currentLang) || "Скачать приложение";
  const buttonHref = config?.buttonHref || "#mobile-app";
  const imageSrc = getMediaUrl(config?.image, "/images/hero_bank_account.svg");

  const renderTitle = () => {
    if (!titleText) {
      return (
        <>
          Откройте банковский счет <br className="hidden sm:inline" />
          бесплатно в{" "}
          <span className="text-[#5fa2dd]">
            мобильном
            <br />
            приложении
          </span>
        </>
      );
    }

    if (highlightText && titleText.includes(highlightText)) {
      const parts = titleText.split(highlightText);
      return (
        <>
          {parts[0]}
          <span className="text-[#5fa2dd]">{highlightText}</span>
          {parts[1]}
        </>
      );
    }

    return titleText;
  };

  return (
    <section className="w-full mb-10 mt-15">
      <div className="mx-auto w-full max-w-[1360px]">
        <div className="relative mx-auto grid grid-cols-1 md:grid-cols-12 items-center min-h-[380px] lg:min-h-[440px] rounded-[28px] lg:rounded-[36px] bg-gradient-to-r from-[#0a2540] via-[#0d345a] to-[#124474] text-white shadow-xl overflow-hidden px-8 lg:px-16 py-10 lg:py-12">
          <div className="md:col-span-7 flex flex-col justify-center z-10 gap-10">
            <h1 className="font-display text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.2] tracking-tight text-white">
              {renderTitle()}
            </h1>

            <a
              href={buttonHref}
              className="inline-flex p-3 items-center self-start justify-center rounded-xl bg-white text-[15px] font-semibold text-[#0a2540] shadow-md hover:bg-slate-100 hover:shadow-lg active:scale-[0.98] transition-all duration-200"
            >
              {buttonText}
            </a>
          </div>

          <div className="md:col-span-5 relative h-full flex items-center justify-end mt-8 md:mt-0">
            <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] md:absolute md:-right-8 md:-bottom-12 lg:-right-10 lg:-bottom-16 transition-transform duration-500 hover:scale-105">
              <Image
                src={imageSrc}
                alt="Откройте банковский счет бесплатно"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 460px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
