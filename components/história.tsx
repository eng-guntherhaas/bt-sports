export default function NossaHistoria() {
  return (
    <section
      id="historia"
      className="relative isolate bg-gray-900 py-24 sm:py-32 text-white"
      aria-labelledby="nossa-historia"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* BLOCO CENTRALIZADO */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="nossa-historia" className="text-3xl font-bold tracking-tight">
            Nossa história
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            Com mais de duas décadas de atuação, a Biarritz Sports construiu uma
            trajetória sólida no mercado esportivo, participando da organização
            de alguns dos principais eventos de corrida do país.
          </p>

          <p className="mt-4 text-lg text-gray-300">
            A evolução constante dos processos, da equipe e da tecnologia sempre
            esteve alinhada ao compromisso com a qualidade e o respeito ao
            atleta.
          </p>
        </div>
      </div>
    </section>
  );
}
