"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { TrastpayConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";
import i18n from "@/i18n";

interface TrastpayProps {
  config?: TrastpayConfig;
}

export default function Trastpay({ config }: TrastpayProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  if (!config) return null;

  const title = getLocalizedText(config.title, lang);
  const cta = getLocalizedText(config.ctaText, lang);
  const body = (config.paragraphs || [])
    .map((p) => getLocalizedText(p, lang))
    .filter(Boolean)
    .join(" ");

  return (
    <section id="trastpay" className="w-full bg-[#FAFAFA]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-stretch gap-6 px-4 lg:flex-row lg:gap-6 lg:px-[60px]">
        <div className="relative min-h-[320px] w-full overflow-hidden rounded-[32px] lg:h-[515px] lg:w-[848px] lg:min-h-0">
          {config.image && (
            <Image
              src={getMediaUrl(config.image)}
              alt={title}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 848px"
            />
          )}
        </div>

        <div className="flex w-full flex-col justify-start rounded-[32px] bg-[#F6F6F8] p-8 lg:h-[515px] lg:w-[400px] lg:shrink-0">
          <div className="flex h-full flex-col gap-8">
            <h2 className="text-[26px] font-bold leading-[31px] text-black">{title}</h2>
            {body && (
              <p className="flex-1 text-[16px] font-normal leading-5 text-black">{body}</p>
            )}
            {cta && (
              <Link
                href={config.ctaHref || "#"}
                className="mt-auto inline-flex h-14 w-fit items-center justify-center rounded-xl bg-[#0066F9] px-8 text-[14px] font-semibold leading-[17px] text-white hover:bg-[#0055d4]"
              >
                {cta}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
