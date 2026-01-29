"use client";

import { useState } from "react";
import { useEstados } from "./hooks/useEstados";
import { useCidades } from "./hooks/useCidades";
import { EstadoSelect } from "./EstadoSelect";
import { CidadeSelect } from "./CidadeSelect";
import { FormInput } from "./FormInput";
import { FormTextarea } from "./FormTextarea";

export default function ContactForm() {
  const estados = useEstados();

  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [emailErro, setEmailErro] = useState("");

  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const { filtradas, busca, setBusca, setCidades } = useCidades(estado);

  function validarEmail(valor: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailErro(regex.test(valor) ? "" : "E-mail inválido");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (emailErro) return;

    setLoading(true);
    setSucesso(false);

    const formData = new FormData(e.currentTarget);

    const data = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      telefone: formData.get("telefone"),
      estado,
      cidade,
      mensagem: formData.get("mensagem"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      setSucesso(true);
      e.currentTarget.reset();
      setEstado("");
      setCidade("");
      setCidades([]);
      setBusca("");
    }
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

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-16 max-w-xl space-y-6"
      >
        <FormInput name="nome" label="Nome completo" required />

        <FormInput
          name="email"
          type="email"
          label="E-mail"
          required
          onBlur={(e) => validarEmail(e.target.value)}
          error={emailErro}
        />

        <FormInput
          name="telefone"
          type="tel"
          label="Telefone"
          placeholder="+55 11 99999-9999"
        />

        <div className="grid grid-cols-2 gap-x-4">
          <EstadoSelect
            estados={estados}
            value={estado}
            onChange={(novoEstado) => {
              setEstado(novoEstado);
              setCidade("");
              setCidades([]);
              setBusca("");
            }}
          />

          <CidadeSelect
            estado={estado}
            cidade={cidade}
            setCidade={setCidade}
            cidades={filtradas}
            busca={busca}
            setBusca={setBusca}
          />
        </div>

        <FormTextarea name="mensagem" label="Mensagem" rows={4} required />

        {sucesso && (
          <p className="text-center text-sm text-green-600">
            Mensagem enviada com sucesso!
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !!emailErro}
          className={`
            w-full rounded-md px-4 py-3 text-sm font-semibold
            ${
              emailErro
                ? "bg-brand-soft text-muted cursor-not-allowed"
                : "bg-brand text-on-brand bg-brand-dark-hover focus-ring-brand"
            }
          `}
        >
          {loading ? "Enviando..." : "Enviar mensagem"}
        </button>
      </form>
    </section>
  );
}
