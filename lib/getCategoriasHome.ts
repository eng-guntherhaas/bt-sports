import { prisma } from "@/lib/prisma";
import { categoriasHomeMock } from "@/mocks/categoriasHome";

export async function getCategoriasHome() {
  const categoriasDb = await prisma.categoriaViagem.findMany({
    include: {
      _count: {
        select: { pacotes: true },
      },
    },
    orderBy: { nome: "asc" },
  });

  const categoriasComPacotes = categoriasDb.filter(
    (cat) => cat._count.pacotes > 0
  );

  if (categoriasComPacotes.length > 0) {
    return categoriasComPacotes;
  }

  return categoriasHomeMock;
}
