"use client";

import { parceiros } from "@/data/sobreBiarritz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <section
      id="parcerias"
      className="bg-brand-dark py-24 sm:py-32 text-on-brand"
      aria-labelledby="parceiros"
    >
      <div className="grid grid-cols-2">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="parceiros" className="text-3xl font-bold tracking-tight">
              Agência parceira oficial
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {parceiros.map((nome) => (
              <div
                key={nome}
                className="
                  flex items-center justify-center
                  rounded-lg
                  border border-white/20
                  px-6 py-8
                  text-center text-sm font-medium
                  text-on-brand
                "
              >
                {nome}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="acompanhe" className="text-3xl font-bold tracking-tight">
              Nos acompanhe
            </h2>
          </div>

          {/* Instagram embed */}
          <div className="my-10 flex justify-center">
            <iframe
              src="https://www.instagram.com/biarritzturismosports/embed"
              width="320"
              height="420"
              className="rounded-md border border-white/20 bg-surface"
            />
          </div>

          <ul className="space-y-3 text-md">
            <li className="flex items-center gap-2 text-on-brand text-brand-hover">
              <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
              <a href="https://www.facebook.com/biarritzturismosports/">
                /biarritzturismosports
              </a>
            </li>

            <li className="flex items-center gap-2 text-on-brand text-brand-hover">
              <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
              <a href="https://www.instagram.com/biarritzturismosports/">
                @biarritzturismosports
              </a>
            </li>

            <li className="flex items-center gap-2 text-on-brand text-brand-hover">
              <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4" />
              <a href="https://api.whatsapp.com/send?phone=5551981442091&text=Ol%C3%A1!%20Tenho%20interesse%20em%20um%20pacote%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.%20Pode%20me%20ajudar?">
                51 98144-2091
              </a>
            </li>
          </ul>

          <p className="mt-12 text-3xl font-bold text-on-brand">
            (51) 3026.2233
          </p>
        </div>
      </div>
    </section>
  );
}
