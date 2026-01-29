export default function NossaHistoria() {
  return (
    <section
      id="historia"
      className="relative isolate bg-brand-dark py-24 sm:py-32 text-on-brand"
      aria-labelledby="nossa-historia"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="nossa-historia" className="text-3xl font-bold tracking-tight">
            Nossa história
          </h2>

          <p className="mt-6 text-lg opacity-90">
            Fundada em 1993 e dirigida até hoje pela francesa Véronique Buisson
            Masi, conselheira do Órgão Governamental do Turismo Francês para o
            Brasil, com sede em Porto Alegre, RS, atendemos todo o mercado
            brasileiro, tendo como objetivo alcançar os turistas de todo o país.
          </p>

          <p className="mt-4 text-lg opacity-90">
            A empresa, de razão social <strong>Buisson & Cia Ltda</strong>,
            registrada no <strong>CADASTUR</strong> do Ministério do Turismo, é
            parceira oficial da <strong>Atout France</strong> e foi distinguida
            pelo <strong>Office de Tourisme</strong> de Paris pelo seu forte
            suporte à promoção do destino Paris.
          </p>
        </div>
      </div>
    </section>
  );
}
