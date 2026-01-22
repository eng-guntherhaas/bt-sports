import { links, stats } from "@/data/sobreBiarritz";

export default function SobreNos() {
  return (
    <section className="bg-white py-24" aria-labelledby="sobre-biarritz">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1
          id="sobre-biarritz"
          className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl text-gray-900"
        >
          Sobre a Biarritz Sports
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          A Biarritz Sports é especializada na criação, planejamento e execução
          de eventos esportivos, com forte atuação em corridas de rua e
          maratonas em todo o Brasil.
        </p>

        <nav className="mt-10 flex flex-wrap gap-x-8 gap-y-4 font-semibold text-green-900">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="hover:underline">
              {link.name} →
            </a>
          ))}
        </nav>

        <dl className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4 text-gray-600">
          {stats.map((stat) => (
            <div key={stat.name}>
              <dt className="text-sm text-gray-400">{stat.name}</dt>
              <dd className="text-3xl font-bold">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
