import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Always start in Russian (the prerendered language); components/i18n/LangBoot
// switches to the language saved in localStorage after hydration.
const getInitialLanguage = (): string => "ru";

const resources = {
  ru: {
    translation: {
      welcome: "Добро пожаловать в Трастбанк",
      depositCalc: {
        amountAtMaturity: "Сумма в конце срока",
        ratePill: "{{rate}}% годовых — при максимальном сроке и капитализации",
        youWillNeed: "Вам понадобится",
        passport: "— Паспорт или ID карта",
        amountQuestion: "Какую сумму хотите вложить?",
        termQuestion: "На какой срок хотите открыть вклад?",
        params: "Параметры вклада",
        topUp: "Пополнение вклада",
        partial: "Частичное снятие",
        alsoSuitable: "Вам также подойдёт",
        forAmountAndTerm: "по вашей сумме и сроку",
        rateAnnual: "Ставка, годовых",
        depositAmount: "Сумма вклада",
        term: "Срок",
        openDeposit: "Открыть вклад",
        details: "Подробнее",
        disclaimer: "Предварительный расчёт. Не является офертой.",
        fromAmount: "от {{amount}} {{currency}}",
        toAmount: "до {{amount}} {{currency}}",
        fromMonths: "от {{count}} месяцев",
        toMonths: "до {{count}} месяцев",
        months_one: "{{count}} месяц",
        months_few: "{{count}} месяца",
        months_many: "{{count}} месяцев",
      },
      offices: {
        offices: "Офисы",
        atms: "Банкоматы",
        search: "Поиск",
        hoursHint: "пн–пт: 09:00–17:00; сб, вс: выходной",
        openOnMap: "Открыть на карте",
        openYandexMaps: "Открыть Яндекс Карты",
      },
      creditStats: {
        amount: "Сумма кредита",
        term: "Срок кредита",
        rate: "Процентная ставка",
        downPayment: "Первоначальный взнос",
        downFrom: "от {{value}}%",
      },
      microCalc: {
        loanAmount: "Сумма займа",
        collateral: "Обеспечение",
        insurance: "Страховой полис",
        guarantor: "Поручительство",
        rate: "Ставка",
        term: "Срок",
        months: "{{count}} месяцев",
      },
      common: {
        login: "Войти",
        onlineBanking: "Онлайн банкинг",
        menu: "Меню",
        close: "Закрыть",
        searchPlaceholder: "Поиск по сайту банка",
        details: "Подробнее",
        order: "Заказать",
        submitApplication: "Оставить заявку",
        allTariffs: "Все тарифы",
      },
      nav: {
        private: "Частным клиентам",
        corporate: "Корпоративным клиентам",
        investors: "Акционерам и инвесторам",
        about: "О банке",
        branches: "Филиалы",
        products: "Продукты",
        tariffs: "Тарифы",
      },
      forms: {
        fullName: "ФИО",
        phone: "Мобильный телефон",
        email: "E-mail",
        branch: "Филиал / ОБУ банка",
        submit: "Отправить заявку",
        successTitle: "Заявка принята!",
      },
    },
  },
  uz: {
    translation: {
      welcome: "Trastbankga xush kelibsiz",
      depositCalc: {
        amountAtMaturity: "Muddat oxiridagi summa",
        ratePill: "{{rate}}% yillik — maksimal muddat va kapitallashtirishda",
        youWillNeed: "Sizga kerak bo‘ladi",
        passport: "— Pasport yoki ID-karta",
        amountQuestion: "Qancha summa kiritmoqchisiz?",
        termQuestion: "Qancha muddatga ochmoqchisiz?",
        params: "Omonat parametrlari",
        topUp: "Omonatni to‘ldirish",
        partial: "Qisman yechib olish",
        alsoSuitable: "Sizga ham mos keladi",
        forAmountAndTerm: "summangiz va muddatingiz bo‘yicha",
        rateAnnual: "Stavka, yillik",
        depositAmount: "Omonat summasi",
        term: "Muddat",
        openDeposit: "Omonat ochish",
        details: "Batafsil",
        disclaimer: "Dastlabki hisob. Oferta hisoblanmaydi.",
        fromAmount: "{{amount}} {{currency}} dan",
        toAmount: "{{amount}} {{currency}} gacha",
        fromMonths: "{{count}} oydan",
        toMonths: "{{count}} oygacha",
        months_one: "{{count}} oy",
        months_few: "{{count}} oy",
        months_many: "{{count}} oy",
      },
      offices: {
        offices: "Ofislar",
        atms: "Bankomatlar",
        search: "Qidiruv",
        hoursHint: "du–ju: 09:00–17:00; shanba, yakshanba: dam olish",
        openOnMap: "Xaritada ochish",
        openYandexMaps: "Yandex Xaritalarni ochish",
      },
      creditStats: {
        amount: "Kredit summasi",
        term: "Kredit muddati",
        rate: "Foiz stavkasi",
        downPayment: "Boshlang‘ich badal",
        downFrom: "{{value}}% dan",
      },
      microCalc: {
        loanAmount: "Qarz summasi",
        collateral: "Ta’minot",
        insurance: "Sug‘urta polisi",
        guarantor: "Kafillik",
        rate: "Stavka",
        term: "Muddat",
        months: "{{count}} oy",
      },
      common: {
        login: "Kirish",
        onlineBanking: "Onlayn banking",
        menu: "Menyu",
        close: "Yopish",
        searchPlaceholder: "Bank sayti bo‘yicha qidiruv",
        details: "Batafsil",
        order: "Buyurtma berish",
        submitApplication: "Ariza yuborish",
        allTariffs: "Barcha tariflar",
      },
      nav: {
        private: "Jismoniy shaxslarga",
        corporate: "Korporativ mijozlarga",
        investors: "Aksiyador va investorlarga",
        about: "Bank haqida",
        branches: "Filiallar",
        products: "Mahsulotlar",
        tariffs: "Tariflar",
      },
      forms: {
        fullName: "F.I.Sh.",
        phone: "Mobil telefon",
        email: "Elektron pochta",
        branch: "Bank filiali / Xizmat ko‘rsatish ofisi",
        submit: "Ariza yuborish",
        successTitle: "Arizangiz qabul qilindi!",
      },
    },
  },
  en: {
    translation: {
      welcome: "Welcome to Trastbank",
      depositCalc: {
        amountAtMaturity: "Amount at maturity",
        ratePill: "{{rate}}% per year — at max term and capitalization",
        youWillNeed: "You will need",
        passport: "— Passport or ID card",
        amountQuestion: "How much do you want to invest?",
        termQuestion: "For what term do you want to open a deposit?",
        params: "Deposit parameters",
        topUp: "Deposit top-up",
        partial: "Partial withdrawal",
        alsoSuitable: "Also suitable for you",
        forAmountAndTerm: "for your amount and term",
        rateAnnual: "Rate, annual",
        depositAmount: "Deposit amount",
        term: "Term",
        openDeposit: "Open deposit",
        details: "Details",
        disclaimer: "Preliminary calculation. Not an offer.",
        fromAmount: "from {{amount}} {{currency}}",
        toAmount: "to {{amount}} {{currency}}",
        fromMonths: "from {{count}} months",
        toMonths: "to {{count}} months",
        months_one: "{{count}} month",
        months_few: "{{count}} months",
        months_many: "{{count}} months",
      },
      offices: {
        offices: "Offices",
        atms: "ATMs",
        search: "Search",
        hoursHint: "Mon–Fri: 09:00–17:00; Sat, Sun: closed",
        openOnMap: "Open on map",
        openYandexMaps: "Open Yandex Maps",
      },
      creditStats: {
        amount: "Loan amount",
        term: "Loan term",
        rate: "Interest rate",
        downPayment: "Down payment",
        downFrom: "from {{value}}%",
      },
      microCalc: {
        loanAmount: "Loan amount",
        collateral: "Collateral",
        insurance: "Insurance policy",
        guarantor: "Guarantor",
        rate: "Rate",
        term: "Term",
        months: "{{count}} months",
      },
      common: {
        login: "Sign in",
        onlineBanking: "Online Banking",
        menu: "Menu",
        close: "Close",
        searchPlaceholder: "Search bank website",
        details: "Details",
        order: "Order now",
        submitApplication: "Apply online",
        allTariffs: "All tariffs",
      },
      nav: {
        private: "Private Clients",
        corporate: "Corporate Clients",
        investors: "Shareholders & Investors",
        about: "About Bank",
        branches: "Branches",
        products: "Products",
        tariffs: "Tariffs",
      },
      forms: {
        fullName: "Full Name",
        phone: "Mobile Phone",
        email: "E-mail",
        branch: "Bank Branch / Service Office",
        submit: "Submit Application",
        successTitle: "Application Submitted!",
      },
    },
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  });

  // <html lang> follows the UI language: screen readers and the speech
  // synthesis of the accessibility menu pick their voice from it.
  const syncDocumentLang = (lng: string) => {
    if (typeof document !== "undefined") document.documentElement.lang = lng.split("-")[0].toLowerCase();
  };
  syncDocumentLang(i18n.language);

  i18n.on("languageChanged", (lng) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("app_lang", lng.split("-")[0].toLowerCase());
    }
    syncDocumentLang(lng);
  });
}

export default i18n;
