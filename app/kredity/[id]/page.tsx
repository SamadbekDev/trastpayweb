"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CreditAutoView from "@/components/credits/CreditAutoView";
import CreditDetailView from "@/components/credits/CreditDetailView";
import CreditMicroView from "@/components/credits/CreditMicroView";
import CreditMortgageView from "@/components/credits/CreditMortgageView";
import ContentReveal from "@/components/motion/ContentReveal";
import { TrastbankError, TrastbankLoader } from "@/components/PageStatus";
import { useCreditDetail, useCreditsPageConfig } from "@/hooks/useCreditsPageConfig";
import useHomePageConfig from "@/hooks/useHomePageConfig";
import { creditProductImage } from "@/components/credits/productImages";
import { mergeMicroPage } from "@/mock/microCreditPage";
import "@/i18n";

function isMicroProduct(product: { template?: string; groupId?: string } | undefined) {
  return product?.template === "micro" || product?.groupId === "micro";
}

export default function CreditDetailPage() {
  const params = useParams<{ id: string }>();
  const { config } = useHomePageConfig();
  const { config: catalog } = useCreditsPageConfig();
  const { detail, loading, notFound, refetch } = useCreditDetail(params.id);

  const page = useMemo(() => {
    if (!detail?.page || !detail.product) return detail?.page;
    const product = detail.product;
    const isMicro = isMicroProduct(product) || detail.page.template === "micro";
    if (isMicro) {
      const merged = mergeMicroPage(detail.page);
      return {
        ...merged,
        heroImage:
          detail.page.heroImage ||
          creditProductImage(product) ||
          product.image ||
          merged.heroImage ||
          "",
      };
    }
    return {
      ...detail.page,
      heroTitle: product.title,
      heroSubtitle: product.description,
      heroImage: detail.page.heroImage || creditProductImage(product) || product.image || "",
    };
  }, [detail]);

  if (loading) {
    return <TrastbankLoader />;
  }

  if (!detail && !notFound) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
        <TrastbankError onRetry={refetch} />
      </div>
    );
  }

  return (
    <ContentReveal className="flex min-h-screen flex-col bg-white">
      {config?.header ? <Header config={config.header} showProductNav={false} /> : null}
      <main className="flex-grow bg-white">
        {page ? (
          page.template === "mortgage" ? (
            <CreditMortgageView
              page={page}
              product={detail?.product}
              statLabels={catalog?.statLabels}
            />
          ) : page.template === "auto" ? (
            <CreditAutoView
              page={page}
              product={detail?.product}
              image={page.heroImage}
              heroVariant="showcase"
              statLabels={catalog?.statLabels}
            />
          ) : page.template === "micro" || isMicroProduct(detail?.product) ? (
            <CreditMicroView
              page={page}
              product={
                detail?.product
                  ? { ...detail.product, template: "micro" }
                  : undefined
              }
              statLabels={catalog?.statLabels}
            />
          ) : (
            <CreditDetailView
              page={page}
              product={detail?.product}
              statLabels={catalog?.statLabels}
            />
          )
        ) : (
          <div className="mx-auto w-full max-w-[1440px] px-4 py-16 lg:px-20">
            <p className="text-[16px] text-[#5B6B85]">Такого кредита нет в каталоге.</p>
            <Link
              href="/kredity"
              className="mt-6 inline-flex rounded-[10px] bg-[#0F1F3D] px-[26px] py-[14px] text-[15px] font-semibold leading-[18px] text-white"
            >
              Все кредиты
            </Link>
          </div>
        )}
      </main>
      {page && config?.footer ? <Footer config={config.footer} /> : null}
    </ContentReveal>
  );
}
