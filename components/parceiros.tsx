import { parceiros } from "@/data/sobreBiarritz";

export default function Parceiros() {
  return (
    <section
      id="parcerias"
      className="bg-gray-900 py-24 sm:py-32 text-white"
      aria-labelledby="parceiros"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="parceiros" className="text-3xl font-bold tracking-tight">
            Agência parceira oficial
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            Atuamos em parceria direta com as organizações oficiais de algumas
            das principais maratonas e eventos esportivos internacionais,
            oferecendo segurança, credibilidade e suporte completo aos nossos
            clientes.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {parceiros.map((nome) => (
            <div
              key={nome}
              className="flex items-center justify-center rounded-lg border border-white/20 px-6 py-8 text-center text-sm font-medium text-white"
            >
              {nome}
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-4xl text-center text-gray-400 text-sm">
          Além dos grupos organizados, desenvolvemos roteiros e viagens sob
          medida para atletas, acompanhantes e grupos fechados, para qualquer
          evento esportivo ao redor do mundo.
        </p>
      </div>
    </section>
  );
}
