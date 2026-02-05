import { NextResponse } from "next/server";

export async function getNumericParam(
  context: { params: Promise<Record<string, string | undefined>> },
  key: string
): Promise<number | NextResponse> {
  const params = await context.params;
  const raw = params[key];

  const value = Number(raw);

  if (!raw || Number.isNaN(value)) {
    return NextResponse.json(
      { error: `Parâmetro inválido: ${key}` },
      { status: 400 }
    );
  }

  return value;
}
