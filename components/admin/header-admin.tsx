"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function HeaderAdmin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="font-bold text-gray-900">
          Biarritz Turismo Sports
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden text-gray-700"
        >
          <Bars3Icon className="size-6" />
        </button>

        {/* Desktop navigation */}
        <PopoverGroup className="hidden lg:flex items-center gap-x-8">
          {/* 🌍 Área pública */}
          <div className="flex gap-x-6">
            <Link
              href="/admin/sobre"
              className="text-sm font-semibold text-gray-900 hover:text-gray-600"
            >
              Sobre nós
            </Link>
            <Link
              href="/admin/pacotes"
              className="text-sm font-semibold text-gray-900 hover:text-gray-600"
            >
              Pacotes
            </Link>
            <Link
              href="/admin/contato"
              className="text-sm font-semibold text-gray-900 hover:text-gray-600"
            >
              Contato
            </Link>
          </div>

          {/* 🔒 Separador */}
          <div className="h-6 w-px bg-gray-300" />

          {/* 🧑‍💼 Área admin */}
          <div className="flex gap-x-6 items-center">
            <Link
              href="/admin"
              className="text-sm font-semibold text-gray-900 hover:text-gray-600"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/users"
              className="text-sm font-semibold text-gray-900 hover:text-gray-600"
            >
              Usuários
            </Link>
            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/admin/login",
                })
              }
              className="text-sm font-semibold text-red-600 hover:text-red-500"
            >
              Logout
            </button>
          </div>
        </PopoverGroup>
      </nav>

      {/* 📱 Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-white p-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-bold text-gray-900">
              Biarritz Turismo Sports
            </Link>
            <button onClick={() => setMobileMenuOpen(false)}>
              <XMarkIcon className="size-6 text-gray-700" />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {/* Público */}
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400">
                Site
              </p>
              <div className="mt-2 space-y-2">
                <Link href="/sobre" className="block text-gray-900">
                  Sobre nós
                </Link>
                <Link href="/pacotes" className="block text-gray-900">
                  Pacotes
                </Link>
                <Link href="/contato" className="block text-gray-900">
                  Contato
                </Link>
              </div>
            </div>

            {/* Admin */}
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400">
                Administração
              </p>
              <div className="mt-2 space-y-2">
                <Link href="/admin" className="block text-gray-900">
                  Dashboard
                </Link>
                <Link href="/admin/users" className="block text-gray-900">
                  Usuários
                </Link>
                <button
                  onClick={() =>
                    signOut({
                      callbackUrl: "/admin/login",
                    })
                  }
                  className="block text-left text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
