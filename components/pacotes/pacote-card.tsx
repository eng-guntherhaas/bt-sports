import Image from "next/image";
import Link from "next/link";

type PacoteCardProps = {
  nome: string;
  resumo?: string;
  preco?: number;
  dataEvento?: string;
  imageUrl?: string;
  href?: string;
  badge?: string;
  variant?: "public" | "admin";
};

export default function PacoteCard({
  nome,
  resumo,
  preco,
  dataEvento,
  imageUrl,
  href,
  badge,
}: PacoteCardProps) {
  const Content = (
    <>
      <div className="relative aspect-4/3 w-full bg-surface-muted">
        {imageUrl ? (
          <Image src={imageUrl} alt={nome} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">
            Sem imagem
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-brand-soft/60 opacity-0 transition-opacity sm:group-hover:opacity-100" />

        {dataEvento && (
          <span
            className="
              absolute left-3 top-3 z-10
              rounded-full
              bg-brand
              px-3 py-1
              text-[11px]
              font-semibold
              uppercase
              tracking-wide
              text-on-brand
              shadow-sm
            "
          >
            {dataEvento}
          </span>
        )}

        {badge && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-on-brand">
            {badge}
          </span>
        )}
      </div>

      <div className="relative z-10 bg-surface px-4 py-4 sm:px-5">
        <h3 className="text-base sm:text-lg font-semibold leading-snug">
          {nome}
        </h3>

        {resumo && (
          <p className="mt-1 text-sm text-muted line-clamp-2">{resumo}</p>
        )}

        {preco && (
          <div className="mt-3 text-base sm:text-lg font-bold text-brand">
            R$ {preco.toLocaleString("pt-BR")}
          </div>
        )}
      </div>
    </>
  );

  return href ? (
    <Link
      href={href}
      className="
        group relative block overflow-hidden rounded-xl
        border border-default bg-surface transition
        sm:hover:-translate-y-0.5 sm:hover:shadow-lg
      "
    >
      {Content}
    </Link>
  ) : (
    <div
      className="
        group relative block overflow-hidden rounded-xl
        border border-default bg-surface
      "
    >
      {Content}
    </div>
  );
}
