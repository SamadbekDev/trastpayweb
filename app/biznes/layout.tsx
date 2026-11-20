import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Корпоративным клиентам и бизнесу",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "Решения ЧАБ «Трастбанк» для бизнеса: расчётный счёт и РКО, кредиты до 10 млрд сум, лизинг до 24%, банковские гарантии, факторинг, ВЭД и Trust Bank Business.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
