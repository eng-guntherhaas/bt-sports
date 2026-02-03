import { prisma } from "@/lib/prisma";
import EditarPacoteForm from "./EditarPacoteForm";

type Props = {
  params: { id: string };
};

export default async function EditarPacotePage({ params }: Props) {
  const pacote = await prisma.pacote.findUnique({
    where: { id: Number(params.id) },
  });

  if (!pacote) {
    return <div className="p-6">Pacote não encontrado</div>;
  }

  const categorias = await prisma.categoriaViagem.findMany({
    orderBy: { nome: "asc" },
  });

  return <EditarPacoteForm pacote={pacote} categorias={categorias} />;
}
