"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CreditAutoView from "@/components/credits/CreditAutoView";
import { TrastbankError, TrastbankLoader } from "@/components/PageStatus";
import { getCreditById, getCreditsPage } from "@/api/pageService";
import useHomePageConfig from "@/hooks/useHomePageConfig";
import { AUTO_BRANDS, AutoBrandSlug } from "@/components/credits/autoBrands";
import { CreditPageContent, CreditProduct, CreditTextItem } from "@/types/credits";
import { I18nText } from "@/types/pageConfig";

function hasText(value?: I18nText) {
  return Boolean(value && (value.ru || value.uz || value.en));
}

function findDealer(dealers: CreditTextItem[], brand: AutoBrandSlug) {
  const meta = AUTO_BRANDS.find((item) => item.slug === brand);
  if (!meta) return undefined;
  return dealers.find((item) => {
    const name = `${item.title.ru} ${item.title.uz} ${item.title.en}`;
    return (
      (meta.ids as readonly string[]).includes(item.id) ||
      meta.keys.some((key) => name.toLowerCase().includes(key))
    );
  });
}

export default function BrandCreditPage({ brand }: { brand: AutoBrandSlug }) {
  const { config } = useHomePageConfig();
  const [page, setPage] = useState<CreditPageContent | null>(null);
  const [product, setProduct] = useState<CreditProduct | undefined>();
  const [statLabels, setStatLabels] = useState<
    { rate: I18nText; amount: I18nText; term: I18nText } | undefined
  >();
  const [image, setImage] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setFailed(false);
      try {
        const catalog = await getCreditsPage();
        if (!cancelled) setStatLabels(catalog.statLabels);
      } catch {
        // labels optional
      }
      try {
        const own = await getCreditById(brand);
        if (!cancelled && own?.page) {
          setPage({
            ...own.page,
            heroTitle: own.product.title,
            heroSubtitle: own.product.description,
            heroImage: own.page.heroImage || own.product.image || "",
          });
          setProduct(own.product);
          setImage(own.page.heroImage || own.product.image);
          setLoading(false);
          return;
        }
      } catch {
        // Brand is a dealer on the auto page, not a separate catalog product.
      }
      for (const id of ["adm-jizzakh", "auto-new-used"]) {
        try {
          const detail = await getCreditById(id);
          if (cancelled || !detail?.page) continue;
          const dealer = findDealer(detail.page.dealers, brand);
          const next = { ...detail.page };
          if (dealer && hasText(dealer.title)) next.heroTitle = dealer.title;
          if (dealer && hasText(dealer.text)) next.heroSubtitle = dealer.text;
          if (dealer?.image) next.heroImage = dealer.image;
          setPage(next);
          setProduct(detail.product);
          setImage(dealer?.image || detail.page.heroImage || detail.product.image);
          setLoading(false);
          return;
        } catch {
          // try the next auto product
        }
      }
      if (!cancelled) {
        setFailed(true);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [brand]);

  if (loading) return <TrastbankLoader />;

  if (failed || !page) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
        <TrastbankError onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {config?.header ? <Header config={config.header} showProductNav={false} /> : null}
      <main className="flex-grow bg-white">
        <CreditAutoView
          page={page}
          product={product}
          image={image}
          heroVariant="showcase"
          statLabels={statLabels}
        />
      </main>
      {config?.footer ? <Footer config={config.footer} /> : null}
    </div>
  );
}
