import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function gerarSlug(nome: string) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function GET() {
  const categorias = await prisma.categoriaViagem.findMany({
    orderBy: { nome: "asc" },
  });

  return NextResponse.json(categorias);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.nome || !body.nome.trim()) {
      return NextResponse.json(
        { error: "Nome da categoria é obrigatório" },
        { status: 400 }
      );
    }

    const slug = gerarSlug(body.nome);

    const categoria = await prisma.categoriaViagem.create({
      data: {
        nome: body.nome.trim(),
        slug,
      },
    });

    return NextResponse.json(categoria, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao criar categoria" },
      { status: 500 }
    );
  }
}
