export default function Filosofia() {
  return (
    <section
      id="filosofia"
      className="bg-gray-50 py-24"
      aria-labelledby="filosofia"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* GRID apenas para alinhamento */}
        <div className="grid grid-cols-1">
          {/* BLOCO À DIREITA, MAIS LARGO */}
          <div className="ml-auto w-full max-w-5xl text-right xl:max-w-6xl">
            <h2
              id="filosofia"
              className="text-3xl font-bold tracking-tight text-gray-900"
            >
              Filosofia
            </h2>

            <p className="mt-6 text-lg text-gray-600">
              Nosso propósito é criar experiências esportivas memoráveis,
              seguras e bem organizadas, colocando o atleta no centro de cada
              decisão.
            </p>

            {/* BLOCO 1 */}
            <div className="mt-10 space-y-4 text-lg leading-relaxed text-gray-700">
              <p>
                Fiel aos princípios da <strong>Biarritz Turismo</strong>, a
                <strong> BT Sports</strong> possui uma proposta única no
                segmento de <strong>turismo esportivo</strong>, oferecendo
                suporte completo ao <em>esportista-turista</em> — seja ele
                corredor, praticante, admirador de tênis ou de outras
                modalidades esportivas.
              </p>

              <p>
                Nossos grupos contam com{" "}
                <strong>
                  acompanhamento integral de guia bilíngue próprio
                </strong>
                , além do suporte de guias locais sempre que necessário.
                Acreditamos que a programação turística e a vivência cultural
                são tão importantes quanto o evento esportivo em si, sendo
                muitas vezes o diferencial que torna a viagem inesquecível.
              </p>
            </div>

            {/* BLOCO 2 */}
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-gray-700">
              <p>
                Trabalhamos em parceria direta com as organizações oficiais dos
                eventos, garantindo{" "}
                <strong>segurança, tranquilidade e confiabilidade</strong> aos
                nossos clientes. Somos agência oficial no Brasil de provas
                internacionais como as{" "}
                <strong>
                  Maratonas de Berlim, Sydney, Cidade do Cabo e Xangai
                </strong>
                , além da <strong>Maratona e Meia Maratona de Paris</strong>,
                atuando também junto à organização da{" "}
                <strong>Maratona de Amsterdam</strong> e da tradicional{" "}
                <strong>Paris–Versailles</strong>.
              </p>

              <p>
                No tênis, atuamos em parceria com a organização do{" "}
                <strong>Masters de Monte Carlo</strong> e, após colaboração
                direta com a Federação Francesa de Tênis, somos hoje parceiros
                dos agentes oficiais do{" "}
                <strong>torneio de Roland Garros</strong> no Brasil.
              </p>

              <p>
                Além dos grupos organizados, desenvolvemos{" "}
                <strong>roteiros e viagens sob medida</strong> para atletas,
                casais ou grupos fechados, em qualquer evento esportivo no mundo
                — sempre buscando transformar o esporte em uma experiência de
                viagem completa e memorável.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
