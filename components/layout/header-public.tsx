"use client";

import { useState } from "react";
import Link from "next/link";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function HeaderPublic() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-surface border-b border-default">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <Link href="/" className="font-bold text-brand">
          Biarritz Turismo Sports
        </Link>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/sobre"
            className="text-sm font-semibold text-muted text-brand-hover"
          >
            Sobre nós
          </Link>
          <Link
            href="/pacotes"
            className="text-sm font-semibold text-muted text-brand-hover"
          >
            Pacotes
          </Link>
          <Link
            href="/contato"
            className="text-sm font-semibold text-muted text-brand-hover"
          >
            Contato
          </Link>
        </PopoverGroup>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden text-muted text-brand-hover"
        >
          <Bars3Icon className="size-6" />
        </button>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <DialogPanel className="fixed inset-y-0 right-0 w-full bg-surface p-6 sm:max-w-sm">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-muted text-brand-hover"
          >
            <XMarkIcon className="size-6" />
          </button>

          <div className="mt-6 space-y-4">
            <Link
              href="/sobre"
              className="block font-medium text-muted text-brand-hover"
            >
              Sobre nós
            </Link>
            <Link
              href="/pacotes"
              className="block font-medium text-muted text-brand-hover"
            >
              Pacotes
            </Link>
            <Link
              href="/contato"
              className="block font-medium text-muted text-brand-hover"
            >
              Contato
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
