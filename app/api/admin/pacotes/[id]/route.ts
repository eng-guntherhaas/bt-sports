import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pacotePatchSchema } from "@/app/(admin)/admin/(protected)/pacotes/novo/schema";
import { ZodError } from "zod";
import { Prisma } from "@/generated/prisma";

type Params = {
  params: { id: string };
};

export async function PATCH(req: Request, { params }: Params) {
  try {
    const pacoteId = Number(params.id);

    if (Number.isNaN(pacoteId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const body = await req.json();
    const data = pacotePatchSchema.parse(body);

    const dataToUpdate: Prisma.PacoteUpdateInput = {};

    if (data.nome !== undefined) {
      dataToUpdate.nome = data.nome;
    }

    if (data.categoria_id !== undefined) {
      dataToUpdate.categoria = {
        connect: { id: data.categoria_id },
      };
    }

    if (data.data_inicio !== undefined) {
      dataToUpdate.data_inicio = data.data_inicio
        ? new Date(data.data_inicio)
        : null;
    }

    if (data.preco !== undefined) {
      dataToUpdate.preco = data.preco;
    }

    if (data.texto_destaque !== undefined) {
      dataToUpdate.texto_destaque = data.texto_destaque;
    }

    if (data.resumo !== undefined) {
      dataToUpdate.resumo = data.resumo;
    }

    if (data.descricao !== undefined) {
      dataToUpdate.descricao = data.descricao;
    }

    if (data.destaque !== undefined) {
      dataToUpdate.destaque = data.destaque;
    }

    const [pacote] = await prisma.$transaction(async (tx) => {
      if (data.destaque === true) {
        await tx.pacote.updateMany({
          where: {
            destaque: true,
            id: { not: pacoteId },
          },
          data: { destaque: false },
        });
      }

      const pacoteAtualizado = await tx.pacote.update({
        where: { id: pacoteId },
        data: dataToUpdate,
      });

      return [pacoteAtualizado];
    });

    return NextResponse.json({ ok: true, pacote });
  } catch (error: unknown) {
    console.error("PATCH /pacotes/[id]", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", issues: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao atualizar pacote" },
      { status: 500 }
    );
  }
}
