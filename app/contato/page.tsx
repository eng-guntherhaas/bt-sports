"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Estado = {
  id: number;
  sigla: string;
  nome: string;
};

type Cidade = {
  id: number;
  nome: string;
};

export default function ContactForm() {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [cidadeBusca, setCidadeBusca] = useState("");
  const [cidadeAberta, setCidadeAberta] = useState(false);
  const [emailErro, setEmailErro] = useState("");

  const cidadeRef = useRef<HTMLDivElement>(null);

  /* =========================
     Fetch Estados
  ========================= */
  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => res.json())
      .then((data) =>
        setEstados(
          data.sort((a: Estado, b: Estado) => a.nome.localeCompare(b.nome))
        )
      );
  }, []);

  /* =========================
     Fetch Cidades
  ========================= */
  useEffect(() => {
    if (!estado || estado === "FORA") {
      setCidades([]);
      setCidade("");
      return;
    }

    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
    )
      .then((res) => res.json())
      .then(setCidades);
  }, [estado]);

  /* =========================
     Fecha dropdown cidade
  ========================= */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cidadeRef.current && !cidadeRef.current.contains(e.target as Node)) {
        setCidadeAberta(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =========================
     Filtrar cidades
  ========================= */
  const cidadesFiltradas = useMemo(() => {
    return cidades.filter((c) =>
      c.nome.toLowerCase().includes(cidadeBusca.toLowerCase())
    );
  }, [cidadeBusca, cidades]);

  /* =========================
     Validação de e-mail
  ========================= */
  function validarEmail(valor: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailErro(regex.test(valor) ? "" : "E-mail inválido");
  }

  return (
    <section className="relative isolate bg-surface-muted px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-color-text sm:text-5xl">
          Fale com a <span className="text-brand">Biarritz Turismo Sports</span>
        </h1>
        <p className="mt-4 text-lg text-muted">
          Preencha o formulário abaixo e nossa equipe entrará em contato.
        </p>
      </div>

      <form className="mx-auto mt-16 max-w-xl space-y-6">
        {/* Nome */}
        <div>
          <label className="block text-sm font-semibold text-color-text">
            Nome completo <span className="text-brand">*</span>
          </label>
          <input
            required
            aria-required="true"
            className="mt-2 w-full rounded-md bg-surface px-3.5 py-2 border border-default focus-ring-brand"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-color-text">
            E-mail <span className="text-brand">*</span>
          </label>
          <input
            type="email"
            required
            aria-required="true"
            onBlur={(e) => validarEmail(e.target.value)}
            className="mt-2 w-full rounded-md bg-surface px-3.5 py-2 border border-default focus-ring-brand"
          />
          {emailErro && <p className="mt-1 text-sm text-error">{emailErro}</p>}
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-semibold text-color-text">
            Telefone <span className="text-muted">(opcional)</span>
          </label>
          <input
            type="tel"
            placeholder="+55 11 99999-9999"
            className="mt-2 w-full rounded-md bg-surface px-3.5 py-2 border border-default focus-ring-brand"
          />
        </div>

        {/* Estado + Cidade */}
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <label className="block text-sm font-semibold text-color-text">
              Estado
            </label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="mt-2 w-full rounded-md bg-surface px-3.5 py-2 border border-default focus-ring-brand"
            >
              <option value="">Selecione</option>
              <option value="FORA">Fora do Brasil</option>
              {estados.map((e) => (
                <option key={e.id} value={e.sigla}>
                  {e.nome}
                </option>
              ))}
            </select>
          </div>

          <div ref={cidadeRef} className="relative">
            <label className="block text-sm font-semibold text-color-text">
              Cidade
            </label>

            <button
              type="button"
              disabled={!estado || estado === "FORA"}
              onClick={() => setCidadeAberta((v) => !v)}
              className={`
                mt-2 w-full rounded-md px-3.5 py-2 text-left
                border border-default bg-surface
                ${
                  !estado || estado === "FORA"
                    ? "opacity-50 cursor-not-allowed"
                    : "focus-ring-brand"
                }
              `}
            >
              {cidade || "Selecione a cidade"}
            </button>

            {cidadeAberta && (
              <div className="absolute z-10 mt-1 w-full rounded-md bg-surface border border-default shadow">
                <input
                  placeholder="Buscar cidade..."
                  value={cidadeBusca}
                  onChange={(e) => setCidadeBusca(e.target.value)}
                  className="w-full px-3 py-2 border-b border-default focus:outline-none"
                />

                <ul className="max-h-56 overflow-y-auto">
                  {cidadesFiltradas.map((c) => (
                    <li
                      key={c.id}
                      onClick={() => {
                        setCidade(c.nome);
                        setCidadeAberta(false);
                        setCidadeBusca("");
                      }}
                      className="px-3 py-2 cursor-pointer hover:bg-surface-muted"
                    >
                      {c.nome}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mensagem */}
        <div>
          <label className="block text-sm font-semibold text-color-text">
            Mensagem <span className="text-brand">*</span>
          </label>
          <textarea
            rows={4}
            required
            aria-required="true"
            className="mt-2 w-full rounded-md bg-surface px-3.5 py-2 border border-default focus-ring-brand"
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          disabled={!!emailErro}
          className={`
            w-full rounded-md px-4 py-3 text-sm font-semibold
            ${
              emailErro
                ? "bg-brand-soft text-muted cursor-not-allowed"
                : "bg-brand text-on-brand bg-brand-dark-hover focus-ring-brand"
            }
          `}
        >
          Enviar mensagem
        </button>
      </form>
    </section>
  );
}
