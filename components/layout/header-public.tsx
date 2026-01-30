"use client";

import Link from "next/link";
import { HeaderShell } from "../header/HeaderShell";
import { MobileMenu } from "../header/MobileMenu";
import { DesktopNav } from "../header/DesktopNav";

export default function HeaderPublic() {
  return (
    <HeaderShell
      bgClass="bg-surface"
      borderClass="border-default"
      logo={
        <Link href="/" className="font-bold text-brand">
          Biarritz Turismo Sports
        </Link>
      }
      mobileMenu={
        <MobileMenu
          sections={[
            {
              items: [
                {
                  label: "Sobre nós",
                  href: "/sobre",
                  className: "block text-muted text-brand-hover",
                },
                {
                  label: "Pacotes",
                  href: "/pacotes",
                  className: "block text-muted text-brand-hover",
                },
                {
                  label: "Contato",
                  href: "/contato",
                  className: "block text-muted text-brand-hover",
                },
              ],
            },
          ]}
        />
      }
    >
      <DesktopNav
        links={[
          {
            label: "Sobre nós",
            href: "/sobre",
            className: "text-sm font-semibold text-muted text-brand-hover",
          },
          {
            label: "Pacotes",
            href: "/pacotes",
            className: "text-sm font-semibold text-muted text-brand-hover",
          },
          {
            label: "Contato",
            href: "/contato",
            className: "text-sm font-semibold text-muted text-brand-hover",
          },
        ]}
      />
    </HeaderShell>
  );
}
