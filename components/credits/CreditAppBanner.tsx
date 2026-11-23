"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useAppBannerConfig } from "@/hooks/useAppBannerConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface CreditAppBannerProps {
  title?: string;
  text?: string;
  primary?: string;
  secondary?: string;
  primaryHref?: string;
  secondaryHref?: string;
  image?: string;
  bgClassName?: string;
}

/** Break after «Мобильное приложение» like Figma */
function TitleLines({ title }: { title: string }) {
  const marker = "Мобильное приложение";
  if (title.startsWith(marker)) {
    const rest = title.slice(marker.length).trim();
    return (
      <>
        {marker}
        {rest ? (
          <>
            <br />
            {rest}
          </>
        ) : null}
      </>
    );
  }
  return <>{title}</>;
}

/** Break after «инвестиции» / «инвестии» like Figma */
function TextLines({ text }: { text: string }) {
  const markers = ["инвестиции", "инвестии"] as const;
  for (const marker of markers) {
    const idx = text.indexOf(marker);
    if (idx !== -1) {
      const end = idx + marker.length;
      const before = text.slice(0, end).trimEnd();
      const after = text.slice(end).trimStart();
      return (
        <>
          {before}
          {after ? (
            <>
              <br />
              {after}
            </>
          ) : null}
        </>
      );
    }
  }
  return <>{text}</>;
}

/**
 * Figma «Мобильное приложение»
 * Banner 1200×432 · photo as full background (no crop / no CSS gradient)
 * Title 740×130 · 56/700/116%/−2%
 * Subtitle 740×58 · 24/400/120%
 */
export default function CreditAppBanner({
  title: propTitle = "",
  text: propText = "",
  primary: propPrimary = "",
  secondary: propSecondary = "",
  primaryHref: propPrimaryHref = "#",
  secondaryHref: propSecondaryHref = "/",
  image: propImage,
  bgClassName = "bg-white",
}: CreditAppBannerProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "ru";
  const shared = useAppBannerConfig();

  const title = (shared?.title ? getLocalizedText(shared.title, lang) : "") || propTitle;
  const text = (shared?.text ? getLocalizedText(shared.text, lang) : "") || propText;
  const primary = (shared?.primary ? getLocalizedText(shared.primary, lang) : "") || propPrimary;
  const secondary =
    (shared?.secondary ? getLocalizedText(shared.secondary, lang) : "") || propSecondary;
  const primaryHref = shared?.primaryHref || propPrimaryHref;
  const secondaryHref = shared?.secondaryHref || propSecondaryHref;
  const image = shared?.image || propImage;

  if (!title) return null;

  const src = image?.trim() ? getMediaUrl(image) : "";

  return (
    <section className={`${bgClassName} px-4 py-10 lg:px-[120px]`}>
      <div
        className="relative mx-auto w-full max-w-[1200px] rounded-[24px] max-md:min-h-[360px] max-md:h-auto md:h-[432px]"
        style={{
          background: "linear-gradient(101.1deg, #2E2F83 -9.58%, #0F1F52 88.29%)",
        }}
      >
        {src ? (
          <Image
            src={src}
            alt=""
            fill
            unoptimized
            className="pointer-events-none rounded-[24px] object-cover object-right"
            sizes="(max-width: 1200px) 100vw, 1200px"
            aria-hidden
          />
        ) : null}

        {/* Content — left 32, top 32, width 740, gap 60 */}
        <div className="relative z-10 flex w-full max-w-[740px] flex-col items-start gap-8 p-6 md:absolute md:left-8 md:top-8 md:w-[740px] md:gap-[60px] md:p-0">
          <div className="flex w-full flex-col items-start gap-3 self-stretch">
            <h2
              className="w-full max-w-[740px] text-[32px] font-bold leading-[116%] tracking-[-0.02em] text-white md:h-[130px] md:text-[56px]"
            >
              <TitleLines title={title} />
            </h2>
            {text ? (
              <p className="w-full max-w-[740px] text-[16px] font-normal leading-[120%] text-white md:h-[58px] md:text-[24px]">
                <TextLines text={text} />
              </p>
            ) : null}
          </div>

          <div className="flex flex-row flex-wrap items-center gap-3">
            {primary ? (
              <div className="pt-3">
                <Link
                  href={primaryHref}
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-7 text-[15px] font-semibold leading-[18px] text-[#110C30]"
                >
                  {primary}
                </Link>
              </div>
            ) : null}
            {secondary ? (
              <div className="pt-3">
                <Link
                  href={secondaryHref}
                  className="inline-flex h-12 items-center justify-center rounded-xl px-7 text-[15px] font-semibold leading-[18px] text-white"
                >
                  {secondary}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
