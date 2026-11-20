export interface ExchangeRateRow {
  code: string;
  name: string;
  unit: number;
  buy: number;
  sell: number;
  cbu: number;
}

export interface CurrencyOperationCard {
  id: string;
  title: string;
  description: string;
  details: string[];
}

export const EXCHANGE_RATES_UPDATED = "19.11.2026 · 09:00";

export const EXCHANGE_RATES_TABLE: ExchangeRateRow[] = [
  { code: "USD", name: "Доллар США", unit: 1, buy: 11940, sell: 12040, cbu: 11980.36 },
  { code: "EUR", name: "Евро", unit: 1, buy: 12700, sell: 13250, cbu: 13134.07 },
  { code: "GBP", name: "Фунт стерлингов", unit: 1, buy: 15450, sell: 16100, cbu: 15763.76 },
  { code: "CHF", name: "Швейцарский франк", unit: 1, buy: 13900, sell: 14550, cbu: 14214.95 },
  { code: "CNY", name: "Китайский юань", unit: 1, buy: 1645, sell: 1965, cbu: 1797.18 },
  { code: "RUB", name: "Российский рубль", unit: 1, buy: 90, sell: 151, cbu: 145.62 },
  { code: "JPY", name: "Японская иена", unit: 1, buy: 50, sell: 100, cbu: 75.16 },
];

export const CURRENCY_OPERATIONS: CurrencyOperationCard[] = [
  {
    id: "exchange-cash",
    title: "Покупка и продажа наличной валюты",
    description:
      "Быстрый обмен долларов США, евро, фунтов, рублей и других валют в обменных пунктах и кассах банка.",
    details: [
      "Актуальный курс во всех офисах банковских услуг",
      "Работа с USD, EUR, GBP, CHF, RUB, JPY, CNY",
      "Без скрытых комиссий при покупке и продаже",
    ],
  },
  {
    id: "conversion-online",
    title: "Безналичная конвертация онлайн",
    description:
      "Мгновенный обмен сумов на доллары США и зачисление на международные карты Visa и MasterCard через Trastpay.",
    details: [
      "Доступно 24/7 в мобильном приложении Trastpay",
      "Прямое зачисление на валютную карту или счёт",
      "Выгодный курс онлайн-конверсии",
    ],
  },
  {
    id: "banknotes-damaged",
    title: "Размен и приём повреждённых банкнот",
    description:
      "Размен крупных купюр иностранной валюты, а также приём на инкассо и замена изношенных или повреждённых банкнот.",
    details: [
      "Экспертиза подлинности и состояния купюр",
      "Обмен ветхих банкнот по установленным тарифам",
      "Доступно в ОПЕРУ и филиалах банка",
    ],
  },
];
