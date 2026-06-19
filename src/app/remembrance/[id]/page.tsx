import { notFound } from "next/navigation";
import { getMemorialById, getMemorialIds } from "@/lib/memorial/getMemorialData";
import MemorialDetailClient from "@/components/remembrance/MemorialDetailClient";

export async function generateStaticParams() {
  const ids = await getMemorialIds();
  return ids.map((id) => ({ id }));
}

export default async function MemorialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { memorial } = await getMemorialById(id);

  if (!memorial) {
    notFound();
  }

  return <MemorialDetailClient memorial={memorial} />;
}
