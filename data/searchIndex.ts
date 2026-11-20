export interface SearchEntry {
  href: string;
  ru: string;
  uz: string;
  en: string;
  keywords: string;
}

export const SITE_SEARCH_INDEX: SearchEntry[] = [
  { href: "/karty", ru: "Пластиковые карты (Uzcard, Humo, Visa, Mastercard)", uz: "Plastik kartalar (Uzcard, Humo, Visa, Mastercard)", en: "Payment Cards (Uzcard, Humo, Visa, Mastercard)", keywords: "карта uzcard humo visa mastercard kids кобейджинг" },
  { href: "/kredity", ru: "Кредитование (Автокредит, Ипотека, Микрозаймы)", uz: "Kreditlash (Avtokredit, Ipoteka, Mikroqarzlar)", en: "Loans (Auto, Mortgage, Microloans)", keywords: "кредит ипотека автокредит микрозайм овердрафт солнечные панели kia chery haval changan" },
  { href: "/kredity/scoring", ru: "Скоринг кредитоспособности", uz: "Kreditga layoqatlilik skoringi", en: "Credit Scoring Calculator", keywords: "скоринг балл проверка кредит" },
  { href: "/vklady", ru: "Вклады и депозитный калькулятор", uz: "Omonatlar va omonat kalkulyatori", en: "Deposits & Yield Calculator", keywords: "вклад депозит замин кулай сармоя истиклол болажон kinder" },
  { href: "/perevody", ru: "Денежные переводы (Western Union, Золотая Корона, MoneyGram, UPT)", uz: "Pul o‘tkazmalari (Western Union, Zolotaya Korona, MoneyGram, UPT)", en: "Money Transfers (Western Union, MoneyGram, UPT)", keywords: "переводы western union moneygram золотая корона азия экспресс upt astrasend swift" },
  { href: "/valyuta", ru: "Курсы валют и конвертер", uz: "Valyuta kurslari va konverter", en: "Exchange Rates & Currency Converter", keywords: "валюта курс доллар евро рубль usd eur rub cbu цб обмен" },
  { href: "/tarify", ru: "Тарифы для физлиц и бизнеса", uz: "Jismoniy va yuridik shaxslar tariflari", en: "Tariffs for Individuals & Business", keywords: "тарифы рко exclusive standart uzex бхм цифровой" },
  { href: "/biznes", ru: "Корпоративным клиентам (Бизнесу)", uz: "Korporativ mijozlarga (Biznes)", en: "Corporate Clients (Business)", keywords: "бизнес юрлица рко ип ооо capital house экспресс партнер бизнеса" },
  { href: "/biznes/rko", ru: "Расчётно-кассовое обслуживание (РКО)", uz: "Hisob-kitob kassa xizmati (HKK)", en: "Cash & Settlement Services", keywords: "рко расчетный счет касса инкассация" },
  { href: "/biznes/lizing", ru: "Финансовый лизинг", uz: "Moliyaviy lizing", en: "Financial Leasing", keywords: "лизинг оборудование техника авто" },
  { href: "/biznes/garantii", ru: "Банковские гарантии и поручительства", uz: "Bank kafolatlari va kafilliklar", en: "Bank Guarantees & Sureties", keywords: "гарантия тендер поручительство" },
  { href: "/biznes/faktoring", ru: "Факторинговые услуги", uz: "Faktoring xizmatlari", en: "Factoring Services", keywords: "факторинг дебиторская задолженность" },
  { href: "/biznes/ved", ru: "Экспортно-импортные операции (ВЭД)", uz: "Eksport-import operatsiyalari (TIF)", en: "Trade Finance & FX Operations", keywords: "вэд экспорт импорт аккредитив валютный контроль" },
  { href: "/biznes/terminaly", ru: "Торговые терминалы (эквайринг)", uz: "Savdo terminallari (ekvayring)", en: "POS Terminals & Acquiring", keywords: "терминал эквайринг оплата" },
  { href: "/biznes/zarplatnyj-proekt", ru: "Зарплатный проект", uz: "Ish haqi loyihasi", en: "Payroll Project", keywords: "зарплата проект сотрудники" },
  { href: "/servisy", ru: "Сервисы (Trastpay, Интернет-банк, SMS-Bank, Ячейки)", uz: "Xizmatlar (Trastpay, Internet-bank, SMS-Bank)", en: "Digital Banking & Services", keywords: "trastpay трастпей интернет банк мобайл sms ячейки коммунальные" },
  { href: "/zayavki", ru: "Онлайн-заявки (карта, кредит, бизнес, обращение)", uz: "Onlayn arizalar (karta, kredit, biznes)", en: "Online Applications", keywords: "заявка оформить заказать карту кредит" },
  { href: "/filialy", ru: "Филиалы, офисы и банкоматы на карте", uz: "Filiallar, ofislar va bankomatlar", en: "Branches, Offices & ATMs Map", keywords: "филиалы офисы банкоматы адрес карта ташкент" },
  { href: "/o-banke", ru: "О банке «Трастбанк» и лицензия № 44", uz: "«Trastbank» haqida va 44-sonli litsenziya", en: "About Trastbank & License #44", keywords: "о банке история правление лицензия рейтинги" },
  { href: "/aktsioneram", ru: "Акционерам и инвесторам", uz: "Aksiyador va investorlarga", en: "Shareholders & Investors", keywords: "акционеры инвесторы дивиденды отчетность trsb" },
  { href: "/press-tsentr", ru: "Пресс-центр, новости, тендеры, продажа имущества", uz: "Matbuot markazi, yangiliklar, mulklar", en: "Press Center, News, Tenders & Real Estate", keywords: "новости пресс центр тендеры имущество faq" },
  { href: "/finansovym-institutam", ru: "Финансовым институтам", uz: "Moliyaviy tashkilotlarga", en: "Financial Institutions", keywords: "банки корреспонденты swift межбанковский" },
  { href: "/investitsii", ru: "Инвестиции (линия ITFC $8M)", uz: "Investitsiyalar (XSMIK $8M)", en: "Investments (ITFC $8M Line)", keywords: "инвестиции itfc исламское финансирование" },
  { href: "/dokumenty", ru: "Банковское законодательство и открытые данные", uz: "Bank qonunchiligi va ochiq ma’lumotlar", en: "Banking Legislation & Open Data", keywords: "документы законы открытые данные xml csv кодекс" },
  { href: "/blanki", ru: "Образцы бланков и типовых договоров", uz: "Blankalar va namunaviy shartnomalar", en: "Forms & Standard Agreements", keywords: "бланки договоры заявления скачать pdf" },
  { href: "/obrashcheniya", ru: "Обращения граждан и приём руководством", uz: "Fuqarolar murojaatlari va qabul jadvali", en: "Citizens' Appeals & Reception Schedule", keywords: "обращения прием граждан статус статистика" },
  { href: "/vakansii", ru: "Вакансии и карьера", uz: "Vakansiyalar va karyera", en: "Careers & Vacancies", keywords: "вакансии работа карьера резюме" },
  { href: "/kontakty", ru: "Контакты и реквизиты банка", uz: "Aloqa va bank rekvizitlari", en: "Contacts & Bank Requisites", keywords: "контакты реквизиты инн мфо swift навои 1287" },
  { href: "/karta-sajta", ru: "Карта сайта", uz: "Sayt xaritasi", en: "Sitemap", keywords: "карта сайта все разделы" },
];
