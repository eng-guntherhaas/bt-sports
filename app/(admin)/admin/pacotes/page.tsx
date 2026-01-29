import { prisma } from "@/lib/prisma";
import Link from "next/link";
import PacoteCard from "@/components/pacotes/pacote-card";

export const dynamic = "force-dynamic";

async function getPacotes(orderBy: "nome" | "data") {
  return prisma.pacote.findMany({
    include: { fotos: true },
    orderBy: orderBy === "nome" ? { nome: "asc" } : { data_inicio: "asc" },
  });
}

export default async function AdminPacotes({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;
  const order = params.order === "data" ? "data" : "nome";

  const pacotes = await getPacotes(order);

  const mockPacotes = [
    {
      id: "mock-1",
      nome: "Maratona de Paris 2025",
      resumo: "Pacote completo com inscrição, hotel e transfers.",
      preco: 12990,
      imageUrl: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
    },
    {
      id: "mock-2",
      nome: "Roland Garros Experience",
      resumo: "Experiência premium para fãs de tênis em Paris.",
      preco: 18900,
      imageUrl: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
    },
  ];

  return (
    <div className="bg-admin min-h-screen px-4 sm:px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-admin">
          Pacotes de Viagem
        </h1>

        <div className="flex flex-wrap gap-3">
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
      <div
        className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]
        "
      >
        {/* Novo pacote */}
        <Link
          href="/admin/pacotes/novo"
          className="
            group relative
            aspect-[4/3]
            overflow-hidden
            rounded-xl
            border-2 border-dashed border-border-muted
            bg-surface
            transition
            sm:hover:-translate-y-0.5
            sm:hover:shadow-lg
          "
        >
          {/* Overlay */}
          <div
            className="
              pointer-events-none
              absolute inset-0
              bg-brand-soft/60
              opacity-0
              transition-opacity
              sm:group-hover:opacity-100
            "
          />

          <div className="relative z-10 flex h-full items-center justify-center">
            <span
              className="
                text-5xl font-light
                text-admin-muted
                transition
                sm:group-hover:text-brand
              "
            >
              +
            </span>
          </div>
        </Link>

        {/* Mocks */}
        {mockPacotes.map((p) => (
          <PacoteCard
            key={p.id}
            nome={p.nome}
            resumo={p.resumo}
            preco={p.preco}
            imageUrl={p.imageUrl}
            badge="mock"
            variant="admin"
          />
        ))}

        {/* Reais */}
        {pacotes.map((pacote) => {
          const capa = pacote.fotos.find((f) => f.tipo === "capa");

          return (
            <PacoteCard
              key={pacote.id}
              href={`/admin/pacotes/${pacote.id}`}
              nome={pacote.nome}
              resumo={pacote.resumo ?? undefined}
              preco={pacote.preco ?? undefined}
              imageUrl={capa?.url}
              variant="admin"
            />
          );
        })}
      </div>
    </div>
  );
}
