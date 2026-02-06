"use client";

import { useEffect, useState } from "react";
import InformacoesBasicas from "@/components/pacotes/novos/InformacoesBasicas";
import ImagensPacote from "@/components/pacotes/novos/ImagensPacote";
import ConteudoPacote from "@/components/pacotes/novos/ConteudoPacote";
import StickyActions from "@/components/pacotes/novos/StickyActions";
import { toast } from "sonner";
import { set } from "zod";

type Categoria = {
  id: number;
  nome: string;
};

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
  const [fotoCard, setFotoCard] = useState<File | null>(null);

  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    fetch("/api/admin/categorias-viagem")
      .then((r) => r.json())
      .then(setCategorias)
      .catch(() => toast.error("Erro ao carregar categorias"));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setLoadingMessage("Criando pacote...");

      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const payload = {
        nome: formData.get("nome"),
        categoria_id: categoriaSelecionada,
        data_inicio: formData.get("data_inicio") || undefined,
        preco: Number(formData.get("preco")),
        resumo: formData.get("resumo") || undefined,
        texto_destaque: formData.get("texto_destaque") || undefined,
        descricao,
        destaque: formData.get("destaque") === "on",
      };

      const res = await fetch("/api/admin/pacotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao criar pacote");

      const { pacote } = await res.json();

      async function uploadImagem(file: File, tipo: string) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("tipo", tipo);
        fd.append("pacoteId", pacote.id.toString());

        await fetch("/api/admin/pacotes/upload", {
          method: "POST",
          body: fd,
        });
      }

      setLoadingMessage("Enviando imagens...");

      if (fotoCapa) await uploadImagem(fotoCapa, "CAPA");
      if (fotoCard) await uploadImagem(fotoCard, "CARD");
      if (fotoBanner) await uploadImagem(fotoBanner, "BANNER");

      window.location.href = `/admin/pacotes/${pacote.id}`;
    } catch (err) {
      toast.error("Erro ao salvar pacote");
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  }

  return (
    <div className="bg-admin min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-admin">
          Criar novo pacote
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <InformacoesBasicas
            categorias={categorias}
            setCategorias={setCategorias}
            categoriaSelecionada={categoriaSelecionada}
            setCategoriaSelecionada={setCategoriaSelecionada}
            criandoCategoria={criandoCategoria}
            setCriandoCategoria={setCriandoCategoria}
            novaCategoria={novaCategoria}
            setNovaCategoria={setNovaCategoria}
          />
          <ImagensPacote
            fotoCapa={fotoCapa}
            setFotoCapa={setFotoCapa}
            fotoCard={fotoCard}
            setFotoCard={setFotoCard}
            fotoBanner={fotoBanner}
            setFotoBanner={setFotoBanner}
          />
          <ConteudoPacote descricao={descricao} setDescricao={setDescricao} />

          <StickyActions
            loading={loading}
            loadingMessage={loadingMessage}
            onCancel={() => {
              if (confirm("Deseja cancelar?")) {
                window.location.href = "/admin/pacotes";
              }
            }}
          />
        </form>
      </div>
    </div>
  );
}
