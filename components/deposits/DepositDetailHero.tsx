"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { DepositDetailPageConfig } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface DepositDetailHeroProps {
  config: DepositDetailPageConfig;
}

export default function DepositDetailHero({ config }: DepositDetailHeroProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const title =
    getLocalizedText(config.heroTitle, lang) ||
    getLocalizedText(config.product.title, lang);
  const subtitle =
    getLocalizedText(config.heroSubtitle, lang) ||
    getLocalizedText(config.product.description, lang);
  const primaryCta =
    getLocalizedText(config.heroPrimaryCta, lang) ||
    getLocalizedText(config.product.primaryCta, lang);
  const secondaryCta =
    getLocalizedText(config.heroSecondaryCta, lang) ||
    getLocalizedText(config.product.secondaryCta, lang);
  const imageSrc = getMediaUrl(
    config.heroImage || config.product.image,
    ""
  );

  return (
    <section className="w-full bg-[#F3F7FA]">
      <div className="mx-auto flex w-full max-w-[1176px] flex-col gap-6 px-4 pb-10 pt-6 lg:px-0 lg:pb-0 lg:pt-6">
        <nav className="flex flex-wrap items-center gap-1 text-[16px] leading-[22px] tracking-[-0.4px]">
          <span className="px-2 text-[13px] text-[#0A2896]">/</span>
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
                  <span className={isLast ? "text-[#3261EC] opacity-40" : "text-[#3261EC]"}>
                    {label}
                  </span>
                )}
                {!isLast && <span className="text-[13px] text-[#0A2896]">/</span>}
              </span>
            );
          })}
        </nav>

        <div className="flex min-h-[360px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="flex w-full max-w-[576px] flex-col pt-4 lg:pt-8">
            <h1 className="text-[36px] font-semibold leading-[50px] text-[#2F3441] lg:text-[48px]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-[17px] leading-[22px] tracking-[-0.4px] text-[#606981]">
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
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {primaryCta && (
                <Link
                  href={
                    config.heroPrimaryHref ||
                    config.product.primaryHref ||
                    "#calculator"
                  }
                  className="inline-flex h-14 min-w-[191px] items-center justify-center rounded-lg bg-[#3261EC] px-6 text-[18px] tracking-[-0.4px] text-white hover:bg-[#2651d4]"
                >
                  {primaryCta}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={
                    config.heroSecondaryHref ||
                    config.product.secondaryHref ||
                    "#"
                  }
                  className="inline-flex h-14 items-center justify-center rounded-lg border border-[#9EADD4] px-6 text-[18px] tracking-[-0.4px] text-[#2F3441] hover:bg-white"
                >
                  {secondaryCta}
                </Link>
              )}
            </div>
          </div>

          <div className="relative mx-auto h-[280px] w-full max-w-[420px] shrink-0 sm:h-[340px] lg:mx-0 lg:h-[400px]">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={title}
                fill
                unoptimized
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 90vw, 420px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-[36px] bg-[#2D6EE3] text-white">
                <span className="text-[48px] font-bold">%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
