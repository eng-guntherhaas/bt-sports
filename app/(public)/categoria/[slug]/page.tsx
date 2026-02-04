import { prisma } from "@/lib/prisma";
import { TipoFoto } from "@/generated/prisma";
import PacoteCard from "@/components/pacotes/pacote-card";

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const categoria = await prisma.categoriaViagem.findUnique({
    where: { slug },
    include: {
      pacotes: {
        include: {
          fotos: {
            where: {
              tipo: TipoFoto.CAPA,
            },
            take: 1,
          },
        },
      },
    },
  });

  if (!categoria) {
    return <div className="p-10">Categoria não encontrada</div>;
  }

  return (
    <div className="px-6 py-10">
      <h1 className="mb-8 text-2xl font-bold">{categoria.nome}</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categoria.pacotes.map((pacote) => (
          <PacoteCard
            key={pacote.id}
            nome={pacote.nome}
            resumo={pacote.resumo ?? undefined}
            preco={pacote.preco ? Number(pacote.preco) : undefined}
            imageUrl={pacote.fotos[0]?.url ?? null}
            href={`/pacotes/${pacote.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
