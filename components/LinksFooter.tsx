import React from "react";

const footerLinksData = [
  {
    title: "ЧАСТНЫМ ЛИЦАМ",
    sections: [
      {
        subtitle: "Страхование",
        items: [
          "ОСАГО",
          "Каско",
          "Каско по подписке",
          "Путешествия за границу",
          "Ипотека",
          "Квартира",
          "Здоровье",
          "Блог",
        ],
      },
    ],
  },
  {
    title: "ИП И БИЗНЕСУ",
    sections: [
      {
        subtitle: "Малый бизнес",
        items: [
          "Расчетный счет",
          "Регистрация бизнеса",
          "Эквайринг",
          "Кредиты",
          "Госсзакупки",
          "Продажи",
          "Бухгалтерия",
          "Бизнес-карта",
          "Депозиты",
          "Рассрочки",
          "Проверка контрагентов",
          "Бонусы для бизнеса",
          "КЭДО",
          "Лизинг",
        ],
      },
    ],
  },
  {
    title: "ЕЩЕ",
    sections: [
      {
        subtitle: "Карьера",
        items: ["Работа в IT", "Бизнес и процессы", "Работа с клиентами"],
      },
    ],
  },
];

export default function LinksFooter() {
  return (
    <footer className="bg-[#F6F7F8] w-full mt-[80px]">
      <div className="mx-auto py-16 max-w-[1104px]">
        <div className="grid grid-cols-1 md:grid-cols-[192px_192px_192px] gap-x-12 gap-y-16 border-t border-[#0010241F] pt-[32px]">
          {footerLinksData.map((column) => (
            <div key={column.title} className="space-y-[20px]">
              <h4 className="text-xs font-semibold uppercase text-stone-500 tracking-wider">
                {column.title}
              </h4>
              {column.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-[13px]">
                  <h5 className="text-sm font-semibold text-stone-900">
                    {section.subtitle}
                  </h5>
                  <ul className="space-y-3.5">
                    {section.items.map((linkText) => (
                      <li key={linkText}>
                        <a
                          href="#"
                          className="text-sm text-stone-700 hover:text-stone-950 transition duration-150 ease-in-out"
                        >
                          {linkText}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
