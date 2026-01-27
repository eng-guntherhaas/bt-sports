import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { pacoteSchema } from "@/app/admin/pacotes/novo/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔒 valida e converte os dados
    const data = pacoteSchema.parse(body);

    const pacote = await prisma.pacote.create({
      data: {
        nome: data.nome,
        categoria_id: data.categoria_id,
        data_inicio: data.data_inicio ? new Date(data.data_inicio) : null,
        preco: data.preco,
        moeda: data.moeda,
        texto_destaque: data.texto_destaque,
        resumo: data.resumo,
        descricao: data.descricao,
      },
    });

    return NextResponse.json({ ok: true, pacote }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { ok: false, error: "Dados inválidos ou erro ao criar pacote" },
      { status: 400 }
    );
  }
}
