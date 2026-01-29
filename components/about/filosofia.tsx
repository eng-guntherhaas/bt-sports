export default function Filosofia() {
  return (
    <section
      id="filosofia"
      className="bg-surface-muted py-24"
      aria-labelledby="filosofia"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1">
          <div className="ml-auto w-full max-w-5xl text-left xl:max-w-6xl">
            <h2
              id="filosofia"
              className="text-3xl font-bold tracking-tight text-color-text"
            >
              Filosofia
            </h2>

            <p className="mt-6 text-lg text-muted">
              Nosso propósito é criar experiências esportivas memoráveis,
              seguras e bem organizadas, colocando o atleta no centro de cada
              decisão.
            </p>

            <div className="mt-10 space-y-4 text-lg leading-relaxed text-color-text">
              <p>
                Fiel aos princípios da{" "}
                <strong className="text-brand">Biarritz Turismo</strong>, a
                <strong className="text-brand"> BT Sports</strong> possui uma
                proposta única no segmento de turismo esportivo.
              </p>

              <p>
                Nossos grupos contam com{" "}
                <strong className="text-brand">
                  acompanhamento integral de guia bilíngue próprio
                </strong>
                , além do suporte de guias locais sempre que necessário.
              </p>
            </div>

            <div className="mt-6 space-y-4 text-lg leading-relaxed text-color-text">
              <p>
                Trabalhamos em parceria direta com organizações oficiais de
                eventos esportivos internacionais, garantindo segurança,
                tranquilidade e confiabilidade aos nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
