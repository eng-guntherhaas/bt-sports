import { parceiros } from "@/data/sobreBiarritz";

export default function Footer() {
  return (
    <section
      id="parcerias"
      className="bg-gray-900 py-24 sm:py-32 text-white"
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
                className="flex items-center justify-center rounded-lg border border-white/20 px-6 py-8 text-center text-sm font-medium text-white"
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

          {/* Instagram mock / embed */}
          <div className="mb-10 rounded-lg border p-4">
            <p className="text-sm font-semibold">biarritzturismosports</p>
            <p className="mb-4 text-xs text-gray-500">
              Biarritz Turismo Sports · 2.716 seguidores
            </p>

            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-gray-200" />
              ))}
            </div>
          </div>

          {/* Social links */}
          <ul className="space-y-3 text-sm">
            <li>
              <a href="https://www.facebook.com/biarritzturismosports/">
                /biarritzturismosports
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/biarritzturismosports/">
                @biarritzturismosports
              </a>
            </li>
            <li>
              <a href="https://api.whatsapp.com/send?phone=5551981442091&text=Ol%C3%A1!%20Tenho%20interesse%20em%20um%20pacote%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.%20Pode%20me%20ajudar?">
                51 98144-2091
              </a>
            </li>
          </ul>

          {/* Phone */}
          <p className="mt-12 text-3xl font-bold">(51) 3026.2233</p>
        </div>
      </div>
    </section>
  );
}
