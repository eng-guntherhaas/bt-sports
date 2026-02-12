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
                {
                  label: "Categorias",
                  href: "/admin/categorias",
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
      <div className="hidden lg:flex gap-x-6 items-center">
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
    </HeaderShell>
  );
}
