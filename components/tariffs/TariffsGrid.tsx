"use client";

import Link from "next/link";
import { TariffsAudienceContent } from "@/types/tariffs";

interface TariffsGridProps {
  content: TariffsAudienceContent;
  detailLinkLabel: string;
}

export default function TariffsGrid({
  content,
  detailLinkLabel,
}: TariffsGridProps) {
  return (
    <section className="w-full bg-[#F6F8FC]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-4 py-10 sm:px-8 lg:px-[120px]">
        <div className="flex w-full max-w-[1200px] flex-col gap-[26px]">
          <div className="flex max-w-[1150px] flex-col gap-3">
            <h2 className="text-[28px] font-bold leading-[1.3] text-[#12122B] sm:text-[34px] sm:leading-[44px]">
              {content.sectionTitle}
            </h2>
            <p className="text-[16px] font-normal leading-[19px] text-[#6B7280]">
              {content.sectionHint}
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.cards.map((card) => (
              <article
                key={card.id}
                className="box-border flex min-h-[176px] flex-col justify-between rounded-[18px] border border-[#E7EAF0] bg-white px-[22px] py-7"
              >
                <h3 className="max-w-[340px] text-[18px] font-bold leading-[22px] text-[#12122B]">
                  {card.title}
                </h3>
                <Link
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    card.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="mt-8 inline-flex text-[15px] font-semibold leading-[18px] text-[#3261EC] transition-opacity hover:opacity-70"
                >
                  {detailLinkLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
