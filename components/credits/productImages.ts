import { CreditProduct } from "@/types/credits";
import { creditProductFallback } from "@/utils/figmaAssets";

const SHOWCASE_ORDER = ["golden-house", "ipoteka-refinance", "sharq-bahori", "ipoteka-bank"];

/** Image from CMS (`product.image` → Mongo media id/url); empty fields fall back to the Figma artwork. */
export function creditProductImage(product: Pick<CreditProduct, "id" | "title" | "image">) {
  return product.image?.trim() || creditProductFallback(product.id) || "";
}

export function mortgageShowcaseProducts(products: CreditProduct[]) {
  const mortgage = products.filter((product) => product.groupId === "mortgage" || product.template === "mortgage");
  return [...mortgage].sort((a, b) => {
    const ai = SHOWCASE_ORDER.indexOf(a.id);
    const bi = SHOWCASE_ORDER.indexOf(b.id);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}
