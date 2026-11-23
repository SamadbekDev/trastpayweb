import { Fragment } from "react";
import { CreditPageContent, CreditProduct } from "@/types/credits";
import { I18nText } from "@/types/pageConfig";

export function buildCreditStats({
  product,
  page,
  text,
  statLabels,
}: {
  product?: CreditProduct;
  page: CreditPageContent;
  text: (value?: I18nText | string | null) => string;
  statLabels?: { rate: I18nText; amount: I18nText; term: I18nText };
}) {
  if (!product) return [];
  const downPayment =
    page.calculator?.downMin != null && page.calculator.downMin > 0
      ? `${text({ ru: "от", uz: "", en: "from" })} ${page.calculator.downMin}%${text({ ru: "", uz: " dan", en: "" })}`
      : "";
  return [
    { id: "amount", value: text(product.amount), label: text(statLabels?.amount) || text({ ru: "Сумма кредита", uz: "Kredit summasi", en: "Loan amount" }) },
    { id: "term", value: text(product.term), label: text(statLabels?.term) || text({ ru: "Срок кредита", uz: "Kredit muddati", en: "Loan term" }) },
    { id: "rate", value: text(product.rate), label: text(statLabels?.rate) || text({ ru: "Процентная ставка", uz: "Foiz stavkasi", en: "Interest rate" }) },
    { id: "down", value: downPayment, label: text({ ru: "Первоначальный взнос", uz: "Boshlang‘ich badal", en: "Down payment" }) },
  ].filter((item) => item.value);
}

/**
 * Figma «Вариант · Госпрограмма» (1240×259)
 * hero title: 28/34 bold uppercase #fff
 * value: 30/36 bold #1A1A1A
 * label: 16/19 regular #9AA0A6
 * fact gap: 10px · columns gap: 24px · pad: 40×56
 */
export default function CreditProductStats({
  header,
  items,
  headerBg = "#0D2F56",
}: {
  header?: string;
  items: Array<{ id: string; value: string; label: string }>;
  /** Figma micro: #2D6EE3; mortgage/auto default #0D2F56 */
  headerBg?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="bg-white px-4 pb-10 lg:px-[100px]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col overflow-hidden rounded-[28px] border border-[rgba(0,0,0,0.12)]">
        {header ? (
          <div
            className="relative flex min-h-[112px] items-center justify-center overflow-hidden px-6 py-6 lg:h-[112px] lg:py-0"
            style={{ backgroundColor: headerBg }}
          >
            <p
              className="relative z-10 max-w-[572px] text-center font-bold uppercase text-white text-[22px] leading-[28px] lg:text-[28px] lg:leading-8"
              style={{ fontWeight: 700 }}
            >
              {header}
            </p>
          </div>
        ) : null}

        <div className="box-border flex flex-col gap-6 bg-white px-6 py-8 lg:h-[147px] lg:flex-row lg:items-center lg:gap-6 lg:px-14 lg:py-10">
          {items.map((item, index) => (
            <Fragment key={item.id}>
              {index > 0 ? (
                <div
                  className="hidden h-16 w-px shrink-0 bg-[#ECECEC] lg:block"
                  aria-hidden
                />
              ) : null}
              {index > 0 ? (
                <div className="h-px w-full bg-[#ECECEC] lg:hidden" aria-hidden />
              ) : null}
              <div className="flex min-w-0 flex-1 flex-col items-center gap-2.5 text-center">
                <p className="text-[24px] font-bold leading-8 text-[#1A1A1A] lg:text-[30px] lg:leading-9">
                  {item.value}
                </p>
                <p className="text-[14px] font-normal leading-[19px] text-[#9AA0A6] lg:text-[16px]">
                  {item.label}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
