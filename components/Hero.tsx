"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { HeroConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface HeroProps {
  config?: HeroConfig;
}

export default function Hero({ config }: HeroProps) {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const titleText = getLocalizedText(config?.title, currentLang);
  const highlightText = getLocalizedText(config?.highlightText, currentLang);
  const buttonText = getLocalizedText(config?.buttonText, currentLang);
  const buttonHref = config?.buttonHref || "#trastpay";
  const imageSrc = config?.image ? getMediaUrl(config.image) : "";

  // Parse background gradient colors if provided (e.g. "#08192B #1B5491")
  const colors = config?.backgroundColor?.trim().split(/\s+/).filter(Boolean) || ["#08192B", "#1B5491"];
  const bgStyle =
    colors.length > 1
      ? { background: `linear-gradient(135deg, ${colors.join(", ")})` }
      : { backgroundColor: colors[0] || "#08192B" };

  const renderTitle = () => {
    if (!titleText) {
      return null;
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

    return (
      <>
        {titleText}
        {highlightText && <span className="text-[#5fa2dd]"> {highlightText}</span>}
      </>
    );
  };

  if (!config) return null;

  return (
    <section className="w-full mb-10 mt-15">
      <div className="mx-auto w-full max-w-[1360px]">
        <div
          style={bgStyle}
          className="relative mx-auto grid grid-cols-1 md:grid-cols-12 items-center min-h-[380px] lg:min-h-[440px] rounded-[28px] lg:rounded-[36px] text-white shadow-xl overflow-hidden px-8 lg:px-16 py-10 lg:py-12"
        >
          <div className="md:col-span-7 flex flex-col justify-center z-10 gap-10">
            <h1 className="font-display text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.2] tracking-tight text-white">
              {renderTitle()}
            </h1>

            {buttonText && (
              <a
                href={buttonHref}
                className="inline-flex p-3 items-center self-start justify-center rounded-xl bg-white text-[15px] font-semibold text-[#0a2540] shadow-md hover:bg-slate-100 hover:shadow-lg active:scale-[0.98] transition-all duration-200"
              >
                {buttonText}
              </a>
            )}
          </div>

          {imageSrc && (
            <div className="md:col-span-5 relative h-full flex items-center justify-end mt-8 md:mt-0">
              <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] md:absolute md:-right-8 md:-bottom-12 lg:-right-10 lg:-bottom-16 transition-transform duration-500 hover:scale-105">
                <Image
                  src={imageSrc}
                  alt="Hero Image"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 460px"
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
