"use client";

type Categoria = {
  id: number;
  nome: string;
};

type PacoteEditavel = {
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
  cardUrl?: string;
  bannerUrl?: string;
};

type EditarPacoteClientProps = {
  pacote: PacoteEditavel;
  categorias: Categoria[];
};

import { useState } from "react";
import InformacoesBasicas from "@/components/pacotes/novos/InformacoesBasicas";
import ImagensPacote from "@/components/pacotes/novos/ImagensPacote";
import ConteudoPacote from "@/components/pacotes/novos/ConteudoPacote";
import StickyActions from "@/components/pacotes/novos/StickyActions";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { toast } from "sonner";
import { set } from "zod";

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
  const [fotoCard, setFotoCard] = useState<File | null>(null);
  const [fotoBanner, setFotoBanner] = useState<File | null>(null);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
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

    try {
      setLoading(true);
      setLoadingMessage("Salvando alterações...");

      const res = await fetch(`/api/admin/pacotes/${pacote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao atualizar pacote");
    } catch (err) {
      toast.error("Erro ao salvar alterações");
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  }

  async function handleDelete() {
    try {
      setLoading(true);
      setLoadingMessage("Excluindo pacote...");

      const res = await fetch(`/api/admin/pacotes/${pacote.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir pacote");

      window.location.href = "/admin/pacotes";
    } catch (err) {
      toast.error("Erro ao excluir pacote");
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  }

  return (
    <div className="bg-admin min-h-screen">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 sm:py-10">
        <h1 className="text-xl font-semibold text-admin sm:text-2xl">
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
            fotoCard={fotoCard}
            setFotoCard={setFotoCard}
            fotoBanner={fotoBanner}
            setFotoBanner={setFotoBanner}
            capaAtualUrl={pacote.capaUrl}
            cardAtualUrl={pacote.cardUrl}
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
            onCancel={() => setShowCancelModal(true)}
            onDelete={() => setShowDeleteModal(true)}
          />
        </form>
      </div>

      <ConfirmModal
        open={showCancelModal}
        title="Cancelar edição?"
        description="As alterações não salvas serão perdidas."
        confirmLabel="Sim, cancelar"
        onCancel={() => setShowCancelModal(false)}
        onConfirm={() => {
          setShowCancelModal(false);
          history.back();
        }}
      />

      <ConfirmModal
        open={showDeleteModal}
        title="Excluir pacote?"
        description="Essa ação é permanente e não pode ser desfeita."
        confirmLabel="Sim, excluir"
        danger
        loading={loading}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
