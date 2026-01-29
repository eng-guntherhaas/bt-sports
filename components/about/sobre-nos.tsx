import { links, stats } from "@/data/sobreBiarritz";

export default function SobreNos() {
  return (
    <section
      className="bg-surface py-16 sm:py-20 lg:py-24"
      aria-labelledby="sobre-biarritz"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl lg:ml-auto text-left lg:text-right">
          <h1
            id="sobre-biarritz"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-color-text"
          >
            Sobre a <span className="text-brand">Biarritz Turismo Sports</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted">
            A Biarritz Sports é especializada na criação, planejamento e
            execução de eventos esportivos, com forte atuação em maratonas por
            todo o mundo.
          </p>

          <nav className="mt-10 flex flex-wrap gap-x-8 gap-y-4 font-semibold text-color-text justify-start lg:justify-end">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="text-brand-hover">
                {link.name} →
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className="hidden sm:block" />

          {stats.map((stat) => (
            <div key={stat.name} className="text-left sm:text-right">
              <dt className="text-sm text-muted">{stat.name}</dt>
              <dd className="text-3xl font-bold text-brand">{stat.value}</dd>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
