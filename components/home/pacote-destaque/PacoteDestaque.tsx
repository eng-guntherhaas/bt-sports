"use client";

import Link from "next/link";
import Image from "next/image";

type Props = {
  slug: string;
  nome: string;
  preco?: number;
  bannerUrl: string;
};

export default function PacoteDestaque({
  slug,
  nome,
  preco,
  bannerUrl,
}: Props) {
  return (
    <section className="relative w-full bg-surface">
      <Link
        href={`/pacotes/${slug}`}
        className="
          group relative block w-full overflow-hidden
          focus:outline-none focus:ring-2 focus:ring-brand/40
        "
      >
        <div
          className="
    relative w-full
    h-[45vh]
    min-h-65
    max-h-130
    bg-surface-muted
  "
        >
          {bannerUrl && (
            <Image
              src={bannerUrl}
              alt={nome}
              fill
              priority
              sizes="100vw"
              className="
    object-cover
    object-center
    transition-transform duration-700 ease-out
    group-hover:scale-[1.04]
  "
            />
          )}

          <div className="absolute inset-0 bg-black/40" />

          <div
            className="
              absolute inset-0
              bg-brand/20
              opacity-0
              transition-opacity duration-300
              group-hover:opacity-100
            "
          />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-6 sm:px-10 sm:pb-10">
            <div className="max-w-3xl space-y-3">
              <h2
                className="
                  text-2xl sm:text-3xl lg:text-4xl
                  font-bold leading-tight
                  text-on-brand
                "
              >
                {nome}
              </h2>

              <div className="flex flex-wrap items-center gap-4">
                <span
                  className="
                    rounded-md
                    bg-brand
                    px-4 py-2
                    text-sm font-semibold
                    text-on-brand
                  "
                >
                  {preco
                    ? `A partir de € ${preco.toLocaleString("pt-BR")}`
                    : "Sob consulta"}
                </span>

                <span
                  className="
                    text-sm font-medium
                    text-on-brand/80
                    group-hover:underline
                    underline-offset-4
                  "
                >
                  Ver detalhes →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
