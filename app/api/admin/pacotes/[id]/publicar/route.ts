import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id?: string }> }
) {
  const { id } = await context.params;
  const pacoteId = Number(id);

  if (!id || Number.isNaN(pacoteId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const { status } = await req.json();

  await prisma.pacote.update({
    where: { id: pacoteId },
    data: { status },
  });

  return NextResponse.json({ success: true });
}
