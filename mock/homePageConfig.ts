import { HomePageConfig } from "@/types/pageConfig";

export const defaultHomePageConfig: HomePageConfig = {
  header: {
    logo: "/logo.svg",
    logoText: "TRASTBANK",
    navItems: [
      { id: "nav-1", label: "ФИЗИЧЕСКИМ ЛИЦАМ", href: "#" },
      { id: "nav-2", label: "БИЗНЕСУ", href: "#" },
      { id: "nav-3", label: "АКЦИОНЕРАМ И ИНВЕСТОРАМ", href: "#" },
      { id: "nav-4", label: "ЕЩЕ", href: "#" },
    ],
    utilityLinks: [
      { id: "util-1", label: "КУРС ВАЛЮТ", href: "#rates" },
      { id: "util-2", label: "ФИЛИАЛЫ", href: "#branches" },
    ],
    loginButtonText: "Войти",
    language: "RU",
    menuButtonText: "Меню",
    secondaryNav: [
      { id: "sec-1", label: "Продукты банка" },
      { id: "sec-2", label: "Тарифы" },
      { id: "sec-3", label: "Для семьи" },
      { id: "sec-4", label: "Премиум" },
    ],
  },

  hero: {
    title: {
      ru: "Откройте банковский счет бесплатно в мобильном приложении",
      uz: "Mobil ilovada bank hisobini bepul oching",
      en: "Open a bank account for free in the mobile app",
    },
    highlightText: {
      ru: "мобильном приложении",
      uz: "mobil ilovada",
      en: "mobile app",
    },
    backgroundColor: "#0a2540",
    image: "/images/hero_bank_account.svg",
    buttonText: {
      ru: "Скачать приложение",
      uz: "Ilovani yuklab olish",
      en: "Download App",
    },
    buttonHref: "#mobile-app",
  },

  productTabs: {
    title: {
      ru: "Выбирайте лучшее",
      uz: "Eng yaxshisini tanlang",
      en: "Choose the Best",
    },
    tabs: [
      {
        id: "tab-personal",
        label: {
          ru: "Для физ лиц",
          uz: "Jismoniy shaxslarga",
          en: "For Individuals",
        },
        cards: [
          {
            id: "personal-card-1",
            title: { ru: "Дебетовые карты", uz: "Debet kartalari", en: "Debit Cards" },
            subtitle: { ru: "Суперкэшбек до 20%", uz: "20% gacha keshbek", en: "Up to 20% cashback" },
            image: "/images/card_suitcase.svg",
          },
          {
            id: "personal-card-2",
            title: { ru: "Кредитные карты", uz: "Kredit kartalari", en: "Credit Cards" },
            subtitle: { ru: "Льготный период 60 дней", uz: "60 kunlik imtiyozli davr", en: "60 days grace period" },
            image: "/images/card_mouse.svg",
          },
          {
            id: "personal-card-3",
            title: { ru: "Валютные карты", uz: "Valyuta kartalari", en: "Currency Cards" },
            subtitle: { ru: "Оплата по всему миру", uz: "Dunyo bo'ylab to'lov", en: "Pay worldwide" },
            image: "/images/card_keys.svg",
          },
          {
            id: "personal-card-4",
            title: { ru: "Зарплатные карты", uz: "Ish haqi kartalari", en: "Payroll Cards" },
            subtitle: { ru: "Бонусы и привилегии", uz: "Bonuslar va imtiyozlar", en: "Bonuses & Perks" },
            image: "/images/card_stand.svg",
          },
        ],
      },
      {
        id: "tab-smb",
        label: {
          ru: "Малому бизнесу",
          uz: "Kichik biznesga",
          en: "Small Business",
        },
        cards: [
          {
            id: "smb-card-1",
            title: { ru: "Бизнес карта", uz: "Biznes karta", en: "Business Card" },
            subtitle: { ru: "Контроль расходов 24/7", uz: "Xarajatlarni nazorat qilish", en: "Expense control 24/7" },
            image: "/images/card_globe.svg",
          },
          {
            id: "smb-card-2",
            title: { ru: "Торговый эквайринг", uz: "Ekvayring", en: "Acquiring" },
            subtitle: { ru: "Прием платежей 0%", uz: "0% to'lovlarni qabul qilish", en: "0% transaction fee" },
            image: "/images/card_mouse.svg",
          },
        ],
      },
      {
        id: "tab-business",
        label: {
          ru: "Бизнесу",
          uz: "Biznesga",
          en: "Corporate",
        },
        cards: [
          {
            id: "business-card-1",
            title: { ru: "Корпоративный счет", uz: "Korporativ hisob", en: "Corporate Account" },
            subtitle: { ru: "Индивидуальный тариф", uz: "Individual tarif", en: "Custom Tariff" },
            image: "/images/card_keys.svg",
          },
        ],
      },
    ],
  },

  promoCarousel: {
    title: {
      ru: "Получайте больше с Трастбанком",
      uz: "Trastbank bilan ko'prog'iga ega bo'ling",
      en: "Get More with Trastbank",
    },
    slides: [
      {
        id: "slide-1",
        title: { ru: "Денежные переводы", uz: "Pul o'tkazmalari", en: "Money Transfers" },
        description: {
          ru: "Мгновенные международные переводы с гарантированной защитой и выдачей строго получателю.",
          uz: "Tezkor xalqaro o'tkazmalar kafolatlangan himoya bilan.",
          en: "Instant international transfers with guaranteed security.",
        },
        image: "/images/getmore/getmore_money.png",
      },
      {
        id: "slide-2",
        title: { ru: "Высокие ставки в TrastPay", uz: "TrastPay-da yuqori stavkalar", en: "High Interest in TrastPay" },
        description: {
          ru: "Растим ваши накопления в долларах и в суммах с повышенной ставкой для вклада от Трастбанка.",
          uz: "Trastbank omonatlari bilan jamg'armalaringizni ko'paytiramiz.",
          en: "Grow your UZS and USD savings with boosted deposit rates.",
        },
        image: "/images/getmore/getmore_security.png",
      },
      {
        id: "slide-3",
        title: { ru: "Приводите в Trastpay всех", uz: "Trastpay-ga barchani taklif qiling", en: "Invite Friends to Trastpay" },
        description: {
          ru: "Платим 100 000 сум за каждого, кто откроет счет и оформит карту банка.",
          uz: "Har bir taklif qilingan do'st uchun 100 000 so'm to'laymiz.",
          en: "Get 100,000 UZS for each friend who joins and gets a card.",
        },
        image: "/images/getmore/getmore_trastpay.png",
      },
    ],
  },

  calculatorTabs: {
    title: { ru: "Быстрый расчёт Вклада", uz: "Omonatni tezkor hisoblash", en: "Quick Deposit Calculator" },
    tabs: [
      { id: "calc-deposit", label: { ru: "Вклады", uz: "Omonatlar", en: "Deposits" } },
      { id: "calc-loan", label: { ru: "Расчет кредита", uz: "Kredit hisobi", en: "Loan Calculator" } },
      { id: "calc-card", label: { ru: "Заказ карты", uz: "Karta buyurtma", en: "Order Card" } },
    ],
  },

  depositSteps: {
    title: { ru: "Открыть вклад легко", uz: "Omonat ochish oson", en: "Opening deposit is easy" },
    steps: [
      { id: "step-1", number: 1, text: { ru: "Заполните онлайн-заявку — посещать банк не нужно", uz: "Onlayn ariza to'ldiring", en: "Fill online application" } },
      { id: "step-2", number: 2, text: { ru: "Бесплатно доставим договор и дебетовую карту", uz: "Shartnoma va kartani bepul yetkazamiz", en: "Free agreement delivery" } },
      { id: "step-3", number: 3, text: { ru: "Пополните вклад онлайн или наличными без комиссии", uz: "Omonatni komissiyasiz to'ldiring", en: "Top up online without fee" } },
    ],
  },

  depositCalculator: {
    offerBannerText: { ru: "Ознакомьтесь с ", uz: "Tanishib chiqing: ", en: "Check out " },
    offerBannerButtonText: { ru: "Публичной офертой", uz: "Ommaviy oferta", en: "Public Offer" },
    title: { ru: "Настройте вклад", uz: "Omonatni moslang", en: "Customize Deposit" },
    currencyLabel: { ru: "Валюта", uz: "Valyuta", en: "Currency" },
    currencyOptions: [
      { id: "cur-fx", label: { ru: "Валюта", uz: "Valyuta", en: "Currency" } },
      { id: "cur-uzs", label: { ru: "Суммы", uz: "So'm", en: "UZS" } },
    ],
    termLabel: { ru: "Срок вклада", uz: "Omonat muddati", en: "Deposit Term" },
    amountLabel: { ru: "Сумма вклада", uz: "Omonat summasi", en: "Deposit Amount" },
    replenishableLabel: { ru: "Пополняемый вклад", uz: "To'ldiriladigan omonat", en: "Replenishable Deposit" },
    rateBoxColor: "#E8F1FF",
    rateLabel: { ru: "Ставка", uz: "Stavka", en: "Rate" },
    yieldLabel: { ru: "Доходность", uz: "Daromadlilik", en: "Yield Rate" },
    endAmountLabel: { ru: "Сумма в конце срока", uz: "Muddat oxiridagi summa", en: "Sum at maturity" },
    legalText: { ru: "Заполняя форму, я принимаю условия передачи информации", uz: "Shaklni to'ldirib, rozilik bildiraman", en: "By filling form I accept conditions" },
    resultLabel: { ru: "К моменту закрытия вклада на счету будет", uz: "Omonat yopilish vaqtida hisobda bo'ladi", en: "Balance at closing" },
    resultNote: { ru: "*Примерный расчёт суммы вклада в конце срока. Точный расчёт в приложения TRASTPAY", uz: "*Taxminiy hisob. Aniq hisob TRASTPAY ilovasida", en: "*Estimated calculation. Exact sum in TRASTPAY" },
    ctaText: { ru: "ОТКРЫТЬ СРОЧНЫЙ ВКЛАД", uz: "MUDDATLI OMONAT OCHISH", en: "OPEN TERM DEPOSIT" },
  },

  services: {
    title: { ru: "Сервисы", uz: "Xizmatlar", en: "Services" },
    ratesTitle: { ru: "Курсы валют", uz: "Valyuta kurslari", en: "Exchange Rates" },
    ratesDropdownLabel: { ru: "Наличные", uz: "Naqd pul", en: "Cash" },
    moreCurrenciesText: { ru: "Больше валют", uz: "Ko'proq valyutalar", en: "More Currencies" },
    ratesDisclaimer: { ru: "Информация о курсах обмена иностранных валют является справочной", uz: "Ma'lumotlar ma'lumot uchun berilgan", en: "Rates are indicative" },
    currencies: [
      { id: "usd", code: "USD", name: { ru: "Доллар США (USD)", uz: "AQSH dollari (USD)", en: "US Dollar (USD)" }, sell: "12 650", buy: "12 720", flag: "/images/flags/usd.svg" },
      { id: "eur", code: "EUR", name: { ru: "Евро (EUR)", uz: "Yevro (EUR)", en: "Euro (EUR)" }, sell: "13 410", buy: "13 520", flag: "/images/flags/eur.svg" },
      { id: "cny", code: "CNY", name: { ru: "Китайский юань (CNY)", uz: "Xitoy yuani (CNY)", en: "Chinese Yuan (CNY)" }, sell: "1 720", buy: "1 780", flag: "/images/flags/cny.svg" },
    ],
    cards: [
      {
        id: "svc-1",
        title: { ru: "Отделения банка и банкоматы", uz: "Bank filiallari va bankomatlar", en: "Branches and ATMs" },
        description: { ru: "Найдите ближайшие к вам отделения и банкоматы", uz: "Eng yaqin filiallarni toping", en: "Find nearest branches" },
        icon: "/images/services/trustbank_loc.svg",
      },
      {
        id: "svc-2",
        title: { ru: "Платежи и переводы", uz: "To'lovlar va o'tkazmalar", en: "Payments & Transfers" },
        description: { ru: "Оплачивайте и переводите деньги без комиссии", uz: "Komissiyasiz to'lang", en: "Pay without fee" },
        icon: "/images/services/p2p.svg",
      },
      {
        id: "svc-3",
        title: { ru: "Купить или продать недвижимость", uz: "Ko'chmas mulk bitimlari", en: "Real Estate Deals" },
        description: { ru: "Сделка под ключ, быстро и безопасно", uz: "Tez va xavfsiz bitim", en: "Turnkey transaction" },
        icon: "/images/services/trustsbank_cursor.svg",
      },
    ],
  },

  instantCard: {
    title: { ru: "Моментальная карта Trastpay", uz: "Zudlik bilan Trastpay kartasi", en: "Instant Trastpay Card" },
    subtitle: { ru: "Заказ карты доступен в приложении Trastpay", uz: "Kartaga buyurtma Trastpay ilovasida", en: "Card ordering in Trastpay app" },
    image: "/images/trastpay/moment.png",
    features: [
      { id: "feat-1", title: { ru: "Удобно пополнять и выводить", uz: "Qulay to'ldirish va yechish", en: "Convenient top-up and withdrawal" }, description: { ru: "Пополняйте вклад с карты мгновенно и без комиссии", uz: "Komissiyasiz zumda to'ldiring", en: "Instant fee-free top up" } },
      { id: "feat-2", title: { ru: "Бесплатное обслуживание", uz: "Bepul xizmat ko'rsatish", en: "Free maintenance" }, description: { ru: "Для действующих вкладчиков", uz: "Amaldagi omonatchilar uchun", en: "For active deposit holders" } },
      { id: "feat-3", title: { ru: "Помощь в управлении вкладом", uz: "Boshqarishda yordam", en: "Account Management Help" }, description: { ru: "Следите за доходностью 24/7", uz: "24/7 daromadni kuzatib boring", en: "Monitor yield 24/7" } },
    ],
  },

  mobileApp: {
    title: { ru: "Мобильное приложение TrastPay", uz: "TrastPay mobil ilovasi", en: "TrastPay Mobile App" },
    promoText: { ru: "Скачай сегодня и получи на баланс 50 000 сум", uz: "Bugun yuklab oling va 50 000 so'm oling", en: "Download today and get 50,000 UZS" },
    icon: "/images/trastpay/trastpay_logo.svg",
    backgroundColor: "#E8EEF5",
    androidButtonText: { ru: "Google Play", uz: "Google Play", en: "Google Play" },
    iosButtonText: { ru: "App Store", uz: "App Store", en: "App Store" },
    androidHref: "https://play.google.com/store/apps/details?id=trastpay.uz&hl=ru",
    iosHref: "https://apps.apple.com/uz/app/trastpay/id6443658536",
    mockups: [
      "/images/trastpay/phone_1.svg",
      "/images/trastpay/phone_2.svg",
    ],
  },
};
