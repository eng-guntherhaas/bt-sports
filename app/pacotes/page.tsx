import { prisma } from "@/lib/prisma";
import PacoteCard from "@/components/pacotes/pacote-card";

export const dynamic = "force-dynamic";

type Order = "nome" | "data";

/* ---------------- helpers ---------------- */

function sortPacotes<T extends { nome: string; data_inicio?: Date | null }>(
  pacotes: T[],
  order: Order
) {
  return [...pacotes].sort((a, b) => {
    if (order === "nome") {
      return a.nome.localeCompare(b.nome);
    }

    const da = a.data_inicio ? a.data_inicio.getTime() : Infinity;
    const db = b.data_inicio ? b.data_inicio.getTime() : Infinity;

    return da - db;
  });
}

function formatarDataEvento(data?: Date | null) {
  if (!data) return undefined;

  return data.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
}

async function getPacotes() {
  return prisma.pacote.findMany({
    include: { fotos: true },
  });
}

/* ---------------- page ---------------- */

export default async function PacotesPublicos({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;
  const order: Order = params.order === "data" ? "data" : "nome";

  const pacotesDb = await getPacotes();

  /* ---------- mocks ---------- */

  const mockPacotes = [
    {
      id: "mock-1",
      nome: "Maratona de Paris 2025",
      resumo: "Pacote completo com inscrição, hotel e transfers.",
      preco: 12990,
      data_inicio: new Date("2025-04-01"),
      imageUrl: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
      href: "/pacotes/maratona-paris-2025",
    },
    {
      id: "mock-2",
      nome: "Roland Garros Experience",
      resumo: "Experiência premium para fãs de tênis em Paris.",
      preco: 18900,
      data_inicio: new Date("2025-05-20"),
      imageUrl: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
      href: "/pacotes/roland-garros",
    },
  ];

  /* ---------- pacotes reais ---------- */

  const pacotesReais = pacotesDb.map((pacote) => {
    const capa = pacote.fotos.find((f) => f.tipo === "capa");

    return {
      id: pacote.id,
      nome: pacote.nome,
      resumo: pacote.resumo ?? undefined,
      preco: pacote.preco ?? undefined,
      data_inicio: pacote.data_inicio,
      imageUrl: capa?.url,
      href: `/pacotes/${pacote.slug ?? pacote.id}`,
    };
  });

  /* ---------- unificar + ordenar ---------- */

  const pacotesOrdenados = sortPacotes(
    [...mockPacotes, ...pacotesReais],
    order
  );

  /* ---------------- render ---------------- */

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-foreground">
          Pacotes de Viagem
        </h1>
        <p className="mt-2 text-muted-foreground">
          Experiências esportivas completas, do começo ao fim.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <a
            href="/pacotes?order=nome"
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              order === "nome"
                ? "bg-brand text-on-brand"
                : "bg-surface text-muted-foreground hover:bg-brand-soft"
            }`}
          >
            Ordem alfabética
          </a>

          <a
            href="/pacotes?order=data"
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              order === "data"
                ? "bg-brand text-on-brand"
                : "bg-surface text-muted-foreground hover:bg-brand-soft"
            }`}
          >
            Data do evento
          </a>
        </div>
      </div>

      {/* Grid */}
      <div
        className="
          grid gap-6
          grid-cols-[repeat(auto-fill,minmax(260px,1fr))]
        "
      >
        {pacotesOrdenados.map((p) => (
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
    </div>
  );
}
