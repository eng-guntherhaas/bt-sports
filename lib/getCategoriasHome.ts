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

  // categorias fake de teste com imagens stock
  const categoriasTeste = [
    {
      id: -1,
      nome: "Em breve",
      slug: "em-breve",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      _count: { pacotes: 0 },
    },
    {
      id: -2,
      nome: "Novidades",
      slug: "novidades",
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
      _count: { pacotes: 0 },
    },
    {
      id: -3,
      nome: "Experiências",
      slug: "experiencias",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      _count: { pacotes: 0 },
    },
    {
      id: -4,
      nome: "Destinos VIP",
      slug: "destinos-vip",
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21",
      _count: { pacotes: 0 },
    },
    {
      id: -5,
      nome: "Esportes",
      slug: "esportes",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
      _count: { pacotes: 0 },
    },
    {
      id: -6,
      nome: "Eventos",
      slug: "eventos",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      _count: { pacotes: 0 },
    },
    {
      id: -7,
      nome: "Premium",
      slug: "premium",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      _count: { pacotes: 0 },
    },
  ];

  return [...comPacotes, ...categoriasTeste];
}
