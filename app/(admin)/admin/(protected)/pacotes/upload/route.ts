import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import { TipoFoto } from "@/generated/prisma"; // 👈 IMPORTANTE

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const tipoRaw = formData.get("tipo");
    const pacoteId = Number(formData.get("pacoteId"));

    if (!file || !tipoRaw || !pacoteId) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const tipo = TipoFoto[tipoRaw as keyof typeof TipoFoto];

    if (!tipo) {
      return NextResponse.json(
        { error: "Tipo de foto inválido" },
        { status: 400 }
      );
    }

    const blob = await put(
      `pacotes/${pacoteId}/${tipo.toLowerCase()}-${Date.now()}-${file.name}`,
      file,
      { access: "public" }
    );

    await prisma.foto.create({
      data: {
        pacote_id: pacoteId,
        url: blob.url,
        tipo,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro no upload da imagem" },
      { status: 500 }
    );
  }
}
