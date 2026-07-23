import React from "react";
import Image from "next/image";
import Link from "next/link";

const infoBlocks = [
  {
    id: 1,
    title: "Удобно пополнять и выводить",
    description:
      "Пополняйте вклад с карты и получайте проценты на нее. Мгновенно и без комиссии",
  },
  {
    id: 2,
    title: "Бесплатное обслуживание",
    description: "Для действующих вкладчиков",
  },
  {
    id: 3,
    title: "Помощь в управлении вкладом",
    description:
      "Следите за доходностью в приложении и личном кабинете, задавайте любые вопросы в чате 24/7",
  },
];

export default function Trastpay() {
  return (
    <section
      id="trastpay"
      className="mx-auto bg-[#F6F7F8] relative overflow-hidden mt-[52px]"
    >
      <div className="flex flex-col gap-[24px] items-center mt-[76px]">
        <h1 className="text-[48px] text-[#000000CC] font-bold leading-[48px]">
          Моментальная карта Trastpay
        </h1>
        <p className="text-[#000000CC] text-[14.6px] font-normal">
          Заказ карты доступно в приложении Trastpay
        </p>
      </div>

      <div className="my-[24px] flex justify-center gap-[48px]">
        <div className="max-w-[720px] w-full object-cover">
          <Image
            className="rounded-[24px]"
            src={"/images/trastpay/moment.png"}
            alt="moment"
            width={720}
            height={560}
          />
        </div>
        <div className="max-w-[336px] w-full">
          {infoBlocks.map((info) => (
            <div key={info.id} className="mt-[32px] flex flex-col gap-[12px]">
              <h1 className="text-[21px] text-[#000000CC] font-medium">
                {info.title}
              </h1>
              <p className="text-[15px] text-[#000000CC] font-normal">
                {info.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative my-[24px] bg-[#E8EEF8] max-w-[1104px] w-full mx-auto p-[48px] rounded-[24px] overflow-hidden flex">
        <div className="max-w-[428px] max-h-[412px] flex flex-col">
          <div className="mb-[70px]">
            <Image
              src={"/images/trastpay/trastpay_logo.svg"}
              alt="trastpay_logo"
              width={120}
              height={120}
            />
          </div>
          <div className="mb-[40px] flex flex-col gap-[12px]">
            <h1 className="text-[31.1px] text-[#333333] font-medium">Мобильное приложение TrastPay</h1>
            <p className="text-[17px] text-[#333333] font-medium">Скачай сегодня и получи на баланс 50 000 сум</p>
          </div>
          <div className="flex gap-[12px]">
            <Link
              href="https://play.google.com/store/apps/details?id=trastpay.uz&hl=ru"
              target="_blank"
            >
              <Image
                src="/images/trastpay/android.svg"
                alt="android"
                width={120}
                height={44}
              />
            </Link>
            <Link
              href="https://apps.apple.com/uz/app/trastpay/id6443658536"
              target="_blank"
            >
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
          <Image 
            src="/images/trastpay/phone_1.svg"
            alt="phone_1"
            width={236}
            height={560}
          />
          <Image 
            src="/images/trastpay/phone_2.svg"
            alt="phone_1"
            width={236}
            height={560}
          />
        </div>
      </div>
    </section>
  );
}
