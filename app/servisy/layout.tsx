import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Сервисы и дистанционное обслуживание",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "Trastpay, Интернет-банк, Trust Bank Business, Trast-Мобайл, SMS-Bank, коммунальные платежи и депозитарные ячейки ЧАБ «Трастбанк».",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
