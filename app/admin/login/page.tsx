"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔁 Se já estiver logado, manda pro admin
  useEffect(() => {
    if (status === "authenticated" && session.user.role === "admin") {
      router.replace("/admin");
    }
  }, [status, session, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl: "/admin",
    });

    setLoading(false);

    if (!res?.ok) {
      if (res?.error === "CredentialsSignin") {
        setError("Email ou senha inválidos");
      } else {
        setError("Erro ao tentar fazer login");
      }
      return;
    }

    router.push(res.url ?? "/admin");
  }

  // ⏳ Enquanto verifica sessão
  if (status === "loading") {
    return null;
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Login Administração
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Erro */}
          {error && (
            <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-100">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 focus:outline-2 focus:outline-indigo-500"
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-100">
              Senha
            </label>
            <input
              name="password"
              type="password"
              required
              className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 focus:outline-2 focus:outline-indigo-500"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
