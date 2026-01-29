import { useEffect, useState } from "react";

type Estado = {
  id: number;
  sigla: string;
  nome: string;
};

export function useEstados() {
  const [estados, setEstados] = useState<Estado[]>([]);

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => res.json())
      .then((data) =>
        setEstados(
          data.sort((a: Estado, b: Estado) => a.nome.localeCompare(b.nome))
        )
      );
  }, []);

  return estados;
}
