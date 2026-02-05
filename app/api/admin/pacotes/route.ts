import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";
import { pacoteSchema } from "@/app/(admin)/admin/(protected)/pacotes/novo/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = pacoteSchema.parse(body);

    const slugBase = slugify(data.nome, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug = slugBase;
    let count = 1;

    while (await prisma.pacote.findUnique({ where: { slug } })) {
      slug = `${slugBase}-${count++}`;
    }

    const pacote = await prisma.pacote.create({
      data: {
        nome: data.nome,
        slug,
        categoria_id: data.categoria_id,
        data_inicio: data.data_inicio ? new Date(data.data_inicio) : null,
        preco: data.preco,
        texto_destaque: data.texto_destaque,
        resumo: data.resumo,
        descricao: data.descricao,
        destaque: data.destaque ?? false,
        status: "RASCUNHO",
      },
    });

    return NextResponse.json({ pacote }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar pacote" },
      { status: 500 }
    );
  }
}
