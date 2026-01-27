"use client";

import { useSession } from "next-auth/react";
import HeaderPublic from "./header-public";
import HeaderAdmin from "./header-admin";

export default function Header() {
  const { data: session, status } = useSession();

  // Evita flicker enquanto carrega
  if (status === "loading") return null;

  if (session?.user?.role === "admin") {
    return <HeaderAdmin />;
  }

  return <HeaderPublic />;
}
