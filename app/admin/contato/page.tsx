export default function ContactForm() {
  return (
    <section className="relative isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      {/* Cabeçalho */}
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Fale com a Biarritz Turismo Sports
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Tem dúvidas, quer solicitar um orçamento ou saber mais sobre nossas
          viagens esportivas? Preencha o formulário abaixo — nosso time responde
          rapidamente.
        </p>
      </div>

      {/* Formulário */}
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-y-6">
          {/* Nome */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-white"
            >
              Nome completo
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Seu nome"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white"
            >
              E-mail
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="voce@email.com"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
              />
            </div>
          </div>

          {/* Telefone (opcional) */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-white"
            >
              Telefone <span className="text-gray-400">(opcional)</span>
            </label>
            <div className="mt-2.5 flex rounded-md bg-white/5 outline outline-1 outline-white/10 focus-within:outline-2 focus-within:outline-indigo-500">
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                className="block w-full bg-transparent px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Mensagem */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-white"
            >
              Mensagem
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Conte pra gente como podemos ajudar…"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Botão */}
        <div className="mt-10">
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Enviar mensagem
          </button>
          <p className="mt-3 text-center text-xs text-gray-500">
            Normalmente respondemos em até 1 dia útil.
          </p>
        </div>
      </form>
    </section>
  );
}
