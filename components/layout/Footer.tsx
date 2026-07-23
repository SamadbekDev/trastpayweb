import Link from "next/link";

const infoPills = [
  { id: 1, text: "О Т-Банке", link: "#" },
  { id: 2, text: "Новости", link: "#" },
  { id: 3, text: "Блог", link: "#" },
  { id: 4, text: "Работа", link: "#" },
  { id: 5, text: "Точки пополнения", link: "#" },
  { id: 6, text: "Банкоматы", link: "#" },
  { id: 7, text: "Курсы валют", link: "#" },
  { id: 8, text: "Контакты", link: "#" },
  { id: 9, text: "Безопасность", link: "#" },
  { id: 10, text: "Для инвесторов", link: "#" },
];

const servicesLinks = [
  { id: 1, text: "Восстановите свой КБМ", link: "#" },
  { id: 2, text: "Рейтинг и другие показатели Т‑Страхования", link: "#" },
  { id: 3, text: "Условия акции «Бонус за покупку полиса»", link: "#" },
  { id: 4, text: "Условия акции «Бонус за покупку ОСАГО»", link: "#" },
  { id: 5, text: "Условия акции «Дополнительная защита»", link: "#" },
  { id: 6, text: "Политика обработки персональных данных Т‑Банка", link: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#292929] pt-[32px] pb-[40px] text-[#FFFFFFB2]">
      <div className="max-w-[1104px] mx-auto px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-wrap max-w-full md:max-w-[65%] gap-[8px]">
            {infoPills.map((pill) => (
              <Link
                href={pill.link}
                key={pill.id}
                className="bg-[#000000] rounded-[16px] text-white py-[8px] px-[12px] text-[13px] hover:bg-[#1a1a1a] transition-colors"
              >
                {pill.text}
              </Link>
            ))}
          </div>

          <div className="flex items-start gap-10 text-white shrink-0">
            <div>
              <div className="font-bold text-[18px] leading-snug">
                8 800 700-55-00
              </div>
              <div className="text-[12px] text-neutral-400">
                Бесплатно для звонков
                <br />
                по России
              </div>
            </div>
            <div>
              <div className="font-bold text-[18px] leading-snug">999</div>
              <div className="text-[12px] text-neutral-400">
                Короткий
                <br />
                номер
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[6px] mt-[24px]">
          <p className="text-[10.8px] leading-[16px]">
            Акция «Бонус за покупку полиса» действует с 18.01.2024 г. —
            бессрочно.
          </p>
          <p className="text-[10.8px] leading-[16px]">
            Акция «Бонус за покупку ОСАГО» действует с 01.04.2026 по 10.05.2026.
          </p>
          <p className="text-[10.8px] leading-[16px]">
            Страховщик АО «Т‑Страхование» осуществляет выплаты за 1 день = 24
            часам при соблюдении всех условий: а) в ДТП ущерб причинен только
            транспортным средствам; б) участники ДТП застрахованы по ОСАГО; в)
            клиент направил необходимые документы и фотографии повреждений в
            мобильное приложение Т‑Банка, заключил со страховщиком соглашение о
            страховой выплате и предоставил оригиналы документов; г) выплата
            производится в безналичном порядке на счет клиента в банке в течение
            времени работы банка. АО «Т‑Страхование», ОГРН 1027739031540.
          </p>
          <p className="text-[10.8px] leading-[16px]">
            Выгода до 54% — понижающий коэффициент при расчете страховой премии
            в случае отсутствия страховых событий в предыдущем периоде КБМ
            согласно Указанию Банка России от 09.10.2025 N 7204‑У «О страховых
            тарифах по ОСАГО», максимальный размер которого (54%) достигается
            при значении КБМ, равному 0,46 (класс КБМ 13). Услуги страхования
            оказывает{" "}
            <Link href="#" className="underline hover:text-white">
              АО «Т‑Страхование»
            </Link>
            , Москва, ОГРН 1027739031540, а также партнеры{" "}
            <Link href="#" className="underline hover:text-white">
              ООО «Сравни.ру»
            </Link>{" "}
            и{" "}
            <Link href="#" className="underline hover:text-white">
              ООО «ИНСАП»
            </Link>
          </p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-[20px] text-[12px]">
          {servicesLinks.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="text-white text-[11px] leading-[13px] font-normal"
            >
              {item.text}
            </Link>
          ))}
        </div>

        <div className="w-full h-[1px] bg-[#FFFFFF1F] my-[24px]" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px]">
          <p>
            © 2006–2026, АО «ТБанк», официальный сайт, универсальная лицензия ЦБ
            РФ № 2673
          </p>

          <div className="flex items-center gap-4 text-white">
            <Link href="#" className="hover:opacity-80 transition-opacity">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </Link>

            <Link href="#" className="hover:opacity-80 transition-opacity">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15.684 0H8.316C3.724 0 0 3.724 0 8.316v7.368C0 20.276 3.724 24 8.316 24h7.368C20.276 24 24 20.276 24 15.684V8.316C24 3.724 20.276 0 15.684 0zm3.692 17.123h-1.644c-.623 0-.814-.496-1.93-1.614-1.028-1.002-1.464-1.134-1.722-1.134-.36 0-.464.103-.464.603v1.517c0 .413-.131.628-1.233.628-2.032 0-4.283-1.233-5.87-3.526-2.388-3.41-3.04-5.962-3.04-6.483 0-.258.103-.496.603-.496h1.644c.451 0 .619.206.792.688.868 2.52 2.32 4.728 2.915 4.728.223 0 .327-.103.327-.67V8.528c-.068-1.199-.696-1.299-.696-1.73 0-.206.173-.413.447-.413h2.589c.36 0 .49.19.49.619v3.313c0 .361.155.49.258.49.223 0 .412-.129.825-.542 1.285-1.442 2.199-3.666 2.199-3.666.121-.258.327-.496.773-.496h1.644c.49 0 .603.258.49.619-.206.953-2.217 3.821-2.217 3.821-.18.284-.258.413 0 .747.181.232.773.748 1.186 1.233.747.85 1.314 1.56 1.468 2.051.155.49-.077.747-.567.747z" />
              </svg>
            </Link>

            <Link href="#" className="hover:opacity-80 transition-opacity">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 13a3 3 0 110-6 3 3 0 010 6z" />
              </svg>
            </Link>

            <Link href="#" className="hover:opacity-80 transition-opacity">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-2.02 9.51c-.15.68-.55.84-1.12.52l-3.1-2.28-1.5 1.44c-.17.17-.31.31-.63.31l.22-3.17 5.76-5.2c.25-.22-.05-.34-.39-.12l-7.12 4.48-3.08-.96c-.67-.21-.68-.67.14-.99l12.04-4.64c.56-.2 1.05.14.8 1.1z" />
              </svg>
            </Link>

            <Link href="#" className="hover:opacity-80 transition-opacity">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 10.25a3.25 3.25 0 100-6.5 3.25 3.25 0 000 6.5zm0-4.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm0 6.25c-2.3 0-4.44.88-5.83 2.12a1 1 0 101.33 1.5c.98-.87 2.54-1.62 4.5-1.62s3.52.75 4.5 1.62a1 1 0 101.33-1.5c-1.39-1.24-3.53-2.12-5.83-2.12zm4.33 5.42a1 1 0 00-1.41.08L12 20.6l-2.92-3.1a1 1 0 00-1.49 1.33l3.66 3.88a1 1 0 001.5 0l3.66-3.88a1 1 0 00-.08-1.41z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
