import { prisma } from "@/lib/prisma";

export async function getPacoteDestaque() {
  const pacote = await prisma.pacote.findFirst({
    where: { destaque: true },
    include: {
      fotos: {
        where: { tipo: "banner" },
        take: 1,
      },
    },
  });

  if (!pacote) return null;

  return {
    id: pacote.id,
    nome: pacote.nome,
    resumo: pacote.resumo,
    preco: pacote.preco ? Number(pacote.preco) : undefined,
    imageUrl: pacote.fotos[0]?.url,
    href: `/pacotes/${pacote.slug ?? pacote.id}`,
  };
}
