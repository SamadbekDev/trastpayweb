import { notFound } from "next/navigation";
import { getDepositById } from "@/api/pageService";
import DepositDetailView from "@/components/deposits/DepositDetailView";

/** Always render on demand — CI build has no dashboard-api. */
export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface DepositPageProps {
  params: Promise<{ id: string }>;
}

export default async function DepositDetailPage({ params }: DepositPageProps) {
  const { id } = await params;
  try {
    const config = await getDepositById(id);
    return <DepositDetailView config={config} />;
  } catch (err) {
    console.error(`[vklady/${id}]`, err);
    notFound();
  }
}
