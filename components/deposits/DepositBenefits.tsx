"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { DepositDetailPageConfig } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface DepositBenefitsProps {
  config: DepositDetailPageConfig;
}

export default function DepositBenefits({ config }: DepositBenefitsProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const [flex, online, paperless, protectedCard, term] = config.benefits;

  return (
    <section className="w-full bg-[#F2F4F8] px-4 py-9 lg:px-9">
      <div className="mx-auto flex w-full max-w-[1368px] flex-col gap-[18px]">
        <div className="grid gap-[18px] lg:grid-cols-2">
          {flex && (
            <article className="flex min-h-[195px] min-w-0 items-center justify-between gap-4 overflow-hidden rounded-[22.5px] bg-[#2D6EE3] p-8 text-white">
              <div className="min-w-0 max-w-[361px] flex-1">
                <h3 className="break-words text-[22px] font-bold leading-7 [overflow-wrap:anywhere]">
                  {getLocalizedText(flex.title, lang)}
                </h3>
                <p className="mt-3 break-words text-[16px] leading-[22px] [overflow-wrap:anywhere]">
                  {getLocalizedText(flex.description, lang)}
                </p>
              </div>
              {flex.image && (
                <div className="relative hidden h-[138px] w-[180px] shrink-0 sm:block">
                  <Image src={getMediaUrl(flex.image)} alt="" fill unoptimized className="object-contain" />
                </div>
              )}
            </article>
          )}
          {online && (
            <article className="flex min-h-[195px] min-w-0 items-center justify-between gap-4 overflow-hidden rounded-[22.5px] bg-white px-6 py-8">
              <div className="min-w-0 max-w-[378px] flex-1">
                <h3 className="break-words text-[22px] font-bold leading-7 text-[#1A1A2E] [overflow-wrap:anywhere]">
                  {getLocalizedText(online.title, lang)}
                </h3>
                <p className="mt-3 break-words text-[16px] leading-[22px] text-[#5B6472] [overflow-wrap:anywhere]">
                  {getLocalizedText(online.description, lang)}
                </p>
              </div>
              {online.image && (
                <div className="relative hidden h-[150px] w-[180px] shrink-0 sm:block">
                  <Image src={getMediaUrl(online.image)} alt="" fill unoptimized className="object-contain" />
                </div>
              )}
            </article>
          )}
        </div>

        <div className="grid gap-[18px] lg:grid-cols-[345px_1fr_345px]">
          {paperless && (
            <article className="min-w-0 overflow-hidden rounded-[22.5px] bg-white p-[30px]">
              <h3 className="break-words text-[19.5px] font-bold leading-6 text-[#1A1A2E] [overflow-wrap:anywhere]">
                {getLocalizedText(paperless.title, lang)}
              </h3>
              <p className="mt-2 break-words text-[14px] leading-5 text-[#5B6472] [overflow-wrap:anywhere]">
                {getLocalizedText(paperless.description, lang)}
              </p>
            </article>
          )}
          {protectedCard && (
            <article className="flex min-w-0 items-center justify-between gap-4 overflow-hidden rounded-[22.5px] bg-white px-6 py-[30px]">
              <div className="min-w-0 flex-1">
                <h3 className="break-words text-[19.5px] font-bold leading-6 text-[#1A1A2E] [overflow-wrap:anywhere]">
                  {getLocalizedText(protectedCard.title, lang)}
                </h3>
                {protectedCard.extra && (
                  <Link
                    href={protectedCard.extraHref || "#"}
                    className="mt-2 inline-block break-words text-[14px] font-semibold leading-[17px] text-[#2D6EE3] underline [overflow-wrap:anywhere]"
                  >
                    {getLocalizedText(protectedCard.extra, lang)}
                  </Link>
                )}
                <p className="mt-1 break-words text-[14px] leading-[17px] text-[#5B6472] [overflow-wrap:anywhere]">
                  {getLocalizedText(protectedCard.description, lang)}
                </p>
              </div>
              {protectedCard.image && (
                <div className="relative hidden h-[112px] w-[112px] shrink-0 sm:block">
                  <Image
                    src={getMediaUrl(protectedCard.image)}
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              )}
            </article>
          )}
          {term && (
            <article className="min-w-0 overflow-hidden rounded-[22.5px] bg-white p-[30px]">
              <h3 className="break-words text-[19.5px] font-bold leading-6 text-[#1A1A2E] [overflow-wrap:anywhere]">
                {getLocalizedText(term.title, lang)}
              </h3>
              <p className="mt-2 break-words text-[14px] leading-5 text-[#5B6472] [overflow-wrap:anywhere]">
                {getLocalizedText(term.description, lang)}
              </p>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
