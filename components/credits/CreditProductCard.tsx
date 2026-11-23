"use client";

import { useState } from "react";
import Image from "@/components/ui/SkeletonImage";
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

  // below lg (phones / tablets): picture first, stats in one row, both buttons side by side, full width
  return (
    <article className="box-border flex w-full flex-col items-stretch gap-4 overflow-hidden rounded-[20px] border border-[#E2E8F2] bg-white px-5 py-6 shadow-[0px_8px_28px_rgba(15,33,71,0.08)] sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-10 lg:py-8">
      <div className="flex min-w-0 flex-1 flex-col items-stretch gap-4 sm:gap-5 lg:items-start">
        <h3 className="break-words text-[21px] font-bold leading-[1.2] text-[#0F1F3D] sm:text-[27px]">
          {text(product.title)}
        </h3>
        <p className="break-words text-[14px] font-normal leading-[1.4] text-[#5B6B85] sm:text-[16px]">
          {text(product.description)}
        </p>

        <div className="flex flex-wrap items-start gap-x-5 gap-y-3 sm:gap-x-12 sm:gap-y-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex min-w-0 max-w-full flex-col items-start gap-[3px]">
              <p
                className="break-words text-[16px] font-bold leading-[20px] sm:text-[24px] sm:leading-[29px]"
                style={{ color: theme.accent }}
              >
                {stat.value}
              </p>
              <p className="break-words text-[12px] font-normal leading-4 text-[#5B6B85] sm:text-[14px]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-start sm:gap-3">
          <Link
            href={`/kredity/${product.id}`}
            className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] px-3 py-3 text-center text-[14px] font-semibold leading-[18px] text-white sm:px-[26px] sm:py-[14px] sm:text-[15px]"
            style={{ backgroundColor: theme.accent }}
          >
            {primaryCta}
          </Link>
          <Link
            href={`/kredity/${product.id}#zayavka`}
            className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] bg-[#EEF1F6] px-3 py-3 text-center text-[14px] font-semibold leading-[18px] text-[#0F1F3D] sm:px-[26px] sm:py-[14px] sm:text-[15px]"
          >
            {secondaryCta}
          </Link>
        </div>
      </div>

      <div
        className="relative order-first mx-auto h-[170px] w-full max-w-[348px] shrink-0 overflow-hidden rounded-2xl sm:h-[218px] lg:order-none lg:mx-0"
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
            // contain: the designer's pictures are cut-outs (podiums, buildings) — cover cut their tops off
            className="object-contain"
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
