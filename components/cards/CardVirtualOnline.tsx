"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CardVirtualOnlineConfig } from "@/types/cards";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface CardVirtualOnlineProps {
  config: CardVirtualOnlineConfig;
}

export default function CardVirtualOnline({ config }: CardVirtualOnlineProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const title = getLocalizedText(config.title, lang);
  const subtitle = getLocalizedText(config.subtitle, lang);
  const stepsTitle = getLocalizedText(config.stepsTitle, lang);
  const cta = getLocalizedText(config.ctaText, lang);
  const imageSrc = getMediaUrl(config.image, "");

  return (
    <section className="w-full bg-[#FFFAFA] py-16 lg:py-20">
      <div className="mx-auto flex w-full max-w-[1440px] justify-center px-4 lg:px-[100px]">
        <div className="relative w-full max-w-[1240px] overflow-hidden rounded-[32px] bg-white shadow-[0px_4px_24px_rgba(6,9,17,0.12)]">
          {/* TOP — overflow hidden clips image to banner bounds */}
          <div className="relative h-[220px] w-full overflow-hidden bg-[#5B6A7C] sm:h-[280px]">
            <div className="relative z-10 flex h-full max-w-[709px] flex-col justify-start gap-3 p-6 sm:p-8">
              <h2 className="whitespace-pre-line text-[32px] font-bold leading-[40px] tracking-[-0.02em] text-white sm:text-[48px] sm:leading-[56px]">
                {title}
              </h2>
              {subtitle ? (
                <p className="text-[15px] leading-[1.2] text-white sm:text-[20px] lg:text-[24px] lg:leading-[29px]">
                  {subtitle}
                </p>
              ) : null}
            </div>

            {imageSrc ? (
              <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[55%] max-w-[668px]">
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover object-left"
                  sizes="668px"
                />
              </div>
            ) : null}
          </div>

          <div className="w-full bg-white p-6 sm:p-8">
            <h3 className="text-[28px] font-bold leading-[48px] text-[rgba(0,0,0,0.8)] lg:text-[40px]">
              {stepsTitle}
            </h3>

            <div className="mt-6 grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
              {config.steps.map((step, index) => (
                <article key={step.id} className="relative pt-7">
                  <div
                    className={`absolute top-0 z-10 flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#2D6EE3] text-[24px] font-medium text-white ${
                      index === 0
                        ? "left-8"
                        : index === 2
                          ? "right-8 left-auto"
                          : "left-1/2 -translate-x-1/2"
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="flex min-h-[160px] flex-col rounded-3xl bg-[#F6F7F8] px-8 pb-8 pt-12">
                    <h4 className="text-[15px] font-semibold leading-5 text-[rgba(0,0,0,0.8)]">
                      {getLocalizedText(step.title, lang)}
                    </h4>
                    <p className="mt-2 align-middle text-[13px] font-normal leading-[15px] tracking-[-0.02em] text-[#797F8E]">
                      {getLocalizedText(step.description, lang)}
                    </p>
                    {step.linkText ? (
                      <Link
                        href={step.href || "#"}
                        className="mt-3 inline-flex items-center gap-1 text-[13px] tracking-[-0.4px] text-[#3261EC] hover:underline"
                      >
                        {getLocalizedText(step.linkText, lang)}
                        <ExternalLink size={14} />
                      </Link>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>

            {cta ? (
              <div className="mt-4 flex justify-center">
                <Link
                  href={config.ctaHref || "#"}
                  className="inline-flex h-12 w-[170px] items-center justify-center rounded-xl bg-[#2F6BF0] text-[15px] font-semibold leading-[18px] text-white hover:bg-[#255bc4]"
                >
                  {cta}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
