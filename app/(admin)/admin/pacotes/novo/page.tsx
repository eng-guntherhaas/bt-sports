"use client";

import { useEffect, useState } from "react";
import InformacoesBasicas from "@/components/pacotes/novos/InformacoesBasicas";
import ImagensPacote from "@/components/pacotes/novos/ImagensPacote";
import ConteudoPacote from "@/components/pacotes/novos/ConteudoPacote";
import StickyActions from "@/components/pacotes/novos/StickyActions";

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

  useEffect(() => {
    fetch("/api/admin/categorias-viagem")
      .then((r) => r.json())
      .then(setCategorias)
      .catch(() => alert("Erro ao carregar categorias"));
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
            fotoDestaque={fotoDestaque}
            setFotoDestaque={setFotoDestaque}
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
