"use client";

import { useEffect, useState } from "react";
import UploadImagem from "@/components/admin/UploadImagem";
import RichTextEditor from "@/components/admin/RichTextEditor";

type Categoria = {
  id: number;
  nome: string;
};

export default function NovoPacotePage() {
  const [loading, setLoading] = useState(false);

  /* ================= CATEGORIAS ================= */
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | "">(
    ""
  );
  const [criandoCategoria, setCriandoCategoria] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState("");

  /* ================= FOTOS ESTRUTURAIS ================= */
  const [fotoCapa, setFotoCapa] = useState<File | null>(null);
  const [fotoBanner, setFotoBanner] = useState<File | null>(null);
  const [fotoDestaque, setFotoDestaque] = useState<File | null>(null);

  /* ================= EDITOR ================= */
  const [descricao, setDescricao] = useState("");

  /* ================= FETCH CATEGORIAS ================= */
  useEffect(() => {
    fetch("/api/admin/categorias-viagem")
      .then((r) => r.json())
      .then(setCategorias)
      .catch(() => alert("Erro ao carregar categorias"));
  }, []);

  async function salvarCategoria() {
    if (!novaCategoria.trim()) return;

    const res = await fetch("/api/admin/categorias-viagem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: novaCategoria }),
    });

    if (!res.ok) {
      alert("Erro ao criar categoria");
      return;
    }

    const categoria = await res.json();
    setCategorias((prev) => [...prev, categoria]);
    setCategoriaSelecionada(categoria.id);
    setCriandoCategoria(false);
    setNovaCategoria("");
  }

  /* ================= SUBMIT ================= */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      nome: formData.get("nome"),
      categoria_id:
        categoriaSelecionada !== "" ? Number(categoriaSelecionada) : null,
      data_inicio: formData.get("data_inicio"),
      preco: formData.get("preco"),
      moeda: formData.get("moeda"),
      texto_destaque: formData.get("texto_destaque"),
      resumo: formData.get("resumo"),
      descricao,
      // fotos estruturais serão tratadas após o create
    };

    const res = await fetch("/api/admin/pacotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      window.location.href = "/admin/pacotes";
    } else {
      alert("Erro ao salvar pacote");
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">
        Criar novo pacote
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ================= Nome ================= */}
        <input
          name="nome"
          required
          placeholder="Nome do pacote"
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />

        {/* ================= Categoria ================= */}
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
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
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
          <div className="rounded-md border bg-gray-50 p-4 space-y-3">
            <input
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              placeholder="Nome da nova categoria"
              className="w-full rounded-md border px-3 py-2"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={salvarCategoria}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
              >
                Salvar categoria
              </button>
              <button
                type="button"
                onClick={() => {
                  setCriandoCategoria(false);
                  setNovaCategoria("");
                }}
                className="text-sm text-gray-600 hover:underline"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* ================= Uploads estruturais ================= */}
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

        {/* ================= Texto ================= */}
        <textarea
          name="texto_destaque"
          rows={2}
          placeholder="Texto de destaque"
          className="w-full rounded-md border px-3 py-2"
        />

        <textarea
          name="resumo"
          rows={3}
          placeholder="Resumo"
          className="w-full rounded-md border px-3 py-2"
        />

        {/* ================= Editor rico ================= */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Descrição completa
          </label>
          <RichTextEditor value={descricao} onChange={setDescricao} />
        </div>

        {/* ================= Ações ================= */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-gray-900 px-6 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar pacote"}
          </button>
        </div>
      </form>
    </div>
  );
}
