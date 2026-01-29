"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function HeaderAdmin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-admin border-b border-admin">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="font-bold text-admin">
          Biarritz Turismo Sports
          <span className="ml-2 text-xs font-medium text-admin-muted">
            admin
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden text-admin-muted text-admin-hover"
        >
          <Bars3Icon className="size-6" />
        </button>

        {/* Desktop navigation */}
        <PopoverGroup className="hidden lg:flex items-center gap-x-8">
          {/* 🌍 Área pública */}
          <div className="flex gap-x-6">
            <Link
              href="/sobre"
              className="text-sm font-semibold text-admin-muted text-admin-hover"
            >
              Sobre nós
            </Link>
            <Link
              href="/admin/pacotes"
              className="text-sm font-semibold text-admin-muted text-admin-hover"
            >
              Pacotes
            </Link>
            <Link
              href="/contato"
              className="text-sm font-semibold text-admin-muted text-admin-hover"
            >
              Contato
            </Link>
          </div>

          {/* 🔒 Separador */}
          <div className="h-6 w-px bg-border-admin" />

          {/* 🧑‍💼 Área admin */}
          <div className="flex gap-x-6 items-center">
            <Link
              href="/admin"
              className="text-sm font-semibold text-admin text-admin-hover"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/users"
              className="text-sm font-semibold text-admin text-admin-hover"
            >
              Usuários
            </Link>
            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/admin/login",
                })
              }
              className="text-sm font-semibold text-danger text-danger-hover"
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
        className="lg:hidden fixed inset-0 z-50"
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        <DialogPanel className="fixed inset-y-0 right-0 w-full sm:max-w-sm bg-admin p-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="font-bold text-admin"
              onClick={() => setMobileMenuOpen(false)}
            >
              Biarritz Turismo Sports
              <span className="ml-2 text-xs font-medium text-admin-muted">
                admin
              </span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-admin-muted text-admin-hover"
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {/* Público */}
            <div>
              <p className="text-xs font-semibold uppercase text-admin-muted">
                Site
              </p>
              <div className="mt-2 space-y-2">
                <Link
                  href="/sobre"
                  className="block text-admin-hover"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sobre nós
                </Link>
                <Link
                  href="/admin/pacotes"
                  className="block text-admin-hover"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pacotes
                </Link>
                <Link
                  href="/contato"
                  className="block text-admin-hover"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contato
                </Link>
              </div>
            </div>

            {/* Admin */}
            <div>
              <p className="text-xs font-semibold uppercase text-admin-muted">
                Administração
              </p>
              <div className="mt-2 space-y-2">
                <Link
                  href="/admin"
                  className="block text-admin-hover"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/users"
                  className="block text-admin-hover"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Usuários
                </Link>
                <button
                  onClick={() =>
                    signOut({
                      callbackUrl: "/admin/login",
                    })
                  }
                  className="block w-full text-left text-danger text-danger-hover"
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
