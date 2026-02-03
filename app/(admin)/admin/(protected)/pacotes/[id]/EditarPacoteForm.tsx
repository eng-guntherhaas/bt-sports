"use client";

import { useState } from "react";
import type { PacoteComRelacoes, Categoria } from "./types";

type Props = {
  pacote: PacoteComRelacoes;
  categorias: Categoria[];
};

export default function EditarPacoteForm({ pacote, categorias }: Props) {
  const [status, setStatus] = useState(pacote.status);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      nome: String(formData.get("nome")),
      resumo: String(formData.get("resumo") ?? ""),
      texto_destaque: String(formData.get("texto_destaque") ?? ""),
      descricao: String(formData.get("descricao") ?? ""),
      preco: Number(formData.get("preco")),
      categoria_id: Number(formData.get("categoria_id")),
    };

    await fetch(`/api/admin/pacotes/${pacote.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    alert("Pacote atualizado");
  }

  async function togglePublicacao(publicar: boolean) {
    setLoading(true);

    await fetch(`/api/admin/pacotes/${pacote.id}/publicar`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: publicar ? "PUBLICADO" : "RASCUNHO",
      }),
    });

    setStatus(publicar ? "PUBLICADO" : "RASCUNHO");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Editar pacote</h1>

      <input name="nome" defaultValue={pacote.nome} />
      <textarea
        name="texto_destaque"
        defaultValue={pacote.texto_destaque ?? ""}
      />
      <textarea name="resumo" defaultValue={pacote.resumo ?? ""} />
      <textarea name="descricao" defaultValue={pacote.descricao ?? ""} />

      <select name="categoria_id" defaultValue={pacote.categoria_id}>
        {categorias.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nome}
          </option>
        ))}
      </select>

      <div className="flex gap-3">
        <button type="submit" disabled={loading}>
          Salvar alterações
        </button>

        {status === "RASCUNHO" ? (
          <button type="button" onClick={() => togglePublicacao(true)}>
            Publicar
          </button>
        ) : (
          <button type="button" onClick={() => togglePublicacao(false)}>
            Despublicar
          </button>
        )}
      </div>
    </form>
  );
}
