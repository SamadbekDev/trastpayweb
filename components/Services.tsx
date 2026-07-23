import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";

const blocks = [
  {
    id: 1,
    title: "Отделения банка и банкоматы",
    description: "Найдите ближайшие к вам отделения и банкоматы",
    img: "/images/services/trustbank_loc.svg",
  },
  {
    id: 2,
    title: "Платежи и переводы",
    description: "Оплачивайте и переводите деньги без комиссии",
    img: "/images/services/p2p.svg",
  },
  {
    id: 3,
    title: "Купить или продать недвижимость",
    description: "Сделка под ключ, быстро и безопасно",
    img: "/images/services/trustsbank_cursor.svg",
  },
];

const currencies = [
  {
    code: "USD",
    name: "Доллар США (USD)",
    flag: "/images/flags/usd.svg",
    sell: "70",
    buy: "73,7",
  },
  {
    code: "EUR",
    name: "Евро (EUR)",
    flag: "/images/flags/eur.svg",
    sell: "88",
    buy: "89,8",
  },
  {
    code: "CNY",
    name: "Китайский юань (CNY)",
    flag: "/images/flags/cny.svg",
    sell: "10,7",
    buy: "11,05",
  },
];

export default function Services() {
  return (
    <section className="container mx-auto w-full mt-[72px] px-4 md:px-0">
      <h1 className="text-center text-[40px] font-bold">Сервисы</h1>
      <div className="flex justify-center items-stretch flex-col md:flex-row gap-[24px] mt-[40px]">
        <div className="max-w-[558px] w-full bg-[#F3F4F5] rounded-[32px] p-8 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#030306E0] text-[28px] font-bold">
                Курсы валют
              </h2>
              <button className="flex items-center bg-[#212124] rounded-[99px] text-white py-1.5 px-3.5 text-sm gap-[6px] hover:bg-[#323236] transition">
                Наличные <ChevronDown size={16} />
              </button>
            </div>

            <div className="grid grid-cols-[1fr_80px_80px] text-[14px] text-[#03030680] mb-2">
              <span className="text-[#0404138C] text-[13.9px] text-left">
                Валюта
              </span>
              <span className="text-[#0404138C] text-[13.9px] text-right">
                Продать
              </span>
              <span className="text-[#0404138C] text-[13.9px] text-right">
                Купить
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {currencies.map((curr) => (
                <div
                  key={curr.code}
                  className="grid grid-cols-[1fr_80px_80px] items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={curr.flag}
                        alt={curr.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="font-normal text-[#030306E0] text-[16px]">
                        {curr.code}
                      </span>
                      <span className="text-[12px] text-[#0404138C font-normal]">
                        {curr.name}
                      </span>
                    </div>
                  </div>
                  <span className="text-right font-medium text-[#030306E0] text-[16px]">
                    {curr.sell}
                  </span>
                  <span className="text-right font-medium text-[#030306E0] text-[16px]">
                    {curr.buy}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <a
              href="#"
              className="inline-flex items-center gap-1 text-[18px] font-medium text-[#0303069D] hover:opacity-80 transition"
            >
              Больше валют <ChevronRight size={20} />
            </a>
            <p className="text-[13.9px] text-[#0303069D] leading-[20px] max-w-[494px]">
              Информация о курсах обмена иностранных валют является справочной и
              может меняться в течение дня. Точную информацию о курсах можно
              узнать в интернет-банке. Список отделений доступен{" "}
              <a href="#" className="underline hover:text-black">
                по ссылке
              </a>
            </p>
          </div>
        </div>

        <div className="grid grid-rows-3 max-w-[558px] w-full gap-[25px]">
          {blocks.map((item) => (
            <div
              key={item.id}
              className="flex justify-between bg-[#F3F4F5] rounded-[32px] p-8"
            >
              <div className="flex flex-col gap-[8px]">
                <h3 className="text-[22px] font-bold leading-[26px] text-[#030306E0]">
                  {item.title}
                </h3>
                <p className="text-[#0303069D] text-[15.6px]">
                  {item.description}
                </p>
              </div>

              <div className="relative w-full aspect-square max-w-[58px]">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 58px) 100vw, 20vw"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
