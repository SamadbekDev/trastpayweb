import { TariffsPageConfig } from "@/types/tariffs";

const t = (ru: string, uz = "", en = "") => ({
  ru,
  uz: uz || ru,
  en: en || ru,
});

export const tariffsPageConfig: TariffsPageConfig = {
  detailLinkLabel: t(
    "Подробнее - PDF ↗",
    "Batafsil - PDF ↗",
    "Details - PDF ↗"
  ),
  individual: {
    title: t(
      "Тарифы для частных клиентов",
      "Jismoniy shaxslar uchun tariflar",
      "Tariffs for private clients"
    ),
    description: t(
      "Стоимость услуг для физических лиц, депозитарных ячеек и карт. Полные условия — в PDF-файле каждого тарифа.",
      "Jismoniy shaxslar, depozitar katakchalar va kartalar xizmatlari narxi. To‘liq shartlar har bir tarif PDF faylida.",
      "Service fees for individuals, safe-deposit boxes and cards. Full terms are in each tariff PDF."
    ),
    quickLinksTitle: t(
      "Частным клиентам",
      "Jismoniy shaxslarga",
      "For private clients"
    ),
    quickLinks: [
      {
        id: "card-app",
        label: t(
          "Онлайн-заявка на карту ↗",
          "Kartaga onlayn ariza ↗",
          "Online card application ↗"
        ),
        href: "/karty",
      },
      {
        id: "credit-app",
        label: t(
          "Онлайн-заявка на кредит ↗",
          "Kreditga onlayn ariza ↗",
          "Online loan application ↗"
        ),
        href: "/kredity",
      },
      {
        id: "rates",
        label: t("Курсы валют ↗", "Valyuta kurslari ↗", "Exchange rates ↗"),
        href: "/#currency",
      },
    ],
    sectionTitle: t(
      "Тарифы и тарифные планы",
      "Tariflar va tarif rejalari",
      "Tariffs and tariff plans"
    ),
    sectionHint: t(
      "Нажмите «Подробнее», чтобы открыть тариф в PDF",
      "Tarifni PDF da ochish uchun «Batafsil» ni bosing",
      "Click “Details” to open the tariff PDF"
    ),
    cards: [
      {
        id: "individuals",
        title: t(
          "Тарифы для физических лиц",
          "Jismoniy shaxslar tariflari",
          "Tariffs for individuals"
        ),
        href: "#",
      },
      {
        id: "safe-deposit",
        title: t(
          "Тарифы депозитарные ячейки",
          "Depozitar katakchalar tariflari",
          "Safe-deposit box tariffs"
        ),
        href: "#",
      },
      {
        id: "visa",
        title: t("Тарифы VISA", "VISA tariflari", "VISA tariffs"),
        href: "#",
      },
      {
        id: "visa-electron-exchange",
        title: t(
          "Тарифы VISA Electron - Exchange",
          "VISA Electron - Exchange tariflari",
          "VISA Electron - Exchange tariffs"
        ),
        href: "#",
      },
      {
        id: "visa-classic-exchange",
        title: t(
          "Тарифы Visa Classic - Exchange",
          "Visa Classic - Exchange tariflari",
          "Visa Classic - Exchange tariffs"
        ),
        href: "#",
      },
      {
        id: "mc-gold",
        title: t(
          "Тарифы MasterCard Gold",
          "MasterCard Gold tariflari",
          "MasterCard Gold tariffs"
        ),
        href: "#",
      },
      {
        id: "mc-standard-exchange",
        title: t(
          "Тарифы MasterCard Standard - Exchange",
          "MasterCard Standard - Exchange tariflari",
          "MasterCard Standard - Exchange tariffs"
        ),
        href: "#",
      },
      {
        id: "mc-standard",
        title: t(
          "Тарифы MasterCard Standard",
          "MasterCard Standard tariflari",
          "MasterCard Standard tariffs"
        ),
        href: "#",
      },
      {
        id: "visa-classic-virtual",
        title: t(
          "Тарифы Visa Classic Virtual",
          "Visa Classic Virtual tariflari",
          "Visa Classic Virtual tariffs"
        ),
        href: "#",
      },
    ],
  },
  corporate: {
    title: t(
      "Тарифы для корпоративных клиентов",
      "Korporativ mijozlar uchun tariflar",
      "Tariffs for corporate clients"
    ),
    description: t(
      "Стоимость услуг для юридических лиц. Полные условия — в PDF-файле каждого тарифного плана.",
      "Yuridik shaxslar uchun xizmatlar narxi. To‘liq shartlar har bir tarif rejasi PDF faylida.",
      "Service fees for legal entities. Full terms are in each tariff plan PDF."
    ),
    quickLinksTitle: t(
      "Для вашего бизнеса",
      "Biznesingiz uchun",
      "For your business"
    ),
    quickLinks: [
      {
        id: "account",
        label: t(
          "Открыть расчётный счёт ↗",
          "Hisob raqam ochish ↗",
          "Open a current account ↗"
        ),
        href: "#",
      },
      {
        id: "finance",
        label: t(
          "Подобрать финансирование ↗",
          "Moliyalashtirishni tanlash ↗",
          "Choose financing ↗"
        ),
        href: "/kredity",
      },
      {
        id: "payroll",
        label: t(
          "Подключить зарплатный проект ↗",
          "Ish haqi loyihasini ulash ↗",
          "Connect a payroll project ↗"
        ),
        href: "#",
      },
    ],
    sectionTitle: t(
      "Тарифы и тарифные планы",
      "Tariflar va tarif rejalari",
      "Tariffs and tariff plans"
    ),
    sectionHint: t(
      "Нажмите «Подробнее», чтобы открыть тариф в PDF",
      "Tarifni PDF da ochish uchun «Batafsil» ni bosing",
      "Click “Details” to open the tariff PDF"
    ),
    cards: [
      {
        id: "exclusive",
        title: t(
          "Тарифный план «Exclusive»",
          "«Exclusive» tarif rejasi",
          "Tariff plan “Exclusive”"
        ),
        href: "#",
      },
      {
        id: "standart",
        title: t(
          "Тарифный план «Standart»",
          "«Standart» tarif rejasi",
          "Tariff plan “Standart”"
        ),
        href: "#",
      },
      {
        id: "currency",
        title: t(
          "Тарифный план «Валютный»",
          "«Valyuta» tarif rejasi",
          "Tariff plan “Currency”"
        ),
        href: "#",
      },
      {
        id: "uzex-fx",
        title: t(
          "Тарифный план «UzEX» валюта",
          "«UzEX» valyuta tarif rejasi",
          "Tariff plan “UzEX” FX"
        ),
        href: "#",
      },
      {
        id: "uzex-uzs",
        title: t(
          "Тарифный план «UzEX» (сум)",
          "«UzEX» (so‘m) tarif rejasi",
          "Tariff plan “UzEX” (UZS)"
        ),
        href: "#",
      },
      {
        id: "digital-branch",
        title: t(
          "Тарифы для филиала Цифровой",
          "Raqamli filial tariflari",
          "Digital branch tariffs"
        ),
        href: "#",
      },
      {
        id: "bhm",
        title: t(
          "Тарифный план «БХМ»",
          "«BHM» tarif rejasi",
          "Tariff plan “BHM”"
        ),
        href: "#",
      },
    ],
  },
};
