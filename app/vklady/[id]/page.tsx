import { notFound } from "next/navigation";
import { getDepositById, getDepositsPage } from "@/api/pageService";
import DepositDetailView from "@/components/deposits/DepositDetailView";

interface DepositPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const page = await getDepositsPage();
    return (page.products || []).map((p) => ({ id: p.id }));
  } catch {
    return [];
  }
}

export default async function DepositDetailPage({ params }: DepositPageProps) {
  const { id } = await params;
  try {
    const config = await getDepositById(id);
    return <DepositDetailView config={config} />;
  } catch {
    notFound();
  }
}
