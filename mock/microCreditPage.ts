import { CreditPageContent } from "@/types/credits";

const t = (ru: string) => ({ ru, uz: "", en: "" });
const item = (id: string, title: string, text = "", extra: Record<string, unknown> = {}) => ({
  id,
  title: t(title),
  text: t(text),
  ...extra,
});

/** Figma «Микрозайм» defaults when CMS has no pages.micro yet */
export const MICRO_CREDIT_PAGE_DEFAULTS: CreditPageContent = {
  template: "micro",
  heroTitle: t("Микрозайм на любые цели"),
  heroSubtitle: t(
    "До 100 млн сум на срок до 60 месяцев, ставка от 24%. Без залога — под поручительство или страховой полис."
  ),
  heroPrimary: t("Оформить микрозайм"),
  heroPrimaryHref: "#calculator",
  heroSecondary: t(""),
  heroSecondaryHref: "",
  breadcrumb: t("Микрозаймы"),
  highlights: [
    item("h1", "до 100 млн сум", "Сумма микрозайма"),
    item("h2", "до 60 мес.", "Срок микрозайма"),
    item("h3", "от 24%", "Процентная ставка"),
    item("h4", "без залога", "Поручительство или страховой полис"),
  ],
  whyTitle: t("Программы микрозайма"),
  benefits: [
    item("b1", "До 100 млн сум · от 28%", "Для клиентов с постоянным доходом"),
    item("b2", "До 100 млн сум · от 24%", "Зарплатный проект, бюджетники и госслужащие"),
    item("b3", "До 10 млн сум · от 19,5%", "«Кулай-микрозайм» на срок до 36 мес."),
  ],
  conditionsTitle: t(""),
  conditions: [],
  calloutTitle: t("Несколько микрозаймов — один счёт"),
  calloutText: t(
    "Вы можете собрать несколько кредитных портфелей, но у них будет единый счёт: закрытие проходит через него."
  ),
  requirements: [
    {
      id: "req-one-account",
      title: t("Несколько микрозаймов — один счёт"),
      items: [
        t("Можно оформить несколько микрозаймов — у каждого свой кредитный портфель"),
        t("Все портфели привязаны к единому счёту — погашение и закрытие идут через него"),
      ],
    },
    {
      id: "req-docs",
      title: t("Минимум документов"),
      items: [
        t("Паспорт или ID-карта и справка о заработной плате"),
        t(
          "Стаж меньше 12 месяцев — справка о доходе за период работы, заверенная в установленном порядке"
        ),
      ],
    },
  ],
  stepsBannerTitle: t("Как оформить микрозайм"),
  stepsBannerSubtitle: t("Для оформления нужно приехать в офис банка"),
  stepsCta: t("Оформить микрозайм"),
  stepsCtaHref: "#calculator",
  steps: [
    item("s1", "Подайте заявку", "После подачи заявки с вами свяжется оператор", {
      link: t("Узнать больше"),
      href: "#calculator",
    }),
    item("s2", "Получите консультацию", "Проконсультируем по продукту и документам", {
      link: t("Подробнее"),
      href: "#info",
    }),
    item("s3", "Подготовьте документы", "Паспорт, справку о доходе и обеспечение", {
      link: t("Наши филиалы и офисы"),
      href: "/filialy",
    }),
    item("s4", "Узнайте решение", "После подачи документов, в мобильное приложении", {
      link: t("Скачать приложение"),
      href: "#app",
    }),
  ],
  howToTitle: t(""),
  howToSubtitle: t(""),
  channels: [],
  calculator: {
    kind: "loan",
    rate: 0.29,
    rateLabel: t("29%"),
    resultLabel: t("Ежемесячный платёж"),
    resultNote: t(""),
    submitLabel: t("Подать заявку"),
    disclaimer: t(
      "Расчёт предварительный. Точные условия определит банк по итогам рассмотрения заявки."
    ),
    priceLabel: t(""),
    downLabel: t(""),
    termQuestion: t("Срок микрозайма"),
    amountLabel: t("Сумма микрозайма"),
    priceMin: 0,
    priceMax: 0,
    priceDefault: 0,
    priceStep: 1,
    downMin: 0,
    downMax: 0,
    downDefault: 0,
    termMin: 12,
    termMax: 60,
    termDefault: 36,
    amountMin: 1_000_000,
    amountMax: 100_000_000,
    amountDefault: 50_000_000,
    regions: [],
    brands: [],
    tabs: [
      { id: "income", label: t("Постоянный доход") },
      { id: "salary", label: t("Зарплатный проект") },
    ],
    toggles: [
      {
        id: "guarantee",
        label: t("Поручительство физического лица"),
        defaultOn: true,
        rate: 0.29,
      },
      { id: "insurance", label: t("Страховой полис"), defaultOn: false, rate: 0.3 },
    ],
    primaryCta: t("Подать заявку"),
    secondaryCta: t("Подробнее"),
    loanLabel: t("Сумма займа"),
    downAmountLabel: t(""),
    rateCaption: t("Ставка"),
    termCaption: t("Срок"),
    currencySuffix: t("сум"),
    monthsSuffix: t("месяцев"),
    fromWord: t("от"),
    toWord: t("до"),
    limitNote: t(""),
  },
  infoTitle: t("Полезная информация"),
  infoTabs: [
    {
      id: "terms",
      label: t("Условия"),
      title: t("Условия получения микрозайма"),
      items: [
        t("Граждане РУз с постоянным местом работы и доходом"),
        t("Льготный период не предусмотрен"),
        t("Несколько микрозаймов — единый счёт при закрытии"),
        t("Обеспечение: поручительство, страховой полис или залог авто/недвижимости"),
        t("Зарплатный проект и бюджетники (стаж от 1 года) — ставка от 24%"),
      ],
    },
    {
      id: "rates",
      label: t("Ставки"),
      title: t("Ставки по микрозаймам"),
      items: [
        t(
          "Ставка зависит от программы, срока и вида обеспечения. Льготный период не предусмотрен."
        ),
      ],
    },
    {
      id: "docs",
      label: t("Документы"),
      title: t("Документы и образцы"),
      items: [t("Скачайте образцы документов перед оформлением договора")],
    },
    {
      id: "kulay",
      label: t("«Кулай-микрозайм»"),
      title: t("«Кулай-микрозайм»"),
      items: [
        t("Для клиентов с официальной зарплатой и пенсионным доходом"),
        t("Срок до 36 месяцев"),
      ],
    },
  ],
  rateTables: [
    {
      id: "rt-income",
      tabId: "rates",
      title: t("Клиенты с постоянным доходом"),
      subtitle: t("Сумма до 100 млн сум"),
      columns: [t("Срок"), t("Поручительство / залог"), t("Страховой полис")],
      rows: [
        [t("до 12 мес."), t("28%"), t("29%")],
        [t("до 36 мес."), t("29%"), t("30%")],
        [t("до 60 мес."), t("30%"), t("31,9%")],
      ],
      footnote: t(
        "Срок до 60 мес. с низкой ставкой — поручительство физлица или залог авто/недвижимости. Со страховым полисом можно добавить поручителя с положительной кредитной историей."
      ),
      wide: false,
    },
    {
      id: "rt-salary",
      tabId: "rates",
      title: t("Зарплатный проект и бюджет"),
      subtitle: t(
        "Стаж от 1 года: зарплатный проект Trastbank, банки, образование и здравоохранение, налоговая, силовые ведомства, горнодобыча и нефтегаз, бюджетные организации. Сумма до 100 млн сум"
      ),
      columns: [t("Срок"), t("Поручительство / залог"), t("Страховой полис")],
      rows: [
        [t("до 12 мес."), t("24%"), t("25%")],
        [t("до 36 мес."), t("25%"), t("26,5%")],
        [t("до 60 мес."), t("26%"), t("27,9%")],
      ],
      footnote: t(""),
      wide: false,
    },
    {
      id: "rt-kulay",
      tabId: "kulay",
      title: t("«Кулай-микрозайм»"),
      subtitle: t(
        "Для клиентов с официальной зарплатой и пенсионным доходом · срок до 36 мес."
      ),
      columns: [t("Программа"), t("Поручительство"), t("Страховой полис"), t("Сумма")],
      rows: [
        [t("Кулай-микрозайм 5"), t("19,5%"), t("19,9%"), t("до 5 млн сум")],
        [t("Кулай-микрозайм 10"), t("20,9%"), t("21,9%"), t("до 10 млн сум")],
      ],
      footnote: t(
        "Ограничения: по «Кулай 5» — не более 6 действующих договоров и общий остаток до 30 млн сум; по «Кулай 10» — не более 2 договоров и остаток до 20 млн сум."
      ),
      wide: true,
    },
  ],
  documents: [
    { id: "doc1", title: t("Образец договора займа"), href: "#" },
    {
      id: "doc2",
      title: t("Информационный лист об основных условиях микрозайма"),
      href: "#",
    },
    {
      id: "doc3",
      title: t("Чек-лист до оформления договора микрозайма"),
      href: "#",
    },
  ],
  ratePanel: null,
  dealersTitle: t(""),
  dealers: [],
  relatedTitle: t(""),
  related: [],
  faqTitle: t("Частые вопросы"),
  faq: [
    {
      id: "f1",
      question: t("Где можно оформить микрозайм?"),
      answer: t("Заявку можно подать онлайн. Оформление договора проходит в офисе банка."),
    },
    {
      id: "f2",
      question: t("Можно ли взять несколько микрозаймов?"),
      answer: t(
        "Да. У каждого займа свой портфель, но платежи и закрытие идут через единый счёт."
      ),
    },
    {
      id: "f3",
      question: t("Какое обеспечение нужно?"),
      answer: t("Поручительство, страховой полис или залог автомобиля / недвижимости."),
    },
    {
      id: "f4",
      question: t("Какие документы нужны?"),
      answer: t("Паспорт или ID-карта и справка о доходах."),
    },
    {
      id: "f5",
      question: t("Есть ли льготный период?"),
      answer: t("Нет, льготный период по микрозаймам не предоставляется."),
    },
    {
      id: "f6",
      question: t("Чем отличается «Кулай-микрозайм»?"),
      answer: t(
        "Программа для зарплатных и пенсионных клиентов с пониженной ставкой и суммой до 10 млн сум."
      ),
    },
  ],
  faqMore: t("Показать ещё"),
  appTitle: t("Мобильное приложение на ваш смартфон"),
  appText: t(
    "Переводы, открытие счетов и вкладов, инвестиции и многое другое — в вашем смартфоне"
  ),
  appPrimary: t("Скачать приложение"),
  appSecondary: t("Посмотреть все предложения"),
  catalogCrumb: t("Кредиты"),
};

function hasText(value: unknown): boolean {
  if (value == null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "object") {
    const o = value as Record<string, unknown>;
    return Boolean(
      (typeof o.ru === "string" && o.ru.trim()) ||
        (typeof o.uz === "string" && o.uz.trim()) ||
        (typeof o.en === "string" && o.en.trim())
    );
  }
  return false;
}

/** Prefer CMS values; fill empty arrays / blank strings from Figma defaults */
export function mergeMicroPage(
  page: CreditPageContent | null | undefined
): CreditPageContent {
  const base = MICRO_CREDIT_PAGE_DEFAULTS;
  if (!page) return structuredClone(base);

  const pick = <K extends keyof CreditPageContent>(key: K): CreditPageContent[K] => {
    const fromCms = page[key];
    const fromDefault = base[key];
    if (Array.isArray(fromCms)) {
      return (fromCms.length > 0 ? fromCms : fromDefault) as CreditPageContent[K];
    }
    if (fromCms && typeof fromCms === "object" && key === "calculator") {
      const calc = { ...base.calculator, ...fromCms };
      if (!calc.tabs?.length) calc.tabs = base.calculator.tabs;
      if (!calc.toggles?.length) calc.toggles = base.calculator.toggles;
      return calc as CreditPageContent[K];
    }
    if (hasText(fromCms)) return fromCms as CreditPageContent[K];
    return fromDefault;
  };

  return {
    ...base,
    ...page,
    template: "micro",
    heroTitle: pick("heroTitle"),
    heroSubtitle: pick("heroSubtitle"),
    heroPrimary: pick("heroPrimary"),
    heroPrimaryHref: page.heroPrimaryHref || base.heroPrimaryHref,
    highlights: pick("highlights"),
    whyTitle: pick("whyTitle"),
    benefits: pick("benefits"),
    calloutTitle: pick("calloutTitle"),
    calloutText: pick("calloutText"),
    requirements: pick("requirements"),
    stepsBannerTitle: pick("stepsBannerTitle"),
    stepsBannerSubtitle: pick("stepsBannerSubtitle"),
    stepsCta: pick("stepsCta"),
    steps: pick("steps"),
    calculator: pick("calculator"),
    infoTitle: pick("infoTitle"),
    infoTabs: pick("infoTabs"),
    rateTables: pick("rateTables"),
    documents: pick("documents"),
    faqTitle: pick("faqTitle"),
    faq: pick("faq"),
    faqMore: pick("faqMore"),
    appTitle: pick("appTitle"),
    appText: pick("appText"),
    appPrimary: pick("appPrimary"),
    appSecondary: pick("appSecondary"),
  };
}
