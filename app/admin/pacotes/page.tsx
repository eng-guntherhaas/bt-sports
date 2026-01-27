import { prisma } from "@/lib/prisma";

async function getPacotes(orderBy: "nome" | "data") {
  return prisma.pacote.findMany({
    include: {
      fotos: true,
    },
    orderBy: orderBy === "nome" ? { nome: "asc" } : { data_inicio: "asc" },
  });
}

import Link from "next/link";
export const dynamic = "force-dynamic";

export default async function AdminPacotes({
  searchParams,
}: {
  searchParams: { order?: string };
}) {
  const order = searchParams.order === "data" ? "data" : "nome";
  const pacotes = await getPacotes(order);

  return (
    <div className="bg-white px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Pacotes de Viagem</h1>

        {/* Ordenação */}
        <div className="flex gap-3">
          <Link
            href="/admin/pacotes?order=nome"
            className={`rounded px-4 py-2 text-sm ${
              order === "nome"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Ordem alfabética
          </Link>

          <Link
            href="/admin/pacotes?order=data"
            className={`rounded px-4 py-2 text-sm ${
              order === "data"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Data do evento
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* ➕ Novo pacote */}
        <Link
          href="/admin/pacotes/novo"
          className="flex aspect-[3/4] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-400 hover:border-gray-900 hover:text-gray-900"
        >
          <span className="text-5xl font-light">+</span>
        </Link>

        {/* Pacotes */}
        {pacotes.map((pacote) => {
          const capa = pacote.fotos.find((foto) => foto.tipo === "capa");

          return (
            <div key={pacote.id} className="group relative">
              {/* Imagem */}
              <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-200">
                {capa ? (
                  <img
                    src={capa.url}
                    alt={capa.descricao ?? pacote.nome}
                    className="h-full w-full object-cover group-hover:opacity-80"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    Sem imagem
                  </div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="mt-4 space-y-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  {pacote.nome}
                </h3>

                {pacote.resumo && (
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {pacote.resumo}
                  </p>
                )}

                {pacote.preco && (
                  <p className="text-sm font-medium text-gray-900">
                    R$ {pacote.preco.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Ação */}
              <Link
                href={`/admin/pacotes/${pacote.id}`}
                className="absolute inset-0"
              >
                <span className="sr-only">Editar pacote</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
