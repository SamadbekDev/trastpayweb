export type MegaMenuLink = {
  label: string;
  href: string;
};

export type MegaMenuColumn = {
  id: string;
  title: string;
  links: MegaMenuLink[];
};

export const MEGA_MENU_COLUMNS: MegaMenuColumn[] = [
  {
    id: "cards",
    title: "Карты",
    links: [
      { label: "Все карты", href: "/karty" },
      { label: "Uzcard", href: "/karty" },
      { label: "Humo", href: "/karty" },
      { label: "Uzcard Kids", href: "/karty" },
      { label: "Visa Classic", href: "/karty" },
      { label: "Mastercard Standard", href: "/karty" },
      { label: "Mastercard Gold", href: "/karty" },
      { label: "Visa Infinite", href: "/karty" },
      { label: "Mastercard World Elite", href: "/karty" },
      { label: "Кобейджинговые карты", href: "/karty" },
      { label: "Заказать карту", href: "/karty" },
    ],
  },
  {
    id: "credits",
    title: "Кредиты",
    links: [
      { label: "Все кредиты", href: "/kredity" },
      { label: "Автокредит", href: "/kredity" },
      { label: "Ипотека", href: "/kredity" },
      { label: "Микрозаймы", href: "/kredity" },
      { label: "Потребительский кредит", href: "/kredity" },
      { label: "Овердрафт", href: "/kredity" },
      { label: "Кредит на солнечные панели", href: "/kredity" },
      { label: "Кредиты для самозанятых", href: "/kredity" },
    ],
  },
  {
    id: "deposits",
    title: "Вклады",
    links: [
      { label: "Все вклады", href: "/vklady" },
      { label: "Вклады в сумах", href: "/vklady" },
      { label: "Вклады в долларах", href: "/vklady" },
      { label: "Онлайн-вклады", href: "/vklady" },
      { label: "Сберегательные вклады", href: "/vklady" },
      { label: "Калькулятор вклада", href: "/vklady" },
    ],
  },
  {
    id: "transfers",
    title: "Переводы и платежи",
    links: [
      { label: "Денежные переводы", href: "/perevody" },
      { label: "Международные переводы", href: "/perevody" },
      { label: "Коммунальные платежи", href: "#" },
      { label: "Оплата услуг", href: "#" },
    ],
  },
  {
    id: "currency",
    title: "Валюта",
    links: [
      { label: "Валютно-обменные операции", href: "#" },
      { label: "Покупка валюты", href: "#" },
      { label: "Продажа валюты", href: "#" },
      { label: "Конвертация валюты", href: "#" },
      { label: "Размен банкнот", href: "#" },
      { label: "Поврежденные банкноты", href: "#" },
      { label: "Обменные пункты", href: "/filialy" },
      { label: "Курсы валют", href: "/tarify" },
    ],
  },
  {
    id: "services",
    title: "Сервисы и тарифы",
    links: [
      { label: "Все тарифы", href: "/tarify" },
      { label: "Интернет-банк", href: "#" },
      { label: "Trastpay", href: "/#trastpay" },
      { label: "Trast-Мобайл", href: "#" },
      { label: "SMS-Bank", href: "#" },
      { label: "Заявки онлайн", href: "#" },
      { label: "Тарифы по картам", href: "/tarify" },
      { label: "Депозитарные ячейки", href: "#" },
    ],
  },
];

export const CORPORATE_MEGA_MENU_COLUMNS: MegaMenuColumn[] = [
  {
    id: "corp-accounts",
    title: "Счета и РКО",
    links: [
      { label: "Расчётный счёт", href: "#" },
      { label: "Открыть счёт", href: "#" },
      { label: "Расчётно-кассовое обслуживание", href: "#" },
      { label: "Наличные операции", href: "#" },
    ],
  },
  {
    id: "corp-credits",
    title: "Кредитование",
    links: [
      { label: "Все бизнес-кредиты", href: "/kredity" },
      { label: "Оборотные средства", href: "/kredity" },
      { label: "Инвестиционный кредит", href: "/kredity" },
      { label: "Бизнес-ипотека", href: "/kredity" },
      { label: "Автокредиты для бизнеса", href: "/kredity" },
      { label: "Микрокредитование", href: "/kredity" },
      { label: "Факторинг", href: "/kredity" },
      { label: "Зелёное финансирование", href: "/kredity" },
      { label: "Отраслевые кредиты", href: "/kredity" },
    ],
  },
  {
    id: "corp-cards",
    title: "Платежи и карты",
    links: [
      { label: "Корпоративные карты", href: "/karty" },
      { label: "Зарплатный проект", href: "/karty" },
      { label: "Торговые терминалы", href: "#" },
      { label: "Приём безналичных платежей", href: "#" },
    ],
  },
  {
    id: "corp-ved",
    title: "ВЭД и валюта",
    links: [
      { label: "Экспортные операции", href: "#" },
      { label: "Импортные операции", href: "#" },
      { label: "Валютные расчёты", href: "#" },
      { label: "Внешнеторговые контракты", href: "#" },
      { label: "Иностранные кредитные линии", href: "#" },
    ],
  },
  {
    id: "corp-deposits",
    title: "Депозиты и гарантии",
    links: [
      { label: "Депозитные операции", href: "/vklady" },
      { label: "Банковские гарантии", href: "#" },
      { label: "Поручительства", href: "#" },
      { label: "Лизинг", href: "#" },
      { label: "Операции с ценными бумагами", href: "#" },
    ],
  },
  {
    id: "corp-services",
    title: "Сервисы и тарифы",
    links: [
      { label: "Все тарифы", href: "/tarify" },
      { label: "Exclusive", href: "/tarify" },
      { label: "Standart", href: "/tarify" },
      { label: "Валютный", href: "/tarify" },
      { label: "UzEX", href: "/tarify" },
      { label: "Тариф «БХМ»", href: "/tarify" },
      { label: "Цифровой филиал", href: "#" },
      { label: "Интернет-банк", href: "#" },
      { label: "SMS-Bank", href: "#" },
    ],
  },
];
