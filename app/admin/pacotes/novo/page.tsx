"use client";

import { useEffect, useState } from "react";
import UploadImagem from "@/components/admin/UploadImagem";
import RichTextEditor from "@/components/admin/RichTextEditor";

/* ================= UI Helpers ================= */

const inputBase =
  "mt-2 w-full rounded-md bg-surface px-3.5 py-2 border border-default text-admin focus-ring-brand";

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
    <section className="rounded-2xl border border-default bg-surface p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-admin">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-admin-muted">{description}</p>
        )}
      </div>

      <div className="space-y-5">{children}</div>
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
      <label className="block text-sm font-semibold text-admin">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-admin-muted">{hint}</p>}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-border-muted" />;
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
          className={`
            inline-flex items-center gap-2 rounded-md
            px-6 py-2 text-sm font-semibold
            ${
              loading
                ? "bg-brand-soft text-muted"
                : "bg-brand text-on-brand bg-brand-dark-hover"
            }
            focus-ring-brand
            disabled:cursor-not-allowed
          `}
        >
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-brand/30 border-t-on-brand" />
          )}
          {loading ? loadingMessage : "Salvar pacote"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="
rounded-md border border-default
px-6 py-2 text-sm font-semibold
text-admin

transition-all duration-150
cursor-pointer

hover:bg-brand/5
hover:text-brand
hover:border-brand/50
hover:ring-1 hover:ring-brand/30

focus-ring-brand
disabled:opacity-50
disabled:pointer-events-none
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
    // lógica de submit aqui
  };

  useEffect(() => {
    fetch("/api/admin/categorias-viagem")
      .then((r) => r.json())
      .then(setCategorias)
      .catch(() => alert("Erro ao carregar categorias"));
  }, []);

  return (
    <div className="bg-admin min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-10 space-y-8">
        <header>
          <h1 className="text-2xl font-semibold text-admin">
            Criar novo pacote
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ================= Informações básicas ================= */}
          <Section
            title="Informações básicas"
            description="Dados principais do pacote"
          >
            <Field label="Nome do pacote" required>
              <input
                name="nome"
                required
                placeholder="Ex: Itália Clássica"
                className={inputBase}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className={inputBase}
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
                  <div className="rounded-md border border-default bg-surface-muted p-4 space-y-3">
                    <input
                      value={novaCategoria}
                      onChange={(e) => setNovaCategoria(e.target.value)}
                      placeholder="Nome da nova categoria"
                      className={inputBase}
                    />
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-on-brand bg-brand-dark-hover"
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCriandoCategoria(false);
                          setNovaCategoria("");
                        }}
                        className="text-sm font-medium text-admin-muted hover:underline"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </Field>

              <Field label="Data de início">
                <input type="date" name="data_inicio" className={inputBase} />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Preço" required>
                <input
                  name="preco"
                  type="number"
                  step="0.01"
                  min="0"
                  className={inputBase}
                />
              </Field>

              <Field label="Moeda">
                <select name="moeda" defaultValue="EUR" className={inputBase}>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="BRL">BRL</option>
                  <option value="GBP">GBP</option>
                </select>
              </Field>
            </div>
          </Section>

          {/* ================= Imagens ================= */}
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

          {/* ================= Conteúdo ================= */}
          <Section title="Conteúdo" description="Textos exibidos ao usuário">
            <Field label="Texto de destaque">
              <textarea name="texto_destaque" rows={2} className={inputBase} />
            </Field>

            <Field label="Resumo">
              <textarea name="resumo" rows={3} className={inputBase} />
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
              if (
                confirm("Deseja cancelar? Todas as alterações serão perdidas.")
              ) {
                window.location.href = "/admin/pacotes";
              }
            }}
          />
        </form>
      </div>
    </div>
  );
}
