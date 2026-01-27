import { prisma } from "@/lib/prisma";

export async function getCategoriasHome() {
  const categorias = await prisma.categoriaViagem.findMany({
    include: {
      _count: {
        select: { pacotes: true },
      },
    },
    orderBy: {
      nome: "asc",
    },
  });

  // filtra só categorias que tenham pacotes
  const comPacotes = categorias.filter((cat) => cat._count.pacotes > 0);

  // categoria fake de teste (sempre aparece)
  const categoriaTeste = {
    id: 0,
    nome: "Em breve",
    slug: "em-breve",
    _count: { pacotes: 0 },
  };

  return [...comPacotes, categoriaTeste];
}
