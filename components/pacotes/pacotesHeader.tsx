import Link from "next/link";
import { Order } from "@/lib/getPacotesUi";

type Props = {
  order: Order;
};

export default function PacotesHeader({ order }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Título */}
      <h1 className="text-xl sm:text-2xl font-bold text-color-text">
        Pacotes de Viagem
      </h1>

      {/* Filtros */}
      <div className="flex gap-3">
        <Link
          href="/pacotes?order=nome"
          className={`rounded-md px-4 py-2 text-sm font-medium transition ${
            order === "nome"
              ? "bg-brand text-on-brand"
              : "bg-surface text-muted hover:bg-brand-soft"
          }`}
        >
          Ordem alfabética
        </Link>

        <Link
          href="/pacotes?order=data"
          className={`rounded-md px-4 py-2 text-sm font-medium transition ${
            order === "data"
              ? "bg-brand text-on-brand"
              : "bg-surface text-muted hover:bg-brand-soft"
          }`}
        >
          Data do evento
        </Link>
      </div>
    </div>
  );
}
