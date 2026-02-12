"use client";

import Section from "./Section";
import Field from "./Field";
import Divider from "./Divider";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { PacoteFormState } from "@/types/pacoteForm";

const inputBase =
  "mt-2 w-full rounded-md bg-surface px-3.5 py-2 border border-default text-admin focus-ring-brand";

const MAX_DESTAQUE = 80;
const MAX_RESUMO = 160;

type Props = {
  valores: Pick<PacoteFormState, "texto_destaque" | "resumo" | "descricao">;

  onChange: <K extends keyof PacoteFormState>(
    key: K,
    value: PacoteFormState[K]
  ) => void;
};

export default function ConteudoPacote({ valores, onChange }: Props) {
  const destaqueCount = valores.texto_destaque.length;

  const resumoCount = valores.resumo.length;

  return (
    <Section title="Conteúdo" description="Textos exibidos ao usuário">
      <Field label="Texto de destaque">
        <textarea
          rows={2}
          maxLength={MAX_DESTAQUE}
          value={valores.texto_destaque}
          onChange={(e) => onChange("texto_destaque", e.target.value)}
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
          rows={3}
          maxLength={MAX_RESUMO}
          value={valores.resumo}
          onChange={(e) => onChange("resumo", e.target.value)}
          className={inputBase}
        />
        <p
          className={`mt-1 text-xs ${
            resumoCount > MAX_RESUMO * 0.9 ? "text-danger" : "text-admin-muted"
          }`}
        >
          {resumoCount}/{MAX_RESUMO} caracteres
        </p>
      </Field>

      <Divider />

      <Field label="Descrição completa">
        <RichTextEditor
          value={valores.descricao}
          onChange={(value) => onChange("descricao", value)}
        />
      </Field>
    </Section>
  );
}
