import PacoteCard from "@/components/pacotes/pacote-card";
import { Pacote } from "@/lib/getPacotesRaw";

function formatarDataEvento(data?: Date | null) {
  if (!data) return undefined;

  return data.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
}

type Props = {
  pacotes: Pacote[];
};

export default function PacotesGrid({ pacotes }: Props) {
  return (
    <div
      className="
        grid grid-cols-1 gap-6
        sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]
      "
    >
      {pacotes.map((p) => (
        <PacoteCard
          key={p.id}
          href={p.href}
          nome={p.nome}
          resumo={p.resumo}
          preco={p.preco}
          imageUrl={p.imageUrl}
          badge={formatarDataEvento(p.data_inicio)}
        />
      ))}
    </div>
  );
}
