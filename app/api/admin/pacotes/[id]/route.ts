import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pacotePatchSchema } from "@/app/(admin)/admin/(protected)/pacotes/novo/schema";

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

    const pacote = await prisma.pacote.update({
      where: { id: pacoteId },
      data,
    });

    return NextResponse.json({ ok: true, pacote });
  } catch (error: any) {
    console.error("PATCH /pacotes/[id]", error);

    if (error?.name === "ZodError") {
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
