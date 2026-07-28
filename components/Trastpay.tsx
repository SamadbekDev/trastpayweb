"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { InstantCardConfig, MobileAppConfig } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";
import i18n from "@/i18n";

interface TrastpayProps {
  instantCardConfig?: InstantCardConfig;
  mobileAppConfig?: MobileAppConfig;
}

export default function Trastpay({ instantCardConfig, mobileAppConfig }: TrastpayProps) {
  const currentLang = i18n.language?.split("-")[0].toLowerCase() || "ru";

  const cardTitle = getLocalizedText(instantCardConfig?.title, currentLang) || "Моментальная карта Trastpay";
  const cardSubtitle = getLocalizedText(instantCardConfig?.subtitle, currentLang) || "Заказ карты доступен в приложении Trastpay";
  const cardImage = getMediaUrl(instantCardConfig?.image, "/images/trastpay/moment.png");

  const features = instantCardConfig?.features || [
    {
      id: "feat-1",
      title: { ru: "Удобно пополнять и выводить", uz: "Qulay to'ldirish va yechish", en: "Convenient top-up and withdrawal" },
      description: { ru: "Пополняйте вклад с карты мгновенно и без комиссии", uz: "Komissiyasiz zumda to'ldiring", en: "Instant fee-free top up" },
    },
  ];

  const appTitle = getLocalizedText(mobileAppConfig?.title, currentLang) || "Мобильное приложение TrastPay";
  const promoText = getLocalizedText(mobileAppConfig?.promoText, currentLang) || "Скачай сегодня и получи на баланс 50 000 сум";
  const appBgColor = mobileAppConfig?.backgroundColor || "#E8EEF5";
  const appIcon = getMediaUrl(mobileAppConfig?.icon, "/images/trastpay/trastpay_logo.svg");
  const androidHref = mobileAppConfig?.androidHref || "https://play.google.com/store/apps/details?id=trastpay.uz&hl=ru";
  const iosHref = mobileAppConfig?.iosHref || "https://apps.apple.com/uz/app/trastpay/id6443658536";
  const mockups = mobileAppConfig?.mockups || [
    "/images/trastpay/phone_1.svg",
    "/images/trastpay/phone_2.svg",
  ];

  return (
    <section
      id="trastpay"
      className="mx-auto bg-[#F6F7F8] relative overflow-hidden mt-[52px]"
    >
      <div className="flex flex-col gap-[24px] items-center mt-[76px]">
        <h1 className="text-[48px] text-[#000000CC] font-bold leading-[48px]">
          {cardTitle}
        </h1>
        {cardSubtitle && (
          <p className="text-[#000000CC] text-[14.6px] font-normal">
            {cardSubtitle}
          </p>
        )}
      </div>

      <div className="my-[24px] flex justify-center gap-[48px]">
        <div className="max-w-[720px] w-full object-cover">
          <Image
            className="rounded-[24px]"
            src={cardImage}
            alt="Instant Card"
            width={720}
            height={560}
          />
        </div>
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
      </div>

      <div
        className="relative my-[24px] max-w-[1104px] w-full mx-auto p-[48px] rounded-[24px] overflow-hidden flex"
        style={{ backgroundColor: appBgColor }}
      >
        <div className="max-w-[428px] max-h-[412px] flex flex-col">
          <div className="mb-[70px]">
            <Image
              src={appIcon}
              alt="App Logo"
              width={120}
              height={120}
            />
          </div>
          <div className="mb-[40px] flex flex-col gap-[12px]">
            <h1 className="text-[31.1px] text-[#333333] font-medium">{appTitle}</h1>
            <p className="text-[17px] text-[#333333] font-medium">{promoText}</p>
          </div>
          <div className="flex gap-[12px]">
            <Link href={androidHref} target="_blank">
              <Image
                src="/images/trastpay/android.svg"
                alt="android"
                width={120}
                height={44}
              />
            </Link>
            <Link href={iosHref} target="_blank">
              <Image
                src="/images/trastpay/ios.svg"
                alt="ios"
                width={120}
                height={44}
              />
            </Link>
          </div>
        </div>
        <div className="flex absolute bottom-0 right-13 gap-[14px]">
          {mockups.map((mockup, idx) => (
            <Image
              key={idx}
              src={getMediaUrl(mockup, "/images/trastpay/phone_1.svg")}
              alt={`Phone Mockup ${idx + 1}`}
              width={236}
              height={560}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
