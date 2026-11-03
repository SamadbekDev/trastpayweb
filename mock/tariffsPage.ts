import { TariffsPageConfig } from "@/types/tariffs";

export const tariffsPageConfig: TariffsPageConfig = {
  detailLinkLabel: "Подробнее - PDF ↗",
  individual: {
    title: "Тарифы для частных клиентов",
    description:
      "Стоимость услуг для физических лиц, депозитарных ячеек и карт. Полные условия — в PDF-файле каждого тарифа.",
    quickLinksTitle: "Частным клиентам",
    quickLinks: [
      {
        id: "card-app",
        label: "Онлайн-заявка на карту ↗",
        href: "/karty",
      },
      {
        id: "credit-app",
        label: "Онлайн-заявка на кредит ↗",
        href: "/kredity",
      },
      {
        id: "rates",
        label: "Курсы валют ↗",
        href: "/#currency",
      },
    ],
    sectionTitle: "Тарифы и тарифные планы",
    sectionHint: "Нажмите «Подробнее», чтобы открыть тариф в PDF",
    cards: [
      {
        id: "individuals",
        title: "Тарифы для физических лиц",
        href: "#",
      },
      {
        id: "safe-deposit",
        title: "Тарифы депозитарные ячейки",
        href: "#",
      },
      {
        id: "visa",
        title: "Тарифы VISA",
        href: "#",
      },
      {
        id: "visa-electron-exchange",
        title: "Тарифы VISA Electron - Exchange",
        href: "#",
      },
      {
        id: "visa-classic-exchange",
        title: "Тарифы Visa Classic - Exchange",
        href: "#",
      },
      {
        id: "mc-gold",
        title: "Тарифы MasterCard Gold",
        href: "#",
      },
      {
        id: "mc-standard-exchange",
        title: "Тарифы MasterCard Standard - Exchange",
        href: "#",
      },
      {
        id: "mc-standard",
        title: "Тарифы MasterCard Standard",
        href: "#",
      },
      {
        id: "visa-classic-virtual",
        title: "Тарифы Visa Classic Virtual",
        href: "#",
      },
    ],
  },
  corporate: {
    title: "Тарифы для корпоративных клиентов",
    description:
      "Стоимость услуг для юридических лиц. Полные условия — в PDF-файле каждого тарифного плана.",
    quickLinksTitle: "Для вашего бизнеса",
    quickLinks: [
      {
        id: "account",
        label: "Открыть расчётный счёт ↗",
        href: "#",
      },
      {
        id: "finance",
        label: "Подобрать финансирование ↗",
        href: "/kredity",
      },
      {
        id: "payroll",
        label: "Подключить зарплатный проект ↗",
        href: "#",
      },
    ],
    sectionTitle: "Тарифы и тарифные планы",
    sectionHint: "Нажмите «Подробнее», чтобы открыть тариф в PDF",
    cards: [
      {
        id: "exclusive",
        title: "Тарифный план «Exclusive»",
        href: "#",
      },
      {
        id: "standart",
        title: "Тарифный план «Standart»",
        href: "#",
      },
      {
        id: "currency",
        title: "Тарифный план «Валютный»",
        href: "#",
      },
      {
        id: "uzex-fx",
        title: "Тарифный план «UzEX» валюта",
        href: "#",
      },
      {
        id: "uzex-uzs",
        title: "Тарифный план «UzEX» (сум)",
        href: "#",
      },
      {
        id: "digital-branch",
        title: "Тарифы для филиала Цифровой",
        href: "#",
      },
      {
        id: "bhm",
        title: "Тарифный план «БХМ»",
        href: "#",
      },
    ],
  },
};
