import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Обращения граждан и приём руководством",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "График приёма граждан руководством ЧАБ «Трастбанк», проверка статуса обращения, статистика и уголок потребителя.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
