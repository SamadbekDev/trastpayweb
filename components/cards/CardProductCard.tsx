"use client";

import Image from "@/components/ui/SkeletonImage";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { CardProduct } from "@/types/cards";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface CardProductCardProps {
  product: CardProduct;
}

export default function CardProductCard({ product }: CardProductCardProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const title = getLocalizedText(product.title, lang);
  const description = getLocalizedText(product.description, lang);
  const detailsHref =
    product.primaryHref && product.primaryHref !== "#"
      ? product.primaryHref
      : `/karty/${product.id}`;

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
  ];

  return (
    // below lg (phones / tablets): picture first, stats in one row, both buttons side by side, full width
    <article className="flex h-full w-full flex-col items-stretch gap-4 overflow-hidden rounded-[24px] bg-white px-5 py-6 shadow-[0px_10px_26px_rgba(26,38,77,0.05)] sm:gap-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:gap-10 lg:px-10 lg:py-9">
      <div className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-[22px]">
        <h3 className="break-words text-[22px] font-bold leading-[28px] text-[#141433] sm:text-[24px] sm:leading-[34px] lg:text-[28px]">
          <Link href={detailsHref} className="hover:text-[#1F3FBF]">
            {title}
          </Link>
        </h3>
        <p className="max-w-[520px] break-words text-[14px] leading-[19px] text-[#6B7280] sm:text-[15px] lg:text-[16px]">
          {description}
        </p>

        <div className="flex flex-wrap items-start gap-x-5 gap-y-3 sm:gap-x-8 sm:gap-y-4 lg:gap-x-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex min-w-0 max-w-full flex-col gap-1 sm:min-w-[90px]">
              <p className="break-words text-[17px] font-bold leading-[22px] text-[#1F3FBF] sm:text-[22px] sm:leading-[31px] lg:text-[26px]">
                {stat.value}
              </p>
              <p className="break-words text-[12px] leading-4 text-[#6B7280] sm:text-[14px]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
          <Link
            href={detailsHref}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#2F6BF0] px-3 py-2 text-center text-[14px] font-semibold leading-[18px] text-white hover:bg-[#265ad1] sm:px-7 sm:text-[15px]"
          >
            {getLocalizedText(product.primaryCta, lang)}
          </Link>
          <Link
            href={product.secondaryHref || "#"}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#E9ECF2] px-3 py-2 text-center text-[14px] font-semibold leading-[18px] text-[#141433] hover:bg-[#dde1ea] sm:px-7 sm:text-[15px]"
          >
            {getLocalizedText(product.secondaryCta, lang)}
          </Link>
        </div>
      </div>

      <Link
        href={detailsHref}
        className="relative order-first mx-auto h-[150px] w-full max-w-[348px] shrink-0 sm:h-[218px] lg:order-none lg:mx-0"
      >
        <Image
          src={getMediaUrl(product.image)}
          alt={title}
          fill
          unoptimized
          className="object-contain"
          sizes="348px"
        />
      </Link>
    </article>
  );
}
