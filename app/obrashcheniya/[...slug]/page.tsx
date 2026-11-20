import { legacyRoute } from "@/components/content/legacyRoute";

/** Pages migrated from the old trustbank.uz — see scripts/legacy. */
const route = legacyRoute("obrashcheniya");

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
