"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import CategoriaSlide from "./CategoriaSlide";
import CategoriaNavButton from "./CategoriaNavButton";

import "swiper/css";
import "swiper/css/navigation";

export type Categoria = {
  id: number;
  nome: string;
  slug: string;
};

export default function CategoriasCarousel({
  categorias,
}: {
  categorias: Categoria[];
}) {
  const hasNavigation = categorias.length > 5;

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div
        className="
  grid
  grid-cols-1
  lg:grid-cols-[auto_1fr_auto]
  gap-4
  items-center
  min-h-55
"
      >
        {hasNavigation && <CategoriaNavButton id="prev" direction="prev" />}

        <Swiper
          modules={hasNavigation ? [Navigation] : []}
          navigation={
            hasNavigation ? { prevEl: "#prev", nextEl: "#next" } : false
          }
          spaceBetween={12}
          autoHeight={false}
          className="w-full min-h-25"
          breakpoints={{
            0: { slidesPerView: 2.2 },
            640: { slidesPerView: 3.5 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
        >
          {categorias.map((categoria) => (
            <SwiperSlide key={categoria.id}>
              <CategoriaSlide slug={categoria.slug} nome={categoria.nome} />
            </SwiperSlide>
          ))}
        </Swiper>

        {hasNavigation && <CategoriaNavButton id="next" direction="next" />}
      </div>
    </div>
  );
}
