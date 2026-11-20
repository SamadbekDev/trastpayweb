"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CreditGroup, CreditProduct } from "@/types/credits";
import { I18nText } from "@/types/pageConfig";
import { getMediaUrl } from "@/utils/mediaHelper";
import { creditProductFallback } from "@/utils/figmaAssets";
import CreditGlyph from "./CreditGlyph";
import { creditProductImage } from "./productImages";
import { useCreditText } from "./text";

interface CreditProductCardProps {
  product: CreditProduct;
  theme: CreditGroup;
  statLabels: { rate: I18nText; amount: I18nText; term: I18nText };
  primaryCta: string;
  secondaryCta: string;
}

export default function CreditProductCard({
  product,
  theme,
  statLabels,
  primaryCta,
  secondaryCta,
}: CreditProductCardProps) {
  const text = useCreditText();
  // CMS image; the Figma artwork replaces it when the file cannot be loaded
  const [failed, setFailed] = useState(false);
  const fallback = creditProductFallback(product.id);
  const image = failed ? fallback : creditProductImage(product);
  const stats = [
    { value: text(product.rate), label: text(statLabels.rate) },
    { value: text(product.amount), label: text(statLabels.amount) },
    { value: text(product.term), label: text(statLabels.term) },
  ];

  return (
    <article className="box-border flex w-full flex-col items-stretch gap-6 rounded-[20px] border border-[#E2E8F2] bg-white px-5 py-6 shadow-[0px_8px_28px_rgba(15,33,71,0.08)] sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-10 lg:py-8">
      <div className="flex min-w-0 flex-1 flex-col items-start gap-5">
        <h3 className="text-[22px] font-bold leading-[1.2] text-[#0F1F3D] sm:text-[27px]">
          {text(product.title)}
        </h3>
        <p className="text-[16px] font-normal leading-[1.4] text-[#5B6B85]">
          {text(product.description)}
        </p>

        <div className="flex flex-wrap items-start gap-x-8 gap-y-4 sm:gap-x-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-start gap-[3px]">
              <p
                className="text-[22px] font-bold leading-[29px] sm:text-[24px]"
                style={{ color: theme.accent }}
              >
                {stat.value}
              </p>
              <p className="text-[14px] font-normal leading-4 text-[#5B6B85]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-start gap-3">
          <Link
            href={`/kredity/${product.id}`}
            className="inline-flex items-center rounded-[10px] px-[26px] py-[14px] text-[15px] font-semibold leading-[18px] text-white"
            style={{ backgroundColor: theme.accent }}
          >
            {primaryCta}
          </Link>
          <Link
            href={`/kredity/${product.id}#zayavka`}
            className="inline-flex items-center rounded-[10px] bg-[#EEF1F6] px-[26px] py-[14px] text-[15px] font-semibold leading-[18px] text-[#0F1F3D]"
          >
            {secondaryCta}
          </Link>
        </div>
      </div>

      <div
        className="relative mx-auto h-[180px] w-full max-w-[348px] shrink-0 overflow-hidden rounded-2xl sm:h-[218px] lg:mx-0"
        style={image ? undefined : { background: theme.gradient }}
      >
        {image ? (
          <Image
            key={image}
            src={getMediaUrl(image)}
            alt=""
            onError={() => {
              if (!failed && fallback) setFailed(true);
            }}
            fill
            unoptimized
            className="object-cover"
            sizes="348px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <CreditGlyph name={theme.icon} />
          </div>
        )}
      </div>
    </article>
  );
}
