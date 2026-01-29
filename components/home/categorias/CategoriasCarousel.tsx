"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export type Categoria = {
  id: number;
  nome: string;
  slug: string;
  image: string | null;
  _count: {
    pacotes: number;
  };
};

export default function CategoriasCarousel({
  categorias,
}: {
  categorias: Categoria[];
}) {
  const hasNavigation = categorias.length > 5;

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-4 items-center">
        {/* PREV (desktop only) */}
        {hasNavigation && (
          <button
            id="prev"
            className="
              hidden lg:flex
              aspect-square w-20
              items-center justify-center
              rounded-lg
              bg-surface-muted
              border border-transparent
              text-brand text-3xl
              border-brand-hover
              transition
            "
          >
            ‹
          </button>
        )}

        {/* SWIPER */}
        <Swiper
          modules={hasNavigation ? [Navigation] : []}
          navigation={
            hasNavigation ? { prevEl: "#prev", nextEl: "#next" } : false
          }
          spaceBetween={16}
          breakpoints={{
            0: {
              slidesPerView: 1.05,
              slidesPerGroup: 1,
            },
            640: {
              slidesPerView: 2.2,
              slidesPerGroup: 2,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            1280: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
          }}
          className="w-full"
        >
          {categorias.map((categoria) => (
            <SwiperSlide
              key={categoria.id}
              className="aspect-[4/3] sm:aspect-square max-h-[260px] sm:max-h-none"
            >
              <Link
                href={`/categoria/${categoria.slug}`}
                className="
                  group relative block h-full w-full overflow-hidden
                  rounded-lg
                  bg-surface-muted
                "
              >
                <Image
                  src={
                    categoria.image
                      ? categoria.image
                      : `/categorias/${categoria.slug}.jpg`
                  }
                  alt={categoria.nome}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-brand
                    translate-y-full
                    transition-transform duration-500 ease-out
                    group-hover:translate-y-0
                  "
                />

                <span
                  className="
                    absolute inset-0 z-10
                    flex items-center justify-center
                    text-center
                    text-[11px] font-medium uppercase tracking-wide
                    text-on-brand
                  "
                >
                  {categoria.nome}
                </span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* NEXT (desktop only) */}
        {hasNavigation && (
          <button
            id="next"
            className="
              hidden lg:flex
              aspect-square w-20
              items-center justify-center
              rounded-lg
              bg-surface-muted
              border border-transparent
              text-brand text-3xl
              border-brand-hover
              transition
            "
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}
