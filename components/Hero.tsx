"use client";

import { useEffect, useRef, useState } from "react";
import Image from "@/components/ui/SkeletonImage";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { HeroConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

/** Figma «Главный экран — Физ»: animated deposits banner (safe on a table), used until the CMS sets its own video */
const HERO_VIDEO = "/videos/hero-deposits.mp4";
const HERO_VIDEO_POSTER = "/videos/hero-deposits-poster.webp";

interface HeroProps {
  config?: HeroConfig;
}

export default function Hero({ config }: HeroProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const videoRef = useRef<HTMLVideoElement>(null);
  // CMS video that cannot be loaded → the bundled Figma video
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState<string | null>(null);

  // No autoplay for people who asked the system to reduce motion: the poster frame stays.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (media.matches) video.pause();
      else void video.play().catch(() => undefined);
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  if (!config) return null;

  const cmsVideo = config.video?.trim() && !videoFailed ? getMediaUrl(config.video) : "";
  const video = cmsVideo || HERO_VIDEO;

  const title = getLocalizedText(config.title, lang);
  const subtitle = getLocalizedText(config.subtitle, lang);
  const buttonText = getLocalizedText(config.buttonText, lang);
  const sideCards = config.sideCards || [];

  return (
    <section className="w-full bg-[#FAFAFA] pb-0 pt-8">
      <div className="mx-auto w-full max-w-[1440px] px-4 lg:px-[60px]">
        <div className="flex flex-col gap-6 items-stretch xl:flex-row">
          {/* Main banner 880×400 */}
          <div
            className="relative flex w-full flex-col overflow-hidden rounded-[20px] p-8 xl:block xl:h-[400px] xl:max-w-[880px] xl:flex-1 xl:pl-10 xl:pt-[50px]"
            // the default video starts with #F2F6FC, so the text area blends into it
            style={{ backgroundColor: config.video ? config.backgroundColor || "#F2F6FC" : "#F2F6FC" }}
          >
            {/* Video (2880×786): a block under the text below 1280px; from 1280px the card background,
                anchored to the right edge like the Figma frame (at 1440: 1466×400, 293px past the card's
                right edge), so the safe always stays right of the text. 1280–1439: scaled to 320px high. */}
            <div className="relative order-last -mx-8 -mb-8 mt-0 h-[210px] sm:mt-4 sm:h-[280px] xl:absolute xl:inset-0 xl:m-0 xl:h-auto">
              <video
                ref={videoRef}
                key={video}
                onLoadedData={() => setVideoReady(video)}
                className={`${videoReady === video ? "" : "img-skeleton "}h-full w-full object-cover object-[88%_50%] xl:absolute xl:bottom-0 xl:right-[-235px] xl:h-[320px] xl:w-[1173px] xl:max-w-none desk:right-[-293px] desk:h-[400px] desk:w-[1466px]`}
                src={video}
                poster={HERO_VIDEO_POSTER}
                onError={() => {
                  if (cmsVideo) setVideoFailed(true);
                }}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden
                tabIndex={-1}
                disablePictureInPicture
              />
            </div>
            <div className="relative z-10 flex max-w-[519px] flex-col gap-4 xl:max-w-[360px] desk:max-w-[519px]">
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
          <div className="flex w-full shrink-0 flex-col gap-6 md:flex-row xl:w-[416px] xl:flex-col">
            {sideCards.map((card) => {
              const cardTitle = getLocalizedText(card.title, lang);
              const cardSubtitle = getLocalizedText(card.subtitle, lang);
              const btn = getLocalizedText(card.buttonText, lang);
              const badge = getLocalizedText(card.badge, lang);

              return (
                <div
                  key={card.id}
                  className="relative flex h-auto min-h-[188px] overflow-hidden rounded-[20px] px-5 py-6 md:flex-1 xl:h-[188px] xl:flex-none"
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
                        href={card.buttonHref && card.buttonHref !== "#" ? card.buttonHref : "/kredity"}
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
