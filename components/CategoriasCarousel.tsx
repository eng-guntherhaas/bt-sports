"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

type Categoria = {
  image: unknown;
  id: string;
  nome: string;
  slug: string;
};

export default function CategoriasCarousel({
  categorias,
}: {
  categorias: Categoria[];
}) {
  const maxSlides = 5;
  const slidesVisiveis = Math.min(categorias.length, maxSlides);
  const hasNavigation = categorias.length > maxSlides;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-7 gap-4 items-center">
        {hasNavigation && (
          <button
            id="prev"
            className="
              aspect-square
              w-20
              flex items-center justify-center
              rounded-lg
              bg-surface-muted
              text-brand
              text-3xl
              bg-brand-soft-hover
              transition
            "
          >
            ‹
          </button>
        )}

        <Swiper
          modules={hasNavigation ? [Navigation] : []}
          navigation={
            hasNavigation ? { prevEl: "#prev", nextEl: "#next" } : false
          }
          spaceBetween={50}
          slidesPerView={slidesVisiveis}
          slidesPerGroup={slidesVisiveis}
          className={`w-full ${hasNavigation ? "col-span-5" : "col-span-7"}`}
        >
          {categorias.map((categoria) => (
            <SwiperSlide key={categoria.id} className="aspect-square">
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

        {hasNavigation && (
          <button
            id="next"
            className="
              aspect-square
              w-20
              flex items-center justify-center
              rounded-lg
              bg-surface-muted
              text-brand
              text-3xl
              bg-brand-soft-hover
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
