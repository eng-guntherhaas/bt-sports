import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TipoFoto } from "@/generated/prisma";
import { formatarDataLonga } from "@/lib/formatarData";

type Props = {
  params: { slug?: string };
};

export default async function PacotePage({ params }: Props) {
  const { slug } = await params;

  const pacote = await prisma.pacote.findUnique({
    where: { slug },
    include: {
      fotos: { orderBy: { ordem: "asc" } },
      categoria: true,
    },
  });

  if (!pacote) {
    notFound();
  }

  const capa = pacote.fotos.find((f) => f.tipo === TipoFoto.CAPA);
  const galeria = pacote.fotos.filter((f) => f.tipo !== TipoFoto.CAPA);

  return (
    <main className="bg-surface px-4 py-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-surface-muted">
            {capa && (
              <Image
                src={capa.url}
                alt={pacote.nome}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-4">
              {pacote.categoria && (
                <span className="inline-block rounded-md bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
                  {pacote.categoria.nome}
                </span>
              )}

              <h1 className="text-3xl font-bold tracking-tight text-on-surface">
                {pacote.nome}
              </h1>

              {pacote.data_inicio && (
                <p className="text-sm font-medium text-on-surface-muted">
                  {formatarDataLonga(pacote.data_inicio)}
                </p>
              )}

              {pacote.texto_destaque && (
                <p className="text-lg font-medium text-brand line-clamp-2">
                  {pacote.texto_destaque}
                </p>
              )}

              {pacote.resumo && (
                <p className="text-sm leading-relaxed text-on-surface-muted line-clamp-3">
                  {pacote.resumo}
                </p>
              )}
            </div>

            <div className="rounded-xl border border-border-muted bg-surface-muted p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-on-surface-muted">
                    A partir de
                  </p>
                  <p className="text-2xl font-bold text-on-surface">
                    {pacote.preco
                      ? `€ ${pacote.preco.toNumber().toLocaleString("pt-BR")}`
                      : "Sob consulta"}
                  </p>
                </div>

                <button
                  className="
                    rounded-lg
                    bg-brand
                    px-6 py-3
                    text-sm font-semibold
                    text-on-brand
                    transition
                    hover:bg-brand-hover
                    focus:outline-none
                    focus:ring-2
                    focus:ring-brand/40
                  "
                >
                  Solicitar informações
                </button>
              </div>
            </div>
          </div>
        </section>

        {pacote.descricao && (
          <section className="prose prose-neutral max-w-none">
            <h2>Sobre o pacote</h2>
            <div dangerouslySetInnerHTML={{ __html: pacote.descricao }} />
          </section>
        )}
      </div>

      {galeria.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-on-surface">Galeria</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {galeria.map((foto) => (
              <div
                key={foto.id}
                className="relative aspect-square overflow-hidden rounded-lg bg-surface-muted"
              >
                <Image
                  src={foto.url}
                  alt={foto.descricao ?? pacote.nome}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
