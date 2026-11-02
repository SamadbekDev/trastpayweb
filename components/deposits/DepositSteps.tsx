"use client";

import Image from "next/image";
import Link from "next/link";
import { Coins } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DepositDetailPageConfig } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

function StepLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="shrink-0">
      <circle cx="8" cy="8" r="6.2" fill="none" stroke="#3261EC" strokeWidth="1" />
      <circle cx="8" cy="8" r="2.2" fill="#3261EC" />
    </svg>
  );
}

interface DepositStepsProps {
  config: {
    stepsTitle: DepositDetailPageConfig["stepsTitle"];
    stepsSubtitle?: DepositDetailPageConfig["stepsSubtitle"];
    stepsCta?: DepositDetailPageConfig["stepsCta"];
    stepsCtaHref?: DepositDetailPageConfig["stepsCtaHref"];
    stepsBannerImage?: DepositDetailPageConfig["stepsBannerImage"];
    steps: DepositDetailPageConfig["steps"];
  };
}

/** Figma block «2»: blue TOP banner + 4 step cards */
export default function DepositSteps({ config }: DepositStepsProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const title = getLocalizedText(config.stepsTitle, lang);
  const subtitle = getLocalizedText(config.stepsSubtitle, lang);
  const cta = getLocalizedText(config.stepsCta, lang);
  const bannerImage = getMediaUrl(config.stepsBannerImage || "", "");

  if (!config.steps?.length) return null;

  const hasBanner = Boolean(subtitle || cta || bannerImage);

  if (!hasBanner) {
    return (
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1280px] px-4 py-12 lg:px-6">
          <h2 className="text-[28px] font-bold leading-[36px] text-[rgba(0,0,0,0.8)] lg:text-[36px] lg:leading-[44px]">
            {title}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {config.steps.map((step, index) => (
              <article key={step.id} className="relative pt-7">
                <div
                  className={`absolute top-0 z-10 flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#2D6EE3] text-[24px] font-medium text-white ${
                    index === 0
                      ? "left-8"
                      : index === config.steps.length - 1
                        ? "right-8 left-auto"
                        : "left-1/2 -translate-x-1/2"
                  }`}
                >
                  {step.number}
                </div>
                <div className="flex min-h-[160px] flex-col rounded-3xl bg-[#F6F7F8] px-8 pb-8 pt-12">
                  <h3 className="text-[15px] font-semibold leading-5 text-[rgba(0,0,0,0.8)]">
                    {getLocalizedText(step.title, lang)}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[18px] tracking-[-0.02em] text-[#797F8E]">
                    {getLocalizedText(step.description, lang)}
                  </p>
                  {getLocalizedText(step.linkText, lang) ? (
                    <Link
                      href={step.href || "#"}
                      className="mt-3 inline-flex items-center gap-1 text-[14px] tracking-[-0.4px] text-[#3261EC]"
                    >
                      {getLocalizedText(step.linkText, lang)}
                      <StepLinkIcon />
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-visible bg-white px-4 py-10 lg:px-[100px] lg:py-20">
      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-start">
        <div className="relative h-[280px] w-full overflow-visible rounded-t-[32px] sm:h-[340px]">
          <div className="absolute bottom-2.5 left-0 h-[250px] w-full rounded-t-[32px] bg-[#2D6EE3] sm:h-[330px]" />

          <div className="absolute left-4 top-6 z-10 flex w-[min(794px,58%)] flex-col items-start gap-3 sm:left-8 sm:top-8">
            {title ? (
              <h2 className="w-full text-[30px] font-bold leading-[116%] tracking-[-0.02em] text-white sm:text-[44px]">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="w-full text-[17px] font-normal leading-[120%] text-white sm:text-[22px]">
                {subtitle}
              </p>
            ) : null}
            {cta ? (
              <div className="flex items-center pt-3">
                <Link
                  href={config.stepsCtaHref || "#calculator"}
                  className="inline-flex h-[52px] items-center justify-center gap-3 rounded-xl bg-white py-[15px] pl-6 pr-4 text-[15px] font-semibold leading-[18px] text-[#2D6EE3]"
                >
                  {cta}
                  <Coins size={22} strokeWidth={1.8} className="shrink-0 text-[#2E6FE3]" aria-hidden />
                </Link>
              </div>
            ) : null}
          </div>

          {bannerImage ? (
            <div className="pointer-events-none absolute right-0 top-2 z-[1] hidden h-[336px] w-[min(400px,42%)] sm:block">
              <Image
                src={bannerImage}
                alt=""
                fill
                unoptimized
                className="object-contain object-right-bottom"
              />
            </div>
          ) : null}
        </div>

        <div
          className="relative z-10 w-full rounded-[32px] bg-white p-8 shadow-[0px_4px_24px_rgba(6,9,17,0.12)]"
          style={{ marginTop: -52 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-6">
            {config.steps.map((step, index) => {
              const badgeAlign =
                index === 0
                  ? "left-8"
                  : index === config.steps.length - 1
                    ? "right-8 left-auto"
                    : index === 1
                      ? "left-1/2 -translate-x-1/2"
                      : "right-14";
              return (
                <div
                  key={step.id}
                  className="flex h-auto w-full max-w-[384px] flex-1 flex-col justify-center pb-4 pt-11 sm:min-w-[240px] lg:h-[220px] lg:w-[276px]"
                >
                  <article className="relative flex h-[160px] w-full flex-col rounded-3xl bg-[#F6F7F8] px-8 pb-8 pt-12">
                    <span
                      className={`absolute -top-7 flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#2D6EE3] text-[24px] font-medium leading-7 text-white ${badgeAlign}`}
                    >
                      {step.number || index + 1}
                    </span>
                    <h3 className="text-[15px] font-semibold leading-5 text-black/80">
                      {getLocalizedText(step.title, lang)}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[15px] tracking-[-0.02em] text-[#797F8E]">
                      {getLocalizedText(step.description, lang)}
                    </p>
                    {getLocalizedText(step.linkText, lang) ? (
                      <Link
                        href={step.href || "#"}
                        className="mt-auto flex items-center gap-1 pt-3 text-[13px] leading-[15px] tracking-[-0.4px] text-[#3261EC]"
                      >
                        {getLocalizedText(step.linkText, lang)}
                        <StepLinkIcon />
                      </Link>
                    ) : null}
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
