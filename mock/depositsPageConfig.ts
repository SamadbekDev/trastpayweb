import { DepositsPageConfig } from "@/types/deposits";

const t = (ru: string, uz: string, en: string) => ({ ru, uz, en });

const ph = (w: number, h: number, text: string, bg = "dbe7ff", fg = "1f3fbf") =>
  `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(text)}`;

const rateLabel = t("Ставка, годовых", "Yillik stavka", "Annual rate");
const amountLabel = t("Сумма вклада", "Omonat summasi", "Deposit amount");
const termLabel = t("Срок", "Muddat", "Term");
const primaryCta = t("Подробнее", "Batafsil", "Details");
const secondaryCta = t("Стать клиентом", "Mijoz bo‘lish", "Become a client");

export const depositsPageConfig: DepositsPageConfig = {
  header: {
    logo: "/logo.svg",
    logoText: "TRASTBANK",
    navItems: [
      { id: "nav-1", label: "Физическим лицам", href: "/" },
      { id: "nav-2", label: "Корпоративным клиентам", href: "#" },
      { id: "nav-3", label: "Акционерам и инвесторам", href: "#" },
      { id: "nav-4", label: "Еще", href: "#" },
    ],
    becomeClientText: "Стать клиентом",
    becomeClientHref: "#",
    loginButtonText: "Войти",
    loginHref: "#",
  },

  title: t(
    "Вклады и накопительные счета",
    "Omonatlar va jamg‘arma hisoblari",
    "Deposits and savings accounts"
  ),

  tabs: [
    {
      id: "all",
      label: t("Все вклады", "Barcha omonatlar", "All deposits"),
      filter: "all",
    },
    {
      id: "sum",
      label: t("Вклады в суммах", "So‘m omonatlari", "UZS deposits"),
      filter: "sum",
    },
    {
      id: "fx",
      label: t("Валютные вклады", "Valyuta omonatlari", "FX deposits"),
      filter: "fx",
    },
    {
      id: "online",
      label: t("Онлайн вклады", "Onlayn omonatlar", "Online deposits"),
      filter: "online",
    },
  ],

  groups: [
    {
      id: "group-sum",
      category: "sum",
      title: t("Сумовые вклады", "So‘m omonatlari", "UZS deposits"),
      badge: t("6 в сумах", "6 so‘mda", "6 in UZS"),
    },
    {
      id: "group-fx",
      category: "fx",
      title: t("Валютные вклады", "Valyuta omonatlari", "FX deposits"),
      badge: t("2 в долларах", "2 dollarda", "2 in USD"),
    },
  ],

  products: [
    {
      id: "maksadli",
      category: "sum",
      title: t("Максадли", "Maqsadli", "Maksadli"),
      description: t(
        "Классический срочный вклад в отделении, максимальная ставка",
        "Bo‘limdagi klassik muddatli omonat, maksimal stavka",
        "Classic term deposit in a branch, maximum rate"
      ),
      rate: t("До 23%", "23% gacha", "Up to 23%"),
      rateLabel,
      amount: t("От 500 000 сум", "500 000 so‘mdan", "From 500,000 UZS"),
      amountLabel,
      term: t("24 мес", "24 oy", "24 mo."),
      termLabel,
      primaryCta,
      primaryHref: undefined,
      secondaryCta,
      secondaryHref: "#",
      image: ph(260, 218, "Safe+", "cfe0ff", "1a4fd6"),
    },
    {
      id: "standart",
      category: "sum",
      title: t("Стандарт", "Standart", "Standard"),
      description: t(
        "Надёжный срочный вклад с пополнением в первый год",
        "Birinchi yilda to‘ldirish mumkin bo‘lgan ishonchli muddatli omonat",
        "Reliable term deposit with top-ups in the first year"
      ),
      rate: t("До 21%", "21% gacha", "Up to 21%"),
      rateLabel,
      amount: t("От 500 000 сум", "500 000 so‘mdan", "From 500,000 UZS"),
      amountLabel,
      term: t("24 мес", "24 oy", "24 mo."),
      termLabel,
      primaryCta,
      primaryHref: undefined,
      secondaryCta,
      secondaryHref: "#",
      image: ph(260, 218, "%", "cfe0ff", "1a4fd6"),
    },
    {
      id: "universal",
      category: "sum",
      title: t("Универсал", "Universal", "Universal"),
      description: t(
        "Универсальные условия с возможностью пополнения",
        "To‘ldirish imkoniyati bilan universal shartlar",
        "Universal conditions with the possibility of replenishment"
      ),
      rate: t("До 20%", "20% gacha", "Up to 20%"),
      rateLabel,
      amount: t("От 500 000 сум", "500 000 so‘mdan", "From 500,000 UZS"),
      amountLabel,
      term: t("24 мес", "24 oy", "24 mo."),
      termLabel,
      primaryCta,
      primaryHref: undefined,
      secondaryCta,
      secondaryHref: "#",
      image: ph(260, 218, "Scarf", "d4e8d4", "2d6a4f"),
    },
    {
      id: "navruz",
      category: "sum",
      title: t("Навруз", "Navro‘z", "Navruz"),
      description: t(
        "Сезонный вклад на 13 месяцев",
        "13 oylik mavsumiy omonat",
        "Seasonal deposit for 13 months"
      ),
      rate: t("До 19%", "19% gacha", "Up to 19%"),
      rateLabel,
      amount: t("От 500 000 сум", "500 000 so‘mdan", "From 500,000 UZS"),
      amountLabel,
      term: t("13 мес", "13 oy", "13 mo."),
      termLabel,
      primaryCta,
      primaryHref: undefined,
      secondaryCta,
      secondaryHref: "#",
      image: ph(260, 218, "Wallet", "ffe0e8", "c2185b"),
    },
    {
      id: "zamin",
      category: "sum",
      title: t("Замин", "Zamin", "Zamin"),
      description: t(
        "Надёжный доход с пополнением в течение года",
        "Yil davomida to‘ldirish bilan ishonchli daromad",
        "Reliable income with top-ups throughout the year"
      ),
      rate: t("До 16%", "16% gacha", "Up to 16%"),
      rateLabel,
      amount: t("От 1 000 000 сум", "1 000 000 so‘mdan", "From 1,000,000 UZS"),
      amountLabel,
      term: t("18 мес", "18 oy", "18 mo."),
      termLabel,
      primaryCta,
      primaryHref: undefined,
      secondaryCta,
      secondaryHref: "#",
      image: ph(260, 218, "Hearts", "e8d4ff", "6b3fa0"),
    },
    {
      id: "imkon-3",
      category: "sum",
      title: t("Имкон-3", "Imkon-3", "Imkon-3"),
      description: t(
        "Короткий срочный вклад всего на 3 месяца",
        "Atigi 3 oylik qisqa muddatli omonat",
        "Short term deposit for just 3 months"
      ),
      rate: t("До 14%", "14% gacha", "Up to 14%"),
      rateLabel,
      amount: t("От 1 000 000 сум", "1 000 000 so‘mdan", "From 1,000,000 UZS"),
      amountLabel,
      term: t("3 мес", "3 oy", "3 mo."),
      termLabel,
      primaryCta,
      primaryHref: undefined,
      secondaryCta,
      secondaryHref: "#",
      image: ph(260, 218, "Bear", "fff0d6", "c47a00"),
    },
    {
      id: "kulay-sarmoya",
      category: "fx",
      title: t("Кулай сармоя", "Qulay sarmoya", "Kulay sarmoya"),
      description: t(
        "Валютный вклад в долларах США с пополнением",
        "AQSH dollaridagi to‘ldiriladigan valyuta omonati",
        "USD foreign currency deposit with top-ups"
      ),
      rate: t("До 7,5%", "7,5% gacha", "Up to 7.5%"),
      rateLabel,
      amount: t("От 500 $", "500 $ dan", "From $500"),
      amountLabel,
      term: t("18 мес", "18 oy", "18 mo."),
      termLabel,
      primaryCta,
      primaryHref: undefined,
      secondaryCta,
      secondaryHref: "#",
      image: ph(260, 218, "USD Safe", "cfe8d4", "1b5e20"),
    },
    {
      id: "istiklol",
      category: "fx",
      title: t("Истиклол", "Istiqlol", "Istiklol"),
      description: t(
        "Валютный вклад в долларах с пополнением в первые 6 мес",
        "Dastlabki 6 oyda to‘ldirish mumkin bo‘lgan dollar omonati",
        "USD deposit with top-ups in the first 6 months"
      ),
      rate: t("До 6%", "6% gacha", "Up to 6%"),
      rateLabel,
      amount: t("От 500 $", "500 $ dan", "From $500"),
      amountLabel,
      term: t("13 мес", "13 oy", "13 mo."),
      termLabel,
      primaryCta,
      primaryHref: undefined,
      secondaryCta,
      secondaryHref: "#",
      image: ph(260, 218, "USD+", "cfe0ff", "1a4fd6"),
    },
  ],

  footer: {
    phones: [
      {
        id: "ph1",
        number: "8 800 333 03 03",
        note: "Звонок по Узбекистану бесплатный",
      },
      { id: "ph2", number: "+998 78 150 01 01", note: "Телефон в Ташкенте" },
    ],
    socialLabel: "Мы в социальных сетях:",
    social: [
      { id: "fb", label: "Facebook", href: "#" },
      { id: "ig", label: "Instagram", href: "#" },
      { id: "tg", label: "Telegram", href: "#" },
      { id: "yt", label: "YouTube", href: "#" },
    ],
    columns: [
      {
        id: "col1",
        links: [
          { id: "l1", label: "О банке", href: "#" },
          { id: "l2", label: "Курсы валют и металлов", href: "/#currency" },
          { id: "l3", label: "Работа у нас", href: "#" },
          { id: "l4", label: "Пресс-центр", href: "#" },
        ],
      },
      {
        id: "col2",
        links: [
          { id: "l5", label: "Тарифы на обслуживание", href: "#" },
          { id: "l6", label: "Правила обслуживания", href: "#" },
          { id: "l7", label: "Соглашение с клиентом", href: "#" },
          { id: "l8", label: "Меры по безопасности", href: "#" },
        ],
      },
    ],
    mobileTitle: "Мобильный банк",
    qr: [
      {
        id: "qr1",
        label: "Для iOS и Android",
        image: ph(80, 80, "QR", "ffffff", "000000"),
      },
      {
        id: "qr2",
        label: "Для HarmonyOS",
        image: ph(80, 80, "QR2", "ffffff", "000000"),
      },
    ],
    copyright: "© 2026 АО «TRASTBANK»",
    license:
      "Лицензия на осуществление банковских операций Центрального банка Республики Узбекистан",
  },
};
