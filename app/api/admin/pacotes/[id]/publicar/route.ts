import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { status } = await req.json();

  if (!["PUBLICADO", "RASCUNHO"].includes(status)) {
    return NextResponse.json({ error: "Status inválido" }, { status: 400 });
  }

  await prisma.pacote.update({
    where: { id: Number(params.id) },
    data: { status },
  });

  return NextResponse.json({ success: true });
}
