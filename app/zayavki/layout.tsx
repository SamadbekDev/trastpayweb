import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Онлайн-заявки",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "Подайте онлайн-заявку на выпуск банковской карты, получение кредита, открытие расчётного счёта для бизнеса или отправьте обращение в ЧАБ «Трастбанк».",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
