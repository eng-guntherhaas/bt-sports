export default function NossaHistoria() {
  return (
    <section
      id="historia"
      className="bg-surface py-16 sm:py-24 lg:py-32"
      aria-labelledby="nossa-historia"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-left sm:text-center">
          <h2
            id="nossa-historia"
            className="text-3xl font-bold tracking-tight text-color-text"
          >
            Nossa história
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-muted">
            Fundada em 1993 e dirigida até hoje pela francesa{" "}
            <strong className="text-brand-dark">Véronique Buisson Masi</strong>,
            conselheira do{" "}
            <strong className="text-brand-dark">
              Órgão Governamental do Turismo Francês
            </strong>{" "}
            para o Brasil, com sede em Porto Alegre, RS, atendemos todo o
            mercado brasileiro.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-muted">
            A empresa{" "}
            <strong className="text-brand-dark">Buisson &amp; Cia Ltda</strong>{" "}
            é registrada no{" "}
            <strong className="text-brand-dark">CADASTUR</strong>, parceira
            oficial da <strong className="text-brand-dark">Atout France</strong>
            , e foi distinguida em{" "}
            <strong className="text-brand-dark">2011</strong> pelo{" "}
            <strong className="text-brand-dark">
              Office de Tourisme de Paris
            </strong>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
