import { getCategoriasHome } from "@/lib/getCategoriasHome";
import { getPacotesRecentes } from "@/lib/getPacotesRecentes";
import CategoriasCarousel from "@/components/home/categorias/CategoriasCarousel";
import PacotesRecentes from "@/components/home/pacotes-recentes/PacotesRecentes";

export default async function Home() {
  const categorias = await getCategoriasHome();
  const pacotes = await getPacotesRecentes(6);

  return (
    <section className="bg-surface-muted px-6 py-12 text-color-text">
      <h2 className="mb-6 text-center text-xl font-semibold text-color-text">
        <span className="text-brand">Escolha</span> sua próxima experiência
      </h2>

      <CategoriasCarousel categorias={categorias} />

      <PacotesRecentes pacotes={pacotes} />
    </section>
  );
}
