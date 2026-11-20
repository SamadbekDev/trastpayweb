import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Контакты и реквизиты",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "Головной офис ЧАБ «Трастбанк» (г. Ташкент, ул. Навои, 7), колл-центр 1287, телефон доверия, ИНН 201055090, МФО 00491, SWIFT TRSAUZ22.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
