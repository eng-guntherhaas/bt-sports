import Link from "next/link";
import Image from "next/image";
import { getCategoriasHome } from "@/lib/getCategoriasHome";

export default async function Home() {
  const categorias = await getCategoriasHome();

  return (
    <section className="px-6 py-12">
      <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">
        Escolha sua próxima experiência
      </h2>

      {/* container central */}
      <div className="mx-auto max-w-7xl">
        <div className="grid justify-center grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {categorias.map((categoria) => (
            <Link
              key={categoria.id}
              href={`/categoria/${categoria.slug}`}
              className="group relative aspect-square w-22.5 sm:w-25 md:w-27.5 overflow-hidden rounded-lg bg-gray-100"
            >
              <Image
                src={`/categorias/${categoria.slug}.jpg`}
                alt={categoria.nome}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition" />

              {/* texto */}
              <span className="absolute inset-0 flex items-center justify-center px-1 text-center text-[11px] font-medium uppercase tracking-wide text-white">
                {categoria.nome}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
