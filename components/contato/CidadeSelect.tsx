import { useRef } from "react";
import { useClickOutside } from "./hooks/useClickOutside";

type Cidade = {
  id: number;
  nome: string;
};

type Props = {
  estado: string;
  cidade: string;
  setCidade: (v: string) => void;
  cidades: Cidade[];
  busca: string;
  setBusca: (v: string) => void;
};

export function CidadeSelect({
  estado,
  cidade,
  setCidade,
  cidades,
  busca,
  setBusca,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [aberta, setAberta] = useClickOutside(ref);

  const desativado = !estado || estado === "FORA";

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm font-semibold text-color-text">
        Cidade
      </label>

      <button
        type="button"
        disabled={desativado}
        onClick={() => setAberta((v) => !v)}
        className={`
          mt-2 w-full rounded-md px-3.5 py-2 text-left
          border border-default bg-surface
          ${desativado ? "opacity-50 cursor-not-allowed" : "focus-ring-brand"}
        `}
      >
        {cidade || "Selecione a cidade"}
      </button>

      {aberta && !desativado && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-surface border border-default shadow">
          <input
            placeholder="Buscar cidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full px-3 py-2 border-b border-default focus:outline-none"
          />

          <ul className="max-h-56 overflow-y-auto">
            {cidades.map((c) => (
              <li
                key={c.id}
                onClick={() => {
                  setCidade(c.nome);
                  setAberta(false);
                  setBusca("");
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
  );
}
