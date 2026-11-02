"use client";

import Image from "next/image";
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
    <article className="flex h-full w-full flex-col items-stretch gap-6 rounded-[24px] bg-white px-6 py-8 shadow-[0px_10px_26px_rgba(26,38,77,0.05)] sm:px-8 lg:flex-row lg:items-center lg:gap-10 lg:px-10 lg:py-9">
      <div className="flex min-w-0 flex-1 flex-col gap-[22px]">
        <h3 className="text-[24px] font-bold leading-[34px] text-[#141433] lg:text-[28px]">
          <Link href={detailsHref} className="hover:text-[#1F3FBF]">
            {title}
          </Link>
        </h3>
        <p className="max-w-[520px] text-[15px] leading-[19px] text-[#6B7280] lg:text-[16px]">
          {description}
        </p>

        <div className="flex flex-wrap items-start gap-x-8 gap-y-4 lg:gap-x-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex min-w-[90px] flex-col gap-1">
              <p className="text-[22px] font-bold leading-[31px] text-[#1F3FBF] lg:text-[26px]">
                {stat.value}
              </p>
              <p className="text-[14px] leading-4 text-[#6B7280]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={detailsHref}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#2F6BF0] px-7 text-[15px] font-semibold leading-[18px] text-white hover:bg-[#265ad1]"
          >
            {getLocalizedText(product.primaryCta, lang)}
          </Link>
          <Link
            href={product.secondaryHref || "#"}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#E9ECF2] px-7 text-[15px] font-semibold leading-[18px] text-[#141433] hover:bg-[#dde1ea]"
          >
            {getLocalizedText(product.secondaryCta, lang)}
          </Link>
        </div>
      </div>

      <Link
        href={detailsHref}
        className="relative mx-auto h-[180px] w-full max-w-[348px] shrink-0 sm:h-[218px] lg:mx-0"
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
