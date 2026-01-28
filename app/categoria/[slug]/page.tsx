import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await params to get the actual slug value
  const { slug } = await params;

  const categoria = await prisma.categoriaViagem.findUnique({
    where: { slug },
    include: {
      pacotes: {
        include: { fotos: true },
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
        {categoria.pacotes.map((pacote) => {
          const capa = pacote.fotos.find((foto) => foto.tipo === "capa");
          return (
            <div key={pacote.id}>
              <div className="aspect-3/4 overflow-hidden rounded-lg bg-gray-200 relative">
                {capa && (
                  <Image
                    src={capa.url}
                    alt={pacote.nome}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw,
                           (max-width: 1024px) 50vw,
                           25vw"
                  />
                )}
              </div>
              <h3 className="mt-2 text-sm font-semibold">{pacote.nome}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
