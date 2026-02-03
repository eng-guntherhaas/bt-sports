import { prisma } from "@/lib/prisma";
import EditarPacoteForm from "./EditarPacoteForm";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditarPacotePage({ params }: Props) {
  const { id } = await params;

  const pacoteId = Number(id);

   if (!id || Number.isNaN(pacoteId)) {
    notFound();
  }

  if (Number.isNaN(pacoteId)) {
    return <div className="p-6">ID inválido</div>;
  }

  const pacote = await prisma.pacote.findUnique({
    where: { id: pacoteId },
  });

  if (!pacote) {
    return <div className="p-6">Pacote não encontrado</div>;
  }

  const categorias = await prisma.categoriaViagem.findMany({
    orderBy: { nome: "asc" },
  });

  return (
    <EditarPacoteForm
      pacote={pacote}
      categorias={categorias}
    />
  );
}




 


