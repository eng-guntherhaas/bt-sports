import { getPacotesUi, Order } from "@/lib/getPacotesUi";
import PacotesGrid from "@/components/pacotes/pacotesGrid";
import PacotesHeader from "@/components/pacotes/pacotesHeader";

export const dynamic = "force-dynamic";

export default async function PacotesPublicos({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;

  const order: Order = params.order === "data" ? "data" : "nome";
  const pacotes = await getPacotesUi(order);

  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:px-6 sm:py-12">
      <PacotesHeader order={order} />
      <PacotesGrid pacotes={pacotes} />
    </div>
  );
}
