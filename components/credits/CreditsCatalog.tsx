"use client";

import { useMemo, useState } from "react";
import { CreditsPageConfig } from "@/types/credits";
import { useCreditText } from "./text";
import CreditProductCard from "./CreditProductCard";

function creditCountLabel(count: number) {
  const n = Math.abs(count) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return `${count} продуктов`;
  if (n1 > 1 && n1 < 5) return `${count} продукта`;
  if (n1 === 1) return `${count} продукт`;
  return `${count} продуктов`;
}

export default function CreditsCatalog({ config }: { config: CreditsPageConfig }) {
  const text = useCreditText();
  const [activeTab, setActiveTab] = useState(config.tabs[0]?.id || "all");

  const visibleGroups = useMemo(() => {
    return config.groups
      .map((group) => {
        const products = config.products.filter((product) => {
          if (product.groupId !== group.id) return false;
          if (activeTab === "all") return true;
          return product.groupId === activeTab;
        });
        return { group, products };
      })
      .filter(({ products }) => products.length > 0);
  }, [activeTab, config.groups, config.products]);

  return (
    <div className="w-full bg-[#FAFAFA]">
      <header className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-6 px-4 py-8 lg:px-[120px]">
        <h1 className="text-[32px] font-bold leading-[40px] text-[#0F1F3D] sm:text-[40px] sm:leading-[48px]">
          {text(config.title)}
        </h1>

        <div className="flex w-full max-w-[1200px] flex-wrap items-start gap-2.5">
          {config.tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex cursor-pointer items-center rounded-full px-[18px] py-[11px] text-[14px] leading-[17px] ${
                  isActive
                    ? "bg-[#0F1F3D] font-semibold text-white"
                    : "border border-[#E2E8F2] bg-[#F4F7FB] font-medium text-[#0F1F3D]"
                }`}
              >
                {text(tab.label)}
              </button>
            );
          })}
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-12 px-4 pb-16 pt-4 lg:px-20">
        {visibleGroups.map(({ group, products }) => (
          <section key={group.id} className="flex w-full flex-col items-start gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-[26px] font-bold leading-9 text-[#0F1F3D] sm:text-[30px]">
                {text(group.title)}
              </h2>
              <span
                className="inline-flex items-start rounded-full px-3 py-[5px] text-[13px] font-semibold leading-4"
                style={{ backgroundColor: group.badgeBg, color: group.accent }}
              >
                {creditCountLabel(products.length)}
              </span>
            </div>

            <div className="flex w-full flex-col gap-6">
              {products.map((product) => (
                <CreditProductCard
                  key={product.id}
                  product={product}
                  theme={group}
                  statLabels={config.statLabels}
                  primaryCta={text(config.primaryCta)}
                  secondaryCta={text(config.secondaryCta)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="flex w-full items-center bg-[#0F1F3D] px-4 py-7 lg:px-[120px]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] font-normal leading-4 text-[#8CA0C0]">{text(config.footerNote)}</p>
          <p className="text-[13px] font-normal leading-4 text-[#8CA0C0]">{text(config.footerSource)}</p>
        </div>
      </footer>
    </div>
  );
}
