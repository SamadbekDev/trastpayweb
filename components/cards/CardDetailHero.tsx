"use client";

import Image from "@/components/ui/SkeletonImage";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { CardDetailPageConfig } from "@/types/cards";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface CardDetailHeroProps {
  config: CardDetailPageConfig;
}

export default function CardDetailHero({ config }: CardDetailHeroProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const title =
    getLocalizedText(config.heroTitle, lang) ||
    getLocalizedText(config.product.title, lang);
  const subtitle = getLocalizedText(config.heroSubtitle, lang);
  const primaryCta = getLocalizedText(config.heroPrimaryCta, lang);
  const imageSrc = getMediaUrl(config.heroImage || config.product.image, "");

  return (
    <section className="w-full bg-[#FAFAFA]">
      <div className="mx-auto flex w-full max-w-[1176px] flex-col gap-6 px-4 pb-0 pt-6 lg:px-0">
        <nav className="flex flex-wrap items-center gap-1 text-[16px] leading-[22px] tracking-[-0.4px]">
          {/* first crumb: home page (the bare leading «/» read like a missing item) */}
          <span className="flex items-center gap-2">
            <Link href="/" className="text-[#3261EC] hover:underline">
              {lang === "uz" ? "Bosh sahifa" : lang === "en" ? "Home" : "Главная"}
            </Link>
            <span className="text-[13px] text-[#0A2896]">/</span>
          </span>
          {config.breadcrumbs.map((item, index) => {
            const label = getLocalizedText(item.label, lang);
            const isLast = index === config.breadcrumbs.length - 1;
            return (
              <span key={`${label}-${index}`} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link href={item.href} className="text-[#3261EC] hover:underline">
                    {label}
                  </Link>
                ) : (
                  <span
                    className={
                      isLast ? "text-[#3261EC] opacity-40" : "text-[#3261EC]"
                    }
                  >
                    {label}
                  </span>
                )}
                {!isLast && (
                  <span className="text-[13px] text-[#0A2896]">/</span>
                )}
              </span>
            );
          })}
        </nav>

        <div className="flex flex-col items-start justify-between gap-8 lg:min-h-[400px] lg:flex-row lg:items-center">
          <div className="flex w-full max-w-[576px] flex-col pb-8 pt-4 lg:py-12">
            <h1 className="text-[28px] font-bold leading-[34px] text-[#1D1D2B] sm:text-[32px] sm:leading-[40px] lg:text-[40px] lg:leading-[48px]">
              {title}
            </h1>
            {/* phones / tablets: the card right under its name, above the text */}
            {imageSrc ? (
              <div className="relative mx-auto mt-5 h-[210px] w-full max-w-[420px] sm:h-[280px] lg:hidden">
                <Image src={imageSrc} alt={title} fill unoptimized priority className="object-contain" sizes="90vw" />
              </div>
            ) : null}
            {subtitle && (
              <p className="mt-4 text-[17px] font-medium leading-[22px] tracking-[-0.4px] text-[#606981]">
                {subtitle}
              </p>
            )}
            {config.heroBullets?.length > 0 && (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[17px] leading-[22px] tracking-[-0.4px] text-[#606981]">
                {config.heroBullets.map((bullet) => {
                  const text = getLocalizedText(bullet, lang);
                  return text ? <li key={text}>{text}</li> : null;
                })}
              </ul>
            )}
            {primaryCta && (
              <div className="mt-12">
                <Link
                  href={config.heroPrimaryHref || "#"}
                  className="inline-flex h-14 min-w-[196px] items-center justify-center rounded-xl bg-[#3261EC] px-6 text-[18px] tracking-[-0.4px] text-white hover:bg-[#2651d4]"
                >
                  {primaryCta}
                </Link>
              </div>
            )}
          </div>

          {/* desktop: the card on the right (Figma) */}
          <div className="relative mx-auto hidden h-[400px] w-full max-w-[477px] shrink-0 lg:mx-0 lg:block">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={title}
                fill
                unoptimized
                priority
                className="object-contain object-right"
                sizes="(max-width: 1024px) 90vw, 477px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-[24px] bg-[#1a1a2e] text-white">
                <span className="text-[32px] font-bold">VISA</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
