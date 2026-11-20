export type MegaMenuLink = {
  label: string;
  labelUz?: string;
  href: string;
};

export type MegaMenuColumn = {
  id: string;
  title: string;
  titleUz?: string;
  links: MegaMenuLink[];
};

export const MEGA_MENU_COLUMNS: MegaMenuColumn[] = [
  {
    id: "cards",
    title: "Карты",
    titleUz: "Kartalar",
    links: [
      { label: "Все карты", labelUz: "Barcha kartalar", href: "/karty" },
      { label: "Uzcard", labelUz: "Uzcard", href: "/karty" },
      { label: "Humo", labelUz: "Humo", href: "/karty" },
      { label: "Uzcard Kids", labelUz: "Uzcard Kids", href: "/karty" },
      { label: "Visa Classic", labelUz: "Visa Classic", href: "/karty" },
      { label: "Mastercard Standard", labelUz: "Mastercard Standard", href: "/karty" },
      { label: "Mastercard Gold", labelUz: "Mastercard Gold", href: "/karty" },
      { label: "Visa Infinite", labelUz: "Visa Infinite", href: "/karty" },
      { label: "Mastercard World Elite", labelUz: "Mastercard World Elite", href: "/karty" },
      { label: "Кобейджинговые карты", labelUz: "Kobeydjing kartalari", href: "/karty" },
      { label: "Заказать карту онлайн", labelUz: "Kartani onlayn buyurtma qilish", href: "/zayavki?tab=card" },
    ],
  },
  {
    id: "credits",
    title: "Кредиты",
    titleUz: "Kreditlar",
    links: [
      { label: "Все кредиты", labelUz: "Barcha kreditlar", href: "/kredity" },
      { label: "Автокредит", labelUz: "Avtokredit", href: "/kredity" },
      { label: "Ипотека", labelUz: "Ipoteka", href: "/kredity" },
      { label: "Микрозаймы", labelUz: "Mikroqarzlar", href: "/kredity" },
      { label: "Потребительский кредит", labelUz: "Iste’mol krediti", href: "/kredity" },
      { label: "Овердрафт", labelUz: "Overdraft", href: "/kredity" },
      { label: "Кредит на солнечные панели", labelUz: "Quyosh panellari uchun kredit", href: "/kredity" },
      { label: "Кредиты для самозанятых", labelUz: "O‘zini o‘zi band qilganlar uchun", href: "/kredity" },
      { label: "Скоринг кредитоспособности", labelUz: "Kreditga layoqatlilik skoringi", href: "/kredity/scoring" },
      { label: "Заявка на кредит", labelUz: "Kreditga ariza yuborish", href: "/zayavki?tab=credit" },
    ],
  },
  {
    id: "deposits",
    title: "Вклады",
    titleUz: "Omonatlar",
    links: [
      { label: "Все вклады", labelUz: "Barcha omonatlar", href: "/vklady" },
      { label: "Вклады в сумах", labelUz: "So‘mdagi omonatlar", href: "/vklady" },
      { label: "Вклады в долларах", labelUz: "Dollardagi omonatlar", href: "/vklady" },
      { label: "Онлайн-вклады", labelUz: "Onlayn omonatlar", href: "/vklady" },
      { label: "Сберегательные вклады", labelUz: "Jamg‘arma omonatlar", href: "/vklady" },
      { label: "Калькулятор вклада", labelUz: "Omonat kalkulyatori", href: "/vklady" },
    ],
  },
  {
    id: "transfers",
    title: "Переводы и платежи",
    titleUz: "Pul o‘tkazmalari va to‘lovlar",
    links: [
      { label: "Денежные переводы", labelUz: "Pul o‘tkazmalari", href: "/perevody" },
      { label: "Международные переводы", labelUz: "Xalqaro pul o‘tkazmalari", href: "/perevody" },
      { label: "Коммунальные платежи", labelUz: "Kommunal to‘lovlar", href: "/servisy#communal" },
      { label: "Оплата услуг", labelUz: "Xizmatlar uchun to‘lov", href: "/servisy#trastpay" },
    ],
  },
  {
    id: "currency",
    title: "Валюта",
    titleUz: "Valyuta",
    links: [
      { label: "Курсы валют", labelUz: "Valyuta kurslari", href: "/valyuta" },
      { label: "Конвертер валют", labelUz: "Valyuta konverteri", href: "/valyuta#converter" },
      { label: "Валютно-обменные операции", labelUz: "Valyuta ayirboshlash", href: "/valyuta#operations" },
      { label: "Размен и повреждённые банкноты", labelUz: "Shikastlangan banknotalar", href: "/valyuta#operations" },
      { label: "Обменные пункты", labelUz: "Ayirboshlash shoxobchalari", href: "/filialy" },
    ],
  },
  {
    id: "services",
    title: "Сервисы и тарифы",
    titleUz: "Xizmatlar va tariflar",
    links: [
      { label: "Все тарифы", labelUz: "Barcha tariflar", href: "/tarify" },
      { label: "Trastpay", labelUz: "Trastpay", href: "/servisy#trastpay" },
      { label: "Интернет-банк", labelUz: "Internet-bank", href: "/servisy#internet-bank" },
      { label: "Trast-Мобайл", labelUz: "Trast-Mobayl", href: "/servisy#trast-mobile" },
      { label: "SMS-Bank", labelUz: "SMS-Bank", href: "/servisy#sms-bank" },
      { label: "Заявки онлайн", labelUz: "Onlayn arizalar", href: "/zayavki" },
      { label: "Депозитарные ячейки", labelUz: "Depozit qutichalari", href: "/servisy#cells" },
      { label: "Контакты и реквизиты", labelUz: "Aloqa va rekvizitlar", href: "/kontakty" },
    ],
  },
];

export const CORPORATE_MEGA_MENU_COLUMNS: MegaMenuColumn[] = [
  {
    id: "corp-accounts",
    title: "Счета и РКО",
    titleUz: "Hisoblar va HKK",
    links: [
      { label: "Корпоративным клиентам", labelUz: "Korporativ mijozlarga", href: "/biznes" },
      { label: "Расчётный счёт и РКО", labelUz: "Hisob-kitob kassa xizmati", href: "/biznes/rko" },
      { label: "Открыть счёт онлайн", labelUz: "Onlayn hisob ochish", href: "/zayavki?tab=business" },
      { label: "Кассовые операции", labelUz: "Kassa operatsiyalari", href: "/biznes/rko" },
    ],
  },
  {
    id: "corp-credits",
    title: "Кредитование",
    titleUz: "Kreditlash",
    links: [
      { label: "Все бизнес-кредиты", labelUz: "Barcha biznes kreditlari", href: "/biznes#financing" },
      { label: "Оборотные средства", labelUz: "Aylanma mablag‘lar", href: "/biznes#financing" },
      { label: "Инвестиционный кредит", labelUz: "Investitsiya krediti", href: "/biznes#financing" },
      { label: "Бизнес-ипотека", labelUz: "Biznes ipoteka", href: "/biznes#financing" },
      { label: "Автокредиты для бизнеса", labelUz: "Biznes uchun avtokredit", href: "/biznes#financing" },
      { label: "Факторинг", labelUz: "Faktoring xizmatlari", href: "/biznes/faktoring" },
      { label: "Зелёное финансирование", labelUz: "Yashil moliyalashtirish", href: "/biznes#financing" },
    ],
  },
  {
    id: "corp-cards",
    title: "Платежи и карты",
    titleUz: "To‘lovlar va kartalar",
    links: [
      { label: "Корпоративные карты", labelUz: "Korporativ kartalar", href: "/karty" },
      { label: "Зарплатный проект", labelUz: "Ish haqi loyihasi", href: "/biznes/zarplatnyj-proekt" },
      { label: "Торговые терминалы", labelUz: "Savdo terminallari", href: "/biznes/terminaly" },
      { label: "Приём безналичных платежей", labelUz: "Naqdsiz to‘lovlar", href: "/biznes/terminaly" },
    ],
  },
  {
    id: "corp-ved",
    title: "ВЭД и валюта",
    titleUz: "TIF va valyuta",
    links: [
      { label: "Экспортно-импортные операции", labelUz: "Eksport-import operatsiyalari", href: "/biznes/ved" },
      { label: "Валютные расчёты", labelUz: "Valyuta hisob-kitoblari", href: "/biznes/ved" },
      { label: "Внешнеторговые контракты", labelUz: "Tashqi savdo shartnomalari", href: "/biznes/ved" },
      { label: "Курсы валют", labelUz: "Valyuta kurslari", href: "/valyuta" },
    ],
  },
  {
    id: "corp-deposits",
    title: "Депозиты и гарантии",
    titleUz: "Omonatlar va kafolatlar",
    links: [
      { label: "Депозитные операции", labelUz: "Depozit operatsiyalari", href: "/vklady" },
      { label: "Банковские гарантии", labelUz: "Bank kafolatlari", href: "/biznes/garantii" },
      { label: "Поручительства", labelUz: "Kafilliklar", href: "/biznes/garantii" },
      { label: "Лизинг", labelUz: "Lizing", href: "/biznes/lizing" },
      { label: "Операции с ценными бумагами", labelUz: "Qimmatli qog‘ozlar", href: "/biznes/tsennye-bumagi" },
    ],
  },
  {
    id: "corp-services",
    title: "Сервисы и тарифы",
    titleUz: "Xizmatlar va tariflar",
    links: [
      { label: "Все тарифы для бизнеса", labelUz: "Biznes uchun tariflar", href: "/tarify" },
      { label: "Exclusive", labelUz: "Exclusive", href: "/tarify" },
      { label: "Standart", labelUz: "Standart", href: "/tarify" },
      { label: "Валютный и UzEX", labelUz: "Valyuta va UzEX", href: "/tarify" },
      { label: "Тарифы «Цифровой филиал»", labelUz: "Raqamli filial tariflari", href: "/tarify" },
      { label: "Интернет-банк и SMS-Bank", labelUz: "Internet-bank va SMS-Bank", href: "/servisy" },
    ],
  },
];

export const INVESTORS_MEGA_MENU_COLUMNS: MegaMenuColumn[] = [
  {
    id: "inv-governance",
    title: "Корпоративное управление",
    titleUz: "Korporativ boshqaruv",
    links: [
      { label: "Акционерам и инвесторам", labelUz: "Aksiyador va investorlarga", href: "/aktsioneram" },
      { label: "Наблюдательный Совет", labelUz: "Kuzatuv kengashi", href: "/aktsioneram#board" },
      { label: "Структура акционерного капитала", labelUz: "Aksiyadorlik kapitali tuzilmasi", href: "/aktsioneram#capital" },
      { label: "Аффилированные лица", labelUz: "Affillangan shaxslar", href: "/aktsioneram#affiliates" },
      { label: "Кодекс корпоративного управления", labelUz: "Korporativ boshqaruv kodeksi", href: "/aktsioneram#governance" },
    ],
  },
  {
    id: "inv-reports",
    title: "Отчётность и дивиденды",
    titleUz: "Hisobotlar va dividendlar",
    links: [
      { label: "Финансовая отчётность", labelUz: "Moliyaviy hisobotlar", href: "/aktsioneram#reports" },
      { label: "Общие собрания акционеров", labelUz: "Aksiyadorlar umumiy yig‘ilishi", href: "/aktsioneram#meetings" },
      { label: "Распределение прибыли", labelUz: "Foydani taqsimlash", href: "/aktsioneram#dividends" },
      { label: "Рейтинги банка", labelUz: "Bank reytinglari", href: "/o-banke/reytingi" },
    ],
  },
  {
    id: "inv-about",
    title: "О банке и документы",
    titleUz: "Bank haqida va hujjatlar",
    links: [
      { label: "О банке «Трастбанк»", labelUz: "«Trastbank» haqida", href: "/o-banke" },
      { label: "Правление и структура", labelUz: "Boshqaruv tarkibi", href: "/o-banke/pravlenie" },
      { label: "Лицензия ЦБ РУз № 44", labelUz: "MB № 44 litsenziyasi", href: "/o-banke/litsenzii" },
      { label: "Пресс-центр и тендеры", labelUz: "Matbuot markazi va tenderlar", href: "/press-tsentr" },
      { label: "Финансовым институтам", labelUz: "Moliyaviy tashkilotlarga", href: "/finansovym-institutam" },
      { label: "Инвестиции (ITFC)", labelUz: "Investitsiyalar (XSMIK)", href: "/investitsii" },
      { label: "Вакансии и карьера", labelUz: "Vakansiyalar va karyera", href: "/vakansii" },
      { label: "Законодательство и открытые данные", labelUz: "Bank qonunchiligi va ochiq ma’lumotlar", href: "/dokumenty" },
      { label: "Образцы бланков и договоров", labelUz: "Blankalar va shartnomalar", href: "/blanki" },
      { label: "Обращения граждан", labelUz: "Fuqarolar murojaatlari", href: "/obrashcheniya" },
      { label: "Реквизиты и контакты", labelUz: "Rekvizitlar va aloqa", href: "/kontakty" },
      { label: "Карта сайта", labelUz: "Sayt xaritasi", href: "/karta-sajta" },
    ],
  },
];
