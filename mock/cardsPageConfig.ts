import { CardsPageConfig } from "@/types/cards";

const t = (ru: string, uz: string, en: string) => ({ ru, uz, en });

const ph = (w: number, h: number, text: string, bg = "dbe7ff", fg = "1f3fbf") =>
  `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(text)}`;

const rateLabel = t("Ставка, годовых", "Yillik stavka", "Annual rate");
const amountLabel = t("Сумма вклада", "Omonat summasi", "Deposit amount");
const termLabel = t("Срок", "Muddat", "Term");
const primaryCta = t("Подробнее", "Batafsil", "Details");
const secondaryCta = t("Стать клиентом", "Mijoz bo‘lish", "Become a client");

export const cardsPageConfig: CardsPageConfig = {
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

  title: t("Все типы карт", "Barcha karta turlari", "All card types"),

  tabs: [
    {
      id: "all",
      label: t("Все карты", "Barcha kartalar", "All cards"),
      filter: "all",
    },
    {
      id: "sum",
      label: t("Суммовые карты", "So‘m kartalar", "UZS cards"),
      filter: "sum",
    },
    {
      id: "fx",
      label: t("Валютные карты", "Valyuta kartalari", "FX cards"),
      filter: "fx",
    },
    {
      id: "credit",
      label: t("Кредитные карты", "Kredit kartalari", "Credit cards"),
      filter: "credit",
    },
  ],

  groups: [
    {
      id: "debit",
      title: t("Дебетовые карты", "Debet kartalar", "Debit cards"),
      badge: t("5 типов карт", "5 ta karta turi", "5 card types"),
    },
    {
      id: "uzcard",
      title: t("UzCard/Humo карты", "UzCard/Humo kartalar", "UzCard/Humo cards"),
      badge: t("4 типа карт", "4 ta karta turi", "4 card types"),
    },
  ],

  products: [
    {
      id: "visa-infinity",
      category: "sum",
      groupId: "debit",
      title: t("Visa Infinity", "Visa Infinity", "Visa Infinity"),
      description: t(
        "Классический срочный вклад в отделении, максимальная ставка",
        "Bo‘limdagi klassik muddatli omonat, maksimal stavka",
        "Classic term product in a branch, maximum rate"
      ),
      rate: t("До 23%", "23% gacha", "Up to 23%"),
      rateLabel,
      amount: t("От 500 000 сум", "500 000 so‘mdan", "From 500,000 UZS"),
      amountLabel,
      term: t("24 мес", "24 oy", "24 mo."),
      termLabel,
      primaryCta,
      secondaryCta,
      secondaryHref: "#",
      image: ph(348, 218, "Visa+Infinity", "1a1a2e", "ffffff"),
    },
    {
      id: "visa",
      category: "sum",
      groupId: "debit",
      title: t("Visa", "Visa", "Visa"),
      description: t(
        "Классический срочный вклад в отделении, максимальная ставка",
        "Bo‘limdagi klassik muddatli omonat, maksimal stavka",
        "Classic term product in a branch, maximum rate"
      ),
      rate: t("До 23%", "23% gacha", "Up to 23%"),
      rateLabel,
      amount: t("От 500 000 сум", "500 000 so‘mdan", "From 500,000 UZS"),
      amountLabel,
      term: t("24 мес", "24 oy", "24 mo."),
      termLabel,
      primaryCta,
      secondaryCta,
      secondaryHref: "#",
      image: ph(348, 218, "Visa", "2d6ee3", "ffffff"),
    },
    {
      id: "maksadli",
      category: "sum",
      groupId: "debit",
      title: t("Максадли", "Maqsadli", "Maksadli"),
      description: t(
        "Классический срочный вклад в отделении, максимальная ставка",
        "Bo‘limdagi klassik muddatli omonat, maksimal stavka",
        "Classic term product in a branch, maximum rate"
      ),
      rate: t("До 23%", "23% gacha", "Up to 23%"),
      rateLabel,
      amount: t("От 500 000 сум", "500 000 so‘mdan", "From 500,000 UZS"),
      amountLabel,
      term: t("24 мес", "24 oy", "24 mo."),
      termLabel,
      primaryCta,
      secondaryCta,
      secondaryHref: "#",
      image: ph(348, 218, "Maksadli", "cfe0ff", "1a4fd6"),
    },
    {
      id: "maksadli-2",
      category: "sum",
      groupId: "debit",
      title: t("Максадли", "Maqsadli", "Maksadli"),
      description: t(
        "Классический срочный вклад в отделении, максимальная ставка",
        "Bo‘limdagi klassik muddatli omonat, maksimal stavka",
        "Classic term product in a branch, maximum rate"
      ),
      rate: t("До 23%", "23% gacha", "Up to 23%"),
      rateLabel,
      amount: t("От 500 000 сум", "500 000 so‘mdan", "From 500,000 UZS"),
      amountLabel,
      term: t("24 мес", "24 oy", "24 mo."),
      termLabel,
      primaryCta,
      secondaryCta,
      secondaryHref: "#",
      image: ph(348, 218, "Card", "e8f1ff", "2d6ee3"),
    },
    {
      id: "debit-extra",
      category: "credit",
      groupId: "debit",
      title: t("Visa Credit", "Visa Credit", "Visa Credit"),
      description: t(
        "Кредитная карта с льготным периодом",
        "Imtiyozli davrli kredit karta",
        "Credit card with a grace period"
      ),
      rate: t("До 0%", "0% gacha", "Up to 0%"),
      rateLabel,
      amount: t("От 1 000 000 сум", "1 000 000 so‘mdan", "From 1,000,000 UZS"),
      amountLabel,
      term: t("36 мес", "36 oy", "36 mo."),
      termLabel,
      primaryCta,
      secondaryCta,
      secondaryHref: "#",
      image: ph(348, 218, "Credit", "110c30", "ffffff"),
    },
    {
      id: "kulay-1",
      category: "fx",
      groupId: "uzcard",
      title: t("Кулай сармоя", "Kulay sarmoya", "Kulay sarmoya"),
      description: t(
        "Валютный вклад в долларах США с пополнением",
        "AQSH dollarida to‘ldirish mumkin omonat",
        "USD deposit with top-up"
      ),
      rate: t("До 7,5%", "7,5% gacha", "Up to 7.5%"),
      rateLabel,
      amount: t("От 500 $", "500 $ dan", "From $500"),
      amountLabel,
      term: t("18 мес", "18 oy", "18 mo."),
      termLabel,
      primaryCta,
      secondaryCta,
      secondaryHref: "#",
      image: ph(348, 218, "Gold", "c9a227", "ffffff"),
    },
    {
      id: "kulay-2",
      category: "fx",
      groupId: "uzcard",
      title: t("Кулай сармоя", "Kulay sarmoya", "Kulay sarmoya"),
      description: t(
        "Валютный вклад в долларах США с пополнением",
        "AQSH dollarida to‘ldirish mumkin omonat",
        "USD deposit with top-up"
      ),
      rate: t("До 7,5%", "7,5% gacha", "Up to 7.5%"),
      rateLabel,
      amount: t("От 500 $", "500 $ dan", "From $500"),
      amountLabel,
      term: t("18 мес", "18 oy", "18 mo."),
      termLabel,
      primaryCta,
      secondaryCta,
      secondaryHref: "#",
      image: ph(348, 218, "Blue", "2d6ee3", "ffffff"),
    },
    {
      id: "kulay-3",
      category: "fx",
      groupId: "uzcard",
      title: t("Кулай сармоя", "Kulay sarmoya", "Kulay sarmoya"),
      description: t(
        "Валютный вклад в долларах США с пополнением",
        "AQSH dollarida to‘ldirish mumkin omonat",
        "USD deposit with top-up"
      ),
      rate: t("До 7,5%", "7,5% gacha", "Up to 7.5%"),
      rateLabel,
      amount: t("От 500 $", "500 $ dan", "From $500"),
      amountLabel,
      term: t("18 мес", "18 oy", "18 mo."),
      termLabel,
      primaryCta,
      secondaryCta,
      secondaryHref: "#",
      image: ph(348, 218, "Navy", "0b1f3a", "ffffff"),
    },
    {
      id: "istiklol",
      category: "fx",
      groupId: "uzcard",
      title: t("Истиклол", "Istiqlol", "Istiklol"),
      description: t(
        "Валютный вклад в долларах с пополнением в первые 6 мес",
        "Birinchi 6 oyda to‘ldirish mumkin dollar omonati",
        "USD deposit with top-up in the first 6 months"
      ),
      rate: t("До 6%", "6% gacha", "Up to 6%"),
      rateLabel,
      amount: t("От 500 $", "500 $ dan", "From $500"),
      amountLabel,
      term: t("13 мес", "13 oy", "13 mo."),
      termLabel,
      primaryCta,
      secondaryCta,
      secondaryHref: "#",
      image: ph(348, 218, "UnionPay", "0f3d2e", "ffffff"),
    },
  ],
};
