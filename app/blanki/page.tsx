"use client";

import Link from "next/link";
import { FileDown } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";
import { Breadcrumbs, PageHero } from "@/components/ui/PageKit";
import { pickText, useLang } from "@/hooks/useLang";
import { tr } from "@/i18n/tr";
import { PAGES_DICT } from "@/i18n/dict/pages";
import { UI_DICT } from "@/i18n/dict/ui";

const U = "https://trustbank.uz/upload/medialibrary";

/** Real files from the old trustbank.uz (corporate/client, services/blanks, about/vacancies). */
const BLANK_FORMS = [
  {
    categoryRu: "Кредитование и лизинг (Бизнес)",
    categoryUz: "Kreditlash va lizing (Biznes)",
    categoryEn: "Business Loans & Leasing",
    items: [
      { ru: "Заявка на получение кредита (PDF · 95.5 KB)", uz: "Kredit olish uchun ariza (PDF · 95.5 KB)", en: "Loan Application Form (PDF · 95.5 KB)", href: `${U}/926/Zayavka-na-poluchenie-kredita.pdf` },
      { ru: "Заявка на получение лизинга (PDF · 119 KB)", uz: "Lizing olish uchun ariza (PDF · 119 KB)", en: "Leasing Application Form (PDF · 119 KB)", href: `${U}/7cc/Zayavka-na-poluchenie-lizinga.pdf` },
      { ru: "Типовой кредитный договор без открытия кредитной линии (PDF · 305.5 KB)", uz: "Kredit liniyasi ochilmagan namunaviy kredit shartnomasi (PDF · 305.5 KB)", en: "Standard Loan Agreement w/o Credit Line (PDF)", href: `${U}/d8b/Kredit-liniyasi-ochilmagan-_olda-kreditlash-t_risida.pdf` },
      { ru: "Типовой кредитный договор с открытием кредитной линии (PDF · 305.8 KB)", uz: "Kredit liniyasi ochilgan namunaviy kredit shartnomasi (PDF · 305.8 KB)", en: "Standard Loan Agreement w/ Credit Line (PDF)", href: `${U}/a49/Kredit-liniyasi-ochilgan-_olda-kreditlash-t_risida.pdf` },
      { ru: "Типовой договор лизинга (PDF · 227.3 KB)", uz: "Namunaviy lizing shartnomasi (PDF · 227.3 KB)", en: "Standard Leasing Agreement (PDF)", href: `${U}/058/Lizing-shartnomasi.pdf` },
    ],
  },
  {
    categoryRu: "Зарплатный проект, терминалы и корпоративные карты",
    categoryUz: "Ish haqi loyihasi, terminallar va korporativ kartalar",
    categoryEn: "Payroll, Terminals & Corporate Cards",
    items: [
      { ru: "Договор по переводу зарплаты на пластиковые карты (PDF · 214.9 KB)", uz: "Ish haqini plastik kartalarga o‘tkazish shartnomasi (PDF · 214.9 KB)", en: "Payroll Transfer Agreement (PDF)", href: `${U}/f65/Ish-_a_i-va-unga-tenglashtirilgan-t_lovlarni-plastik-kartaga-utkazish-khakida-shartnoma.pdf` },
      { ru: "Платёжная ведомость по зарплатному проекту (PDF · 246.7 KB)", uz: "Ish haqi loyihasi bo‘yicha to‘lov vedomosti (PDF · 246.7 KB)", en: "Payroll Payment Statement Form (PDF)", href: `${U}/15c/Ish-_a_i-loyi_asi-b_yicha-t_lovni-zhismoniy-shakhslarning-plastik-karta-buyicha-makhsus-khisobvaragiga-utkazishga-oid-tulov-vedomost-shakli.pdf` },
      { ru: "Договор на обслуживание собственного терминала клиента, UZCARD (PDF · 283.6 KB)", uz: "Mijozning o‘z to‘lov terminaliga xizmat ko‘rsatish shartnomasi, UZCARD (PDF)", en: "Client-Owned Terminal Service Agreement, UZCARD (PDF)", href: `${U}/7d4/Mizhozning-_z-mulki-b_lgan-t_lov-terminaliga-khizmat-kursatish-tugrisida-shartnoma-_UZCARD_-_terminal-mizhozning-uziniki-bulganda_.pdf` },
      { ru: "Договор на аренду и обслуживание терминала, UZCARD (PDF · 290.8 KB)", uz: "To‘lov terminali ijarasi va xizmat ko‘rsatish shartnomasi, UZCARD (PDF)", en: "Terminal Rental & Service Agreement, UZCARD (PDF)", href: `${U}/289/T_lov-terminali-izharasi-va-unga-khizmat-k_rsatish-t_risida-shartnoma-_UZCARD_-_terminal-bank-tomonidan-berilganda_.pdf` },
      { ru: "Договор на ввод в эксплуатацию и обслуживание терминала, HUMO (PDF · 291.8 KB)", uz: "To‘lov terminalini foydalanishga topshirish va xizmat ko‘rsatish shartnomasi, HUMO (PDF)", en: "Terminal Commissioning & Service Agreement, HUMO (PDF)", href: `${U}/94a/T_lov-terminalini-foydalanishga-topshirish-va-unga-khizmat-kursatish-tugrisida-shartnoma-_HUMO_.pdf` },
      { ru: "Договор на обслуживание корпоративных карт для юридических лиц (PDF · 232.8 KB)", uz: "Yuridik shaxs korporativ kartasiga xizmat ko‘rsatish shartnomasi (PDF)", en: "Corporate Card Agreement for Legal Entities (PDF)", href: `${U}/894/YUridik-shakhs-korporativ-plastik-kartasiga-khizmat-k_rsatish-_a_ida-shartnoma.pdf` },
      { ru: "Договор на обслуживание корпоративных карт для ИП (PDF · 232.2 KB)", uz: "YaTT korporativ kartasiga xizmat ko‘rsatish shartnomasi (PDF)", en: "Corporate Card Agreement for Sole Proprietors (PDF)", href: `${U}/090/YAkka-tartibdagi-tadbirkor-korporativ-plastik-kartasiga-khizmat-kursatish-khakida-shartnoma.pdf` },
    ],
  },
  {
    categoryRu: "Валютные операции",
    categoryUz: "Valyuta operatsiyalari",
    categoryEn: "FX Operations",
    items: [
      { ru: "Публичная оферта по покупке и продаже иностранной валюты (PDF · 22 MB)", uz: "Xorijiy valyutani sotib olish va sotish bo‘yicha ommaviy oferta (PDF · 22 MB)", en: "Public Offer for FX Buy/Sell Services (PDF · 22 MB)", href: `${U}/72b/Publichnaya_oferta_na_okazanie_uslug_po_pokupke_i_prodazhe_inostrannoy.pdf` },
      { ru: "Заявление на покупку иностранной валюты (PDF · 2.7 MB)", uz: "Xorijiy valyutani sotib olish uchun ariza (PDF · 2.7 MB)", en: "FX Purchase Application (PDF · 2.7 MB)", href: `${U}/328/Zayavlenie_na_pokupku_inostrannoy_valyuty.pdf` },
      { ru: "Заявление на продажу иностранной валюты (PDF · 2.3 MB)", uz: "Xorijiy valyutani sotish uchun ariza (PDF · 2.3 MB)", en: "FX Sale Application (PDF · 2.3 MB)", href: `${U}/d83/Zayavlenie_na_prodazhu_inostrannoy_valyuty.pdf` },
    ],
  },
  {
    categoryRu: "Договоры по кредитам физических лиц",
    categoryUz: "Jismoniy shaxslar kreditlari bo‘yicha shartnomalar",
    categoryEn: "Retail Loan Agreements",
    items: [
      { ru: "Образец договора для микрозайма (PDF · 190.6 KB, на государственном языке)", uz: "Mikroqarz shartnomasi namunasi (PDF · 190.6 KB)", en: "Microloan Agreement Sample (PDF · 190.6 KB, Uzbek)", href: "https://trustbank.uz/download.php?f=Mikroqarz.pdf&i=43931" },
      { ru: "Образец договора потребительского кредита «Универсал» (PDF · 385.1 KB, на государственном языке)", uz: "«Universal» iste’mol krediti shartnomasi namunasi (PDF · 385.1 KB)", en: "«Universal» Consumer Loan Agreement Sample (PDF, Uzbek)", href: "https://trustbank.uz/download.php?f=Universal.pdf&i=43932" },
      { ru: "Образец договора по автокредиту (PDF · 245.5 KB, на государственном языке)", uz: "Avtokredit shartnomasi namunasi (PDF · 245.5 KB)", en: "Car Loan Agreement Sample (PDF · 245.5 KB, Uzbek)", href: "https://trustbank.uz/download.php?f=Avtokredit.pdf&i=43933" },
      { ru: "Заявление на открытие банковской карты (онлайн-заявка)", uz: "Bank kartasini ochish uchun ariza (onlayn)", en: "Bank Card Application (online)", href: "/zayavki?tab=card" },
      { ru: "Анкета-резюме кандидата (DOCX · 25.6 KB)", uz: "Bank so‘rovnomasi / rezyume (DOCX · 25.6 KB)", en: "Candidate Application Form (DOCX · 25.6 KB)", href: `${U}/536/Rezyume.docx` },
    ],
  },
];

export default function BlanksPage() {
  const lang = useLang();
  const t = (x: string) => tr(lang, x, PAGES_DICT, UI_DICT);

  return (
    <StaticPageShell>
      <section className="container-page pb-10 pt-6">
        <Breadcrumbs className="mb-6" items={[{ label: t("Главная"), href: "/" }, { label: t("Образцы бланков и типовых договоров") }]} />
        <PageHero eyebrow={pickText(lang, "Электронные формы", "Elektron shakllar", "Electronic Forms")} title={t("Образцы бланков и типовых договоров")} subtitle={pickText(
              lang,
              "Типовые формы заявлений и договоров ЧАБ «Трастбанк» для корпоративных и частных клиентов.",
              "«Trastbank» XAB korporativ va jismoniy shaxs mijozlari uchun ariza va shartnomalarning namunaviy shakllari.",
              "Standard application forms and agreement templates for corporate and private clients of Trastbank."
            )} />

        <div className="mt-10 flex flex-col gap-8">
          {BLANK_FORMS.map((group) => (
            <div
              key={group.categoryRu}
              className="rounded-panel border border-line bg-white p-6 lg:p-8"
            >
              <h2 className="text-[20px] font-bold text-ink">
                {pickText(lang, group.categoryRu, group.categoryUz, group.categoryEn)}
              </h2>
              <div className="mt-4 divide-y divide-line">
                {group.items.map((item) => (
                  <Link
                    key={item.ru}
                    href={item.href}
                    {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center justify-between gap-4 py-3.5 text-[14px] font-medium text-ink-soft transition-colors hover:text-primary"
                  >
                    <span>{pickText(lang, item.ru, item.uz, item.en)}</span>
                    <FileDown size={18} className="shrink-0 text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </StaticPageShell>
  );
}
