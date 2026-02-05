import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pacotePatchSchema } from "@/app/(admin)/admin/(protected)/pacotes/novo/schema";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id?: string }> }
) {
  try {
    const { id } = await context.params;
    const pacoteId = Number(id);

    if (!id || Number.isNaN(pacoteId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const body = await req.json();
    const data = pacotePatchSchema.parse(body);

    await prisma.$transaction(async (tx) => {
      if (data.destaque === true) {
        await tx.pacote.updateMany({
          where: { destaque: true, id: { not: pacoteId } },
          data: { destaque: false },
        });
      }

      await tx.pacote.update({
        where: { id: pacoteId },
        data: {
          ...(data.nome !== undefined && { nome: data.nome }),
          ...(data.categoria_id !== undefined && {
            categoria: { connect: { id: data.categoria_id } },
          }),
          ...(data.data_inicio !== undefined && {
            data_inicio: data.data_inicio ? new Date(data.data_inicio) : null,
          }),
          ...(data.preco !== undefined && { preco: data.preco }),
          ...(data.texto_destaque !== undefined && {
            texto_destaque: data.texto_destaque,
          }),
          ...(data.resumo !== undefined && { resumo: data.resumo }),
          ...(data.descricao !== undefined && {
            descricao: data.descricao,
          }),
          ...(data.destaque !== undefined && {
            destaque: data.destaque,
          }),
        },
      });
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PATCH /pacotes/[id]", error);
    return NextResponse.json(
      { error: "Erro ao atualizar pacote" },
      { status: 500 }
    );
  }
}
