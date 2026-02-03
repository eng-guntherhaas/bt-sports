import Link from "next/link";
import PacoteCard from "@/components/pacotes/pacote-card";
import { getPacotesUi, Order } from "@/lib/getPacotesUi";
import PacotesOrderMenu from "@/components/pacotes/PacotesOrderMenu";

export const dynamic = "force-dynamic";

export default async function AdminPacotes({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;

  const order: Order =
    params.order === "data" ||
    params.order === "preco-asc" ||
    params.order === "preco-desc"
      ? params.order
      : "nome";

  const pacotes = await getPacotesUi(order);

  return (
    <div className="bg-admin min-h-screen px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-admin">
          Pacotes de Viagem
        </h1>

        <PacotesOrderMenu
          order={order}
          basePath="/admin/pacotes"
          variant="admin"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        {/* Novo pacote */}
        <Link
          href="/admin/pacotes/novo"
          className="group relative aspect-[4/3] rounded-xl border-2 border-dashed border-border-muted bg-surface transition sm:hover:-translate-y-0.5 sm:hover:shadow-lg"
        >
          <div className="flex h-full items-center justify-center">
            <span className="text-5xl font-light text-admin-muted group-hover:text-brand">
              +
            </span>
          </div>
        </Link>

        {pacotes.map((pacote) => (
          <PacoteCard
            key={pacote.id}
            href={`/admin/pacotes/${pacote.id}`}
            nome={pacote.nome}
            resumo={pacote.resumo}
            preco={pacote.preco}
            imageUrl={pacote.imageUrl}
            variant="admin"
          />
        ))}
      </div>
    </div>
  );
}
