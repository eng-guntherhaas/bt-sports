import Section from "./Section";
import Field from "./Field";
import React from "react";

const inputBase =
  "mt-2 w-full rounded-md bg-surface px-3.5 py-2 border border-default text-admin focus-ring-brand";

type Categoria = {
  id: number;
  nome: string;
};

type InformacoesBasicasProps = {
  categorias: Categoria[];
  setCategorias: React.Dispatch<React.SetStateAction<Categoria[]>>;

  categoriaSelecionada: number | "";
  setCategoriaSelecionada: (value: number | "") => void;

  criandoCategoria: boolean;
  setCriandoCategoria: (value: boolean) => void;

  novaCategoria: string;
  setNovaCategoria: (value: string) => void;

  valoresIniciais?: {
    nome?: string;
    data_inicio?: string;
    preco?: number;
    moeda?: string;
    destaque?: boolean;
  };
};

export default function InformacoesBasicas({
  categorias,
  setCategorias,
  categoriaSelecionada,
  setCategoriaSelecionada,
  criandoCategoria,
  setCriandoCategoria,
  novaCategoria,
  setNovaCategoria,
  valoresIniciais,
}: InformacoesBasicasProps) {
  return (
    <Section
      title="Informações básicas"
      description="Dados principais do pacote"
    >
      <Field label="Nome do pacote" required>
        <input
          name="nome"
          required
          defaultValue={valoresIniciais?.nome}
          className={inputBase}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Categoria">
          {!criandoCategoria ? (
            <select
              value={categoriaSelecionada}
              onChange={(e) => {
                if (e.target.value === "nova") {
                  setCriandoCategoria(true);
                } else {
                  setCategoriaSelecionada(
                    e.target.value ? Number(e.target.value) : ""
                  );
                }
              }}
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
                  onClick={async () => {
                    if (!novaCategoria.trim()) return;

                    const res = await fetch("/api/admin/categorias-viagem", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ nome: novaCategoria }),
                    });

                    if (!res.ok) {
                      alert("Erro ao criar categoria");
                      return;
                    }

                    const categoriaCriada = await res.json();

                    setCategorias((prev) => [...prev, categoriaCriada]);
                    setCategoriaSelecionada(categoriaCriada.id);

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
            name="data_inicio"
            defaultValue={valoresIniciais?.data_inicio}
            className={inputBase}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Preço" required>
          <input
            type="number"
            name="preco"
            defaultValue={valoresIniciais?.preco}
            className={inputBase}
          />
        </Field>

        <Field label="Moeda">
          <select
            name="moeda"
            defaultValue={valoresIniciais?.moeda ?? "EUR"}
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
            name="destaque"
            defaultChecked={valoresIniciais?.destaque}
            className="h-4 w-4 rounded border-default text-brand focus:ring-brand"
          />
          Destacar este pacote na home
        </label>
      </div>
    </Section>
  );
}
