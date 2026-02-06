import { prisma } from "@/lib/prisma";
import { pacotesMock } from "@/mocks/pacotes";

export type PacoteRaw = {
  id: number | string;
  nome: string;
  resumo?: string;
  preco?: number | { toNumber(): number };
  data_inicio?: Date | string;
  slug?: string;
  imageUrl?: string;
  fotos?: {
    url: string;
    tipo: string;
  }[];
};

export async function getPacotesRaw(): Promise<PacoteRaw[]> {
  const pacotesDb = await prisma.pacote.findMany({
    include: { fotos: true },
  });

  return pacotesDb.length > 0 ? (pacotesDb as PacoteRaw[]) : pacotesMock;
}
