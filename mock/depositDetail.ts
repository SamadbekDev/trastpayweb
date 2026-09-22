import {
  DepositDetailPageConfig,
  DepositProduct,
  DepositSuggestedProduct,
} from "@/types/deposits";
import { depositsPageConfig } from "@/mock/depositsPageConfig";
import { officesPageConfig } from "@/mock/offices";

const t = (ru: string, uz: string, en: string) => ({ ru, uz, en });

const ph = (w: number, h: number, text: string, bg = "dbe7ff", fg = "1f3fbf") =>
  `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(text)}`;

function parseRate(product: DepositProduct): number {
  const match = product.rate.ru.replace(",", ".").match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 18;
}

function parseMonths(product: DepositProduct): number {
  const match = product.term.ru.match(/(\d+)/);
  return match ? Number(match[1]) : 12;
}

function formatMoney(n: number, currency: "UZS" | "USD") {
  if (currency === "USD") {
    return `От ${n.toLocaleString("ru-RU")} $`;
  }
  return `От ${n.toLocaleString("ru-RU")} сум`;
}

export function getDepositIds(products = depositsPageConfig.products) {
  return products.map((p) => p.id);
}

export function getDepositDetail(
  id: string,
  products = depositsPageConfig.products
): DepositDetailPageConfig | null {
  const product = products.find((p) => p.id === id);
  if (!product) return null;

  const rate = parseRate(product);
  const months = parseMonths(product);
  const isFx = product.category === "fx";
  const currency: "UZS" | "USD" = isFx ? "USD" : "UZS";
  const minAmount = isFx ? 500 : 500_000;
  const maxAmount = isFx ? 1_000_000 : 5_000_000_000;
  const defaultAmount = isFx ? 10_000 : 100_000_000;

  const terms = isFx
    ? [
        { id: "6", months: 6, rate: Math.max(rate - 1.5, 1) },
        { id: "12", months: 12, rate: Math.max(rate - 0.5, 1) },
        { id: "13", months: 13, rate: Math.max(rate - 0.3, 1) },
        { id: "18", months: 18, rate },
      ]
    : [
        { id: "3", months: 3, rate: Math.max(rate - 5, 14) },
        { id: "6", months: 6, rate: Math.max(rate - 5, 16) },
        { id: "13", months: 13, rate: Math.max(rate - 6, 17) },
        { id: "24", months: 24, rate },
      ].map((term) =>
        term.months === months ? { ...term, rate } : term
      );

  if (!terms.some((term) => term.months === months)) {
    terms[terms.length - 1] = {
      id: String(months),
      months,
      rate,
    };
  }

  const suggested: DepositSuggestedProduct[] = products
    .filter((p) => p.id !== product.id)
    .slice(0, 2)
    .map((p, index) => ({
      id: p.id,
      title: p.title,
      rate: p.rate,
      amount: p.amount,
      term: p.term,
      badge:
        index === 0
          ? t("Рекомендуем", "Tavsiya etamiz", "Recommended")
          : t("Новый продукт", "Yangi mahsulot", "New product"),
      badgeColor: index === 0 ? "#56BB27" : "#56BB27",
      href: `/vklady/${p.id}`,
      image: p.image,
    }));

  const generated: DepositDetailPageConfig = {
    product,
    breadcrumbs: [
      {
        label: t("Вклады и счета", "Omonatlar va hisoblar", "Deposits and accounts"),
        href: "/vklady",
      },
      {
        label: isFx
          ? t("Валютные вклады", "Valyuta omonatlari", "FX deposits")
          : t("Онлайн Вклады в суммах", "Onlayn so‘m omonatlari", "Online UZS deposits"),
      },
    ],
    heroTitle: isFx
      ? t(
          `Валютный вклад «${product.title.ru}» до ${String(rate).replace(".", ",")} годовых`,
          `Valyuta omonati «${product.title.uz}» ${String(rate).replace(".", ",")} gacha`,
          `FX deposit “${product.title.en}” up to ${rate}%`
        )
      : t(
          `Вклад в суммах до ${String(rate).replace(".", ",")} годовых`,
          `So‘m omonati ${String(rate).replace(".", ",")} gacha yillik`,
          `UZS deposit up to ${rate}% per year`
        ),
    heroSubtitle: t(
      "Откройте вклад на ваших условиях — пусть доход растет",
      "Omonatni o‘zingizning shartlaringizda oching — daromad o‘ssin",
      "Open a deposit on your terms and let your income grow"
    ),
    heroBullets: [
      t(
        "Повышенная ставка для клиентов, получающих зарплату или пенсию в Трастбанке",
        "Trastbankda maosh yoki pensiya oluvchilar uchun oshirilgan stavka",
        "Higher rate for Trastbank salary and pension clients"
      ),
      t(
        "Специальные предложения по надбавкам",
        "Qo‘shimcha ustamalar bo‘yicha maxsus takliflar",
        "Special bonus rate offers"
      ),
    ],
    heroPrimaryCta: t("Стать клиентом", "Mijoz bo‘lish", "Become a client"),
    heroPrimaryHref: "#",
    heroSecondaryCta: t("Открыть Онлайн вклад", "Onlayn omonat ochish", "Open online deposit"),
    heroSecondaryHref: "#calculator",
    heroImage: ph(640, 480, "Safe", "2d6ee3", "ffffff"),
    highlights: [
      {
        id: "rate",
        icon: "rate",
        value: product.rate,
        label: product.rateLabel,
      },
      {
        id: "amount",
        icon: "amount",
        value: product.amount,
        label: product.amountLabel,
      },
      {
        id: "term",
        icon: "term",
        value: product.term,
        label: product.termLabel,
      },
      {
        id: "safe",
        icon: "safe",
        value: t("Надежно", "Ishonchli", "Secure"),
        label: t(
          "Деньги застрахованы ЦБ",
          "Pul MB tomonidan sug‘urtalangan",
          "Funds insured by the CB"
        ),
      },
    ],
    benefits: [
      {
        id: "flex",
        variant: "blue",
        title: t("На выгодных условиях", "Foydali shartlarda", "On favorable terms"),
        description: t(
          "Управляйте деньгами по-своему: снимайте или пополняйте — когда захотите",
          "Pulni o‘zingiz boshqaring: istalgan paytda yechib oling yoki to‘ldiring",
          "Manage money your way: withdraw or top up whenever you want"
        ),
        image: ph(260, 138, "%", "4b8bff", "ffffff"),
      },
      {
        id: "online",
        variant: "white",
        title: t("Онлайн вклады", "Onlayn omonatlar", "Online deposits"),
        description: t(
          "Онлайн открытие вклада через мобильное приложение",
          "Mobil ilova orqali omonatni onlayn ochish",
          "Open a deposit online via the mobile app"
        ),
        image: ph(240, 150, "App", "e8f1ff", "2d6ee3"),
      },
      {
        id: "paperless",
        variant: "white",
        title: t("100% онлайн", "100% onlayn", "100% online"),
        description: t(
          "Никаких бумаг и очередей, всё в приложении",
          "Qog‘oz va navbatsiz — hammasi ilovada",
          "No paperwork or queues — everything is in the app"
        ),
      },
      {
        id: "protected",
        variant: "white",
        title: t("Деньги под защитой", "Pul himoyalangan", "Money protected"),
        extra: t("Государство гарантирует", "Davlat kafolatlaydi", "State guarantee"),
        extraHref: "#",
        description: t(
          "возврат до 200 млн сумов",
          "200 mln so‘mgacha qaytarish",
          "reimbursement up to 200 million UZS"
        ),
        image: ph(112, 112, "Shield", "dbe7ff", "2d6ee3"),
      },
      {
        id: "term12",
        variant: "white",
        title: t(
          `Со сроком на ${months} месяцев`,
          `${months} oylik muddat bilan`,
          `With a term of ${months} months`
        ),
        description: t(
          `И доходностью до ${String(rate).replace(".", ",")} годовых`,
          `Va yillik ${String(rate).replace(".", ",")} gacha daromad`,
          `And a yield of up to ${rate}% per year`
        ),
      },
    ],
    stepsTitle: t("Открыть вклад легко", "Omonat ochish oson", "Opening a deposit is easy"),
    steps: [
      {
        id: "s1",
        number: "1",
        title: t("Подайте заявку на вклад", "Omonat uchun ariza yuboring", "Submit a deposit application"),
        description: t(
          "Заполните онлайн-заявку — посещать банк не нужно, или можно оформить в филиале банка",
          "Onlayn arizani to‘ldiring — bankka borish shart emas, yoki filialda rasmiylashtirish mumkin",
          "Fill in an online application — no branch visit needed, or apply at a branch"
        ),
        linkText: t("Выбрать отделение", "Bo‘limni tanlash", "Choose a branch"),
        href: "/filialy",
      },
      {
        id: "s2",
        number: "2",
        title: t("Дождитесь одобрения банка", "Bank tasdiqlashini kuting", "Wait for bank approval"),
        description: t(
          "Оформление за несколько минут, а пока можете выбрать удобный вам вклад банка",
          "Rasmiylashtirish bir necha daqiqada, shu orada qulay omonatni tanlashingiz mumkin",
          "Processed in minutes — meanwhile you can pick a convenient deposit"
        ),
        linkText: t("Выбрать вклад", "Omonat tanlash", "Choose a deposit"),
        href: "/vklady",
      },
      {
        id: "s3",
        number: "3",
        title: t("Откройте вклад", "Omonatni oching", "Open the deposit"),
        description: t(
          "Преумножайте свои вклады, и также можете мониторить свои вклады в приложении банка.",
          "Omonatlaringizni ko‘paytiring va bank ilovasida kuzatib boring.",
          "Grow your deposits and track them in the bank app."
        ),
        linkText: t("Скачать приложение", "Ilovani yuklab olish", "Download the app"),
        href: "#",
      },
    ],
    calculatorTitle: t("Если вы откроете вклад", "Agar omonat ochsangiz", "If you open a deposit"),
    calculatorRate: rate,
    calculatorRateCaption: t(
      "годовых, если оставлять проценты",
      "foizlarni qoldirsangiz, yillik",
      "per year if interest is left on the deposit"
    ),
    calculatorImage: ph(803, 496, "Coins", "186bed", "ffffff"),
    calculatorChannels: [
      { id: "online", label: t("Онлайн", "Onlayn", "Online") },
      { id: "office", label: t("В отделение банка", "Bank bo‘limida", "At a branch") },
    ],
    calculatorTerms: terms,
    calculatorMin: minAmount,
    calculatorMax: maxAmount,
    calculatorDefault: defaultAmount,
    calculatorCurrency: currency,
    suggested,
    conditionsTitle: t("Условия", "Shartlar", "Terms"),
    conditions: [
      {
        id: "c1",
        label: t("Валюта", "Valyuta", "Currency"),
        value: isFx ? t("Доллары США", "AQSH dollari", "US dollars") : t("Сумы", "So‘m", "Uzbek soum"),
      },
      {
        id: "c2",
        label: t("Открытие", "Ochish", "Opening"),
        value: t("Онлайн, в офисе", "Onlayn, ofisda", "Online, in office"),
        hint: t(
          "Можно открыть в приложении или в любом отделении банка",
          "Ilovada yoki istalgan bank bo‘limida ochish mumkin",
          "Can be opened in the app or at any branch"
        ),
      },
      {
        id: "c3",
        label: t("Пополнение", "To‘ldirish", "Top-up"),
        value: t("Нет", "Yo‘q", "No"),
      },
      {
        id: "c4",
        label: t("Срок действия", "Amal qilish muddati", "Term"),
        value: t(`${months * 30}–${months * 31} дней`, `${months * 30}–${months * 31} kun`, `${months * 30}–${months * 31} days`),
      },
      {
        id: "c5",
        label: t("Сумма", "Summa", "Amount"),
        value: t(
          formatMoney(minAmount, currency),
          formatMoney(minAmount, currency),
          formatMoney(minAmount, currency)
        ),
      },
      {
        id: "c6",
        label: t("Расходные операции", "Xarajat operatsiyalari", "Withdrawals"),
        value: t("Не предусмотрены", "Ko‘zda tutilmagan", "Not provided"),
      },
      {
        id: "c7",
        label: t("Пролонгация", "Uzaytirish", "Prolongation"),
        value: t(
          "До трех раз на условиях вклада «Моя выгода»",
          "«Mening foydam» omonati shartlarida uch martagacha",
          "Up to three times on “My benefit” terms"
        ),
      },
      {
        id: "c8",
        label: t("Выплата процентов", "Foiz to‘lovi", "Interest payment"),
        value: t(
          "В конце срока на счет вклада",
          "Muddat oxirida omonat hisobiga",
          "At maturity to the deposit account"
        ),
      },
      {
        id: "c9",
        label: t("Досрочное расторжение", "Muddatidan oldin bekor qilish", "Early termination"),
        value: t(
          "По ставке вклада «До востребования»",
          "«Talab qilib olguncha» stavkasi bo‘yicha",
          "At the demand deposit rate"
        ),
      },
      {
        id: "c10",
        label: t(
          "Закрытие вкладов свыше 2,5 млн ₽",
          "2,5 mln dan oshiq omonatlarni yopish",
          "Closing deposits over 2.5 million"
        ),
        value: t("В офисе банка", "Bank ofisida", "At a bank office"),
      },
    ],
    documentsTitle: t("Документы", "Hujjatlar", "Documents"),
    documents: [
      {
        id: "d1",
        title: t(
          "Условия по вкладу без пополнения и снятия",
          "To‘ldirish va yechib olishsiz omonat shartlari",
          "Terms for a deposit without top-ups or withdrawals"
        ),
        date: t("Действует с 01.09.2026", "01.09.2026 dan amal qiladi", "Effective from 01.09.2026"),
        href: "#",
      },
      {
        id: "d2",
        title: t(
          "Условия по вкладу с пополнением",
          "To‘ldirish bilan omonat shartlari",
          "Terms for a deposit with top-ups"
        ),
        date: t("Действует с 01.09.2026", "01.09.2026 dan amal qiladi", "Effective from 01.09.2026"),
        href: "#",
      },
      {
        id: "d3",
        title: t(
          "Условия по вкладу с пополнением и снятием",
          "To‘ldirish va yechib olish bilan omonat shartlari",
          "Terms for a deposit with top-ups and withdrawals"
        ),
        date: t("Действует с 01.09.2026", "01.09.2026 dan amal qiladi", "Effective from 01.09.2026"),
        href: "#",
      },
    ],
    documentLinks: [
      {
        id: "dl1",
        label: t("Правила оформления вкладов", "Omonatlarni rasmiylashtirish qoidalari", "Deposit processing rules"),
        href: "#",
      },
      {
        id: "dl2",
        label: t("Сборник тарифов", "Tariflar to‘plami", "Tariff booklet"),
        href: "#",
      },
    ],
    ...officesPageConfig,
    offers: {
      title: t("Предложения для вас", "Siz uchun takliflar", "Offers for you"),
      slides: [
        {
          id: "of1",
          tag: t("вклады и счета", "omonatlar va hisoblar", "deposits and accounts"),
          title: t(
            "Выгодные вклады от 18,99% годовых",
            "18,99% dan foydali omonatlar",
            "Deposits from 18.99% per year"
          ),
          image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&w=720&q=80",
          ctaText: t("Подробнее", "Batafsil", "Details"),
          href: "/vklady",
        },
        {
          id: "of2",
          tag: t("банк рядом", "bank yonida", "bank nearby"),
          title: t(
            "Доставка банковских продуктов на дом",
            "Bank mahsulotlarini uyga yetkazib berish",
            "Home delivery of banking products"
          ),
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=720&q=80",
          ctaText: t("Оставить заявку", "Ariza qoldirish", "Leave a request"),
          href: "#",
        },
        {
          id: "of3",
          tag: t("Дебетовая карта", "Debet karta", "Debit card"),
          title: t("С кешбеком до 15%", "15% gacha keshbek", "Cashback up to 15%"),
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=720&q=80",
          ctaText: t("Подробнее", "Batafsil", "Details"),
          href: "#",
        },
        {
          id: "of4",
          tag: t("зарплатная карта", "maosh kartasi", "salary card"),
          title: t(
            "+2% годовых к ставке накопительного счета",
            "Jamg‘arma hisobi stavkasiga +2% yillik",
            "+2% per year to the savings account rate"
          ),
          image: "https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?auto=format&fit=crop&w=720&q=80",
          ctaText: t("Подробнее", "Batafsil", "Details"),
          href: "#",
        },
      ],
    },
    faqTitle: t("Частые вопросы", "Tez-tez so‘raladigan savollar", "Frequently asked questions"),
    faq: [
      {
        id: "q1",
        question: t("Где можно открыть вклад?", "Omonatni qayerda ochish mumkin?", "Where can I open a deposit?"),
        answer: t(
          "Вклад можно открыть онлайн в мобильном приложении или в любом отделении банка.",
          "Omonatni mobil ilovada onlayn yoki istalgan bank bo‘limida ochish mumkin.",
          "You can open a deposit online in the mobile app or at any bank branch."
        ),
      },
      {
        id: "q2",
        question: t(
          "Можно ли изменить периодичность выплаты процентов по открытому вкладу?",
          "Ochiq omonat bo‘yicha foiz to‘lash davriyligini o‘zgartirish mumkinmi?",
          "Can I change the interest payment frequency on an open deposit?"
        ),
        answer: t(
          "Периодичность фиксируется при открытии. Изменение возможно только при заключении нового договора.",
          "Davriylik ochishda belgilanadi. O‘zgartirish faqat yangi shartnoma tuzishda mumkin.",
          "The frequency is fixed at opening and can only be changed by signing a new agreement."
        ),
      },
      {
        id: "q3",
        question: t(
          "Можно ли изменить опции пополнения и снятия по открытому вкладу?",
          "Ochiq omonat bo‘yicha to‘ldirish va yechib olish opsiyalarini o‘zgartirish mumkinmi?",
          "Can I change top-up and withdrawal options on an open deposit?"
        ),
        answer: t(
          "Опции выбираются при открытии и далее не меняются. Для других условий откройте новый вклад.",
          "Opsiyalar ochishda tanlanadi va keyin o‘zgarmaydi. Boshqa shartlar uchun yangi omonat oching.",
          "Options are selected at opening and cannot be changed later. Open a new deposit for other terms."
        ),
      },
      {
        id: "q4",
        question: t(
          "Можно ли снимать деньги и пополнять вклад?",
          "Pul yechib olish va omonatni to‘ldirish mumkinmi?",
          "Can I withdraw money and top up the deposit?"
        ),
        answer: t(
          "Это зависит от выбранного продукта. В калькуляторе отметьте нужные опции и сравните подходящие вклады.",
          "Bu tanlangan mahsulotga bog‘liq. Kalkulyatorda kerakli opsiyalarni belgilab, mos omonatlarni solishtiring.",
          "It depends on the product. Mark the options in the calculator and compare matching deposits."
        ),
      },
      {
        id: "q5",
        question: t(
          "Как я могу снять наличные с вклада?",
          "Omonatdan naqd pulni qanday yechib olaman?",
          "How can I withdraw cash from the deposit?"
        ),
        answer: t(
          "После закрытия вклада средства поступают на счет. Наличные можно снять в кассе отделения или банкомате.",
          "Omonat yopilgach, mablag‘ hisobga o‘tkaziladi. Naqd pulni bo‘lim kassasi yoki bankomatdan olish mumkin.",
          "After closing, funds go to your account. Cash can be withdrawn at a teller or ATM."
        ),
      },
      {
        id: "q6",
        question: t(
          "Нужно ли заказывать наличные при снятии денег в отделении банка? Как заказать наличные?",
          "Bo‘limda pul yechishda naqd pul buyurtma qilish kerakmi? Qanday buyurtma beriladi?",
          "Do I need to order cash for a branch withdrawal? How do I order it?"
        ),
        answer: t(
          "Крупные суммы лучше заказать заранее через приложение или контакт-центр, чтобы деньги были в кассе в нужный день.",
          "Katta summalarni ilova yoki kontakt-markaz orqali oldindan buyurtma qilish tavsiya etiladi.",
          "For large amounts, order cash in advance via the app or contact center."
        ),
      },
      {
        id: "q7",
        question: t(
          "Есть ли комиссия за снятие наличных с вклада?",
          "Omonatdan naqd pul yechish uchun komissiya bormi?",
          "Is there a fee for cash withdrawals from a deposit?"
        ),
        answer: t(
          "Комиссия зависит от тарифов и канала снятия. Актуальные ставки смотрите в сборнике тарифов.",
          "Komissiya tariflar va yechish kanaliga bog‘liq. Joriy stavkalar tariflar to‘plamida.",
          "Fees depend on tariffs and the withdrawal channel. See the tariff booklet for current rates."
        ),
      },
    ],
    faqMoreText: t("Еще 16 вопросов", "Yana 16 ta savol", "16 more questions"),
    footer: depositsPageConfig.footer,
  };

  const details = product.details;
  if (!details) return generated;

  return {
    ...generated,
    ...details,
    product,
    breadcrumbs: generated.breadcrumbs,
    suggested: generated.suggested,
    offers: generated.offers,
    footer: generated.footer,
    calculatorChannels: generated.calculatorChannels,
  };
}
