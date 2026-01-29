import { getCategoriasHome } from "@/lib/getCategoriasHome";
import CategoriasCarousel from "@/components/CategoriasCarousel";

export default async function Home() {
  const categorias = await getCategoriasHome();

  return (
    <section className="bg-surface-muted px-6 py-12 text-color-tex">
      <h2 className="mb-6 text-center text-xl font-semibold text-color-text">
        <span className="text-brand">Escolha</span> sua próxima experiência
      </h2>

      <CategoriasCarousel categorias={categorias} />
    </section>
  );
}
