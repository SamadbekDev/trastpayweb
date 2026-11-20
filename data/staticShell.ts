import { FooterConfig, HeaderConfig, Language } from "@/types/pageConfig";

export function getDefaultHeaderConfig(lang: Language = "ru"): HeaderConfig {
  const isUz = lang === "uz";
  const isEn = lang === "en";
  return {
    logo: "/logo.svg",
    logoText: "TRASTBANK",
    navItems: [
      { id: "private", label: isUz ? "Jismoniy shaxslarga" : isEn ? "Private Clients" : "Частным клиентам", href: "/" },
      { id: "corporate", label: isUz ? "Korporativ mijozlarga" : isEn ? "Corporate Clients" : "Корпоративным клиентам", href: "/biznes" },
      { id: "investors", label: isUz ? "Aksiyador va investorlarga" : isEn ? "Shareholders & Investors" : "Акционерам и инвесторам", href: "/aktsioneram" },
      { id: "about", label: isUz ? "Bank haqida" : isEn ? "About Bank" : "О банке", href: "/o-banke" },
    ],
    utilityLinks: [
      { id: "phone", label: "1287", href: "tel:1287" },
      { id: "branches", label: isUz ? "Filiallar" : isEn ? "Branches" : "Филиалы", href: "/filialy" },
    ],
    loginButtonText: isUz ? "Kirish" : isEn ? "Sign in" : "Войти",
    menuButtonText: isUz ? "Menyu" : isEn ? "Menu" : "Меню",
    chips: [
      { id: "products", label: isUz ? "Mahsulotlar" : isEn ? "Products" : "Продукты" },
      { id: "tariffs", label: isUz ? "Tariflar" : isEn ? "Tariffs" : "Тарифы" },
    ],
  };
}

export function getDefaultFooterConfig(lang: Language = "ru"): FooterConfig {
  const isUz = lang === "uz";
  const isEn = lang === "en";
  const t = (ru: string, uz: string, en: string) =>
    isUz ? uz : isEn ? en : ru;
  return {
    phones: [
      {
        id: "call-center",
        number: "1287",
        note: t(
          "Единый колл-центр ЧАБ «Трастбанк»",
          "«Trastbank» XAB yagona aloqa markazi",
          "Trastbank Unified Call Center"
        ),
      },
      {
        id: "office",
        number: "+998 78 140-00-88",
        note: t(
          "Головной офис: г. Ташкент, ул. Навои, 7",
          "Bosh ofis: Toshkent sh., Navoiy ko‘chasi, 7",
          "Head Office: 7 Navoi St., Tashkent"
        ),
      },
      {
        id: "helpline",
        number: "+998 71 207-36-45",
        note: t(
          "Телефон доверия (Пн–Пт 09:00–18:00)",
          "Ishonch telefoni (Du–Ju 09:00–18:00)",
          "Helpline (Mon–Fri 09:00–18:00)"
        ),
      },
    ],
    socialLabel: t("Мы в социальных сетях", "Biz ijtimoiy tarmoqlarda", "Follow us"),
    social: [
      { id: "tg", label: "Telegram", href: "https://t.me/trustbankuz" },
      { id: "ig", label: "Instagram", href: "https://instagram.com/trustbank.uz" },
      { id: "fb", label: "Facebook", href: "https://facebook.com/trustbank.uz" },
      { id: "yt", label: "YouTube", href: "https://youtube.com" },
    ],
    columns: [
      {
        id: "col-private",
        title: t("Частным клиентам", "Jismoniy shaxslarga", "Private Clients"),
        links: [
          { id: "f-cards", label: t("Пластиковые карты", "Plastik kartalar", "Payment Cards"), href: "/karty" },
          { id: "f-credits", label: t("Кредитование", "Kreditlash", "Loans"), href: "/kredity" },
          { id: "f-deposits", label: t("Вклады", "Omonatlar", "Deposits"), href: "/vklady" },
          { id: "f-transfers", label: t("Денежные переводы", "Pul o‘tkazmalari", "Money Transfers"), href: "/perevody" },
          { id: "f-currency", label: t("Курсы валют", "Valyuta kurslari", "Exchange Rates"), href: "/valyuta" },
          { id: "f-zayavki", label: t("Онлайн-заявки", "Onlayn arizalar", "Online Applications"), href: "/zayavki" },
        ],
      },
      {
        id: "col-business",
        title: t("Бизнесу и банку", "Biznes va bank", "Business & Bank"),
        links: [
          { id: "f-biz", label: t("Корпоративным клиентам", "Korporativ mijozlarga", "Corporate Clients"), href: "/biznes" },
          { id: "f-tariffs", label: t("Тарифы и РКО", "Tariflar va HKK", "Tariffs & Cash Services"), href: "/tarify" },
          { id: "f-services", label: t("Сервисы и ДБО", "Xizmatlar va masofaviy bank", "Digital Services"), href: "/servisy" },
          { id: "f-about", label: t("О банке", "Bank haqida", "About Bank"), href: "/o-banke" },
          { id: "f-investors", label: t("Акционерам и инвесторам", "Aksiyador va investorlarga", "Shareholders & Investors"), href: "/aktsioneram" },
          { id: "f-press", label: t("Пресс-центр и имущество", "Matbuot markazi va mulklar", "Press Center & Real Estate"), href: "/press-tsentr" },
          { id: "f-fin", label: t("Финансовым институтам", "Moliyaviy tashkilotlarga", "Financial Institutions"), href: "/finansovym-institutam" },
          { id: "f-docs", label: t("Законодательство и данные", "Bank qonunchiligi", "Legislation & Open Data"), href: "/dokumenty" },
          { id: "f-blanks", label: t("Бланки и договоры", "Blankalar va shartnomalar", "Forms & Templates"), href: "/blanki" },
          { id: "f-appeals", label: t("Обращения граждан", "Fuqarolar murojaatlari", "Citizens' Appeals"), href: "/obrashcheniya" },
          { id: "f-contacts", label: t("Контакты и карта сайта", "Aloqa va sayt xaritasi", "Contacts & Sitemap"), href: "/karta-sajta" },
        ],
      },
    ],
    mobileTitle: t("Мобильное приложение Trastpay", "Trastpay mobil ilovasi", "Trastpay Mobile App"),
    qr: [
      {
        id: "qr-app",
        label: t("Скачать Trastpay для iOS и Android", "iOS va Android uchun Trastpay", "Download Trastpay for iOS & Android"),
        url: "https://trustbank.uz/uz/services/internet-banking/trustpay/",
      },
    ],
    copyright: t(
      "1994 – 2026 © ЧАБ «ТРАСТБАНК». Все права защищены.",
      "1994 – 2026 © «TRASTBANK» XAB. Barcha huquqlar himoyalangan.",
      "1994 – 2026 © PJSB «TRASTBANK». All rights reserved."
    ),
    license: t(
      "Лицензия Центрального банка Республики Узбекистан на проведение банковских операций № 44 от 21 октября 2017 года. ИНН: 201055090, МФО: 00491.",
      "O‘zbekiston Respublikasi Markaziy bankining 2017-yil 21-oktabrdagi 44-sonli bank operatsiyalarini amalga oshirish litsenziyasi. STIR: 201055090, MFO: 00491.",
      "Banking License No. 44 issued by the Central Bank of Uzbekistan on October 21, 2017. TIN: 201055090, MFO: 00491."
    ),
  };
}

export const DEFAULT_HEADER_CONFIG: HeaderConfig = getDefaultHeaderConfig("ru");
export const DEFAULT_FOOTER_CONFIG: FooterConfig = getDefaultFooterConfig("ru");
