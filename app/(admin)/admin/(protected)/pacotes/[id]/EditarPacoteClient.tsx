"use client";

import { useState } from "react";
import { toast } from "sonner";

import InformacoesBasicas from "@/components/pacotes/novos/InformacoesBasicas";
import ImagensPacote from "@/components/pacotes/novos/ImagensPacote";
import ConteudoPacote from "@/components/pacotes/novos/ConteudoPacote";
import StickyActions from "@/components/pacotes/novos/StickyActions";

type EditarPacoteClientProps = {
  pacote: {
    id: number;
    nome: string;
    categoria_id: number;
    data_inicio: string;
    preco: number;
    texto_destaque: string;
    resumo: string;
    descricao: string;
    destaque: boolean;
    capaUrl?: string;
    destaqueUrl?: string;
    bannerUrl?: string;
  };
  categorias: {
    id: number;
    nome: string;
  }[];
};

export default function EditarPacoteClient({
  pacote,
  categorias,
}: EditarPacoteClientProps) {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | "">(
    pacote.categoria_id
  );

  const [descricao, setDescricao] = useState(pacote.descricao);

  const [fotoCapa, setFotoCapa] = useState<File | null>(null);
  const [fotoDestaque, setFotoDestaque] = useState<File | null>(null);
  const [fotoBanner, setFotoBanner] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      setLoading(true);
      setLoadingMessage("Salvando alterações...");

      const form = e.currentTarget;
      const formData = new FormData(form);

      const payload = {
        nome: formData.get("nome"),
        categoria_id: categoriaSelecionada,
        data_inicio: formData.get("data_inicio") || null,
        preco: Number(formData.get("preco")),
        resumo: formData.get("resumo") || null,
        texto_destaque: formData.get("texto_destaque") || null,
        descricao,
        destaque: formData.get("destaque") === "on",
      };

      const res = await fetch(`/api/admin/pacotes/${pacote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setLoading(false);
        throw new Error("Erro ao atualizar pacote");
      }

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

      setLoadingMessage("Atualizando imagens...");

      if (fotoCapa) await uploadImagem(fotoCapa, "CAPA");
      if (fotoDestaque) await uploadImagem(fotoDestaque, "DESTAQUE");
      if (fotoBanner) await uploadImagem(fotoBanner, "BANNER");

      toast.success("Pacote atualizado com sucesso ✨");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar alterações");
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  }

  return (
    <div className="bg-admin min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-admin">
          Editar pacote
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <InformacoesBasicas
            categorias={categorias}
            setCategorias={() => {}}
            categoriaSelecionada={categoriaSelecionada}
            setCategoriaSelecionada={setCategoriaSelecionada}
            criandoCategoria={false}
            setCriandoCategoria={() => {}}
            novaCategoria=""
            setNovaCategoria={() => {}}
            valoresIniciais={{
              nome: pacote.nome,
              data_inicio: pacote.data_inicio,
              preco: pacote.preco,
              destaque: pacote.destaque,
            }}
          />

          <ImagensPacote
            fotoCapa={fotoCapa}
            setFotoCapa={setFotoCapa}
            fotoDestaque={fotoDestaque}
            setFotoDestaque={setFotoDestaque}
            fotoBanner={fotoBanner}
            setFotoBanner={setFotoBanner}
            capaAtualUrl={pacote.capaUrl}
            destaqueAtualUrl={pacote.destaqueUrl}
            bannerAtualUrl={pacote.bannerUrl}
          />

          <ConteudoPacote
            descricao={descricao}
            setDescricao={setDescricao}
            valoresIniciais={{
              texto_destaque: pacote.texto_destaque,
              resumo: pacote.resumo,
            }}
          />

          <StickyActions
            loading={loading}
            loadingMessage={loadingMessage}
            onCancel={() => history.back()}
          />
        </form>
      </div>
    </div>
  );
}
