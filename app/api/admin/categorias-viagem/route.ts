import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categorias = await prisma.categoriaViagem.findMany({
    orderBy: { nome: "asc" },
  });

  return NextResponse.json(categorias);
}

export async function POST(req: Request) {
  const body = await req.json();

  const slug = body.nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

  const categoria = await prisma.categoriaViagem.create({
    data: {
      nome: body.nome,
      slug,
    },
  });

  return NextResponse.json(categoria);
}
