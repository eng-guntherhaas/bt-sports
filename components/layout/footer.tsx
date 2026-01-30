"use client";

import { FooterPartners } from "@/components/footer/FooterPartners";
import { FooterSocial } from "@/components/footer/FooterSocial";

export default function Footer() {
  return (
    <section
      id="parcerias"
      className="bg-surface-soft text-default py-5 sm:py-16"
      aria-labelledby="parceiros"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-20 lg:grid lg:grid-cols-2 lg:gap-24 xl:gap-32">
          <FooterPartners />
          <FooterSocial />
        </div>
      </div>

      {/* Script oficial do Instagram */}
      <script async src="https://www.instagram.com/embed.js"></script>
    </section>
  );
}
