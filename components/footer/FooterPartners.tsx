import { parceiros } from "@/data/sobreBiarritz";
import { PartnerCard } from "./PartnerCard";

export function FooterPartners() {
  return (
    <div>
      <h2
        id="parceiros"
        className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-brand"
      >
        Agência parceira oficial
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {parceiros.map((item) => (
          <PartnerCard
            key={item.name}
            name={item.name}
            href={item.href}
            imgMobile={item.imgMobile}
            imgDesktop={item.imgDesktop}
          />
        ))}
      </div>
    </div>
  );
}
