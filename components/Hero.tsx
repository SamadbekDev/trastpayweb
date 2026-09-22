"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { HeroConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";
import i18n from "@/i18n";

interface HeroProps {
  config?: HeroConfig;
}

export default function Hero({ config }: HeroProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  if (!config) return null;

  const title = getLocalizedText(config.title, lang);
  const subtitle = getLocalizedText(config.subtitle, lang);
  const buttonText = getLocalizedText(config.buttonText, lang);
  const sideCards = config.sideCards || [];

  return (
    <section className="w-full bg-[#FAFAFA] pt-8 pb-0">
      <div className="mx-auto w-full max-w-[1440px] px-4 lg:px-[60px]">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Main banner 880×400 */}
          <div
            className="relative w-full lg:max-w-[880px] lg:flex-1 overflow-hidden rounded-[20px] min-h-[320px] lg:h-[400px] p-8 lg:pl-10 lg:pt-[50px]"
            style={{ backgroundColor: config.backgroundColor || "#D6E6FF" }}
          >
            {config.image && (
              <Image
                src={getMediaUrl(config.image)}
                alt=""
                fill
                unoptimized
                className="object-cover object-right"
                sizes="880px"
                priority
              />
            )}
            <div className="relative z-10 flex flex-col gap-4 max-w-[519px]">
              <div className="flex flex-col gap-4">
                <h1 className="text-[32px] sm:text-[40px] lg:text-[44px] font-semibold leading-[1.2] text-[#4981DA]">
                  {title}
                </h1>
                <p className="text-[18px] lg:text-[20px] font-normal leading-6 text-[#4981DA]">
                  {subtitle}
                </p>
              </div>
              {buttonText && (
                <Link
                  href={
                    !config.buttonHref ||
                    config.buttonHref === "#" ||
                    config.buttonHref === "#calculator"
                      ? "/vklady"
                      : config.buttonHref
                  }
                  className="mt-[31px] inline-flex w-fit items-center justify-center rounded-xl bg-[#1E54E0] px-5 py-4 text-[15px] font-medium leading-5 text-white hover:bg-[#1E54E0]/90 transition-colors"
                >
                  {buttonText}
                </Link>
              )}
            </div>
          </div>

          {/* Side cards column 416×400, gap 24 */}
          <div className="flex w-full lg:w-[416px] shrink-0 flex-col gap-6">
            {sideCards.map((card) => {
              const cardTitle = getLocalizedText(card.title, lang);
              const cardSubtitle = getLocalizedText(card.subtitle, lang);
              const btn = getLocalizedText(card.buttonText, lang);
              const badge = getLocalizedText(card.badge, lang);

              return (
                <div
                  key={card.id}
                  className="relative flex h-auto min-h-[188px] lg:h-[188px] overflow-hidden rounded-[20px] px-5 py-6"
                  style={{ backgroundColor: card.backgroundColor || "#F0F5F9" }}
                >
                  <div className="relative z-10 flex max-w-[257px] flex-col gap-2.5">
                    <h2 className="text-[19px] font-bold leading-[23px] text-[#1A1A2E]">
                      {cardTitle}
                    </h2>
                    {cardSubtitle && (
                      <p className="flex-1 text-[13px] font-normal leading-4 text-[#6B7280]">
                        {cardSubtitle}
                      </p>
                    )}
                    {btn && (
                      <Link
                        href={card.buttonHref || "#"}
                        className="mt-auto inline-flex h-8 w-fit items-center rounded-lg bg-[#1E54E0] px-6 text-[12px] font-semibold leading-[15px] text-white hover:bg-[#1848c4]"
                      >
                        {btn}
                      </Link>
                    )}
                    {badge && (
                      <span className="mt-auto inline-flex h-[27px] w-fit items-center rounded-full bg-[#EDE9FF] px-3 text-[12px] font-semibold leading-[15px] text-[#6B4EFF]">
                        {badge}
                      </span>
                    )}
                  </div>

                  {card.image && (
                    <div className="pointer-events-none absolute -bottom-5 right-0 h-[158px] w-[156px]">
                      <Image
                        src={getMediaUrl(card.image)}
                        alt=""
                        fill
                        unoptimized
                        className="object-contain object-right-bottom"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
