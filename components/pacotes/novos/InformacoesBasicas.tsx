"use client";

import Section from "./Section";
import Field from "./Field";
import React from "react";
import { toast } from "sonner";
import { PacoteFormState } from "@/types/pacoteForm";

const inputBase =
  "mt-2 w-full rounded-md bg-surface px-3.5 py-2 border border-default text-admin focus-ring-brand";

type Categoria = {
  id: number;
  nome: string;
};

type Props = {
  categorias: Categoria[];
  setCategorias: React.Dispatch<React.SetStateAction<Categoria[]>>;

  categoriaSelecionada: number | "";
  onCategoriaChange: (value: number | "") => void;

  valores: Pick<
    PacoteFormState,
    "nome" | "data_inicio" | "preco" | "moeda" | "destaque"
  >;

  onChange: <K extends keyof PacoteFormState>(
    key: K,
    value: PacoteFormState[K]
  ) => void;
};

export default function InformacoesBasicas({
  categorias,
  setCategorias,
  categoriaSelecionada,
  onCategoriaChange,
  valores,
  onChange,
}: Props) {
  const [criandoCategoria, setCriandoCategoria] = React.useState(false);
  const [novaCategoria, setNovaCategoria] = React.useState("");

  return (
    <Section
      title="Informações básicas"
      description="Dados principais do pacote"
    >
      <Field label="Nome do pacote" required>
        <input
          value={valores.nome}
          onChange={(e) => onChange("nome", e.target.value)}
          className={inputBase}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Categoria">
          {!criandoCategoria ? (
            <div className="space-y-2">
              <select
                value={categoriaSelecionada}
                onChange={(e) =>
                  onCategoriaChange(
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
              </select>

              <button
                type="button"
                onClick={() => setCriandoCategoria(true)}
                className="text-sm font-medium text-brand hover:underline"
              >
                + Criar nova categoria
              </button>
            </div>
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
                  onClick={async () => {
                    if (!novaCategoria.trim()) return;

                    const res = await fetch("/api/admin/categorias-viagem", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        nome: novaCategoria,
                      }),
                    });

                    if (!res.ok) {
                      toast.error("Erro ao criar categoria");
                      return;
                    }

                    const categoriaCriada = await res.json();

                    setCategorias((prev) => [...prev, categoriaCriada]);

                    onCategoriaChange(categoriaCriada.id);

                    setNovaCategoria("");
                    setCriandoCategoria(false);
                  }}
                  className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-on-brand"
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
          <input
            type="date"
            value={valores.data_inicio}
            onChange={(e) => onChange("data_inicio", e.target.value)}
            className={inputBase}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Preço">
          <input
            type="number"
            value={valores.preco}
            onChange={(e) => onChange("preco", Number(e.target.value))}
            className={inputBase}
          />
        </Field>

        <Field label="Moeda">
          <select
            value={valores.moeda}
            onChange={(e) => onChange("moeda", e.target.value)}
            className={inputBase}
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="BRL">BRL</option>
            <option value="GBP">GBP</option>
          </select>
        </Field>
      </div>

      <div className="pt-2">
        <label className="flex items-center gap-3 text-sm font-medium text-admin">
          <input
            type="checkbox"
            checked={valores.destaque}
            onChange={(e) => onChange("destaque", e.target.checked)}
          />
          Destacar este pacote na home
        </label>
      </div>
    </Section>
  );
}
