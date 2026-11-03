"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { pageTransition } from "@/components/motion/pageTransition";
import {
  TariffAudience,
  TariffsAudienceContent,
} from "@/types/tariffs";

interface TariffsHeroProps {
  audience: TariffAudience;
  content: TariffsAudienceContent;
  onAudienceChange: (audience: TariffAudience) => void;
}

export default function TariffsHero({
  audience,
  content,
  onAudienceChange,
}: TariffsHeroProps) {
  return (
    <section className="w-full bg-[#1E7CFD]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-6 px-4 py-6 sm:px-8 lg:h-[480px] lg:px-[120px] lg:py-6">
        {/* Tabs — 400×69 */}
        <div className="flex h-[69px] w-full max-w-[400px] flex-col items-center justify-center py-3">
          <div
            className="flex h-[45px] w-full items-center justify-center gap-1 rounded-[14px] bg-[#EEEEF0] p-1"
            role="tablist"
            aria-label="Тип клиента"
          >
            <button
              type="button"
              role="tab"
              aria-selected={audience === "individual"}
              onClick={() => onAudienceChange("individual")}
              className={`flex h-[37px] flex-1 cursor-pointer items-center justify-center rounded-[10px] px-[18px] py-2.5 text-[14px] font-medium leading-[120%] transition-colors ${
                audience === "individual"
                  ? "bg-[#1E7CFD] text-white shadow-[0px_1px_2px_rgba(15,23,42,0.05)]"
                  : "bg-transparent text-[#64748B]"
              }`}
            >
              Физ. лицам
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={audience === "corporate"}
              onClick={() => onAudienceChange("corporate")}
              className={`flex h-[37px] flex-1 cursor-pointer items-center justify-center rounded-[10px] px-[18px] py-2.5 text-[14px] font-medium leading-[120%] transition-colors ${
                audience === "corporate"
                  ? "bg-[#1E7CFD] text-white shadow-[0px_1px_2px_rgba(15,23,42,0.05)]"
                  : "bg-transparent text-[#64748B]"
              }`}
            >
              Юр. лицам
            </button>
          </div>
        </div>

        {/* Content row — 1200×340, space-between */}
        <div className="relative w-full max-w-[1200px] self-stretch lg:h-[340px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={audience}
              className="flex w-full flex-col items-start justify-between gap-8 lg:h-[340px] lg:flex-row lg:items-center lg:gap-[328px]"
              initial={pageTransition.initial}
              animate={pageTransition.animate}
              exit={pageTransition.exit}
              transition={pageTransition.transition}
            >
              <div className="flex w-full max-w-[600px] flex-col items-start py-0 lg:h-[340px] lg:py-12">
                <div className="flex w-full max-w-[600px] flex-col items-start gap-4">
                  <h1 className="flex w-full max-w-[600px] items-center text-[36px] font-semibold leading-[1.08] text-white sm:text-[42px] lg:min-h-[100px] lg:text-[48px] lg:leading-[50px]">
                    {content.title}
                  </h1>
                  <p className="flex w-full max-w-[600px] items-center text-[16px] font-normal leading-[150%] text-[#C7D6EE] sm:text-[17px] lg:min-h-[52px]">
                    {content.description}
                  </p>
                </div>
              </div>

              <aside className="box-border flex h-auto w-full max-w-[352px] shrink-0 flex-col rounded-[18px] border border-[#E7EAF0] bg-white px-[26px] pb-8 pt-6 lg:h-[247px]">
                <h2 className="mb-[19px] text-[21px] font-bold leading-[25px] text-[#12122B]">
                  {content.quickLinksTitle}
                </h2>
                <ul className="flex flex-col gap-[21px]">
                  {content.quickLinks.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-8 items-center text-[15px] font-medium leading-[18px] text-[#122F60] transition-opacity hover:opacity-70"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
