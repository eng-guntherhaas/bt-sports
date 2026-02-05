"use client";

import { useState } from "react";
import Section from "./Section";
import Field from "./Field";
import Divider from "./Divider";
import RichTextEditor from "@/components/admin/RichTextEditor";

const inputBase =
  "mt-2 w-full rounded-md bg-surface px-3.5 py-2 border border-default text-admin focus-ring-brand";

const MAX_DESTAQUE = 80;
const MAX_RESUMO = 160;

export default function ConteudoPacote({
  descricao,
  setDescricao,
  valoresIniciais,
}: {
  descricao: string;
  setDescricao: (v: string) => void;
  valoresIniciais?: {
    texto_destaque?: string;
    resumo?: string;
  };
}) {
  const [destaqueCount, setDestaqueCount] = useState(
    valoresIniciais?.texto_destaque?.length ?? 0
  );
  const [resumoCount, setResumoCount] = useState(
    valoresIniciais?.resumo?.length ?? 0
  );

  return (
    <Section title="Conteúdo" description="Textos exibidos ao usuário">
      <Field label="Texto de destaque">
        <textarea
          name="texto_destaque"
          rows={2}
          maxLength={MAX_DESTAQUE}
          defaultValue={valoresIniciais?.texto_destaque}
          onChange={(e) => setDestaqueCount(e.target.value.length)}
          className={inputBase}
        />
        <p
          className={`mt-1 text-xs ${
            destaqueCount > MAX_DESTAQUE * 0.9
              ? "text-danger"
              : "text-admin-muted"
          }`}
        >
          {destaqueCount}/{MAX_DESTAQUE} caracteres
        </p>
      </Field>

      <Field label="Resumo">
        <textarea
          name="resumo"
          rows={3}
          maxLength={MAX_RESUMO}
          defaultValue={valoresIniciais?.resumo}
          onChange={(e) => setResumoCount(e.target.value.length)}
          className={inputBase}
        />
        <p
          className={`mt-1 text-xs ${
            resumoCount > MAX_RESUMO * 0.9 ? "text-red-500" : "text-admin-muted"
          }`}
        >
          {resumoCount}/{MAX_RESUMO} caracteres
        </p>
      </Field>

      <Divider />

      <Field label="Descrição completa">
        <RichTextEditor value={descricao} onChange={setDescricao} />
      </Field>
    </Section>
  );
}
