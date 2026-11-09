import { notFound } from "next/navigation";
import { getCardById } from "@/api/pageService";
import CardDetailView from "@/components/cards/CardDetailView";

/** Always render on demand — CI build has no dashboard-api. */
export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface CardPageProps {
  params: Promise<{ id: string }>;
}

export default async function CardDetailPage({ params }: CardPageProps) {
  const { id } = await params;
  try {
    const config = await getCardById(id);
    return <CardDetailView config={config} />;
  } catch (err) {
    console.error(`[karty/${id}]`, err);
    notFound();
  }
}
