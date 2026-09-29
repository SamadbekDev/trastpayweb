import { notFound } from "next/navigation";
import { getCardById, getCardsPage } from "@/api/pageService";
import CardDetailView from "@/components/cards/CardDetailView";

export const dynamic = "force-dynamic";

interface CardPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const page = await getCardsPage();
    return (page.products || []).map((p) => ({ id: p.id }));
  } catch {
    return [];
  }
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
