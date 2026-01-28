import { getCategoriasHome } from "@/lib/getCategoriasHome";
import CategoriasCarousel from "@/components/CategoriasCarousel";

export default async function Home() {
  const categorias = await getCategoriasHome();

  return (
    <section className="bg-gray-100 px-6 py-12">
      <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">
        Escolha sua próxima experiência
      </h2>

      <CategoriasCarousel categorias={categorias} />
    </section>
  );
}
