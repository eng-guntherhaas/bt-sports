"use client";

import Image from "next/image";
import { parceiros } from "@/data/sobreBiarritz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <section
      id="parcerias"
      className="bg-surface-soft text-default py-5 sm:py-16"
      aria-labelledby="parceiros"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-20 lg:grid lg:grid-cols-2 lg:gap-24 xl:gap-32">
          {/* Parceiros */}
          <div>
            <h2
              id="parceiros"
              className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-brand"
            >
              Agência parceira oficial
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {parceiros.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    relative
                    flex items-center justify-center
                    h-28 lg:h-32
                    rounded-xl
                    bg-surface-muted
                    border border-transparent
                    transition-all duration-300
                    hover:bg-surface
                    hover:border-brand
                    hover:shadow-lg
                    hover:-translate-y-1
                    focus-ring-brand
                    border-brand-hover
                    bg-surface-hover
                  "
                >
                  <div className="relative w-full h-full p-6 lg:p-8">
                    {/* MOBILE */}
                    {item.imgMobile && (
                      <Image
                        src={item.imgMobile}
                        alt={item.name}
                        fill
                        sizes="100vw"
                        className="
                          object-contain
                          block
                          lg:hidden
                          transition-transform duration-300
                          group-hover:scale-[0.92]
                        "
                      />
                    )}

                    {/* DESKTOP */}
                    <Image
                      src={item.imgDesktop}
                      alt={item.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
                      className={`
                        object-contain
                        transition-transform duration-300
                        lg:group-hover:scale-[0.9]
                        ${item.imgMobile ? "hidden lg:block" : "block"}
                      `}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Redes sociais */}
          <div className="lg:pl-8 xl:pl-16">
            <h2 className="text-center sm:text-left text-2xl sm:text-3xl font-bold tracking-tight">
              Nos acompanhe
            </h2>

            <div className="my-8 flex justify-center sm:justify-start">
              <div
                className="
    w-72 sm:w-80
    aspect-[4/5]
    max-h-[420px]
    overflow-hidden
    rounded-xl
    border border-muted
    bg-surface
    shadow-sm
  "
              >
                <iframe
                  src="https://www.instagram.com/biarritzturismosports/embed"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                  referrerPolicy="no-referrer"
                  title="Instagram Biarritz Turismo Sports"
                  className="w-full h-full border-0"
                />
              </div>
            </div>

            <ul className="space-y-4 text-sm sm:text-base text-muted">
              <li className="flex items-center justify-center sm:justify-start gap-3 text-brand text-brand-dark-hover">
                <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
                <a
                  href="https://www.facebook.com/biarritzturismosports/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-dark transition-colors"
                >
                  /biarritzturismosports
                </a>
              </li>

              <li className="flex items-center justify-center sm:justify-start gap-3 text-brand text-brand-dark-hover">
                <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4" />
                <a
                  href="https://api.whatsapp.com/send?phone=5551981442091"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-dark transition-colors"
                >
                  51 98144-2091
                </a>
              </li>
            </ul>

            <p className="mt-8 text-center sm:text-left text-xl sm:text-2xl font-bold text-brand-dark">
              (51) 3026.2233
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
