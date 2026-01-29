import Section from "./Section";
import Field from "./Field";
import Divider from "./Divider";
import RichTextEditor from "@/components/admin/RichTextEditor";

const inputBase =
  "mt-2 w-full rounded-md bg-surface px-3.5 py-2 border border-default text-admin focus-ring-brand";

export default function ConteudoPacote({
  descricao,
  setDescricao,
}: {
  descricao: string;
  setDescricao: (v: string) => void;
}) {
  return (
    <Section title="Conteúdo" description="Textos exibidos ao usuário">
      <Field label="Texto de destaque">
        <textarea rows={2} className={inputBase} />
      </Field>

      <Field label="Resumo">
        <textarea rows={3} className={inputBase} />
      </Field>

      <Divider />

      <Field label="Descrição completa">
        <RichTextEditor value={descricao} onChange={setDescricao} />
      </Field>
    </Section>
  );
}
