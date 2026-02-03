import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  await prisma.pacote.update({
    where: { id: Number(params.id) },
    data,
  });

  return NextResponse.json({ success: true });
}
