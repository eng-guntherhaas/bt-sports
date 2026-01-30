"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { HeaderShell } from "../header/HeaderShell";
import { MobileMenu } from "../header/MobileMenu";

export default function HeaderAdmin() {
  return (
    <HeaderShell
      bgClass="bg-admin"
      borderClass="border-admin"
      logo={
        <Link href="/" className="font-bold text-admin">
          Biarritz Turismo Sports
          <span className="ml-2 text-xs text-admin-muted">admin</span>
        </Link>
      }
      mobileMenu={
        <MobileMenu
          sections={[
            {
              title: "Site",
              items: [
                {
                  label: "Sobre nós",
                  href: "/sobre",
                  className: "block text-admin-hover",
                },
                {
                  label: "Pacotes",
                  href: "/admin/pacotes",
                  className: "block text-admin-hover",
                },
                {
                  label: "Contato",
                  href: "/contato",
                  className: "block text-admin-hover",
                },
              ],
            },
            {
              title: "Administração",
              items: [
                {
                  label: "Dashboard",
                  href: "/admin",
                  className: "block text-admin-hover",
                },
                {
                  label: "Usuários",
                  href: "/admin/users",
                  className: "block text-admin-hover",
                },
                {
                  label: "Logout",
                  onClick: () => signOut({ callbackUrl: "/admin/login" }),
                  className:
                    "block w-full text-left text-danger text-danger-hover",
                },
              ],
            },
          ]}
        />
      }
    >
      {/* 🔹 DESKTOP NAV ADMIN (igual ao original) */}
      <div className="hidden lg:flex items-center gap-x-8">
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

        {/* Separador */}
        <div className="h-6 w-px bg-border-admin" />

        {/* 🔒 Área admin */}
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
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-sm font-semibold text-danger text-danger-hover"
          >
            Logout
          </button>
        </div>
      </div>
    </HeaderShell>
  );
}
