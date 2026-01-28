"use client";

import { useEffect, useMemo, useState } from "react";
import UploadImagem from "@/components/admin/UploadImagem";
import RichTextEditor from "@/components/admin/RichTextEditor";

/* ================= UI Helpers ================= */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="
rounded-2xl
border border-default
bg-white
p-6
shadow-sm
"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-(--color-text)">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-(--color-text)">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-[rgb(var(--color-muted)/0.15)]" />;
}

function StickyActions({
  loading,
  loadingMessage,
  onCancel,
}: {
  loading: boolean;
  loadingMessage: string;
  onCancel: () => void;
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-6 border-t border-default bg-surface/90 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="
            inline-flex items-center gap-2 rounded-md
            bg-(--color-brand)
            px-6 py-2
            text-(--color-bg)
            hover:bg-(--color-brand-dark)
            focus:ring-2 focus:ring-(--color-brand-accent)
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-(--color-bg)/30 border-t-(--color-bg)" />
          )}
          <span>{loading ? loadingMessage : "Salvar pacote"}</span>
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="
            rounded-md border border-default
            px-6 py-2
            text-(--color-text)
            hover:bg-surface
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

/* ================= Page ================= */

type Categoria = { id: number; nome: string };

export default function NovoPacotePage() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | "">(
    ""
  );
  const [criandoCategoria, setCriandoCategoria] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState("");

  const [fotoCapa, setFotoCapa] = useState<File | null>(null);
  const [fotoBanner, setFotoBanner] = useState<File | null>(null);
  const [fotoDestaque, setFotoDestaque] = useState<File | null>(null);

  const [descricao, setDescricao] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetch("/api/admin/categorias-viagem")
      .then((r) => r.json())
      .then(setCategorias)
      .catch(() => alert("Erro ao carregar categorias"));
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 bg-(--color-bg)">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-(--color-white)">
          Criar novo pacote
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Section
          title="Informações básicas"
          description="Dados principais do pacote"
        >
          <Field label="Nome do pacote" required>
            <input
              name="nome"
              required
              placeholder="Ex: Itália Clássica"
              className="w-full rounded-md border border-default px-3 py-2 focus:outline-none focus:ring-2 focus:ring-(--color-brand-light)"
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Categoria">
              {!criandoCategoria ? (
                <select
                  value={categoriaSelecionada}
                  onChange={(e) =>
                    e.target.value === "nova"
                      ? setCriandoCategoria(true)
                      : setCategoriaSelecionada(
                          e.target.value ? Number(e.target.value) : ""
                        )
                  }
                  className="w-full rounded-md border border-default px-3 py-2 focus:outline-none focus:ring-2 focus:ring-(--color-brand-light)"
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nome}
                    </option>
                  ))}
                  <option value="nova">Nova categoria +</option>
                </select>
              ) : (
                <div className="space-y-3 rounded-md border border-default bg-surface p-4">
                  <input
                    value={novaCategoria}
                    onChange={(e) => setNovaCategoria(e.target.value)}
                    placeholder="Nome da nova categoria"
                    className="w-full rounded-md border border-default px-3 py-2"
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={novaCategoria}
                      className="rounded-md bg-(--color-brand-light) px-4 py-2 text-sm text-(--color-bg) hover:bg-(--color-brand)"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCriandoCategoria(false);
                        setNovaCategoria("");
                      }}
                      className="text-sm text-muted hover:underline"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </Field>

            <Field label="Data de início">
              <input
                name="data_inicio"
                type="date"
                className="w-full rounded-md border border-default px-3 py-2 focus:outline-none focus:ring-2 focus:ring-(--color-brand-light)"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Preço" required>
              <input
                name="preco"
                type="number"
                step="0.01"
                min="0"
                required
                placeholder="0.00"
                className="w-full rounded-md border border-default px-3 py-2 focus:outline-none focus:ring-2 focus:ring-(--color-brand-light)"
              />
            </Field>
            <Field label="Moeda">
              <select
                name="moeda"
                defaultValue="EUR"
                className="rounded-md border border-default px-3 py-2 focus:outline-none focus:ring-2 focus:ring-(--color-brand-light)"
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="BRL">BRL</option>
                <option value="GBP">GBP</option>
              </select>
            </Field>
          </div>
        </Section>

        <Section
          title="Imagens"
          description="Recomendamos seguir as proporções para melhor visualização"
        >
          <UploadImagem
            label="Foto de capa (16:9)"
            value={fotoCapa}
            onChange={setFotoCapa}
            aspect="16:9"
          />
          <UploadImagem
            label="Imagem de destaque (4:3)"
            value={fotoDestaque}
            onChange={setFotoDestaque}
            aspect="4:3"
          />
          <UploadImagem
            label="Banner da página (21:9)"
            value={fotoBanner}
            onChange={setFotoBanner}
            aspect="21:9"
          />
        </Section>

        <Section title="Conteúdo" description="Textos exibidos ao usuário">
          <Field label="Texto de destaque">
            <textarea
              name="texto_destaque"
              rows={2}
              placeholder="Texto curto para destacar"
              className="w-full rounded-md border border-default px-3 py-2 focus:outline-none focus:ring-2 focus:ring-(--color-brand-light)"
            />
          </Field>
          <Field label="Resumo">
            <textarea
              name="resumo"
              rows={3}
              placeholder="Resumo do pacote"
              className="w-full rounded-md border border-default px-3 py-2 focus:outline-none focus:ring-2 focus:ring-(--color-brand-light)"
            />
          </Field>
          <Divider />
          <Field label="Descrição completa">
            <RichTextEditor value={descricao} onChange={setDescricao} />
          </Field>
        </Section>

        <StickyActions
          loading={loading}
          loadingMessage={loadingMessage}
          onCancel={() => {
            if (confirm("Deseja cancelar? Todas as alterações serão perdidas."))
              window.location.href = "/admin/pacotes";
          }}
        />
      </form>
    </div>
  );
}
