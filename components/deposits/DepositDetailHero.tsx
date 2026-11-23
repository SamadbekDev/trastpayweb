"use client";

import Image from "@/components/ui/SkeletonImage";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { DepositDetailPageConfig } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";

const DEPOSIT_HERO_BG = "/images/figma/deposits/hero-safe.png";

interface DepositDetailHeroProps {
  config: DepositDetailPageConfig;
}

/**
 * Figma deposits hero — 1440 × 594.38.
 * The picture is a 1440 × 594 artwork with the safe baked in on the right, so it is
 * always rendered at its native scale: centered at 1440 on wide screens (edges blend
 * into the section background) and cropped from the left on narrower ones.
 */
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
  const bullets = (config.heroBullets ?? [])
    .map((bullet) => getLocalizedText(bullet, lang))
    .filter(Boolean);

  const crumbSlash =
    "flex h-4 items-center text-[13px] font-normal leading-4 tracking-[-0.1px] text-[#0A2896]";
  const crumbText =
    "flex h-[22px] items-center font-normal leading-[22px] tracking-[-0.4px] text-[#3261EC]";

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#FAFAFA] lg:bg-[#F3F7FA]">
      <div
        className="pointer-events-none absolute inset-y-0 right-[max(0px,calc(50%-720px))] z-0 hidden w-full max-w-[1440px] lg:block"
        aria-hidden
      >
        <Image
          src={DEPOSIT_HERO_BG}
          alt=""
          fill
          unoptimized
          priority
          className="object-cover object-right"
          sizes="1440px"
        />
      </div>

      <div className="relative z-[1] mx-auto flex w-full max-w-[1224px] flex-col items-start gap-6 px-4 pt-6 lg:h-[594.38px] lg:px-6">
        {config.breadcrumbs?.length > 0 ? (
          <nav
            className="flex min-h-[22px] w-full flex-row flex-wrap content-start items-start"
            aria-label="Breadcrumb"
          >
            <span className="flex h-[22px] flex-col items-start px-2 pb-px pt-[5px]">
              <span className={crumbSlash}>/</span>
            </span>

            {(config.breadcrumbs ?? []).map((item, index) => {
              const label = getLocalizedText(item.label, lang);
              const isLast = index === (config.breadcrumbs?.length || 0) - 1;

              return (
                <span
                  key={`${label}-${index}`}
                  className={`flex h-[22px] flex-row items-start ${isLast ? "opacity-40" : ""}`}
                >
                  {item.href && !isLast ? (
                    <Link href={item.href} className={`${crumbText} text-[16.5px] hover:underline`}>
                      {label}
                    </Link>
                  ) : (
                    <span className={`${crumbText} text-[16.5px]`}>
                      {label}
                    </span>
                  )}
                  {!isLast ? (
                    <span className="flex h-[22px] items-start px-1 pt-[5px]">
                      <span className={crumbSlash}>/</span>
                    </span>
                  ) : null}
                </span>
              );
            })}
          </nav>
        ) : null}

        <div className="flex w-full flex-col items-start gap-6 lg:h-[442.38px] lg:min-h-[400px] lg:flex-row lg:justify-between">
          <div className="flex w-full max-w-[576px] flex-col items-start pb-8 pt-4 lg:h-[442.38px] lg:w-[576px] lg:shrink-0 lg:pb-12 lg:pt-16">
            <div className="flex w-full flex-col items-start gap-4">
              {title ? (
                <h1 className="flex w-full items-center text-balance text-[28px] font-bold leading-[34px] text-[#2F3441] sm:text-[36px] sm:leading-[40px] lg:min-h-[96px] lg:text-[44px] lg:font-semibold lg:leading-[48px]">
                  {title}
                </h1>
              ) : null}

              <div className="flex w-full flex-col items-start gap-4">
                {subtitle ? (
                  <p className="w-full text-[16px] font-normal leading-[22px] tracking-[-0.4px] text-[#606981]">
                    {subtitle}
                  </p>
                ) : null}

                {bullets.length > 0 ? (
                  <ul className="flex w-full list-disc flex-col items-start pl-6 marker:text-[#606981]">
                    {bullets.map((text, index) => (
                      <li
                        key={`${text}-${index}`}
                        className={`w-full max-w-[522px] text-[16.5px] font-normal leading-[22px] tracking-[-0.4px] text-[#606981] ${
                          index < bullets.length - 1 ? "pb-2" : ""
                        }`}
                      >
                        {text}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            {primaryCta || secondaryCta ? (
              <div className="flex w-full flex-col gap-3 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:pt-12">
                {primaryCta ? (
                  <Link
                    href={config.heroPrimaryHref || config.product.primaryHref || "#calculator"}
                    className="inline-flex h-[52px] min-h-[52px] w-full items-center justify-center rounded-lg bg-[#3261EC] px-6 text-center text-[16px] font-medium leading-5 tracking-[-0.4px] text-white transition-colors hover:bg-[#2651d4] sm:w-auto sm:min-w-[180px]"
                  >
                    {primaryCta}
                  </Link>
                ) : null}
                {secondaryCta ? (
                  <Link
                    href={config.heroSecondaryHref || config.product.secondaryHref || "#"}
                    className="inline-flex h-[52px] min-h-[52px] w-full items-center justify-center rounded-lg border border-[#9EADD4] px-6 text-center text-[16px] font-medium leading-5 tracking-[-0.4px] text-[#2F3441] transition-colors hover:bg-white/60 sm:w-auto sm:min-w-[220px]"
                  >
                    {secondaryCta}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Rectangle 576 × 442.38 — empty slot, the picture shows through */}
          <div className="hidden h-[442.38px] min-w-0 max-w-[576px] flex-1 lg:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}
