import PacotesPorCategoria from "@/components/home/categorias/PacotesPorCategoria";

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="px-6 py-10">
      <PacotesPorCategoria slug={slug} />
    </div>
  );
}
