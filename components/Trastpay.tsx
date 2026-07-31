"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { InstantCardConfig, MobileAppConfig, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

interface TrastpayProps {
  instantCardConfig?: InstantCardConfig;
  mobileAppConfig?: MobileAppConfig;
}

export default function Trastpay({ instantCardConfig, mobileAppConfig }: TrastpayProps) {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const cardTitle = getLocalizedText(instantCardConfig?.title, currentLang);
  const cardSubtitle = getLocalizedText(instantCardConfig?.subtitle, currentLang);
  const cardImage = instantCardConfig?.image ? getMediaUrl(instantCardConfig.image) : "";

  const features = instantCardConfig?.features || [];

  const appTitle = getLocalizedText(mobileAppConfig?.title, currentLang);
  const promoText = getLocalizedText(mobileAppConfig?.promoText, currentLang);
  const appBgColor = mobileAppConfig?.backgroundColor || "#E8EEF5";
  const appIcon = mobileAppConfig?.icon ? getMediaUrl(mobileAppConfig.icon) : "";
  const androidHref = mobileAppConfig?.androidHref || "#";
  const iosHref = mobileAppConfig?.iosHref || "#";
  const mockups = mobileAppConfig?.mockups || [];

  return (
    <section
      id="trastpay"
      className="mx-auto bg-[#F6F7F8] relative overflow-hidden mt-[52px]"
    >
      {(cardTitle || cardImage || features.length > 0) && (
        <>
          <div className="flex flex-col gap-[24px] items-center mt-[76px]">
            {cardTitle && (
              <h1 className="text-[48px] text-[#000000CC] font-bold leading-[48px]">
                {cardTitle}
              </h1>
            )}
            {cardSubtitle && (
              <p className="text-[#000000CC] text-[14.6px] font-normal">
                {cardSubtitle}
              </p>
            )}
          </div>

          <div className="my-[24px] flex justify-center gap-[48px]">
            {cardImage && (
              <div className="max-w-[720px] w-full object-cover">
                <Image
                  className="rounded-[24px]"
                  src={cardImage}
                  alt="Instant Card"
                  width={720}
                  height={560}
                  unoptimized
                />
              </div>
            )}
            {features.length > 0 && (
              <div className="max-w-[336px] w-full">
                {features.map((info) => {
                  const fTitle = getLocalizedText(info.title, currentLang);
                  const fDesc = getLocalizedText(info.description, currentLang);

                  return (
                    <div key={info.id} className="mt-[32px] flex flex-col gap-[12px]">
                      {fTitle && (
                        <h1 className="text-[21px] text-[#000000CC] font-medium">
                          {fTitle}
                        </h1>
                      )}
                      {fDesc && (
                        <p className="text-[15px] text-[#000000CC] font-normal">
                          {fDesc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {mobileAppConfig && (
        <div
          className="relative my-[24px] max-w-[1104px] w-full mx-auto p-[48px] rounded-[24px] overflow-hidden flex"
          style={{ backgroundColor: appBgColor }}
        >
          <div className="max-w-[428px] max-h-[412px] flex flex-col">
            {appIcon && (
              <div className="mb-[70px]">
                <Image
                  src={appIcon}
                  alt="App Logo"
                  width={120}
                  height={120}
                  unoptimized
                />
              </div>
            )}
            <div className="mb-[40px] flex flex-col gap-[12px]">
              {appTitle && <h1 className="text-[31.1px] text-[#333333] font-medium">{appTitle}</h1>}
              {promoText && <p className="text-[17px] text-[#333333] font-medium">{promoText}</p>}
            </div>
            <div className="flex gap-[12px]">
              <Link href={androidHref} target="_blank">
                <Image
                  src="/images/trastpay/android.svg"
                  alt="android"
                  width={120}
                  height={44}
                  unoptimized
                />
              </Link>
              <Link href={iosHref} target="_blank">
                <Image
                  src="/images/trastpay/ios.svg"
                  alt="ios"
                  width={120}
                  height={44}
                  unoptimized
                />
              </Link>
            </div>
          </div>
          {mockups.length > 0 && (
            <div className="flex absolute bottom-0 right-13 gap-[14px]">
              {mockups.map((mockup, idx) => (
                <Image
                  key={idx}
                  src={getMediaUrl(mockup)}
                  alt={`Phone Mockup ${idx + 1}`}
                  width={236}
                  height={560}
                  unoptimized
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
