"use client";

import { useState } from "react";
import InformacoesBasicas from "@/components/pacotes/novos/InformacoesBasicas";
import ImagensPacote from "@/components/pacotes/novos/ImagensPacote";
import ConteudoPacote from "@/components/pacotes/novos/ConteudoPacote";
import StickyActions from "@/components/pacotes/novos/StickyActions";

export default function EditarPacoteClient({ pacote, categorias }: any) {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | "">(
    pacote.categoria_id
  );

  const [descricao, setDescricao] = useState(pacote.descricao);

  const [fotoCapa, setFotoCapa] = useState<File | null>(null);
  const [fotoDestaque, setFotoDestaque] = useState<File | null>(null);
  const [fotoBanner, setFotoBanner] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
