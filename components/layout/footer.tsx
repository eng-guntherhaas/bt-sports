"use client";

import Image from "next/image";
import { parceiros } from "@/data/sobreBiarritz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <section
      id="parcerias"
      className="bg-brand-dark text-white py-16 sm:py-24"
      aria-labelledby="parceiros"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Layout mobile-first: 1 coluna */}
        <div className="flex flex-col gap-20 lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Parceiros */}
          <div>
            <h2
              id="parceiros"
              className="text-center text-2xl sm:text-3xl font-bold tracking-tight"
            >
              Agência parceira oficial
            </h2>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {parceiros.map((nome, index) => (
                <div
                  key={nome}
                  className="
                    flex items-center justify-center
                    h-20
                    rounded-md
                    border border-white/20
                    bg-white/5
                    px-3
                  "
                >
                  <Image
                    src={`https://picsum.photos/seed/parceiro-${index}/200/100`}
                    alt={`Logo ${nome}`}
                    width={200}
                    height={100}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Redes sociais */}
          <div>
            <h2
              id="acompanhe"
              className="text-center text-2xl sm:text-3xl font-bold tracking-tight"
            >
              Nos acompanhe
            </h2>

            {/* Instagram embed */}
            <div className="my-8 flex justify-center">
              <div className="w-[280px] sm:w-[300px] h-[360px] sm:h-[380px] overflow-hidden rounded-md border border-white/20 bg-white">
                <iframe
                  src="https://www.instagram.com/biarritzturismosports/embed"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                  referrerPolicy="no-referrer"
                  title="Instagram Biarritz Turismo Sports"
                  className="w-full h-full"
                />
              </div>
            </div>

            <ul className="space-y-4 text-sm sm:text-base text-white/80">
              <li className="flex items-center justify-center sm:justify-start gap-3 hover:text-brand transition-colors">
                <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
                <a
                  href="https://www.facebook.com/biarritzturismosports/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  /biarritzturismosports
                </a>
              </li>

              <li className="flex items-center justify-center sm:justify-start gap-3 hover:text-brand transition-colors">
                <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4" />
                <a
                  href="https://api.whatsapp.com/send?phone=5551981442091&text=Ol%C3%A1!%20Tenho%20interesse%20em%20um%20pacote%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.%20Pode%20me%20ajudar?"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  51 98144-2091
                </a>
              </li>
            </ul>

            <p className="mt-8 text-center sm:text-left text-xl sm:text-2xl font-bold">
              (51) 3026.2233
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
