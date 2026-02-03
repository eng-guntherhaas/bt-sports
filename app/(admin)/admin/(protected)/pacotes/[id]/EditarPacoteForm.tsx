"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { Pacote, CategoriaViagem } from "@/generated/prisma";

type Props = {
  pacote: Pacote;
  categorias: CategoriaViagem[];
};

export default function EditarPacoteForm({ pacote, categorias }: Props) {
  const [status, setStatus] = useState(pacote.status);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const payload = {
        nome: String(formData.get("nome")),
        resumo: String(formData.get("resumo") ?? ""),
        texto_destaque: String(formData.get("texto_destaque") ?? ""),
        descricao: String(formData.get("descricao") ?? ""),
        preco: Number(formData.get("preco")),
        categoria_id: Number(formData.get("categoria_id")),
      };

      const res = await fetch(`/api/admin/pacotes/${pacote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Erro ao salvar");
      }

      toast.success("Pacote atualizado com sucesso");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar pacote");
    } finally {
      setLoading(false);
    }
  }

  async function togglePublicacao(publicar: boolean) {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/admin/pacotes/${pacote.id}/publicar`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: publicar ? "PUBLICADO" : "RASCUNHO",
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao alterar status");
      }

      setStatus(publicar ? "PUBLICADO" : "RASCUNHO");
      toast.success(
        publicar ? "Pacote publicado" : "Pacote despublicado"
      );
    } catch (err) {
      console.error(err);
      toast.error("Erro ao alterar status");
    } finally {
      setLoading(false);
    }
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
          <button
            type="button"
            disabled={loading}
            onClick={() => togglePublicacao(true)}
          >
            Publicar
          </button>
        ) : (
          <button
            type="button"
            disabled={loading}
            onClick={() => togglePublicacao(false)}
          >
            Despublicar
          </button>
        )}
      </div>
    </form>
  );
}
