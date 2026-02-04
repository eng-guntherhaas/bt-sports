"use client";

import Link from "next/link";

type Props = {
  href: string;
  label: string;
};

export default function CategoriaButton({ href, label }: Props) {
  return (
    <Link
      href={href}
      className="
        group relative flex
        h-full w-full
        items-center justify-center
        rounded-md
        bg-brand
        border border-brand
        text-on-brand
        text-brand-hover
        text-xs
        font-semibold
        uppercase
        tracking-wide
        transition
        bg-surface-muted-hover
      "
    >
      {/* hover overlay sutil */}
      <div
        className="
          absolute inset-0
          rounded-md
          bg-brand
          opacity-0
          transition-opacity
          group-hover:opacity-5
        "
      />

      <span className="relative z-10 px-3 text-center">{label}</span>
    </Link>
  );
}
