import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { destaque } = await req.json();

  if (destaque) {
    await prisma.pacote.updateMany({
      where: { destaque: true },
      data: { destaque: false },
    });
  }

  await prisma.pacote.update({
    where: { id: Number(params.id) },
    data: { destaque },
  });

  return NextResponse.json({ success: true });
}
