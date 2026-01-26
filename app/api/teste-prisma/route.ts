import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const pacotes = await prisma.pacote.findMany({
      take: 1,
    });

    return NextResponse.json({
      ok: true,
      total: pacotes.length,
      pacotes,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
}
