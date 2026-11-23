"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { DepositProduct } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface DepositCardProps {
  product: DepositProduct;
}

/**
 * Deposit catalog card — scale aligned with CreditProductCard
 */
export default function DepositCard({ product }: DepositCardProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const title = getLocalizedText(product.title, lang);
  const description = getLocalizedText(product.description, lang);
  const imageSrc = product.image?.trim() ? getMediaUrl(product.image) : "";

  const detailsHref =
    product.primaryHref && product.primaryHref !== "#"
      ? product.primaryHref
      : `/vklady/${product.id}`;

  const stats = [
    {
      value: getLocalizedText(product.rate, lang),
      label: getLocalizedText(product.rateLabel, lang),
    },
    {
      value: getLocalizedText(product.amount, lang),
      label: getLocalizedText(product.amountLabel, lang),
    },
    {
      value: getLocalizedText(product.term, lang),
      label: getLocalizedText(product.termLabel, lang),
    },
  ].filter((stat) => stat.value);

  return (
    <article className="box-border flex w-full max-w-[1200px] flex-col items-stretch gap-6 rounded-[20px] border border-[#E2E8F2] bg-white px-5 py-6 shadow-[0px_8px_28px_rgba(15,33,71,0.08)] sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-10 lg:py-8">
      <div className="flex min-w-0 flex-1 flex-col items-start gap-5">
        {title ? (
          <h3 className="text-[22px] font-bold leading-[1.2] text-[#0F1F3D] sm:text-[27px]">
            <Link href={detailsHref} className="hover:text-[#1F3FBF]">
              {title}
            </Link>
          </h3>
        ) : null}

        {description ? (
          <p className="text-[16px] font-normal leading-[1.4] text-[#5B6B85]">
            {description}
          </p>
        ) : null}

        {stats.length > 0 ? (
          <div className="flex flex-wrap items-start gap-x-8 gap-y-4 sm:gap-x-12">
            {stats.map((stat) => (
              <div
                key={stat.label || stat.value}
                className="flex flex-col items-start gap-[3px]"
              >
                <p className="text-[22px] font-bold leading-[29px] text-[#1F3FBF] sm:text-[24px]">
                  {stat.value}
                </p>
                {stat.label ? (
                  <p className="text-[14px] font-normal leading-4 text-[#5B6B85]">
                    {stat.label}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap items-start gap-3">
          {getLocalizedText(product.primaryCta, lang) ? (
            <Link
              href={detailsHref}
              className="inline-flex items-center rounded-[10px] bg-[#2F6BF0] px-[26px] py-[14px] text-[15px] font-semibold leading-[18px] text-white hover:bg-[#265ad1]"
            >
              {getLocalizedText(product.primaryCta, lang)}
            </Link>
          ) : null}
          {getLocalizedText(product.secondaryCta, lang) ? (
            <Link
              href={product.secondaryHref || "#"}
              className="inline-flex items-center rounded-[10px] bg-[#EEF1F6] px-[26px] py-[14px] text-[15px] font-semibold leading-[18px] text-[#0F1F3D] hover:bg-[#dde1ea]"
            >
              {getLocalizedText(product.secondaryCta, lang)}
            </Link>
          ) : null}
        </div>
      </div>

      {imageSrc ? (
        <Link
          href={detailsHref}
          className="relative mx-auto h-[180px] w-full max-w-[348px] shrink-0 sm:h-[218px] lg:mx-0"
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            unoptimized
            className="object-contain object-right"
            sizes="(max-width: 1024px) 90vw, 348px"
          />
        </Link>
      ) : null}
    </article>
  );
}
