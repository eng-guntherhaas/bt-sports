"use client";

import { useState } from "react";
import Link from "next/link";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function HeaderPublic() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <Link href="/" className="text-white font-bold">
          Biarritz Turismo Sports
        </Link>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link href="/sobre" className="text-sm font-semibold text-white">
            Sobre nós
          </Link>
          <Link href="/pacotes" className="text-sm font-semibold text-white">
            Pacotes
          </Link>
          <Link href="/contato" className="text-sm font-semibold text-white">
            Contato
          </Link>
        </PopoverGroup>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden text-gray-400"
        >
          <Bars3Icon className="size-6" />
        </button>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <DialogPanel className="fixed inset-y-0 right-0 w-full bg-gray-900 p-6 sm:max-w-sm">
          <button onClick={() => setMobileMenuOpen(false)}>
            <XMarkIcon className="size-6 text-gray-400" />
          </button>

          <div className="mt-6 space-y-4">
            <Link href="/sobre" className="block text-white">
              Sobre nós
            </Link>
            <Link href="/pacotes" className="block text-white">
              Pacotes
            </Link>
            <Link href="/contato" className="block text-white">
              Contato
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
