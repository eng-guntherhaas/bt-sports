import { prisma } from "@/lib/prisma";
import { pacotesMock } from "@/mocks/pacotes";

export async function getPacotesRecentes(limit = 6) {
  try {
    const pacotes = await prisma.pacote.findMany({
      orderBy: {
        created_at: "desc",
      },
      take: limit,
      include: {
        fotos: {
          where: { tipo: "capa" },
          take: 1,
        },
      },
    });

    // se não veio nada do banco, cai no mock
    if (!pacotes.length) {
      return pacotesMock.slice(0, limit);
    }

    return pacotes.map((pacote) => ({
      id: pacote.id,
      nome: pacote.nome,
      resumo: pacote.resumo,
      preco: pacote.preco ? Number(pacote.preco) : undefined,
      dataEvento: pacote.data_inicio
        ? pacote.data_inicio.toISOString().split("T")[0]
        : undefined,
      imageUrl: pacote.fotos[0]?.url,
      href: `/pacotes/${pacote.id}`,
    }));
  } catch (error) {
    console.error("[getPacotesRecentes]", error);
    return pacotesMock.slice(0, limit);
  }
}
