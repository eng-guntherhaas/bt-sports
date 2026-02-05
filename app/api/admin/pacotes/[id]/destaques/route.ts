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

  const { destaque } = await req.json();

  await prisma.$transaction(async (tx) => {
    if (destaque) {
      await tx.pacote.updateMany({
        where: { destaque: true },
        data: { destaque: false },
      });
    }

    await tx.pacote.update({
      where: { id: pacoteId },
      data: { destaque },
    });
  });

  return NextResponse.json({ success: true });
}
