type Props = {
  estados: {
    id: number;
    sigla: string;
    nome: string;
  }[];
  value: string;
  onChange: (value: string) => void;
};

export function EstadoSelect({ estados, value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-semibold text-color-text">
        Estado
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          mt-2 w-full rounded-md
          bg-surface px-3.5 py-2
          border border-default
          focus-ring-brand
        "
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
  );
}
