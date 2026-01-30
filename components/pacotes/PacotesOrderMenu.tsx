"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpAZ,
  faCalendarDays,
  faArrowUpWideShort,
  faArrowDownWideShort,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { Order } from "@/lib/getPacotesUi";

type Props = {
  order: Order;
  basePath: string;
  variant?: "admin" | "public";
};

export default function PacotesOrderMenu({
  order,
  basePath,
  variant = "public",
}: Props) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const baseButton =
    variant === "admin"
      ? "bg-surface text-admin-muted hover:bg-brand-soft"
      : "bg-surface text-muted hover:bg-brand-soft";

  const activeButton = "bg-brand text-on-brand";

  const itemClass = (active: boolean) =>
    `flex items-center gap-3 px-4 py-2 text-sm rounded-md transition ${
      active ? activeButton : baseButton
    }`;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        detailsRef.current.removeAttribute("open");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <details ref={detailsRef} className="relative">
      <summary
        className={`
          details-trigger
          cursor-pointer
          flex items-center gap-2
          rounded-md px-4 py-2
          text-sm font-medium
          transition-colors

          ${baseButton}
          bg-brand-hover
          text-surface-hover
          focus-ring-brand
        `}
      >
        <FontAwesomeIcon icon={faSliders} />
        Ordenar
      </summary>

      <div className="absolute right-0 z-20 mt-2 w-52 rounded-xl border border-border-muted bg-surface p-2 shadow-lg">
        <Link
          href={`${basePath}?order=nome`}
          className={itemClass(order === "nome")}
        >
          <FontAwesomeIcon icon={faArrowUpAZ} />
          Alfabética
        </Link>

        <Link
          href={`${basePath}?order=data`}
          className={itemClass(order === "data")}
        >
          <FontAwesomeIcon icon={faCalendarDays} />
          Data
        </Link>

        <Link
          href={`${basePath}?order=preco-asc`}
          className={itemClass(order === "preco-asc")}
        >
          <FontAwesomeIcon icon={faArrowUpWideShort} />
          Preço ↑
        </Link>

        <Link
          href={`${basePath}?order=preco-desc`}
          className={itemClass(order === "preco-desc")}
        >
          <FontAwesomeIcon icon={faArrowDownWideShort} />
          Preço ↓
        </Link>
      </div>
    </details>
  );
}
