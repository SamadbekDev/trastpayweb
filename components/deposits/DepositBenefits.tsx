"use client";

import Image from "@/components/ui/SkeletonImage";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { DepositDetailPageConfig } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface DepositBenefitsProps {
  config: DepositDetailPageConfig;
}

const titleCls = "break-words [overflow-wrap:anywhere] font-bold";
const textCls = "break-words [overflow-wrap:anywhere]";

/** Figma «Преимущества вклада (bento)» — integer scale aligned with site */
export default function DepositBenefits({ config }: DepositBenefitsProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const benefits = config.benefits ?? [];
  if (!benefits.length) return null;
  const [flex, online, paperless, protectedCard, term] = benefits;

  return (
    <section className="w-full bg-[#FAFAFA] px-4 py-9 lg:px-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4">
        <div className="grid gap-4 lg:grid-cols-2">
          {flex && (
            <article className="flex min-h-[195px] min-w-0 items-center justify-between gap-3 overflow-hidden rounded-[20px] bg-[#2D6EE3] p-7 text-white">
              <div className="min-w-0 flex-1">
                <h3 className={`${titleCls} text-[20px] leading-[24px]`}>
                  {getLocalizedText(flex.title, lang)}
                </h3>
                <p className={`${textCls} mt-2.5 text-[15px] leading-[22px]`}>
                  {getLocalizedText(flex.description, lang)}
                </p>
              </div>
              {flex.image ? (
                <div className="relative hidden h-[138px] w-[200px] shrink-0 sm:block lg:w-[260px]">
                  <Image
                    src={getMediaUrl(flex.image)}
                    alt=""
                    fill
                    unoptimized
                    className="object-contain object-right"
                  />
                </div>
              ) : null}
            </article>
          )}
          {online && (
            <article className="flex min-h-[195px] min-w-0 items-center justify-between gap-3 overflow-hidden rounded-[20px] bg-[#F6F7F8] py-7 pl-7 pr-6">
              <div className="min-w-0 flex-1">
                <h3 className={`${titleCls} text-[20px] leading-[24px] text-[#1A1A2E]`}>
                  {getLocalizedText(online.title, lang)}
                </h3>
                <p className={`${textCls} mt-2.5 text-[15px] leading-[22px] text-[#5B6472]`}>
                  {getLocalizedText(online.description, lang)}
                </p>
              </div>
              {online.image ? (
                <div className="relative hidden h-[150px] w-[180px] shrink-0 sm:block lg:w-[240px]">
                  <Image
                    src={getMediaUrl(online.image)}
                    alt=""
                    fill
                    unoptimized
                    className="object-contain object-right"
                  />
                </div>
              ) : null}
            </article>
          )}
        </div>

        <div className="grid min-w-0 gap-4 lg:grid-cols-[345px_1fr_345px]">
          {paperless && (
            <article className="min-w-0 overflow-hidden rounded-[20px] bg-[#F6F7F8] p-6">
              <h3 className={`${titleCls} text-[18px] leading-6 text-[#1A1A2E]`}>
                {getLocalizedText(paperless.title, lang)}
              </h3>
              <p className={`${textCls} mt-2 text-[14px] leading-5 text-[#5B6472]`}>
                {getLocalizedText(paperless.description, lang)}
              </p>
            </article>
          )}
          {protectedCard && (
            <article className="flex min-w-0 items-center justify-between gap-4 overflow-hidden rounded-[20px] bg-[#F6F7F8] py-6 pl-6 pr-6">
              <div className="min-w-0 flex-1">
                <h3 className={`${titleCls} text-[18px] leading-6 text-[#1A1A2E]`}>
                  {getLocalizedText(protectedCard.title, lang)}
                </h3>
                {protectedCard.extra ? (
                  <Link
                    href={protectedCard.extraHref || "#"}
                    className={`${textCls} mt-2 inline-block text-[14px] font-semibold leading-[17px] text-[#2D6EE3] underline`}
                  >
                    {getLocalizedText(protectedCard.extra, lang)}
                  </Link>
                ) : null}
                <p className={`${textCls} mt-1 text-[14px] leading-[17px] text-[#5B6472]`}>
                  {getLocalizedText(protectedCard.description, lang)}
                </p>
              </div>
              {protectedCard.image ? (
                <div className="relative hidden h-[112px] w-[112px] shrink-0 sm:block">
                  <Image
                    src={getMediaUrl(protectedCard.image)}
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              ) : null}
            </article>
          )}
          {term && (
            <article className="min-w-0 overflow-hidden rounded-[20px] bg-[#F6F7F8] p-6">
              <h3 className={`${titleCls} text-[18px] leading-6 text-[#1A1A2E]`}>
                {getLocalizedText(term.title, lang)}
              </h3>
              <p className={`${textCls} mt-2 text-[14px] leading-5 text-[#5B6472]`}>
                {getLocalizedText(term.description, lang)}
              </p>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
