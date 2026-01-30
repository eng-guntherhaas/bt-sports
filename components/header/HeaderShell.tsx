"use client";

import { ReactNode, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";

type Props = {
  logo: ReactNode;
  children: ReactNode;
  mobileMenu: ReactNode;
  bgClass: string;
  borderClass: string;
};

export function HeaderShell({
  logo,
  children,
  mobileMenu,
  bgClass,
  borderClass,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`${bgClass} border-b ${borderClass}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {logo}

        {children}

        <button onClick={() => setOpen(true)} className="lg:hidden text-muted">
          ☰
        </button>
      </nav>

      <Dialog
        open={open}
        onClose={setOpen}
        className="lg:hidden fixed inset-0 z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <DialogPanel
          className={`fixed inset-y-0 right-0 w-full sm:max-w-sm p-6 ${bgClass}`}
        >
          {mobileMenu}

          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6"
          >
            ✕
          </button>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
