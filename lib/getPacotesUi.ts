import { getPacotesRaw } from "@/lib/getPacotesRaw";
import { PacoteRaw } from "@/lib/getPacotesRaw";

export type Order = "nome" | "data";

export type PacoteUi = {
  id: number | string;
  nome: string;
  resumo?: string;
  preco?: number;
  data_inicio?: Date | null;
  imageUrl?: string;
  href: string;
};

export async function getPacotesUi(order: Order = "nome"): Promise<PacoteUi[]> {
  const pacotes = await getPacotesRaw();

  const normalizados: PacoteUi[] = pacotes.map((pacote: PacoteRaw) => {
    const capa = pacote.fotos?.find((f) => f.tipo === "capa");

    return {
      id: pacote.id,
      nome: pacote.nome,
      resumo: pacote.resumo ?? undefined,

      preco:
        typeof pacote.preco === "number"
          ? pacote.preco
          : pacote.preco?.toNumber(),

      data_inicio: pacote.data_inicio ? new Date(pacote.data_inicio) : null,

      imageUrl: capa?.url ?? pacote.imageUrl,
      href: `/pacotes/${pacote.slug ?? pacote.id}`,
    };
  });

  return normalizados.sort((a, b) => {
    if (order === "nome") {
      return a.nome.localeCompare(b.nome);
    }

    const da = a.data_inicio?.getTime() ?? Infinity;
    const db = b.data_inicio?.getTime() ?? Infinity;

    return da - db;
  });
}
