import Link from "next/link";
import PacoteCard from "@/components/pacotes/pacote-card";
import { getPacotesUi, Order } from "@/lib/getPacotesUi";

export const dynamic = "force-dynamic";

export default async function AdminPacotes({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;

  const order: Order = params.order === "data" ? "data" : "nome";
  const pacotes = await getPacotesUi(order);

  return (
    <div className="bg-admin min-h-screen px-4 py-8 sm:px-6 sm:py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-admin">
          Pacotes de Viagem
        </h1>

        <div className="flex gap-3">
          <Link
            href="/admin/pacotes?order=nome"
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              order === "nome"
                ? "bg-brand text-on-brand"
                : "bg-surface text-admin-muted hover:bg-brand-soft"
            }`}
          >
            Ordem alfabética
          </Link>

          <Link
            href="/admin/pacotes?order=data"
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              order === "data"
                ? "bg-brand text-on-brand"
                : "bg-surface text-admin-muted hover:bg-brand-soft"
            }`}
          >
            Data do evento
          </Link>
        </div>
      </div>

      {/* Grid */}
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

        {/* Pacotes */}
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
