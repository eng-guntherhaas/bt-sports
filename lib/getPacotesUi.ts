import { pacotesMock } from "@/mocks/pacotes";

export type Order = "nome" | "data" | "preco-asc" | "preco-desc";

export async function getPacotesUi(order: Order) {
  const pacotes = [...pacotesMock];

  switch (order) {
    case "nome":
      return pacotes.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

    case "data":
      return pacotes.sort(
        (a, b) =>
          new Date(a.dataEvento).getTime() - new Date(b.dataEvento).getTime()
      );

    case "preco-asc":
      return pacotes.sort((a, b) => a.preco - b.preco);

    case "preco-desc":
      return pacotes.sort((a, b) => b.preco - a.preco);

    default:
      return pacotes;
  }
}
