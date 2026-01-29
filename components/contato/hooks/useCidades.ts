import { useEffect, useMemo, useState } from "react";

type Cidade = {
  id: number;
  nome: string;
};

export function useCidades(estado: string) {
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    if (!estado || estado === "FORA") return;

    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
    )
      .then((res) => res.json())
      .then(setCidades);
  }, [estado]);

  const filtradas = useMemo(() => {
    return cidades.filter((c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }, [busca, cidades]);

  return {
    cidades,
    filtradas,
    busca,
    setBusca,
    setCidades,
  };
}
